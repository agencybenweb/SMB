import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function OrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: params.id,
      userId: session.user.id,
    },
    include: {
      items: {
        include: {
          device: {
            select: {
              name: true,
              slug: true,
              imageUrl: true,
            },
          },
        },
      },
      invoices: true,
      contracts: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/commandes"
          className="text-sm text-gray-600 hover:text-primary"
        >
          ← Retour aux commandes
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Commande {order.orderNumber}
          </h1>
          Date de commande : {formatDateShort(order.createdAt)}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600 mb-1">Statut</p>
          <p className="text-lg font-semibold">{order.status}</p>
        </div>
      </div>

      {/* Détails de livraison */}
      <section className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Adresse de livraison</h2>
        <div className="text-gray-700">
          <p>{order.shippingAddress}</p>
          {order.shippingCity && (
            <p>
              {order.shippingPostalCode} {order.shippingCity}
            </p>
          )}
          <p>{order.shippingCountry || "France"}</p>
          {order.trackingNumber && (
            <p className="mt-4">
              <strong>Numéro de suivi :</strong> {order.trackingNumber}
            </p>
          )}
        </div>
      </section>

      {/* Articles commandés */}
      <section className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Articles commandés</h2>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
              {item.device.imageUrl && (
                <img
                  src={item.device.imageUrl}
                  alt={item.device.name}
                  className="w-20 h-20 object-cover rounded"
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
                  Quantité : {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{formatPrice(Number(item.totalPrice))}</p>
                <p className="text-sm text-gray-600">
                  {formatPrice(Number(item.unitPrice))} l'unité
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Sous-total HT</span>
            <span>{formatPrice(Number(order.totalAmount))}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">TVA</span>
            <span>{formatPrice(Number(order.taxAmount))}</span>
          </div>
          {Number(order.discountAmount) > 0 && (
            <div className="flex justify-between text-sm mb-2 text-green-600">
              <span>Remise</span>
              <span>-{formatPrice(Number(order.discountAmount))}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total TTC</span>
            <span>{formatPrice(Number(order.totalAmount) + Number(order.taxAmount))}</span>
          </div>
        </div>
      </section>

      {/* Informations de paiement */}
      <section className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Paiement</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Méthode de paiement</p>
            <p className="font-medium">
              {order.paymentMethod === "CASH" && "Comptant"}
              {order.paymentMethod === "INSTALLMENT" && "Paiement échelonné"}
              {order.paymentMethod === "LEASING" && "Leasing"}
              {order.paymentMethod === "BANK_TRANSFER" && "Virement bancaire"}
              {!order.paymentMethod && "Non défini"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Statut du paiement</p>
            <p className="font-medium">{order.paymentStatus}</p>
            {order.paymentStatus === "PARTIAL" && (
              <p className="text-sm text-gray-600 mt-1">
                Payé : {formatPrice(Number(order.paidAmount))} / {formatPrice(Number(order.totalAmount))}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Documents */}
      {(order.invoices.length > 0 || order.contracts.length > 0) && (
        <section className="border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          <div className="space-y-2">
            {order.invoices.map((invoice) => (
              <a
                key={invoice.id}
                href={invoice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
              >
                <span>Facture {invoice.invoiceNumber}</span>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </a>
            ))}
            {order.contracts.map((contract) => (
              <a
                key={contract.id}
                href={contract.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50"
              >
                <span>Contrat {contract.contractNumber}</span>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Notes */}
      {order.notes && (
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Notes</h2>
          <p className="text-gray-700 whitespace-pre-line">{order.notes}</p>
        </section>
      )}
    </div>
  );
}