import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { formatDateShort } from "@/lib/utils";
import Link from "next/link";

const documentTypeLabels: Record<string, string> = {
  INVOICE: "Facture",
  QUOTE: "Devis",
  CONTRACT: "Contrat",
  TECHNICAL_SHEET: "Fiche technique",
  PROTOCOL: "Protocole de soins",
  CERTIFICATE_CE: "Certificat CE",
  CERTIFICATE_ISO: "Certificat ISO",
  MARKETING: "Support marketing",
  TRAINING_VIDEO: "Vidéo de formation",
  TRAINING_PDF: "PDF de formation",
  CERTIFICATE_TRAINING: "Attestation de formation",
};

import { ArrowLeft } from "lucide-react";

export default async function DocumentsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const [userDocs, deviceDocs, orders] = await Promise.all([
    prisma.userDocument.findMany({
      where: { userId: session.user.id },
      orderBy: { uploadedAt: "desc" },
    }),
    prisma.deviceDocument.findMany({
      where: {
        device: {
          ownerships: {
            some: {
              userId: session.user.id,
            },
          },
        },
        accessLevel: {
          in: ["CLIENT_PRO", "DEVICE_OWNER"],
        },
      },
      include: {
        device: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: { uploadedAt: "desc" },
    }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      select: {
        orderNumber: true,
        invoices: true,
        contracts: true,
      },
      orderBy: { createdAt: "desc" }
    })
  ]);

  // Extract invoices and contracts from orders to create a flat list
  const orderDocuments = orders.flatMap(order => [
    ...order.invoices.map(inv => ({
      id: inv.id,
      title: `Facture ${inv.invoiceNumber}`,
      type: "INVOICE",
      fileUrl: inv.fileUrl,
      uploadedAt: inv.createdAt,
      description: `Commande ${order.orderNumber}`
    })),
    ...order.contracts.map(cont => ({
      id: cont.id,
      title: `Contrat ${cont.contractNumber}`,
      type: "CONTRACT",
      fileUrl: cont.fileUrl,
      uploadedAt: cont.createdAt,
      description: `Commande ${order.orderNumber}`
    }))
  ]);

  const allDocuments = [
    ...orderDocuments.map(doc => ({ ...doc, device: null, userId: session.user.id })), // Add compatible fields
    ...userDocs.map((doc) => ({ ...doc, device: null })),
    ...deviceDocs.map((doc) => ({ ...doc, userId: null })),
  ].sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
  );

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
        <h1 className="text-3xl font-bold mb-2">Mes Documents</h1>
        <p className="text-gray-600">
          Retrouvez ici tous vos documents : factures, contrats, devis et fiches techniques.
        </p>
      </div>

      {allDocuments.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-gray-600">
            Aucun document disponible pour le moment.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            {allDocuments.map((doc) => (
              <a
                key={doc.id}
                href={(doc as any).fileUrl || `data:application/pdf;base64,${(doc as any).fileData}`}
                target="_blank"
                rel="noopener noreferrer"
                download={!(doc as any).fileUrl ? `${doc.title}.pdf` : undefined}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">{doc.title}</p>
                    {/* Tags for special types */}
                    {doc.type === 'INVOICE' && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">FACTURE</span>}
                    {doc.type === 'QUOTE' && <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">DEVIS</span>}
                    {doc.type === 'CONTRACT' && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">CONTRAT</span>}
                  </div>

                  {doc.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {doc.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-2">
                    {doc.device && (
                      <span className="text-xs text-blue-600 font-medium">
                        {doc.device.name}
                      </span>
                    )}
                    {!['INVOICE', 'QUOTE', 'CONTRACT'].includes(doc.type) && (
                      <span className="text-xs text-gray-500">
                        {documentTypeLabels[doc.type] || doc.type}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">
                      {formatDateShort(doc.uploadedAt)}
                    </span>
                  </div>
                </div>
                <span className="text-primary ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowLeft className="w-4 h-4 rotate-[135deg]" /> {/* Down-Right arrowish */}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}