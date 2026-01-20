import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wrench, MessageSquare, ShieldCheck, FileText, Phone, Clock } from "lucide-react";

export default function SAVPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* HEADER HERO */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[100%] bg-blue-900/20 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Support & <span className="text-blue-400">Assistance</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Parce que votre activité ne doit jamais s'arrêter, notre équipe technique est à vos côtés.
            Réactivité, expertise et pièces d'origine.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* ACTION RAPIDE - GRID */}
        <div className="grid md:grid-cols-3 gap-6 -mt-24 relative z-20">
          {[
            {
              title: "Ouvrir un Ticket",
              desc: "Signalez un problème technique ou posez une question.",
              icon: MessageSquare,
              action: "Créer une demande",
              href: "/dashboard/sav/nouveau",
              highlight: true
            },
            {
              title: "Documentation",
              desc: "Notices, guides d'entretien et mises à jour logicielles.",
              icon: FileText,
              action: "Consulter",
              href: "/dashboard/documents"
            },
            {
              title: "Urgence Technique",
              desc: "La machine est à l'arrêt ? Contactez notre hotline dédiée.",
              icon: Phone,
              action: "Voir les numéros",
              href: "#contact"
            }
          ].map((card, i) => (
            <div key={i} className={`p-8 rounded-xl shadow-xl flex flex-col items-start ${card.highlight ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${card.highlight ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                <card.icon className={`w-6 h-6 ${card.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`} />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${card.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{card.title}</h3>
              <p className={`mb-8 flex-1 ${card.highlight ? 'text-white/90' : 'text-slate-500'}`}>{card.desc}</p>
              <Link href={card.href} className="w-full">
                <Button variant={card.highlight ? "secondary" : "outline"} className="w-full">
                  {card.action}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* INFO SERVICES */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">Notre engagement SAV</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Réponse sous 24h</h3>
                  <p className="text-slate-600 dark:text-slate-400">Pour toute demande via ticket, nos techniciens s'engagent à vous apporter un premier diagnostic dans la journée.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <Wrench className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Atelier en France</h3>
                  <p className="text-slate-600 dark:text-slate-400">Toutes les réparations sont effectuées dans notre atelier lyonnais par des experts certifiés.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Garantie 2 ans et +</h3>
                  <p className="text-slate-600 dark:text-slate-400">Pièces et main d'œuvre incluses. Extension de garantie disponible jusqu'à 5 ans.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-xl mb-4">FAQ Rapide</h3>
            <div className="space-y-4">
              <details className="group bg-white dark:bg-slate-800 p-4 rounded-lg cursor-pointer">
                <summary className="font-medium text-slate-900 dark:text-white flex items-center justify-between">
                  Ma machine ne s'allume plus
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Vérifiez d'abord le branchement secteur et l'interrupteur arrière. Si le fusible est accessible, vérifiez son état.</p>
              </details>
              <details className="group bg-white dark:bg-slate-800 p-4 rounded-lg cursor-pointer">
                <summary className="font-medium text-slate-900 dark:text-white flex items-center justify-between">
                  Message d'erreur "Flow Error"
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Cela indique souvent un manque d'eau. Vérifiez le niveau dans le réservoir et faites l'appoint avec de l'eau distillée uniquement.</p>
              </details>
              <details className="group bg-white dark:bg-slate-800 p-4 rounded-lg cursor-pointer">
                <summary className="font-medium text-slate-900 dark:text-white flex items-center justify-between">
                  Comment commander des consommables ?
                  <span className="group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Rendez-vous sur la boutique pro accessible depuis votre Dashboard pour commander gels, membranes et filtres.</p>
              </details>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}