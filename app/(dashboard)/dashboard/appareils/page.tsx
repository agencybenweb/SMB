import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";

export default async function MesAppareilsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const devices = await prisma.deviceOwnership.findMany({
    where: { userId: session.user.id },
    include: {
      device: {
        select: {
          name: true,
          slug: true,
          imageUrl: true,
          technology: true,
        },
      },
      supportTickets: {
        where: {
          status: {
            in: ["OPEN", "IN_PROGRESS"],
          },
        },
        select: {
          id: true,
          ticketNumber: true,
        },
      },
    },
    orderBy: { purchaseDate: "desc" },
  });

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

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Mes Appareils</h1>
      </div>

      {devices.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">
            Vous n'avez pas encore d'appareil.
          </p>
          <Button asChild>
            <Link href="/appareils">Découvrir nos appareils</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {devices.map((ownership) => {
            const warrantyActive =
              ownership.warrantyEndDate &&
              new Date(ownership.warrantyEndDate) > new Date();

            return (
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
                      {ownership.device.technology}
                    </p>
                    {ownership.serialNumber && (
                      <p className="text-sm text-gray-600 mt-1">
                        N° de série : {ownership.serialNumber}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date d'achat</p>
                    <p className="font-medium">
                      {formatDateShort(ownership.purchaseDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Statut garantie</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${warrantyActive
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                          }`}
                      >
                        {warrantyActive ? "Active" : "Expirée"}
                      </span>
                      {ownership.warrantyEndDate && (
                        <span className="text-xs text-gray-600">
                          Jusqu'au {formatDateShort(ownership.warrantyEndDate)}
                        </span>
                      )}
                    </div>
                  </div>

                  {ownership.status !== "ACTIVE" && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Statut</p>
                      <p className="text-sm font-medium">{ownership.status}</p>
                    </div>
                  )}

                  {ownership.supportTickets.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Tickets SAV actifs</p>
                      <div className="space-y-1">
                        {ownership.supportTickets.map((ticket) => (
                          <Link
                            key={ticket.id}
                            href={`/dashboard/sav/${ticket.id}`}
                            className="text-sm text-primary hover:underline block"
                          >
                            {ticket.ticketNumber}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/appareils/${ownership.device.slug}`}>
                      Voir les détails
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link href={`/dashboard/sav/nouveau?device=${ownership.id}`}>
                      Créer un ticket SAV
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}