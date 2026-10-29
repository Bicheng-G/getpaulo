# Paulo Visual System — tokens, type, motion, layout

**Status:** LIVE · normative for visual/interaction styling.
**Read this when:** styling any UI — colours, typography, shape, iconography, motion, haptics, layout, accessibility.
**Update this when:** a token, motion rule, or layout/ergonomic rule is added or changed (keep `PauloTheme.swift` and this file in lockstep). Never renumber headings; cite as `system.md#anchor`.
**See also:** the *semantics* of amber and voice live in [principles.md](principles.md) and always win over aesthetics; the amber allow/deny *mechanism* lives here at [#amber-usage](#amber-usage).

All values are light-mode; a dark-mode specification does not exist yet.

## Colour tokens {#colour-tokens}

Code home: `PauloApp/Paulo/Support/PauloTheme.swift` (`PauloColor`).

### Canvas and ink

| Token | Value | Use |
|---|---:|---|
| `paper` | `#F3F1EC` | Warm app canvas |
| `paperDot` | `#1F2A37` @6% | 28pt dot-grid texture |
| `card` | `#FFFFFF` | Cards and sheets |
| `cardWarm` | `#FAF8F3` | Secondary surfaces |
| `ink` | `#20303C` | Primary text |
| `inkSoft` | `#6A7480` | Secondary text (darkened from mockup for ≥4.5:1 on paper) |
| `inkFaint` | `#B9BFC7` | Placeholder / inactive |
| `cta` | `#CB6842` | Parent/shared primary action |
| `ctaLabel` | `#FFF4E6` | Label on `cta` |

### Promise and ceremony

| Token | Value | Use |
|---|---:|---|
| `star` | `#F0B84C` | Earned promise progress after a choice |
| `starDeep` | `#D99A2B` | Star edge, shadow, pressed progress state |
| `glow` | `#F8ECC0 → transparent` | Fresh sticker and milestone halo |
| `winsDeep` | `#2E2A24` | Fulfilment keepsake surface |

### Choice pair

| Token | Value | Use |
|---|---:|---|
| `choiceNow` | `#CE8F70` | Play-now accent/fallback glyphs |
| `choiceNowSurface` | `#F6E8E2` | Enjoy-now card face |
| `choiceNowEdge` | `#DFBFB2` | Enjoy-now 3D edge and gradient-shadow endpoint |
| `choiceWish` | `#6FA3C8` | Wish accent |
| `choiceWishSurface` | `#E4EDF4` | Wish card face |
| `choiceWishEdge` | `#BCD0E0` | Wish 3D edge and gradient-shadow endpoint |

The pairs must maintain equivalent perceived lightness, chroma, contrast, and visual mass ([principles.md#choice-symmetry](principles.md)).

### Morandi accents

`sage #B7BC93` · `dustyBlue #A3B8CC` · `blush #DCC0BC` · `lilac #C3BCD8` · `clay #D8B98F` · `mist #C9CFC4`

### Surfaces beyond paper

| Token | Value | Use |
|---|---:|---|
| `captureTint` | `#8A7B69` | Warm fallback when no live camera image |
| `handoffTaupe` | `#817767` | Choice-moment rotate-hint beat ([interlude.md](interlude.md)) — deliberately breaks the cream palette so the parent feels the mode change |
| `DeveloperSignatureKit.developerBlue` | `#0029F2` | **Experimental, parent-only:** generated maker signature. Package-local candidate, not a reusable Paulo token. |

### Amber usage {#amber-usage}

Semantic ruling in [principles.md#amber-ruling](principles.md): amber = earned progress and milestones only, never selection or navigation tint. The allow/deny list below is the mechanism that implements it — **Current** strictness, so it may be revised with a record ([../decisions/README.md](../decisions/README.md)); the semantic above may not.

**Allowed:** filled star slots · the post-choice ledger change · ready/funded state · a restrained milestone glow · progress-specific parent information · **the choice walk's stones and its `★ N` chip**, including where the walk arrives on the Save token: these report the ledger and depict a true consequence rather than recommending an option ([components.md#choice-walk](components.md), [PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)). Walked stones are drawn as quiet flat discs, not full slots — a stack of those beside one token would put more amber weight there than the balance warrants.

**Allowed on Home:** the wish path's walked stones and its next-step marker, for exactly the same reason — they report the ledger ([components.md#wish-path](components.md), [PDR-0012](../decisions/0012-home-is-the-path-and-the-child-is-the-button.md)). The child's own token gets **no** amber: a star badge on an avatar is amber dressing up a control, and the affordance is the breathing halo in the child's avatar colour. With several children the route carries no amber at all, because it carries no progress.

**Not allowed:** amber that makes one of the two choices louder *as a control* — a `+N★` price tag, a glow, a badge, a brighter surface · generic selected-tab tint · generic links or unrelated parent actions · preselection or recommendation. The test is whether the amber is reporting the ledger or dressing up a button.

Both choice consequences appear in matched, neutral strips; amber appears only after the child
chooses Save and progress is earned ([principles.md#choice-symmetry](principles.md) — no pressure
before, honest difference after). Active native tabs use non-semantic brand clay (`cta`) with the
system selection material; they never use `star` / `starDeep`
([PDR-0017](../decisions/0017-use-brand-clay-for-active-navigation.md)).

One violation still ships: the pre-choice `+N★` badge on the *sideways* card pair (the upright
walk dropped it) — see `TODOS.md` before touching that surface.

## Camera treatment {#camera}

A subtle black overlay (~14%) is permitted over a live camera feed for white-control legibility. `captureTint` is the warm fallback without a live image. The rule is not "never use black"; it is "never obscure the child's subject with a heavy, punitive, or cinematic scrim."

## Typography {#typography}

Two system families only. Serif conveys memory and ceremony; rounded sans conveys action and data. Code home: `PauloFont`.

| Role | Face | Size | Use |
|---|---|---:|---|
| `display` | New York / system serif semibold | 34–40pt | Screen and ceremony titles |
| `title` | serif semibold | 22–28pt | Card titles and dates |
| `stickerLabel` | SF Pro Rounded heavy | 28–34pt | Wish name around sticker |
| `body` | SF Pro Rounded medium | 16–17pt | Parent/shared copy |
| `label` | SF Pro Rounded bold/heavy | 17–20pt | Buttons and controls |
| `bigCount` | SF Pro Rounded heavy | 40–56pt | Star count / "more to go" |
| `caption` | SF Pro Rounded medium | 12–13pt | Time, metadata, legal |

## Sticker size roles {#sticker-size-roles}

Sticker presentations select a semantic role from `StickerSizingConfiguration`; screens do not
invent a preferred point size ([PDR-0011](../decisions/0011-size-stickers-by-semantic-role.md)).
The value is the sticker subject's nominal **dominant axis** — its other axis preserves the
cutout's aspect ratio.

| Role | Default | Use |
|---|---:|---|
| `thumbnail` | 80pt | Compact rows, archive and the small wish echo inside a Choice token |
| `collection` | 160pt | Wish Jar and other collection contexts |
| `featured` | 200pt | Capture, the My Trail keepsake and the Choice Moment |
| `hero` | 280pt | Wish management, Ready/onboarding ceremonies and future full-screen focal views |

These are nominal sizes, not unconditional frames. A layout may cap a role to the space it can
safely offer, but the cap may only shrink it and must live in the shared configuration. Capture
uses one width cap for both its handoff and settled form. The upright Moment uses one stage-height
cap for the breathing source and Choice destination, so the one stage-owned sticker never jumps
scale at their boundary. Home presents a child's real sticker only as a small recognition image
inside a focused-wish bubble whose outer frame is the general character's size;
`HomeHeroConfiguration` owns the shared inner cap, and every child receives the same cap. Opening
the Moment then promotes the same real wish to its `featured` role
([PDR-0038](../decisions/0038-show-focused-wishes-as-equal-home-companions.md)).
Wish management deliberately uses `hero`: the selected wish owns this scrollable detail surface,
while the active Jar remains `collection` for dense scanning under
[PDR-0037](../decisions/0037-make-wish-management-a-hero-surface.md).

## Shape, texture, and elevation {#shape}

Code home for surface rendering is the `ShadowKit` Swift Package, called explicitly at the owning
view boundary ([PDR-0028](../decisions/0028-adopt-shadowkit-elevation-roles.md)). Paulo owns no
global shadow token:

| Role | Package call | Use |
|---|---|---|
| Resting | `proShadow(elevation: 4, opacity: 0.08)` | Buttons, cards, paper artifacts |
| Floating | `proShadow(elevation: 8, opacity: 0.10)` | Avatars and controls floating over content |
| High authored object | `proShadow(elevation: 16, opacity: 0.12)` | Alpha-tight generated Home hero |
| Overlay | `proShadow(elevation: 16, …)` | Reserved for a bounded Paulo-owned modal/popover |
| Choice | token-relative `proGradientShadow`, radius 16, 20%, x0/y8 | Now `choiceNow→choiceNowEdge`; Wish `choiceWish→choiceWishEdge`; equal strength and geometry |

ShadowKit applies the supplied opacity to each of five layers, so Paulo deliberately uses lower
opacity on its light paper than the package default for ordinary elevation. The choice gradient is
mounted once at the shared `ClickTileButtonStyle` boundary. Each `ChoiceKind` supplies its semantic
colour pair, while direction, strength, geometry, compositing and rendering path cannot vary. Paulo
pins the fixed `psalzAppDev/ShadowKit-SwiftUI` fork at exact revision
`71bd68e74f3c395fdd291dff22623b1604d9d8bf`: that revision makes `GradientStyle` conform to
`ShapeStyle & View` and passed the direct-Moment runtime check. Its real `proGradientShadow` is
therefore the required choice renderer, not a prohibited effect or an ordinary-shadow fallback.
`ClickTileConfiguration.Appearance` owns the gradient's feel-critical values; `PauloColor` owns its
semantic endpoints ([PDR-0039](../decisions/0039-use-the-fixed-shadowkit-fork.md),
[PDR-0041](../decisions/0041-match-choice-gradients-to-token-colours.md)). Do not return to
canonical upstream ShadowKit until a tagged release contains the same fix and passes that check.

Semantic star/glow depth, legibility over live camera imagery, capture/ritual illustration
separation and the performance-baked die-cut sticker shadow are purpose-specific effects, not
surface elevation; name that purpose at the call site. Native sheets and tab material keep
system-owned depth.

- Pills: full radius. Cards: 28–32pt. Sheets: 36pt top radius. Keepsake cards: ~40pt,
  optional restrained rotation. Thumbnails: 16pt. The Family agreement's self-sizing paper artifact
  uses a 24pt continuous corner: softer than a thumbnail, quieter than ordinary app furniture.
  (`PauloShape`, `FamilySurfaceConfiguration`)
- My Trail uses a shared 26pt layered-paper surface for fulfilled-wish prints, voice notes and
  photo notes, narrowed to sit beside its route. Its maximum identity-stable turn is 0.8°;
  inserting at the front never restyles old evidence. The route down its left edge is Home's own
  path and borrows Home's `WishPathConfiguration.trail` rhythm rather than defining its own.
  (`TrailSurfaceConfiguration`, [components.md#trail-route](components.md))
- The Wish Jar's full-screen sticker preview uses one viewport-sized dark material plus a black
  scrim and bottom depth gradient; it does not stack light glass layers. Its stable focal layer is
  independent of a safe-area-anchored control dock. The dock always reserves the same Redeem slot;
  compact 44pt Back/Edit controls use one quiet translucent fill, while the smaller Redeem remains
  the solid `cta` action.
  (`WishStickerPreviewConfiguration`; [components.md#wish-sticker-preview](components.md))
- Primary card/control elevation follows the resting/floating ShadowKit role table above.
- Sticker shadow: `y6 blur6.5 black@16%` (`pauloStickerShadow`) — heavier blur reads as a grey cloud behind small stickers.
- Generated Home hero: composite the alpha-tight artwork, then apply ShadowKit elevation 16 @12%
  to that image only. The stage and independently moving wish star do not inherit it
  ([PDR-0030](../decisions/0030-elevate-the-home-hero.md)).
- Avoid decorative hairline borders; use fills, edges, and elevation.
- Backgrounds: `DotGridBackground` (paper + 28pt dot grid; `.ceremony` layers soft pastel dots).

## Iconography and illustration {#iconography}

Rounded SF Symbols or custom assets with equivalent 2–2.5pt visual stroke. No emoji as UI
iconography. Temptation images represent the real experience, not an abstract moral metaphor.
Decorative stars and sparkles are limited to ceremony contexts; funded Wish Jar stickers stay
plain apart from their explicit status
([PDR-0040](../decisions/0040-keep-funded-wish-jar-stickers-plain.md)).
Home has one additional authored illustration: the cheerful yellow character star means wishes in
general, never ledger value, a specific child's wish or readiness. It is silent, non-interactive
and accessibility-hidden; its glow is permitted only on Home under the narrow exception in
[PDR-0023](../decisions/0023-use-generated-home-heroes-and-a-general-wish-star.md).

The native tab bar's four persistent destinations use one SF Symbols line family
(`wand.and.stars`, `archivebox`, `medal`, `person.2`). The transient Add Wish launcher is the one
exception: it uses the supplied full-colour rounded camera artwork at a founder-reviewed 47pt
visible size inside a 53pt transparent asset. Its baked black@18%, 2pt-blur, y1.5pt shadow is
intrinsic object separation inside an already-elevated native control, not Paulo surface
elevation: a live app-owned multi-layer shadow cannot fit the raster or native tab bounds without clipping
or shrinking the reviewed camera ([PDR-0025](../decisions/0025-keep-camera-object-separation-outside-surface-elevation.md)).
The system still owns
selected state and material, while `cta` clay tints the focused persistent destination
([PDR-0017](../decisions/0017-use-brand-clay-for-active-navigation.md)).
Child-facing custom fallback illustrations use Paulo's rounded construction and palette rather
than mixing a visually heavier symbol beside a real photo sticker.

### Mascot and character {#mascot}

**Current** ([PDR-0005](../decisions/0005-mascot-permitted-conversation-is-not.md), which replaced a flat "no mascot or conversational character" — that clause named the artifact instead of the harm, and contradicted the interlude companion Paulo already ships).

**A mascot is permitted:** a visual character with a face, expression and presence — brand surfaces, empty states, onboarding, ceremony, and the [interlude companion](interlude.md). It may react to real state (breathe, settle, look pleased at a genuine milestone).

**The line is silent vs. conversational.** A character may not:

1. **Converse** — no dialogue, free text, turn-taking, or AI-generated speech to the child ([principles.md#ai-reflects](principles.md); the research defers the open-ended child AI companion).
2. **Evaluate a choice** — no praise, encouragement, disappointment or verdict, before or after ([principles.md#voice](principles.md), [#evidence-not-identity](principles.md)).
3. **Be present while the child decides**, unless identical with respect to both options — no leaning, looking, gesturing or brightening toward either card ([principles.md#choice-symmetry](principles.md)). The interlude companion lifts away before the pair rises, satisfying this by construction.
4. **Simulate relationship or need** — no "I missed you", care/feeding mechanics, decay, absence-guilt, or claim to be alive or waiting.
5. **Speak for the parent** — guidance, comfort and instruction belong to the adult in the room ([principles.md#private-parent-support](principles.md)).
6. **Describe the child** — no traits, labels or identity narrative.
7. **Be a reason to open the app** — no content, outfits, moods or streaks that reward returning ([principles.md#doorway](principles.md)).

## Ceremony drift ruling {#ceremony-drift}

Retain a strictly bounded ceremony drift; prohibit routine confetti reinforcement.

`ceremonyDrift` rules: max 22 deterministic muted pastel particles; one short drift, no looping or storm; no coins, trophies, score bursts, casino effects; full treatment once per milestone; re-entry uses a calm glow/static state; Reduce Motion converts to static sparkles; sound never louder than other valid outcomes.

Allowed contexts: first time a wish becomes ready; first fulfilment keepsake; first Family Rules agreement. Not allowed: any Save choice; Play Now vs Save differentiation; repeated re-entry; a mandatory onboarding Save that teaches saving is the "winning" answer.

## Haptic and sound tokens {#haptics-sound}

Code home: `PauloFeedback`. Sound is optional and parent-controlled ("Sound cues"/"Haptics" toggles). Silence must never function as punishment for Play Now; Save is never louder than Play.

| Token | Haptic | Sound |
|---|---|---|
| `tapLight` | light impact | none |
| `tileClick` | rigid impact on touch-down | none |
| `shutter` | rigid impact | system capture only |
| `subjectRevealed` | success notification | none |
| `starDrop` | medium impact + delayed success | soft single "tink" if enabled |
| `pieceFill` | soft impact | none |
| `wishReady` | two staggered success events | system sound 1025, optional |
| `playNow` | light impact | same family and satisfaction as Save |
| `BreathHaptics` inhale/exhale | continuous CoreHaptics swell (rising) / ebb (falling), low intensity ~0.42, low sharpness | none |

`BreathHaptics` (its own class, not a `PauloFeedback` token) drives the [interlude](interlude.md#breathe) breathing beat: a soft touch-swell in phase with the 4s inhale / 5s exhale. No-ops without haptics hardware or when Haptics is off; never louder than a Save.

## Motion {#motion}

- One hero motion per meaningful moment; no animation solely for engagement. A recorded
  explanatory ambient loop may run while its surface is visible only when it has no input,
  variable reward or reason to wait, and Reduce Motion freezes it.
- Touch-down feedback is faster than release: ordinary controls compress in ~70ms and settle in
  ~210ms; physical choice pucks travel ~6pt in ~70ms and return with a ~220ms low-bounce spring.
  Reduce Motion keeps the immediate causal compression and replaces the spring return with a short
  ease.
- Family child magnets settle in ~240ms with very low bounce. Selection removes their stable
  resting turn and may lift 4pt; agreement content crosses in ~200ms with at most 5pt travel.
  Reduce Motion keeps selection scale and a short crossfade but removes lift and content travel.
- A newly added Little Win may enter once with an ~260ms low-bounce settle from 8pt / 97.5% scale.
  Old records stay still. Reduce Motion uses a ~160ms fade at settled geometry. Voice play/pause
  state crosses in ~180ms while progress itself follows the audio clock directly.
- The Wish Jar sticker preview materialises once in ≤280ms from 94% scale and 12pt travel. Reduce
  Motion uses an ≤180ms opacity cross-fade at scale 1 and offset 0; Reduce Transparency replaces
  the blur with an opaque dark surface.
- Springs generally response 0.4–0.5, damping 0.75–0.85; common durations 250–800ms.
- Motion explains continuity, causality, or ceremony.
- Current choreography: choice tile/token and the Home child avatar use the same 6pt press-down
  with rigid haptic; Home's open two-arc avatar doodle counter-turns and swells only 5.5% while a
  choice waits, then goes still when the chance is used · **the upright Moment's Save beat flies
  one star onto the stone the walk was pointing at and shifts the path down a rung**
  ([components.md#choice-walk](components.md), [PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md));
  the sideways card pair keeps the older springs-in-place with no star flight · Home's generated
  hero art stays still while the general-wish character and equal focused-wish bubbles wander at
  20fps through one low-amplitude unequal-axis transform function; stable phase offsets prevent a
  rigid moving cluster, while the motion stays screen-relative, non-circular and
  balance-independent
  ([PDR-0038](../decisions/0038-show-focused-wishes-as-equal-home-companions.md)) · the hero wish
  progress claims a torn sticker piece home with an overshoot snap
  ([components.md#wish-pieces](components.md)); the continuous colour veil is a default-off
  comparison under `FeatureFlags.stickerColorProgressEnabled`
  ([components.md#fill-progress](components.md)) ·
  capture reveal dissolves the background around the subject · capture handoff springs the subject
  into the sticker card · ready glow + drift on first ceremony entry only · fulfilment calms into
  the `winsDeep` keepsake · interlude breathing and subside ([interlude.md](interlude.md)).

### Reduce Motion {#reduce-motion}

Confetti drift → static sparkles. Home's general-wish character keeps its glow at one composed
anchor and every focused-wish bubble freezes at its own anchor; generated hero art is already
static.
Subject dissolve → crossfade. Capture handoff → ~0.25s
ease. Progress motion → direct state change/crossfade (wish pieces fade + de-saturate in place, no
scatter or snap). Interlude → static bubble, word-paced breath, plain crossfades. Haptics remain
optional per system and parent settings. Reduce Motion and sound-off must preserve complete meaning.

## Layout and ergonomics {#layout}

- iPhone base width 393pt; application orientation portrait (the Moment renders a rotated landscape composition — see [components.md#moment-handoff](components.md)).
- Standard margins 20–24pt.
- Home's founder-reviewed generated-art framing uses one shared compact rule: grounded art is
  approximately 0.93W, floating art 0.67W, and every companion—including the general-wish
  character and focused-wish bubbles—is 0.14W on the base phone. These are shared configuration
  defaults, not asset-specific or child-specific offsets
  (`HomeHeroConfiguration`; [components.md#wish-path](components.md)).
- Child/shared primary CTA: 64pt tall (`PrimaryPillButton`: `cta` fill, `ctaLabel` text, 20pt rounded heavy label, one dominant CTA per child/shared screen). Secondary action is a plain `inkSoft` text action. Destructive parent actions use standard semantic red only behind the parent gate; child flows never use red threat styling.
- Parent controls ≥44pt targets. Child primary controls aim ≥64pt. Child secondary selectors (swap strip) ≥48pt where layout permits, never below 44pt. Shutter 76pt. Confirmation controls ~88pt.
- The parent math gate keeps its close action near the top but separates the arithmetic challenge
  from the keypad by a height-responsive 14% gap, clamped to 88–120pt. This uses the lower half of
  a tall phone without clipping compact heights; the values live in `ParentGateConfiguration`.

## Child screen density {#density}

One primary action or decision per screen; max two major type sizes; critical meaning never carried by text, colour, or sound alone; no explanatory paragraphs in hot moments.

## Dynamic Type and assistive access {#accessibility}

Parent surfaces support Dynamic Type through accessibility sizes without clipped controls. Child ritual uses controlled large sizing but must provide accessible labels and reading order. **Rotation-based handoff cannot be the only accessible route to the choice** (currently unmet — tracked in `TODOS.md`). Colour choice always has image, label, and consequence text.
