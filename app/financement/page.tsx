import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreditCard, Calendar, Building, FileText, CheckCircle2 } from "lucide-react";

export default function FinancementPage() {
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
                  <CreditCard className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-semibold tracking-wide">Investissement & Retours</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-2">
                  Solutions de <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400 drop-shadow-sm">
                    Financement
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  Investissez dans votre croissance sans compromettre votre trésorerie.
                  Des options flexibles adaptées aux professionnels de l'esthétique.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-24 max-w-7xl">

        {/* SOLUTIONS GRID */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos Solutions Sur-Mesure</h2>
            <p className="text-slate-500 text-lg">Choisissez le mode d'acquisition qui convient à votre stratégie.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: CreditCard,
                title: "Paiement Comptant",
                desc: "Paiement intégral à la commande. Idéal pour les professionnels ayant la trésorerie disponible.",
                list: ["Règlement sécurisé", "Livraison prioritaire", "Remise commerciale possible"]
              },
              {
                icon: Calendar,
                title: "Paiement Échelonné",
                desc: "Règlement en plusieurs mensualités sans intérêt (selon conditions). Étalez votre investissement sur 3 à 12 mois.",
                list: ["3 à 12 mensualités", "Frais réduits", "Gestion simplifiée"]
              },
              {
                icon: Building,
                title: "Leasing (LOA)",
                desc: "Location avec option d'achat via nos partenaires financiers. Préservez votre capacité d'emprunt.",
                list: ["Loyer mensuel déductible", "Option d'achat < 2%", "Durée 24 à 60 mois"]
              },
              {
                icon: FileText,
                title: "Devis Personnalisé",
                desc: "Une situation particulière ? Demandez une étude sur mesure avec un conseiller expert.",
                list: ["Évaluation gratuite", "Réponse sous 24h", "Montage financier adapté"]
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all hover:-translate-y-1 group">
                <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-900/20 group-hover:bg-gold-500 group-hover:text-slate-900 transition-colors">
                  <item.icon className="w-8 h-8 text-gold-500 group-hover:text-slate-900 transition-colors" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{item.title}</h3>
                <p className="text-slate-500 mb-6 leading-relaxed font-medium">
                  {item.desc}
                </p>
                <ul className="space-y-3 pt-6 border-t border-slate-50">
                  {item.list.map((li, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-600 text-sm font-medium">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      {li}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* AVANTAGES FISCAUX & PROCESS */}
        <section className="grid lg:grid-cols-2 gap-12">

          {/* Fiscaux - Dark Card */}
          <ScrollReveal className="bg-slate-950 rounded-[2.5rem] p-10 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-900/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />

            <h2 className="text-3xl font-bold mb-8 relative z-10 flex items-center gap-3">
              <span className="text-gold-500">Avantages</span> Fiscaux
            </h2>

            <div className="space-y-8 relative z-10">
              <div>
                <h3 className="font-bold text-lg mb-2 text-white">Amortissement</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Les appareils peuvent être amortis sur leur durée de vie, réduisant votre base imposable.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-white">Charges Déductibles</h3>
                <p className="text-slate-400 text-sm leading-relaxed">En Leasing/LOA, les loyers sont comptabilisés comme des charges d'exploitation, réduisant votre IS.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-white">TVA Récupérable</h3>
                <p className="text-slate-400 text-sm leading-relaxed">La TVA sur l'achat ou les loyers est intégralement récupérable pour les entreprises assujetties.</p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-slate-400 italic">
                ⚠️ Ces informations sont indicatives. Consultez votre expert-comptable.
              </div>
            </div>
          </ScrollReveal>

          {/* Process - Light Steps */}
          <ScrollReveal delay={0.2} className="space-y-8 py-4">
            <div className="pl-4">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">Processus Simplifié</h2>

              <div className="space-y-8 relative">
                {/* Ligne verticale */}
                <div className="absolute left-[22px] top-4 bottom-4 w-0.5 bg-slate-100" />

                {[
                  { step: "1", title: "Demande de devis", desc: "Formulaire en ligne ou contact direct avec nos experts." },
                  { step: "2", title: "Étude de financement", desc: "Nous trouvons pour vous la meilleure offre auprès de nos partenaires." },
                  { step: "3", title: "Validation & Signature", desc: "Signature électronique sécurisée du contrat." },
                  { step: "4", title: "Livraison & Formation", desc: "Réception de l'appareil et démarrage de votre activité." }
                ].map((s, i) => (
                  <div key={i} className="flex gap-6 relative z-10 group">
                    <div className="w-12 h-12 rounded-full bg-white border-2 border-slate-100 text-slate-400 font-bold flex items-center justify-center shrink-0 group-hover:border-gold-500 group-hover:text-gold-600 group-hover:scale-110 transition-all shadow-sm">
                      {s.step}
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h4>
                      <p className="text-slate-500 leading-relaxed font-medium text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

        </section>

        {/* CTA FOOTER */}
        <section className="text-center bg-gold-50 rounded-[3rem] p-12 md:p-16 border border-gold-100">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">
            Prêt à investir dans votre réussite ?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto font-medium">
            Obtenez une simulation de financement personnalisée en moins de 24h.
          </p>
          <Link href="/contact">
            <Button className="tech-button bg-slate-900 text-white hover:bg-gold-500 hover:text-slate-900 h-14 px-10 text-base rounded-2xl shadow-xl hover:shadow-gold-500/20 border-none font-bold">
              Demander un devis
            </Button>
          </Link>
        </section>

      </div>
    </div>
  );
}