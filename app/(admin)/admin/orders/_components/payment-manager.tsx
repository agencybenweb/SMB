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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Loader2, Save, X } from "lucide-react";
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
    const [editing, setEditing] = useState(false);
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
        setEditing(false);
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

    const methodLabels: Record<string, string> = {
        BANK_TRANSFER: "Virement bancaire",
        CASH: "Espèces",
        INSTALLMENT: "Paiement échelonné",
        LEASING: "Leasing"
    };

    if (!editing) {
        return (
            <Button variant="outline" className="gap-2" onClick={() => setEditing(true)}>
                <CreditCard className="w-4 h-4" />
                Gérer le paiement
            </Button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <Card className="bg-white dark:bg-slate-900 max-w-md w-full relative">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setEditing(false)}
                    type="button"
                >
                    <X className="w-4 h-4" />
                </Button>

                <CardHeader>
                    <CardTitle>Gestion du paiement</CardTitle>
                    <p className="text-sm text-slate-500">
                        Mettez à jour le statut et les informations de paiement de cette commande.
                    </p>
                </CardHeader>

                <CardContent>
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
                                    {Object.entries(methodLabels).map(([value, label]) => (
                                        <SelectItem key={value} value={value}>{label}</SelectItem>
                                    ))}
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
                            <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                                Annuler
                            </Button>
                            <Button type="submit" disabled={loading} className="gap-2">
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                <Save className="w-4 h-4" />
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
