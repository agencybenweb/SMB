import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const statusLabels: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: "Actif", color: "bg-green-100 text-green-800" },
  INACTIVE: { label: "Inactif", color: "bg-gray-100 text-gray-800" },
  SUSPENDED: { label: "Suspendu", color: "bg-red-100 text-red-800" },
  PENDING_VERIFICATION: {
    label: "En attente",
    color: "bg-yellow-100 text-yellow-800",
  },
};

export default async function ClientsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const statusFilter = params?.status as any;

  const clients = await prisma.user.findMany({
    where: {
      role: "CLIENT_PRO",
      ...(statusFilter && { status: statusFilter }),
    },
    include: {
      _count: {
        select: {
          orders: true,
          supportTickets: true,
          ownedDevices: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des Clients</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/clients?status=PENDING_VERIFICATION">
              Comptes en attente ({clients.filter(c => c.status === "PENDING_VERIFICATION").length})
            </Link>
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 flex gap-2">
        <Link
          href="/admin/clients"
          className={`px-4 py-2 rounded ${!statusFilter ? "bg-primary text-primary-foreground" : "bg-gray-100"}`}
        >
          Tous
        </Link>
        <Link
          href="/admin/clients?status=PENDING_VERIFICATION"
          className={`px-4 py-2 rounded ${statusFilter === "PENDING_VERIFICATION" ? "bg-primary text-primary-foreground" : "bg-gray-100"}`}
        >
          En attente
        </Link>
        <Link
          href="/admin/clients?status=ACTIVE"
          className={`px-4 py-2 rounded ${statusFilter === "ACTIVE" ? "bg-primary text-primary-foreground" : "bg-gray-100"}`}
        >
          Actifs
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statistiques
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{client.companyName || "N/A"}</p>
                    {client.siret && (
                      <p className="text-sm text-gray-600">SIRET: {client.siret}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm">{client.email}</p>
                    {client.phone && (
                      <p className="text-sm text-gray-600">{client.phone}</p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div className="space-y-1">
                    <p>{client._count.orders} commande(s)</p>
                    <p>{client._count.ownedDevices} appareil(s)</p>
                    <p>{client._count.supportTickets} ticket(s)</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusLabels[client.status]?.color ||
                      "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {statusLabels[client.status]?.label || client.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/clients/${client.id}`}
                    className="text-primary hover:underline text-sm"
                  >
                    Voir détails
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          Aucun client trouvé
        </div>
      )}
    </div>
  );
}