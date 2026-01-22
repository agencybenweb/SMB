import { prisma } from "@/lib/prisma";
import { TechnologyForm } from "../_components/technology-form";
import { notFound } from "next/navigation";

export default async function EditTechnologyPage({ params }: { params: { id: string } }) {
    const technology = await prisma.technologyContent.findUnique({
        where: { id: params.id },
    });

    if (!technology) {
        notFound();
    }

    return <TechnologyForm technology={technology} />;
}
