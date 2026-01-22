"use server";

import { prisma } from "@/lib/prisma";
import { DeviceTechnology } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function upsertTechnology(formData: FormData, id?: string) {
    const technology = formData.get("technology") as DeviceTechnology;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const visible = formData.get("visible") === "on";

    const benefitsRaw = formData.get("benefits") as string;
    const benefits = JSON.stringify(
        benefitsRaw ? benefitsRaw.split("\n").map(l => l.trim()).filter(l => l.length > 0) : []
    );

    const data = {
        technology,
        title,
        description,
        benefits,
        icon: icon || "✨",
        visible,
    };

    if (id) {
        await prisma.technologyContent.update({
            where: { id },
            data,
        });
    } else {
        await prisma.technologyContent.create({
            data: {
                ...data,
                orderIndex: 0,
            },
        });
    }

    revalidatePath("/admin/technologies");
    revalidatePath("/technologies");
    redirect("/admin/technologies");
}

export async function deleteTechnology(id: string) {
    await prisma.technologyContent.delete({ where: { id } });
    revalidatePath("/admin/technologies");
    revalidatePath("/technologies");
}
