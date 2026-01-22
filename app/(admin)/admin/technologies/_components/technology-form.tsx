"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { upsertTechnology } from "../actions";
import { TechnologyContent } from "@prisma/client";
import { useState } from "react";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

const TECHNOLOGIES = [
    "HIFU",
    "LASER",
    "LED",
    "CRYOLIPOLYSE",
    "LIFTING",
    "VACUUM",
    "EMS",
    "HYDRAFACIAL",
    "PRESSOTHERAPIE",
    "ANALYSE_CORPORELLE",
    "DIAGNOSTIC"
];

export function TechnologyForm({ technology }: { technology?: TechnologyContent }) {
    const [loading, setLoading] = useState(false);

    return (
        <form
            action={async (formData) => {
                setLoading(true);
                await upsertTechnology(formData, technology?.id);
                setLoading(false);
            }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/technologies">
                        <Button variant="outline" size="icon" type="button">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{technology ? "Modifier la technologie" : "Nouvelle technologie"}</h1>
                        <p className="text-sm text-slate-500">{technology ? technology.title : "Créez une nouvelle fiche technologie"}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button type="submit" disabled={loading} className="gap-2">
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        <Save className="w-4 h-4" /> Enregistrer
                    </Button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* MAIN INFO */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="font-semibold mb-4">Informations Générales</h3>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Technologie</Label>
                                <Select name="technology" defaultValue={technology?.technology || "HIFU"}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Sélectionner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {TECHNOLOGIES.map(t => (
                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Icône (emoji)</Label>
                                <Input name="icon" defaultValue={technology?.icon || "✨"} placeholder="✨" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Titre</Label>
                            <Input name="title" defaultValue={technology?.title} required placeholder="Ex: Électrostimulation Musculaire (EMS)" />
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea name="description" defaultValue={technology?.description || ""} rows={6} placeholder="Description complète de la technologie..." />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Bénéfices Clés</Label>
                                <span className="text-xs text-slate-400">Un par ligne</span>
                            </div>
                            <Textarea
                                name="benefits"
                                defaultValue={technology?.benefits ? (JSON.parse(technology.benefits) as string[]).join("\n") : ""}
                                rows={5}
                                placeholder="Tonification musculaire profonde&#10;Amélioration de la circulation&#10;..."
                            />
                        </div>
                    </div>
                </div>

                {/* SIDEBAR SETTINGS */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="font-semibold">Publication</h3>

                        <div className="flex items-center space-x-2 pt-4">
                            <Checkbox id="visible" name="visible" defaultChecked={technology?.visible ?? true} />
                            <Label htmlFor="visible" className="cursor-pointer">Visible sur le site</Label>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
