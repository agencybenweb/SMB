# My Sculpt Technology - Plateforme B2B

Plateforme web B2B premium destinée aux professionnels de l'esthétique, permettant la présentation et la vente d'appareils esthétiques avec espace client professionnel, SAV intégré, gestion des formations et documents techniques.

## 🏗️ Architecture

### Stack Technique

- **Frontend**: Next.js 14 (App Router) + React + TypeScript
- **UI**: Tailwind CSS (design sobre et premium)
- **Backend**: API intégrée Next.js
- **Authentification**: NextAuth.js avec credentials provider
- **Base de données**: PostgreSQL + Prisma ORM
- **Sécurité**: Middleware de protection des routes, validation des rôles

### Structure du Projet

```
/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Pages publiques (groupe de routes)
│   │   ├── auth/                 # Authentification
│   │   ├── appareils/            # Catalogue d'appareils
│   │   ├── a-propos/             # Page À propos
│   │   └── contact/              # Formulaire de contact
│   ├── (dashboard)/              # Espace client pro (protégé)
│   │   └── dashboard/            # Tableau de bord client
│   ├── api/                      # API Routes
│   │   └── auth/                 # Routes d'authentification
│   ├── layout.tsx                # Layout racine
│   └── page.tsx                  # Page d'accueil
├── components/                   # Composants React
│   ├── layout/                   # Header, Footer
│   └── ui/                       # Composants UI réutilisables
├── lib/                          # Utilitaires et configurations
│   ├── auth.ts                   # Configuration NextAuth
│   ├── prisma.ts                 # Client Prisma
│   └── utils.ts                  # Fonctions utilitaires
├── prisma/                       # Schéma et migrations Prisma
│   └── schema.prisma             # Schéma de base de données
├── types/                        # Types TypeScript partagés
└── middleware.ts                 # Middleware de protection des routes
```

## 📊 Schéma de Base de Données

Le schéma Prisma comprend les modèles suivants :

### Utilisateurs & Authentification
- **User**: Comptes utilisateurs (ADMIN / CLIENT_PRO)
- Statuts de compte : ACTIVE, INACTIVE, SUSPENDED, PENDING_VERIFICATION

### Catalogue
- **Device**: Appareils esthétiques (13-14 types)
- Technologies : EMS, Cryolipolyse, Radiofréquence, Cavitation, etc.

### Commandes & Facturation
- **Order**: Commandes clients
- **OrderItem**: Lignes de commande
- **Invoice**: Factures
- **Contract**: Contrats signés

### SAV & Support
- **SupportTicket**: Tickets de support
- **TicketMessage**: Messages dans les tickets

### Documents
- **UserDocument**: Documents clients (factures, devis, contrats)
- **DeviceDocument**: Documents techniques par appareil

### Appareils & Garanties
- **DeviceOwnership**: Appareils achetés par les clients
- Gestion des garanties et numéros de série

### Formations
- **UserTraining**: Formations assignées aux utilisateurs

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm/yarn
- PostgreSQL (local ou distant)
- Variables d'environnement configurées

### Étapes

1. **Cloner et installer les dépendances**

```bash
npm install
```

2. **Configurer les variables d'environnement**

Copier `.env.example` vers `.env` et configurer :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/my_sculpt_tech"
NEXTAUTH_SECRET="votre-secret-jwt"
NEXTAUTH_URL="http://localhost:3000"
```

3. **Initialiser la base de données**

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la DB (développement)
npm run db:push

# Ou créer une migration (production)
npm run db:migrate
```

4. **Lancer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🔐 Authentification

L'authentification utilise NextAuth.js avec un provider credentials.

- **Inscription** : `/auth/register`
  - Création de compte client pro
  - Statut initial : PENDING_VERIFICATION (validation admin requise)

- **Connexion** : `/auth/login`
  - Email + mot de passe
  - Session JWT avec rôles

- **Rôles** :
  - `ADMIN` : Accès back-office complet
  - `CLIENT_PRO` : Accès espace client professionnel

## 📁 Pages Publiques

- `/` - Accueil
- `/appareils` - Catalogue d'appareils
- `/appareils/[slug]` - Fiche détaillée appareil
- `/technologies` - Technologies disponibles
- `/formation` - Informations formations
- `/sav` - SAV & Assistance
- `/a-propos` - À propos
- `/contact` - Contact / Demande de devis
- `/financement` - Options de financement

## 👤 Espace Client Professionnel

Routes protégées par authentification (middleware) :

- `/dashboard` - Tableau de bord
- `/dashboard/profil` - Profil entreprise
- `/dashboard/commandes` - Historique commandes
- `/dashboard/appareils` - Appareils achetés
- `/dashboard/documents` - Documents (factures, contrats)
- `/dashboard/sav` - Gestion tickets SAV
- `/dashboard/formation` - Accès aux formations

## 🔧 Back-Office Administrateur

Routes réservées aux admins (vérification rôle) :

- `/admin` - Tableau de bord admin
- `/admin/appareils` - Gestion du catalogue
- `/admin/clients` - Gestion clients
- `/admin/commandes` - Gestion commandes
- `/admin/sav` - Gestion tickets SAV
- `/admin/documents` - Gestion documents

## 🛠️ Scripts Disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run db:push` - Pousser le schéma Prisma (dev)
- `npm run db:migrate` - Créer une migration (prod)
- `npm run db:studio` - Ouvrir Prisma Studio
- `npm run db:generate` - Régénérer le client Prisma

## 🔒 Sécurité

- Authentification NextAuth.js avec hash bcrypt
- Protection des routes via middleware
- Validation des rôles (ADMIN / CLIENT_PRO)
- Validation SIRET pour les entreprises
- Mots de passe minimum 8 caractères
- Sessions JWT sécurisées

## 📝 Évolutions Futures

- Marketplace de consommables
- Abonnements SAV
- CRM intégré
- Application mobile
- Intégration paiement en ligne
- Signature électronique de contrats
- Système de notifications push

## 📄 License

Propriétaire - My Sculpt Technology / Sculpt My Body Lyon

## 👥 Support

Pour toute question ou support technique, contactez l'équipe développement.