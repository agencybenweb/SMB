"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deviceOwnership?: {
    device: {
      name: string;
      slug: string;
    };
  };
  messages: Array<{
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    createdAt: string;
    isInternal: boolean;
  }>;
}

export default function TicketDetailPage({ params }: { params: { id: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTicket();
    // Actualiser toutes les 30 secondes si le ticket est ouvert
    const interval = setInterval(() => {
      if (ticket && ["OPEN", "IN_PROGRESS"].includes(ticket.status)) {
        fetchTicket();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [params.id]);

  const fetchTicket = async () => {
    try {
      const res = await fetch(`/api/tickets/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setTicket(data);
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
      const res = await fetch(`/api/tickets/${params.id}/messages`, {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Ticket non trouvé</p>
        <Button asChild>
          <Link href="/dashboard/sav">Retour aux tickets</Link>
        </Button>
      </div>
    );
  }

  const statusColors: Record<string, string> = {
    OPEN: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    WAITING_CLIENT: "bg-orange-100 text-orange-800",
    RESOLVED: "bg-green-100 text-green-800",
    CLOSED: "bg-gray-100 text-gray-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const priorityColors: Record<string, string> = {
    LOW: "bg-gray-100 text-gray-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-orange-100 text-orange-800",
    URGENT: "bg-red-100 text-red-800",
  };

  const isClosed = ["RESOLVED", "CLOSED", "CANCELLED"].includes(ticket.status);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/sav"
          className="text-sm text-gray-600 hover:text-primary"
        >
          ← Retour aux tickets
        </Link>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{ticket.ticketNumber}</h1>
          <p className="text-lg text-gray-900">{ticket.subject}</p>
        </div>
        <div className="flex gap-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColors[ticket.status] || "bg-gray-100 text-gray-800"}`}
          >
            {ticket.status}
          </span>
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${priorityColors[ticket.priority] || "bg-gray-100 text-gray-800"}`}
          >
            {ticket.priority}
          </span>
        </div>
      </div>

      {/* Informations du ticket */}
      <div className="border rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Catégorie</p>
            <p className="font-medium">{ticket.category}</p>
          </div>
          {ticket.deviceOwnership && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Appareil</p>
              <Link
                href={`/appareils/${ticket.deviceOwnership.device.slug}`}
                className="font-medium text-primary hover:underline"
              >
                {ticket.deviceOwnership.device.name}
              </Link>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600 mb-1">Date de création</p>
            <p className="font-medium">{formatDateShort(ticket.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Dernière mise à jour</p>
            <p className="font-medium">{formatDateShort(ticket.updatedAt)}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="space-y-4">
          {ticket.messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-lg ${msg.authorId === session?.user?.id
                ? "bg-blue-50 ml-8"
                : "bg-gray-50 mr-8"
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{msg.authorName}</p>
                <p className="text-sm text-gray-600">
                  {formatDateShort(msg.createdAt)}
                </p>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulaire de réponse */}
      {!isClosed && (
        <form onSubmit={handleSendMessage} className="border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Répondre</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
            placeholder="Tapez votre message..."
            required
          />
          <div className="flex justify-end">
            <Button type="submit" disabled={sending}>
              {sending ? "Envoi..." : "Envoyer"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}