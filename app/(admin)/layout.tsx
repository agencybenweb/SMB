import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import {
    LayoutDashboard,
    Smartphone,
    Users,
    ShoppingCart,
    Settings,
    LogOut,
    Shield,
    ExternalLink,
    FileText,
    MessageSquare,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "ADMIN") {
        redirect("/auth/login");
    }

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">

            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex shrink-0">
                <div className="p-6 border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/20">
                            <span className="text-lg font-bold text-primary">M</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg leading-none tracking-tight">MY SCULPT</span>
                            <span className="text-[10px] tracking-[0.2em] text-slate-400 uppercase">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <Link href="/admin">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <LayoutDashboard className="w-4 h-4" /> Tableau de Bord
                        </Button>
                    </Link>

                    <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider pl-4">
                        Gestion
                    </div>

                    <Link href="/admin/devices">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <Smartphone className="w-4 h-4" /> Appareils
                        </Button>
                    </Link>

                    <Link href="/admin/technologies">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <Zap className="w-4 h-4" /> Technologies
                        </Button>
                    </Link>

                    <Link href="/admin/users">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <Users className="w-4 h-4" /> Utilisateurs
                        </Button>
                    </Link>

                    <Link href="/admin/orders">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <ShoppingCart className="w-4 h-4" /> Commandes
                        </Button>
                    </Link>

                    <Link href="/admin/documents">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <FileText className="w-4 h-4" /> Devis
                        </Button>
                    </Link>

                    <Link href="/admin/tickets">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <MessageSquare className="w-4 h-4" /> Tickets SAV
                        </Button>
                    </Link>

                    <Link href="/admin/settings">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-slate-300 hover:text-white hover:bg-slate-800">
                            <Settings className="w-4 h-4" /> Paramètres
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-2 py-2 mb-4 bg-slate-800/50 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                            <Shield className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium truncate">{session.user.name || 'Admin'}</div>
                            <div className="text-xs text-slate-400 truncate">{session.user.email}</div>
                        </div>
                    </div>
                    <Link href="/auth/signout">
                        <Button variant="outline" className="w-full gap-2 border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white">
                            <LogOut className="w-4 h-4" /> Déconnexion
                        </Button>
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 shrink-0">
                    <div className="md:hidden">
                        {/* Mobile menu trigger placeholder */}
                        <Button variant="ghost" size="icon"><LayoutDashboard className="w-5 h-5" /></Button>
                    </div>
                    <div className="ml-auto flex items-center gap-4">
                        <Link href="/" target="_blank">
                            <Button variant="outline" size="sm" className="gap-2 border-primary/20 hover:bg-primary/5 text-primary hover:text-primary">
                                <span className="hidden sm:inline">Voir le site public</span>
                                <ExternalLink className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>

        </div>
    );
}
