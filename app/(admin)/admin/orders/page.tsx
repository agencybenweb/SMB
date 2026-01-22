import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Eye, FileText } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true,
            _count: {
                select: { items: true },
            },
        },
    });

    const statusMap: Record<string, { label: string; color: string }> = {
        DRAFT: { label: "Devis (Brouillon)", color: "bg-slate-500" },
        PENDING: { label: "En attente", color: "bg-amber-500" },
        CONFIRMED: { label: "Confirmée", color: "bg-blue-500" },
        IN_PRODUCTION: { label: "En production", color: "bg-purple-500" },
        SHIPPED: { label: "Expédiée", color: "bg-indigo-500" },
        DELIVERED: { label: "Livrée", color: "bg-green-500" },
        CANCELLED: { label: "Annulée", color: "bg-red-500" },
        REFUNDED: { label: "Remboursée", color: "bg-red-700" },
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Commandes & Devis</h1>
                {/* <Button>Créer un devis</Button> */}
            </div>

            <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Numéro</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Montant HT</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                                    Aucune commande pour le moment.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        {order.orderNumber}
                                        {order.status === 'DRAFT' && <span className="ml-2 text-xs text-slate-400">({order._count.items} articles)</span>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{order.user.companyName || order.user.firstName}</span>
                                            <span className="text-xs text-slate-500">{order.user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {format(new Date(order.createdAt), "dd MMM yyyy", { locale: fr })}
                                    </TableCell>
                                    <TableCell>{formatPrice(Number(order.totalAmount))}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            <Badge variant="secondary" className={`${statusMap[order.status]?.color} text-white hover:${statusMap[order.status]?.color}`}>
                                                {statusMap[order.status]?.label || order.status}
                                            </Badge>
                                            {order.status !== "DRAFT" && (
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${order.paymentStatus === "PAID" ? "border-green-500 text-green-700" :
                                                            order.paymentStatus === "PARTIAL" ? "border-blue-500 text-blue-700" :
                                                                order.paymentStatus === "PENDING" ? "border-amber-500 text-amber-700" :
                                                                    "border-red-500 text-red-700"
                                                        }`}
                                                >
                                                    {order.paymentStatus === "PAID" ? "💰 Payé" :
                                                        order.paymentStatus === "PARTIAL" ? "💳 Partiel" :
                                                            order.paymentStatus === "PENDING" ? "⏳ Paiement" :
                                                                order.paymentStatus === "FAILED" ? "❌ Échec" :
                                                                    "🔄 Remboursé"}
                                                </Badge>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/admin/orders/${order.id}`}>
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
