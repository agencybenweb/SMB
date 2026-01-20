# Architecture Détaillée - My Sculpt Technology

## Vue d'Ensemble

Cette plateforme B2B est construite selon une architecture modulaire et scalable, avec séparation claire entre :
- Pages publiques (vitrine)
- Espace client professionnel (authentifié)
- Back-office administrateur (rôle ADMIN)

## Structure des Routes Next.js App Router

### Groupes de Routes (Route Groups)

Les parenthèses `()` dans les noms de dossiers créent des groupes de routes sans impact sur l'URL :

- `(public)` - Pages publiques avec Header/Footer communs
- `(dashboard)` - Espace client avec layout authentifié

### Routes Publiques

```
app/
├── (public)/
│   ├── layout.tsx              # Layout avec Header + Footer
│   ├── page.tsx                # Redirige vers / (accueil)
│   ├── appareils/
│   │   ├── page.tsx            # Liste des appareils
│   │   └── [slug]/
│   │       └── page.tsx        # Fiche détaillée appareil
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx        # Connexion
│   │   └── register/
│   │       ├── page.tsx        # Inscription
│   │       └── success/
│   │           └── page.tsx    # Confirmation inscription
│   ├── a-propos/
│   │   └── page.tsx
│   ├── technologies/
│   │   └── page.tsx
│   ├── formation/
│   │   └── page.tsx
│   ├── sav/
│   │   └── page.tsx
│   └── contact/
│       └── page.tsx
```

### Routes Dashboard (Client Pro)

```
app/
├── (dashboard)/
│   ├── dashboard/
│   │   ├── layout.tsx          # Vérification auth + layout
│   │   ├── page.tsx            # Tableau de bord
│   │   ├── profil/
│   │   │   └── page.tsx        # Profil entreprise
│   │   ├── commandes/
│   │   │   ├── page.tsx        # Liste commandes
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Détail commande
│   │   ├── appareils/
│   │   │   └── page.tsx        # Appareils achetés
│   │   ├── documents/
│   │   │   └── page.tsx        # Documents téléchargeables
│   │   ├── sav/
│   │   │   ├── page.tsx        # Liste tickets
│   │   │   ├── nouveau/
│   │   │   │   └── page.tsx    # Créer ticket
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Détail ticket
│   │   └── formation/
│   │       └── page.tsx        # Formations accessibles
```

### Routes Admin

```
app/
├── (admin)/
│   ├── admin/
│   │   ├── layout.tsx          # Vérification rôle ADMIN
│   │   ├── page.tsx            # Dashboard admin
│   │   ├── appareils/
│   │   ├── clients/
│   │   ├── commandes/
│   │   ├── sav/
│   │   └── documents/
```

### API Routes

```
app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/
│   │   │   └── route.ts        # NextAuth handler
│   │   └── register/
│   │       └── route.ts        # POST /api/auth/register
│   ├── devices/
│   │   └── route.ts            # GET /api/devices
│   ├── orders/
│   ├── tickets/
│   └── documents/
```

## Modèle de Données Prisma

### Relations Principales

```
User (1) ──< (N) Order
User (1) ──< (N) SupportTicket
User (1) ──< (N) DeviceOwnership
User (1) ──< (N) UserDocument

Order (1) ──< (N) OrderItem
Order (1) ──< (N) Invoice
Order (1) ──< (N) Contract

Device (1) ──< (N) OrderItem
Device (1) ──< (N) DeviceOwnership
Device (1) ──< (N) DeviceDocument

SupportTicket (1) ──< (N) TicketMessage
DeviceOwnership (1) ──< (N) SupportTicket
```

### Workflow Commandes

1. Client crée une demande de devis → **Quote Request** (à implémenter)
2. Admin valide et crée une **Order** (status: DRAFT)
3. Client confirme → Order (status: PENDING)
4. Admin valide → Order (status: CONFIRMED)
5. Production/Livraison → Order (status: SHIPPED → DELIVERED)
6. Création automatique de **DeviceOwnership** pour chaque appareil
7. Génération **Invoice** et **Contract**

### Workflow SAV

1. Client crée un **SupportTicket** (status: OPEN)
2. Admin assigne le ticket → (status: IN_PROGRESS)
3. Échange de **TicketMessage**
4. Résolution → (status: RESOLVED → CLOSED)

## Système d'Authentification

### NextAuth.js Configuration

- **Strategy**: JWT (pas de session DB)
- **Provider**: Credentials (email + password)
- **Session**: 30 jours
- **Callbacks**: 
  - `jwt`: Stocke role et id dans le token
  - `session`: Expose role et id dans la session

### Middleware de Protection

Le fichier `middleware.ts` intercepte les requêtes vers :
- `/admin/*` → Vérifie rôle ADMIN
- `/dashboard/*` → Vérifie authentification

### États des Comptes

- `PENDING_VERIFICATION`: Nouveau compte, en attente validation admin
- `ACTIVE`: Compte validé, accès complet
- `INACTIVE`: Compte désactivé temporairement
- `SUSPENDED`: Compte suspendu

## Gestion des Documents

### Types de Documents

- **Factures**: Liées aux commandes
- **Devis**: Avant création de commande
- **Contrats**: Liés aux commandes avec signature
- **Documents techniques**: Notices, protocoles par appareil
- **Certificats**: CE, ISO, formations
- **Supports marketing**: PDFs, visuels

### Niveaux d'Accès

- `PUBLIC`: Accessible sans authentification
- `CLIENT_PRO`: Tous les clients authentifiés
- `DEVICE_OWNER`: Uniquement si appareil acheté
- `ADMIN_ONLY`: Réservé aux administrateurs

## Composants Réutilisables

### Layout Components

- `Header`: Navigation avec menu utilisateur
- `Footer`: Liens et informations légales

### UI Components (`components/ui/`)

- `Button`: Bouton avec variants (default, outline, ghost, etc.)
- `Card`: Carte de contenu (à créer)
- `Input`: Champs de formulaire (à créer)
- `Dialog`: Modales (Radix UI)
- `Toast`: Notifications (Radix UI)

## Fonctions Utilitaires (`lib/utils.ts`)

- `formatPrice`: Formatage monétaire EUR
- `formatDate`: Formatage dates français
- `slugify`: Création de slugs URL
- `generateOrderNumber`: Génération numéros uniques
- `isValidSIRET`: Validation SIRET avec algorithme Luhn
- `safeJsonParse`: Parse JSON sécurisé avec fallback

## Sécurité

### Bonnes Pratiques Implémentées

1. **Hash des mots de passe**: bcrypt avec salt rounds 12
2. **Validation des inputs**: Validation côté serveur
3. **Protection CSRF**: NextAuth.js gère automatiquement
4. **Rates limiting**: À implémenter sur les routes API sensibles
5. **HTTPS**: Obligatoire en production
6. **Variables d'environnement**: Secrets dans `.env` (non commitées)

### À Implémenter

- Rate limiting (API routes)
- Logging des actions critiques
- Audit trail pour modifications admin
- Chiffrement des données sensibles (SIRET, etc.)

## Performance

### Optimisations Prévues

- **Images**: Next.js Image avec optimisation
- **SSR/SSG**: Pages statiques pour catalogue
- **ISR**: Revalidation incrémentale pour données dynamiques
- **Database Indexing**: Index sur champs fréquemment recherchés (email, siret, etc.)
- **Caching**: Redis pour sessions et données fréquentes (futur)

## Déploiement

### Variables d'Environnement Requises

```env
# Database
DATABASE_URL

# NextAuth
NEXTAUTH_URL
NEXTAUTH_SECRET

# Storage (S3)
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_REGION
AWS_S3_BUCKET
```

### Commandes de Build

```bash
npm run build    # Build production
npm run start    # Serveur production
```

### Migrations Prisma (Production)

```bash
npx prisma migrate deploy  # Applique les migrations
npx prisma generate        # Génère le client
```

## Évolutivité

L'architecture est conçue pour supporter :

1. **Multi-tenant**: Extension possible avec organisation/clients
2. **Microservices**: API routes peuvent être extraites
3. **CDN**: Fichiers statiques et images
4. **Queue System**: Pour emails, notifications (Bull, RabbitMQ)
5. **Real-time**: WebSockets pour notifications SAV (Socket.io)
6. **Mobile App**: API REST existante réutilisable

## Tests (À Implémenter)

- Unit tests (Jest)
- Integration tests (API routes)
- E2E tests (Playwright)
- Tests Prisma (factory pattern)

## Documentation Code

- JSDoc pour fonctions complexes
- README par module
- Diagrammes de séquence (à créer)
- Documentation API Swagger/OpenAPI (futur)