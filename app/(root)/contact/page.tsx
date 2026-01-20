"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, CalendarDays, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ContactContent() {
  const searchParams = useSearchParams();
  const deviceOfInterest = searchParams.get("device");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    siret: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: deviceOfInterest ? `Demande concernant : ${deviceOfInterest}` : "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-slate-100 dark:border-slate-800">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Demande envoyée !</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Merci de votre intérêt. Un conseiller commercial My Sculpt va étudier votre projet et vous recontacter sous 24h ouvrées.
          </p>
          <Link href="/">
            <Button variant="outline" className="w-full">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* HEADER */}
      <div className="bg-slate-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discutons de <span className="text-gradient-gold">votre projet</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Nos experts sont là pour vous conseiller sur le choix de vos équipements.
            Devis gratuit sous 24h.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8 shadow-2xl rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">

          {/* INFO LEFT SIDE */}
          <div className="lg:col-span-1 bg-slate-900 text-white p-8 md:p-12 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-8 text-primary">Informations</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Téléphone</h4>
                    <p className="text-slate-300">+33 4 78 00 00 00</p>
                    <p className="text-xs text-slate-400">Lun-Ven : 9h-18h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-slate-300">contact@mysculpt.tech</p>
                    <p className="text-xs text-slate-400">Réponse sous 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Siège Social</h4>
                    <p className="text-slate-300">123 Avenue de l'Esthétique<br />69000 Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <Clock className="w-4 h-4 text-primary" /> Réactivité
                </div>
                <p className="text-sm text-slate-300">Nous nous engageons à traiter toute demande de devis dans la journée.</p>
              </div>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2 font-semibold">
                  <CalendarDays className="w-4 h-4 text-primary" /> Rendez-vous
                </div>
                <p className="text-sm text-slate-300">Possibilité de démonstration au showroom sur rendez-vous.</p>
              </div>
            </div>
          </div>

          {/* FORM RIGHT SIDE */}
          <div className="lg:col-span-2 p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom de l'entreprise *</label>
                  <Input
                    required
                    placeholder="Institut Beauté..."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">SIRET (Optionnel)</label>
                  <Input
                    placeholder="123 456 789 00012"
                    value={formData.siret}
                    onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prénom *</label>
                  <Input
                    required
                    placeholder="Jean"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom *</label>
                  <Input
                    required
                    placeholder="Dupont"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="jean.dupont@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Téléphone *</label>
                  <Input
                    type="tel"
                    required
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sujet / Appareil concerné</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Demande de devis..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message (Optionnel)</label>
                <Textarea
                  rows={4}
                  placeholder="Précisez votre besoin (démarrage d'activité, renouvellement, date souhaitée...)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto min-w-[200px]" disabled={loading}>
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Envoi...</> : <><Send className="mr-2 h-4 w-4" /> Envoyer la demande</>}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}