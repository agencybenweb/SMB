"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status: status as any },
            include: { user: true }
        });

        // Activation automatique du compte prospect lors de la validation du devis
        // Si le devis passe en PENDING (validé par admin) ou CONFIRMED
        if (
            (status === "PENDING" || status === "CONFIRMED") &&
            order.user.status === "PENDING_VERIFICATION"
        ) {
            await prisma.user.update({
                where: { id: order.user.id },
                data: { status: "ACTIVE" }
            });
            console.log(`User ${order.user.email} (ID: ${order.user.id}) activated automatically upon order confirmation.`);

            // TODO: Ici, déclencher l'envoi d'un email de bienvenue au client
            // avec un lien pour définir son mot de passe.
        }

        revalidatePath(`/admin/orders/${orderId}`);
        revalidatePath("/admin/orders");
        revalidatePath("/admin/users"); // Refresh users list

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
