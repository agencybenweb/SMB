export default function AboutPage() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">

      {/* HEADER */}
      <div className="bg-slate-900 text-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-3xl transform translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            L'Excellence au Service de <span className="text-gradient-gold">l'Esthétique</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            My Sculpt Technology n'est pas seulement un fournisseur d'équipements.
            Nous sommes votre partenaire croissance dans l'univers de la beauté technologique.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-24">

        {/* STORY / MISSION */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Notre Histoire & Mission</h2>
            <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Née de l'expertise de <strong>Sculpt My Body Lyon</strong>, référence en soins esthétiques,
                My Sculpt Technology a été créée avec une ambition claire : démocratiser l'accès aux technologies
                de pointe pour les professionnels de la beauté.
              </p>
              <p>
                Nous comprenons les défis des instituts d'aujourd'hui : besoin de rentabilité rapide,
                exigence de résultats visibles, et nécessité d'un support fiable. C'est pourquoi nous
                ne vendons pas juste des machines, nous offrons une solution clé en main pour transformer votre business.
              </p>
            </div>
          </div>
          <div className="relative h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Placeholder for About Image */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-800 dark:to-slate-900">
              Image Équipe / Showroom
            </div>
          </div>
        </section>

        {/* VALEURS - Grid of Cards */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">Nos Valeurs Fondamentales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation Certifiée",
                description: "Nous sélectionnons uniquement des technologies éprouvées, certifiées et sûres, garantissant des résultats réels pour vos clients.",
                icon: "🔬"
              },
              {
                title: "Accompagnement Total",
                description: "De l'installation à la formation, en passant par le marketing, nous ne vous laissons jamais seul avec votre appareil.",
                icon: "🤝"
              },
              {
                title: "Rentabilité Partagée",
                description: "Vos succès sont les nôtres. Nos appareils sont conçus pour offrir un ROI rapide et maximiser votre chiffre d'affaires.",
                icon: "📈"
              }
            ].map((val, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl mb-6">{val.icon}</div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CHIFFRES CLES */}
        <section className="bg-slate-900 text-white rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 opacity-30 pattern-dots" />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Instituts Équipés" },
              { number: "98%", label: "Satisfaction Client" },
              { number: "24h", label: "Délai SAV Moyen" },
              { number: "15", label: "Années d'Expérience" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-slate-400 uppercase tracking-wider text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}