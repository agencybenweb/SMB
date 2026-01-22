"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { createUser } from "../actions";

export function CreateUserButton() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form data
    const [formData, setFormData] = useState<{
        email: string;
        firstName: string;
        lastName: string;
        companyName: string;
        password: string;
        role: "ADMIN" | "CLIENT_PRO";
        status: "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED";
    }>({
        email: "",
        firstName: "",
        lastName: "",
        companyName: "",
        password: "",
        role: "CLIENT_PRO",
        status: "ACTIVE"
    });

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            toast.error("Email et mot de passe requis");
            return;
        }

        setLoading(true);
        const res = await createUser(formData);
        setLoading(false);

        if (res.success) {
            toast.success("Utilisateur créé avec succès");
            setOpen(false);
            // Reset form
            setFormData({
                email: "",
                firstName: "",
                lastName: "",
                companyName: "",
                password: "",
                role: "CLIENT_PRO",
                status: "ACTIVE"
            });
        } else {
            toast.error(res.error || "Une erreur est survenue");
        }
    };

    return (
        <>
            <Button onClick={() => setOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Nouvel utilisateur
            </Button>

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="max-w-md w-full">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Ajouter un utilisateur</AlertDialogTitle>
                    </AlertDialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Prénom</Label>
                                <Input
                                    value={formData.firstName}
                                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Nom</Label>
                                <Input
                                    value={formData.lastName}
                                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Email *</Label>
                            <Input
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                placeholder="client@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Mot de passe *</Label>
                            <Input
                                type="text"
                                required
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                placeholder="Mot de passe initial"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Société</Label>
                            <Input
                                value={formData.companyName}
                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                placeholder="Nom de l'institut..."
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Rôle</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(v: "ADMIN" | "CLIENT_PRO") => setFormData({ ...formData, role: v })}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="CLIENT_PRO">Client Pro</SelectItem>
                                        <SelectItem value="ADMIN">Administrateur</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Statut Initial</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(v: "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED") => setFormData({ ...formData, status: v })}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ACTIVE">Actif</SelectItem>
                                        <SelectItem value="PENDING_VERIFICATION">En attente</SelectItem>
                                        <SelectItem value="SUSPENDED">Suspendu</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Création..." : "Créer l'utilisateur"}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
