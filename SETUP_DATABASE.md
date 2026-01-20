# Guide de Configuration PostgreSQL

Ce guide vous explique comment installer et configurer PostgreSQL pour le projet My Sculpt Technology.

## 📋 Prérequis

- Windows 10/11 (ou votre système d'exploitation)
- Droits administrateur pour l'installation

## 🔧 Étape 1 : Installation de PostgreSQL

### Option A : Installation via le site officiel (Recommandé)

1. **Télécharger PostgreSQL**
   - Visitez : https://www.postgresql.org/download/windows/
   - Téléchargez le "Windows x86-64" installer
   - Ou utilisez directement : https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

2. **Installer PostgreSQL**
   - Lancez l'installateur téléchargé
   - Suivez les étapes de l'assistant d'installation
   - **Important** : Notez le mot de passe que vous définissez pour l'utilisateur `postgres`
   - Port par défaut : `5432` (gardez-le si possible)
   - Laissez les options par défaut pour les composants

3. **Vérifier l'installation**
   - Ouvrez le "SQL Shell (psql)" depuis le menu Démarrer
   - Appuyez sur Entrée pour les valeurs par défaut
   - Entrez le mot de passe que vous avez défini
   - Vous devriez voir : `postgres=#`

### Option B : Installation via Chocolatey (si installé)

```powershell
choco install postgresql --params '/Password:VotreMotDePasse123'
```

### Option C : Installation via Docker (Recommandé pour développement)

Si vous avez Docker installé :

```bash
docker run --name postgres-mysculpt \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=my_sculpt_tech \
  -p 5432:5432 \
  -d postgres:15
```

## 🗄️ Étape 2 : Créer la Base de Données

### Méthode 1 : Via psql (Ligne de commande)

1. Ouvrez "SQL Shell (psql)" depuis le menu Démarrer

2. Connectez-vous avec :
   ```
   Server [localhost]: (appuyez sur Entrée)
   Database [postgres]: (appuyez sur Entrée)
   Port [5432]: (appuyez sur Entrée)
   Username [postgres]: (appuyez sur Entrée)
   Password: (entrez votre mot de passe)
   ```

3. Créez la base de données :
   ```sql
   CREATE DATABASE my_sculpt_tech;
   ```

4. Vérifiez que la base existe :
   ```sql
   \l
   ```

5. Quittez psql :
   ```sql
   \q
   ```

### Méthode 2 : Via pgAdmin (Interface graphique)

1. Ouvrez **pgAdmin 4** depuis le menu Démarrer
2. Connectez-vous au serveur (mot de passe défini à l'installation)
3. Cliquez droit sur "Databases" → "Create" → "Database"
4. Nom : `my_sculpt_tech`
5. Cliquez sur "Save"

## ⚙️ Étape 3 : Configurer le Fichier .env

1. **Ouvrez le fichier `.env` à la racine du projet**

2. **Modifiez la ligne `DATABASE_URL`** avec vos informations :

   ```env
   DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:5432/my_sculpt_tech?schema=public"
   ```

   **Remplacez :**
   - `USERNAME` : généralement `postgres` (ou votre utilisateur)
   - `PASSWORD` : le mot de passe que vous avez défini à l'installation
   - `5432` : le port PostgreSQL (généralement 5432)
   - `my_sculpt_tech` : le nom de la base de données créée

   **Exemple :**
   ```env
   DATABASE_URL="postgresql://postgres:monMotDePasse123@localhost:5432/my_sculpt_tech?schema=public"
   ```

## 🚀 Étape 4 : Initialiser la Base de Données avec Prisma

1. **Générer le client Prisma** (déjà fait normalement) :
   ```bash
   npm run db:generate
   ```

2. **Pousser le schéma vers la base de données** :
   ```bash
   npm run db:push
   ```
   
   Cette commande va :
   - Créer toutes les tables dans PostgreSQL
   - Configurer les relations entre les tables
   - Appliquer les contraintes et index

3. **Vérifier que les tables sont créées** :
   - Via pgAdmin : Explorez la base `my_sculpt_tech` → Schemas → public → Tables
   - Via psql :
     ```sql
     \c my_sculpt_tech
     \dt
     ```

4. **Remplir la base avec des données de test** :
   ```bash
   npm run db:seed
   ```
   
   Cette commande va créer :
   - 1 utilisateur admin : `admin@mysculpt-tech.fr` / `admin123`
   - 1 utilisateur client : `client@example.fr` / `client123`
   - 8 appareils esthétiques avec toutes leurs données

## ✅ Étape 5 : Vérifier la Connexion

### Test via Node.js

Créez un fichier de test temporaire `test-db.js` :

```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.$connect();
    console.log('✅ Connexion à PostgreSQL réussie !');
    
    const userCount = await prisma.user.count();
    console.log(`📊 Nombre d'utilisateurs : ${userCount}`);
    
    const deviceCount = await prisma.device.count();
    console.log(`📊 Nombre d'appareils : ${deviceCount}`);
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
```

Exécutez :
```bash
node test-db.js
```

### Test via le Serveur Next.js

1. **Lancez le serveur de développement** :
   ```bash
   npm run dev
   ```

2. **Visitez** : http://localhost:3000/appareils
   - Si la page s'affiche avec les appareils, c'est bon ! ✅
   - Si vous voyez une erreur de connexion, vérifiez votre `.env`

## 🔍 Dépannage

### Erreur : "Connection refused" ou "Cannot connect"

**Solutions :**
1. Vérifiez que PostgreSQL est bien démarré :
   - Windows : Ouvrez "Services" (Win+R → `services.msc`)
   - Cherchez "postgresql-x64-XX"
   - Si arrêté, cliquez droit → "Démarrer"

2. Vérifiez le port dans `.env` (par défaut 5432)

3. Vérifiez le mot de passe dans `.env`

### Erreur : "Database does not exist"

**Solution :** Créez la base de données (Étape 2)

### Erreur : "Password authentication failed"

**Solutions :**
1. Vérifiez le mot de passe dans `.env`
2. Réinitialisez le mot de passe PostgreSQL :
   ```sql
   -- Dans psql en tant qu'admin
   ALTER USER postgres WITH PASSWORD 'nouveauMotDePasse';
   ```

### Erreur : "Prisma schema not found"

**Solution :** Exécutez `npm run db:generate`

## 📚 Commandes Utiles

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la DB (développement)
npm run db:push

# Créer une migration (production)
npm run db:migrate

# Remplir avec des données de test
npm run db:seed

# Ouvrir Prisma Studio (interface graphique pour la DB)
npm run db:studio
```

## 🎯 Configuration pour la Production

Pour la production, utilisez une base de données hébergée (ex: Supabase, Railway, AWS RDS) :

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public&sslmode=require"
```

## 📝 Comptes de Test Créés par le Seed

Après avoir exécuté `npm run db:seed`, vous pouvez vous connecter avec :

**Admin :**
- Email : `admin@mysculpt-tech.fr`
- Mot de passe : `admin123`
- Accès : `/admin` (back-office complet)

**Client Pro :**
- Email : `client@example.fr`
- Mot de passe : `client123`
- Accès : `/dashboard` (espace client)

## 💡 Astuces

1. **Prisma Studio** : Visualisez et modifiez vos données facilement
   ```bash
   npm run db:studio
   ```
   Ouvre une interface web sur http://localhost:5555

2. **Backup** : Sauvegardez régulièrement votre base
   ```bash
   pg_dump -U postgres my_sculpt_tech > backup.sql
   ```

3. **Restore** : Restaurez un backup
   ```bash
   psql -U postgres my_sculpt_tech < backup.sql
   ```

---

✅ Une fois ces étapes terminées, votre projet est prêt à fonctionner !