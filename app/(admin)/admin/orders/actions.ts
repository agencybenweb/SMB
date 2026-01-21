"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: status as any },
        });
        revalidatePath(`/admin/orders/${orderId}`);
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error) {
        console.error("Erreur mise à jour commande:", error);
        return { success: false, error: "Erreur lors de la mise à jour" };
    }
}

export async function uploadQuote(formData: {
    userId: string;
    orderId: string;
    orderNumber: string;
    fileName: string;
    fileContentBase64: string;
}) {
    try {
        // 1. Extract base64 data
        const base64Data = formData.fileContentBase64.split(';base64,').pop() || "";

        // 2. Calculate file size
        const buffer = Buffer.from(base64Data, "base64");
        const fileSize = buffer.length;

        // 3. Store in database as base64
        const document = await prisma.userDocument.create({
            data: {
                userId: formData.userId,
                title: `Devis #${formData.orderNumber}`,
                type: "QUOTE",
                description: `Devis généré pour la commande ${formData.orderNumber}`,
                fileData: base64Data,
                fileName: `devis-${formData.orderNumber}.pdf`,
                mimeType: "application/pdf",
                fileSize: fileSize,
                accessLevel: "CLIENT_PRO"
            }
        });

        revalidatePath(`/admin/orders/${formData.orderId}`);

        // Return data URL for immediate viewing
        const dataUrl = `data:application/pdf;base64,${base64Data}`;
        return { success: true, url: dataUrl, documentId: document.id };

    } catch (error) {
        console.error("Error uploading quote:", error);
        return { success: false, error: "Erreur lors de l'enregistrement du devis" };
    }
}
