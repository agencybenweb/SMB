import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateTicketNumber } from "@/lib/utils";

// POST /api/tickets - Créer un ticket
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { subject, description, category, priority, deviceOwnershipId } = body;

    if (!subject || !description || !category || !priority) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Vérifier que le device ownership appartient bien à l'utilisateur si fourni
    if (deviceOwnershipId) {
      const ownership = await prisma.deviceOwnership.findFirst({
        where: {
          id: deviceOwnershipId,
          userId: session.user.id,
        },
      });

      if (!ownership) {
        return NextResponse.json(
          { error: "Appareil non trouvé" },
          { status: 404 }
        );
      }
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        ticketNumber: generateTicketNumber(),
        userId: session.user.id,
        deviceOwnershipId: deviceOwnershipId || null,
        subject,
        description,
        category: category as any,
        priority: priority as any,
        status: "OPEN",
      },
      include: {
        deviceOwnership: {
          include: {
            device: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // Créer le premier message avec la description
    await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: session.user.id,
        authorName: session.user.name || session.user.email,
        content: description,
      },
    });

    return NextResponse.json(ticket);
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}