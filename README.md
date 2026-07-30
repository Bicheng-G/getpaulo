# getpaulo.app

The website for **Paulo** — an iPhone app for families with children aged 4–8, a practice layer
for parent–child co-regulation around delayed gratification.

This repo holds both the product documentation (`docs/`) and the website that publishes parts of
it. The site's first job is compliance: `/privacy` and `/support` must resolve before the App Store
submission, because Apple checks them during review.

## Stack

| Layer | Choice |
|---|---|
| Framework | [Astro](https://astro.build) — static output, **zero JavaScript shipped** |
| Styling | Tailwind v4, tokens ported from `docs/design/system.md` |
| Content | Astro content collections, reading `docs/release/*.md` directly |
| Hosting | Netlify, auto-deploying from `main` |
| Analytics | None. No cookies, no trackers, no third-party requests. |

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

| Command | Does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Static build into `dist/` |
| `npm run preview` | Serve the built output locally |
| `npm run check` | Astro + TypeScript diagnostics |

## How this repo is wired

**The privacy policy is not duplicated.** `/privacy` renders
[`docs/release/privacy-policy.md`](docs/release/privacy-policy.md) — the same file the App Store
submission references. Edit the doc; the page follows. A remark plugin
(`src/lib/remark-strip-first-h1.mjs`) drops the source H1 so the internal "Draft" title never
reaches a page Apple reads.

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

- [ ] **Point `getpaulo.app` at Netlify and confirm HTTPS works.** Apex domains need an ALIAS/ANAME
      record, or move nameservers to Netlify DNS. Do this early — certificate provisioning is
      usually quick but not instant, and Apple checks that both URLs resolve.
- [ ] Verify `https://getpaulo.app/privacy` and `https://getpaulo.app/support` load publicly.
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
