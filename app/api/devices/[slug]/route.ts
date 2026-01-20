import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { safeJsonParse } from "@/lib/utils";

export const dynamic = 'force-dynamic';

// GET /api/devices/[slug] - Récupère un appareil par son slug
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const device = await prisma.device.findUnique({
      where: { slug: params.slug },
      include: {
        documents: {
          where: {
            accessLevel: {
              in: ["PUBLIC", "CLIENT_PRO"],
            },
          },
          orderBy: { uploadedAt: "desc" },
        },
      },
    });

    if (!device) {
      return NextResponse.json(
        { error: "Appareil non trouvé" },
        { status: 404 }
      );
    }

    // Parser les champs JSON
    const deviceWithParsed = {
      ...device,
      indications: safeJsonParse<string[]>(device.indications, []),
      benefits: safeJsonParse<string[]>(device.benefits, []),
      specifications: safeJsonParse<Record<string, string>>(
        device.specifications,
        {}
      ),
      certifications: safeJsonParse<string[]>(device.certifications, []),
      galleryUrls: safeJsonParse<string[]>(device.galleryUrls, []),
    };

    return NextResponse.json(deviceWithParsed);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'appareil:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}