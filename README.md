# Gym Multisport Seyssins

Site vitrine de l'association Gym Multisport de Seyssins (Isère, France).

- 🌐 **Site public** : https://gym-seyssin.fr
- 🛠️ **Espace de gestion (Studio)** : https://gym-seyssin.fr/studio

Site géré en autonomie par les membres du bureau via Sanity Studio embarqué pour les parties dynamiques (articles, planning, professeurs, documents, galeries).

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind v4** (config CSS-based via `@theme` dans `app/globals.css`)
- **shadcn/ui** (style new-york)
- **Sanity v3** (CMS embarqué sur `/studio`)
- **Resend** (envoi des emails du formulaire de contact)
- **MapLibre GL** (carte interactive)
- **Vercel** (hébergement) + Analytics + Speed Insights

Package manager : **pnpm**. Node : **>= 20** (voir `.nvmrc`).

## Setup local

```bash
pnpm install
cp .env.local.example .env.local   # compléter les valeurs
pnpm dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).
Le Studio est sur [http://localhost:3000/studio](http://localhost:3000/studio).

## Scripts

| Commande            | Description                        |
| ------------------- | ---------------------------------- |
| `pnpm dev`          | Dev server (Turbopack)             |
| `pnpm build`        | Build de production                |
| `pnpm start`        | Start du build                     |
| `pnpm lint`         | ESLint (next/core-web-vitals + ts) |
| `pnpm typecheck`    | `tsc --noEmit`                     |
| `pnpm format`       | Prettier write                     |
| `pnpm format:check` | Prettier check                     |
| `pnpm typegen`      | Régénère les types Sanity          |

## Variables d'environnement

Voir `.env.local.example` pour la liste à jour. Résumé :

| Nom | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (sans slash final) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Project ID Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset Sanity (`production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Version API Sanity (date ISO) |
| `SANITY_API_READ_TOKEN` | Token Sanity en lecture |
| `SANITY_REVALIDATE_SECRET` | Secret partagé avec le webhook Sanity |
| `RESEND_API_KEY` | Clé API Resend |
| `CONTACT_EMAIL_FROM` | Adresse expéditrice (doit être sur un domaine vérifié dans Resend) |

## Déploiement

Le déploiement de production est sur Vercel, avec un domaine custom (`gym-seyssin.fr`).

📖 **Procédure complète** : voir [`docs/DEPLOIEMENT.md`](./docs/DEPLOIEMENT.md) — couvre le push GitHub, l'import Vercel, la config DNS (OVH + Gandi), Resend, Sanity (CORS / webhook / éditeurs).

### Routes API

| Route | Méthode | Rôle |
|---|---|---|
| `/api/contact` | POST | Envoi formulaire contact via Resend |
| `/api/articles` | GET | Pagination des actualités côté client |
| `/api/revalidate` | POST | Webhook Sanity → revalide les pages impactées |
| `/api/health` | GET | Health check (statut + ping Sanity) — pour UptimeRobot |

## Maintenance

### Qui contacter

| Sujet | Contact |
|---|---|
| Bug ou régression sur le site | Greg (technique) |
| Question sur le contenu (articles, planning…) | Bureau de l'association via le Studio |
| Problème d'envoi d'emails | Vérifier le dashboard Resend |
| Problème d'affichage des données | Vérifier dans le Studio que la donnée existe et est publiée |

### Mises à jour

Mise à jour mensuelle recommandée des dépendances :

```bash
pnpm outdated         # voir ce qui a une nouvelle version
pnpm update --latest  # à utiliser avec précaution sur les majors
pnpm typecheck        # vérifier qu'il n'y a pas de break
pnpm build            # vérifier que ça compile
```

Pour Next.js, suivre le [guide de migration](https://nextjs.org/docs/app/guides/upgrading) pour chaque version majeure.

### Monitoring

- **Vercel Analytics** : automatique (via `<Analytics />` dans le root layout)
- **Vercel Speed Insights** : automatique (via `<SpeedInsights />`)
- **UptimeRobot** : ping `/api/health` toutes les 5 min, alerte email si KO

## Documentation

- [`docs/GUIDE-UTILISATEURS.md`](./docs/GUIDE-UTILISATEURS.md) — guide pour les éditeurs (markdown source)
- [`docs/GUIDE-UTILISATEURS.html`](./docs/GUIDE-UTILISATEURS.html) — version imprimable (Cmd+P → Enregistrer en PDF)
- [`docs/DEPLOIEMENT.md`](./docs/DEPLOIEMENT.md) — procédure de déploiement

## Périmètre CMS

Géré dans le Studio (autonomie utilisateur) :
- Articles d'actualité
- Cours, disciplines, professeurs (planning hebdo)
- Documents PDF téléchargeables
- Galeries photos
- Réglages globaux : email/téléphone, bandeau d'inscription

**Tout le reste** (présentation, valeurs, structure des pages, mentions légales, design) est en dur dans le code et nécessite une PR.

## Structure

```
app/                    # App Router
  (site)/               # Pages publiques + layout site
  api/                  # Routes serveur (contact, revalidate, health…)
  studio/               # Sanity Studio embarqué
  layout.tsx            # Root layout (fonts, Analytics, Speed Insights)
components/
  ui/                   # shadcn/ui
  layout/               # Header, Footer, GlobalInscriptionsBanner
  sections/             # Sections de page (home, cours)
  shared/               # Composants génériques (Map, PageHero…)
  cours/                # Composants planning + dialogs
content/                # Contenu en dur des pages fixes
docs/                   # Documentation
lib/
  sanity/               # Client + queries + types
  constants.ts          # Constantes site (adresse, URL…)
public/images/          # Assets statiques
sanity/                 # Schémas et config Studio
types/                  # Types globaux
```

## Direction artistique

Palette : couleurs définies dans `app/globals.css` via `@theme`.
Typographie : **Bricolage Grotesque** (display) + **Manrope** (body).
Cibles d'interaction ≥ 44px, focus visible — pensé pour la lisibilité seniors et l'accessibilité WCAG AA.

## Roadmap V2

Pistes pour une future itération :

- 💳 **Inscription en ligne via HelloAsso** (paiement adhésion)
- 👤 **Espace adhérent** (suivi des cours, documents personnalisés)
- 📧 **Newsletter** (Resend Audiences ou Buttondown)
- 🌙 **Mode sombre**
- 🗓️ **Export iCal du planning** (intégration agenda perso)
- 🔍 **Recherche d'articles** (Algolia ou Pagefind)
- 📱 **PWA installable** sur mobile
