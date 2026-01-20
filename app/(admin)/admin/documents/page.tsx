
import { prisma } from "@/lib/prisma";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteDocumentButton } from "./_components/delete-button";
import { Input } from "@/components/ui/input";

export default async function AdminDocumentsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const params = await searchParams;
    const query = params.q || "";

    const documents = await prisma.userDocument.findMany({
        where: {
            type: "QUOTE",
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
                { user: { companyName: { contains: query, mode: "insensitive" } } },
                { user: { lastName: { contains: query, mode: "insensitive" } } },
            ]
        },
        include: {
            user: {
                select: {
                    companyName: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                }
            }
        },
        orderBy: { uploadedAt: "desc" }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Devis Générés</h1>
                    <p className="text-slate-500 mt-1">
                        Liste de tous les devis commerciaux envoyés aux clients.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4 max-w-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                    <Input
                        type="search"
                        placeholder="Rechercher par client, titre..."
                        className="pl-9"
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {documents.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed text-slate-500">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>Aucun devis trouvé.</p>
                    </div>
                ) : (
                    documents.map((doc) => (
                        <Card key={doc.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <h3 className="font-semibold truncate">{doc.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 truncate">
                                            <span className="font-medium text-slate-900">
                                                {doc.user?.companyName || `${doc.user?.firstName} ${doc.user?.lastName}`}
                                            </span>
                                            <span>•</span>
                                            <span>{new Date(doc.uploadedAt).toLocaleDateString('fr-FR')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Button variant="outline" size="sm" asChild>
                                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                                            <Download className="w-4 h-4 mr-2" />
                                            Télécharger
                                        </a>
                                    </Button>
                                    <DeleteDocumentButton id={doc.id} title={doc.title} />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
