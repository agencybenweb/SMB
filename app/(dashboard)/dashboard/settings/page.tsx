
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SharedProfileForm } from "@/components/settings/shared-profile-form";
import { SharedPasswordForm } from "@/components/settings/shared-password-form";
import { Shield, User, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Paramètres | Espace Pro",
};

export default async function ClientSettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/auth/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
    });

    if (!user) {
        redirect("/auth/login");
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">

            <div className="flex items-center gap-4 mb-6">
                <Link href="/dashboard">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Paramètres du compte</h1>
                    <p className="text-muted-foreground">
                        Gérez les informations de votre entreprise et vos préférences.
                    </p>
                </div>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
                    <TabsTrigger value="profile" className="gap-2">
                        <Building2 className="w-4 h-4" /> Profil & Entreprise
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="w-4 h-4" /> Sécurité
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profil Client</CardTitle>
                            <CardDescription>
                                Ces informations apparaîtront sur vos devis et factures.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* Client Mode = FULL (with Company fields) */}
                            <SharedProfileForm user={user} mode="full" />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mot de passe</CardTitle>
                            <CardDescription>
                                Modifiez votre mot de passe de connexion.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SharedPasswordForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
