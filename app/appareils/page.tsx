import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Filter, Search, Award, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const technologyLabels: Record<string, string> = {
  HIFU: "HIFU",
  LASER: "Laser Épilation",
  LED: "LED",
  CRYOLIPOLYSE: "Cryolipolyse",
  LIFTING: "Lifting Visage",
  VACUUM: "Vacuum Therapy",
  EMS: "Électrostimulation (EMS)",
  HYDRAFACIAL: "Hydrafacial",
  PRESSOTHERAPIE: "Pressothérapie",
  ANALYSE_CORPORELLE: "Analyse Corporelle",
  DIAGNOSTIC: "Diagnostic de Peau",
};

export default async function AppareilsPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string; q?: string }>;
}) {
  // Filtres
  const params = await searchParams;
  const technologyFilter = params.tech;
  const whereClause: any = { status: "ACTIVE" };

  if (technologyFilter) {
    whereClause.technology = technologyFilter;
  }

  let devices;
  try {
    devices = await prisma.device.findMany({
      where: whereClause,
      orderBy: [
        { featured: 'desc' },
        { orderIndex: 'asc' }
      ],
      select: {
        id: true,
        name: true,
        slug: true,
        technology: true,
        shortDescription: true,
        imageUrl: true,
        basePrice: true,
        featured: true,
        indications: true,
      },
    });
  } catch (e) {
    console.warn("DB connection failed, using mocks");
    devices = [
      {
        id: "mock-1",
        name: "Lifting Pro Sculpt",
        slug: "lifting-pro-sculpt",
        technology: "HIFU",
        shortDescription: "Technologie HIFU dernière génération pour un lifting non-chirurgical et un raffermissement cutané spectaculaire.",
        imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
        basePrice: 15900,
        featured: true,
        indications: ["Anti-âge", "Lifting", "Raffermissement"]
      },
      {
        id: "mock-2",
        name: "CryoMaster Elite",
        slug: "cryomaster-elite",
        technology: "CRYOLIPOLYSE",
        shortDescription: "La cryolipolyse augmentée pour une réduction des amas graisseux localisés avec une précision inégalée.",
        imageUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        basePrice: 12900,
        featured: true,
        indications: ["Minceur", "Remodelage", "Cellulite"]
      },
      {
        id: "mock-3",
        name: "Laser Infinity",
        slug: "laser-infinity",
        technology: "LASER",
        shortDescription: "Épilation définitive haute fréquence, indolore et efficace sur tous les phototypes de peau.",
        imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
        basePrice: 18500,
        featured: true,
        indications: ["Épilation", "Douceur", "Tous phototypes"]
      },
      {
        id: "mock-4",
        name: "HydraPure Station",
        slug: "hydrapure-station",
        technology: "HYDRAFACIAL",
        shortDescription: "Soin complet 7-en-1 : nettoyage, exfoliation, extraction et hydratation pour un teint éclatant.",
        imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop",
        basePrice: 8900,
        featured: false,
        indications: ["Nettoyage", "Éclat", "Hydratation"]
      }
    ];

    if (technologyFilter) {
      devices = devices.filter((d: any) => d.technology === technologyFilter);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO CATALOGUE - Luxury Black & Gold Style */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-slate-950 via-gray-900 to-stone-900 p-8 md:p-16 text-white overflow-hidden shadow-2xl shadow-gold-900/20 border border-gold-500/10">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-2 text-gold-400 hover:text-white transition-colors mb-6 text-sm font-bold uppercase tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Catalogue <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-200 via-yellow-100 to-gold-400">Professionnel</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl font-medium">
                Des technologies de pointe pour transformer votre institut. Explorez notre gamme certifiée et boostez votre rentabilité.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* SIDEBAR FILTERS */}
          <aside className="w-full md:w-64 shrink-0 space-y-8 sticky top-24 hidden md:block">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50">
              <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
                <Filter className="w-4 h-4 text-gold-500" /> Technologies
              </h3>
              <div className="space-y-2">
                <Link href="/appareils" className={`block px-4 py-3 rounded-xl text-sm transition-all duration-300 ${!technologyFilter ? 'bg-slate-900 text-white font-bold shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  Toutes les technologies
                </Link>
                {Object.entries(technologyLabels).map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/appareils?tech=${key}`}
                    className={`block px-4 py-3 rounded-xl text-sm transition-all duration-300 ${technologyFilter === key ? 'bg-slate-900 text-white font-bold shadow-md' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* CATALOGUE GRID */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                {devices.length} appareil{devices.length > 1 ? 's' : ''} disponible{devices.length > 1 ? 's' : ''}
              </span>
            </div>

            {devices.length === 0 ? (
              <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Aucun résultat</h3>
                <p className="text-slate-500 mb-6">Nous n'avons pas trouvé d'appareils correspondant à vos critères.</p>
                <Link href="/appareils">
                  <Button variant="link" className="text-gold-600 font-bold hover:text-gold-700">Voir tout le catalogue</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {devices.map((device, i) => {
                  return (
                    <ScrollReveal key={device.id} delay={i * 0.05} className={`group flex flex-col bg-white rounded-[2rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${device.featured ? "border-gold-500/30 shadow-xl shadow-gold-500/10" : "border-slate-100 shadow-lg shadow-slate-200/50"}`}>

                      {/* Image Area */}
                      <Link href={`/appareils/${device.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
                        {device.imageUrl ? (
                          <>
                            <img
                              src={device.imageUrl}
                              alt={device.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full shimmer-effect pointer-events-none z-10" />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300 font-bold text-xl border-b border-slate-100">
                            IMG
                          </div>
                        )}

                        {/* Top Tags */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {device.featured && (
                            <span className="px-3 py-1 bg-gradient-to-r from-gold-500 to-yellow-600 text-slate-950 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1 border border-white/20">
                              <Award className="w-3 h-3" /> Best Seller
                            </span>
                          )}
                        </div>

                        {/* Technology Tag */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-white/95 backdrop-blur text-slate-900 text-xs font-bold rounded-full shadow-md border border-slate-100">
                            {technologyLabels[device.technology] || device.technology}
                          </span>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <Link href={`/appareils/${device.slug}`} className="mb-3 block">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-gold-600 transition-colors line-clamp-1">
                            {device.name}
                          </h3>
                        </Link>

                        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-1 font-medium">
                          {device.shortDescription}
                        </p>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-bold">Investissement</span>
                            <span className="text-lg font-bold text-slate-900">
                              {formatPrice(device.basePrice ? Number(device.basePrice) : null)}
                            </span>
                          </div>
                          <Link href={`/appareils/${device.slug}`}>
                            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-gold-500 group-hover:text-slate-950 group-hover:border-gold-500 transition-all duration-300">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}