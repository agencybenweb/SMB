
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SharedProfileForm } from "@/components/settings/shared-profile-form";
import { SharedPasswordForm } from "@/components/settings/shared-password-form";
import { Settings, Shield, User } from "lucide-react";

export const metadata: Metadata = {
    title: "Paramètres | Admin",
};

export default async function SettingsPage() {
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
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
                <p className="text-muted-foreground">
                    Gérez vos informations de profil et la sécurité de votre compte.
                </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="profile" className="gap-2">
                        <User className="w-4 h-4" /> Profil
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="w-4 h-4" /> Sécurité
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations personnelles</CardTitle>
                            <CardDescription>
                                Mettez à jour vos coordonnées publiques affichées sur l'administration.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <SharedProfileForm user={user} />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mot de passe</CardTitle>
                            <CardDescription>
                                Modifiez votre mot de passe pour sécuriser votre compte.
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
