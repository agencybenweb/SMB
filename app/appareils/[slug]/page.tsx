import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatPrice, safeJsonParse } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, FileText, Play, Download, Settings, BarChart3, Clock, Zap, Award, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/shop/add-to-cart-button";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ProductViewer3D } from "@/components/ui/product-viewer-3d";

interface PageProps {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  let device: any;
  try {
    device = await prisma.device.findUnique({
      where: { slug },
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
  } catch (e) {
    console.warn("DB not available, using mock device");
    // Mock for demo/build
    device = {
      id: "mock-1",
      name: "Lifting Pro Sculpt (Démo)",
      slug: slug,
      technology: "HIFU",
      shortDescription: "Appareil de démonstration généré car la base de données n'est pas accessible. Technologie HIFU avancée.",
      description: "Ceci est une description de démonstration pour permettre l'affichage de la page produit même sans connexion base de données active. Le Lifting Pro Sculpt offre une solution non invasive pour le rajeunissement du visage.",
      imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop",
      basePrice: 15900,
      featured: true,
      indications: JSON.stringify(["Rides et ridules", "Relâchement cutané", "Ovale du visage", "Double menton"]),
      benefits: JSON.stringify(["Résultats immédiats", "Aucune éviction sociale", "Traitement rapide", "Sécurité maximale"]),
      specifications: JSON.stringify({ "Puissance": "3J/cm2", "Fréquence": "4MHz - 7MHz", "Cartouches": "1.5mm, 3.0mm, 4.5mm", "Écran": "Tactile 15 pouces" }),
      certifications: JSON.stringify(["CE Médical", "ISO 13485"]),
      galleryUrls: JSON.stringify([
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
      ]),
      expectedResults: "Raffermissement visible dès la première séance. Amélioration continue sur 3 à 6 mois.",
      videoUrl: null,
      documents: []
    };
  }

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

  // Map slugs to 3D model files
  const device3DModels: Record<string, string> = {
    "my-body-cryo-360": "/MeshyCryotherapy.glb",
    "cryo-demo": "/MeshyCryotherapy.glb",
    "my-hydra-face": "/MeshyMyhydraface.glb",
    "my-hydra-face-b": "/MeshyMyhydraface.glb",
    "my-body-laser-r-1": "/MeshyMybodylaserR.glb",
    "my-body-laser-r-2": "/MeshyMybodylaserR.glb",
    "my-body-laser-r-1-poign-e": "/MeshyMybodylaserR.glb",
    "my-body-laser-r-2-poign-es": "/MeshyMybodylaserR.glb",
    "my-body-laser-r": "/MeshyMybodylaserR.glb",
    "mybodylaser": "/MeshyMybodylaserR.glb",
    "mybodylaser-r": "/MeshyMybodylaserR.glb",
    "my-skin-light": "/MeshyMyskinlight.glb",
    "my-skin-light-r": "/MeshyMyskinlight.glb",
  };

  const model3D = device3DModels[slug] || (slug.includes("cryo") ? "/MeshyCryotherapy.glb" : null);

  return (
    <div className="bg-white min-h-screen pb-20 pt-28">

      {/* HEADER / BREADCRUMB */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-30 backdrop-blur-md bg-white/80">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
          <Link href="/appareils" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-gold-600 transition-colors font-medium uppercase tracking-wide">
            <ArrowLeft className="w-4 h-4" /> Retour au catalogue
          </Link>
          <div className="text-sm font-bold text-slate-900 hidden md:block">{device.name}</div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* GAUCHE : VISUELS */}
          <div className="space-y-6">
            <ScrollReveal>
              <div className={`aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl relative group ${device.featured ? 'ring-4 ring-gold-500/20' : 'border border-slate-100'}`}>
                {model3D ? (
                  <ProductViewer3D modelUrl={model3D} className="w-full h-full bg-slate-950" />
                ) : device.imageUrl ? (
                  <img
                    src={device.imageUrl}
                    alt={device.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-300">
                    <Zap className="w-16 h-16 mb-4 opacity-50" />
                    <span className="font-medium">Image non disponible</span>
                  </div>
                )}
                {/* Shine effect */}
                {!model3D && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full shimmer-effect pointer-events-none z-10" />
                )}
              </div>
            </ScrollReveal>

            {/* Galerie (Placeholder si vide) */}
            <ScrollReveal delay={0.1} className="grid grid-cols-4 gap-4">
              {galleryUrls.length > 0 ? galleryUrls.map((url, index) => (
                <div key={index} className="aspect-square rounded-xl overflow-hidden border border-slate-200 cursor-pointer hover:border-gold-500 hover:ring-2 hover:ring-gold-500/20 transition-all">
                  <img src={url} className="w-full h-full object-cover" />
                </div>
              )) : (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                ))
              )}
            </ScrollReveal>

            {/* Certifications Badges */}
            {certifications.length > 0 && (
              <div className="flex flex-wrap gap-3 pt-6 border-t border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 w-full mb-2">Certifications Officielles</span>
                {certifications.map((cert) => (
                  <div key={cert} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-700 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-gold-500" /> {cert}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* DROITE : INFOS */}
          <div className="flex flex-col">
            <ScrollReveal className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-slate-900 text-white hover:bg-slate-800 border-none px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
                  {technologyLabels[device.technology] || device.technology}
                </Badge>
                {device.featured && (
                  <div className="flex items-center gap-1 text-gold-500 text-xs font-bold uppercase tracking-wider">
                    <Award className="w-4 h-4" /> Premium
                  </div>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                {device.name}
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                {device.shortDescription}
              </p>
            </ScrollReveal>

            {/* SECTION PRIX & CTA - Dark Luxury Box */}
            <ScrollReveal delay={0.1} className="p-8 bg-slate-950 rounded-[2rem] border border-slate-800 shadow-2xl shadow-slate-900/30 mb-12 relative overflow-hidden group">
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="flex items-baseline gap-2 mb-2 relative z-10">
                <span className="text-5xl font-bold text-white tracking-tight">
                  {formatPrice(device.basePrice ? Number(device.basePrice) : null)}
                </span>
                <span className="text-slate-400 font-bold text-lg">HT</span>
              </div>
              <p className="text-sm text-slate-400 mb-8 font-medium relative z-10">
                Facilités de paiement et options de leasing disponibles pour les professionnels.
              </p>

              <div className="flex flex-col gap-4 relative z-10">
                <AddToCartButton device={device} />
                <Button asChild variant="outline" size="lg" className="w-full h-14 rounded-xl border-slate-700 bg-transparent text-slate-300 hover:bg-white/5 hover:text-white hover:border-white/20 font-bold transition-all">
                  <Link href="/contact">
                    Contacter un expert
                  </Link>
                </Button>
              </div>
            </ScrollReveal>

            {/* TAB-LIKE SECTIONS */}
            <div className="grid sm:grid-cols-2 gap-8 mb-12">

              {/* Indications */}
              {indications.length > 0 && (
                <ScrollReveal delay={0.2}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                    <BarChart3 className="w-5 h-5 text-gold-500" /> Indications
                  </h3>
                  <ul className="space-y-3">
                    {indications.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              {/* Bénéfices */}
              {benefits.length > 0 && (
                <ScrollReveal delay={0.3}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-900">
                    <Award className="w-5 h-5 text-gold-500" /> Bénéfices
                  </h3>
                  <ul className="space-y-3">
                    {benefits.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 font-medium text-sm">
                        <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>

        {/* DETAILS SECTION (BELOW) */}
        <div className="mt-12 pt-12 border-t border-slate-100 grid md:grid-cols-3 gap-16">

          {/* Description Detailed */}
          <div className="md:col-span-2 space-y-16">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-slate-100 text-slate-900">Description Détaillée</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-medium">
                {device.description}
              </div>
            </ScrollReveal>

            {/* Specs */}
            {Object.keys(specifications).length > 0 && (
              <ScrollReveal>
                <h2 className="text-3xl font-bold mb-8 pb-4 border-b border-slate-100 text-slate-900 flex items-center gap-3">
                  <Settings className="w-8 h-8 text-gold-500" /> Spécifications Techniques
                </h2>
                <div className="grid sm:grid-cols-2 gap-x-16 gap-y-6">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-4 border-b border-slate-50 hover:bg-slate-50/50 px-2 rounded transition-colors group">
                      <span className="font-bold text-slate-800">{key}</span>
                      <span className="text-slate-500 text-right font-mono group-hover:text-gold-600 transition-colors">{value}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {/* Résultats */}
            {device.expectedResults && (
              <ScrollReveal className="relative rounded-[2.5rem] bg-slate-950 overflow-hidden p-10 md:p-12 text-center border border-slate-800 shadow-2xl shadow-slate-900/50">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-600/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2" />

                <h2 className="text-2xl font-bold mb-4 relative z-10 text-white flex items-center justify-center gap-3">
                  <Zap className="w-6 h-6 text-gold-500" /> Résultats Attendus
                </h2>
                <p className="text-slate-300 leading-relaxed relative z-10 text-lg font-medium">{device.expectedResults}</p>
              </ScrollReveal>
            )}
          </div>

          {/* Sidebar Right (Downloads & Video) */}
          <div className="space-y-8">

            {/* Downloads */}
            <ScrollReveal delay={0.2} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="font-bold mb-6 flex items-center gap-3 text-slate-900 text-lg">
                <FileText className="w-6 h-6 text-gold-500" /> Documentation
              </h3>
              {device.documents.length > 0 ? (
                <div className="space-y-4">
                  {device.documents.map((doc: any) => (
                    <a key={doc.id} href={doc.fileUrl} target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-gold-500/30 hover:bg-white hover:shadow-lg hover:shadow-gold-500/5 transition-all group">
                      <div className="text-sm font-bold text-slate-700 truncate pr-4 group-hover:text-slate-900">{doc.title}</div>
                      <Download className="w-5 h-5 text-slate-400 group-hover:text-gold-500" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-slate-400 italic">Aucune documentation publique disponible pour le moment.</div>
              )}
            </ScrollReveal>

            {/* Video */}
            {device.videoUrl && (
              <ScrollReveal delay={0.3} className="bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer relative aspect-video border border-slate-800">
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 group-hover:bg-black/20 transition-colors">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20 shadow-xl">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                </div>
                {/* Fake thumbnail if iframe not loaded */}
                <div className="w-full h-full bg-slate-900"></div>
              </ScrollReveal>
            )}

            <div className="p-6 bg-gold-50 rounded-[2rem] border border-gold-100 text-center">
              <h4 className="font-bold text-gold-800 mb-2">Partager ce produit</h4>
              <div className="flex justify-center gap-4 mt-4">
                <Button size="icon" variant="outline" className="rounded-full border-gold-200 text-gold-700 hover:bg-gold-500 hover:text-white hover:border-gold-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}