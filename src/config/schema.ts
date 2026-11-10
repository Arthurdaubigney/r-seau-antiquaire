import { SITE, REGIONS } from './site';

/** Données structurées de l'organisation (reprises sur l'accueil). */
export const organizationGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: 'fr-FR',
      publisher: { '@id': `${SITE.url}/#organization` },
    },
    {
      '@type': ['AntiqueStore', 'LocalBusiness'],
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: `${SITE.name} — ${SITE.tagline}`,
      description:
        "Groupement d'antiquaires et d'experts d'art indépendants : estimation, expertise et achat d'objets d'art et de mobilier ancien.",
      url: SITE.url,
      logo: `${SITE.url}/favicon.svg`,
      image: `${SITE.url}/og.jpg`,
      address: { '@type': 'PostalAddress', addressCountry: 'FR' },
      areaServed: REGIONS.map((r) => ({ '@type': 'AdministrativeArea', name: r.name })),
      knowsAbout: ['Mobilier ancien', 'Sculpture', 'Céramique et porcelaine', 'Horlogerie ancienne', 'Argenterie', 'Livres anciens', 'Bijoux anciens'],
      makesOffer: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Estimation d'objets d'art et d'antiquités" } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Expertise d'objets d'art et de mobilier ancien" } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: "Achat d'antiquités et d'objets d'art" } },
      ],
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', url: `${SITE.url}/contact/`, availableLanguage: 'fr' },
    },
  ],
};
