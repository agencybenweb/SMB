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

      {/* HERO SECTION - Futuristic Premium */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950">

        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-grid-premium opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />

        <div className="container relative z-10 px-4 text-center max-w-6xl">

          <ScrollReveal className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-gold-500/30 bg-gold-500/5 backdrop-blur-md shadow-lg shadow-gold-500/10 animate-fade-in">
              <Star className="w-3.5 h-3.5 text-gold-400 fill-gold-400 animate-spin-slow" />
              <span className="text-xs font-bold tracking-[0.3em] text-gold-200 uppercase">
                Nouvelle Ère Esthétique
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mb-10">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium text-white tracking-tighter leading-[0.9] text-glow-gold">
              L'Art de la <br />
              <span className="text-transparent bg-clip-text bg-gradient-gold animate-shimmer bg-[length:200%_100%] italic relative">
                Perfection
                <span className="absolute -bottom-4 left-0 w-full h-2 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50 blur-sm"></span>
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mb-16">
            <p className="font-sans text-lg md:text-2xl text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed">
              Redéfinissez les standards de votre institut avec des technologies d'avant-garde.
              <span className="block mt-2 text-gold-400/80">Performance clinique. Design d'exception.</span>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Link href="/appareils">
              <Button size="lg" className="h-16 px-12 bg-gold-600 hover:bg-gold-500 text-white rounded-none text-lg tracking-widest uppercase font-medium shadow-xl shadow-gold-900/20 border-r-2 border-b-2 border-gold-800 transition-all hover:-translate-y-1">
                Explorer
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-16 px-12 bg-transparent border border-white/10 hover:border-gold-500/50 text-white hover:bg-white/5 rounded-none text-lg tracking-widest uppercase font-medium backdrop-blur-sm transition-all hover:-translate-y-1">
                Contact
              </Button>
            </Link>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold-500/0 via-gold-500 to-gold-500/0 animate-stream" />
        </div>
      </section>

      {/* PHILOSOPHY SECTION - Glassmorphism Cards */}
      <section className="py-32 bg-obsidian-950 relative">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Certification Médicale",
                desc: "Normes CE et ISO 13485 pour une sécurité absolue."
              },
              {
                icon: Award,
                title: "Expertise & Formation",
                desc: "Masterclasses exclusives pour maîtriser chaque technologie."
              },
              {
                icon: Zap,
                title: "Rentabilité Maximale",
                desc: "Retour sur investissement accéléré grâce à la haute performance."
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="glass-premium p-10 group hover:bg-white/5 transition-all duration-500 hover:-translate-y-2">
                <div className="mb-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-transparent border border-gold-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(198,156,88,0.1)]">
                  <item.icon className="w-7 h-7 text-gold-400" />
                </div>
                <h3 className="font-serif text-3xl text-white mb-4 group-hover:text-gold-300 transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-neutral-400 leading-relaxed font-light text-lg">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVICES - The Showroom */}
      {featuredDevices.length > 0 && (
        <section className="py-40 bg-obsidian-950 relative overflow-hidden">
          {/* Decorative Lines */}
          <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="container mx-auto px-4 max-w-7xl">
            <ScrollReveal className="text-center mb-24">
              <h2 className="font-serif text-5xl md:text-7xl text-white mb-6">
                Le Showroom
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-12">
              {featuredDevices.map((device, i) => (
                <ScrollReveal key={device.id} delay={i * 0.15} className="group cursor-pointer perspective-1000">
                  <Link href={`/appareils/${device.id}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-obsidian-900 border border-white/10 transition-all duration-700 group-hover:border-gold-500/40 group-hover:shadow-[0_0_50px_rgba(198,156,88,0.15)] transform-style-3d group-hover:rotate-y-2">
                      {device.imageUrl ? (
                        <div className="absolute inset-0">
                          <img
                            src={device.imageUrl}
                            alt={device.name}
                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent opacity-90" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-obsidian-900">
                          <span className="font-serif text-gold-500/20 text-6xl italic">MySculpt</span>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 w-full p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="font-serif text-4xl text-white mb-2 tracking-wide group-hover:text-gold-300 transition-colors">
                          {device.name}
                        </h3>
                        <div className="h-1 w-12 bg-gold-500 mb-6 origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />

                        <div className="flex items-center text-white/50 text-sm tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                          Explorer le produit <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:translate-x-2 transition-all" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal className="text-center mt-24">
              <Link href="/appareils">
                <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-gold-500 hover:border-gold-500 hover:text-black tracking-widest uppercase text-sm group transition-all duration-500 rounded-none bg-transparent">
                  Voir toute la collection
                </Button>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* FINAL CTA - The Horizon */}
      <section className="py-40 bg-obsidian-950 relative border-t border-white/5 overflow-hidden">
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gold-600/5 rounded-full blur-[150px]" />

        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <ScrollReveal>
            <h2 className="font-serif text-5xl md:text-7xl text-white mb-10 leading-tight">
              L'avenir de votre centre <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-600">commence ici</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16">
              <Link href="/contact">
                <Button size="lg" className="min-w-[240px] h-16 bg-white text-obsidian-950 hover:bg-gold-400 hover:text-white rounded-none font-bold tracking-widest text-lg transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  DEMANDER UN DEVIS
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Footer stats minimal */}
          <div className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-12 pt-12 border-t border-white/5 mx-auto max-w-4xl">
            {[
              { label: "Centres Équipés", val: "500+" },
              { label: "Satisfaction", val: "100%" },
              { label: "Garantie", val: "2 Ans" },
              { label: "Support", val: "24/7" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="font-serif text-3xl text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">{stat.val}</div>
                <div className="font-sans text-[10px] text-neutral-500 tracking-[0.2em] uppercase group-hover:text-neutral-300 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}