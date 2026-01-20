
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateUserStatus(userId: string, status: "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED") {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { status },
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Erreur mise à jour status:", error);
        return { success: false, error: "Erreur lors de la mise à jour" };
    }
}

export async function updateUserRole(userId: string, role: "ADMIN" | "CLIENT_PRO") {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { role },
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Erreur mise à jour role:", error);
        return { success: false, error: "Erreur lors de la mise à jour" };
    }
}

export async function deleteUser(userId: string) {
    try {
        await prisma.user.delete({
            where: { id: userId },
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Erreur suppression utilisateur:", error);
        return { success: false, error: "Erreur lors de la suppression" };
    }
}
