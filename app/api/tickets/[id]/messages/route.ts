import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// POST /api/tickets/[id]/messages - Ajouter un message à un ticket
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { content } = body;

    if (!content || !content.trim()) {
      return NextResponse.json(
        { error: "Le message ne peut pas être vide" },
        { status: 400 }
      );
    }

    // Vérifier que le ticket appartient à l'utilisateur
    const ticket = await prisma.supportTicket.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (!ticket) {
      return NextResponse.json(
        { error: "Ticket non trouvé" },
        { status: 404 }
      );
    }

    if (["RESOLVED", "CLOSED", "CANCELLED"].includes(ticket.status)) {
      return NextResponse.json(
        { error: "Impossible d'ajouter un message à un ticket fermé" },
        { status: 400 }
      );
    }

    // Créer le message
    const message = await prisma.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        authorId: session.user.id,
        authorName: session.user.name || session.user.email,
        content: content.trim(),
      },
    });

    // Mettre à jour le statut du ticket
    await prisma.supportTicket.update({
      where: { id: ticket.id },
      data: {
        updatedAt: new Date(),
        status: ticket.status === "WAITING_CLIENT" ? "OPEN" : ticket.status,
      },
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}