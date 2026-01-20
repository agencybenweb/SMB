"use server";

import { prisma } from "@/lib/prisma";
import { Device } from "@prisma/client";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export type CartItem = {
    device: Device;
    quantity: number;
};

export async function submitQuote(
    formData: { company: string; email: string; phone: string; message: string },
    items: CartItem[]
) {
    const { company, email, phone, message } = formData;

    if (!email || items.length === 0) {
        return { success: false, error: "Données invalides" };
    }

    // 1. Find or Create User
    let userId: string;
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        userId = existingUser.id;
    } else {
        // Create new prospect user
        const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                companyName: company,
                phone,
                passwordHash,
                role: "CLIENT_PRO",
                status: "PENDING_VERIFICATION",
                firstName: company, // Placeholder
            },
        });
        userId = newUser.id;
    }

    // 2. Create Order (Quote)
    // Generate pseudo-random order number
    const orderNumber = `DEV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    // Calculate totals
    const totalAmount = items.reduce((acc, item) => acc + (Number(item.device.basePrice) * item.quantity), 0);
    const taxAmount = totalAmount * 0.20; // 20% VAT roughly

    try {
        await prisma.order.create({
            data: {
                userId,
                orderNumber,
                status: "DRAFT", // It's a quote request
                totalAmount,
                taxAmount,
                shippingAddress: `A confirmer - ${company}`,
                notes: `Message client: ${message}\nPhone: ${phone}`,
                items: {
                    create: items.map((item) => ({
                        deviceId: item.device.id,
                        quantity: item.quantity,
                        unitPrice: item.device.basePrice || 0,
                        totalPrice: Number(item.device.basePrice || 0) * item.quantity,
                    })),
                },
            },
        });

        revalidatePath("/admin/orders");
        return { success: true };

    } catch (error) {
        console.error("Error creating quote:", error);
        return { success: false, error: "Erreur lors de l'enregistrement du devis." };
    }
}
