
"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function updateUserProfile(formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    companyName?: string;
    siret?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    country?: string;
    jobTitle?: string;
    website?: string;
}) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return { success: false, error: "Non autorisé" };
    }

    try {
        // Check if email is already taken by ANOTHER user
        if (formData.email) {
            const existingUser = await prisma.user.findUnique({
                where: { email: formData.email },
            });

            if (existingUser && existingUser.id !== session.user.id) {
                return { success: false, error: "Cet email est déjà utilisé." };
            }
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                companyName: formData.companyName,
                siret: formData.siret,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
                country: formData.country,
                jobTitle: formData.jobTitle,
                website: formData.website,
            },
        });

        revalidatePath("/dashboard/settings");
        revalidatePath("/admin/settings");
        revalidatePath("/dashboard/profil"); // Legacy
        return { success: true };
    } catch (error) {
        console.error("Profile update error:", error);
        return { success: false, error: "Erreur lors de la mise à jour." };
    }
}

export async function updateUserPassword(currentPassword: string, newPassword: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return { success: false, error: "Non autorisé" };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user || !user.passwordHash) {
            return { success: false, error: "Utilisateur introuvable." };
        }

        // Verify current password
        const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!isValid) {
            return { success: false, error: "Mot de passe actuel incorrect." };
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                passwordHash: hashedPassword,
            },
        });

        return { success: true };
    } catch (error) {
        console.error("Password update error:", error);
        return { success: false, error: "Erreur lors du changement de mot de passe." };
    }
}
