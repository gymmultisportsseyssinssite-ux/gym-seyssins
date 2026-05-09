# Guide de déploiement — Gym Multisport Seyssins

Ce document liste **toutes les actions manuelles** à effectuer pour déployer le site en production. À suivre dans l'ordre.

---

## 0. Prérequis

- [ ] Compte GitHub (repo prêt)
- [ ] Compte Vercel (gratuit)
- [ ] Compte Sanity (déjà créé)
- [ ] Compte Resend (gratuit jusqu'à 3 000 mails/mois)
- [ ] Domaine `gym-seyssin.fr` acheté chez OVH ou Gandi
- [ ] Accès aux DNS du domaine

---

## 1. Push final sur GitHub

```bash
cd gym-seyssin
git status                              # vérifier ce qui va être commité
git add .
git commit -m "chore: production deployment + user docs"
git push origin main
```

---

## 2. Importer le repo dans Vercel

1. Aller sur https://vercel.com/new
2. Cliquer **"Import Git Repository"** → sélectionner le repo
3. Vercel détecte automatiquement Next.js
4. **Root Directory** : `gym-seyssin` (si le repo a un dossier racine différent du projet)
5. **Framework Preset** : Next.js
6. **Build Command** : laisser par défaut (`pnpm build`)
7. Ne pas encore cliquer "Deploy" — d'abord configurer les variables d'environnement

---

## 3. Variables d'environnement (Vercel)

Dans **Settings → Environment Variables**, ajouter chaque variable pour les environnements `Production`, `Preview` et `Development` :

| Nom | Valeur | Notes |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | *ton project ID* | Visible sur sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-10-01` | Date du jour ISO ou plus récente |
| `SANITY_API_READ_TOKEN` | *à générer* | Cf. section Sanity ci-dessous |
| `SANITY_REVALIDATE_SECRET` | *générer une chaîne aléatoire* | Ex. `openssl rand -hex 32` |
| `RESEND_API_KEY` | *clé Resend* | Cf. section Resend ci-dessous |
| `CONTACT_EMAIL_FROM` | `contact@gym-seyssin.fr` | Doit correspondre à un domaine vérifié dans Resend |
| `NEXT_PUBLIC_SITE_URL` | `https://gym-seyssin.fr` | Sans slash final |

> ⚠️ **Génération du `SANITY_REVALIDATE_SECRET`** : depuis le terminal :
> ```bash
> openssl rand -hex 32
> ```
> Conserve cette valeur — elle servira aussi côté Sanity.

---

## 4. Premier déploiement preview

- Cliquer **"Deploy"**
- Attendre 2-5 min que le build se termine
- Vercel fournit une URL preview du type `gym-seyssin-xxx.vercel.app`

---

## 5. Tester le déploiement preview

Sur l'URL preview, vérifier :

- [ ] La page d'accueil charge correctement
- [ ] Les cours et le planning s'affichent (données Sanity)
- [ ] Le menu Studio est accessible : `/studio`
- [ ] Le formulaire de contact envoie un mail (test avec ton email)
- [ ] Les images se chargent
- [ ] La carte (Map) s'affiche bien

Si tout est OK → étape suivante.

---

## 6. Promouvoir en production

- Sur Vercel : onglet **Deployments** → cliquer "..." sur le déploiement preview → **Promote to Production**

---

## 7. Configurer le domaine custom

### 7.1 Dans Vercel

1. Settings → **Domains**
2. Ajouter `gym-seyssin.fr` → cliquer "Add"
3. Ajouter aussi `www.gym-seyssin.fr` (avec redirection vers la version sans www, ou l'inverse selon ta préférence)
4. Vercel affiche les enregistrements DNS à configurer chez ton registrar

### 7.2 Configuration DNS chez OVH

1. Se connecter sur https://www.ovh.com/manager
2. **Web Cloud → Noms de domaine → gym-seyssin.fr → Zone DNS**
3. Modifier ou ajouter ces enregistrements :

| Type | Sous-domaine | Cible | TTL |
|---|---|---|---|
| `A` | (vide ou `@`) | `76.76.21.21` | 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com.` | 3600 |

4. **Supprimer** les enregistrements A/AAAA existants pointant vers OVH si présents
5. Sauvegarder

### 7.3 Configuration DNS chez Gandi

1. Se connecter sur https://admin.gandi.net
2. **Domain → gym-seyssin.fr → DNS Records**
3. Ajouter / modifier :

| Type | Nom | Valeur | TTL |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | 1800 |
| `CNAME` | `www` | `cname.vercel-dns.com.` | 1800 |

4. **Supprimer** les enregistrements A par défaut pointant vers Gandi
5. Sauvegarder

### 7.4 Vérifier la propagation

- Attendre 5-30 min (parfois jusqu'à 24h, mais en pratique c'est rapide)
- Tester avec : https://www.whatsmydns.net (chercher `gym-seyssin.fr`)
- Quand c'est propagé, Vercel passe le statut du domaine en vert ✅

---

## 8. Configuration Resend (envoi des emails de contact)

### 8.1 Vérifier le domaine

1. Aller sur https://resend.com/domains
2. **Add Domain** → entrer `gym-seyssin.fr`
3. Resend affiche **3 enregistrements DNS** à ajouter :
   - `TXT` pour SPF
   - `TXT` pour DKIM
   - `TXT` pour DMARC (optionnel mais recommandé)
4. Ajouter ces enregistrements chez ton registrar (même endroit que pour Vercel)
5. Revenir sur Resend, cliquer **"Verify"** (peut prendre 5-30 min)
6. Une fois en vert ✅ : tu peux envoyer depuis n'importe quelle adresse `@gym-seyssin.fr`

### 8.2 Créer la clé API

1. Aller sur **API Keys** → **Create API Key**
2. Nom : `Production`
3. Permissions : **Sending access** (pas full)
4. Domaine : `gym-seyssin.fr`
5. Copier la clé (commence par `re_…`) → la coller dans Vercel comme `RESEND_API_KEY`

---

## 9. Configuration Sanity post-déploiement

### 9.1 CORS

1. Aller sur https://sanity.io/manage → ton projet → **API → CORS Origins**
2. Ajouter (avec `Allow credentials` coché) :
   - `https://gym-seyssin.fr`
   - `https://www.gym-seyssin.fr`

### 9.2 Token API de production

Si pas déjà fait :
1. **API → Tokens → Add API token**
2. Nom : `Read token (Vercel production)`
3. Permissions : **Viewer** (lecture seule)
4. Copier la valeur → la coller dans Vercel comme `SANITY_API_READ_TOKEN`

### 9.3 Webhook de revalidation

1. **API → Webhooks → Create Webhook**
2. **Name** : `Revalidate production site`
3. **URL** : `https://gym-seyssin.fr/api/revalidate`
4. **Dataset** : `production`
5. **Trigger on** : ☑️ Create, ☑️ Update, ☑️ Delete
6. **Filter** : laisser vide (tous les types)
7. **HTTP method** : `POST`
8. **HTTP Headers** :
   - Nom : `x-sanity-revalidate-secret`
   - Valeur : la même chaîne que `SANITY_REVALIDATE_SECRET` configurée dans Vercel
9. Sauvegarder
10. **Tester** : modifier un article dans le Studio → vérifier sur le site qu'il apparaît en moins d'1 min

### 9.4 Inviter les éditeurs

1. **Members → Invite Member**
2. Entrer l'email Gmail de chaque utilisateur (parents)
3. Rôle : **Editor** ⚠️ (pas Administrator)
4. Ils recevront un lien d'invitation par email

---

## 10. Vérifications finales en production

Sur `https://gym-seyssin.fr` :

- [ ] La page d'accueil charge en moins de 3 secondes
- [ ] Lighthouse score > 90 (mobile et desktop)
- [ ] Le formulaire de contact envoie un email test
- [ ] Modifier un article dans le Studio → il apparaît sur le site en < 1 min (test du webhook)
- [ ] La carte affiche bien le Centre Sportif Yves Brouzet
- [ ] Tester depuis un mobile + un desktop
- [ ] `/api/health` retourne `{"ok": true}`
- [ ] Vérifier les Vercel Analytics dans le dashboard Vercel (un peu de trafic au bout d'une heure)

---

## 11. Tag git v1.0.0

Une fois la production stable :

```bash
git tag -a v1.0.0 -m "Première version stable en production"
git push origin v1.0.0
```

---

## 12. Monitoring externe (optionnel mais recommandé)

### UptimeRobot (gratuit)

1. Compte sur https://uptimerobot.com
2. **Add New Monitor**
   - Type : `HTTPS`
   - URL : `https://gym-seyssin.fr/api/health`
   - Interval : `5 minutes`
   - Alert : ton email
3. Tu seras prévenu si le site tombe

---

## 13. Transmission aux utilisateurs finaux

Checklist à faire avant de "remettre les clés" à tes parents :

- [ ] Imprimer le PDF du guide utilisateur (`docs/GUIDE-UTILISATEURS.pdf`)
- [ ] Envoyer un email récapitulatif avec :
  - URL du site : `https://gym-seyssin.fr`
  - URL admin : `https://gym-seyssin.fr/studio`
  - Liens des vidéos screencast (à enregistrer ensuite)
  - Ton contact technique
- [ ] Confirmer que leurs comptes Gmail sont bien invités dans Sanity
- [ ] Planifier une session de prise en main (1h en visio ou présentiel)

---

## 14. Vidéos screencast à enregistrer

Format : MP4 720p, voix off rassurante, durée 3-5 min chacune.
Hébergement : YouTube non répertorié, liens à insérer dans le guide PDF.

1. **"Première connexion à votre espace"** — du clic sur l'URL à l'arrivée dans le Studio
2. **"Écrire et publier une actualité"** — création complète d'un article avec image
3. **"Mettre à jour le planning"** — modifier un cours et créer un nouveau cours
4. **"Ajouter une galerie photo"** — upload multiple, choix de couverture
