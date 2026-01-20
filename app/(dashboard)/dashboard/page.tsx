import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDateShort, formatPrice } from "@/lib/utils";
import { Package, Smartphone, Ticket, Activity, Plus, ArrowRight, Clock, CheckCircle, AlertCircle, Settings } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  // Récupérer les données du client
  const [user, orders, tickets, devices] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        companyName: true,
        firstName: true,
        lastName: true,
        email: true,
        status: true,
      },
    }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        items: {
          include: {
            device: {
              select: { name: true },
            },
          },
        },
      },
    }),
    prisma.supportTicket.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.deviceOwnership.findMany({
      where: { userId: session.user.id },
      include: {
        device: {
          select: { name: true, imageUrl: true },
        },
      },
    }),
  ]);

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Bienvenue, {user.companyName || user.firstName}
          </h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos commandes, appareils et formations depuis votre espace pro.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
          <div className={`w-2.5 h-2.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-amber-500'}`} />
          <span className="text-sm font-medium">Compte {user.status === 'ACTIVE' ? 'Vérifié' : 'En attente'}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Commandes", value: orders.length, icon: Package, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
          { label: "Appareils", value: devices.length, icon: Smartphone, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-900/20" },
          { label: "Tickets SAV", value: tickets.length, icon: Ticket, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
          { label: "Actions", value: "2", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" }, // Placeholder
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Commandes Récentes */}
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="p-6 border-b flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold">Dernières Commandes</h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
              <Link href="/dashboard/commandes" className="flex items-center gap-1">Voir tout <ArrowRight className="w-3 h-3" /></Link>
            </Button>
          </div>
          <div className="divide-y">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Aucune commande récente</p>
                <Link href="/appareils" className="text-primary text-sm font-medium hover:underline mt-2 inline-block">Parcourir le catalogue</Link>
              </div>
            ) : (
              orders.map((order) => (
                <Link href={`/dashboard/commandes/${order.id}`} key={order.id} className="block p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{order.orderNumber}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatDateShort(order.createdAt)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{formatPrice(Number(order.totalAmount))} HT</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${order.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' :
                        order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Tickets SAV */}
        <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
          <div className="p-6 border-b flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-muted-foreground" />
              <h2 className="font-semibold">Support & SAV</h2>
            </div>
            <Button asChild size="sm">
              <Link href="/dashboard/sav/nouveau" className="flex items-center gap-1"><Plus className="w-4 h-4" /> Nouveau Ticket</Link>
            </Button>
          </div>
          <div className="divide-y relative">
            {tickets.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20 text-green-500" />
                <p>Aucun ticket ouvert</p>
                <p className="text-sm">Tout fonctionne parfaitement !</p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="flex flex-col max-w-[70%]">
                    <span className="font-medium text-sm truncate">{ticket.subject}</span>
                    <span className="text-xs text-muted-foreground">#{ticket.ticketNumber}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${ticket.status === 'OPEN' ? 'bg-blue-100 text-blue-700' :
                    ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                    {ticket.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Quick Actions for Pro */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Mes Formations</h3>
            <Link href="/dashboard/formation" className="text-xs text-primary hover:underline">Accéder aux modules vidéo</Link>
          </div>
        </div>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Promotions Pro</h3>
            <Link href="/appareils" className="text-xs text-blue-600 hover:underline">Voir les offres en cours</Link>
          </div>
        </div>
        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center text-amber-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Documents</h3>
            <Link href="/dashboard/documents" className="text-xs text-amber-600 hover:underline">Télécharger mes documents</Link>
          </div>
        </div>
        <div className="p-4 bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Paramètres</h3>
            <Link href="/dashboard/settings" className="text-xs text-slate-600 hover:underline">Modifier mon profil</Link>
          </div>
        </div>
      </div>
    </div>
  );
}