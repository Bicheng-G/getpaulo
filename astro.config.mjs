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
    // Never inline scripts or assets: the CSP is script-src 'self', so every
    // script must ship as its own file.
    build: { assetsInlineLimit: 0 },
  },
});
