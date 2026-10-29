# DESIGN.md — iOS App Design System

Derived from reference screenshots in `uploads/UI reference/` — two products with a shared design language:

- **CapWords** (`UI reference_capwords/`) — snap an object → AI names it in your target language → collect it as a sticker → review with memory cards.
- **LittleBites** (`UI reference_littelbites/`) — snap food → AI identifies it → log meals as stickers → hydration + calorie tracking.

Both apps share a "camera-first, sticker-collecting, gentle-journal" identity. This document synthesizes that language into one reusable system.

---

## 1. Design Principles

1. **Camera is the hero.** The primary action on every root screen is capture. It lives in or beside the tab bar as an always-available, oversized control.
2. **Photos become stickers.** Every captured object is cut out and rendered with a thick white die-cut outline + soft shadow. Stickers are the app's atomic content unit — shown in cards, calendars, review decks, and share sheets.
3. **Soft, paper-like world.** Warm off-white backgrounds, subtle dot-grid texture, large radii, gentle shadows. Nothing is pure white or pure black; nothing has hard edges.
4. **One warm accent per app.** Orange (CapWords) or olive green (LittleBites). Everything else stays neutral — accents mark selection, progress, and primary state only.
5. **Serif for feeling, sans for doing.** Editorial serif headlines give a journal tone; rounded sans handles UI labels, buttons, and data.
6. **Playful but calm gamification.** Streaks, memory curves, and progress rings appear as friendly stickers and pastel rings — never aggressive counters.

---

## 2. Foundations

### 2.1 Color

**Neutrals (shared)**
| Token | Value | Use |
|---|---|---|
| `bg/canvas` | `#F2F1EF` (warm gray-white) | App background |
| `bg/dot` | `rgba(0,0,0,0.06)` | Dot-grid texture dots |
| `surface/card` | `#FFFFFF` | Cards, sheets, list rows |
| `surface/elevated` | `#FAFAF8` | Secondary surfaces, pill controls |
| `ink/primary` | `#1F2A37` (deep blue-charcoal) | Serif headlines, primary text |
| `ink/secondary` | `#7A8494` (cool gray-slate) | Subtitles, helper copy |
| `ink/tertiary` | `#B9BFC8` | Placeholders, disabled |
| `button/dark` | `#221F1A` (near-black warm) | Primary CTA fill |
| `button/darkLabel` | `#F5D97E` (soft yellow) | Label on dark CTA (CapWords) |

**Accent — CapWords (orange)**
| Token | Value | Use |
|---|---|---|
| `accent/500` | `#EF8632` | Checkmarks, active tab, pronunciation icon, streak ring |
| `accent/glow` | `#F8ECBF → transparent` radial | Sticker halo on result screens |

**Accent — LittleBites (olive)**
| Token | Value | Use |
|---|---|---|
| `accent/500` | `#8A9A4B` (olive/moss) | Selected chips, active tab, plus button, checkmarks |
| `accent/info` | `#2F9BF4` (sky blue) | Water level markers, hydration numbers |
| `accent/warn` | `#F09A3E → #F06B32` gradient | BMI bar, "vs prior" stats |

**Pastel category palette (tints for cards/calendars)**
- Lavender `#C9BFE3`, Sage `#B6BC8A`, Blush pink `#E7C4C4`, Powder blue `#9FBCD6`, Butter `#EFE388`, Mint `#93D6A4`, Soft violet `#B9AEE3`, Baby pink `#F6C6DE`
- Dark card variants for flashcards: near-black `#2E2A24`, ochre `#D89B4A`, tomato `#E8472B` — all with subtle speckle/noise texture.

**Rules**
- Backgrounds are never pure `#FFF`; cards are. Contrast comes from warm-vs-white, not borders.
- Accent saturation is reserved for interactive/selected states. Never use accent as a large background fill.
- Full-bleed photo screens (camera, capture confirm) darken the photo with a warm tint (`#8A7B69` at ~60%) rather than a black scrim.

### 2.2 Typography

| Role | Face | Weight / Size (pt) | Notes |
|---|---|---|---|
| Display serif | New York / Playfair-class serif | 600 / 34–40 | Greetings ("Good Evening"), onboarding heads, dates ("Jul 01") |
| Title serif | same serif | 600 / 22–28 | Section heads ("July", "Vocab", "Categories") |
| Title sans | SF Pro Rounded / Nunito-class | 700 / 28–34 | LittleBites screen titles ("Today LiveLog") |
| Body | SF Pro / rounded sans | 400–500 / 15–17 | Helper copy, list rows |
| Label | rounded sans | 600–700 / 15–17 | Buttons, chips, tabs |
| Sticker word | heavy rounded sans (Baloo/Nunito-Black class) | 800 / 28–36 | Word on sticker, white multi-outline + soft shadow |
| Caption | rounded sans | 500 / 12–13 | "3 Words", timestamps, IPA `/la ʒãb/` |
| Data numerals | rounded sans | 700 / 28–48 | "2818 kcal", "250 ml" |

Rules:
- Serif = emotional/journal moments; sans = actions/data. Don't mix within one line.
- Sticker labels always render with ~4px white stroke (duplicated shadow layers) so they read on any photo.
- Translations/secondary script sit under the main word at ~55% size, medium weight.

### 2.3 Shape & Elevation

| Element | Radius |
|---|---|
| Buttons (primary pill) | full (999) |
| Cards (day cards, category cards) | 28–36 |
| Sheets / modals | 36 top corners |
| Flashcards | 40, with slight rotation (±3–6°) in stacks |
| Chips / segmented items | full |
| Sticker die-cut outline | follows subject contour, ~10–14px white border |
| Thumbnails | 16–20 |

Shadows: single soft ambient (`0 8px 24px rgba(31,42,55,0.08)`). Stickers get `0 6px 16px rgba(0,0,0,0.18)`. No hairline borders except 1px `rgba(0,0,0,0.05)` on white-on-white pills.

### 2.4 Texture & Background

- **Dot grid**: canvas carries a ~28px-spaced dot grid of 2px dots at 5–8% opacity. On result screens the dots take rainbow pastel tints radiating from the sticker (celebration moment).
- **Speckle/noise**: dark and pastel flashcards carry a fine speckle texture at low opacity.
- **Glow halo**: newly captured stickers sit on a warm radial glow (`#F8ECBF`) with tiny sparkle glyphs.

### 2.5 Iconography

- Rounded, 2–2.5px stroke line icons (SF Symbols weight: medium, rounded).
- Circular icon buttons: 44–56px, `surface/elevated` fill or translucent dark on photos.
- Brand/tab icons are simple filled glyphs; active tab tinted accent, inactive `ink/primary` at full or `ink/tertiary`.
- Decorative emoji-stickers (streak character, water drop) are illustrated 3D/hand-drawn PNGs — never system emoji.

---

## 3. Core Components

### 3.1 Tab Bar (floating pill)
- Detached from screen bottom (~16px inset), full-radius pill, white/95% blur, soft shadow.
- 3 destinations, icon + 11pt label (CapWords: Capture / Vocab / Profile) or 3 icons + camera slot (LittleBites: Meals / LiveLog / Drinks).
- Active item: accent glyph, optional soft tinted pill behind it.
- **Camera button**: 64–72px circle, sits at the pill's right end (LittleBites) or the Capture tab itself opens camera (CapWords). Iridescent/rainbow ring treatment on CapWords shutter.

### 3.2 Primary Button
- Full-width pill, 56–60px tall, `button/dark` fill.
- Label 17pt bold; CapWords uses yellow label on dark; LittleBites uses white.
- Secondary action beneath as plain text link (`ink/secondary`, 15pt): "or", "Try Later", "Maybe Later".

### 3.3 Sticker
The signature element.
- Subject cut out from photo, white contour border (10–14px), soft drop shadow.
- Word label: heavy rounded sans, white outline, dark-slate fill; secondary translation below; pronunciation wave icon in accent orange next to word.
- States: fresh capture (glow + sparkles), in-card (plain, small), flashcard (photo tinted card-color inside die-cut).

### 3.4 Capture Flow Controls
- Viewfinder: corner-bracket frame (white, rounded, 3px), hint text centered ("Please place the object within the frame" / "Place food inside the frame").
- Mode toggle (LittleBites): translucent pill segmented "AI Scan | Snap".
- Confirm row: ✕ (dismiss, translucent dark circle) — ✓ (large white circle, accent check, 88px) — ↺ (retake).
- Post-capture the photo background desaturates/tints while the subject stays lit (spotlight moment).

### 3.5 Result Card / Naming Moment
- Sticker centered on glow, word + translation below, pronunciation icon.
- Action row: ↺ / ✓ (primary) / ✕ circles.
- Escape hatch pill at bottom: "✎ Not what you expected? Tap to adjust" (gray pill, 15pt).
- LittleBites variant: bottom sheet with editable title, "Thinking…" AI status in accent, note field, timestamp chip ("Now 09:21"), large ✓.

### 3.6 Day / Category Cards
- Large pastel cards (radius 32), one per day or category.
- Serif date/title top-left ("Jul 01"), caption "1 Words".
- Stickers scattered inside at small scale with slight rotations.
- Category cards: pastel fill + 2×3 mini sticker grid + "416 Words" caption.

### 3.7 Flashcard Deck (review)
- Full-width card (radius 40) with speckled dark/ochre/tomato fill, stacked with rotated cards peeking behind.
- Photo die-cut at top, word + IPA below in white.
- Progress "0 / 5" pill top-center; "→ Got it!" / "← Needs review" swipe hints above card.
- Voice-mode mic button (dashed circle) bottom-center: "Tap to enable voice mode".

### 3.8 Progress Ring / Hydration Figure
- CapWords: large white ring with 5–6 pastel arc segments, dotted tick ring around it, greeting + "You've snapped N words!" above.
- LittleBites: 3D translucent human-shaped vessel that fills with water; right-side ruler with ml ticks, blue current-level label; goal "2,000ml" ghosted at top.

### 3.9 Chips & Selectors
- Amount picker: horizontal pills; selected = accent-filled rounded-square badge with value+unit stacked, unselected = plain gray numbers.
- Activity chips (Sed/Light/Med/High): pill row, selected accent-filled.
- Week strip: 7 vertical capsule cells (day letter + number), today outlined in accent orange, past days on white capsules.
- Voice picker rows: white cards, colored avatar circle + name + radio; speed slider with center "1.0x" bubble on tick track.

### 3.10 Sheets & Modals
- 36px top-radius white sheet over blurred content; grabber implicit.
- Close = 44px circle "×" top-left.
- Serif headline center, gray body copy, dark CTA, "Maybe Later" text link.
- What's-new modals show fanned pastel category cards as hero art.

### 3.11 Banners & Promos
- Offer chip: warm tan pill "✂️ Welcome! Save 30% ›" top-center.
- Countdown pill: dark gradient "👑 Limited Offer 00:28:36 ×".
- Upgrade card: peach/tan large card, brand glyph + "Upgrade to Premium" eyebrow, serif headline ("Go Premium Learn French Faster!"), white pill CTA ("Start 3-Day Free Trial").
- Locked-feature banner: white card, orange flame icon, "Limited Offer / Limited lifetime access…" + chevron, orange hairline border.
- Demo-data notice: gray pill row "Demo data. Upgrade to Plus to unlock. →".

### 3.12 Stats Blocks (LittleBites)
- Line chart: accent gradient stroke + soft fill, dashed gray comparison line, weekday x-labels.
- Heatmap: 6-month grid of rounded squares in green tints, "146 days logged" caption.
- Food calendar: month grid where logged days show the food sticker thumbnail instead of the number.
- Ranked list "Top 5 This Week": number badge (accent circle for top ranks), name + kcal · date, sticker thumbnail right.
- Stat tiles: 2-up white cards, caption + big numeral + unit.

### 3.13 Editor (LiveLog)
- Photo canvas card with "◉ Live" badge, BG and mute circular buttons bottom-right.
- Tool tabs underneath: "⭐ Border / Effects / Mask / Text" — active tab accent + star icon.
- Style chips: white pills with mini icon preview + label (Sticker, Dash, Star Road, Dots, Double, Glow, Orbit); selected = accent outline.
- Sticker tray sheet: "Live Stickers / Tap to add, drag out to remove", Clear pill, ×, page dots, 5-col grid of hand-drawn stickers.

---

## 4. Screen Patterns

| Pattern | Recipe |
|---|---|
| **Onboarding** | Dot-grid canvas + floating pastel sticker fragments at edges; device mockup or hero sticker; serif headline ("See it. Snap it. Learn the words"); "Powered by AI" badge; dark pill CTA; legal fine print 12pt gray. |
| **Guided first capture** | Sample photo card (radius 36, slight rotation) → serif "We've prepared an example for you!" → body copy → dark CTA "Try a Demo" → "or / Snap Your First Word". |
| **Camera** | Full-bleed viewfinder, serif date top-left on photo, gallery button top-right, bracket frame + hint, shutter (white/iridescent 72px) centered bottom, ✕ left, gallery right. |
| **Confirm crop** | Photo tinted to warm brown, subject spotlit; ↺ / ✓ / crop circles bottom. |
| **Result / naming** | Sticker + glow + sparkles center, word block, action circles, adjust pill. |
| **Home (CapWords)** | Offer chip + organize icon top; serif greeting + count; progress ring hero; month sections with pastel day cards; floating tab bar. Menu popover top-right: "View by date / ✓ View by category" (white rounded 20 card, checkmark on active). |
| **Home (LittleBites)** | "Today" title + offer countdown + stats/profile circles; week strip; kcal row (accent numeral left, goal right); white input card with activity chips; BMI card (olive tint) with gradient bar + plus button; timeline "Today / No data…" with camera tile; "Switch Nearby Week" row. |
| **Detail day view** | Serif date + "N Words" header; stickers scattered large on dot grid; shutter button bottom-center. |
| **Word detail** | Thumbnails row top (selected item), giant sticker center, word 40pt heavy, translation, IPA + pronunciation, locked "View examples" pill (lock icon accent). |
| **Review hub (Vocab)** | Serif "Vocab" title; fanned mini flashcards hero; streak sticker character; serif status ("Oops! No review yet today"); gray encouragement line; dark CTA "Start Review"; white calendar card with month pager, orange weekday row, today outlined. |
| **Profile** | Serif "Profile"; avatar circle (blank face illustration) + "Edit Profile" serif; language pill with flag; gradient rewards banner (orange→pink, gift icon, ×); premium upsell card; Settings list. |
| **Settings list** | White card group, 44px icon tile + title + caption + chevron/toggle rows, 1px separators inset. |
| **Stats screen** | ×-close + centered title; demo banner; "Last 7 Days" serif-scale numeral + delta stats right; chart; heatmap card; food calendar; top-5 list; stat tiles. |

---

## 5. Motion

- **Capture → sticker**: subject pops out with spring scale (1.0→1.06→1.0), white border draws in, glow fades up, sparkles twinkle once.
- **Cards**: sheets slide up with iOS spring; flashcards swipe with rotation and fling; next card springs forward from the stack.
- **Progress ring**: arcs sweep in clockwise, staggered per segment.
- **Water fill**: liquid level rises with wave sloshing; ruler label rides the surface.
- **Chips/tabs**: selection pill slides between options (matchedGeometry).
- Durations 250–450ms, iOS default springs; celebrate moments (new word) get one confetti-adjacent flourish max.

---

## 6. Voice & Copy

- Encouraging journal-buddy tone: "Awesome! You've snapped 4 words!", "Your 0-day streak is on fire, keep it going!", "Oops! No review yet today".
- Sentence case everywhere; exclamation marks allowed in celebration moments only.
- Hints are plain and physical: "Place food inside the frame", "Drag stickers freely, then save as Live".
- Escape hatches are polite: "Not what you expected? Tap to adjust", "Maybe Later", "Try Later".
- Feature education leads with benefit, not mechanics: "CapWords will help you review captured words using the memory curve."

---

## 7. Layout Metrics (iPhone, 393pt width)

- Screen margins: 20–24pt. Cards inset 20pt from edges.
- Header block: serif title at top-left, 34–40pt, ~56pt from status bar.
- Tab bar: floating, 16pt bottom inset, ~64pt tall + 72pt camera circle overlapping.
- Primary CTA: 56–60pt tall, 24pt side margins, ≥24pt above home indicator.
- Touch targets ≥ 44pt; capture confirm ✓ is 88pt.
- Card grids: 2-up with 16pt gutter; sticker trays 5-up.
- Sheets cover ~85% height, content max-width = screen − 48pt.
