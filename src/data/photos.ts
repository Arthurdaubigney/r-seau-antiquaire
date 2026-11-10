import manifest from '../../photos.manifest.json';

/** Textes alternatifs rédigés pour le site (les titres Commons ne servent pas d'alt). */
const ALT: Record<string, string> = {
  f15491337: "Cabinet doré d'un salon du XVIIIᵉ siècle : boiseries claires, bureau plat et sièges d'époque",
  f180083200: 'Lustre à bougies en bronze doré dans un salon aux rideaux rouges',
  f15094844: 'Salon-bibliothèque de style Louis XV, fauteuils clairs et boiseries sur tapis ancien',
  f6351984: "Chambre d'apparat de style Louis XV avec lit à baldaquin et mobilier ancien",
  f30090125: 'Paire de fauteuils de style Louis XV garnis de soie rayée rose',
  f62410441: "Commode ancienne à marqueterie devant des fauteuils bleus, bronze doré sur le plateau",
  f109623853: 'Commode galbée en marqueterie de bois clairs devant un mur bleu profond',
  f133826381: 'Commode en marqueterie ornée de bronzes dorés et de poignées ciselées',
  f132036671: 'Commode ancienne à plateau de bois clair devant un mur à rayures',
  f94978524: 'Secrétaire à abattant en bois blond, ouvert sur ses tiroirs et casiers',
  f19144373: "Détail d'un fauteuil de style Louis XV : accotoir sculpté et velours ocre",
  f85686604: 'Fauteuil ancien en bois sculpté et cannage sur fond neutre',
  f109622231: "Cabinet laqué à décor d'inspiration chinoise, surmonté d'un vase bleu et blanc",
  f112299758: 'Deux statues de marbre blanc, une Vénus drapée au premier plan, dans une salle de musée',
  f63980294: "Détail d'une statue antique en marbre : buste et visage féminins",
  f201627850: 'Statue de marbre blanc représentant une jeune femme assise, pensive',
  f60177225: 'Vase couvert en porcelaine bleu céleste, réserve peinte d’amours et filets dorés',
  f76021423: "Vase à deux anses en céladon, de forme élancée",
  f58782060: 'Couvercle de porcelaine bleu et blanc surmonté d’un chien de Fô',
  f84517055: "Pendule ancienne à cadran émaillé dans un cadre de bois ajouré",
  f3229930: 'Pendule en bronze doré ornée de figures, présentée sous vitrine',
  f34121248: 'Pendule de cheminée en bois clair à décor néo-gothique',
  f30935634: "Service à thé en porcelaine sur un plateau d'argent",
  f67001337: 'Reliures anciennes en cuir alignées sur une étagère',
  f51846334: 'Rangées de livres anciens reliés de cuir et dorés sur tranche',
  f154936376: 'Bague ancienne en or ornée d’un lapis-lazuli et de ciselures noires',
  f154523680: 'Bracelet ancien en or articulé, serti de médaillons émaillés',
  f14842723: "Porte à boiseries dorées et colonnes de marbre dans un salon de château",
  f8912320: 'Double porte à décor doré encadrée de marbres dans un salon de château',
  f126775509: 'Chaise de style Louis XV garnie de tissu brodé, dossier cabriolet',
  f30701106: 'Commode anglaise du XVIIIᵉ siècle à riche marqueterie',
  px9199095: "Portrait d'un expert en costume noir, regard concentré, dans un intérieur feutré",
  px4975615: "Mains d'un expert en gilet tenant une montre de gousset à chaîne",
  px3771839: "Expert en costume sombre assis sur un canapé clair, regard franc",
  px11488549: "Visiteur en manteau noir devant une sculpture de marbre blanc dans un musée",
  px7518963: "Expert en costume remettant et signant un document avec un client à une table",
  px6334279: "Expert en veste lisant un ouvrage dans une bibliothèque",
  f38776155: 'Manteau de fourrure ancien à motif tigré, noué d’une ceinture de daim sur un mannequin de boutique',
  f110437015: 'Pendule de cheminée en bois sculpté à cadran doré, sur fond noir',
};

export type Photo = { key: string; alt: string; w: number; h: number; src: string; srcset: string };

export function photo(key: string): Photo {
  const m = manifest.find((p) => p.key === key);
  if (!m) throw new Error(`Photo inconnue : ${key}`);
  const w = 1280;
  return {
    key,
    alt: ALT[key] ?? m.alt,
    w,
    h: Math.round((w * m.h) / m.w),
    src: `/img/${key}-1280.webp`,
    srcset: `/img/${key}-640.webp 640w, /img/${key}-1280.webp 1280w`,
  };
}
