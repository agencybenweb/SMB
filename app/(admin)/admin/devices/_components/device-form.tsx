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
import { upsertDevice } from "../actions";
import { Device } from "@prisma/client";
import { useState } from "react";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Hardcoded for now to avoid server-client import issues with Enums if not configured
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

const STATUSES = ["ACTIVE", "INACTIVE", "DRAFT", "ARCHIVED"];

export function DeviceForm({ device }: { device?: Device }) {
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(device?.imageUrl || "");

    return (
        <form
            action={async (formData) => {
                setLoading(true);
                await upsertDevice(formData, device?.id);
                setLoading(false);
            }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/devices">
                        <Button variant="outline" size="icon" type="button">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">{device ? "Modifier l'appareil" : "Nouvel appareil"}</h1>
                        <p className="text-sm text-slate-500">{device ? device.name : "Créez une nouvelle fiche produit"}</p>
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
                                <Label>Nom du produit</Label>
                                <Input name="name" defaultValue={device?.name} required placeholder="Ex: Cryo Slim Pro" />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (URL)</Label>
                                <Input name="slug" defaultValue={device?.slug} required placeholder="ex: cryo-slim-pro" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Technologie</Label>
                                <Select name="technology" defaultValue={device?.technology || "HIFU"}>
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
                                <Label>Prix de base (€ HT)</Label>
                                <Input name="basePrice" type="number" step="0.01" defaultValue={device ? Number(device.basePrice) : ""} placeholder="Ex: 14900" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description Courte (Liste)</Label>
                            <Textarea name="shortDescription" defaultValue={device?.shortDescription || ""} rows={2} placeholder="Une phrase d'accroche pour la liste..." />
                        </div>

                        <div className="space-y-2">
                            <Label>Description Détaillée</Label>
                            <Textarea name="description" defaultValue={device?.description || ""} rows={6} placeholder="Description complète du produit..." />
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="font-semibold mb-4">Détails Techniques & Marketing</h3>

                        <div className="space-y-2">
                            <Label>Résultats Attendus</Label>
                            <Textarea name="expectedResults" defaultValue={device?.expectedResults || ""} rows={3} placeholder="Résultats visibles dès..." />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Indications (Traitements)</Label>
                                <span className="text-xs text-slate-400">Un par ligne</span>
                            </div>
                            <Textarea
                                name="indications"
                                defaultValue={device?.indications ? (JSON.parse(device.indications) as string[]).join("\n") : ""}
                                rows={4}
                                placeholder="Relâchement cutané&#10;Cellulite aqueuse&#10;..."
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Bénéfices Clés</Label>
                                <span className="text-xs text-slate-400">Un par ligne</span>
                            </div>
                            <Textarea
                                name="benefits"
                                defaultValue={device?.benefits ? (JSON.parse(device.benefits) as string[]).join("\n") : ""}
                                rows={4}
                                placeholder="Augmentation du chiffre d'affaires&#10;Fidélisation client&#10;..."
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Spécifications Techniques</Label>
                                <span className="text-xs text-slate-400">Format: Clé: Valeur (une par ligne)</span>
                            </div>
                            <Textarea
                                name="specifications"
                                defaultValue={device?.specifications ? Object.entries(JSON.parse(device.specifications) as Record<string, string>).map(([k, v]) => `${k}: ${v}`).join("\n") : ""}
                                rows={5}
                                placeholder="Puissance: 2000W&#10;Fréquence: 50Hz&#10;Poids: 20kg"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Label>Certifications</Label>
                                <span className="text-xs text-slate-400">Une par ligne (Ex: CE, FDA...)</span>
                            </div>
                            <Textarea
                                name="certifications"
                                defaultValue={device?.certifications ? (JSON.parse(device.certifications) as string[]).join("\n") : ""}
                                rows={3}
                                placeholder="CE&#10;FDA&#10;ISO 13485"
                            />
                        </div>
                    </div>
                </div>

                {/* SIDEBAR SETTINGS */}
                <div className="space-y-6">

                    {/* IMAGE UPLOAD (URL) */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="font-semibold">Média Principal</h3>
                        <div className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                            {previewImage ? (
                                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-slate-400 text-sm">Aucune image</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label>URL de l'image (copier/coller)</Label>
                            <Input
                                name="imageUrl"
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                                placeholder="https://..."
                            />
                            <p className="text-xs text-slate-500">
                                Utilisez une URL externe ou un chemin local (ex: /images/app1.jpg).
                            </p>
                        </div>
                    </div>

                    {/* PUBLISHING */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="font-semibold">Publication</h3>

                        <div className="space-y-2">
                            <Label>Statut</Label>
                            <Select name="status" defaultValue={device?.status || "DRAFT"}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUSES.map(s => (
                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center space-x-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                            <Checkbox id="featured" name="featured" defaultChecked={device?.featured} />
                            <Label htmlFor="featured" className="cursor-pointer">Mettre en avant (Best Seller)</Label>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    );
}
