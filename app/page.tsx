import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, Zap, Award } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function HomePage() {
  let featuredDevices;

  try {
    featuredDevices = await prisma.device.findMany({
      where: {
        status: "ACTIVE",
        featured: true,
      },
      take: 3,
      orderBy: { orderIndex: "asc" },
    });
  } catch (error) {
    console.warn("Database connection failed, using mock data for visual preview");
    featuredDevices = [
      {
        id: "mock-1",
        name: "Lifting Pro Sculpt",
        description: "Technologie HIFU dernière génération pour un lifting non-chirurgical et un raffermissement cutané spectaculaire.",
        imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
        status: "ACTIVE",
        featured: true,
        orderIndex: 0
      },
      {
        id: "mock-2",
        name: "CryoMaster Elite",
        description: "La cryolipolyse augmentée pour une réduction des amas graisseux localisés avec une précision inégalée.",
        imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        status: "ACTIVE",
        featured: true,
        orderIndex: 1
      },
      {
        id: "mock-3",
        name: "Laser Infinity",
        description: "Épilation définitive haute fréquence, indolore et efficace sur tous les phototypes de peau.",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
        status: "ACTIVE",
        featured: true,
        orderIndex: 2
      }
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-obsidian-950 text-white selection:bg-gold-500/30">

      {/* HERO SECTION - Luxe Épuré */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(198,156,88,0.03),transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" /> {/* Optional noise texture if available, else just subtle */}

        <div className="container relative z-10 px-4 text-center max-w-5xl">

          <ScrollReveal className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gold-500/20 bg-gold-500/5 backdrop-blur-sm">
              <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
              <span className="text-xs font-medium tracking-[0.2em] text-gold-300 uppercase">
                Excellence Esthétique
              </span>
              <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
            </div>
          </ScrollReveal>

          <ScrollReveal className="mb-8">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-[1.1]">
              L'Art de la <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 animate-shimmer bg-[length:200%_100%] italic">
                Haute Technologie
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mb-12">
            <p className="font-sans text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
              Une sélection exclusive d'appareils esthétiques pour les professionnels exigeants.
              Alliance parfaite entre performance, design et rentabilité.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/appareils">
              <Button size="lg" className="h-14 px-10 bg-gold-600 hover:bg-gold-700 text-white rounded-none border border-transparent hover:border-gold-400/50 transition-all font-medium tracking-wide text-base">
                Découvrir la Collection
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 bg-transparent border-white/20 hover:border-gold-500/50 text-white hover:bg-white/5 rounded-none transition-all font-medium tracking-wide text-base">
                Nous Contacter
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gold-500 to-transparent" />
        </div>
      </section>

      {/* PHILOSOPHY SECTION - Minimalist Grid */}
      <section className="py-32 bg-obsidian-950 relative border-t border-white/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              {
                icon: ShieldCheck,
                title: "Qualité Certifiée",
                desc: "Des technologies conformes aux normes CE médicales les plus strictes."
              },
              {
                icon: Award,
                title: "Expertise Reconnue",
                desc: "Formation complète et accompagnement continu pour votre réussite."
              },
              {
                icon: Zap,
                title: "Performance Pure",
                desc: "Des résultats visibles et durables pour une satisfaction client maximale."
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="bg-obsidian-950 p-12 group hover:bg-obsidian-900 transition-colors duration-500">
                <div className="mb-6 inline-flex p-3 rounded-full bg-gold-500/5 text-gold-500 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-neutral-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVICES - Elegant Showcase */}
      {featuredDevices.length > 0 && (
        <section className="py-32 bg-obsidian-950 relative overflow-hidden">
          {/* Subtle line decoration */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

          <div className="container mx-auto px-4 max-w-7xl">
            <ScrollReveal className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
                Nos Pièces Maîtresses
              </h2>
              <div className="w-24 h-px bg-gold-500 mx-auto" />
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDevices.map((device, i) => (
                <ScrollReveal key={device.id} delay={i * 0.15} className="group cursor-pointer">
                  <Link href={`/appareils/${device.id}`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-obsidian-900 border border-white/5 transition-all duration-700 group-hover:border-gold-500/30">
                      {device.imageUrl ? (
                        <div className="absolute inset-0">
                          <img
                            src={device.imageUrl}
                            alt={device.name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-90" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-obsidian-900">
                          <span className="font-serif text-gold-500/20 text-6xl italic">MySculpt</span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="w-12 h-px bg-gold-500 mb-6 origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                        <h3 className="font-serif text-3xl text-white mb-3 tracking-wide">
                          {device.name}
                        </h3>
                        <p className="font-sans text-sm text-neutral-400 mb-6 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 line-clamp-2 font-light">
                          {device.description}
                        </p>
                        <div className="flex items-center text-gold-400 text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                          Découvrir <ArrowRight className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="text-center mt-20">
              <Link href="/appareils">
                <Button variant="link" className="text-white hover:text-gold-400 tracking-widest uppercase text-sm group">
                  Voir tout le catalogue
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* FINAL CTA - Minimalist */}
      <section className="py-32 bg-obsidian-950 relative border-t border-white/5">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-8 leading-tight">
              Élevez le standard de <br />
              <span className="italic text-gold-400">votre institut</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Link href="/contact">
                <Button size="lg" className="min-w-[200px] h-14 bg-white text-obsidian-950 hover:bg-gold-50 rounded-none font-medium tracking-wide">
                  Être Rappelé
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Footer minimal stats */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/5 pt-12">
            {[
              { label: "Centres Équipés", val: "500+" },
              { label: "Satisfaction", val: "99%" },
              { label: "Garantie", val: "2 Ans" },
              { label: "Support", val: "24/7" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-serif text-2xl text-white mb-1">{stat.val}</div>
                <div className="font-sans text-xs text-neutral-500 tracking-widest uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}