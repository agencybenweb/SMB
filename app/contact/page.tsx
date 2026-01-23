"use client";

import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, CalendarDays, Loader2, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ScrollReveal } from "@/components/scroll-reveal";

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
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-white p-12 rounded-[2rem] shadow-2xl shadow-gold-500/10 max-w-md w-full text-center border border-slate-100">
          <div className="w-24 h-24 bg-gold-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-500 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-slate-900">Demande envoyée !</h2>
          <p className="text-slate-500 mb-8 font-medium">
            Merci de votre intérêt. Un conseiller commercial My Sculpt va étudier votre projet et vous recontacter sous 24h ouvrées.
          </p>
          <Link href="/">
            <Button className="w-full bg-slate-900 text-white hover:bg-gold-500 hover:text-slate-900 h-12 rounded-xl font-bold transition-all">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO SECTION - Luxury Black & Gold Style */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-slate-950 via-gray-900 to-stone-900 p-8 md:p-20 text-white overflow-hidden shadow-2xl shadow-gold-900/20 border border-gold-500/10">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold-500/20 backdrop-blur-md mb-4 text-gold-200">
                  <MessageSquare className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-semibold tracking-wide">Contactez-nous</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-2">
                  Discutons de <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400 drop-shadow-sm">
                    Votre Projet
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  Nos experts sont là pour vous conseiller sur le choix de vos équipements.
                  Devis gratuit et personnalisé sous 24h.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-7xl relative z-10 -mt-10">
        <div className="grid lg:grid-cols-3 gap-0 shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 flex-col md:flex-row">

          {/* INFO LEFT SIDE (Dark) */}
          <div className="lg:col-span-1 bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-white">Nos Coordonnées</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                    <Phone className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-slate-200">Téléphone</h4>
                    <p className="text-lg font-medium text-white">+33 4 78 00 00 00</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Lun-Ven : 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                    <Mail className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-slate-200">Email</h4>
                    <p className="text-lg font-medium text-white">contact@mysculpt.tech</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 transition-colors">
                    <MapPin className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 text-slate-200">Siège Social</h4>
                    <p className="text-base text-slate-300 leading-relaxed">123 Avenue de l'Esthétique<br />69000 Lyon, France</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-4 relative z-10">
              <div className="p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-2 font-bold text-gold-400">
                  <Clock className="w-4 h-4" /> Réactivité Garantie
                </div>
                <p className="text-sm text-slate-400">Nous nous engageons à traiter toute demande de devis dans la journée.</p>
              </div>
            </div>
          </div>

          {/* FORM RIGHT SIDE (Light) */}
          <div className="lg:col-span-2 p-8 md:p-12 bg-white">
            <h2 className="text-3xl font-bold mb-2 text-slate-900">Envoyez-nous un message</h2>
            <p className="text-slate-500 mb-8">Remplissez le formulaire ci-dessous, nous vous répondrons rapidement.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nom de l'entreprise *</label>
                  <Input
                    required
                    placeholder="Institut Beauté..."
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">SIRET <span className="text-slate-400 font-normal">(Optionnel)</span></label>
                  <Input
                    placeholder="123 456 789 00012"
                    value={formData.siret}
                    onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Prénom *</label>
                  <Input
                    required
                    placeholder="Jean"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nom *</label>
                  <Input
                    required
                    placeholder="Dupont"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="jean.dupont@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Téléphone *</label>
                  <Input
                    type="tel"
                    required
                    placeholder="06 12 34 56 78"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Sujet / Appareil concerné</label>
                <Input
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Demande de devis..."
                  className="h-12 bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Message (Optionnel)</label>
                <Textarea
                  rows={4}
                  placeholder="Précisez votre besoin (démarrage d'activité, renouvellement, date souhaitée...)"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-slate-50 border-slate-200 focus:border-gold-500 focus:ring-gold-500/20"
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full md:w-auto min-w-[200px] h-14 bg-gold-500 text-slate-950 hover:bg-gold-400 text-base font-bold rounded-xl" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Envoi...</> : <><Send className="mr-2 h-5 w-5" /> Envoyer la demande</>}
                </Button>
              </div>
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
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}