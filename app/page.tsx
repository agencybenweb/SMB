import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, TrendingUp, Award, Sparkles, Zap, Crown } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default async function HomePage() {
  const featuredDevices = await prisma.device.findMany({
    where: {
      status: "ACTIVE",
      featured: true,
    },
    take: 3,
    orderBy: { orderIndex: "asc" },
  });

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* HERO SECTION - Ultra Premium */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark-gold">

        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-amber-500/20 rounded-full blur-[150px] animate-float" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-yellow-500/15 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />

          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400/40 rounded-full animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container relative z-10 px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-gold border-gold-glow mb-8 animate-slide-in-right">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <span className="text-sm font-semibold text-white">Leader de la technologie esthétique B2B</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight animate-scale-in">
            L'Excellence <span className="text-gradient-gold animate-shimmer inline-block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">Technologique</span>
            <br />
            <span className="animate-slide-in-left inline-block">au Service de la Beauté</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-amber-100/90 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Équipez votre centre avec des appareils esthétiques de dernière génération.
            <br className="hidden md:block" />
            <span className="text-amber-200 font-semibold">Rentabilité garantie</span>, formation certifiante et SAV expert.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <Link href="/appareils">
              <Button size="lg" className="group h-16 px-10 text-lg btn-premium rounded-full transition-all hover:scale-110 hover:shadow-2xl hover:shadow-amber-500/50 animate-glow">
                <Crown className="w-5 h-5 mr-2 group-hover-scale" />
                Découvrir nos appareils
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="group h-16 px-10 text-lg btn-elegant rounded-full transition-all hover:scale-110">
                <Zap className="w-5 h-5 mr-2 group-hover-scale" />
                Demander un devis
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="pt-12 border-t border-amber-500/20 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            {[
              { label: "Centres équipés", value: "500+", icon: Award },
              { label: "Années d'expertise", value: "15+", icon: TrendingUp },
              { label: "Appareils disponibles", value: "14", icon: Star },
              { label: "Satisfaction client", value: "98%", icon: ShieldCheck },
            ].map((stat, i) => (
              <div key={i} className="group flex flex-col items-center hover-elegant p-4 rounded-xl transition-all">
                <stat.icon className="w-8 h-8 text-amber-400 mb-2 group-hover-lift" />
                <span className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2 animate-pulse">{stat.value}</span>
                <span className="text-sm text-amber-200/70 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-amber-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION - Animated */}
      <section className="py-32 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-gold-subtle rounded-full blur-[100px] opacity-30" />

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl md:text-6xl font-bold text-premium mb-6">
                Pourquoi choisir <span className="text-gradient-gold">My Sculpt</span> ?
              </h2>
              <p className="text-xl text-accent-subtle leading-relaxed">
                Nous ne vendons pas seulement des machines, nous vous accompagnons vers le succès de votre centre.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: ShieldCheck,
                title: "Technologies Certifiées",
                description: "Tous nos appareils répondent aux normes CE et ISO pour garantir sécurité et efficacité.",
                delay: 0
              },
              {
                icon: Award,
                title: "Formation Incluse",
                description: "Nos experts vous forment à l'utilisation théorique et pratique pour des résultats optimaux.",
                delay: 100
              },
              {
                icon: TrendingUp,
                title: "Rentabilité Élevée",
                description: "Amortissez votre investissement rapidement grâce à des technologies à forte demande.",
                delay: 200
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={item.delay}>
                <div className="group glass-card p-8 rounded-2xl hover-gold hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mb-6 group-hover-lift shadow-lg shadow-amber-500/20">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-premium mb-4">{item.title}</h3>
                  <p className="text-accent-subtle leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVICES - Ultra Dynamic */}
      {featuredDevices.length > 0 && (
        <section className="py-32 bg-gradient-dark-gold relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-[120px] animate-pulse" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Nos <span className="text-gradient-gold">Appareils Phares</span>
                </h2>
                <p className="text-xl text-amber-200/80">
                  Découvrez notre sélection premium de technologies esthétiques
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredDevices.map((device, i) => (
                <ScrollReveal key={device.id} delay={i * 100}>
                  <Link href={`/appareils/${device.id}`}>
                    <div className="group glass-gold rounded-2xl overflow-hidden hover-gold hover:scale-105 transition-all duration-500 border-gold-glow">
                      {device.imageUrl && (
                        <div className="relative h-64 overflow-hidden bg-gradient-gold-subtle">
                          <img
                            src={device.imageUrl}
                            alt={device.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                      )}
                      <div className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover-lift">{device.name}</h3>
                        <p className="text-amber-200/70 mb-6 line-clamp-2">{device.description}</p>
                        <Button className="w-full btn-premium group-hover:shadow-2xl">
                          Découvrir
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={400}>
              <div className="text-center mt-16">
                <Link href="/appareils">
                  <Button size="lg" className="h-14 px-10 btn-elegant group">
                    Voir tous les appareils
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* CTA FINAL - Spectacular */}
      <section className="py-32 bg-gradient-to-br from-neutral-900 via-amber-950/30 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-amber-500/10 to-transparent blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center glass-gold p-12 md:p-16 rounded-3xl border-gold-glow animate-glow">
              <Sparkles className="w-16 h-16 text-amber-400 mx-auto mb-6 animate-float" />
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Prêt à <span className="text-gradient-gold">transformer</span> votre centre ?
              </h2>
              <p className="text-xl text-amber-200/80 mb-10 max-w-2xl mx-auto">
                Rejoignez les 500+ professionnels qui nous font confiance et boostez votre activité dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="h-16 px-12 text-lg btn-premium group animate-pulse">
                    <Crown className="w-5 h-5 mr-2 group-hover-scale" />
                    Demander un devis gratuit
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                <Link href="/appareils">
                  <Button size="lg" variant="outline" className="h-16 px-12 text-lg border-amber-500/50 text-white hover:bg-amber-500/10">
                    Explorer le catalogue
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}