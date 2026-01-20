import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, safeJsonParse } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Play, Download, Settings, BarChart3, Clock, Zap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";

interface PageProps {
  params: { slug: string };
}

// Technologies labels en français
const technologyLabels: Record<string, string> = {
  EMS: "Électrostimulation Musculaire",
  CRYOLIPOLYSE: "Cryolipolyse",
  RADIOFREQUENCE: "Radiofréquence",
  CAVITATION: "Cavitation Ultrasonique",
  LIPOLASER: "Lipo-laser",
  HIFU: "HIFU (Ultrasons Focalisés)",
  VACUUM_RF: "Radiofréquence + Aspiration",
  PRESSOTHERAPIE: "Pressothérapie",
  ENDERMOLOGIE: "Endermologie",
  LED: "LED",
  ANALYSE_CORPORELLE: "Analyse Corporelle",
  MULTI_TECHNOLOGIES: "Multi-Technologies",
};

export default async function DeviceDetailPage({ params }: PageProps) {
  const device = await prisma.device.findUnique({
    where: { slug: params.slug },
    include: {
      documents: {
        where: {
          accessLevel: {
            in: ["PUBLIC", "CLIENT_PRO"],
          },
        },
        orderBy: { uploadedAt: "desc" },
      },
    },
  });

  if (!device) {
    notFound();
  }

  // Parser les champs JSON
  const indications = safeJsonParse<string[]>(device.indications, []);
  const benefits = safeJsonParse<string[]>(device.benefits, []);
  const specifications = safeJsonParse<Record<string, string>>(
    device.specifications,
    {}
  );
  const certifications = safeJsonParse<string[]>(device.certifications, []);
  const galleryUrls = safeJsonParse<string[]>(device.galleryUrls, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-20 pt-24">

      {/* HEADER / BREADCRUMB */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-4">
          <Link href="/appareils" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour au catalogue
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* GAUCHE : VISUELS */}
          <div className="space-y-6">
            <div className={`aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ${device.featured ? 'ring-4 ring-primary/20' : 'border border-slate-200 dark:border-slate-800'}`}>
              {device.imageUrl ? (
                <img
                  src={device.imageUrl}
                  alt={device.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400">
                  <Zap className="w-16 h-16 mb-4 opacity-20" />
                  <span className="font-medium">Image non disponible</span>
                </div>
              )}
            </div>

            {/* Galerie (Placeholder si vide) */}
            <div className="grid grid-cols-4 gap-4">
              {galleryUrls.length > 0 ? galleryUrls.map((url, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-primary transition-colors">
                  <img src={url} className="w-full h-full object-cover" />
                </div>
              )) : (
                // Juste pour l'aspect visuel de la démo, on met des placeholders gris
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50"></div>
                ))
              )}
            </div>

            {/* Certifications Badges */}
            {certifications.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase text-slate-400 w-full mb-1">Certifications :</span>
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm font-medium text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> {cert}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DROITE : INFOS */}
          <div className="flex flex-col">
            <div className="mb-6">
              <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 text-sm">
                {technologyLabels[device.technology] || device.technology}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                {device.name}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                {device.shortDescription}
              </p>
            </div>

            {/* SECTION PRIX & CTA */}
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm mb-10">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  {formatPrice(device.basePrice ? Number(device.basePrice) : null)}
                </span>
                <span className="text-slate-500 font-medium">HT</span>
              </div>
              <p className="text-sm text-slate-500 mb-6">
                Facilités de paiement et leasing disponibles.
              </p>
              <div className="flex flex-col gap-3">
                <AddToCartButton device={device} />
                <Button asChild variant="outline" size="lg" className="w-full h-12">
                  <Link href="/contact">
                    Contacter un expert
                  </Link>
                </Button>
              </div>
            </div>

            {/* TAB-LIKE SECTIONS */}
            <div className="space-y-8">

              {/* Indications */}
              {indications.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" /> Indications
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {indications.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bénéfices */}
              {benefits.length > 0 && (
                <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" /> Bénéfices
                  </h3>
                  <ul className="grid grid-cols-1 gap-2">
                    {benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS SECTION (BELOW) */}
        <div className="mt-20 grid md:grid-cols-3 gap-12">

          {/* Description Detailed */}
          <div className="md:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">Description Détaillée</h2>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                {device.description}
              </div>
            </section>

            {/* Specs */}
            {Object.keys(specifications).length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-slate-400" /> Spécifications Techniques
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-slate-100 dark:border-slate-800/50">
                      <span className="font-medium text-slate-900 dark:text-white">{key}</span>
                      <span className="text-slate-500 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Résultats */}
            {device.expectedResults && (
              <section className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-primary/20 blur-3xl rounded-full"></div>
                <h2 className="text-xl font-bold mb-4 relative z-10">Résultats Attendus</h2>
                <p className="text-slate-300 leading-relaxed relative z-10">{device.expectedResults}</p>
              </section>
            )}
          </div>

          {/* Sidebar Right (Downloads & Video) */}
          <div className="space-y-8">

            {/* Downloads */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> Documentation
              </h3>
              {device.documents.length > 0 ? (
                <div className="space-y-3">
                  {device.documents.map((doc) => (
                    <a key={doc.id} href={doc.fileUrl} target="_blank" className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 transition-colors">
                      <div className="text-sm font-medium truncate pr-4">{doc.title}</div>
                      <Download className="w-4 h-4 text-slate-400" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-500 italic">Aucune documentation publique disponible.</div>
              )}
            </div>

            {/* Video */}
            {device.videoUrl && (
              <div className="bg-black rounded-xl overflow-hidden shadow-lg group cursor-pointer relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 group-hover:bg-black/10 transition-colors">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Fake thumbnail if iframe not loaded */}
                <div className="w-full h-full bg-slate-800"></div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}