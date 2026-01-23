import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Cpu } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function TechnologiesPage() {
  // Récupérer les technologies depuis la base de données
  let technologyContents: any[];
  let devices: any[];

  try {
    const [techs, devs] = await Promise.all([
      (prisma as any).technologyContent.findMany({
        where: { visible: true },
        orderBy: { orderIndex: "asc" },
      }),
      prisma.device.findMany({
        where: { status: "ACTIVE" },
        select: { technology: true, name: true, slug: true },
      })
    ]);
    technologyContents = techs;
    devices = devs;
  } catch (e) {
    console.warn("DB not available, using mock technologies");
    devices = [
      { technology: "HIFU", name: "Lifting Pro Sculpt", slug: "lifting-pro-sculpt" },
      { technology: "CRYOLIPOLYSE", name: "CryoMaster Elite", slug: "cryomaster-elite" },
      { technology: "LASER", name: "Laser Infinity", slug: "laser-infinity" },
    ];
    technologyContents = [
      {
        id: "tech-1",
        technology: "HIFU",
        title: "HIFU (Ultrasons Focalisés)",
        icon: "🧬",
        description: "La technologie HIFU utilise des ultrasons focalisés de haute intensité pour cibler les couches profondes de la peau (SMAS) sans endommager l'épiderme. Elle stimule la production naturelle de collagène pour un effet lifting durable.",
        benefits: JSON.stringify(["Lifting non-invasif", "Aucune éviction sociale", "Traitement en une séance", "Résultats durables"]),
        imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
        visible: true,
        orderIndex: 0
      },
      {
        id: "tech-2",
        technology: "CRYOLIPOLYSE",
        title: "Cryolipolyse 360°",
        icon: "❄️",
        description: "La cryolipolyse élimine les cellules graisseuses par le froid. Notre technologie à 360° assure un refroidissement homogène pour une efficacité accrue sur les amas graisseux tenaces.",
        benefits: JSON.stringify(["Élimination définitive des graisses", "Indolore", "Zones ciblées précises", "Alternative à la liposuccion"]),
        imageUrl: "https://images.unsplash.com/photo-1519415510236-718bdfcd4788?q=80&w=2070&auto=format&fit=crop",
        visible: true,
        orderIndex: 1
      }
    ];
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
                  <Cpu className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-semibold tracking-wide">Innovation & Performance</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-2">
                  Nos Technologies <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400 drop-shadow-sm">
                    Expertes
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  Comprendre la science derrière la performance.
                  Découvrez comment nos appareils transforment le corps et le visage avec une précision inégalée.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGIES LIST */}
      <div className="container mx-auto px-4 py-16 space-y-32">
        {technologyContents.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-lg">Aucune technologie disponible pour le moment.</p>
          </div>
        ) : (
          technologyContents.map((tech, index) => {
            const techDevices = devices.filter((d) => d.technology === tech.technology);
            let benefits = [];
            try {
              benefits = JSON.parse(tech.benefits) as string[];
            } catch (e) {
              benefits = [];
            }

            return (
              <ScrollReveal key={tech.id} className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                {/* Text Content */}
                <div className="flex-1 space-y-8">
                  <div className="w-20 h-20 bg-slate-900 rounded-3xl border border-slate-800 flex items-center justify-center text-4xl shadow-xl shadow-slate-900/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    {tech.icon}
                  </div>

                  <div>
                    <span className="text-gold-500 font-bold tracking-wider uppercase text-sm mb-2 block">{tech.technology}</span>
                    <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">{tech.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>

                  {benefits.length > 0 && (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      {benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                          <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  )}

                  {techDevices.length > 0 && (
                    <div className="pt-8 border-t border-slate-100 mt-8">
                      <p className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest">Appareils Équipés</p>
                      <div className="flex flex-wrap gap-4">
                        {techDevices.map(d => (
                          <Link key={d.slug} href={`/appareils/${d.slug}`}>
                            <Button variant="outline" className="border-slate-200 hover:border-gold-500 hover:bg-gold-50 hover:text-gold-700 text-slate-700 gap-2 h-12 rounded-xl transition-all">
                              {d.name} <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Visual / Illustration */}
                <div className="flex-1 w-full relative group">
                  <div className="absolute inset-0 bg-gold-500/20 rounded-[2.5rem] blur-2xl transform rotate-3 scale-95 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {tech.imageUrl ? (
                    <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50 relative z-10 bg-white">
                      <img src={tech.imageUrl} alt={tech.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-50" />
                    </div>
                  ) : (
                    <div className="aspect-square bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300 font-bold border border-slate-200 relative z-10">
                      Illustration {tech.title}
                    </div>
                  )}
                </div>

              </ScrollReveal>
            );
          })
        )}
      </div>

      {/* CTA FOOTER - Matches Home Style */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative rounded-[3rem] bg-slate-950 overflow-hidden p-12 md:p-20 text-center border border-slate-800 shadow-2xl shadow-slate-900/50">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Besoin de conseils techniques ?
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Nos experts sont à votre disposition pour détailler chaque technologie et valider leur adéquation avec votre projet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button className="tech-button bg-gold-500 text-slate-950 hover:bg-gold-400 h-14 px-10 text-base border-none rounded-full font-bold">
                    Parler à un expert
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}