import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, MapPin, Printer } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { OrderStatusUpdater } from "../_components/status-updater";
import { QuoteGenerator } from "../_components/quote-generator";
import { PaymentManager } from "../_components/payment-manager";


interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
    const { id } = await params;
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    device: true,
                },
            },
        },
    });

    if (!order) {
        notFound();
    }

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

    const formattedOrder = {
        ...order,
        totalAmount: Number(order.totalAmount),
        taxAmount: Number(order.taxAmount),
        items: order.items.map(item => ({
            ...item,
            quantity: item.quantity,
            unitPrice: Number(item.unitPrice),
            totalPrice: Number(item.totalPrice),
            device: {
                name: item.device.name
            }
        })),
        user: {
            ...order.user,
            // Ensure nulls are handled or passed as is if interface allows nulls
            address: order.user.address,
            city: order.user.city,
            postalCode: order.user.postalCode,
            country: order.user.country
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/orders">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                        Commande {order.orderNumber}
                        <Badge className={`${statusMap[order.status]?.color} text-white`}>
                            {statusMap[order.status]?.label || order.status}
                        </Badge>
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Créée le {format(new Date(order.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                    </p>
                </div>
                <div className="ml-auto flex gap-2">
                    <PaymentManager
                        orderId={order.id}
                        currentPaymentStatus={order.paymentStatus}
                        currentPaymentMethod={order.paymentMethod}
                        currentPaidAmount={Number(order.paidAmount)}
                        totalAmount={Number(order.totalAmount)}
                    />
                    <QuoteGenerator order={formattedOrder} />
                    <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Col: Order Items */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Détails de la commande</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-start py-4 border-b last:border-0 border-slate-100">
                                        <div className="w-16 h-16 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                                            {item.device.imageUrl && (
                                                <img src={item.device.imageUrl} alt={item.device.name} className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{item.device.name}</h4>
                                            <div className="text-sm text-slate-500">Ref: {item.device.slug}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">
                                                {item.quantity} x {formatPrice(Number(item.unitPrice))}
                                            </div>
                                            <div className="font-bold text-lg">
                                                {formatPrice(Number(item.totalPrice))}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="pt-4 space-y-2 text-right">
                                    <div className="flex justify-between max-w-xs ml-auto text-slate-500">
                                        <span>Sous-total HT</span>
                                        <span>{formatPrice(Number(order.totalAmount))}</span>
                                    </div>
                                    <div className="flex justify-between max-w-xs ml-auto text-slate-500">
                                        <span>TVA (20%)</span>
                                        <span>{formatPrice(Number(order.taxAmount))}</span>
                                    </div>
                                    <div className="flex justify-between max-w-xs ml-auto font-bold text-lg pt-2 border-t">
                                        <span>Total TTC</span>
                                        <span>{formatPrice(Number(order.totalAmount) + Number(order.taxAmount))}</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {order.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Notes / Message Client</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="whitespace-pre-wrap text-slate-700 bg-slate-50 p-4 rounded-lg">
                                    {order.notes}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Col: Customer Info */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-1">
                                <h3 className="font-bold text-lg">{order.user.companyName || order.user.firstName}</h3>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Mail className="w-4 h-4" /> <a href={`mailto:${order.user.email}`} className="hover:underline">{order.user.email}</a>
                                </div>
                                {order.user.phone && (
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <Phone className="w-4 h-4" /> {order.user.phone}
                                    </div>
                                )}
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Adresse de facturation
                                </h4>
                                <div className="text-sm text-slate-600">
                                    {order.user.address ? (
                                        <>
                                            {order.user.address}<br />
                                            {order.user.postalCode} {order.user.city}<br />
                                            {order.user.country}
                                        </>
                                    ) : (
                                        <span className="italic text-slate-400">Adresse non renseignée</span>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
