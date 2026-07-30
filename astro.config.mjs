// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { remarkStripFirstH1 } from './src/lib/remark-strip-first-h1.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://getpaulo.app',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    // Netlify serves /privacy from privacy.html without a redirect.
    format: 'file',
  },
  markdown: {
    // The source docs carry their own H1 ("Paulo Privacy Policy Draft"); the page
    // supplies its own title, so drop the first heading rather than editing docs/.
    remarkPlugins: [remarkStripFirstH1],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
