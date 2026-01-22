"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Minimize2,
    Circle,
    Square,
    Shield,
    Layers,
    Award,
    Diamond
} from "lucide-react";

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-elegant bg-card">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold mb-2 text-premium">
                        Design System <span className="text-accent-subtle">Premium Sobre</span>
                    </h1>
                    <p className="text-muted-foreground">
                        Charte graphique élégante et minimaliste - My Sculpt Technology
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Palette de Couleurs */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-premium">
                        <Circle className="w-6 h-6" />
                        Palette Monochrome
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Background */}
                        <Card className="border-elegant">
                            <CardHeader>
                                <CardTitle>Background</CardTitle>
                                <CardDescription>Fond principal sobre</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-24 bg-background border-2 border-border rounded-lg flex items-center justify-center">
                                    <span className="text-foreground font-medium">Background</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Light</span>
                                        <code className="bg-muted px-2 py-1 rounded text-xs">#FAFAFA</code>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Dark</span>
                                        <code className="bg-muted px-2 py-1 rounded text-xs">#0F0F0F</code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card */}
                        <Card className="border-elegant">
                            <CardHeader>
                                <CardTitle>Card</CardTitle>
                                <CardDescription>Conteneurs élégants</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-24 bg-card border-2 border-border rounded-lg flex items-center justify-center">
                                    <span className="text-card-foreground font-medium">Card</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Light</span>
                                        <code className="bg-muted px-2 py-1 rounded text-xs">#FFFFFF</code>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Dark</span>
                                        <code className="bg-muted px-2 py-1 rounded text-xs">#1A1A1A</code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Primary - Accent discret */}
                        <Card className="accent-gold border-elegant">
                            <CardHeader>
                                <CardTitle>Primary Accent</CardTitle>
                                <CardDescription>Accent très subtil</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-24 bg-primary rounded-lg flex items-center justify-center">
                                    <Diamond className="w-12 h-12 text-primary-foreground" />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Utilisé avec parcimonie pour les CTA importants
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Distinctions Admin/Client */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-premium">
                        <Layers className="w-6 h-6" />
                        Distinctions Visuelles
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="admin-border">
                            <CardHeader>
                                <div className="admin-accent inline-block px-4 py-2 rounded-lg mb-2">
                                    <Shield className="w-5 h-5 inline mr-2" />
                                    <span className="font-semibold">Admin Panel</span>
                                </div>
                                <CardDescription>Teinte chaude (stone/neutral)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Légère distinction avec des tons chauds pour le back-office administrateur.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-elegant">
                            <CardHeader>
                                <div className="client-accent inline-block px-4 py-2 rounded-lg mb-2">
                                    <Award className="w-5 h-5 inline mr-2" />
                                    <span className="font-semibold">Client Dashboard</span>
                                </div>
                                <CardDescription>Teinte froide (slate/neutral)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    Tons froids pour l'espace client professionnel.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Boutons */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-premium">
                        <Square className="w-6 h-6" />
                        Boutons
                    </h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <Label>Primary (Sobre)</Label>
                                    <Button className="w-full">
                                        Bouton Primary
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Secondary</Label>
                                    <Button variant="secondary" className="w-full">
                                        Bouton Secondary
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Outline</Label>
                                    <Button variant="outline" className="w-full">
                                        Bouton Outline
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Ghost</Label>
                                    <Button variant="ghost" className="w-full">
                                        Bouton Ghost
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Destructive</Label>
                                    <Button variant="destructive" className="w-full">
                                        Bouton Destructive
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Premium Sobre</Label>
                                    <Button className="w-full btn-premium">
                                        <Diamond className="w-4 h-4 mr-2" />
                                        Premium
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Badges */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-premium">
                        <Minimize2 className="w-6 h-6" />
                        Badges
                    </h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-3">
                                <Badge>Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                                <Badge className="btn-premium">Premium</Badge>
                                <Badge className="admin-accent">Admin</Badge>
                                <Badge className="client-accent">Client</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Cards Glassmorphism */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-premium">
                        Cards Glassmorphism Minimaliste
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2 text-premium">Glass Standard</h3>
                            <p className="text-sm text-muted-foreground">
                                Effet verre très subtil avec transparence minimale
                            </p>
                            <code className="block mt-4 text-xs bg-background/50 px-2 py-1 rounded">
                                .glass
                            </code>
                        </div>

                        <div className="glass-card p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2 text-premium">Glass Card</h3>
                            <p className="text-sm text-muted-foreground">
                                Carte avec effet verre élégant
                            </p>
                            <code className="block mt-4 text-xs bg-background/50 px-2 py-1 rounded">
                                .glass-card
                            </code>
                        </div>

                        <div className="accent-gold p-6 rounded-xl">
                            <h3 className="font-bold text-lg mb-2 text-premium">Accent Gold</h3>
                            <p className="text-sm text-muted-foreground">
                                Accent discret pour éléments importants
                            </p>
                            <code className="block mt-4 text-xs bg-background/50 px-2 py-1 rounded">
                                .accent-gold
                            </code>
                        </div>
                    </div>
                </section>

                {/* Forms */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-premium">Formulaires</h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="input-default">Input Standard</Label>
                                    <Input id="input-default" placeholder="Entrez du texte..." />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="input-focus">Input avec Focus Subtil</Label>
                                    <Input
                                        id="input-focus"
                                        placeholder="Focus pour voir l'effet..."
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Typography */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 text-premium">Typographie</h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6 space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-2 text-premium">Heading 1 Premium</h1>
                                <p className="text-sm text-muted-foreground">text-4xl font-bold text-premium</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-gradient-elegant">Heading 2 Elegant</h2>
                                <p className="text-sm text-muted-foreground">text-3xl font-bold text-gradient-elegant</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
                                <p className="text-sm text-muted-foreground">text-2xl font-semibold</p>
                            </div>
                            <div>
                                <p className="text-base mb-2 text-accent-subtle">
                                    Paragraphe standard avec contraste optimal pour une lecture confortable sur fond clair et sombre.
                                </p>
                                <p className="text-sm text-muted-foreground">text-base text-accent-subtle</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Texte secondaire discret pour les descriptions et informations complémentaires.
                                </p>
                                <p className="text-sm text-muted-foreground">text-sm text-muted-foreground</p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

            </div>
        </div>
    );
}
