import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * The privacy policy is rendered directly from `docs/release/privacy-policy.md`,
 * the same file the App Store submission references. One source of truth: the
 * published page cannot drift from the reviewed document.
 *
 * The pattern is deliberately narrow — `docs/release/` also holds the internal
 * runbook and readiness checklist, which are not public.
 */
const legal = defineCollection({
  loader: glob({ pattern: 'privacy-policy.md', base: './docs/release' }),
});

export const collections = { legal };
