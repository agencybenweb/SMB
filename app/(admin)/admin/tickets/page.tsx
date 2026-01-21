import { prisma } from "@/lib/prisma";
import { formatDateShort } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MessageSquare, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default async function AdminTicketsPage() {
    const tickets = await prisma.supportTicket.findMany({
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    companyName: true,
                    email: true,
                },
            },
            deviceOwnership: {
                include: {
                    device: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
            _count: {
                select: {
                    messages: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const statusConfig = {
        OPEN: { label: "Ouvert", color: "bg-blue-100 text-blue-800", icon: AlertCircle },
        IN_PROGRESS: { label: "En cours", color: "bg-yellow-100 text-yellow-800", icon: Clock },
        WAITING_CLIENT: { label: "Attente client", color: "bg-purple-100 text-purple-800", icon: MessageSquare },
        RESOLVED: { label: "Résolu", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
        CLOSED: { label: "Fermé", color: "bg-slate-100 text-slate-800", icon: XCircle },
        CANCELLED: { label: "Annulé", color: "bg-red-100 text-red-800", icon: XCircle },
    };

    const priorityConfig = {
        LOW: { label: "Basse", color: "text-slate-600" },
        MEDIUM: { label: "Moyenne", color: "text-yellow-600" },
        HIGH: { label: "Haute", color: "text-orange-600" },
        URGENT: { label: "Urgente", color: "text-red-600" },
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Tickets SAV</h1>
                    <p className="text-slate-500 mt-1">
                        Gérez tous les tickets de support client
                    </p>
                </div>
                <div className="flex gap-2">
                    <Badge variant="outline" className="text-sm">
                        {tickets.filter(t => t.status === "OPEN").length} Ouverts
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        {tickets.filter(t => t.status === "IN_PROGRESS").length} En cours
                    </Badge>
                </div>
            </div>

            <div className="grid gap-4">
                {tickets.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center text-slate-500">
                            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p>Aucun ticket pour le moment</p>
                        </CardContent>
                    </Card>
                ) : (
                    tickets.map((ticket) => {
                        const StatusIcon = statusConfig[ticket.status as keyof typeof statusConfig].icon;
                        return (
                            <Link key={ticket.id} href={`/admin/tickets/${ticket.id}`}>
                                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-lg truncate">
                                                        {ticket.subject}
                                                    </h3>
                                                    <Badge className={statusConfig[ticket.status as keyof typeof statusConfig].color}>
                                                        <StatusIcon className="w-3 h-3 mr-1" />
                                                        {statusConfig[ticket.status as keyof typeof statusConfig].label}
                                                    </Badge>
                                                    <span className={`text-xs font-medium ${priorityConfig[ticket.priority as keyof typeof priorityConfig].color}`}>
                                                        {priorityConfig[ticket.priority as keyof typeof priorityConfig].label}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                                                    <span className="font-medium">
                                                        {ticket.user?.companyName || `${ticket.user?.firstName} ${ticket.user?.lastName}`}
                                                    </span>
                                                    <span>•</span>
                                                    <span>{ticket.user?.email}</span>
                                                    {ticket.deviceOwnership && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-primary">
                                                                {ticket.deviceOwnership.device.name}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>

                                                <p className="text-sm text-slate-500 line-clamp-2">
                                                    {ticket.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                                    <MessageSquare className="w-4 h-4" />
                                                    <span>{ticket._count.messages}</span>
                                                </div>
                                                <span className="text-xs text-slate-400">
                                                    {formatDateShort(ticket.createdAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
