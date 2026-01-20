"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Device {
  id: string;
  device: {
    name: string;
  };
}

export default function NouveauTicketPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    category: "TECHNICAL",
    priority: "MEDIUM",
    deviceOwnershipId: "",
  });

  useEffect(() => {
    // Récupérer les appareils de l'utilisateur
    fetch("/api/user/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          deviceOwnershipId: formData.deviceOwnershipId || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/sav/${data.id}`);
      } else {
        const error = await res.json();
        alert(error.error || "Une erreur est survenue");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/sav"
          className="text-sm text-gray-600 hover:text-primary"
        >
          ← Retour aux tickets
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Créer un ticket SAV</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Sujet *
          </label>
          <input
            type="text"
            id="subject"
            required
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Décrivez brièvement le problème"
          />
        </div>

        <div>
          <label htmlFor="deviceOwnershipId" className="block text-sm font-medium mb-2">
            Appareil concerné (optionnel)
          </label>
          <select
            id="deviceOwnershipId"
            value={formData.deviceOwnershipId}
            onChange={(e) =>
              setFormData({ ...formData, deviceOwnershipId: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Aucun appareil spécifique</option>
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.device.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Catégorie *
          </label>
          <select
            id="category"
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="TECHNICAL">Technique</option>
            <option value="WARRANTY">Garantie</option>
            <option value="TRAINING">Formation</option>
            <option value="BILLING">Facturation</option>
            <option value="OTHER">Autre</option>
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-2">
            Priorité *
          </label>
          <select
            id="priority"
            required
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="LOW">Basse</option>
            <option value="MEDIUM">Moyenne</option>
            <option value="HIGH">Haute</option>
            <option value="URGENT">Urgente</option>
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-2">
            Description détaillée *
          </label>
          <textarea
            id="description"
            required
            rows={8}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Décrivez en détail votre problème ou votre demande. Plus vous êtes précis, plus nous pourrons vous aider rapidement."
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? "Création..." : "Créer le ticket"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
}