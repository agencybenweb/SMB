"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  email: string;
  companyName: string | null;
  siret: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
  phone: string | null;
  website: string | null;
  firstName: string | null;
  lastName: string | null;
  jobTitle: string | null;
}

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProfilPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchProfile();
    }
  }, [session]);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (res.ok) {
        const data = await res.json();
        setProfile(data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: formData.get("companyName"),
          siret: formData.get("siret"),
          address: formData.get("address"),
          city: formData.get("city"),
          postalCode: formData.get("postalCode"),
          country: formData.get("country") || "France",
          phone: formData.get("phone"),
          website: formData.get("website"),
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          jobTitle: formData.get("jobTitle"),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        fetchProfile();
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Erreur lors du chargement du profil</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au tableau de bord
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
          Profil mis à jour avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informations de connexion */}
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Informations de connexion
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-4 py-2 border rounded-md bg-gray-50 text-gray-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                L'email ne peut pas être modifié
              </p>
            </div>
          </div>
        </section>

        {/* Informations entreprise */}
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informations entreprise</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                defaultValue={profile.companyName || ""}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="siret" className="block text-sm font-medium mb-2">
                SIRET
              </label>
              <input
                type="text"
                id="siret"
                name="siret"
                defaultValue={profile.siret || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium mb-2">
                Adresse
              </label>
              <input
                type="text"
                id="address"
                name="address"
                defaultValue={profile.address || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                Code postal
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                defaultValue={profile.postalCode || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">
                Ville
              </label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={profile.city || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">
                Pays
              </label>
              <input
                type="text"
                id="country"
                name="country"
                defaultValue={profile.country || "France"}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={profile.phone || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="website" className="block text-sm font-medium mb-2">
                Site web
              </label>
              <input
                type="url"
                id="website"
                name="website"
                defaultValue={profile.website || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </section>

        {/* Contact principal */}
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Contact principal</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                defaultValue={profile.firstName || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                defaultValue={profile.lastName || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium mb-2">
                Fonction
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                defaultValue={profile.jobTitle || ""}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? "Sauvegarde..." : "Enregistrer les modifications"}
          </Button>
        </div>
      </form>
    </div>
  );
}