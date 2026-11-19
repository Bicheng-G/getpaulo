# getpaulo.app — redesign plan (2026-11-19)

**Status:** LIVE plan for the `redesign/playful-site-2026-11-19` branch.
**Source of truth for product facts:** the *Paulo 品牌与产品基石文档* (2026-11-17) and
`Paulo/docs/release/app-store/` (1.0 (45), in App Review). When copy here and those disagree, they win.

## 0. What is wrong with the current site

It reads like a medium-fidelity prototype: one column of cards, no product on screen, no motion,
and some facts are now false ("no network requests of any kind" — Paulo now mirrors through the
family's own private iCloud; Paulo Family exists and is not mentioned).

## 1. Direction: a paper-and-clay storybook you can poke

The app's own design language is *toyful utility*: **press = clay, tear/stick/print = paper,
yours = photo**. The site uses the same three materials, so it looks like the app and teaches it
before anyone installs it.

- **Ground:** warm paper `#F3F1EC` with the 28px dot grid; one dark band (`winsDeep`) for trust.
- **Type:** Fraunces (soft, self-hosted from the app's own OFL file) for headlines; SF Rounded
  (`ui-rounded`) for everything else.
- **Pictures:** only real Paulo material — the six clay onboarding scenes, the clay temptation
  objects, the real taxi sticker and choice buttons, App Store screens and screen recordings.
  No stock photos, no real child's face.
- **Motion:** springy and physical (CSS `linear()` springs + WAAPI, no animation library). Every
  animation explains a cause — a press, a tear, a star landing — or is one of the page's dealt
  moments. Reduce Motion: everything rests in its final state and nothing is hidden.
- **Interactivity:** the visitor *does* the product's three rituals in the page — chooses in a
  Choice Moment, tears a My Week ticket, flips a story card to see the real screen.

### Rules carried over from the product (non-negotiable)
1. **Choice symmetry.** Any depiction of the Choice Moment shows both options at equal size,
   weight, colour strength and motion before a choice. After a choice the two outcomes are equally
   warm. (`principles.md#choice-symmetry`, PDR-0103 keeps only this rule.)
2. **Marketing honesty.** No "proven", "clinically", "teaches saving", "willpower", "temptation",
   "rules/limits". Research supports mechanisms, not Paulo itself; say so.
3. **No third-party requests.** CSP `default-src 'self'` stays. Fonts, video and scripts are
   self-hosted; scripts ship as bundled files (no inline `<script>`).
4. No analytics, cookies or trackers.

## 2. Information architecture

```
/                 Home            — recognise the moment, try it, trust it, get it
/how-it-works     How it works    — the full loop and the five places, for the parent deciding
/story            Our story       — the toy car, why Paulo works this way, what is not proven yet
/pricing          Pricing         — free for children forever; what Paulo Family adds
/support          Support         — contact + grouped FAQ (App Store requirement)
/privacy          Privacy Policy  — legal text unchanged, plain-words summary on top (App Store requirement)
/404              Not found       — a lost wish, links home
```

Primary action everywhere: **Get Paulo** (App Store link once `APP_STORE_ID` is set; until then
"Coming soon to the App Store"). Secondary: **Watch the 30-second film**.

Nav: Paulo · How it works · Our story · Pricing · Support · [Get Paulo]. Footer: same + Privacy,
email, the no-tracking line, languages the app speaks.

## 3. Pages

### 3.1 Home `/`
Purpose: in about a minute a parent recognises the moment, understands the ritual by doing it,
trusts it, and knows how to get it.

| # | Section | One idea | Picture / interaction |
|---|---|---|---|
| 1 | Hero | *A wish worth waiting for.* Grown-ups set the deal; kids make the choice. iPhone, ages 4–8. | Phone with the real Home screen; the taxi sticker drops in with a spring; clay objects float around and can be poked (squish + spring back). CTA + film button. |
| 2 | The moment | "I want it!" — every parent knows the negotiation that follows. | Clay arcade machine; pleading speech bubbles pop in once; clicking *I want it!* adds more (capped), then *Hand over the phone →*. |
| 3 | Try a Choice Moment | Both choices are okay. | **Live demo**: hand over → a breath (lavender buddy) → taxi wish, stone path, two identical clay buttons. Save: a star flies to the next stone. Play now: an equally warm "I chose this today." *Changed my mind* and *Again*. Three side notes: same size; a breath first; the path is a fact. |
| 4 | How it works | Four steps, one family story. | Four clay storybook cards (moment → hand-over → either answer → follow-through); tap/hover flips each to the real app screen. |
| 5 | My Week | Their week, their call. | **Tear a ticket**: drag or tap a ticket off a *TV · one episode* book; empty book says *All done · more on Monday*; *It's Monday* refills. |
| 6 | Get it together | Ready is not the same as done; the promise is kept in real life. | Real *My Car is ready!* screen + follow-through clay scene + sleeps-until-Saturday moons. |
| 7 | Trust (dark band) | Everything for children is free, forever. No ads, tracking, account or Paulo server. | Four plain facts; links to Privacy and Pricing. |
| 8 | Not a reward chart | What Paulo refuses to be. | Pills that cross themselves out on hover/tap. |
| 9 | Close | Named after a four-year-old who saved for a toy car. | Story teaser → /story, CTA, film. |

### 3.2 How it works `/how-it-works`
Purpose: the detail a careful parent wants before installing.
1. The loop in six steps (snap a wish → agree what a star means → choose in the moment → see what
   happened → enough stars, then the family follows through → look back).
2. The Choice Moment in depth: three beats (hand over, breathe, choose) + three details that protect
   the child's choice (a deliberate touch only; change your mind once; we get it on Saturday).
   Looping screen recording.
3. The five places — Wish, Wish Jar, My Week, My Trail, Family — each with its real screen, what it
   is and why it is built that way.
4. Your part as the grown-up: set the deal, hand over, follow through. Parent gate.
5. Made for being out: long-press the icon or Siri straight into a Moment; done in ~20 seconds.
6. Several children (never compared), five languages.

### 3.3 Our story `/story`
Purpose: trust through honesty.
1. July 2026: a ride-on (2 yuan), a toy car (8), four waits. The app is named after that boy.
2. Two problems: grown-ups forget the count; children can't see their effort.
3. Mirror or coach? → *We guide attention, never the decision.* Mirror to the child, coach to the parent.
4. What research says — and does not (marshmallow replication; reliable adults; choices within
   limits; process over praise) — and the red line: Paulo itself has not been tested with families yet.
5. What Paulo is not (reward chart, chores-for-points, scores, leaderboards, streaks, screen game,
   kid fintech, control tool, AI judge) and what it is instead.
6. How we will know it works — and when we would stop.

### 3.4 Pricing `/pricing`
Purpose: no surprises.
- Free forever for children: wishes, stars, Choice Moments, My Week tickets and timers, My Trail,
  any number of children. No prices or offers ever appear to a child.
- Paulo Family (for grown-ups): sync with another caregiver · an alarm when a timed turn ends ·
  a reminder on the day you'll get the wish. Yearly (14-day free trial for new subscribers),
  monthly, or a one-time lifetime purchase; Family Sharing covers the household; cancel and
  everything you made stays. Prices are shown in the App Store in local currency (not repeated here,
  so they cannot go stale).
- Short FAQ.

### 3.5 Support `/support`
Contact card (a real person reads it) + FAQ grouped as: Getting started · Wishes and stars ·
Paulo Family and billing · Privacy and data · Devices and accessibility. Accordions. Reporting a
problem (no photos of children, please).

### 3.6 Privacy `/privacy`
Legal markdown unchanged (`src/content/legal/privacy-policy.md`). Above it: five-fact plain-words
summary. Readable prose column with a sticky contents list on wide screens.

### 3.7 404
"This wish wandered off." A clay object to poke, three links.

## 4. Motion system

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | entrances, presses releasing |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | on-screen moves |
| `--spring` | CSS `linear()` spring, ~bounce 0.25 | clay pops, sticker landing |
| `--spring-soft` | `linear()` spring, ~bounce 0.12 | panels, cards flipping |
| press | `scale(0.97)` 120ms | every button and clay object |

- Hero enters once on load (staggered 60ms). Dealt moments: bubbles (section 2), the Choice Moment
  demo, the ticket tear. No fade-in-on-scroll for ordinary sections, no parallax text, no scroll-jacking.
- Hover effects only under `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce`: final states, no movement; demos still work (state swaps instantly).

## 5. Assets

| Asset | From | Used on |
|---|---|---|
| Six clay scenes (`Intro*`) | `Paulo/PauloApp/.../Assets.xcassets` | Home 4, story, how-it-works |
| Clay objects (ride-on, claw, arcade, gacha, jar, clock) | same | Hero, moment, 404 |
| Taxi sticker, choice buttons, stone | `hyperframes-studio/.../Product Demo/assets/ui` | Choice demo |
| App screens | `Paulo/docs/release/app-store/screenshots/src/frames` | flips, places |
| 30-s film | `Product Demo/renders/en-GB-paulo-preview-v2-886x1920.mp4` (re-encoded) | film dialog |
| Loop clips | `Product Demo/assets/RPReplay_*` (taxi segments only — the other recordings show licensed characters) | how-it-works |
| Fraunces VF | `Paulo/PauloApp/Paulo/Resources/Fraunces-VF.ttf` (OFL) | headlines |

## 6. Out of scope (next)
Localised site (the app speaks five languages), an Open Graph image, a press kit, Terms page.
