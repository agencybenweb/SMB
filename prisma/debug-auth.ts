
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "test@spa.com";
    const passwordToTest = "password123";

    // 1. Récupérer l'utilisateur
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        console.error("❌ Utilisateur non trouvé !");
        return;
    }

    console.log(`👤 Utilisateur trouvé: ${user.email}`);
    console.log(`🔒 Hash actuel en base: ${user.passwordHash.substring(0, 10)}...`);

    // 2. Tester le mot de passe actuel
    const isValid = await bcrypt.compare(passwordToTest, user.passwordHash);
    console.log(`❓ Le mot de passe '${passwordToTest}' est-il valide ? ${isValid ? "OUI ✅" : "NON ❌"}`);

    if (!isValid) {
        console.log("🔄 Régénération du hash...");
        const newHash = await bcrypt.hash(passwordToTest, 10); // Utiliser 10 tours comme standard parfois plus sûr/rapide

        await prisma.user.update({
            where: { email },
            data: { passwordHash: newHash }
        });
        console.log("✅ Nouveau hash sauvegardé.");

        // Vérification immédiate
        const isValidNow = await bcrypt.compare(passwordToTest, newHash);
        console.log(`❓ Vérification immédiate après mise à jour : ${isValidNow ? "OUI ✅" : "NON ❌"}`);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
