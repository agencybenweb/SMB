import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { isValidSIRET } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, companyName, siret, firstName, lastName, phone } = body;

    // Validation
    if (!email || !password || !companyName || !firstName || !lastName || !phone) {
      return NextResponse.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        { status: 400 }
      );
    }

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Vérifier le SIRET si fourni
    if (siret) {
      if (!isValidSIRET(siret)) {
        return NextResponse.json(
          { error: "Le numéro SIRET n'est pas valide" },
          { status: 400 }
        );
      }

      const existingSiret = await prisma.user.findUnique({
        where: { siret },
      });

      if (existingSiret) {
        return NextResponse.json(
          { error: "Ce numéro SIRET est déjà utilisé" },
          { status: 400 }
        );
      }
    }

    // Hash du mot de passe
    const passwordHash = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        companyName,
        siret: siret || null,
        firstName,
        lastName,
        phone,
        role: "CLIENT_PRO",
        status: "PENDING_VERIFICATION", // Nécessite validation admin
      },
    });

    // Retourner sans le hash du mot de passe
    const { passwordHash: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: "Compte créé avec succès. En attente de validation.", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la création du compte" },
      { status: 500 }
    );
  }
}