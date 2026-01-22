"use server";

import { prisma } from "@/lib/prisma";
import { DeviceStatus, DeviceTechnology } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function upsertDevice(formData: FormData, id?: string) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const technology = formData.get("technology") as DeviceTechnology;
    const shortDescription = formData.get("shortDescription") as string;
    const description = formData.get("description") as string;
    const basePrice = parseFloat(formData.get("basePrice") as string);
    let imageUrl = formData.get("imageUrl") as string;

    // Handle File Upload
    const imageFile = formData.get("imageFile") as File;

    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        try {
            const buffer = Buffer.from(await imageFile.arrayBuffer());
            const ext = path.extname(imageFile.name) || ".jpg";
            const filename = `device-${Date.now()}${ext}`;
            const uploadDir = path.join(process.cwd(), "public/uploads/devices");

            await mkdir(uploadDir, { recursive: true });
            await writeFile(path.join(uploadDir, filename), buffer);
            imageUrl = `/uploads/devices/${filename}`;
        } catch (error) {
            console.error("Error uploading device image:", error);
        }
    }
    const status = formData.get("status") as DeviceStatus;
    const featured = formData.get("featured") === "on";
    const expectedResults = formData.get("expectedResults") as string;

    // JSON fields handling (simple text area parsing for now, or just empty array if invalid)
    // Ideally we would want structured inputs, but for MVP text areas are fine
    // We'll trust the admin uses valid JSON or we default to empty.

    // For simplicity in this iteration, we keep the existing JSON if not provided/complex
    // But to allow editing, we might need a more complex UI. 
    // Let's rely on Prisma defaults or keep existing if partial update? 
    // No, let's keep it simple: We won't edit JSON arrays in this V1 action unless specifically asked.
    // We will focus on the main fields + specs text.

    const benefitsRaw = formData.get("benefits") as string;
    const specificationsRaw = formData.get("specifications") as string;

    // Parse Benefits (Lines to JSON Array)
    const benefits = JSON.stringify(
        benefitsRaw ? benefitsRaw.split("\n").map(l => l.trim()).filter(l => l.length > 0) : []
    );

    const indicationsRaw = formData.get("indications") as string;
    // Parse Indications (Lines to JSON Array)
    const indications = JSON.stringify(
        indicationsRaw ? indicationsRaw.split("\n").map(l => l.trim()).filter(l => l.length > 0) : []
    );

    // Parse Specifications (Lines "Key: Value" to JSON Object)
    const specificationsObj: Record<string, string> = {};
    if (specificationsRaw) {
        specificationsRaw.split("\n").forEach(line => {
            const separatorIndex = line.indexOf(":");
            if (separatorIndex > 0) {
                const key = line.substring(0, separatorIndex).trim();
                const value = line.substring(separatorIndex + 1).trim();
                if (key && value) {
                    specificationsObj[key] = value;
                }
            }
        });
    }
    const specifications = JSON.stringify(specificationsObj);

    const certificationsRaw = formData.get("certifications") as string;
    const certifications = JSON.stringify(
        certificationsRaw ? certificationsRaw.split("\n").map(l => l.trim()).filter(l => l.length > 0) : []
    );

    const data = {
        name,
        slug,
        technology,
        shortDescription,
        description,
        basePrice,
        imageUrl,
        status,
        featured,
        expectedResults,
        benefits,
        specifications,
        indications,
        certifications,
    };

    if (id) {
        await prisma.device.update({
            where: { id },
            data,
        });
    } else {
        await prisma.device.create({
            data: {
                ...data,
                orderIndex: 0,
                galleryUrls: "[]"
            },
        });
    }

    revalidatePath("/admin/devices");
    revalidatePath("/appareils");
    revalidatePath(`/appareils/${slug}`);

    redirect("/admin/devices");
}

export async function deleteDevice(id: string) {
    await prisma.device.delete({ where: { id } });
    revalidatePath("/admin/devices");
}
