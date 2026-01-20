"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, ShoppingCart, ArrowRight, Minus, Plus, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";

import { submitQuote } from "@/app/actions/quote";

export default function CartPage() {
    const { items, removeItem, updateQuantity, cartCount, clearCart } = useCart();
    const { data: session } = useSession();
    const [submitted, setSubmitted] = useState(false);
    const [isPending, startTransition] = useTransition();

    // Form state
    const [formData, setFormData] = useState({
        company: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            const result = await submitQuote(formData, items);
            if (result.success) {
                setSubmitted(true);
                clearCart();
            } else {
                alert("Erreur: " + result.error);
            }
        });
    };

    if (submitted) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6 text-green-600 dark:text-green-400">
                    <Check className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Demande envoyée !</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg mb-8">
                    Votre demande de devis a bien été enregistrée et transmise à notre équipe commerciale.
                    Un conseiller vous contactera sous 24h ouvrées.
                </p>
                <Link href="/appareils">
                    <Button size="lg" className="gap-2">
                        Retour au catalogue <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center min-h-[60vh]">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-400">
                    <ShoppingCart className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-lg mb-8">
                    Vous n'avez ajouté aucun appareil à votre demande de devis pour le moment.
                </p>
                <Link href="/appareils">
                    <Button size="lg" className="gap-2">
                        Voir les appareils <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        );
    }

    const totalHT = items.reduce((acc, item) => acc + (Number(item.device.basePrice) * item.quantity), 0);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">Demande de devis</h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                                <h2 className="font-semibold text-lg flex items-center gap-2">
                                    <ShoppingCart className="w-5 h-5 text-primary" /> {cartCount} Appareil{cartCount > 1 ? 's' : ''}
                                </h2>
                            </div>
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {items.map((item) => (
                                    <div key={item.device.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                        {/* Image */}
                                        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 overflow-hidden">
                                            {item.device.imageUrl ? (
                                                <img src={item.device.imageUrl} alt={item.device.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">Img</div>
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 text-center sm:text-left">
                                            <h3 className="font-bold text-lg">{item.device.name}</h3>
                                            <p className="text-sm text-slate-500 mb-2">{item.device.technology}</p>
                                            <div className="font-medium text-slate-900 dark:text-white">
                                                {formatPrice(Number(item.device.basePrice))} HT
                                            </div>
                                        </div>

                                        {/* Controls */}
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-lg p-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.device.id, item.quantity - 1)}
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </Button>
                                                <span className="font-medium w-4 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.device.id, item.quantity + 1)}
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </Button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.device.id)}
                                                className="text-xs text-red-500 hover:text-red-700 hover:underline flex items-center gap-1"
                                            >
                                                <Trash2 className="w-3 h-3" /> Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FORM */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sticky top-24">
                            <h2 className="font-bold text-xl mb-6">Vos coordonnées</h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Société / Nom complet</Label>
                                    <Input
                                        id="company"
                                        name="company"
                                        required
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Institut..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email professionnel</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="contact@..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="06..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Message (Optionnel)</Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Précisions sur votre projet..."
                                        rows={3}
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-slate-500">Total estimé (HT)</span>
                                        <span className="font-bold">{formatPrice(totalHT)}</span>
                                    </div>
                                    <p className="text-xs text-slate-400 italic">
                                        * Ce montant est indicatif et sera confirmé par le devis officiel.
                                    </p>
                                </div>

                                <Button type="submit" size="lg" disabled={isPending} className="w-full mt-4 font-bold bg-primary hover:bg-primary/90">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi en cours...
                                        </>
                                    ) : (
                                        "Envoyer la demande"
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
