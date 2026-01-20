import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck, TrendingUp, Award } from "lucide-react";

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
    <div className="flex flex-col min-h-screen">

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900">

        {/* Background Gradient/Mesh */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
        </div>

        <div className="container relative z-10 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-white/90">Leader de la technologie esthétique B2B</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            L'Excellence <span className="text-gradient-gold">Technologique</span> <br />
            au Service de la Beauté
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Équipez votre centre avec des appareils esthétiques de dernière génération.
            Rentabilité garantie, formation certifiante et SAV expert.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/appareils">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                Découvrir nos appareils
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-white rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                Demander un devis
              </Button>
            </Link>
          </div>

          {/* Stats/Trust */}
          <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
            {[
              { label: "Centres équipés", value: "500+" },
              { label: "Années d'expertise", value: "15+" },
              { label: "Appareils disponibles", value: "14" },
              { label: "Satisfaction client", value: "98%" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Pourquoi choisir My Sculpt ?</h2>
            <p className="text-lg text-slate-600">
              Nous ne vendons pas seulement des machines, nous vous accompagnons vers le succès de votre centre.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Technologies Certifiées",
                description: "Tous nos appareils répondent aux normes CE et ISO pour garantir sécurité et efficacité."
              },
              {
                icon: Award,
                title: "Formation Incluse",
                description: "Nos experts vous forment à l'utilisation théorique et pratique pour des résultats optimaux."
              },
              {
                icon: TrendingUp,
                title: "Rentabilité Élevée",
                description: "Un retour sur investissement rapide grâce à des protocoles de soins performants et demandés."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVICES SNEAK PEEK */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Nos Best-Sellers</h2>
              <p className="text-slate-600">Les technologies les plus plébiscitées par les professionnels.</p>
            </div>
            <Link href="/appareils" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Voir tout le catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Real Featured Devices */}
            {featuredDevices.map((device) => (
              <Link key={device.id} href={`/appareils/${device.slug}`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all group cursor-pointer h-full flex flex-col">
                  <div className="h-64 bg-slate-200 relative overflow-hidden">
                    {device.imageUrl ? (
                      <img src={device.imageUrl} alt={device.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                        Image non disponible
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-wider border border-white/20 shadow-lg">
                        {device.technology}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{device.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
                      {device.shortDescription}
                    </p>
                    <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                      <span className="text-primary font-bold text-sm">Découvrir</span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {featuredDevices.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500 mb-4">Découvrez notre gamme complète d'appareils.</p>
              <Link href="/appareils">
                <Button>Voir le catalogue</Button>
              </Link>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link href="/appareils">
              <Button variant="outline" className="w-full">Voir tout le catalogue</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 opacity-20" /> {/* Gold tint */}
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Prêt à transformer votre institut ?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Demandez votre devis personnalisé aujourd'hui et recevez notre catalogue complet avec tarifs professionnels.
          </p>
          <Link href="/contact">
            <Button size="lg" className="h-16 px-10 text-xl bg-white text-slate-900 hover:bg-slate-100 rounded-full shadow-2xl hover:-translate-y-1 transition-all">
              Obtenir un devis gratuit
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}