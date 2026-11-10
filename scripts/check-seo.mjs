#!/usr/bin/env node
// Contrôle SEO du site construit (dist/) : un h1, hiérarchie Hn, title/description, alt+title des images, JSON-LD valide.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dec = (t) => t.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const pages = walk('dist').filter((f) => f.endsWith('.html') && !f.endsWith('404.html'));
let bad = 0;
const fail = (p, m) => { bad++; console.log(`✗ ${p}: ${m}`); };
const titles = new Set(), descs = new Set();

for (const f of pages) {
  const html = readFileSync(f, 'utf8');
  const name = f.replace('dist', '') || '/';
  const title = dec((html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? '');
  const desc = dec((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? '');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  console.log(`${name.padEnd(34)} title ${String(title.length).padStart(2)} | desc ${String(desc.length).padStart(3)} | h1 ${h1}`);
  if (h1 !== 1) fail(name, `${h1} balises h1`);
  if (title.length < 45 || title.length > 62) fail(name, `title ${title.length} car.`);
  if (desc.length < 130 || desc.length > 160) fail(name, `description ${desc.length} car.`);
  if (titles.has(title)) fail(name, 'title en double'); titles.add(title);
  if (descs.has(desc)) fail(name, 'description en double'); descs.add(desc);
  // hiérarchie : jamais de saut de niveau
  let last = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) { const n = +m[1]; if (last && n > last + 1) fail(name, `saut h${last} → h${n}`); last = n; }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(m[0])) fail(name, 'img sans alt');
    if (!/\btitle="[^"]+"/.test(m[0])) fail(name, 'img sans title');
    if (!/\bwidth="/.test(m[0]) || !/\bheight="/.test(m[0])) fail(name, 'img sans dimensions');
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { try { JSON.parse(m[1]); } catch { fail(name, 'JSON-LD invalide'); } }
  if (!/<link rel="canonical"/.test(html)) fail(name, 'canonical manquant');
}
console.log(bad ? `\n${bad} problème(s)` : '\nSEO : tout est conforme');
process.exit(bad ? 1 : 0);
