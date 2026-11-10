/** Réglages uniques du site : tout ce qui change d'un déploiement à l'autre vit ici. */
export const SITE = {
  name: 'Réseau Antiquaires',
  url: 'https://reseau-antiquaires.fr',
  tagline: "Groupement d'experts et d'antiquaires",
  locale: 'fr_FR',
  /**
   * Identifiant du formulaire Tally (ex. "w8Xyz1" dans https://tally.so/r/w8Xyz1).
   * À renseigner dans la variable d'environnement PUBLIC_TALLY_FORM_ID (voir .env.example).
   */
  tallyFormId: import.meta.env.PUBLIC_TALLY_FORM_ID ?? '',
  contactPath: '/contact/#formulaire',
} as const;

export const NAV = [
  { href: '/le-reseau/', label: 'Le Réseau' },
  { href: '/expertises/', label: 'Expertises' },
  { href: '/estimation/', label: 'Estimation' },
] as const;

export const EXPERTISES = [
  { id: 'mobilier', name: 'Mobilier ancien', photo: 'f109622231', line: 'Commodes, secrétaires, sièges, ébénisterie du XVIIᵉ au XIXᵉ siècle.' },
  { id: 'sculpture', name: 'Sculpture et statuaire', photo: 'f112299758', line: 'Marbres, bronzes, terres cuites, de l’Antiquité aux ateliers du XIXᵉ.' },
  { id: 'ceramique', name: 'Céramique et porcelaine', photo: 'f60177225', line: 'Porcelaines, faïences, céladons, manufactures françaises et d’Asie.' },
  { id: 'horlogerie', name: 'Horlogerie et pendules', photo: 'f84517055', line: 'Pendules, cartels, comtoises, mouvements et boîtiers anciens.' },
  { id: 'argenterie', name: 'Argenterie et arts de la table', photo: 'f30935634', line: 'Orfèvrerie, services, métal argenté, verrerie et cristal.' },
  { id: 'livres', name: 'Livres et manuscrits', photo: 'f67001337', line: 'Reliures, éditions anciennes, bibliothèques constituées.' },
  { id: 'bijoux', name: 'Bijoux anciens', photo: 'f154936376', line: 'Joaillerie, émaux, camées, parures de famille.' },
] as const;
