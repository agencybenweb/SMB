import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isValidSIRET } from "@/lib/utils";

export const dynamic = 'force-dynamic';

// GET /api/user/profile
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        companyName: true,
        siret: true,
        address: true,
        city: true,
        postalCode: true,
        country: true,
        phone: true,
        website: true,
        firstName: true,
        lastName: true,
        jobTitle: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

// PUT /api/user/profile
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const body = await request.json();
    const { siret, ...otherData } = body;

    // Valider le SIRET si fourni
    if (siret && siret.trim() !== "") {
      if (!isValidSIRET(siret)) {
        return NextResponse.json(
          { error: "Le numéro SIRET n'est pas valide" },
          { status: 400 }
        );
      }

      // Vérifier si le SIRET n'est pas déjà utilisé par un autre utilisateur
      const existingUser = await prisma.user.findFirst({
        where: {
          siret: siret,
          id: { not: session.user.id },
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Ce numéro SIRET est déjà utilisé" },
          { status: 400 }
        );
      }
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...otherData,
        siret: siret || null,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        companyName: true,
        siret: true,
        address: true,
        city: true,
        postalCode: true,
        country: true,
        phone: true,
        website: true,
        firstName: true,
        lastName: true,
        jobTitle: true,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}