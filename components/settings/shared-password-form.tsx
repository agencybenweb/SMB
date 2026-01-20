
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateUserPassword } from "@/app/actions/settings";
import { Loader2, KeyRound } from "lucide-react";

export function SharedPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Les nouveaux mots de passe ne correspondent pas");
            return;
        }
        if (formData.newPassword.length < 8) {
            toast.error("Le mot de passe doit faire au moins 8 caractères");
            return;
        }

        setLoading(true);

        const result = await updateUserPassword(formData.currentPassword, formData.newPassword);
        setLoading(false);

        if (result.success) {
            toast.success("Mot de passe modifié avec succès");
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } else {
            toast.error(result.error || "Erreur lors du changement");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input
                    id="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                    id="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    required
                    minLength={8}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                />
            </div>

            <Button type="submit" disabled={loading} variant="secondary" className="w-full sm:w-auto">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                <KeyRound className="w-4 h-4 mr-2" /> Changer le mot de passe
            </Button>
        </form>
    );
}
