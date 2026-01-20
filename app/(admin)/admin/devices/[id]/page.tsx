import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DeviceForm } from "../_components/device-form";

interface PageProps {
    params: { id: string };
}

export default async function EditDevicePage({ params }: PageProps) {
    const device = await prisma.device.findUnique({
        where: { id: params.id },
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
