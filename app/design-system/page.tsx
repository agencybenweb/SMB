"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sparkles,
    Crown,
    Zap,
    Shield,
    Star,
    Award,
    Gem,
    TrendingUp
} from "lucide-react";

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Header avec dégradé doré */}
            <div className="border-b border-gold bg-gradient-dark-gold">
                <div className="container mx-auto px-4 py-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">
                        <span className="text-gradient-gold">Design System</span>
                    </h1>
                    <p className="text-amber-200/80 text-lg">
                        Charte graphique Premium - Noir / Or / Blanc avec dégradés
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 space-y-16">

                {/* Palette de Couleurs */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <span className="text-gradient-gold">Palette de Couleurs</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Primary - Or */}
                        <Card className="border-gold-glow">
                            <CardHeader>
                                <CardTitle className="text-gradient-gold">Primary - Or</CardTitle>
                                <CardDescription>Couleur principale premium</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-24 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                                    <Crown className="w-12 h-12 text-primary-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span>Primary</span>
                                        <code className="bg-muted px-2 py-1 rounded">bg-primary</code>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Background */}
                        <Card className="border-elegant">
                            <CardHeader>
                                <CardTitle>Background</CardTitle>
                                <CardDescription>Fond principal</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-24 bg-background border-2 border-border rounded-lg flex items-center justify-center">
                                    <span className="text-foreground font-semibold">Background</span>
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
                        <Card className="bg-card border-elegant">
                            <CardHeader>
                                <CardTitle>Card</CardTitle>
                                <CardDescription>Cartes et conteneurs</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="h-24 bg-card border-2 border-border rounded-lg flex items-center justify-center">
                                    <span className="text-card-foreground font-semibold">Card</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Dégradés Dorés */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                        <Gem className="w-6 h-6 text-primary" />
                        <span className="text-gradient-gold">Dégradés Premium</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="glass-gold border-gold-glow">
                            <CardHeader>
                                <CardTitle className="text-gradient-gold">Dégradé Or</CardTitle>
                                <CardDescription>Pour les éléments premium</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-gradient-gold h-32 rounded-lg flex items-center justify-center shadow-xl shadow-amber-500/30">
                                        <Star className="w-16 h-16 text-white" />
                                    </div>
                                    <code className="block bg-muted px-3 py-2 rounded text-sm">
                                        .bg-gradient-gold
                                    </code>
                                    <code className="block bg-muted px-3 py-2 rounded text-sm">
                                        .text-gradient-gold
                                    </code>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="glass border-elegant">
                            <CardHeader>
                                <CardTitle className="text-gradient-bronze">Dégradé Bronze</CardTitle>
                                <CardDescription>Pour les accents secondaires</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="admin-accent h-32 rounded-lg flex items-center justify-center shadow-xl shadow-orange-500/30">
                                        <Award className="w-16 h-16 text-white" />
                                    </div>
                                    <code className="block bg-muted px-3 py-2 rounded text-sm">
                                        .text-gradient-bronze
                                    </code>
                                    <code className="block bg-muted px-3 py-2 rounded text-sm">
                                        .admin-accent
                                    </code>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-dark-gold text-white border-gold col-span-full">
                            <CardHeader>
                                <CardTitle className="text-gradient-gold">Dégradé Noir-Or</CardTitle>
                                <CardDescription className="text-amber-200/70">Pour les headers et sections premium</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="bg-gradient-dark-gold h-32 rounded-lg flex items-center justify-center border border-amber-500/30">
                                        <TrendingUp className="w-16 h-16 text-amber-400" />
                                    </div>
                                    <code className="block bg-black/30 px-3 py-2 rounded text-sm text-amber-200">
                                        .bg-gradient-dark-gold
                                    </code>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Boutons */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-primary" />
                        Boutons
                    </h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <Label>Primary (Or)</Label>
                                    <Button className="w-full">
                                        <Crown className="w-4 h-4 mr-2" />
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
                                    <Label>Premium Gold</Label>
                                    <Button className="w-full btn-premium">
                                        <Sparkles className="w-4 h-4 mr-2" />
                                        Premium
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Elegant Dark</Label>
                                    <Button className="w-full btn-elegant">
                                        Elegant
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Admin</Label>
                                    <Button className="w-full admin-accent">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Admin
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <Label>Client</Label>
                                    <Button className="w-full client-accent">
                                        Client
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Badges */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                        <Shield className="w-6 h-6 text-primary" />
                        Badges
                    </h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6">
                            <div className="flex flex-wrap gap-3">
                                <Badge>Default</Badge>
                                <Badge variant="secondary">Secondary</Badge>
                                <Badge variant="outline">Outline</Badge>
                                <Badge variant="destructive">Destructive</Badge>
                                <Badge className="bg-gradient-gold">Premium Gold</Badge>
                                <Badge className="admin-accent">Admin</Badge>
                                <Badge className="client-accent">Client</Badge>
                                <Badge className="border-gold bg-gradient-gold-subtle text-foreground">
                                    Gold Subtle
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Cards Glassmorphism */}
                <section>
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                        <Star className="w-6 h-6 text-primary" />
                        Cards Glassmorphism
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass p-6 rounded-xl hover-elegant">
                            <h3 className="font-bold text-lg mb-2">Glass Standard</h3>
                            <p className="text-sm text-muted-foreground">
                                Effet verre avec transparence
                            </p>
                            <code className="block mt-4 text-xs bg-background/50 px-2 py-1 rounded">
                                .glass
                            </code>
                        </div>

                        <div className="glass-card p-6 rounded-xl hover-elegant">
                            <h3 className="font-bold text-lg mb-2">Glass Card</h3>
                            <p className="text-sm text-muted-foreground">
                                Carte avec effet verre renforcé
                            </p>
                            <code className="block mt-4 text-xs bg-background/50 px-2 py-1 rounded">
                                .glass-card
                            </code>
                        </div>

                        <div className="glass-gold p-6 rounded-xl hover-gold">
                            <h3 className="font-bold text-lg mb-2 text-gradient-gold">Glass Gold</h3>
                            <p className="text-sm text-muted-foreground">
                                Effet verre avec touches dorées
                            </p>
                            <code className="block mt-4 text-xs bg-background/50 px-2 py-1 rounded">
                                .glass-gold
                            </code>
                        </div>
                    </div>
                </section>

                {/* Forms */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Formulaires</h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="input-default">Input Standard</Label>
                                    <Input id="input-default" placeholder="Entrez du texte..." />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="input-gold">Input avec Focus Or</Label>
                                    <Input
                                        id="input-gold"
                                        placeholder="Focus pour voir l'effet doré..."
                                        className="focus:ring-primary focus:border-primary"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Typography */}
                <section>
                    <h2 className="text-3xl font-bold mb-8">Typographie</h2>

                    <Card className="border-elegant">
                        <CardContent className="pt-6 space-y-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-2 text-gradient-gold">Heading 1 Gold</h1>
                                <p className="text-sm text-muted-foreground">text-4xl font-bold text-gradient-gold</p>
                            </div>
                            <div>
                                <h2 className="text-3xl font-bold mb-2 text-gradient-elegant">Heading 2 Elegant</h2>
                                <p className="text-sm text-muted-foreground">text-3xl font-bold text-gradient-elegant</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold mb-2 text-gradient-bronze">Heading 3 Bronze</h3>
                                <p className="text-sm text-muted-foreground">text-2xl font-semibold text-gradient-bronze</p>
                            </div>
                            <div>
                                <p className="text-base mb-2">
                                    Paragraphe standard avec du texte pour tester la lisibilité et le contraste sur fond clair et sombre.
                                </p>
                                <p className="text-sm text-muted-foreground">text-base</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground mb-2">
                                    Texte secondaire avec couleur muted pour les descriptions et informations complémentaires.
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
