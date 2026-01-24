import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function HomePage() {
  let featuredDevices;

  try {
    featuredDevices = await prisma.device.findMany({
      where: { status: "ACTIVE", featured: true },
      take: 3,
      orderBy: { orderIndex: "asc" },
    });
  } catch (error) {
    featuredDevices = [
      {
        id: "mock-1",
        slug: "lifting-pro",
        name: "Lifting Pro",
        description: "HIFU dernière génération pour un lifting précis.",
        imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070",
        featured: true,
      },
      {
        id: "mock-2",
        slug: "cryo-tech",
        name: "Cryo Tech",
        description: "Cryolipolyse augmentée pour résultats rapides.",
        imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070",
        featured: true,
      },
      {
        id: "mock-3",
        slug: "laser-pulse",
        name: "Laser Pulse",
        description: "Épilation définitive haute fréquence.",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068",
        featured: true,
      }
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO SECTION - Luxury Black & Gold Style */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Main Hero Card Container */}
          <div className="relative rounded-[3rem] bg-gradient-to-br from-slate-950 via-gray-900 to-stone-900 p-8 md:p-20 text-white overflow-hidden shadow-2xl shadow-gold-900/20 border border-gold-500/10">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

            {/* Content Flex */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">

              {/* Left Text */}
              <div className="flex-1 text-center md:text-left space-y-8">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold-500/20 backdrop-blur-md mb-4 text-gold-200">
                    <Sparkles className="w-4 h-4 text-gold-400" />
                    <span className="text-sm font-semibold tracking-wide">Nouvelle Collection 2026</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white">
                    Révolutionnez <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400 drop-shadow-sm">
                      Votre Institut
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-xl text-slate-300 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                    L'excellence technologique pour des résultats d'exception. Performance, Design et Rentabilité Absolue.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3} className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                  <Link href="/appareils" className="relative group overflow-hidden rounded-full">
                    <Button className="tech-button bg-gold-500 text-slate-950 hover:bg-gold-400 h-14 text-base relative z-10 font-bold border-none">
                      EXPLORER LE CATALOGUE
                    </Button>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full shimmer-effect z-20 pointer-events-none" />
                  </Link>
                  <Link href="/contact" className="group">
                    <Button variant="outline" className="tech-button bg-transparent border-2 border-gold-500/30 text-gold-100 hover:bg-gold-500 hover:text-slate-900 hover:border-gold-500 h-14 text-base transition-colors duration-300 relative overflow-hidden">
                      <span className="relative z-10">DÉMO GRATUITE</span>
                      <div className="absolute inset-0 bg-gold-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                    </Button>
                  </Link>
                </ScrollReveal>
              </div>

              {/* Right Visuals - Floating Elements Style */}
              <div className="flex-1 w-full relative h-[100px] lg:h-[500px] flex flex-col justify-end">

                {/* Mockup Central */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-slate-950 rounded-[2rem] shadow-2xl shadow-black/50 border border-slate-800 hidden lg:flex flex-col items-center p-4 z-20 animate-float">
                  <div className="w-full h-32 bg-slate-900 rounded-xl mb-4 overflow-hidden relative border border-slate-800">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">👑</div>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="h-2 w-3/4 bg-slate-800 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-800 rounded-full" />
                  </div>
                  <div className="mt-auto w-full">
                    <div className="bg-gradient-to-r from-gold-600 to-gold-500 h-10 w-full rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-gold-900/20">Démarrer Séance</div>
                  </div>
                </div>

                {/* Floating Bubble Central - Growth Chart */}
                <div className="absolute top-8 left-0 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-xl z-10 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
                  <div className="flex flex-col gap-4 w-48">
                    <div className="flex justify-between items-end h-24">
                      <div className="w-4 bg-slate-700 rounded-t-sm h-[40%]"></div>
                      <div className="w-4 bg-slate-600 rounded-t-sm h-[60%]"></div>
                      <div className="w-4 bg-slate-700 rounded-t-sm h-[30%]"></div>
                      <div className="w-4 bg-gold-700/50 rounded-t-sm h-[80%]"></div>
                      <div className="w-4 bg-gold-600/50 rounded-t-sm h-[50%]"></div>
                      <div className="w-4 bg-gold-500 rounded-t-sm h-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                    </div>
                    <div className="h-px bg-slate-700 w-full"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-300 font-bold tracking-wide">CHIFFRE D'AFFAIRES</span>
                      <span className="text-xl text-gold-400 font-bold drop-shadow-sm">+24%</span>
                    </div>
                  </div>
                </div>

                {/* Floating Bubble 1 */}
                <div className="absolute top-10 right-10 hidden lg:block bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">ROI</div>
                      <div className="text-lg font-bold text-slate-800">+150%</div>
                    </div>
                  </div>
                </div>

                {/* Floating Bubble 2 */}
                <div className="absolute bottom-20 left-0 hidden lg:block bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">Satisfait</div>
                      <div className="text-lg font-bold text-slate-800">4.9/5</div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/20 to-yellow-500/20 rounded-full blur-3xl opacity-30 z-0 animate-pulse hidden lg:block" />

                {/* Mobile Bubbles Container - Static Flow */}
                <div className="relative mt-8 flex lg:hidden justify-center gap-3 z-30 px-4">
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Satisfait</div>
                      <div className="text-sm font-bold text-slate-800">4.9/5</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-xl">
                    <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-600">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">ROI</div>
                      <div className="text-sm font-bold text-slate-800">+150%</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* METRICS / LOGOS - Clean Pill Style */}
      <section className="py-10 -mt-20 relative z-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-slate-950 backdrop-blur-xl border border-slate-800 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/50">
            {['500+ Centres', 'Formation Incluse', 'SAV France', 'Garantie 2 Ans'].map((label, i) => (
              <span key={i} className="px-8 py-3 bg-slate-900 text-slate-200 font-bold rounded-full text-base hover:bg-gold-500 hover:text-slate-950 transition-colors cursor-default border border-slate-800 shadow-sm">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID - Luxury Black Capsules */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Decorative background elements matching hero style */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-slate-900 mb-4">L'Excellence My Sculpt</h2>
            <p className="text-slate-500 text-lg">La technologie au service de votre prestige.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Dernière Génération", desc: "Des innovations mondiales pour garder une longueur d'avance." },
              { icon: ShieldCheck, title: "Sécurité Certifiée", desc: "Appareils conformes CE et formations certifiantes expertes." },
              { icon: Activity, title: "Rentabilité Immédiate", desc: "Un retour sur investissement boosté dès le premier mois." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="tech-card group hover-glow relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-900 border border-slate-800 group-hover:border-gold-500/50 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative z-10 shadow-lg">
                  <item.icon className="w-7 h-7 text-gold-500" />
                </div>
                <div className="absolute -right-12 -top-12 w-40 h-40 bg-gradient-to-br from-gold-500/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10 group-hover:text-gold-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed relative z-10 group-hover:text-slate-600">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW - Luxury Black Capsules */}
      {featuredDevices.length > 0 && (
        <section className="py-24 overflow-hidden bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-gold-600 font-bold tracking-wider uppercase text-sm mb-2 block">Nos Chefs-d'œuvre</span>
                <h2 className="text-4xl font-bold text-slate-900">Collection Exclusive</h2>
              </div>
              <Link href="/appareils">
                <Button variant="ghost" className="text-slate-900 hover:text-gold-600 hover:bg-gold-50 font-bold gap-2">
                  Tout Voir <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDevices.map((device, i) => (
                <ScrollReveal key={device.id} delay={i * 0.1} className="group relative">
                  <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-gold-500/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                    <div className="aspect-[4/3] rounded-[1.5rem] bg-slate-100 mb-6 overflow-hidden relative group border border-slate-200">
                      {device.imageUrl ? (
                        <>
                          <img src={device.imageUrl} alt={device.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full shimmer-effect pointer-events-none z-10" />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-2xl">IMG</div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-950 shadow-sm border border-slate-200">
                        PREMIUM
                      </div>
                    </div>
                    <div className="px-2 pb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{device.name}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{device.description}</p>
                      <Link href={`/appareils/${device.slug || device.id}`}>
                        <Button className="w-full rounded-xl bg-gold-500 text-slate-950 hover:bg-gold-400 font-bold h-12 transition-all">
                          Découvrir
                        </Button>
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA FOOTER - Vibrant Gradient */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative rounded-[3rem] bg-slate-950 overflow-hidden p-12 md:p-24 text-center border border-slate-800 shadow-2xl shadow-slate-900/50">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#d97706,#0f172a)] opacity-20" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Prêt à changer de dimension ?
              </h2>
              <p className="text-slate-400 text-xl max-w-2xl mx-auto">
                Rejoignez les leaders de l'esthétique et boostez votre chiffre d'affaires dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button className="tech-button bg-gold-500 text-slate-950 hover:bg-gold-400 h-14 px-10 text-base border-none">
                    Prendre Rendez-vous
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