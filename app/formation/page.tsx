import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, BookOpen, GraduationCap, Award, CheckCircle2, PlayCircle } from "lucide-react";

export default function FormationPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* HEADER HERO */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[80%] bg-primary/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            L'Académie <span className="text-gradient-gold">My Sculpt</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Maîtrisez l'art de la technologie esthétique.
            Des formations certifiantes pour garantir des résultats exceptionnels à vos clients.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-20">

        {/* INTRODUCTION & VIDEO TEASER */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Une Formation Sur-Mesure</h2>
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                L'achat d'un appareil My Sculpt Technology inclut systématiquement un programme complet de formation.
                Nous ne vous laissons pas seul : notre objectif est votre expertise.
              </p>
              <p>
                Nos formateurs sont des experts praticiens qui vous transmettent non seulement le fonctionnement technique,
                mais aussi les protocoles de soins les plus rentables.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="gap-2">
                <GraduationCap className="w-5 h-5" /> Voir les modules
              </Button>
              <Button variant="outline" className="gap-2">
                <PlayCircle className="w-5 h-5" /> Démo E-learning
              </Button>
            </div>
          </div>
          <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl group cursor-pointer border border-slate-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-primary/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <PlayCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 text-white font-medium bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
              Aperçu de la plateforme
            </div>
          </div>
        </section>

        {/* CONTENU DE LA FORMATION - CARDS */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">Un format hybride complet</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "E-Learning Illimité",
                desc: "Accès 24/7 à notre plateforme vidéo. Revoyez les protocoles et gestuelles à votre rythme."
              },
              {
                icon: GraduationCap,
                title: "Formation Présentielle",
                desc: "Une journée de pratique intensive dans votre centre ou notre showroom pour valider vos acquis."
              },
              {
                icon: Award,
                title: "Certification",
                desc: "Obtenez votre certificat d'aptitude My Sculpt, un gage de sérieux pour votre clientèle."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PROGRAMME DETAILLE */}
        <section className="bg-slate-100 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Programme Type</h2>
            <div className="space-y-4">
              {[
                "Théorie et fonctionnement de la technologie",
                "Indications et contre-indications (Sécurité)",
                "Diagnostic client et personnalisation du soin",
                "Pratique : Installation et réglages",
                "Pratique : Réalisation d'un soin complet",
                "Maintenance et entretien de l'appareil",
                "Rentabilité et Marketing (Prix, Carte de soins)"
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-500 shrink-0">
                    {i + 1}
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-8">
          <h2 className="text-2xl font-bold mb-6">Déjà client ?</h2>
          <Link href="/dashboard/formation">
            <Button size="lg" className="h-14 px-8 text-lg">
              Accéder à mon espace formation
            </Button>
          </Link>
        </section>

      </div>
    </div>
  );
}