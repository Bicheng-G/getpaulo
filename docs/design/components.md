# Paulo Signature Components

**Status:** LIVE · normative component contracts, folded together with their SwiftUI implementation notes.
**Read this when:** building or modifying a reusable component (sticker, star row, choice card, capture flow, parent gate, prompts, My Trail records).
**Update this when:** a component's contract, behaviour, or code home changes, or a new signature component ships. Cite as `components.md#anchor`.
**See also:** [principles.md](principles.md) (semantics), [system.md](system.md) (tokens/motion), [screens.md](screens.md) (where components appear), [interlude.md](interlude.md) (choice-moment interlude beats).

## Theme primitives {#theme-primitives}

Centralised in `PauloApp/Paulo/Support/` — do not create screen-local approximations of established tokens:
`PauloColor` · `PauloFont` · `PauloShape` · `DotGridBackground(style:)` · `PressScaleButtonStyle` · `ClickTileButtonStyle` · `PolaroidFrame` · `StickerLabelText` · `SparkleField` · `StarGlyph` · `PauloFeedback`. Surface depth comes directly from ShadowKit's role map in [`system.md#shape`](system.md#shape), not a Paulo shadow token.

## Wish Sticker {#wish-sticker}

Code: `StickerView` (`Views/Components/StickerView.swift`), art baked by `StickerMaker`/`StickerArtComposer`.

Required: child/family photo subject with background removed; subject ~65–78% of its visual frame; adaptive white contour (normally 5–8pt at child-screen sizes; preserve thin object details); `y6 blur6.5 black@16%` shadow; fresh-capture glow and 3–4 sparkles; label in rounded heavy type with white outline and restrained shadow. The sticker represents a real wish, not a collectible grind system.

### Semantic sizing {#sticker-sizing}

Every presentation chooses `thumbnail`, `collection`, `featured` or `hero` from
[`system.md#sticker-size-roles`](system.md). `StickerView.size` remains a dominant-axis input
because rendering and transitions need the resolved point value, but a screen may not use that API
to establish another preferred size. Layout caps are allowed only at an owning geometry boundary.
Continuous flows share the resolved value: capture handoff → creation form and breathing →
upright Choice hero. Home remains on its existing presentation until that screen is redesigned
([PDR-0011](../decisions/0011-size-stickers-by-semantic-role.md)).

### Full-screen sticker preview {#wish-sticker-preview}

Code: `WishStickerPreview` and `WishStickerPreviewConfiguration`
(`Views/WishJar/WishJarView.swift`). Decision:
[PDR-0018](../decisions/0018-preview-wish-before-editing-or-redeeming.md), with its shipped
default amended by [PDR-0031](../decisions/0031-default-wish-jar-taps-to-edit.md).

When the `wishJarFullscreenPreview` feature flag is enabled, an active Jar tap promotes the same
real photo sticker from `collection` to `hero` on one
full-viewport dark frosted material. Sticker and name form an independently positioned focal
layer: funding state never moves either one. A compact safe-area-anchored bottom dock always
reserves the same readiness-and-Redeem slot, leaving it visually empty for an unfunded wish.
The preview is an inspection boundary, not a second form: Back and an empty-background tap return
to the Jar; only Edit opens `WishEditSheet`; Redeem exists only while
`WishStickerPreviewPolicy` confirms an active funded wish and hands off to the Ready ceremony.
It never spends stars itself.

No funded-star decoration, glow, idle loop or celebration effect follows the sticker into the
preview. Entry is one restrained ≤280ms low-bounce materialisation; Reduce Motion cross-fades at
settled geometry, and Reduce Transparency uses the configured opaque dark surface. The outlined
name's drawing layers collapse into one accessibility element; Back, Edit and Redeem remain
separate 44pt actions. Their compact widths, 15pt labels and low-contrast dark-glass treatment keep
them dependable without making them visual peers of the wish.

The feature flag's shipped default is off: an active sticker opens `WishEditSheet` directly. The
preview branch remains release-compiled and DEBUG Settings can enable it for evidence-driven
comparison; this is an experiment selector, not a family preference.

### Colour-fill progress {#fill-progress}

**Default off** since 2026-07-30 ([PDR-0032](../decisions/0032-show-stickers-in-full-colour-by-default.md)).
Every `StickerView` renders the real wish in full colour regardless of its requested
`fillProgress`, so the photo stays immediately recognisable through breathing and choosing. The
walk, remaining count, star chip, ledger change and ready state carry progress in the default
experience.

The former treatment remains a shipped comparison behind
`FeatureFlags.stickerColorProgressEnabled`: `fillProgress: 0…1` adds a desaturated veil above the
unfilled portion, with a top-anchored boundary and ~18% soft gradient transition. It visualises the
pooled balance relative to the focused wish target as “coming to life,” never a pie chart or
segmented score. The DEBUG Settings toggle is the only user interface for this experiment; it is
not a family preference.

Performance contracts baked into `StickerView` (respect them): `pulsesGlow` (repeatForever glow
only for a single hero sticker — a gridful measurably burns CPU), `bakesShadow` (bake the drop
shadow for scrolling grids), and the veil layer never mounts while colour progress is off. In the
enabled comparison branch, it mounts only once the fill actually moves.

**Decoration never takes a touch.** The glow halo (`size × 1.45`) and the sparkle field (`size × 1.3`) deliberately overflow the sticker's layout frame, and an overflowing view still hit-tests its whole box whatever its alpha there. Both carry `.allowsHitTesting(false)`; a hero halo had been silently swallowing every tap on Home's grown-up settings circle. Any new decorative overlay drawn larger than its subject must do the same.

### Wish Pieces — torn-sticker progress {#wish-pieces}

> **Unused since 2026-07-28.** Home was its only caller and now draws [#fill-progress](#fill-progress)
> instead ([PDR-0012](../decisions/0012-home-is-the-path-and-the-child-is-the-button.md), reasoning
> at [#wish-path](#wish-path)). Kept, not deleted, pending a decision — see `TODOS.md`.

Code: `WishPiecesView` (`Views/Components/StickerView.swift`); tear compute `StickerTearing` (`Services/StickerMaker.swift`).

The focused hero sticker, torn into `target` fragments — one per star. Each real saving milestone claims one fragment: it flies home from a scattered ghost and snaps into place, until the sticker is whole and the wish is ready. This turns an abstract balance into a physical-looking transformation of the exact object the child wants, legible with zero reading.

- **One image, tiled by masks.** Every fragment draws the *same* shared die-cut art (`StickerMaker.dieCutImage`) under a per-fragment alpha mask, so a reassembled sticker is seamless — it was never cut. Masks are dilated ~1px so neighbours overlap invisibly instead of leaving a hairline seam.
- **Silhouette-aware, hand-torn.** A seeded centroidal-Voronoi tessellation (Lloyd relaxation) over the art's alpha gives roughly-equal, blobby fragments that hug the subject; a value-noise-perturbed final pass frays the seams into torn-paper edges. Seeded from the wish name + count, so a wish always tears the same way and never reshuffles ([principles.md#reliability](principles.md)). Cached; computed off the main actor.
- **The hint layer.** Unclaimed fragments stay on screen as a dim (~0.16), de-saturated, outward-scattered ghost of the finished sticker — the whole goal shape is always visible, only dimmed. Holes read as *broken*; ghosts read as *coming*.
- **The claim.** A claimed fragment animates to identity (home, full colour) with an overshooting spring — a physical snap, not a cross-fade. Fill order is a seeded scatter, so the picture develops from all over rather than sweeping like a meter.
- **Semantics.** Renders `min(balance, target)` of the pooled ledger, derived every render and never stored ([principles.md#reliability](principles.md)) — the same honest progress the continuous fill showed. Amber stays in the star tokens below; fragments are the real photo, never a reward tint ([principles.md#amber-ruling](principles.md)). At whole, the intact `StickerView` renders (seamless) and the ready ceremony may run.
- **Reduce Motion.** No scatter, rotation, or snap spring — ghosts fade + de-saturate in place, so meaning survives without motion.

Known limitations (tracked in `TODOS.md`): the claim snap plays only when `claimed` changes while the hero is on screen, so the fly-home isn't yet seen on return from the Save result; raster torn edges (mask ~220px) can look faintly soft at very large sizes.

## Star Slot Row {#star-slot-row}

Code: `StarSlotRow` (`Views/Components/StarSlotRow.swift`).

Sizing: ≤6 slots 52pt; 7–8 slots 44pt; above 8 collapse to a large star plus numeric count; `.mini(glyphSize:)` variant for compact progress glances. Empty: dashed `inkFaint` ring on `cardWarm`. Filled: `star` fill, white glyph, restrained `starDeep` depth. Save choreography springs the changed count/slot in place — no star-flight requirement.

## Choice Card and Choice Pair {#choice-pair}

Code: `ChoiceCard`, `ClickTileButtonStyle`, `ChoicePairView` (`Views/Components/ChoiceCard.swift`).

Chunky tactile click tile: 32pt radius; dedicated surface/edge tokens; 7pt solid lower edge; one
crisp face rim and one token-relative ShadowKit gradient per choice — warm
`choiceNow→choiceNowEdge` for Play, blue `choiceWish→choiceWishEdge` for Save, with identical
direction, strength and geometry; ~6pt press-down snap in ~70ms; ~220ms low-bounce release; rigid
haptic on touch-down; image-led centre; title + short experience subtitle. The two upright circular
pucks use the same quiet translucent media well and inset scale. A real temptation photo and the
die-cut wish remain different objects inside that one stage; the no-photo Play fallback is a
Paulo-drawn rounded toy mark, not a heavy generic symbol. The gradient is mounted once at this
shared boundary through the exact fixed ShadowKit fork revision in
[PDR-0039](../decisions/0039-use-the-fixed-shadowkit-fork.md); `ChoiceKind` supplies only the
semantic endpoints under
[PDR-0041](../decisions/0041-match-choice-gradients-to-token-colours.md), preserving equal visual
weight by construction.

**Sideways ritual only** since 2026-07-27 — the upright Moment is [the walk](#choice-walk)
([PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)). Side by side, fixed 200pt media
(`MomentMetrics.choiceMediaSide`).

`ClickTileButtonStyle` takes a `ClickTileShape` (`.roundedRect(cornerRadius:)` or `.circle`); the
7pt edge and the 6pt snap are identical in both, so changing the silhouette never changes how the
press *feels*. The edge is drawn as a **background**, not a ZStack sibling: a filled `Shape` is
infinitely flexible, so as a sibling it sizes the button to whatever space is offered — invisible
inside a stack, and on a freely-positioned token it grew to fill the screen.

**Required symmetry ([principles.md#choice-symmetry](principles.md)):** this is the mechanism (**Current**) implementing the invariant *no pressure before the choice, honest difference after* — the same component and layout algorithm renders both cards; no conditional padding, glow, badge size, or animation advantage. Semantic palette and content may identify the two real consequences, but neither may gain visual weight or interaction advantage: the token-relative gradients therefore share renderer, direction, opacity, radius, offset and compositing. Consequences appear in matched neutral strips ("Enjoy this today" / "Add 2 stars"); the Save consequence uses neutral `ink` presentation before selection; amber appears only after the child chooses. Post-choice the two paths may legitimately diverge — the ledger change, ready state and a milestone ceremony report a real event ([PDR-0002](../decisions/0002-pre-choice-neutrality.md)); code must enforce the pre-choice balance structurally. A dead preview-only `ChoicePairView` does not satisfy the requirement (still unmet on the *sideways* path: `MomentView` hand-builds that pair, and it keeps the shipped pre-choice `+N★` badge violation. The upright walk satisfies it — see below. Tracked in `TODOS.md`.)

## The wish path (Home) {#wish-path}

Code: `WishPathScene`, `WishPathGeometry`, `WishPathMode`, `WishPathConfiguration`, `ChildTokenView`
(`Views/Wish/WishHomeView.swift`) plus `HomeHeroView`, `HomeHeroAsset`,
`HomeHeroImageProcessor`, `HomeFocusedWishBubbleResolver` and `HomeWishCompanionMotion`
(`Views/Wish/HomeHeroView.swift`). Decisions:
[PDR-0012](../decisions/0012-home-is-the-path-and-the-child-is-the-button.md) and
[PDR-0023](../decisions/0023-use-generated-home-heroes-and-a-general-wish-star.md), amended by
[PDR-0026](../decisions/0026-center-home-hero-and-move-ready-status-under-title.md) and
[PDR-0030](../decisions/0030-elevate-the-home-hero.md), plus
[PDR-0038](../decisions/0038-show-focused-wishes-as-equal-home-companions.md).
Screen recipe: [screens.md#home](screens.md).

Home draws the same walk the Moment draws, seen from further back, with the child standing on it.

- **One generated-art framework, not a layout per picture.** `HomeHeroAsset` catalogs Mountain
  (default) and Planet (alternate) and supplies only identity plus grounded/floating
  classification. `HomeHeroView` owns the common aspect fit, stage bounds and accessibility.
  Future art joins by adding an alpha-tight asset and catalog case; it does not acquire an offset,
  scale or animation branch. `scripts/prepare-home-hero-asset.sh` physically trims transparent
  canvas before import, while `HomeHeroImageProcessor` repeats alpha-bound cropping and caches the
  result as a packaging safety net. The alpha-tight image is centred by its rendered bounds in a
  shared compact stage at 26% of Home's drawable area, resolving near 35% of the full iPhone 17
  screen; there is no grounded foundation wash
  ([PDR-0027](../decisions/0027-lift-the-home-hero-and-center-ready-toast.md)).
  Every hero is composited at its alpha-tight image boundary and receives the same ShadowKit
  elevation 16 @12%; the transparent stage and independently moving wish star do not inherit it.
  The reviewed compact defaults resolve to approximately 0.93W for grounded art and 0.67W for
  floating art on the base phone; the distinction is a reusable presentation class, not an
  identity-specific exception.
- **The cheerful character is wishes in general.** It is not a child's specific wish sticker,
  ledger star, balance, readiness state, recommendation or control. Its glow and low-amplitude
  screen-relative wander are identical for every hero. Its reviewed 0.14W scale supports rather
  than dominates the stage. Unequal X/Y and secondary periods vary radius over time, so the path
  hovers and meanders rather than orbiting. It never hit-tests or enters the accessibility tree.
- **Real focused wishes return as equal companions.** Every presented child with a valid active
  focused/fallback wish and sticker gets one neutral bubble whose outer diameter is exactly the
  general star's 0.14W diameter. The real full-colour sticker is capped at 0.72D inside a 96%
  `card` surface with a 2pt / 76% avatar-colour rim and resting elevation 4 @8%; the rim identifies
  ownership and nothing else. Missing data creates no empty or fake wish.
  `HomeHeroGeometry.companionCenters` keeps the star's reviewed anchor, then uses one bounded
  farthest-point field to distribute the remaining bubbles without per-child or per-hero offsets.
  All companions use the star's exact periods and amplitudes with deterministic clock phases, so
  they wander independently rather than orbiting or translating as one decal. They do not
  hit-test, respond to balance/readiness, or replace the child token. Reduce Motion freezes every
  companion at its composed anchor; the general star keeps its glow.
- **Shared with the Moment, by type not by convention.** `WalkSlotting` owns how long a walk is and
  how much is behind the child; `WalkTrail` owns arc-length dot spacing; `WalkStoneView` draws the
  stones. Home borrows `maxStones` from `WishWalkConfiguration` and does **not** get its own cap.
  The two screens showing a different number of stones for one wish is
  [PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)'s first revisit trigger arriving by
  construction, so `WishPathGeometryTests` asserts the agreement across every reachable
  target/earned pair. What Home *does* own is diameters, bow depth and sample spacing — feel on a
  canvas it does not share. `HomeTrailMark` turns those stable samples into a deterministic
  neutral rhythm of beads, oblong pebbles and rare four-point ink twinkles; the tiny normal offset
  is presentation only, never random progress.
- **The curve** is the Moment's, minus its lean: both ends sit on the centre line, since Home has no
  Save token to lean toward. Same single lobe, same taper to vertical tangents at both ends, same
  rule that everything on the path is sampled from one function.
- **The hero and truthful caption are one block**, and the route starts beneath the generated
  stage rather than crossing its art or text. With one child, the caption may still say
  "**3** more to *[wish]*" or "*[wish]* is ready!" because the route belongs to that child; the
  small focused-wish bubble restores recognition on Home, while the Moment introduces the same
  real sticker at its larger `featured` role. With several children, equal bubbles identify each
  child's focused wish but never carry progress, readiness or route position; the generated hero
  and route stay family-level.
- **The token is the button.** One diameter, one halo, one press for every child, by construction —
  `WishPathGeometryTests` fails if sibling tokens stop being the same size, evenly spaced, or
  centred as a group. The default visual diameter is exactly 30% smaller than the original Home
  puck (width ratio `0.30 → 0.21`, clamps scaled with it); supported phones remain above a 64pt
  child target. Its circular face, lower edge and touch-down travel use the same
  `ClickTileButtonStyle` as both choice pucks, while its shadow treatment is explicitly
  `.floating` (ShadowKit elevation 8) rather than the choices' two-colour treatment. Avatar colour
  and optional bounded profile photo remain inside that shared material, with the name beneath. Amber is
  **not** used on the token: a star badge on an avatar is amber dressing up a control, which
  [system.md#amber-usage](system.md) denies. The affordance is the halo plus the subtitle.
- **The halo breathes only when a choice is actually waiting.** It is an open owner-colour doodle,
  not a focus ring or glow: two short arcs at different spreads, one outlined end bead and one
  four-point twinkle counter-turn while the whole mark makes one shallow breath. When today's
  agreed chances are spent the doodle goes still — no lock, no countdown, no implied wrongdoing
  ([principles.md#family-rules](principles.md)). The Moment still opens, onto its own warm
  [Chance Used](screens.md#chance-used) state. Reduce Motion keeps the ring and drops the pulse.
  The halo is wider than the token it decorates and so must never hit-test
  ([../engineering/architecture.md#ui-conventions](../engineering/architecture.md)).
- **Several children put nothing on the route.** `.route` mode draws only the neutral
  bead/pebble/twinkle rhythm — no semantic stones. See [screens.md#home](screens.md) for the full
  multi-child recipe. Wish bubbles may identify siblings above the hero only because their
  footprints, movement and material are equal; no bubble position means progress or standing.

## The choice walk {#choice-walk}

Code: `WishWalkView`, `WishWalkGeometry`, `WalkStone`, `WalkRevealFront`, `WishWalkConfiguration`
(`Views/Components/ChoiceCard.swift`); reward beat in `MomentView.runWalkSaveChoreography`.
Decision and rationale: [PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md).

The upright Moment. The route from the child to the wish is drawn as a line of stepping stones, so
what the child reads is a distance rather than a fraction. Earned stars also collapse into one
`★ N` chip (hidden at zero: there is nothing to collapse, and it would be the one number on the
screen reporting what has *not* happened).

- **Header:** "**4** more to *[wish]*" — big rounded count, `inkSoft` remainder, one line.
- **Wish hero:** the same sticker that was just breathed over, 0.38W, on the centre line. Owned by
  the stage, not by this view ([interlude.md#transition](interlude.md)).
- **Stones:** steps still to take are dashed `inkFaint` rings on `cardWarm`; the **next** one is
  larger and ringed in amber with a hollow star — where a star *would* go, exactly as
  `EmptyStarSlot` already does. Steps already taken are quiet flat amber discs: ground covered, not
  events. Only a star that has *just* landed gets a full `FilledStarSlot`, and the stage draws that
  one, so it can fly in and hand over ([system.md#amber-usage](system.md)).
- **The walk is as long as the wish, not as long as what's left.** Stone count is the target, capped
  at `maxStones` (**4** since 2026-07-27 — six sat close enough to read as a string of beads rather
  than a route; past the cap the topmost stone becomes a `+N` marker, and the drawn stones plus that
  marker always add back up to what is left). The stones nearest the child are
  the walked ones; the boundary between walked and unwalked is the next step. Three consequences,
  all of them the point: the path is always exactly full, its stones never move for the life of a
  wish, and a Save fills one stone and advances the marker instead of rearranging the route. The
  defect this replaced drew three stones huddled by the token under a screenful of empty paper.
- **Tokens:** two circles of identical diameter (0.315W, clamped 96–150pt), identical media box,
  type, edge and press, placed symmetrically about the centre line. **No `+N★` badge** — what a star
  is worth belongs to the family rule, and what is left to walk is already on the path. When tokens
  clear for a consequence beat they become both untappable and accessibility-hidden; an invisible
  choice must not remain actionable to VoiceOver.
- **The path runs from the wish to the Save token**, with the `★ N` chip between them. Deliberate
  ([PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)): a Save *is* one step closer, so the
  line states a fact, and [principles.md#child-owns-choice](principles.md) explicitly permits Paulo
  to say what it is for. What may not happen is Play Now being drawn as loss or a wrong turn.
- **The walk is a curve, and everything sits on it.** `WishWalkGeometry.pathPoint(at:)` is the single
  source: stones are sampled from it, and trail dots are spaced by **arc length** along it with a
  clearance held around each stone. Two properties make it read as drawn rather than plotted — the
  lateral drift uses a smoothstep, so the curve leaves the wish going straight down and settles onto
  the token going straight down; and the bow is a function of `t`, not of stone index. *Alternating
  an offset per stone cannot describe a curve at all* — there is nothing defined between the stones
  to draw, which is why the first implementation put a kink at every stone and divided its dots per
  segment, crowding the short stretches and starving the long ones. One lobe is the default: more
  slalom, and the swings compound with the drift until the middle straightens into a diagonal.
  `testTheRouteIsContinuousFromTheWishToTheToken` and `testTrailDotsAreEvenlySpacedAlongTheCurve`
  hold both ends of this.
- **Symmetry is asserted, not reviewed.** `WishWalkGeometryTests` fails if the token centres stop
  being mirror images, if the walk stops leaving from under the wish or arriving at Save, if the
  drawn stones stop accounting for every remaining star, if the path stops being full, or if a stone
  moves when a star is earned.
- **One renderer, including onboarding.** The parent demo composes this same `WishWalkView` and
  `WishWalkGeometry` with simulated callbacks ([PDR-0019](../decisions/0019-orient-the-parent-and-preview-the-real-moment.md));
  it does not maintain a second card design that can drift from the live Moment.

**Post-choice Save beat** (~2s, same geometry, no new screen): tokens clear at +0.30s · the star
flies from the token the child pressed to the stone the walk was pointing at, landing at +0.78s and
filling it · the chip counts up · when `stickerColorProgress` is enabled, the wish colours one
segment further at +0.92s · the marker
advances one step at +1.20s · dismiss at +2.0s. Nothing on the path moves — the count is fixed by
the target, so taking a step is a stone filling, not the route rearranging. It reports a real ledger event, which is what makes post-choice
difference legitimate ([PDR-0002](../decisions/0002-pre-choice-neutrality.md)); it is not a
celebration — nothing is thrown, nothing loops, and Play Now is never described as having lost
anything ([principles.md#anti-patterns](principles.md)). This overrides
[system.md#motion](system.md)'s "no star flight". Reduce Motion applies the same events as direct
state changes, with no flight and no shift.

## The Moment handoff {#moment-handoff}

The app stays portrait in both layouts ([interlude.md#layouts](interlude.md)). **Sideways** (`MomentLayout.landscape`): the Moment renders a wide side-by-side composition rotated 90° inside the portrait window (`MomentView`); the physical turn acts as a handoff cue — reinforced by the [interlude](interlude.md), whose rotate hint dismisses *on* that turn — but it is not the developmental mechanism and must never become a high-friction dependency. **Upright** (`MomentLayout.portrait`, the default since 2026-07-26): no turn, no hint; the handoff is simply passing the phone, and the stage is the window itself.

Required in both: chrome recedes; one decision; two large equal choices; only what the child needs to read the trade-off — the walk's remaining count and star chip upright, a small focused-wish glance sideways — plus an optional temptation swap strip; a neutral abort ✕ ([interlude.md#cancel](interlude.md)); no money overlay; no parent coaching visible to the child.

## Capture → sticker flow {#capture-flow}

Code: `CaptureFlowView`, `CameraViewfinderView`, `SubjectRevealView`, `SubjectCorrectionView`, `BackgroundDissolveShader`. One continuous visual transformation, not disconnected screens:

1. **Live viewfinder** — camera stays mounted throughout capture and confirmation; white rounded corner guides; 76pt shutter with angular pastel ring; gallery and close; ≤14% black overlay where needed.
2. **Subject-aware reveal** — freeze without a scene jump; sample a neutral ground warmed ~16% toward `paper`; preserve pixel alignment; dissolve the background around the subject; restrained silhouette shadow and contour highlight; honest processing state when segmentation isn't ready.
3. **Handoff into sticker** — confirmed subject springs into the sticker card; die-cut border crossfades only after the subject enters; never a tiny subject in an oversized white border.
4. **Automatic naming** — a suggestion may fill an untouched field and may never overwrite a typed field (`WishNameDraft` rule). Honest states ("Looking at your photo…"), labelled as a guess, small number of alternatives, free renaming, no certainty claims.
5. **Repair paths** — direct, specific actions: **Fix cutout** (manual crop + re-segmentation), **Use everything in the photo**, **Retake**. Never a vague "Not quite right?" pill or intermediate menu.

## Parent Micro-Prompt {#parent-micro-prompt}

A private one-sentence cue tied to the immediate context (e.g. "State the trade-off once. Do not keep selling the saving option." · "Reduce words first. Reflection comes after regulation." · "Describe what they did, not what kind of child they are."). Dismissible; must not delay the child ritual. See [principles.md#private-parent-support](principles.md).

## Strategy Card {#strategy-card}

An executable action, not motivational copy. Initial set: move away from the temptation · look at the wish · choose another activity briefly · ask a trusted adult to help hold the plan · name what is wanted and pause. Show one or two only when help is requested. Track chosen strategies to support fading, not to score willpower.

## Name–Need–Next recovery {#name-need-next}

Used after disappointment or regret, never as a mandatory post-choice flow: **Name** the conflict without assigning an emotion as fact → offer a small set of **Need** options → return control when the child is ready (**Next**). Example: "You really wanted both. Do you want a hug, a quiet moment, or to tell me? We can decide what happens next when you're ready."

## Family Agreement and My Plan {#family-agreement}

Code: `FamilyTabView`, `FamilyRulesView`, `FamilyAgreementStore`,
`FamilyPlanStore` (`Views/Kids/KidsTabView.swift`, `Views/Onboarding/FamilyRulesView.swift`,
`Services/ChildStore.swift`). Decision: [PDR-0007](../decisions/0007-family-is-a-promise-surface.md).

The agreement is a warm physical artifact, not a settings card: one self-sizing, softly rounded
white sheet with a shallow offset backing and restrained hand-cut tape on the dot-grid “fridge.”
It carries the scoped child's name, the daily Paulo boundary, explicit Play Now/Save symmetry, the
reciprocal grown-up promise, the agreement date/revision, and circular family magnets along its
lower edge. A magnet's resting imperfection is stable to child identity, never array position or
random redraw; selection lifts it and brings it level. Selecting a magnet changes which per-child
agreement is shown; it never creates a global child mode or compares children. The Family settings
button is parent-gated.

**My Plan** is a single optional 3–6 second child-authored process cue (10-second hard cap). Its
visual is a small lilac voice-note paper slip within the agreement: play/pause or microphone
circle, title, duration when recorded, and a generic waveform. Do not add helper copy asserting “in [child]'s
voice,” “this device,” transcription, emotional state, or compliance. It never autoplays, never
becomes setup debt, never binds the Save outcome, and retaking replaces the previous take rather
than creating a history. Playback is available on Family and, as an optional action, on Chance Used;
the normal Moment remains unchanged.

## Little Win / Mastery Record {#little-win}

The record type; its surface is [My Trail](screens.md#little-wins). Broader than completed wishes:
preserves traceable evidence of capability (what happened, what was difficult, what helped, what
changed, what to try next; optional photo/drawing/sticker/parent sentence/5–15s voice note).
Records are grouped by local calendar day in one stable scrapbook grammar. A fulfilled wish is a
layered keepsake print with its `featured` sticker, concrete first-person evidence and earned-star
metadata; a voice note is a compact memo strip with visible playback progress and waveform; a photo
note is the photograph on a tinted stage, with no caption furniture around it. Only the fulfilled
wish carries stars — the other two never borrow them. Palette, paper turn and material variation
resolve from record identity and kind, never list position or random redraw.

Rules: no daily quota; no global trait label; the event need not be a Save choice; automatic
creation produces a **candidate**, not a permanent record without review; one generated reflection
question maximum. A record a person adds by hand gets a review beat before it is written, since
nothing on this surface can yet be removed. Adding a record may use one short causal settle. Beyond that, motion on this
surface must be something the child caused — see [#trail-route](#trail-route) and
[PDR-0035](../decisions/0035-my-trail-may-be-worth-coming-back-to.md). Known gaps (tracked): removal of an added record; source-event
linkage for voice/photo records; detail/revisit state before share/export; preserve original
evidence beside any AI summary.

### My Trail's route {#trail-route}

Code: `TrailTimelineGeometry` + `HomeTrailMark.marks(along:baseSide:appearance:indexOffset:)`.
Home's path recreated as a vertical timeline: the same `WalkTrail` arc-length walk, the same
bead / pebble / twinkle vocabulary, and the same appearance instance
(`WishPathConfiguration.trail`), so one tuning session moves both routes and a pebble is the same
pebble on both surfaces.

It is resolved **per row**, because a scroll has no canvas to resolve a whole route against. Each
row draws `sin(π·t)` across its own height: zero at both edges, so consecutive rows always meet on
the rail's centre line, and with the bow direction alternating by row index they meet at the same
*angle* too — a continuous curve assembled from pieces that never had to know about each other.
Short rows taper the bow instead of hooking it. A per-row rhythm offset keeps the mark pattern
running down the page rather than restarting, and dropping a twinkle in the same spot under every
card. An owner avatar becomes a `WalkObstacle`, exactly as a stone does on Home.

The route may never carry a stone, a number or amber: the moment it counts something it stops being
a way through time and becomes a second progress display ([principles.md#amber-ruling](principles.md)).

It draws itself in once per row, as that row first comes into view — marks staggered downward, the
stagger capped so a tall card finishes in the same time a day label does, scaling from `0.55` rather
than from nothing. The flag is latched per row: scrolling back up does not replay it. Reduce Motion
keeps the appearance and drops travel and scale
([PDR-0035](../decisions/0035-my-trail-may-be-worth-coming-back-to.md)).

## Contribution Story {#contribution-story}

Future/shared reflection for ordinary family contribution, captured in under ten seconds: photo/icon + one concrete effect sentence + optional child voice. Prefer "You put the books back, so everyone could find them." No star or generic badge for basic family contribution ([principles.md#three-channels](principles.md)).

## Parent Gate {#parent-gate}

Code: `ParentGateView`. Two-digit plus one-digit sum crossing ten; custom keypad; error shake and brief cooldown; no permanent lockout. Use for money settings, target changes, ledger correction, export/share, ownership transfer, data deletion, and other adult actions. Never a punitive challenge or child intelligence test.

## Maker Signature Card {#maker-signature-card}

Code: `PauloDeveloperSignatureFooter` in `ParentSettingsView`, composed with
`DeveloperSignatureKit` 1.3.0. This informational maker credit is the literal final item in the
parent-gated Settings scroll: host app icon, Bicheng Gu's supplied circular portrait, **Bicheng
Gu**, **Made with love**, one reflective maker note, and a generated vector rendering of the name.
It is provenance, not promotion: no link, contact action, analytics, engagement prompt, badge, or
child-facing placement.

The package owns the card's inner image/name/copy/signature composition and one-shot visibility
animation. Paulo owns the outer paper surface, spacing, shadow, English-first semantic copy, image
asset and validation. The signature is decorative; the card's text reads as one coherent
accessibility element. Reduce Motion must show the complete signature immediately and must not
replace the content with another effect. Do not loop or add celebration motion.

**Experimental style trial (2026-07-29):** `ProgrammaticSignatureView` uses package developer blue,
2.8pt line width, 0.28 slant, -0.035 character spacing, 0.9 roundedness, 0.4 baseline wobble,
0.35 scale variance, 1.08 flourish strength, 1.02 uppercase emphasis, 1.1× replay and deterministic
seed 87. Package defaults retain 0.34 word spacing and 0.18s delay. The values live in
`MakerSignatureConfiguration` as compiled defaults; ink and seed stay fixed so a geometry
comparison cannot silently change the hand's identity.

## Parent Ledger {#parent-ledger}

Code: `ParentLedgerView`. Every balance-changing action is auditable; corrections are additive events; undo-last where safe; history in plain language. Child-facing surfaces show the trustworthy result, not accounting complexity. Implementation invariants: [../engineering/architecture.md#ledger-invariants](../engineering/architecture.md).

## Choice-Moment Interlude {#interlude}

The rotate hint (sideways layout only), breathing beat, and the subside that uncovers the choice behind the sinking companion. Full spec, rationale and the two layouts: [interlude.md](interlude.md). Code: private views in `Views/Wish/MomentView.swift`.
