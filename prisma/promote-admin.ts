
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const email = "test@spa.com";

    try {
        const user = await prisma.user.update({
            where: { email },
            data: {
                role: "ADMIN", // Promotion en ADMIN pour éviter les problèmes de redirection
                status: "ACTIVE",
            },
        });
        console.log(`✅ Utilisateur ${user.email} mis à jour :`);
        console.log(`   Rôle -> ${user.role}`);
        console.log(`   Statut -> ${user.status}`);
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour :", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
