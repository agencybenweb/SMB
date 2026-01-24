"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Smartphone,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    Shield,
    Menu,
    X,
    MessageSquare,
    Zap,
    FileText
} from "lucide-react";

export function AdminMobileNav({ user }: { user: any }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="md:hidden">
                <Menu className="w-6 h-6" />
            </Button>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex bg-black/50 backdrop-blur-sm transition-all md:hidden">
                    <div
                        className="relative flex-1 bg-slate-900 text-white w-72 max-w-[85vw] h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300 border-r border-slate-800"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
                    >
                        {/* Close Button */}
                        <div className="absolute top-4 right-4 z-50">
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Sidebar Header */}
                        <div className="p-6 border-b border-slate-800 flex items-center gap-3 bg-slate-900">
                            <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center border border-gold-500/20 text-gold-500">
                                <Shield className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-lg leading-none tracking-tight text-white">MY SCULPT</span>
                                <span className="text-[10px] tracking-[0.2em] text-gold-500 uppercase mt-1 font-semibold">Admin Panel</span>
                            </div>
                        </div>

                        {/* Navigation Items */}
                        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                            <Link href="/admin" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <LayoutDashboard className="w-5 h-5" /> Tableau de Bord
                                </Button>
                            </Link>

                            <div className="pt-6 pb-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-4">
                                Gestion
                            </div>

                            <Link href="/admin/devices" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <Smartphone className="w-5 h-5" /> Appareils
                                </Button>
                            </Link>

                            <Link href="/admin/technologies" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <Zap className="w-5 h-5" /> Technologies
                                </Button>
                            </Link>

                            <Link href="/admin/users" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <Users className="w-5 h-5" /> Utilisateurs
                                </Button>
                            </Link>

                            <Link href="/admin/orders" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <ShoppingCart className="w-5 h-5" /> Commandes
                                </Button>
                            </Link>

                            <Link href="/admin/documents" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <FileText className="w-5 h-5" /> Devis
                                </Button>
                            </Link>

                            <Link href="/admin/tickets" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <MessageSquare className="w-5 h-5" /> Tickets SAV
                                </Button>
                            </Link>

                            <div className="pt-6 pb-2 text-xs font-bold text-slate-500 uppercase tracking-widest pl-4">
                                Système
                            </div>

                            <Link href="/admin/settings" onClick={() => setIsOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800/50 h-12 text-base font-medium">
                                    <Settings className="w-5 h-5" /> Paramètres
                                </Button>
                            </Link>
                        </nav>

                        {/* Footer User Info */}
                        <div className="p-4 border-t border-slate-800 bg-slate-900">
                            <div className="flex items-center gap-3 px-3 py-3 mb-4 bg-slate-800/50 rounded-xl border border-slate-800">
                                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div className="overflow-hidden min-w-0">
                                    <div className="text-sm font-bold truncate text-white">{user.name || 'Admin'}</div>
                                    <div className="text-xs text-slate-400 truncate">{user.email}</div>
                                </div>
                            </div>
                            <Link href="/auth/signout">
                                <Button variant="outline" className="w-full gap-2 border-slate-700 bg-transparent text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 h-10 font-bold">
                                    <LogOut className="w-4 h-4" /> Déconnexion
                                </Button>
                            </Link>
                        </div>

                    </div>

                    {/* Backdrop click to close */}
                    <div className="flex-1 cursor-pointer" onClick={() => setIsOpen(false)} />
                </div>
            )}
        </>
    );
}
