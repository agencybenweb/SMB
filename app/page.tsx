import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

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

      {/* HERO SECTION - Clean & Premium */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950">

        {/* Subtle background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-[120px]" />
        </div>

        <div className="container relative z-10 px-4 text-center max-w-5xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-white/90">Leader de la technologie esthétique B2B</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            L'Excellence <span className="text-amber-500">Technologique</span>
            <br />
            au Service de la Beauté
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto mb-4 leading-relaxed">
            Équipez votre centre avec des appareils esthétiques de dernière génération.
          </p>
          <p className="text-base md:text-lg text-amber-500 font-medium mb-12">
            Rentabilité garantie, formation certifiante et SAV expert.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/appareils">
              <Button size="lg" className="h-12 px-8 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors">
                Découvrir nos appareils
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/5 rounded-md">
                Demander un devis
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
            {[
              { label: "Centres équipés", value: "500+" },
              { label: "Années d'expertise", value: "15+" },
              { label: "Appareils disponibles", value: "14" },
              { label: "Satisfaction client", value: "98%" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-amber-500 mb-1">{stat.value}</span>
                <span className="text-xs md:text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION - Clean White */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">

          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
              Pourquoi choisir My Sculpt ?
            </h2>
            <p className="text-lg text-neutral-600">
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
                description: "Amortissez votre investissement rapidement grâce à des technologies à forte demande."
              },
            ].map((item, i) => (
              <div key={i} className="bg-neutral-50 p-8 rounded-xl border border-neutral-200 hover:border-amber-500/30 transition-colors">
                <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DEVICES - Dark Premium */}
      {featuredDevices.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-neutral-900 to-neutral-950">
          <div className="container mx-auto px-4 max-w-6xl">

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Nos <span className="text-amber-500">Appareils Phares</span>
              </h2>
              <p className="text-lg text-neutral-400">
                Découvrez notre sélection premium de technologies esthétiques
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredDevices.map((device) => (
                <Link key={device.id} href={`/appareils/${device.id}`}>
                  <div className="group bg-neutral-800/50 rounded-xl overflow-hidden border border-neutral-700 hover:border-amber-500/50 transition-all">
                    {device.imageUrl && (
                      <div className="relative h-48 bg-neutral-800 overflow-hidden">
                        <img
                          src={device.imageUrl}
                          alt={device.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{device.name}</h3>
                      <p className="text-neutral-400 text-sm mb-4 line-clamp-2">{device.description}</p>
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                        Découvrir
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/appareils">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5">
                  Voir tous les appareils
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA FINAL - Clean */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-12 md:p-16 rounded-2xl text-center border border-neutral-800">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à <span className="text-amber-500">transformer</span> votre centre ?
            </h2>
            <p className="text-lg text-neutral-300 mb-10 max-w-2xl mx-auto">
              Rejoignez les 500+ professionnels qui nous font confiance et boostez votre activité dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="h-12 px-8 bg-amber-600 hover:bg-amber-700 text-white">
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/appareils">
                <Button size="lg" variant="outline" className="h-12 px-8 border-white/20 text-white hover:bg-white/5">
                  Explorer le catalogue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}