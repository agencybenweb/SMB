
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";

export async function deleteDocument(documentId: string) {
    try {
        // 1. Get the document to find the file path
        const document = await prisma.userDocument.findUnique({
            where: { id: documentId },
        });

        if (!document) {
            return { success: false, error: "Document introuvable" };
        }

        // 2. Delete file from filesystem if it's stored locally
        if (document.fileUrl && document.fileUrl.startsWith("/uploads/")) {
            const filePath = path.join(process.cwd(), "public", document.fileUrl);
            try {
                await fs.unlink(filePath);
            } catch (err) {
                console.warn(`Could not delete file ${filePath}:`, err);
                // Continue deletion from DB even if file deletion fails
            }
        }

        // 3. Delete from Database
        await prisma.userDocument.delete({
            where: { id: documentId },
        });

        revalidatePath("/admin/documents");
        return { success: true };
    } catch (error) {
        console.error("Error deleting document:", error);
        return { success: false, error: "Erreur lors de la suppression" };
    }
}
