import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function HomePage() {
  let featuredDevices;

  // Récupération sécurisée tech
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
        name: "Lifting Pro",
        description: "HIFU dernière génération pour un lifting précis.",
        imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070",
        featured: true,
      },
      {
        id: "mock-2",
        name: "Cryo Tech",
        description: "Cryolipolyse augmentée pour résultats rapides.",
        imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070",
        featured: true,
      },
      {
        id: "mock-3",
        name: "Laser Pulse",
        description: "Épilation définitive haute fréquence.",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068",
        featured: true,
      }
    ];
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO SECTION - Vibrant Tech Style */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Main Hero Card Container */}
          <div className="relative rounded-[3rem] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-8 md:p-20 text-white overflow-hidden shadow-2xl shadow-indigo-500/30">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-pink-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4" />

            {/* Content Flex */}
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">

              {/* Left Text */}
              <div className="flex-1 text-center md:text-left space-y-8">
                <ScrollReveal>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4">
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                    <span className="text-sm font-semibold tracking-wide text-white/90">Nouvelle Collection 2026</span>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.1}>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                    Upgrade Your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-white drop-shadow-sm">
                      Beauty Tech
                    </span>
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="text-xl text-indigo-100 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed">
                    Des équipements esthétiques de pointe pour propulser votre institut vers le futur. Performance, Design et Rentabilité.
                  </p>
                </ScrollReveal>

                <ScrollReveal delay={0.3} className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
                  <Link href="/appareils">
                    <Button className="tech-button bg-white text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 h-14 text-base">
                      Explorer le catalogue
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="tech-button bg-transparent border-2 border-white/30 text-white hover:bg-white hover:text-indigo-600 hover:border-white h-14 text-base transition-colors duration-300">
                      Démo Gratuite
                    </Button>
                  </Link>
                </ScrollReveal>
              </div>

              {/* Right Visuals - Floating Elements Style */}
              <div className="flex-1 w-full relative h-[400px] md:h-[500px]">
                {/* Simulated Floating UI Elements inspired by the image provided */}

                {/* Mockup Central */}
                <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-80 bg-white rounded-[2rem] shadow-2xl flex flex-col items-center p-4 z-20 animate-float">
                  <div className="w-full h-32 bg-indigo-100 rounded-xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">💆‍♀️</div>
                  </div>
                  <div className="w-full space-y-2">
                    <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                    <div className="h-2 w-1/2 bg-slate-100 rounded-full" />
                  </div>
                  <div className="mt-auto w-full">
                    <div className="bg-indigo-600 h-10 w-full rounded-xl flex items-center justify-center text-white text-sm font-bold">Start Session</div>
                  </div>
                </div>

                {/* Floating Bubble Central - Growth Chart */}
                <div className="absolute top-8 left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl z-10 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
                  <div className="flex flex-col gap-2 w-32">
                    <div className="flex justify-between items-end">
                      <div className="w-2 h-4 bg-indigo-200 rounded-t-sm"></div>
                      <div className="w-2 h-6 bg-indigo-300 rounded-t-sm"></div>
                      <div className="w-2 h-3 bg-indigo-200 rounded-t-sm"></div>
                      <div className="w-2 h-8 bg-indigo-400 rounded-t-sm"></div>
                      <div className="w-2 h-5 bg-indigo-300 rounded-t-sm"></div>
                      <div className="w-2 h-10 bg-indigo-600 rounded-t-sm"></div>
                    </div>
                    <div className="h-px bg-slate-200 w-full mb-1"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-bold">Revenue</span>
                      <span className="text-xs text-green-600 font-bold">▲ 24%</span>
                    </div>
                  </div>
                </div>

                {/* Floating Bubble 1 */}
                <div className="absolute top-10 right-10 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">ROI</div>
                      <div className="text-lg font-bold text-slate-800">+150%</div>
                    </div>
                  </div>
                </div>

                {/* Floating Bubble 2 */}
                <div className="absolute bottom-20 left-0 bg-white p-4 rounded-2xl shadow-xl z-20 animate-bounce" style={{ animationDuration: '4s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase">Satisfait</div>
                      <div className="text-lg font-bold text-slate-800">4.9/5</div>
                    </div>
                  </div>
                </div>

                {/* Background Element Circle */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/50 to-purple-500/50 rounded-full blur-3xl opacity-50 z-0 animate-pulse" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* METRICS / LOGOS - Clean Pill Style */}
      <section className="py-10 -mt-20 relative z-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-white/95 backdrop-blur-xl border border-white/60 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100/50">
            {['500+ Centres', 'Formation Incluse', 'SAV France', 'Garantie 2 Ans'].map((label, i) => (
              <span key={i} className="px-8 py-3 bg-slate-50 text-slate-800 font-bold rounded-full text-base hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-default border border-slate-100 shadow-sm">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES GRID - Tech Cards */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose Us?</h2>
            <p className="text-slate-500 text-lg">La technologie au service de votre réussite.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "Cutting Edge", desc: "Dernières innovations mondiales.", color: "bg-yellow-100 text-yellow-600" },
              { icon: ShieldCheck, title: "Secure & Safe", desc: "Certifications médicales CE.", color: "bg-green-100 text-green-600" },
              { icon: Activity, title: "High Perf", desc: "Rentabilité boostée dès le mois 1.", color: "bg-blue-100 text-blue-600" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="tech-card group">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW - Rounded Style */}
      {featuredDevices.length > 0 && (
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm mb-2 block">Nos Solutions</span>
                <h2 className="text-4xl font-bold text-slate-900">Best Sellers</h2>
              </div>
              <Link href="/appareils">
                <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-bold gap-2">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDevices.map((device, i) => (
                <ScrollReveal key={device.id} delay={i * 0.1} className="group relative">
                  <div className="bg-white rounded-[2rem] p-4 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-[4/3] rounded-[1.5rem] bg-slate-100 mb-6 overflow-hidden relative">
                      {device.imageUrl ? (
                        <img src={device.imageUrl} alt={device.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-2xl">IMG</div>
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        NEW
                      </div>
                    </div>
                    <div className="px-2 pb-4">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{device.name}</h3>
                      <p className="text-slate-500 text-sm line-clamp-2 mb-4">{device.description}</p>
                      <Link href={`/appareils/${device.id}`}>
                        <Button className="w-full rounded-xl bg-slate-900 text-white hover:bg-indigo-600 font-bold h-12">
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
          <div className="relative rounded-[3rem] bg-slate-900 overflow-hidden p-12 md:p-24 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#4f46e5,#312e81)] opacity-50" />

            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                Ready to scale your business?
              </h2>
              <p className="text-indigo-200 text-xl max-w-2xl mx-auto">
                Rejoignez les leaders de l'esthétique et boostez votre chiffre d'affaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/contact">
                  <Button className="tech-button bg-white text-slate-900 hover:bg-slate-100 h-14 px-10 text-base">
                    Get Started Now
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