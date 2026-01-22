import { prisma } from "@/lib/prisma";
import { Users, Smartphone, ShoppingCart, TrendingUp, DollarSign, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const [userCount, deviceCount, orderCount, revenue, ticketsCount, openTicketsCount] = await Promise.all([
    prisma.user.count(),
    prisma.device.count(),
    prisma.order.count(),
    prisma.order.aggregate({
      _sum: {
        paidAmount: true,
      },
      where: {
        paymentStatus: {
          in: ["PAID", "PARTIAL"],
        },
      },
    }),
    prisma.supportTicket.count(),
    prisma.supportTicket.count({
      where: {
        status: {
          in: ["OPEN", "IN_PROGRESS"],
        },
      },
    }),
  ]);

  const recentUsers = await prisma.user.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      companyName: true,
      createdAt: true,
    },
  });

  const totalRevenue = revenue._sum.paidAmount ? Number(revenue._sum.paidAmount) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de Bord Admin</h1>
        <p className="text-slate-500">Vue d'ensemble de l'activité de votre plateforme.</p>
      </div>

      {/* KPI GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs Total</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">Comptes inscrits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appareils Actifs</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deviceCount}</div>
            <p className="text-xs text-muted-foreground">Catalogue en ligne</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes / Devis</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderCount}</div>
            <p className="text-xs text-muted-foreground">Total depuis le début</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'Affaires</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Commandes confirmées ou +</p>
          </CardContent>
        </Card>
      </div>

      {/* TICKETS SAV SECTION */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 h-5 text-primary" />
              <CardTitle>Tickets SAV</CardTitle>
            </div>
            <Link href="/admin/tickets">
              <Badge variant={openTicketsCount > 0 ? "destructive" : "secondary"} className="text-sm">
                {openTicketsCount} en attente
              </Badge>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{ticketsCount}</p>
              <p className="text-xs text-muted-foreground">Total tickets</p>
            </div>
            <Link href="/admin/tickets">
              <button className="text-sm text-primary hover:underline">
                Voir tous les tickets →
              </button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-slate-400 border border-dashed rounded-lg bg-slate-50 dark:bg-slate-900/50">
              <p>Graphique d'activité (Bientôt disponible)</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Dernières Inscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="bg-slate-50 dark:bg-slate-900 p-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                      {user.firstName ? user.firstName[0] : (user.email ? user.email[0] : "?")}
                    </div>
                    <div>
                      <p className="text-sm font-medium truncate max-w-[150px]">
                        {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.email}
                      </p>
                      <p className="text-xs text-slate-500 truncate max-w-[150px]">
                        {user.companyName || "Particulier"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">
                    {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true, locale: fr })}
                  </span>
                </div>
              ))}
              {recentUsers.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">Aucun utilisateur récent</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}