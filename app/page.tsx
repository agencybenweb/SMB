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
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 selection:bg-gold-500/30">

      {/* HERO SECTION - Luxe Sobre & Lumineux */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">

        {/* Subtle Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.05),transparent_50%)]" />

        <div className="container relative z-10 px-4 text-center max-w-5xl">

          <ScrollReveal className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200">
              <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
              <span className="text-xs font-semibold tracking-wider text-slate-600 uppercase">
                Leader de l'esthétique B2B
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mb-8">
            <h1 className="font-serif text-6xl md:text-8xl font-medium text-slate-900 tracking-tight leading-[0.95] mb-6">
              L'Excellence <br />
              <span className="italic text-gold-600">Technologique</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="mb-12">
            <p className="font-sans text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Équipez votre centre avec des appareils de dernière génération.
              <br />Performance, rentabilité et design pour les professionnels exigeants.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/appareils">
              <Button size="lg" className="h-14 px-10 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-base font-medium shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-1">
                Découvrir nos appareils
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-14 px-10 border-slate-200 text-slate-900 hover:bg-slate-50 rounded-md text-base font-medium transition-all hover:-translate-y-1">
                Demander un devis
              </Button>
            </Link>
          </ScrollReveal>

          {/* Trust Badges */}
          <ScrollReveal delay={0.6} className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Vous pouvez ajouter ici des logos partenaires si besoin */}
            <span className="font-serif text-xl italic text-slate-400">My Sculpt Technology</span>
          </ScrollReveal>
        </div>
      </section>

      {/* VALUES SECTION - Clean Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Technologies Certifiées",
                desc: "Tous nos appareils répondent aux normes CE et ISO pour garantir sécurité et efficacité."
              },
              {
                icon: Award,
                title: "Formation Incluse",
                desc: "Formation théorique et pratique assurée par nos médecins experts."
              },
              {
                icon: Zap,
                title: "Rentabilité Immédiate",
                desc: "Retour sur investissement rapide grâce à des protocoles de soin haute performance."
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-gold-200/50 hover:shadow-xl hover:shadow-gold-500/5 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-gold-600">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {item.desc}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVICES - Clean & Premium */}
      {featuredDevices.length > 0 && (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <ScrollReveal className="text-center mb-20">
              <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6">
                Nos Best-Sellers
              </h2>
              <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full" />
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDevices.map((device, i) => (
                <ScrollReveal key={device.id} delay={i * 0.15} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 border border-slate-100">
                  <Link href={`/appareils/${device.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      {device.imageUrl ? (
                        <img
                          src={device.imageUrl}
                          alt={device.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                          <span className="font-serif text-2xl italic">MySculpt</span>
                        </div>
                      )}
                      {device.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gold-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                          Best Seller
                        </div>
                      )}
                    </div>

                    <div className="p-8">
                      <h3 className="font-serif text-2xl text-slate-900 mb-3 group-hover:text-gold-600 transition-colors">
                        {device.name}
                      </h3>
                      <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                        {device.description}
                      </p>
                      <div className="flex items-center text-slate-900 font-medium text-sm group-hover:translate-x-1 transition-transform">
                        Découvrir <ArrowRight className="w-4 h-4 ml-2 text-gold-500" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center mt-16">
              <Link href="/appareils">
                <Button variant="outline" className="border-slate-300 hover:border-slate-900 text-slate-600 hover:text-slate-900 h-12 px-8 min-w-[200px]">
                  Voir le catalogue complet
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FINAL CTA - Clean Black */}
      <section className="py-24 bg-slate-900 relative isolate overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
          <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <ScrollReveal>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Prêt à transformer votre institut ?
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto font-light">
              Rejoignez plus de 500 centres équipés par My Sculpt Technology et offrez à vos clients des résultats exceptionnels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 bg-gold-600 hover:bg-gold-500 text-white rounded-md font-medium shadow-lg shadow-gold-900/20">
                  Contacter un expert
                </Button>
              </Link>
              <Link href="/appareils">
                <Button size="lg" variant="outline" className="h-14 px-8 border-white/10 text-white hover:bg-white/10 rounded-md bg-transparent">
                  Catalogue
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}