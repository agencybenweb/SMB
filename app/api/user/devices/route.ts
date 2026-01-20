import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const devices = await prisma.deviceOwnership.findMany({
      where: { userId: session.user.id },
      include: {
        device: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { purchaseDate: "desc" },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}