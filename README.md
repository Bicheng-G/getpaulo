# getpaulo.app

The website for **Paulo** — an iPhone app for families with children aged 4–8, a practice layer
for parent–child co-regulation around delayed gratification.

The site's first job is compliance: `/privacy` and `/support` must resolve before the App Store
submission, because Apple checks them during review.

> **`docs/` is version-controlled project documentation.** A fresh clone includes the design
> notes, prototypes, reference assets and release drafts that previously lived only on the old
> computer. Start with [docs/README.md](docs/README.md) for scope and historical caveats. The
> website's published legal content remains in `src/content/legal/`; documentation and prototypes
> are not website routes and are not copied into `dist/`.

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) — static output, **zero JavaScript shipped** |
| Styling | Tailwind v4, tokens ported from `docs/design/system.md` |
| Content | Astro content collections (`src/content/`) |
| Hosting | Netlify, auto-deploying from `main` |
| Analytics | None. No cookies, no trackers, no third-party requests. |

## Develop

```bash
git clone https://github.com/Bicheng-G/getpaulo.git
cd getpaulo
npm ci
npm run dev
```

Use Node 22 to match Netlify. The portable `.claude/launch.json` preview configuration is also
tracked; dependency and build directories are regenerated. No local environment file is needed
for the current static website. The native iPhone app is a separate project, not included here.

Then open http://localhost:4321.

| Command | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run check` | Astro + TypeScript diagnostics |

## How this repo is wired

**The privacy policy is site-owned content.**
[`src/content/legal/privacy-policy.md`](src/content/legal/privacy-policy.md) is the published source
of truth, rendered at `/privacy`. It moved out of `docs/release/` when documentation was local-only;
that separation remains so historical drafts cannot change published copy. When it changes, bump
`lastUpdated` in its frontmatter — the page
shows that date — and update the App Store Connect disclosures in the same pass.

**Design tokens are a port, not an invention.** `src/styles/global.css` mirrors
`docs/design/system.md#colour-tokens`, which in turn mirrors `PauloTheme.swift`. If a token changes
in the design system, change it here too — the site and the app should never disagree about what
Paulo looks like.

**The choice pair has a contract.** `src/components/ChoicePair.astro` must keep both options at
equivalent visual weight, with no amber before a choice is made. The rules and the reasoning are in
`docs/design/principles.md#choice-symmetry` and `docs/design/system.md#amber-usage`, and they are
repeated in the component's own comment. This is a product invariant, not a style preference.

**No third-party requests, enforced.** `netlify.toml` sets a `default-src 'self'` CSP. A CDN font,
an embedded video, or an analytics snippet will fail visibly in a deploy preview rather than
quietly landing in production and contradicting the app's central claim.

## Measuring anything

Deliberately no web analytics. The number that matters is installs, and App Store Connect reports
that server-side. `src/config.ts` builds the App Store link with Apple's `ct=website` campaign
parameter, which attributes web → install inside App Store Connect without a single tracker here.

## Deploying

Netlify builds `main` on push (`npm run build` → `dist`, pinned to Node 22 in `netlify.toml`).
Pull requests get deploy previews automatically.

## Before submitting to the App Store

- [ ] **Connect this repo to a Netlify site and publish a deploy.** DNS already points at Netlify
      (apex A records to Netlify's load balancer, `www` CNAME to `getpaulo.netlify.app`, via
      Cloudflare nameservers, DNS-only).
- [ ] **Add `getpaulo.app` as a custom domain on the Netlify site so a certificate is issued.**
      Until that happens the apex serves Netlify's default `*.netlify.app` certificate, which is
      invalid for this hostname — browsers refuse the connection outright.
- [ ] Verify `https://getpaulo.app/privacy` and `https://getpaulo.app/support` load publicly in a
      browser, not just that DNS resolves. Apple checks these during review.
- [ ] Set `APP_STORE_ID` in `src/config.ts` once the app record exists. That switches the hero CTA
      from "Coming to the App Store" to a real link and enables the iOS Smart App Banner.
- [ ] Re-read `/privacy` against the shipping build. If sync, analytics, accounts, or crash
      reporting were added, the policy and the App Store disclosures change first.

## Known gaps

- **Rounded fallback font.** `ui-rounded` resolves to SF Pro Rounded on Apple platforms; other
  platforms currently fall back to `system-ui`. Self-host a rounded face (Nunito or Baloo 2) to fix
  it — self-host, not a webfont CDN, which would be a third-party request.
- **No app screenshots yet.** The landing page describes the Moment; it should show it.
- **No dark mode.** Matching the app, which has no dark-mode specification yet
  (`docs/design/system.md`).
- **Open Graph image.** `og:image` is unset, so shared links have no preview card.
