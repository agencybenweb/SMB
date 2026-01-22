
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function resetUserPassword(userId: string, newPassword: string) {
    try {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash },
        });
        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Erreur reset password:", error);
        return { success: false, error: "Erreur lors de la mise à jour du mot de passe" };
    }
}

export async function createUser(data: {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    companyName?: string;
    role: "ADMIN" | "CLIENT_PRO";
    status: "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED";
}) {
    try {
        const { email, password, firstName, lastName, companyName, role, status } = data;

        // Check if user exists
        const exists = await prisma.user.findUnique({ where: { email } });
        if (exists) {
            return { success: false, error: "Cet email est déjà utilisé par un autre utilisateur." };
        }

        // Hash password (default if not provided, though UI should force it or generate one)
        const pwdToHash = password || "ChangeMe123!";
        const passwordHash = await bcrypt.hash(pwdToHash, 10);

        await prisma.user.create({
            data: {
                email,
                passwordHash,
                firstName: firstName || "",
                lastName: lastName || "",
                companyName: companyName || "",
                role,
                status,
            },
        });

        revalidatePath("/admin/users");
        return { success: true };
    } catch (error) {
        console.error("Erreur création utilisateur:", error);
        return { success: false, error: "Erreur lors de la création de l'utilisateur." };
    }
}

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
