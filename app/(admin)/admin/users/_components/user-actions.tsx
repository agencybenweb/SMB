
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";
import { MoreHorizontal, CheckCircle, Ban, ShieldAlert, Trash2, UserCog, KeyRound } from "lucide-react";
import { updateUserStatus, updateUserRole, deleteUser, resetUserPassword } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UserActionsProps {
    user: {
        id: string;
        status: string;
        role: string;
        email: string;
    };
}

export function UserActions({ user }: UserActionsProps) {
    const [loading, setLoading] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const router = useRouter();

    const handlePasswordReset = async () => {
        if (!newPassword) return;
        setLoading(true);
        const result = await resetUserPassword(user.id, newPassword);
        setLoading(false);

        if (result.success) {
            toast.success("Mot de passe mis à jour");
            setIsPasswordModalOpen(false);
            setNewPassword("");
            router.refresh();
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const handleStatusChange = async (status: "ACTIVE" | "PENDING_VERIFICATION" | "SUSPENDED") => {
        setLoading(true);
        const result = await updateUserStatus(user.id, status);
        setLoading(false);

        if (result.success) {
            toast.success("Statut mis à jour");
            router.refresh();
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const handleRoleChange = async (role: "ADMIN" | "CLIENT_PRO") => {
        if (!confirm(`Êtes-vous sûr de vouloir changer le rôle de cet utilisateur en ${role} ?`)) return;

        setLoading(true);
        const result = await updateUserRole(user.id, role);
        setLoading(false);

        if (result.success) {
            toast.success("Rôle mis à jour");
            router.refresh();
        } else {
            toast.error("Erreur lors de la mise à jour");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.")) return;

        setLoading(true);
        const result = await deleteUser(user.id);
        setLoading(false);

        if (result.success) {
            toast.success("Utilisateur supprimé");
            router.refresh();
        } else {
            toast.error("Erreur lors de la suppression");
        }
    };

    return (
        <>
            <AlertDialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Définir un nouveau mot de passe</AlertDialogTitle>
                        <AlertDialogDescription>
                            Saisissez un nouveau mot de passe pour l'utilisateur <b>{user.email}</b>.
                            <br />Il pourra ensuite se connecter avec ce mot de passe.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4 space-y-2">
                        <Label>Nouveau mot de passe</Label>
                        <Input
                            type="text"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Ex: Client2026!"
                        />
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setNewPassword("")}>Annuler</AlertDialogCancel>
                        <Button onClick={handlePasswordReset} disabled={loading || !newPassword}>
                            Enregistrer
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading}>
                        <span className="sr-only">Ouvrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>

                    <DropdownMenuItem onSelect={() => setIsPasswordModalOpen(true)}>
                        <KeyRound className="mr-2 h-4 w-4" />
                        Définir mot de passe
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleStatusChange("ACTIVE")} disabled={user.status === "ACTIVE"}>
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Activer le compte
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("PENDING_VERIFICATION")} disabled={user.status === "PENDING_VERIFICATION"}>
                        <ShieldAlert className="mr-2 h-4 w-4 text-amber-500" />
                        Mettre en attente
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleStatusChange("SUSPENDED")} disabled={user.status === "SUSPENDED"}>
                        <Ban className="mr-2 h-4 w-4 text-red-500" />
                        Suspendre
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => handleRoleChange(user.role === "ADMIN" ? "CLIENT_PRO" : "ADMIN")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        {user.role === "ADMIN" ? "Rétrograder Client" : "Promouvoir Admin"}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
