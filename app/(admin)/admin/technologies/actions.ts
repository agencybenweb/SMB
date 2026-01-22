"use server";

import { prisma } from "@/lib/prisma";
import { DeviceTechnology } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function upsertTechnology(formData: FormData, id?: string) {
    const technology = formData.get("technology") as DeviceTechnology;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const icon = formData.get("icon") as string;
    const visible = formData.get("visible") === "on";
    let imageUrl = formData.get("imageUrl") as string;

    // Handle File Upload
    const imageFile = formData.get("imageFile") as File;
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        try {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const ext = path.extname(imageFile.name) || ".jpg";
            const filename = `tech-${Date.now()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public/uploads/technologies");

            await mkdir(uploadDir, { recursive: true });
            await writeFile(path.join(uploadDir, filename), buffer);
            imageUrl = `/uploads/technologies/${filename}`;
        } catch (error) {
            console.error("Error uploading technology image:", error);
        }
    }

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
        imageUrl,
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
