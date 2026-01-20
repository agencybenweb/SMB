import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default async function AdminDevicesPage() {
    const devices = await prisma.device.findMany({
        orderBy: { orderIndex: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Appareils</h1>
                <Link href="/admin/devices/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Ajouter un appareil
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Technologie</TableHead>
                            <TableHead>Prix HT</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell>
                                    <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative">
                                        {device.imageUrl ? (
                                            <img src={device.imageUrl} alt={device.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 bg-slate-100 dark:bg-slate-800">
                                                Img
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {device.name}
                                    <div className="text-xs text-slate-500">{device.slug}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{device.technology}</Badge>
                                </TableCell>
                                <TableCell>
                                    {formatPrice(device.basePrice ? Number(device.basePrice) : 0)}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={device.status === "ACTIVE" ? "default" : "secondary"}>
                                        {device.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/appareils/${device.slug}`} target="_blank">
                                            <Button variant="ghost" size="icon" title="Voir la fiche">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/devices/${device.id}`}>
                                            <Button variant="ghost" size="icon" title="Modifier">
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        {/* Delete button would go here (requires server action) */}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
