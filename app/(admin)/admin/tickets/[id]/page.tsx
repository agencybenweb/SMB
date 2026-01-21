"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeft,
    Send,
    Loader2,
    MessageSquare,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    User
} from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface TicketMessage {
    id: string;
    content: string;
    authorId: string;
    authorName: string;
    createdAt: Date;
}

interface Ticket {
    id: string;
    subject: string;
    description: string;
    status: string;
    priority: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    user: {
        firstName: string;
        lastName: string;
        companyName: string | null;
        email: string;
    };
    deviceOwnership: {
        device: {
            name: string;
        };
    } | null;
    messages: TicketMessage[];
}

export default function AdminTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState("");
    const [newStatus, setNewStatus] = useState("");

    useEffect(() => {
        fetchTicket();
        const interval = setInterval(fetchTicket, 10000);
        return () => clearInterval(interval);
    }, [id]);

    const fetchTicket = async () => {
        try {
            const res = await fetch(`/api/admin/tickets/${id}`);
            if (res.ok) {
                const data = await res.json();
                setTicket(data);
                if (!newStatus) setNewStatus(data.status);
            }
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setSending(true);
        try {
            const res = await fetch(`/api/admin/tickets/${id}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: message }),
            });

            if (res.ok) {
                setMessage("");
                fetchTicket();
            }
        } catch (error) {
            console.error("Erreur:", error);
        } finally {
            setSending(false);
        }
    };

    const handleStatusChange = async () => {
        if (newStatus === ticket?.status) return;

        try {
            const res = await fetch(`/api/admin/tickets/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                fetchTicket();
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="text-center py-12">
                <p className="text-slate-500">Ticket non trouvé</p>
                <Link href="/admin/tickets">
                    <Button variant="outline" className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour aux tickets
                    </Button>
                </Link>
            </div>
        );
    }

    const statusConfig = {
        OPEN: { label: "Ouvert", color: "bg-blue-100 text-blue-800", icon: AlertCircle },
        IN_PROGRESS: { label: "En cours", color: "bg-yellow-100 text-yellow-800", icon: Clock },
        WAITING_CLIENT: { label: "Attente client", color: "bg-purple-100 text-purple-800", icon: MessageSquare },
        RESOLVED: { label: "Résolu", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
        CLOSED: { label: "Fermé", color: "bg-slate-100 text-slate-800", icon: XCircle },
        CANCELLED: { label: "Annulé", color: "bg-red-100 text-red-800", icon: XCircle },
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/tickets">
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Retour
                    </Button>
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-2xl mb-2">{ticket.subject}</CardTitle>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <span className="font-medium">
                                            {ticket.user.companyName || `${ticket.user.firstName} ${ticket.user.lastName}`}
                                        </span>
                                        <span>•</span>
                                        <span>{ticket.user.email}</span>
                                    </div>
                                </div>
                                <Badge className={statusConfig[ticket.status as keyof typeof statusConfig].color}>
                                    {statusConfig[ticket.status as keyof typeof statusConfig].label}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="bg-slate-50 p-4 rounded-lg">
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{ticket.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Messages */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5" />
                                Conversation ({ticket.messages.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {ticket.messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex gap-3 ${msg.authorId === ticket.userId ? "flex-row" : "flex-row-reverse"
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                        <User className="w-4 h-4 text-slate-600" />
                                    </div>
                                    <div className={`flex-1 ${msg.authorId === ticket.userId ? "" : "flex flex-col items-end"}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-medium">{msg.authorName}</span>
                                            <span className="text-xs text-slate-400">
                                                {formatDateShort(msg.createdAt)}
                                            </span>
                                        </div>
                                        <div
                                            className={`inline-block p-3 rounded-lg ${msg.authorId === ticket.userId
                                                ? "bg-slate-100 text-slate-900"
                                                : "bg-primary text-white"
                                                }`}
                                        >
                                            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Reply Form */}
                            <form onSubmit={handleSendMessage} className="pt-4 border-t">
                                <Textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Répondre au client..."
                                    className="mb-3"
                                    rows={4}
                                    disabled={sending || ["RESOLVED", "CLOSED", "CANCELLED"].includes(ticket.status)}
                                />
                                <Button
                                    type="submit"
                                    disabled={sending || !message.trim() || ["RESOLVED", "CLOSED", "CANCELLED"].includes(ticket.status)}
                                    className="w-full"
                                >
                                    {sending ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Envoi...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Envoyer la réponse
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Informations</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-600">Statut</label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 border rounded-md"
                                >
                                    <option value="OPEN">Ouvert</option>
                                    <option value="IN_PROGRESS">En cours</option>
                                    <option value="WAITING_CLIENT">Attente client</option>
                                    <option value="RESOLVED">Résolu</option>
                                    <option value="CLOSED">Fermé</option>
                                    <option value="CANCELLED">Annulé</option>
                                </select>
                                {newStatus !== ticket.status && (
                                    <Button
                                        onClick={handleStatusChange}
                                        size="sm"
                                        className="w-full mt-2"
                                    >
                                        Mettre à jour le statut
                                    </Button>
                                )}
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-600">Priorité</label>
                                <p className="text-sm mt-1">{ticket.priority}</p>
                            </div>

                            {ticket.deviceOwnership && (
                                <div>
                                    <label className="text-sm font-medium text-slate-600">Appareil</label>
                                    <p className="text-sm mt-1">{ticket.deviceOwnership.device.name}</p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium text-slate-600">Créé le</label>
                                <p className="text-sm mt-1">{formatDateShort(ticket.createdAt)}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-600">Mis à jour le</label>
                                <p className="text-sm mt-1">{formatDateShort(ticket.updatedAt)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
