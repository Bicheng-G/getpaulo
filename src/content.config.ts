import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Public-facing legal copy. These files are the published source of truth —
 * `docs/` is internal and is not part of the repository, so nothing the site
 * needs at build time may live there.
 *
 * When the policy changes, edit the markdown here and bump `lastUpdated`. The
 * App Store submission points at the rendered page, so this file and the
 * disclosures in App Store Connect have to move together.
 */
const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastUpdated: z.coerce.date(),
  }),
});

export const collections = { legal };
