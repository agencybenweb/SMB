# Migration Technologies - Instructions

## Étapes pour activer la gestion des Technologies

### 1. Appliquer le schéma Prisma à la base de données

Ouvrez un terminal et exécutez :

```bash
npx prisma db push
```

Si la commande échoue à cause du fichier `.env`, utilisez Prisma Studio (déjà ouvert) :
1. Fermez Prisma Studio
2. Relancez-le avec `npx prisma studio`
3. La table `technology_contents` sera créée automatiquement

### 2. Générer le client Prisma

```bash
npx prisma generate
```

### 3. (Optionnel) Peupler avec des données initiales

Créez quelques technologies de test via l'interface admin :
- Allez sur `/admin/technologies`
- Cliquez sur "Nouvelle technologie"
- Remplissez les champs

Ou utilisez Prisma Studio pour insérer directement des données dans la table `technology_contents`.

### 4. Vérifier

- Page admin : `http://localhost:3000/admin/technologies`
- Page publique : `http://localhost:3000/technologies`

## Fonctionnalités

✅ Gestion complète des technologies depuis l'admin
✅ Création, modification, suppression
✅ Contrôle de visibilité (masquer/afficher)
✅ Icônes personnalisables (emojis)
✅ Bénéfices en liste
✅ Ordre d'affichage
✅ Affichage automatique des appareils associés

## Structure

- **Admin** : `/admin/technologies`
- **Public** : `/technologies` (lit depuis la base de données)
- **Modèle** : `TechnologyContent` dans Prisma
