// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://getpaulo.app',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    // Netlify serves /privacy from privacy.html without a redirect.
    format: 'file',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
