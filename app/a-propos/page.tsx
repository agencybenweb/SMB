import { ScrollReveal } from "@/components/scroll-reveal";
import { Sparkles, Users, Target, Rocket } from "lucide-react";

export default function AboutPage() {
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
                  <Target className="w-4 h-4 text-gold-400" />
                  <span className="text-sm font-semibold tracking-wide">Notre Mission</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white mb-2">
                  L'Excellence au Service de <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400 drop-shadow-sm">
                    l'Esthétique
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
                  My Sculpt Technology n'est pas seulement un fournisseur d'équipements.
                  Nous sommes votre partenaire croissance dans l'univers de la beauté technologique.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-32 max-w-7xl">

        {/* STORY / MISSION */}
        <section className="grid md:grid-cols-2 gap-16 items-center">
          <ScrollReveal className="space-y-8">
            <div>
              <span className="text-gold-600 font-bold tracking-wider uppercase text-sm mb-2 block">D'Experts à Experts</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Notre Histoire & Mission</h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
              <p>
                Née de l'expertise de <strong className="text-slate-900 border-b-2 border-gold-400">Sculpt My Body Lyon</strong>, référence en soins esthétiques,
                My Sculpt Technology a été créée avec une ambition claire : démocratiser l'accès aux technologies
                de pointe pour les professionnels de la beauté.
              </p>
              <p>
                Nous comprenons les défis des instituts d'aujourd'hui : besoin de rentabilité rapide,
                exigence de résultats visibles, et nécessité d'un support fiable. C'est pourquoi nous
                ne vendons pas juste des machines, nous offrons une solution clé en main pour transformer votre business.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="relative">
            <div className="absolute inset-0 bg-gold-500/10 rounded-[2rem] blur-2xl transform rotate-3 scale-95" />
            <div className="relative h-96 bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-200 shadow-slate-200/50 group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center text-slate-500 font-medium">
                {/* Image Placeholder */}
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-slate-700" />
                  <span className="text-lg">Image Équipe / Showroom</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          </ScrollReveal>
        </section>

        {/* VALEURS - Grid of Cards */}
        <section className="text-center">
          <ScrollReveal className="max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nos Valeurs Fondamentales</h2>
            <p className="text-slate-500 text-lg">Trois piliers qui définissent notre approche et garantissent votre succès.</p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation Certifiée",
                description: "Nous sélectionnons uniquement des technologies éprouvées, certifiées et sûres, garantissant des résultats réels pour vos clients.",
                icon: Sparkles
              },
              {
                title: "Accompagnement Total",
                description: "De l'installation à la formation, en passant par le marketing, nous ne vous laissons jamais seul avec votre appareil.",
                icon: Users
              },
              {
                title: "Rentabilité Partagée",
                description: "Vos succès sont les nôtres. Nos appareils sont conçus pour offrir un ROI rapide et maximiser votre chiffre d'affaires.",
                icon: Rocket
              }
            ].map((val, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="bg-white p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 hover:-translate-y-2 transition-transform duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 mx-auto shadow-lg shadow-slate-900/20 group-hover:scale-110 transition-transform duration-300">
                  <val.icon className="w-8 h-8 text-gold-500" />
                </div>

                <h3 className="text-xl font-bold mb-4 text-slate-900">{val.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{val.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CHIFFRES CLES - Dark Section */}
        <section className="relative rounded-[3rem] bg-slate-950 overflow-hidden p-12 md:p-20 text-center border border-slate-800 shadow-2xl shadow-slate-900/50">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "500+", label: "Instituts Équipés" },
              { number: "98%", label: "Satisfaction Client" },
              { number: "24h", label: "Délai SAV Moyen" },
              { number: "15", label: "Années d'Expérience" }
            ].map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.05} className="group cursor-default">
                <div className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 group-hover:to-gold-400 transition-all duration-300">{stat.number}</div>
                <div className="text-gold-500 uppercase tracking-widest text-xs font-bold">{stat.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}