import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, ArrowRight, CheckCircle2 } from "lucide-react";

// Mêmes descriptions (reprises pour la cohérence, mais stylisées)
const technologyDescriptions: Record<string, { title: string; description: string; benefits: string[], icon: string }> = {
  EMS: {
    title: "Électrostimulation Musculaire (EMS)",
    description: "L'électrostimulation musculaire utilise des impulsions électriques de faible intensité pour contracter les muscles de manière passive. Cette technologie permet de tonifier, raffermir et renforcer la musculature sans effort physique intense.",
    benefits: [
      "Tonification musculaire profonde",
      "Amélioration de la circulation sanguine",
      "Réduction de la cellulite aqueuse",
      "Séances rapides (20-30 minutes)"
    ],
    icon: "⚡"
  },
  CRYOLIPOLYSE: {
    title: "Cryolipolyse",
    description: "La cryolipolyse élimine définitivement les cellules graisseuses en les soumettant à un froid contrôlé (-10°C à -12°C). Les adipocytes meurent naturellement et sont éliminés par le système lymphatique.",
    benefits: [
      "Élimination permanente des graisses",
      "Alternative à la liposuccion",
      "Ciblage précis des bourrelets",
      "Résultats durables"
    ],
    icon: "❄️"
  },
  RADIOFREQUENCE: {
    title: "Radiofréquence",
    description: "La radiofréquence utilise des ondes électromagnétiques pour chauffer les couches profondes de la peau. Cette chaleur stimule la production naturelle de collagène.",
    benefits: [
      "Raffermissement cutané immédiat",
      "Lissage des rides et ridules",
      "Stimulation collagénique",
      "Effet lifting naturel"
    ],
    icon: "📡"
  },
  // ... (On garde les principaux pour la démo visuelle, le principe est le même)
};

export default async function TechnologiesPage() {
  const devices = await prisma.device.findMany({
    where: { status: "ACTIVE" },
    select: { technology: true, name: true, slug: true },
    distinct: ["technology"],
  });

  const availableTechnologies = Array.from(new Set(devices.map((d) => d.technology)));

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* HEADER */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Technologies <span className="text-primary">Expertes</span></h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprendre la science derrière la performance. Découvrez comment nos appareils transforment le corps et le visage.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {availableTechnologies.map((tech, index) => {
          const techInfo = technologyDescriptions[tech] || {
            title: tech,
            description: "Technologie de pointe pour des résultats esthétiques optimaux.",
            benefits: ["Résultats prouvés", "Sécurité maximale"],
            icon: "✨"
          };

          const techDevices = devices.filter((d) => d.technology === tech);

          return (
            <div key={tech} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

              {/* Text Content */}
              <div className="flex-1 space-y-6">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl shadow-sm mb-4">
                  {techInfo.icon || "✨"}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">{techInfo.title}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                  {techInfo.description}
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                  {techInfo.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                {techDevices.length > 0 && (
                  <div className="pt-6">
                    <p className="text-sm font-semibold text-slate-500 mb-3 uppercase tracking-wider">Appareils utilisant cette technologie :</p>
                    <div className="flex flex-wrap gap-3">
                      {techDevices.map(d => (
                        <Link key={d.slug} href={`/appareils/${d.slug}`}>
                          <Button variant="outline" className="gap-2">
                            {d.name} <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Visual / Illustration */}
              <div className="flex-1 w-full">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl flex items-center justify-center text-slate-400 font-medium border border-slate-200 dark:border-slate-800">
                  Illustration {techInfo.title}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* CTA FOOTER */}
      <div className="bg-slate-900 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Besoin de conseils techniques ?</h2>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">Parler à un expert</Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}