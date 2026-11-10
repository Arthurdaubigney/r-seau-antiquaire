import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site 100 % statique : aucun JavaScript de framework n'est envoyé au navigateur.
export default defineConfig({
  site: 'https://reseau-antiquaires.fr',
  trailingSlash: 'always',
  output: 'static',
  build: { inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
