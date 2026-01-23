import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Video, BookOpen, GraduationCap, Award, PlayCircle, CheckCircle2, Sparkles, Star } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function FormationPage() {
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
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

            {/* Content Flex */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

              <ScrollReveal>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-gold-500/20 backdrop-blur-md mb-4 text-gold-200">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-semibold tracking-wide">Certification Agréée</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white mb-6">
                  L'Académie <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400 drop-shadow-sm">
                    My Sculpt
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  Maîtrisez l'art de la technologie esthétique.
                  Des formations certifiantes expertes pour garantir des résultats d'exception à votre clientèle.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3} className="flex flex-wrap gap-4 justify-center pt-8">
                <Button className="tech-button bg-gold-500 text-slate-950 hover:bg-gold-400 h-14 px-8 text-base relative z-10 font-bold border-none rounded-full">
                  Découvrir les Modules
                </Button>
                <Button variant="outline" className="tech-button bg-transparent border-2 border-gold-500/30 text-gold-100 hover:bg-gold-500 hover:text-slate-900 hover:border-gold-500 h-14 px-8 text-base transition-colors duration-300 rounded-full">
                  <PlayCircle className="w-5 h-5 mr-2" /> Démo E-learning
                </Button>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION - Clean White Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <ScrollReveal className="space-y-8">
              <div>
                <span className="text-gold-600 font-bold tracking-wider uppercase text-sm mb-2 block">Expertise & Savoir-faire</span>
                <h2 className="text-4xl font-bold text-slate-900 mb-6">Une Formation Sur-Mesure</h2>
              </div>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  L'achat d'un appareil <span className="font-semibold text-slate-900">My Sculpt Technology</span> inclut systématiquement un programme complet de formation.
                  Nous ne vous laissons pas seul : notre objectif est votre expertise.
                </p>
                <p>
                  Nos formateurs sont des experts praticiens qui vous transmettent non seulement le fonctionnement technique,
                  mais aussi les protocoles de soins les plus rentables et les astuces du métier.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                      User
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-slate-900 font-bold">Rejoignez +500 Experts</div>
                  <div className="text-gold-500 text-sm flex gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="relative">
              <div className="aspect-video bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/50 group cursor-pointer border border-slate-100 relative">
                <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors duration-300" />

                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <PlayCircle className="w-10 h-10 text-white fill-white/20" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl">
                    <div className="text-white font-bold text-lg">Aperçu de la plateforme</div>
                    <div className="text-white/70 text-sm">Découvrez notre interface d'e-learning exclusive</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-slate-900/5 rounded-full blur-3xl -z-10" />
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* CARDS SECTION - Hybrid Format */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-white transform -skew-y-3 origin-top-left -z-10" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Un Format Hybride Complet</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">La flexibilité du digital alliée à la pratique terrain.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "E-Learning Illimité",
                desc: "Accès 24/7 à notre plateforme vidéo. Revoyez les protocoles et gestuelles à votre rythme."
              },
              {
                icon: GraduationCap,
                title: "Formation Présentielle",
                desc: "Une journée de pratique intensive dans votre centre ou notre showroom pour valider vos acquis."
              },
              {
                icon: Award,
                title: "Certification",
                desc: "Obtenez votre certificat d'aptitude My Sculpt, un gage de sérieux et de qualité pour votre clientèle."
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="tech-card group hover-glow relative overflow-hidden transition-all duration-300 border border-slate-100 shadow-xl shadow-slate-200/50 bg-white rounded-3xl p-8">
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

      {/* PROGRAMME - Dark Luxury Capsule */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="relative rounded-[3rem] bg-slate-950 p-10 md:p-16 border border-slate-800 shadow-2xl shadow-slate-900/50 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

            <div className="text-center mb-12 relative z-10">
              <span className="text-gold-500 font-bold tracking-wider uppercase text-sm mb-2 block">Cursus Complet</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Programme Type</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              {[
                "Théorie et fonctionnement de la technologie",
                "Indications et contre-indications (Sécurité)",
                "Diagnostic client et personnalisation du soin",
                "Pratique : Installation et réglages",
                "Pratique : Réalisation d'un soin complet",
                "Maintenance et entretien de l'appareil",
                "Rentabilité et Marketing (Prix, Carte de soins)"
              ].map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.05} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/5 hover:border-gold-500/30 transition-all duration-300 group">
                  <div className="w-10 h-10 rounded-full bg-slate-900 border border-gold-500/20 flex items-center justify-center text-sm font-bold text-gold-500 shrink-0 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{step}</span>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-12 text-center relative z-10">
              <p className="text-slate-400 text-sm italic">
                * Le contenu peut varier légèrement selon la technologie choisie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER - Matches Home */}
      <section className="pb-20 pt-10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Vous êtes déjà client ?</h2>
          <Link href="/dashboard/formation">
            <Button className="tech-button bg-slate-900 text-white hover:bg-gold-500 hover:text-slate-900 h-14 px-10 text-base rounded-full shadow-lg hover:shadow-gold-500/20 transition-all">
              Accéder à mon espace formation
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
}