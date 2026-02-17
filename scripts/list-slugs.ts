import { prisma } from "../lib/prisma";

async function main() {
    const devices = await prisma.device.findMany({
        select: {
            name: true,
            slug: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    console.log("\n📋 Liste des appareils et leurs slugs:\n");
    devices.forEach((device) => {
        console.log(`${device.name.padEnd(50)} → ${device.slug}`);
    });
    console.log(`\n✅ Total: ${devices.length} appareils\n`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
