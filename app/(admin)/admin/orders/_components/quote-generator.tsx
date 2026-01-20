
"use client";

import { Button } from "@/components/ui/button";
import { Printer, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { useState } from "react";
import { uploadQuote } from "../actions";

interface OrderData {
    id: string;
    orderNumber: string;
    createdAt: string | Date;
    user: {
        id: string;
        firstName?: string | null;
        lastName?: string | null;
        companyName?: string | null;
        email: string;
        address?: string | null;
        city?: string | null;
        postalCode?: string | null;
        country?: string | null;
    };
    items: Array<{
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        device: {
            name: string;
        };
    }>;
    totalAmount: number;
    taxAmount: number;
}

interface QuoteGeneratorProps {
    order: OrderData;
}

export function QuoteGenerator({ order }: QuoteGeneratorProps) {
    const [loading, setLoading] = useState(false);

    const generateAndUpload = async () => {
        setLoading(true);
        try {
            const doc = new jsPDF();

            // Colors
            const colorPrimary = [212, 175, 55]; // Gold #D4AF37
            const colorDark = [20, 20, 20]; // Almost Black
            const colorLightGray = [245, 245, 245];

            // --- Header Background ---
            doc.setFillColor(colorDark[0], colorDark[1], colorDark[2]);
            doc.rect(0, 0, 210, 40, 'F');

            // --- Logo / Company Name ---
            doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("MY SCULPT TECHNOLOGY", 15, 20);

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text("L'excellence technologique au service de la beauté", 15, 28);

            // --- Quote Info Box (Right side of header) ---
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(16);
            doc.text("DEVIS", 150, 20);
            doc.setFontSize(10);
            doc.text(`N°: ${order.orderNumber}`, 150, 26);
            doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 150, 31);

            // --- Address Section ---
            const startY = 55;

            // Sender (My Sculpt)
            doc.setTextColor(colorDark[0], colorDark[1], colorDark[2]);
            doc.setFontSize(9);
            doc.setFont("helvetica", "bold");
            doc.text("MY SCULPT TECHNOLOGY", 15, startY);
            doc.setFont("helvetica", "normal");
            doc.text("25 Rue de la Technologie", 15, startY + 5);
            doc.text("75008 Paris, France", 15, startY + 10);
            doc.text("contact@mysculpt.fr", 15, startY + 15);
            doc.text("+33 1 23 45 67 89", 15, startY + 20);

            // Client Box
            doc.setFillColor(250, 250, 250);
            doc.setDrawColor(200, 200, 200);
            doc.roundedRect(110, 50, 85, 40, 2, 2, 'FD');

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.text("Facturer à :", 115, startY);

            doc.setFontSize(10);
            doc.text(order.user.companyName || `${order.user.firstName} ${order.user.lastName}`, 115, startY + 6);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.text(order.user.email, 115, startY + 12);
            if (order.user.address) {
                doc.text(order.user.address, 115, startY + 17);
                doc.text(`${order.user.postalCode || ''} ${order.user.city || ''}`, 115, startY + 22);
                doc.text(order.user.country || 'France', 115, startY + 27);
            }

            // --- Table ---
            const tableColumn = ["Désignation", "Qté", "Prix Unitaire", "Total HT"];
            const tableRows: any[] = [];

            order.items.forEach(item => {
                const itemData = [
                    item.device.name,
                    item.quantity,
                    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(item.unitPrice)),
                    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(item.totalPrice))
                ];
                tableRows.push(itemData);
            });

            // @ts-ignore
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 105,
                theme: 'grid',
                headStyles: {
                    fillColor: colorDark,
                    textColor: [255, 255, 255],
                    fontStyle: 'bold',
                    halign: 'center'
                },
                styles: {
                    fontSize: 10,
                    cellPadding: 5,
                    valign: 'middle'
                },
                columnStyles: {
                    0: { halign: 'left' },
                    1: { halign: 'center', cellWidth: 20 },
                    2: { halign: 'right', cellWidth: 40 },
                    3: { halign: 'right', cellWidth: 40 }
                },
                alternateRowStyles: {
                    fillColor: [248, 248, 248]
                }
            });

            // --- Totals Section ---
            // @ts-ignore
            let finalY = (doc as any).lastAutoTable.finalY + 10;

            // Draw a subtle box for totals
            doc.setFillColor(252, 252, 252);
            doc.rect(130, finalY - 5, 70, 35, 'F');

            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("Sous-total HT :", 135, finalY);
            doc.text("TVA (20%) :", 135, finalY + 7);

            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.text(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(order.totalAmount)), 195, finalY, { align: 'right' });
            doc.text(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(order.taxAmount)), 195, finalY + 7, { align: 'right' });

            // Divider
            doc.setDrawColor(200, 200, 200);
            doc.line(135, finalY + 12, 195, finalY + 12);

            // Grand Total
            doc.setFontSize(12);
            doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]); // Gold
            doc.text("Total TTC :", 135, finalY + 20);
            doc.text(new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(order.totalAmount) + Number(order.taxAmount)), 195, finalY + 20, { align: 'right' });

            // --- "Bon pour accord" Box ---
            finalY += 40;
            doc.setFillColor(255, 255, 255);
            doc.setDrawColor(0, 0, 0);
            doc.rect(15, finalY, 80, 40);
            doc.setFontSize(8);
            doc.setTextColor(100, 100, 100);
            doc.text("Date et Signature du client", 17, finalY + 5);
            doc.text("(Précédé de la mention 'Bon pour accord')", 17, finalY + 9);

            // --- Footer ---
            const pageHeight = doc.internal.pageSize.height;
            doc.setFillColor(colorDark[0], colorDark[1], colorDark[2]);
            doc.rect(0, pageHeight - 20, 210, 20, 'F');

            doc.setTextColor(150, 150, 150);
            doc.setFontSize(8);
            doc.text("MY SCULPT TECHNOLOGY - SAS au capital de 10 000 € - SIRET: 123 456 789 00000", 105, pageHeight - 12, { align: 'center' });
            doc.text("TVA Intracommunautaire: FR 12 345 678 901 - Code NAF: 4646Z", 105, pageHeight - 7, { align: 'center' });

            // --- Upload ---
            const pdfBase64 = doc.output('datauristring');

            const result = await uploadQuote({
                userId: order.user.id,
                orderId: order.id,
                orderNumber: order.orderNumber,
                fileName: `devis-${order.orderNumber}.pdf`,
                fileContentBase64: pdfBase64
            });

            if (result.success) {
                toast.success("Devis pro généré avec succès !");
                window.open(result.url, '_blank');
            } else {
                toast.error("Erreur lors de l'enregistrement");
            }

        } catch (error) {
            console.error(error);
            toast.error("Erreur lors de la génération PDF");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button variant="outline" onClick={generateAndUpload} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Printer className="w-4 h-4" />}
            {loading ? "Création..." : "Générer Devis PDF"}
        </Button>
    );
}
