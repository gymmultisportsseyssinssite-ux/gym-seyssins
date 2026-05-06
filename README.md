# Gym Multisport Seyssins

Site vitrine de l'association Gym Multisport de Seyssins (Isère, France).

Site moderne et chaleureux à destination de seniors 50–70 ans, géré en autonomie
par les membres du bureau via Sanity Studio embarqué pour les parties dynamiques
(articles, planning, professeurs, documents, galeries).

## Stack

- **Next.js 15** (App Router) + **TypeScript strict**
- **Tailwind v4** (config CSS-based via `@theme` dans `app/globals.css`)
- **shadcn/ui** (style new-york) — _ajouté progressivement_
- **Sanity v3** (CMS embarqué sur `/studio`) — _Prompt 1_
- **Resend** (formulaire contact) — _Prompt suivant_
- **Vercel** (hébergement)

Package manager : **pnpm**. Node : **>= 20** (voir `.nvmrc`).

## Démarrage

```bash
pnpm install
cp .env.local.example .env.local   # compléter les valeurs
pnpm dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

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

## Variables d'environnement

Voir `.env.local.example` pour la liste à jour. Résumé :

- `NEXT_PUBLIC_SITE_URL` — URL publique du site
- `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN`,
  `SANITY_REVALIDATE_SECRET` — _Sanity, Prompt 1_
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` — _formulaire contact_

## Administration

L'interface d'administration Sanity Studio sera disponible sur
[`/studio`](http://localhost:3000/studio) (à venir, Prompt 1).

## Périmètre CMS

Géré dans le CMS : articles, planning, professeurs, documents (PDF), galeries
photos, et quelques réglages globaux (coordonnées, horaires).
**Tout le reste** (présentation, valeurs, mentions légales, structure des pages)
est en dur dans le code.

## Structure

```
app/                  # App Router
  (site)/             # Pages publiques
  globals.css         # Design tokens (@theme)
  layout.tsx          # Root layout (fonts)
components/
  ui/                 # shadcn/ui
  layout/             # Header, Footer
  sections/           # Sections de page
  shared/             # Composants génériques
content/              # Contenu en dur des pages fixes
lib/                  # utils, constants
public/images/        # Assets statiques
types/                # Types globaux
```

## Direction artistique

Palette : **terracotta** (`#C66B4F`), **sauge** (`#8FA68E`), crème ivoire
(`#FAF7F2`), charbon doux (`#2A2622`).
Typographie : **Fraunces** (display) + **Inter** (sans).
Body 17px par défaut, cibles d'interaction ≥ 44px, focus visible terracotta —
pensé pour la lisibilité seniors et l'accessibilité WCAG AA.
