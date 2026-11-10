#!/usr/bin/env node
// Télécharge les photographies listées dans photos.manifest.json (Wikimedia Commons),
// les redimensionne en WebP (640 / 1280 px) dans public/img et écrit src/data/credits.json.
// Usage : node scripts/fetch-photos.mjs [--sheet dossier]   (--sheet : planche-contact JPEG pour le tri)
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const manifest = JSON.parse(readFileSync('photos.manifest.json', 'utf8'));
const sheet = process.argv.includes('--sheet') ? process.argv[process.argv.indexOf('--sheet') + 1] : null;
const cache = '.cache/originals';
mkdirSync(cache, { recursive: true });
mkdirSync('public/img', { recursive: true });
if (sheet) mkdirSync(sheet, { recursive: true });

for (const p of manifest) {
  const orig = join(cache, p.key + '.jpg');
  if (!existsSync(orig)) {
    // vignette 1920 px de Commons (plus légère que l'original) ; pause entre les requêtes (limite de débit)
    const m = p.url.match(/commons\/(\w\/\w\w)\/(.+)$/);
    const url = m ? `https://upload.wikimedia.org/wikipedia/commons/thumb/${m[1]}/${m[2]}/1920px-${m[2]}` : p.url;
    for (let t = 0; t < 5; t++) {
      try { execFileSync('curl', ['-sSfL', '-m', '90', '-A', 'ReseauAntiquairesSite/1.0 (static site build; photo fetch script)', '-o', orig, url]); break; }
      catch (e) { if (t === 4) console.error('FAIL', p.key); else execFileSync('sleep', [String(4 * (t + 1))]); }
    }
    execFileSync('sleep', ['2']);
  }
  if (!existsSync(orig)) continue;
  if (sheet) {
    execFileSync('convert', [orig + '[0]', '-auto-orient', '-resize', '360x360', '-quality', '70', join(sheet, p.key + '.jpg')]);
    continue;
  }
  for (const w of [640, 1280]) {
    execFileSync('convert', [orig + '[0]', '-auto-orient', '-resize', `${w}x>`, '-strip', '-quality', '74', `public/img/${p.key}-${w}.webp`]);
  }
  console.log('ok', p.key);
}
if (!sheet) {
  const credits = manifest.map(({ key, by, licence, page }) => ({ key, by, licence, page }));
  mkdirSync('src/data', { recursive: true });
  writeFileSync('src/data/credits.json', JSON.stringify(credits, null, 2));
}
