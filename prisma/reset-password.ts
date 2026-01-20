
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "test@spa.com";
    const newPassword = "password123";
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    try {
        const user = await prisma.user.update({
            where: { email },
            data: {
                passwordHash: hashedPassword,
                status: "ACTIVE", // Activate the user as well so login works
                emailVerified: new Date(),
            },
        });
        console.log(`✅ Mot de passe mis à jour pour ${user.email} -> ${newPassword}`);
        console.log(`✅ Statut mis à jour -> ${user.status}`);
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour :", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
