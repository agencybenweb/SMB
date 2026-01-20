
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { RefreshCcw, CheckCircle, Truck, Package, XCircle, FileText } from "lucide-react";
import { updateOrderStatus } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface OrderStatusUpdaterProps {
    orderId: string;
    currentStatus: string;
}

const statusMap: Record<string, { label: string; color: string; icon: any }> = {
    DRAFT: { label: "Devis (Brouillon)", color: "bg-slate-500", icon: FileText },
    PENDING: { label: "En attente", color: "bg-amber-500", icon: RefreshCcw },
    CONFIRMED: { label: "Confirmée", color: "bg-blue-500", icon: CheckCircle },
    IN_PRODUCTION: { label: "En production", color: "bg-purple-500", icon: Package },
    SHIPPED: { label: "Expédiée", color: "bg-indigo-500", icon: Truck },
    DELIVERED: { label: "Livrée", color: "bg-green-500", icon: CheckCircle },
    CANCELLED: { label: "Annulée", color: "bg-red-500", icon: XCircle },
    REFUNDED: { label: "Remboursée", color: "bg-red-700", icon: XCircle },
};

export function OrderStatusUpdater({ orderId, currentStatus }: OrderStatusUpdaterProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleStatusChange = async (status: string) => {
        if (status === currentStatus) return;

        setLoading(true);
        const result = await updateOrderStatus(orderId, status);
        setLoading(false);

        if (result.success) {
            toast.success(`Commande passée en ${statusMap[status]?.label || status}`);
            router.refresh();
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={loading}>
                    Changer le statut
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Statut de la commande</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {Object.entries(statusMap).map(([key, value]) => {
                    const Icon = value.icon;
                    return (
                        <DropdownMenuItem
                            key={key}
                            onClick={() => handleStatusChange(key)}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                <Icon className={`mr-2 h-4 w-4 ${key === currentStatus ? "text-primary" : "text-slate-400"}`} />
                                <span className={key === currentStatus ? "font-bold" : ""}>{value.label}</span>
                            </div>
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
