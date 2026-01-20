import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const statusLabels: Record<string, { label: string; color: string }> = {
  DRAFT: { label: "Brouillon", color: "bg-gray-100 text-gray-800" },
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  CONFIRMED: { label: "Confirmée", color: "bg-blue-100 text-blue-800" },
  IN_PRODUCTION: { label: "En production", color: "bg-purple-100 text-purple-800" },
  SHIPPED: { label: "Expédiée", color: "bg-indigo-100 text-indigo-800" },
  DELIVERED: { label: "Livrée", color: "bg-green-100 text-green-800" },
  CANCELLED: { label: "Annulée", color: "bg-red-100 text-red-800" },
  REFUNDED: { label: "Remboursée", color: "bg-red-100 text-red-800" },
};

const paymentStatusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  PARTIAL: { label: "Partiel", color: "bg-orange-100 text-orange-800" },
  PAID: { label: "Payée", color: "bg-green-100 text-green-800" },
  FAILED: { label: "Échoué", color: "bg-red-100 text-red-800" },
  REFUNDED: { label: "Remboursée", color: "bg-red-100 text-red-800" },
};

import { ArrowLeft } from "lucide-react";

export default async function CommandesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: {
          device: {
            select: {
              name: true,
              imageUrl: true,
              slug: true,
            },
          },
        },
      },
      invoices: {
        select: {
          id: true,
          invoiceNumber: true,
          fileUrl: true,
        },
      },
    },
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
        <h1 className="text-3xl font-bold">Mes Commandes</h1>
      </div>

      {orders.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">Vous n'avez pas encore de commande.</p>
          <Button asChild>
            <Link href="/appareils">Découvrir nos appareils</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">
                    Commande {order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Date : {formatDateShort(order.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusLabels[order.status]?.color || "bg-gray-100 text-gray-800"}`}
                  >
                    {statusLabels[order.status]?.label || order.status}
                  </span>
                  <p className="text-lg font-bold mt-2">{formatPrice(Number(order.totalAmount))} HT</p>
                </div>
              </div>

              {/* Articles */}
              <div className="border-t pt-4 mb-4">
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      {item.device.imageUrl && (
                        <img
                          src={item.device.imageUrl}
                          alt={item.device.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                      <div className="flex-1">
                        <Link
                          href={`/appareils/${item.device.slug}`}
                          className="font-medium hover:text-primary"
                        >
                          {item.device.name}
                        </Link>
                        <p className="text-sm text-gray-600">
                          Quantité : {item.quantity} × {formatPrice(Number(item.unitPrice))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paiement et factures */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${paymentStatusLabels[order.paymentStatus]?.color || "bg-gray-100 text-gray-800"}`}>
                    Paiement : {paymentStatusLabels[order.paymentStatus]?.label || order.paymentStatus}
                  </span>
                  {order.paymentMethod && (
                    <span className="text-sm text-gray-600">
                      {order.paymentMethod === "CASH" && "Comptant"}
                      {order.paymentMethod === "INSTALLMENT" && "Échelonné"}
                      {order.paymentMethod === "LEASING" && "Leasing"}
                      {order.paymentMethod === "BANK_TRANSFER" && "Virement"}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {order.invoices.length > 0 && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={order.invoices[0].fileUrl} target="_blank" rel="noopener noreferrer">
                        Télécharger la facture
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/commandes/${order.id}`}>
                      Voir les détails
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}