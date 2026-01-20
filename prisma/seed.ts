import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // Créer un utilisateur admin par défaut
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@mysculpt-tech.fr" },
    update: {},
    create: {
      email: "admin@mysculpt-tech.fr",
      passwordHash: adminPassword,
      role: "ADMIN",
      status: "ACTIVE",
      companyName: "My Sculpt Technology",
      firstName: "Admin",
      lastName: "System",
      phone: "+33 1 23 45 67 89",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Admin créé:", admin.email);

  // Créer un client de test
  const clientPassword = await bcrypt.hash("client123", 12);
  const client = await prisma.user.upsert({
    where: { email: "client@example.fr" },
    update: {},
    create: {
      email: "client@example.fr",
      passwordHash: clientPassword,
      role: "CLIENT_PRO",
      status: "ACTIVE",
      companyName: "Institut Beauté Test",
      siret: "12345678901234",
      firstName: "Jean",
      lastName: "Dupont",
      phone: "+33 6 12 34 56 78",
      address: "123 Rue de la Beauté",
      city: "Lyon",
      postalCode: "69001",
      country: "France",
      emailVerified: new Date(),
    },
  });
  console.log("✅ Client créé:", client.email);

  // Créer les appareils
  const devices = [
    {
      name: "EMS Pro Elite",
      slug: "ems-pro-elite",
      technology: "EMS" as const,
      shortDescription: "Électrostimulation musculaire professionnelle de nouvelle génération",
      description: "L'EMS Pro Elite est un appareil d'électrostimulation musculaire de pointe, conçu pour les professionnels de l'esthétique et du bien-être. Cette technologie permet de tonifier et raffermir les muscles en profondeur, offrant des résultats visibles dès les premières séances.",
      indications: JSON.stringify([
        "Raffermissement musculaire",
        "Tonification du corps",
        "Cellulite aqueuse",
        "Relaxation musculaire",
        "Amélioration de la circulation sanguine"
      ]),
      benefits: JSON.stringify([
        "Résultats visibles rapidement",
        "Non invasif et indolore",
        "Séances de 20-30 minutes",
        "Compatible avec tous types de peaux",
        "Technologie médicale certifiée"
      ]),
      expectedResults: "Raffermissement visible dès 6-8 séances, réduction de la cellulite, amélioration de la fermeté cutanée et du tonus musculaire.",
      specifications: JSON.stringify({
        "Puissance": "Max 200mA par canal",
        "Canaux": "8 canaux indépendants",
        "Fréquences": "1-150 Hz",
        "Impulsions": "Rectangulaire, triangulaire, sinusoïdale",
        "Dimensions": "45 x 30 x 15 cm",
        "Poids": "8 kg",
        "Alimentation": "220V / 50Hz",
        "Écran": "Écran tactile 10 pouces"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485", "FDA"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 8990.00,
      status: "ACTIVE" as const,
      featured: true,
      orderIndex: 1,
    },
    {
      name: "Cryo Slim Pro",
      slug: "cryo-slim-pro",
      technology: "CRYOLIPOLYSE" as const,
      shortDescription: "Cryolipolyse professionnelle pour réduction ciblée des graisses",
      description: "Le Cryo Slim Pro utilise la technologie de cryolipolyse pour éliminer définitivement les cellules graisseuses par le froid. Cette méthode non invasive permet de traiter les zones récalcitrantes sans chirurgie.",
      indications: JSON.stringify([
        "Réduction des graisses localisées",
        "Double menton",
        "Poignées d'amour",
        "Cuisse interne/externe",
        "Abdomen"
      ]),
      benefits: JSON.stringify([
        "Résultats permanents",
        "Pas d'intervention chirurgicale",
        "Technique validée médicalement",
        "Récupération immédiate",
        "Ciblage précis des zones"
      ]),
      expectedResults: "Réduction de 20-30% du volume traité après 2-3 mois, résultats visibles dès 3-4 semaines.",
      specifications: JSON.stringify({
        "Température": "-10°C à -12°C",
        "Applicateurs": "4 applicateurs (grand, moyen, petit, menton)",
        "Durée séance": "45-60 minutes par zone",
        "Surface traitement": "Max 300 cm²",
        "Dimensions": "60 x 50 x 120 cm",
        "Poids": "85 kg",
        "Alimentation": "220V / 16A"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485", "FDA"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 24900.00,
      status: "ACTIVE" as const,
      featured: true,
      orderIndex: 2,
    },
    {
      name: "RF Beauty Expert",
      slug: "rf-beauty-expert",
      technology: "RADIOFREQUENCE" as const,
      shortDescription: "Radiofréquence multipolaire pour lifting et anti-âge",
      description: "La RF Beauty Expert utilise la radiofréquence multipolaire pour stimuler la production de collagène et raffermir la peau. Idéal pour les traitements anti-âge et de lifting non invasif.",
      indications: JSON.stringify([
        "Raffermissement de la peau",
        "Rides et ridules",
        "Relâchement cutané",
        "Amélioration de l'élasticité",
        "Lifting non invasif"
      ]),
      benefits: JSON.stringify([
        "Stimulation naturelle du collagène",
        "Pas de période de récupération",
        "Traitement confortable",
        "Résultats progressifs et durables",
        "Adapté à tous phototypes"
      ]),
      expectedResults: "Amélioration visible de la fermeté dès 3-4 séances, résultats optimaux après 6-8 séances espacées de 2 semaines.",
      specifications: JSON.stringify({
        "Fréquence": "1 MHz",
        "Électrodes": "Multipolaire (6 pôles)",
        "Température": "38-42°C",
        "Applicateurs": "Visage, corps, intime",
        "Dimensions": "40 x 35 x 25 cm",
        "Poids": "12 kg",
        "Écran": "Écran tactile 7 pouces"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 12900.00,
      status: "ACTIVE" as const,
      featured: true,
      orderIndex: 3,
    },
    {
      name: "Cavi Slim Advanced",
      slug: "cavi-slim-advanced",
      technology: "CAVITATION" as const,
      shortDescription: "Cavitation ultrasonique pour destruction des cellules graisseuses",
      description: "Le Cavi Slim Advanced utilise les ultrasons de cavitation pour détruire les cellules graisseuses de manière non invasive. Technologie efficace pour la réduction de cellulite et des graisses localisées.",
      indications: JSON.stringify([
        "Cellulite",
        "Graisses localisées",
        "Réduction de tour de taille",
        "Cuisses et fessiers",
        "Bras"
      ]),
      benefits: JSON.stringify([
        "Technique non invasive",
        "Séances courtes (30-45 min)",
        "Résultats visibles rapidement",
        "Pas d'effets secondaires",
        "Confortable pour le client"
      ]),
      expectedResults: "Réduction de 2-4 cm de tour de taille après 6-8 séances, amélioration visible de la cellulite dès 4 séances.",
      specifications: JSON.stringify({
        "Fréquence": "40 kHz",
        "Puissance": "300W",
        "Profondeur": "Jusqu'à 6 cm",
        "Applicateurs": "2 applicateurs (corps)",
        "Dimensions": "50 x 40 x 30 cm",
        "Poids": "15 kg"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 15900.00,
      status: "ACTIVE" as const,
      featured: false,
      orderIndex: 4,
    },
    {
      name: "Lipolaser Pro",
      slug: "lipolaser-pro",
      technology: "LIPOLASER" as const,
      shortDescription: "Lipo-laser pour réduction des graisses et remodelage corporel",
      description: "Le Lipolaser Pro combine laser à basse intensité et massages pour réduire les graisses localisées tout en remodelant la silhouette. Technologie innovante et efficace.",
      indications: JSON.stringify([
        "Réduction des graisses",
        "Remodelage corporel",
        "Cellulite",
        "Amélioration de la silhouette",
        "Raffermissement"
      ]),
      benefits: JSON.stringify([
        "Double action : laser + massage",
        "Résultats visibles en 4-6 séances",
        "Technologie douce et confortable",
        "Pas de période de récupération",
        "Effet drainant"
      ]),
      expectedResults: "Réduction de 2-5 cm après 8-10 séances, amélioration de la fermeté et de la silhouette.",
      specifications: JSON.stringify({
        "Laser": "4 diodes laser 635nm",
        "Puissance": "150mW par diode",
        "Massage": "6 têtes de massage motorisées",
        "Dimensions": "120 x 60 x 40 cm",
        "Poids": "45 kg",
        "Surface": "Table de traitement intégrée"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 18900.00,
      status: "ACTIVE" as const,
      featured: false,
      orderIndex: 5,
    },
    {
      name: "HIFU Lifting System",
      slug: "hifu-lifting-system",
      technology: "HIFU" as const,
      shortDescription: "HIFU pour lifting profond et raffermissement intense",
      description: "Le HIFU Lifting System utilise les ultrasons focalisés de haute intensité pour un lifting profond non invasif. Technologie médicale de pointe pour résultats professionnels.",
      indications: JSON.stringify([
        "Lifting profond",
        "Relâchement cutané sévère",
        "Raffermissement intense",
        "Double menton",
        "Contour du visage"
      ]),
      benefits: JSON.stringify([
        "Lifting profond non invasif",
        "Résultats comparables à la chirurgie",
        "Pas d'incision",
        "Récupération minimale",
        "Effets durables (12-18 mois)"
      ]),
      expectedResults: "Raffermissement visible dès 1 mois, résultats optimaux après 3 mois, durée d'action 12-18 mois.",
      specifications: JSON.stringify({
        "Fréquence": "4.5 MHz / 7.5 MHz",
        "Profondeur": "1.5mm, 3mm, 4.5mm",
        "Points": "200-400 points par zone",
        "Durée séance": "30-60 minutes",
        "Dimensions": "35 x 30 x 20 cm",
        "Poids": "8 kg"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485", "FDA"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 29900.00,
      status: "ACTIVE" as const,
      featured: true,
      orderIndex: 6,
    },
    {
      name: "Vacuum RF Plus",
      slug: "vacuum-rf-plus",
      technology: "VACUUM_RF" as const,
      shortDescription: "Radiofréquence combinée avec aspiration pour traitement complet",
      description: "Le Vacuum RF Plus combine radiofréquence et aspiration sous vide pour un traitement complet de raffermissement et réduction de cellulite.",
      indications: JSON.stringify([
        "Cellulite",
        "Peau d'orange",
        "Raffermissement",
        "Drainage lymphatique",
        "Amélioration de la texture"
      ]),
      benefits: JSON.stringify([
        "Double action : RF + aspiration",
        "Traitement complet en une séance",
        "Amélioration de la circulation",
        "Résultats rapides",
        "Confortable et relaxant"
      ]),
      expectedResults: "Réduction visible de la cellulite dès 4-6 séances, amélioration de la fermeté après 8 séances.",
      specifications: JSON.stringify({
        "RF": "1 MHz multipolaire",
        "Aspiration": "3 niveaux ajustables",
        "Applicateurs": "2 applicateurs corps",
        "Température": "38-42°C",
        "Dimensions": "45 x 40 x 30 cm",
        "Poids": "18 kg"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 16900.00,
      status: "ACTIVE" as const,
      featured: false,
      orderIndex: 7,
    },
    {
      name: "Presso Pro",
      slug: "presso-pro",
      technology: "PRESSOTHERAPIE" as const,
      shortDescription: "Pressothérapie professionnelle pour drainage et bien-être",
      description: "Le Presso Pro est un système de pressothérapie de qualité médicale pour le drainage lymphatique, la réduction d'œdème et le bien-être général.",
      indications: JSON.stringify([
        "Drainage lymphatique",
        "Rétention d'eau",
        "Jambes lourdes",
        "Cellulite aqueuse",
        "Détente et bien-être"
      ]),
      benefits: JSON.stringify([
        "Drainage efficace",
        "Réduction de la rétention d'eau",
        "Sensation de légèreté",
        "Séances relaxantes",
        "Amélioration de la circulation"
      ]),
      expectedResults: "Réduction de la sensation de jambes lourdes dès la première séance, amélioration visible après 6-8 séances.",
      specifications: JSON.stringify({
        "Pression": "0-120 mmHg",
        "Zones": "Jambes, ventre, bras",
        "Programmes": "12 programmes prédéfinis",
        "Manchons": "6 manchons inclus",
        "Dimensions": "50 x 45 x 35 cm",
        "Poids": "20 kg"
      }),
      certifications: JSON.stringify(["CE", "ISO 13485"]),
      galleryUrls: JSON.stringify([]),
      basePrice: 12900.00,
      status: "ACTIVE" as const,
      featured: false,
      orderIndex: 8,
    },
  ];

  for (const device of devices) {
    const created = await prisma.device.upsert({
      where: { slug: device.slug },
      update: {},
      create: device,
    });
    console.log(`✅ Appareil créé: ${created.name}`);
  }

  console.log("🎉 Seed terminé avec succès !");
  console.log("\n📋 Comptes de test:");
  console.log("   Admin: admin@mysculpt-tech.fr / admin123");
  console.log("   Client: client@example.fr / client123");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });