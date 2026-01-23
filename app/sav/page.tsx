import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, MessageSquare, ShieldCheck, FileText, Phone, Clock, HelpCircle, LifeBuoy } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function SAVPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO SECTION - Refined Floating Style */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative flex flex-col items-center text-center max-w-5xl mx-auto space-y-8 z-10">

            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-gold-200 shadow-xl shadow-gold-900/10 mb-6">
                <LifeBuoy className="w-4 h-4 text-gold-400" />
                <span className="text-sm font-bold tracking-wide uppercase">Support Premium</span>
              </div>
            </ScrollReveal>

            <div className="relative">
              {/* Floating Bubbles Background - Subtle */}
              <div className="absolute -top-10 -right-20 w-64 h-64 bg-gold-400/10 rounded-full blur-[80px] -z-10 animate-pulse" />
              <div className="absolute top-20 -left-20 w-64 h-64 bg-slate-900/5 rounded-full blur-[60px] -z-10" />

              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-slate-900 mb-6">
                  Service & <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-amber-400 to-gold-600 drop-shadow-sm">
                    Assistance
                  </span>
                </h1>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.2} className="relative max-w-2xl mx-auto">
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Parce que votre activité ne doit jamais s'arrêter, notre équipe d'experts est à vos côtés.
                Réactivité immédiate et pièces certifiées d'origine.
              </p>

              {/* Floating Widgets Elements */}
              <div className="absolute top-0 -right-40 hidden lg:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400 font-bold uppercase">Réponse</div>
                  <div className="text-sm font-bold text-slate-900">&lt; 24h</div>
                </div>
              </div>

              <div className="absolute bottom-0 -left-40 hidden lg:flex items-center gap-3 bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-800 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-gold-400 border border-slate-700">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-400 font-bold uppercase">Atelier</div>
                  <div className="text-sm font-bold text-white">France</div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-24 max-w-7xl">

        {/* ACTION RAPIDE - GRID */}
        <section className="-mt-32 relative z-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Ouvrir un Ticket",
                desc: "Signalez un problème technique ou posez une question urgente à nos experts.",
                icon: MessageSquare,
                action: "Créer une demande",
                href: "/dashboard/sav/nouveau",
                highlight: true
              },
              {
                title: "Documentation",
                desc: "Accédez aux manuels, guides d'entretien et protocoles techniques à jour.",
                icon: FileText,
                action: "Consulter la base",
                href: "/dashboard/documents"
              },
              {
                title: "Urgence Technique",
                desc: "Machine à l'arrêt ? Une hotline dédiée est disponible pour les membres Premium.",
                icon: Phone,
                action: "Voir les numéros",
                href: "/contact"
              }
            ].map((card, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className={`p-8 rounded-[1.5rem] shadow-xl flex flex-col items-start border transition-all duration-300 hover:-translate-y-2 ${card.highlight ? 'bg-gradient-to-br from-gold-500 to-amber-600 text-slate-950 border-gold-400 shadow-gold-500/20' : 'bg-white border-slate-100 shadow-slate-200/50'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg ${card.highlight ? 'bg-slate-900 text-gold-500' : 'bg-slate-900/5 text-slate-900'}`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${card.highlight ? 'text-slate-950' : 'text-slate-900'}`}>{card.title}</h3>
                <p className={`mb-6 flex-1 text-base font-medium leading-relaxed ${card.highlight ? 'text-slate-900/80' : 'text-slate-500'}`}>{card.desc}</p>
                <Link href={card.href} className="w-full">
                  <Button className={`w-full h-12 text-sm font-bold rounded-lg border-none ${card.highlight ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-slate-100 text-slate-900 hover:bg-slate-200"}`}>
                    {card.action}
                  </Button>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* INFO SERVICES */}
        <section className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="text-gold-600 font-bold tracking-wider uppercase text-sm mb-2 block">Sérénité Totale</span>
            <h2 className="text-4xl font-bold mb-8 text-slate-900">Notre Engagement Qualité</h2>
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 group-hover:bg-gold-50 transition-colors">
                  <Clock className="w-7 h-7 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">Réponse sous 24h</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">Pour toute demande via ticket, nos techniciens s'engagent à vous apporter un premier diagnostic précis dans la journée ouvrée.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 group-hover:bg-gold-50 transition-colors">
                  <Wrench className="w-7 h-7 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">Atelier Expert à Lyon</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">Toutes les réparations et maintenances sont effectuées dans notre centre technique lyonnais par des ingénieurs certifiés.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-gold-500/50 group-hover:bg-gold-50 transition-colors">
                  <ShieldCheck className="w-7 h-7 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-900 mb-2">Garantie 2 ans Incluses</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">Pièces, main d'œuvre et déplacement. Extension de garantie "Tranquillité" disponible jusqu'à 5 ans.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="bg-slate-950 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/10 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />

            <h3 className="font-bold text-2xl mb-8 text-white flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-gold-500" /> FAQ Rapide
            </h3>
            <div className="space-y-4 relative z-10">
              <details className="group bg-white/5 border border-white/10 p-5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <summary className="font-bold text-slate-200 flex items-center justify-between list-none">
                  Ma machine ne s'allume pas
                  <span className="group-open:rotate-180 transition-transform text-gold-500">▼</span>
                </summary>
                <div className="mt-4 text-sm text-slate-400 font-medium leading-relaxed border-t border-white/10 pt-4">Vérifiez d'abord le branchement secteur, le disjoncteur différentiel et l'interrupteur principal arrière. Si le fusible est accessible, vérifiez son état.</div>
              </details>
              <details className="group bg-white/5 border border-white/10 p-5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <summary className="font-bold text-slate-200 flex items-center justify-between list-none">
                  Message "Flow Error"
                  <span className="group-open:rotate-180 transition-transform text-gold-500">▼</span>
                </summary>
                <div className="mt-4 text-sm text-slate-400 font-medium leading-relaxed border-t border-white/10 pt-4">Cela indique souvent une circulation d'eau insuffisante. Vérifiez le niveau dans le réservoir et assurez-vous que les tuyaux ne sont pas pincés. Appoint uniquement eau distillée.</div>
              </details>
              <details className="group bg-white/5 border border-white/10 p-5 rounded-2xl cursor-pointer hover:bg-white/10 transition-colors">
                <summary className="font-bold text-slate-200 flex items-center justify-between list-none">
                  Commander des consommables
                  <span className="group-open:rotate-180 transition-transform text-gold-500">▼</span>
                </summary>
                <div className="mt-4 text-sm text-slate-400 font-medium leading-relaxed border-t border-white/10 pt-4">La boutique accessoires est accessible directement depuis votre espace client Dashboard. Livraison sous 48h.</div>
              </details>
            </div>
          </ScrollReveal>
        </section>

      </div>
    </div>
  );
}