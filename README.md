# Réseau Antiquaires — site vitrine

Site institutionnel de **Réseau Antiquaires** (`reseau-antiquaires.fr`), groupement d'antiquaires et d'experts d'art.
Astro 5, 100 % statique : aucun JavaScript de framework, quelques dizaines de lignes de JS natif (menu, accordéon, révélation mot à mot).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # génère dist/
npm run check:seo  # contrôle Hn, title, description, alt/title, JSON-LD sur dist/
```

## Formulaire Tally

1. Créer le formulaire sur tally.so, copier son identifiant (`https://tally.so/r/<id>`).
2. Le renseigner dans `.env` : `PUBLIC_TALLY_FORM_ID=<id>` (voir `.env.example`), ou dans les variables d'environnement de l'hébergeur.
3. Le composant `src/components/TallyForm.astro` injecte l'iframe quand le bloc approche de l'écran. Sans identifiant, un cadre de réserve s'affiche.

Tous les boutons « Demander une expertise » mènent à `/contact/#formulaire`.

## Structure

| Chemin | Rôle |
|---|---|
| `src/config/site.ts` | Nom, URL, navigation, régions, domaines d'expertise |
| `src/config/schema.ts` | Schema.org `AntiqueStore` / `LocalBusiness`, `WebSite` |
| `src/layouts/Base.astro` | Head SEO (title, description, canonical, Open Graph, JSON-LD), menu, scripts |
| `src/components/` | `Photo`, `Cta`, `TextLink`, `TallyForm`, `Faq`, `Header`, `Footer` |
| `src/styles/global.css` | Jetons de design et de mouvement, composants |
| `src/pages/` | Accueil, Le Réseau, Expertises, Estimation, Contact, Mentions légales, 404 |
| `photos.manifest.json` + `scripts/fetch-photos.mjs` | Source et traitement des photographies (`npm run photos`) |

## Photographies

32 photographies de Wikimedia Commons (CC0, CC BY, CC BY-SA), converties en WebP 640/1280 px dans `public/img/`.
Ce sont des **photographies de substitution** : à remplacer par celles des maisons du réseau. Les crédits sont listés sur `/mentions-legales/#credits`
(`src/data/credits.json`, régénéré par `npm run photos`). Les textes `alt` sont rédigés dans `src/data/photos.ts`.

## À valider avant mise en ligne

- Mentions légales : éditeur, forme juridique, SIREN, hébergeur (commentaires `À compléter`).
- Contenus à confirmer par le groupement : gratuité de la première estimation, règle du second avis, régions et spécialités, offre d'achat ferme.
- Aucune adresse postale, téléphone ni e-mail n'est affiché : à ajouter dans `Footer.astro`, `schema.ts` et la page contact quand ils existent.
