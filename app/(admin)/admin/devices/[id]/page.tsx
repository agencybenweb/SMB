import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DeviceForm } from "../_components/device-form";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function EditDevicePage({ params }: PageProps) {
    const { id } = await params;
    const device = await prisma.device.findUnique({
        where: { id },
    });

    if (!device) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto">
            <DeviceForm device={device} />
        </div>
    );
}
