import { prisma } from "@/lib/prisma";
import { TechnologyForm } from "../_components/technology-form";
import { notFound } from "next/navigation";

export default async function EditTechnologyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const technology = await prisma.technologyContent.findUnique({
        where: { id },
    });

    if (!technology) {
        notFound();
    }

    return <TechnologyForm technology={technology} />;
}
