export const dynamic = 'force-dynamic';
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatDateShort } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Client {
  id: string;
  email: string;
  companyName: string | null;
  siret: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  status: string;
  createdAt: string;
  lastLoginAt: string | null;
  _count: {
    orders: number;
    ownedDevices: number;
    supportTickets: number;
  };
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchClient();
  }, [params.id]);

  const fetchClient = async () => {
    try {
      const res = await fetch(`/api/admin/clients/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setClient(data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!confirm(`Voulez-vous vraiment ${newStatus === "ACTIVE" ? "activer" : newStatus === "SUSPENDED" ? "suspendre" : "désactiver"} ce compte ?`)) {
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/clients/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        fetchClient();
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">Client non trouvé</p>
        <Button asChild>
          <Link href="/admin/clients">Retour aux clients</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin/clients"
          className="text-sm text-gray-600 hover:text-primary"
        >
          ← Retour aux clients
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {client.companyName || "Client"}
          </h1>
          <p className="text-gray-600">{client.email}</p>
        </div>
        <div className="flex gap-2">
          {client.status === "PENDING_VERIFICATION" && (
            <Button
              onClick={() => handleStatusChange("ACTIVE")}
              disabled={updating}
            >
              Activer le compte
            </Button>
          )}
          {client.status === "ACTIVE" && (
            <Button
              variant="destructive"
              onClick={() => handleStatusChange("SUSPENDED")}
              disabled={updating}
            >
              Suspendre
            </Button>
          )}
          {client.status === "SUSPENDED" && (
            <Button
              onClick={() => handleStatusChange("ACTIVE")}
              disabled={updating}
            >
              Réactiver
            </Button>
          )}
        </div>
      </div>

      {/* Informations */}
      <section className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Informations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Nom de l'entreprise</p>
            <p className="font-medium">{client.companyName || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">SIRET</p>
            <p className="font-medium">{client.siret || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Contact</p>
            <p className="font-medium">
              {client.firstName} {client.lastName}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Téléphone</p>
            <p className="font-medium">{client.phone || "N/A"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Adresse</p>
            <p className="font-medium">
              {client.address || "N/A"}
              {client.postalCode && `, ${client.postalCode}`}
              {client.city && ` ${client.city}`}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Statut</p>
            <p className="font-medium">{client.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Date de création</p>
            <p className="font-medium">{formatDateShort(client.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Dernière connexion</p>
            <p className="font-medium">
              {client.lastLoginAt
                ? formatDateShort(client.lastLoginAt)
                : "Jamais"}
            </p>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="border rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-3xl font-bold mb-1">{client._count.orders}</p>
            <p className="text-sm text-gray-600">Commandes</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-3xl font-bold mb-1">
              {client._count.ownedDevices}
            </p>
            <p className="text-sm text-gray-600">Appareils</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded">
            <p className="text-3xl font-bold mb-1">
              {client._count.supportTickets}
            </p>
            <p className="text-sm text-gray-600">Tickets SAV</p>
          </div>
        </div>
      </section>

      {/* Actions rapides */}
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href={`/admin/commandes?client=${client.id}`}>
            Voir les commandes
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/admin/sav?client=${client.id}`}>Voir les tickets</Link>
        </Button>
      </div>
    </div>
  );
}