"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard, Loader2 } from "lucide-react";
import { updatePayment } from "../actions";

interface PaymentManagerProps {
    orderId: string;
    currentPaymentStatus: string;
    currentPaymentMethod: string | null;
    currentPaidAmount: number;
    totalAmount: number;
}

export function PaymentManager({
    orderId,
    currentPaymentStatus,
    currentPaymentMethod,
    currentPaidAmount,
    totalAmount
}: PaymentManagerProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(currentPaymentStatus);
    const [paymentMethod, setPaymentMethod] = useState(currentPaymentMethod || "BANK_TRANSFER");
    const [paidAmount, setPaidAmount] = useState(currentPaidAmount.toString());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("paymentStatus", paymentStatus);
        formData.append("paymentMethod", paymentMethod);
        formData.append("paidAmount", paidAmount);

        await updatePayment(orderId, formData);

        setLoading(false);
        setOpen(false);
        window.location.reload();
    };

    const statusColors: Record<string, string> = {
        PENDING: "bg-amber-500",
        PARTIAL: "bg-blue-500",
        PAID: "bg-green-500",
        FAILED: "bg-red-500",
        REFUNDED: "bg-purple-500"
    };

    const statusLabels: Record<string, string> = {
        PENDING: "En attente",
        PARTIAL: "Partiel",
        PAID: "Payé",
        FAILED: "Échec",
        REFUNDED: "Remboursé"
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <CreditCard className="w-4 h-4" />
                    Gérer le paiement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Gestion du paiement</DialogTitle>
                    <DialogDescription>
                        Mettez à jour le statut et les informations de paiement de cette commande.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Statut du paiement</Label>
                        <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(statusLabels).map(([value, label]) => (
                                    <SelectItem key={value} value={value}>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${statusColors[value]}`} />
                                            {label}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Méthode de paiement</Label>
                        <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BANK_TRANSFER">Virement bancaire</SelectItem>
                                <SelectItem value="CASH">Espèces</SelectItem>
                                <SelectItem value="INSTALLMENT">Paiement échelonné</SelectItem>
                                <SelectItem value="LEASING">Leasing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Montant payé (€)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={paidAmount}
                            onChange={(e) => setPaidAmount(e.target.value)}
                            placeholder="0.00"
                        />
                        <p className="text-xs text-slate-500">
                            Montant total : {totalAmount.toFixed(2)} €
                        </p>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
