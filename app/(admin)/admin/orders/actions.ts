
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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
        // 1. Decode Base64
        // Extract content after "base64," if present
        const base64Data = formData.fileContentBase64.split(';base64,').pop() || "";
        const buffer = Buffer.from(base64Data, "base64");

        // 2. Define path
        const uploadDir = path.join(process.cwd(), "public/uploads/documents");
        // Ensure dir exists (should be done by mkdir, but good practice to check logic, here assuming existed or handled)

        const fileName = `devis-${formData.orderNumber}-${uuidv4().slice(0, 8)}.pdf`;
        const filePath = path.join(uploadDir, fileName);
        const publicUrl = `/uploads/documents/${fileName}`;

        // 3. Write file
        await fs.writeFile(filePath, buffer);

        // 4. Create UserDocument Record
        await prisma.userDocument.create({
            data: {
                userId: formData.userId,
                title: `Devis #${formData.orderNumber}`,
                type: "QUOTE",
                description: `Devis généré pour la commande ${formData.orderNumber}`,
                fileUrl: publicUrl,
                accessLevel: "CLIENT_PRO",
                mimeType: "application/pdf"
            }
        });

        // Optional: Link directly to order via contract relations if we wanted, 
        // but for now we follow the unified documents logic we just built.
        // Actually, our new 'documents/page.tsx' looks for 'contracts' or 'invoices' linked to order OR generic userDocs. 
        // To make it appear nicely in the 'Orders' section of documents, we should ideally link it as a Contract or create a Quote relation.
        // But since we don't have a 'quotes' relation on Order, saving as UserDocument is the safest fallback 
        // AND it will appear in the 'Documents Personnels' section, which is fine.
        // WAIT! The previous step modified documents page to show INVOICES from Order.invoices and CONTRACTS from Order.contracts. 
        // It DOES NOT look for generic UserDocuments linked to an order via description. 
        // So if I want it to appear clearly, I should probably save it as a 'Contract' type if I can't change schema, 
        // or just accept it appears in 'Documents personnels'.
        // Let's stick to UserDocument (Documents personnels) for now, it's safer than hacking the Contract table.

        revalidatePath(`/admin/orders/${formData.orderId}`);
        return { success: true, url: publicUrl };

    } catch (error) {
        console.error("Error uploading quote:", error);
        return { success: false, error: "Erreur lors de l'enregistrement du devis" };
    }
}
