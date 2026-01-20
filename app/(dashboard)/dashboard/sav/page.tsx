import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const statusLabels: Record<string, { label: string; color: string }> = {
  OPEN: { label: "Ouvert", color: "bg-blue-100 text-blue-800" },
  IN_PROGRESS: { label: "En cours", color: "bg-yellow-100 text-yellow-800" },
  WAITING_CLIENT: { label: "En attente client", color: "bg-orange-100 text-orange-800" },
  RESOLVED: { label: "Résolu", color: "bg-green-100 text-green-800" },
  CLOSED: { label: "Fermé", color: "bg-gray-100 text-gray-800" },
  CANCELLED: { label: "Annulé", color: "bg-red-100 text-red-800" },
};

const priorityLabels: Record<string, { label: string; color: string }> = {
  LOW: { label: "Basse", color: "bg-gray-100 text-gray-800" },
  MEDIUM: { label: "Moyenne", color: "bg-yellow-100 text-yellow-800" },
  HIGH: { label: "Haute", color: "bg-orange-100 text-orange-800" },
  URGENT: { label: "Urgente", color: "bg-red-100 text-red-800" },
};

const categoryLabels: Record<string, string> = {
  TECHNICAL: "Technique",
  WARRANTY: "Garantie",
  TRAINING: "Formation",
  BILLING: "Facturation",
  OTHER: "Autre",
};

export default async function SAVPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const tickets = await prisma.supportTicket.findMany({
    where: { userId: session.user.id },
    include: {
      deviceOwnership: {
        include: {
          device: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
      },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      _count: {
        select: { messages: true },
      },
    },
    orderBy: { createdAt: "desc" },
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
        <div>
          <h1 className="text-3xl font-bold mb-2">Mes Tickets SAV</h1>
          <p className="text-gray-600">
            Gérez vos demandes de support et suivez leur résolution
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/sav/nouveau">Créer un ticket</Link>
        </Button>
      </div>

      {tickets.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">
            Vous n'avez pas encore de ticket SAV.
          </p>
          <Button asChild>
            <Link href="/dashboard/sav/nouveau">Créer votre premier ticket</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{ticket.ticketNumber}</h3>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusLabels[ticket.status]?.color || "bg-gray-100 text-gray-800"}`}
                    >
                      {statusLabels[ticket.status]?.label || ticket.status}
                    </span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${priorityLabels[ticket.priority]?.color || "bg-gray-100 text-gray-800"}`}
                    >
                      {priorityLabels[ticket.priority]?.label || ticket.priority}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900 mb-1">
                    {ticket.subject}
                  </p>
                  {ticket.deviceOwnership && (
                    <p className="text-sm text-gray-600">
                      Appareil : {ticket.deviceOwnership.device.name}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    {categoryLabels[ticket.category] || ticket.category}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">
                    {formatDateShort(ticket.createdAt)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {ticket._count.messages} message(s)
                  </p>
                </div>
              </div>

              {ticket.messages.length > 0 && (
                <div className="mb-4 pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-2">Dernier message :</p>
                  <p className="text-sm text-gray-700 line-clamp-2">
                    {ticket.messages[0].content}
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-4 border-t">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/dashboard/sav/${ticket.id}`}>
                    Voir les détails
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}