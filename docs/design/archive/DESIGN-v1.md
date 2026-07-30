# DESIGN.md — Paulo Design System

**Paulo** is a choice ritual for 4–6-year-olds: snap a wish → it becomes a sticker → at real spending moments the child chooses **Play Now** or **Save for Wish** → each save adds a star and colors in a piece of the wish → when the family really completes the wish, it becomes a Little Win.

This document is the guardrail for all Paulo UI. It adapts the CapWords / LittleBites design language (see `REFERENCE-DESIGN.md` / `uploads/UI reference/`) to Paulo's product principles. When a screen decision isn't covered here, derive it from §1 — never improvise a new style.

---

## 1. Non-negotiable design principles

These come from the PRD and direction reset. They override aesthetics.

1. **Child is the user; parent is the assistant.** Child-facing screens must work for a pre-reader: image-first, giant targets, one idea per screen. Parent surfaces (setup, settings) may use text density.
2. **The two choices are absolutely equal.** Play Now and Save for Wish get identical size, weight, elevation, and chroma. Only imagery/icon differs. Never make "save" bigger, brighter, more saturated, or pre-selected. The app is a mirror, not a persuader.
3. **No judgment, ever.** No shame copy, no lost progress, no "are you sure?" scare dialogs, no streaks, no daily-reminder guilt. Choosing Play Now is a valid outcome with its own warm confirmation.
4. **Counts, not money.** Child screens show stars and "N more"; currency never appears outside parent settings.
5. **The sticker is the medium of the wish** — not a collectible game. One hero wish sticker at a time; galleries exist to remember, not to grind.
6. **Ten-second sessions.** The Moment flow must complete in seconds and hand the family back to real life. No detours, no interstitials, no upsell in the child path.
7. **Ceremony over gamification.** Feedback = one focused, high-quality moment (color fills the sticker, a star flies into place, soft haptic + gentle sound) — never confetti bombardment, points, or leaderboards.
8. **Restrained palette.** Morandi / storybook tones on warm paper. No candy saturation, no default-blue, no gradients as decoration.

---

## 2. Foundations

### 2.1 Color

All values are light-mode. Paulo v1 is light-mode only (kids use it in daylight, in shops).

**Canvas & ink (from the CapWords paper-journal language)**

| Token | Value | Use |
|---|---|---|
| `paper` | `#F3F1EC` | App background, warm gray-white |
| `paperDot` | `#1F2A37` at 6% | Dot-grid texture (28pt spacing, 2pt dots) |
| `card` | `#FFFFFF` | Cards, sheets, rows |
| `cardWarm` | `#FAF8F3` | Secondary surfaces, pills on paper |
| `ink` | `#20303C` | Headlines, primary text (deep blue-charcoal) |
| `inkSoft` | `#77828E` | Secondary text, captions |
| `inkFaint` | `#B9BFC7` | Placeholders, disabled, empty slots |
| `cta` | `#CB6842` | Primary pill button fill (playful warm coral — oklch ≈ 0.63 0.13 45) |
| `ctaLabel` | `#FFF4E6` | Label on `cta` (warm cream) |

**Paulo accents**

| Token | Value | Use |
|---|---|---|
| `star` | `#F0B84C` | The wish star: progress units, filled slots, celebration glow. Paulo's single brand accent. |
| `starDeep` | `#D99A2B` | Star stroke/shadow, pressed state |
| `glow` | radial `#F8ECC0 → transparent` | Halo behind fresh stickers and ceremony moments |
| `choiceNow` | `oklch(0.72 0.09 55)` ≈ `#CE8F70` | Play Now surface tint |
| `choiceWish` | `oklch(0.72 0.09 230)` ≈ `#6FA3C8` | Save for Wish surface tint |

`choiceNow` and `choiceWish` share identical lightness and chroma (oklch L=0.72, C=0.09) — hue is the only difference. If you adjust one, adjust both. Neither may match `star` (the reward color must not pre-color a choice).

**Morandi pastels** (wish-jar cards, Little Wins cards, avatars — muted, never candy)

`sage #B7BC93` · `dustyBlue #A3B8CC` · `blush #DCC0BC` · `lilac #C3BCD8` · `clay #D8B98F` · `mist #C9CFC4`

**Rules**
- Backgrounds are never pure white; cards are. Contrast = warm paper vs white card, not borders.
- `star` amber is reserved for progress/reward state. Never use it on choice buttons or navigation.
- Full-bleed camera/photo screens tint with warm brown `#8A7B69` at ~55%, never black scrims.

### 2.2 Typography

Two faces only. English-only v1.

| Role | Face | Spec | Use |
|---|---|---|---|
| `display` | New York (serif), semibold | 34–40pt | Screen titles ("Wish Jar", "Little Wins"), ceremony lines ("You did it!") |
| `title` | New York, semibold | 22–28pt | Card titles, dates |
| `stickerLabel` | SF Pro Rounded, heavy | 28–34pt, white multi-outline + soft shadow | Wish name on sticker |
| `body` | SF Pro Rounded, medium | 16–17pt | Helper copy, parent text |
| `label` | SF Pro Rounded, bold | 17–18pt | Buttons, chips |
| `bigCount` | SF Pro Rounded, heavy | 40–56pt | "2 more" star counts on child screens |
| `caption` | SF Pro Rounded, medium | 12–13pt | Timestamps, "5 stars", legal |

Rules: serif = feeling/ceremony, rounded sans = actions/data. Child-critical info is never conveyed by text alone — always icon/image + number. Respect Dynamic Type on parent surfaces.

### 2.3 Shape, texture, elevation

- Radii: pills = full; cards = 28–32; sheets = 36 (top); flashcard-style ceremony cards = 40 with ±3–6° rotation; thumbnails = 16.
- Dot-grid on all `paper` screens. Ceremony screens tint nearby dots in soft pastels radiating from the sticker (the CapWords celebration moment).
- Shadows: ambient `y8 blur24 ink@8%` for cards; stickers get `y6 blur16 black@18%`. No hairline borders except 1pt `ink@5%` on white-on-white pills.
- Buttons/cards never have stroke outlines as primary affordance — fills and shadows only.

### 2.4 Iconography & illustration

- SF Symbols, rounded, medium weight, 2–2.5pt visual stroke.
- Choice icons are **photographic/real**: the temptation is represented by a generic illustrated tile (ride-on horse, claw machine, snack) and the wish by the child's own sticker. Never abstract "piggy bank vs toy" metaphors.
- No mascot, no emoji in UI. Decorative marks are hand-drawn-style sparkles/stars only, used at ceremony moments.

### 2.5 Haptics & sound (feedback tokens)

| Token | Haptic | Sound (all optional, off in settings) |
|---|---|---|
| `tapLight` | `.impact(.light)` | — |
| `starDrop` | `.impact(.medium)` + `.success` after 120ms | single soft coin-in-jar "tink" |
| `pieceFill` | `.impact(.soft)` | brush/wind whoosh, very quiet |
| `wishReady` | `.success` ×2 staggered | warm chime, ≤1.5s |
| `playNow` | `.impact(.light)` | same family, lower pitch — never silence/absence as punishment |

Both choices get satisfying feedback. Save ≠ louder than Play.

---

## 3. Signature components

### 3.1 Wish Sticker (the atom)

Photo subject, background removed, die-cut:
- White contour border 10–14pt following the subject silhouette.
- Drop shadow `y6 blur16 black@18%` → the "peeling off the page" 3D pop.
- Fresh-capture state: sits on `glow` halo with 3–4 sparkle glyphs, spring-pop entrance (scale 1.0→1.06→1.0).
- Label below in `stickerLabel` type, `ink` fill, thick white outline.

### 3.2 Sticker color-fill progress (the signature visualization)

The wish sticker itself is the progress bar:
- The sticker renders **desaturated/greyed** with N invisible segments (N = star target, parent-set).
- Each **Save for Wish** colors in one segment with an organic wipe (soft irregular edge, 600–800ms), accompanied by `pieceFill`.
- Filled segments stay saturated; remaining stay grey. At full fill the sticker pops (spring scale + glow + dot-grid pastel tint) → **Ready** state.
- Below the sticker: star slot row (§3.3) mirrors the same count for explicit "how many more".
- Implementation note: segment mask = radial slices or blob mask over the sticker image; keep segment boundaries soft so it reads as "coming to life", not a pie chart.

### 3.3 Star slots

Horizontal row of circular slots (44pt):
- Empty: `inkFaint` dashed ring on `cardWarm`.
- Filled: `star` fill, white star glyph, tiny `starDeep` drop shadow.
- Fill animation: star flies from the choice button into the slot (400ms spring), then `starDrop`.
- Over 8 slots: show `filled / total` with `bigCount` + one large star instead of a long row.

### 3.4 The Moment (choice pair)

Full-screen ritual, **landscape-only** — the parent hands the phone over and the child turns it sideways. Rotation is the mode switch: **portrait = parent surfaces, landscape = child ritual.** The rotate is a physical handoff cue (like starting a game); status bar hides in the ritual.
- Two side-by-side half-screen cards, each ≥ 44% of screen width; nothing else on screen except a small wish-progress glance at top.
- Card anatomy: tinted surface (`choiceNow` / `choiceWish` at 18% tint on white), radius 32, image centered (temptation tile / wish sticker), label + subtitle beneath.
- Copy: **Play Now / "have fun today"** vs **Save for Wish / "one step closer"** — experience language, not accounting language.
- Identical: size, radius, shadow, tint strength, type. Press state: scale 0.97 + `tapLight`.
- Result screens are both warm: Play Now → "Go play! 🎠 See you next time." (illustrated tile, no star lost); Save for Wish → star flight + segment fill ceremony.

### 3.5 Primary pill CTA

Full-width pill, 56–60pt, `cta` fill, `ctaLabel` text 17pt bold. One per screen max. Secondary action = plain text link in `inkSoft` beneath ("Maybe later", "Not now"). Parent-gate actions get a small lock glyph.

### 3.6 Capture → sticker flow (CapWords recipe)

1. **Viewfinder**: full-bleed camera, white rounded corner brackets, hint "Put the wish inside the frame", 72pt white shutter with pastel iridescent ring, gallery button right, ✕ left.
2. **Confirm**: photo tints warm brown, subject spotlit; circles ↺ / ✓ (88pt white, `star` check) / crop.
3. **Sticker reveal**: cut-out pops onto `glow` + sparkles, dot grid tints pastel, name label appears. Escape hatch pill: "✎ Not quite right? Tap to fix".
4. Honest states: while recognition/cutout is simulated or processing, show "Making your sticker…" shimmer — never fake instant AI.

### 3.7 Cards

- **Wish card** (Wish Jar): white card radius 32, sticker left at slight rotation, name in `title`, star row beneath, pastel tint band from the Morandi set (assigned per wish, stable).
- **Little Win card**: flashcard style (radius 40, speckled pastel or deep `#2E2A24` fill), sticker die-cut on top, first-person line beneath in white/ink: "I waited 5 stars for my LEGO — and I did it." Date caption. Slight stack/rotation in gallery.
- **Day/gallery grouping**: serif date headers on paper, cards scattered with small rotations.

### 3.8 Tab bar

Floating pill (16pt bottom inset, white 95% blur, soft shadow), 3 child destinations: **Wish** (home/Moment), **Wish Jar**, **Little Wins**. Active = `star` tinted glyph + soft `cardWarm` pill. Parent settings lives behind a small top-right profile circle with parental gate — never a tab.

### 3.9 Sheets & parent surfaces

36pt-top-radius white sheet over blurred content; ✕ circle top-left; serif headline; body 15pt; coral pill CTA. Parent-only screens may use list groups (44pt icon tile + title + caption + chevron/toggle, inset separators) — LittleBites settings recipe. Star-value/currency fields appear **only** here.

---

## 4. Screen recipes (MVP)

| Screen | Recipe |
|---|---|
| **Welcome** | Paper + dot grid, floating pastel sticker fragments at edges, serif "Every wish starts with a choice", coral pill "Get Started", legal caption. |
| **Profile setup** | One question per screen, parent+kid together: name (big rounded field), age chips (pills), avatar pick (Morandi pastel circles with simple illustrated faces). Progress = tiny star row, not a percent bar. |
| **Onboarding demo** | A real mini-wish: "Start with Paulo" sticker at 1-remaining state → child presses Save for Wish → segment fills → Ready ceremony → card saved to Little Wins. Teaches by doing the actual mechanic. |
| **Home / Wish** | Serif greeting ("Good morning, Paul"), hero wish sticker (color-fill state) on glow, star slot row, `bigCount` "2 more", full-width coral pill **"It's a choice moment"** → The Moment. Empty state: grey placeholder sticker + "Snap your first wish" CTA. |
| **The Moment** | §3.4. Landscape, entered only via parent handing phone over (the rotate = handoff ritual); back gesture returns home silently. |
| **Save result** | Star flight → slot fill → sticker segment wipe → if target met, transition to Ready ceremony (2–3s, full-screen glow + pastel dots, "Your LEGO is ready!"), then wait — "Take a photo of your prize" appears only when the child taps. |
| **Wish Jar** | Serif "Wish Jar", active wish card on top, past/closed wishes below as memory cards (no delete-shame; closed wishes keep their stars as "memories"). |
| **Little Wins** | Serif title, stacked ceremony cards (§3.7), each opens full-screen with share-image export (parent gate on share). Voice note button = dashed mic circle, records attach to card. |
| **Parent settings** | Behind gate: star value (currency allowed here), target count per wish, sound toggle, data export. LittleBites list style. |

---

## 5. Motion

- Springs (iOS default response 0.4–0.5, damping 0.75–0.85); durations 250–800ms. One hero animation per moment; nothing loops idly.
- **Star flight**: choice card → slot, slight arc, 400ms.
- **Segment wipe**: organic edge, 600–800ms, `pieceFill` haptic.
- **Ready ceremony**: sticker springs, glow blooms, dot grid tints, serif line fades in — ≤3s total, no auto-navigation.
- **Sticker entrances**: pop 1.0→1.06→1.0 with border draw-in.
- Cards/sheets: standard iOS spring slide-up; stacked cards fan with rotation.
- Reduce Motion: replace flights/wipes with cross-fades; keep haptics.

---

## 6. Voice & copy

- Child lines are **first-person, child-owned**: "I saved for my LEGO", "My wish is ready!" — never "Good job, buddy" praise-from-above, never "Paul was a good boy".
- Choice copy is experience language: "Play now / have fun today" vs "Save for wish / one step closer". Banned: spend, cost, give up, don't, should.
- No urgency, no guilt: banned patterns — "You haven't…", "Don't lose your streak", "Are you sure you want to quit?"
- Sentence case; one exclamation max, ceremony screens only.
- Parent copy is plain and honest about mechanics ("Each star = one skipped ride ≈ $2. You set this.").

---

## 7. Layout & ergonomics (iPhone, 393pt base)

- Margins 20–24pt; cards inset 20pt.
- Child touch targets ≥ 64pt (44pt is the parent-surface minimum); Moment cards ≥ 44% screen height each; shutter 72pt; confirm ✓ 88pt.
- One primary action per child screen. Max two text sizes per child screen.
- Tab bar floating 16pt; CTA ≥ 24pt above home indicator.
- Safe under Dynamic Type XL on parent screens; child screens use fixed large sizes.

---

## 8. SwiftUI implementation map

Centralize in `PauloTheme` (extend the existing file; no new module):

```swift
enum PauloColor {            // §2.1
  static let paper = Color(hex: 0xF3F1EC)
  static let ink   = Color(hex: 0x20303C)
  static let star  = Color(hex: 0xF0B84C)
  static let choiceNow  = Color(hex: 0xCE8F70)
  static let choiceWish = Color(hex: 0x6FA3C8)
  // … card, cardWarm, inkSoft, inkFaint, cta, ctaLabel, pastels
}
enum PauloFont {             // §2.2
  static func display(_ s: CGFloat) -> Font { .system(size: s, design: .serif).weight(.semibold) }
  static func label(_ s: CGFloat)   -> Font { .system(size: s, design: .rounded).weight(.bold) }
}
```

- `DotGridBackground` ViewModifier for `paper` screens.
- `StickerView` (exists as `StickerVisual`) gains: contour border layer, shadow token, `fillProgress: Double` + `segmentCount: Int` for the grey→color mask (§3.2).
- `StarSlotRow` replaces `ProgressSlotsView` visuals (§3.3).
- `ChoicePairView` enforces symmetry structurally: one `ChoiceCard(style:)` used twice — never two bespoke buttons.
- Haptics via a `PauloFeedback` enum wrapping `UIImpactFeedbackGenerator` (§2.5).
- All copy through `Localizable.xcstrings` keys named by voice rules (`moment.playNow.title`…).

---

## 9. Anti-patterns (hard no)

- Candy-saturated palettes, rainbow gradients, default iOS blue.
- Streaks, points, leaderboards, daily reminders, badge counts.
- Unequal choice buttons; amber/reward color on a choice; pre-selection.
- Currency, balances, or "8 dollars" anywhere in the child view.
- Scare modals, progress loss, red destructive styling in child flows.
- Confetti storms, autoplaying sounds, mascot chatter.
- Pure-white backgrounds, hairline-border card outlines, emoji as UI.
- Fake AI states (instant "recognition" with no processing state).
