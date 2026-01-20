
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, Ban, ShieldAlert, Trash2, UserCog } from "lucide-react";
import { updateUserStatus, updateUserRole, deleteUser } from "../actions";
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
    const router = useRouter();

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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0" disabled={loading}>
                    <span className="sr-only">Ouvrir menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>

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
    );
}
