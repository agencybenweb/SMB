"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, ArrowLeft, Loader2 } from "lucide-react";

export default function SignOutPage() {
    const router = useRouter();
    const [isSigningOut, setIsSigningOut] = useState(false);

    const handleSignOut = async () => {
        setIsSigningOut(true);
        await signOut({ callbackUrl: "/" });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 p-8">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <LogOut className="w-8 h-8 text-primary" />
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl font-bold text-center mb-2 text-slate-900 dark:text-white">
                        Déconnexion
                    </h1>

                    {/* Message */}
                    <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
                        Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
                    </p>

                    {/* Buttons */}
                    <div className="space-y-3">
                        <Button
                            onClick={handleSignOut}
                            disabled={isSigningOut}
                            className="w-full h-12 text-base"
                            variant="destructive"
                        >
                            {isSigningOut ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Déconnexion...
                                </>
                            ) : (
                                <>
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Oui, me déconnecter
                                </>
                            )}
                        </Button>

                        <Button
                            onClick={() => router.back()}
                            disabled={isSigningOut}
                            className="w-full h-12 text-base"
                            variant="outline"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Annuler
                        </Button>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
                        <p className="text-sm text-slate-500">
                            Vous serez redirigé vers la page d'accueil
                        </p>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-white/70 hover:text-white transition-colors inline-flex items-center gap-1"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
