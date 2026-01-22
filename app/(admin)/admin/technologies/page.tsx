import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Pencil, Eye, EyeOff } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default async function AdminTechnologiesPage() {
    const technologies = await prisma.technologyContent.findMany({
        orderBy: { orderIndex: "asc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Technologies</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Gérez le contenu de la page Technologies
                    </p>
                </div>
                <Link href="/admin/technologies/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Nouvelle technologie
                    </Button>
                </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Icône</TableHead>
                            <TableHead>Titre</TableHead>
                            <TableHead>Technologie</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {technologies.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                    Aucune technologie. Créez-en une pour commencer.
                                </TableCell>
                            </TableRow>
                        ) : (
                            technologies.map((tech) => (
                                <TableRow key={tech.id}>
                                    <TableCell className="text-2xl">{tech.icon}</TableCell>
                                    <TableCell className="font-medium">{tech.title}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{tech.technology}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {tech.visible ? (
                                            <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-200">
                                                <Eye className="w-3 h-3" /> Visible
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="gap-1">
                                                <EyeOff className="w-3 h-3" /> Masqué
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/technologies/${tech.id}`}>
                                            <Button variant="ghost" size="sm" className="gap-2">
                                                <Pencil className="w-4 h-4" /> Modifier
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
