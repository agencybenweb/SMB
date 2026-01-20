import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { safeJsonParse } from "@/lib/utils";

const statusLabels: Record<string, { label: string; color: string }> = {
  AVAILABLE: { label: "Disponible", color: "bg-green-100 text-green-800" },
  IN_PROGRESS: { label: "En cours", color: "bg-yellow-100 text-yellow-800" },
  COMPLETED: { label: "Terminée", color: "bg-blue-100 text-blue-800" },
  LOCKED: { label: "Verrouillée", color: "bg-gray-100 text-gray-800" },
};

import { ArrowLeft } from "lucide-react";

export default async function FormationPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Récupérer les appareils achetés par l'utilisateur
  const ownedDevices = await prisma.deviceOwnership.findMany({
    where: { userId: session.user.id },
    include: {
      device: {
        select: {
          name: true,
          slug: true,
          imageUrl: true,
        },
      },
    },
  });

  // Pour chaque appareil, récupérer les formations disponibles
  // (Dans un vrai système, les formations seraient liées aux appareils via la DB)
  // Pour l'instant, on affiche simplement les appareils achetés avec un lien vers la formation

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au tableau de bord
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Mes Formations</h1>
        <p className="text-gray-600">
          Accédez aux formations pour les appareils que vous avez achetés
        </p>
      </div>

      {ownedDevices.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">
            Vous n'avez pas encore d'appareil. Les formations sont disponibles
            pour les appareils que vous avez achetés.
          </p>
          <Button asChild>
            <Link href="/appareils">Découvrir nos appareils</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {ownedDevices.map((ownership) => (
            <div
              key={ownership.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                {ownership.device.imageUrl && (
                  <img
                    src={ownership.device.imageUrl}
                    alt={ownership.device.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <Link
                    href={`/appareils/${ownership.device.slug}`}
                    className="text-xl font-semibold hover:text-primary mb-1 block"
                  >
                    {ownership.device.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    Date d'achat : {formatDateShort(ownership.purchaseDate)}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4 mb-4">
                <p className="text-sm text-gray-600 mb-4">
                  Formation incluse avec l'achat de cet appareil. Accédez aux
                  vidéos, documentation et protocoles de soins.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link href={`/dashboard/formation/${ownership.device.slug}`}>
                    Accéder à la formation
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section informations générales */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold mb-4">À propos des formations</h2>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            Chaque formation inclut :
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vidéos de formation détaillées</li>
            <li>Documentation technique complète</li>
            <li>Protocoles de soins adaptés</li>
            <li>Guide de maintenance</li>
            <li>Attestation de formation téléchargeable</li>
          </ul>
          <p className="mt-4">
            Pour toute question sur les formations, contactez notre équipe via
            votre espace SAV.
          </p>
        </div>
      </section>
    </div>
  );
}