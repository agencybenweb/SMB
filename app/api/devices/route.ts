import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET /api/devices - Liste tous les appareils
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "ACTIVE";
    const featured = searchParams.get("featured");

    const devices = await prisma.device.findMany({
      where: {
        status: status as any,
        ...(featured === "true" && { featured: true }),
      },
      orderBy: { orderIndex: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        technology: true,
        shortDescription: true,
        imageUrl: true,
        basePrice: true,
        status: true,
        featured: true,
      },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error("Erreur lors de la récupération des appareils:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}