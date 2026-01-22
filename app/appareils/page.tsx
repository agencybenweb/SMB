import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Filter, Search, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const devices = await prisma.device.findMany({
    where: whereClause,
    orderBy: { orderIndex: "asc" },
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

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen">
      {/* HERO CATALOGUE */}
      <div className="bg-slate-900 text-white pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-6 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Catalogue <span className="text-gradient-gold">Professionnel</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Des technologies de pointe pour transformer votre institut. Explorez notre gamme certifiée et boostez votre rentabilité.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* SIDEBAR FILTERS (Simplifié pour le moment) */}
          <aside className="w-full md:w-64 shrink-0 space-y-8 sticky top-24 hidden md:block">
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Technologies
              </h3>
              <div className="space-y-2">
                <Link href="/appareils" className={`block px-3 py-2 rounded-md text-sm transition-colors ${!technologyFilter ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-100 text-slate-600'}`}>
                  Toutes les technologies
                </Link>
                {Object.entries(technologyLabels).map(([key, label]) => (
                  <Link
                    key={key}
                    href={`/appareils?tech=${key}`}
                    className={`block px-3 py-2 rounded-md text-sm transition-colors ${technologyFilter === key ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-slate-100 text-slate-600'}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* CATALOGUE GRID */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-slate-500">
                {devices.length} appareil{devices.length > 1 ? 's' : ''} trouvé{devices.length > 1 ? 's' : ''}
              </span>
              {/* Mobile Filter Toggle could be here */}
            </div>

            {devices.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">Aucun résultat</h3>
                <p className="text-slate-500">Essayez de modifier vos filtres.</p>
                <Link href="/appareils">
                  <Button variant="link" className="mt-2">Voir tout le catalogue</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {devices.map((device) => {
                  return (
                    <div
                      key={device.id}
                      className={`group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${device.featured ? "border-primary/50 shadow-md shadow-primary/5" : "border-slate-100 dark:border-slate-800"
                        }`}
                    >
                      {/* Image Area */}
                      <Link href={`/appareils/${device.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
                        {device.imageUrl ? (
                          <img
                            src={device.imageUrl}
                            alt={device.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                            <span className="text-slate-400 font-medium">Image non disponible</span>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {device.featured && (
                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1">
                              <Award className="w-3 h-3" /> Best Seller
                            </span>
                          )}
                        </div>

                        {/* Technology Tag */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur text-slate-900 text-xs font-bold rounded-full shadow-sm">
                            {technologyLabels[device.technology] || device.technology}
                          </span>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <Link href={`/appareils/${device.slug}`} className="mb-2">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                            {device.name}
                          </h3>
                        </Link>

                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {device.shortDescription}
                        </p>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase tracking-widest">À partir de</span>
                            <span className="text-lg font-bold text-slate-900 dark:text-white">
                              {formatPrice(device.basePrice ? Number(device.basePrice) : null)}
                            </span>
                          </div>
                          <Link href={`/appareils/${device.slug}`}>
                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white group-hover:bg-primary group-hover:text-white transition-all">
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
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