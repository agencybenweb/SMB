import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deviceImages: Record<string, string> = {
    "cryo-slim-pro": "https://images.unsplash.com/photo-1618218161175-01e4bf32dd82?w=800&auto=format&fit=crop&q=60",
    "ems-pro-elite": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&auto=format&fit=crop&q=60",
    "lipolaser-pro": "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=800&auto=format&fit=crop&q=60",
    "rf-beauty-expert": "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&auto=format&fit=crop&q=60",
    "hifu-lifting-system": "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=60",
    "vacuum-rf-plus": "https://images.unsplash.com/photo-1598256989487-b95764c92135?w=800&auto=format&fit=crop&q=60",
    "presso-pro": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=60",
    "cavi-slim-advanced": "https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=800&auto=format&fit=crop&q=60"
};

async function main() {
    console.log("Start updating device images...");

    for (const [slug, url] of Object.entries(deviceImages)) {
        const device = await prisma.device.findUnique({
            where: { slug }
        });

        if (device) {
            await prisma.device.update({
                where: { slug },
                data: { imageUrl: url }
            });
            console.log(`Updated image for ${slug}`);
        } else {
            console.warn(`Device ${slug} not found`);
        }
    }

    console.log("Images updated successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
