
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUserProfile } from "@/app/actions/settings";
import { Loader2, Save } from "lucide-react";
import { User } from "@prisma/client";

interface ProfileFormProps {
    user: User;
    mode?: "simple" | "full"; // Simple for basic admin, Full for client with company info
}

export function SharedProfileForm({ user, mode = "simple" }: ProfileFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        jobTitle: user.jobTitle || "",
        // Pro fields
        companyName: user.companyName || "",
        siret: user.siret || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
        country: user.country || "France",
        website: user.website || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // We pass all data, the action handles optional ones
        const result = await updateUserProfile(formData);
        setLoading(false);

        if (result.success) {
            toast.success("Profil mis à jour avec succès");
        } else {
            toast.error(result.error || "Erreur lors de la mise à jour");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

            {/* Identity */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Identité</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input id="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input id="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>
                </div>
                {mode === "full" && (
                    <div className="space-y-2">
                        <Label htmlFor="jobTitle">Fonction / Poste</Label>
                        <Input id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Gérant, Esthéticienne..." />
                    </div>
                )}
            </div>

            {/* Corporate Info (Only for Full Mode) */}
            {mode === "full" && (
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Entreprise</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="companyName">Raison Sociale</Label>
                            <Input id="companyName" value={formData.companyName} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="siret">SIRET</Label>
                            <Input id="siret" value={formData.siret} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Adresse</Label>
                        <Input id="address" value={formData.address} onChange={handleChange} />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="postalCode">Code Postal</Label>
                            <Input id="postalCode" value={formData.postalCode} onChange={handleChange} />
                        </div>
                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="city">Ville</Label>
                            <Input id="city" value={formData.city} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="website">Site Web</Label>
                        <Input id="website" type="url" value={formData.website} onChange={handleChange} placeholder="https://..." />
                    </div>
                </div>
            )}

            <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <Save className="w-4 h-4 mr-2" /> Enregistrer les modifications
            </Button>
        </form>
    );
}
