# Choice-Moment Interlude — design & as-built spec

**Status:** LIVE · shipped 2026-07-24; rotate-hint dismissal + breath haptics 2026-07-25; breathing beat rebuilt clock-driven (parabolic body, morphing face, staggered words, continuous transition) 2026-07-25; **upright layout added behind a flag, default 2026-07-26**; motion audit pass 2026-07-27 ([#audit-2026-07-27](#audit-2026-07-27)); **③ rebuilt as a subside into the walk 2026-07-27** ([PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)).
**Read this when:** touching the Moment entry flow, breathing beat, rotate hint, or their timings.
**Update this when:** beats, timings, gating, or choreography change in `Views/Wish/MomentView.swift`.
**Code home:** `MomentView` phases + private views `RotateHintView`, `BreathingInterludeView`, `BreathingFace` (all in `MomentView.swift`). Breath haptics: `BreathHaptics` in `Support/PauloFeedback.swift`. Layout flag: `MomentLayout` / `FeatureFlags.momentLayout` in `Services/ChildProfile.swift`.

The interlude plays **between** the parent tapping "It's a choice moment" and the child seeing the Play Now / Save for Wish choice: **① Rotate hint → ② Pause & breathe → ③ Subside into the choice.** It converts a rushed, in-the-store flash decision into a calm, embodied ritual that (a) physically hands the phone from parent to child and (b) gives the child a genuine pause to re-feel their saved wish before choosing.

## Two layouts, one ritual {#layouts}

The ritual ships in two shapes, selected by `FeatureFlags.momentLayout` (`MomentLayout`). Both run the same beats, the same tempo and the same choice semantics — what changes is the canvas and whether a physical turn is asked for.

| | `.portrait` — **upright** (default since 2026-07-26) | `.landscape` — **sideways** (original) |
|---|---|---|
| ① Rotate hint | **not shown** — nothing to turn, so the ritual opens on the breath | shown every Moment, dismisses on the physical turn |
| ② Breathing | tall canvas; the companion's three canvas-relative ratios are re-tuned (`BreathingConfiguration.Portrait`) | as specified below |
| ③ Subside | the body sinks off the bottom; the wish travels to its hero slot and the walk reveals behind it | the body sinks off the bottom; the wish fades with the outgoing composition, no travel |
| Choice | **the walk** — a stepping-stone route from the wish to the Save token, two circular tokens side by side ([components.md#choice-walk](components.md)) | the card pair, side by side |
| Media size | token diameter 0.315W, clamped 96–150pt (`WishWalkGeometry`) | fixed 200pt |
| Result screens | photo/glyph above the words | photo/glyph beside the words |

The upright pair **stopped stacking** on 2026-07-27
([PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)). Stacking was never argued for — it
fell out of a tall canvas — and it introduced a reading order the side-by-side pair does not have,
whose cost nobody had measured. Placing the two tokens symmetrically about the centre line closes
that open question by deleting its subject.

**Why the upright variant exists:** founder feedback (Paul, 2026-07-26) — the turn is a real cost. It asks a parent to explain a gesture in the middle of a hot moment, it fails anyone who cannot rotate the device, and a child who does not turn the phone never reaches the choice at all. Upright, the handoff is just passing the phone, which families already know how to do.

**What upright gives up:** the turn was also a *mode change* — a physical act that marked "this is now yours to choose". Upright, the breath alone carries that transfer. Whether that is enough is the thing to watch when this is tested with families.

**Symmetry is unchanged, and is now enforced by tests.** Each layout renders both sides through one
function with no per-kind branch beyond the palette pair and the words — `MomentView.choicePair`
sideways, `WishWalkView.token` upright. `WishWalkGeometryTests` fails if the two token centres stop
being mirror images. What symmetry constrains is the two tokens **as controls**; the walk itself
runs to Save on purpose, because a Save is one step closer
([components.md#choice-walk](components.md),
[PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)).

Both layouts are live code. Retire one by deleting its `MomentLayout` case, never by leaving an unreachable branch.

## Why it exists {#why}

Jumping straight from the parent's phone to two buttons fails three ways: **no handoff** (the choice stays in the parent's hands, literally and emotionally), **no pause** (a decision made in half a second is the temptation talking), **no re-anchoring** (the saved wish is out of sight at exactly the moment it matters). Every beat is motion plus one very short word — the target user often can't read.

Cross-cutting principles (preserve these in any rebuild):

1. **Never require a tap to get through the calm beats.** The rotate hint dismisses on the physical turn; breathing and transition auto-advance. Taps invite the impulsive mashing the pause exists to slow. The parent keeps an ✕ escape on every beat, and the choice pair keeps one too (a neutral abort — see [#cancel](#cancel)).
2. **One idea per beat.** Turn → breathe → here it comes.
3. **The bubble/character is continuous** across breathe → subside — one calm companion, not three screens. It is the permitted kind of character: silent, non-evaluative, and gone off the bottom edge before the child can choose ([system.md#mascot](system.md), [PDR-0005](../decisions/0005-mascot-permitted-conversation-is-not.md)). Since 2026-07-27 the **wish** is continuous too, and by the same argument.
4. **Body before brain:** rotating and breathing are physical acts that regulate before the cognitive choice arrives.
5. **Keep feel-critical values as named constants** — the right tempo is found by testing with real kids.
6. When the daily chance is already spent, the interlude is skipped entirely — no calming breath in front of a closed door.

## ① Rotate hint {#rotate-hint}

**Sideways layout only** — the upright ritual has no turn to ask for and opens on ②.

A portrait beat addressed to the parent, in service of the child. Full-bleed `handoffTaupe #817767` with a subtle white dot texture — deliberately breaking the cream palette so the mode change is felt. A white phone illustration (amber star app icon, warm `glow` halo) rocks upright → −90° and back. Copy: serif "Turn me sideways" + "Hand the phone to *[child]* and rotate it — the next part is *[child]*'s to choose." (name-free fallback when no child name).

- **Shown every Moment.** No teaching budget — the hint is the handoff ritual itself, not a one-time tutorial, so it appears each time (2026-07-25 change; the earlier first-2-Moments cap and its persisted counter were removed).
- **Dismisses on the physical turn, not a timer.** The beat holds until `UIDevice` reports a landscape device orientation, then crossfades (0.35s) into the breathing beat. Turning the phone *is* the "continue" — there is deliberately no auto-advance timer, so the parent can take as long as they need to hand it over. The app stays portrait-locked; this reads the physical device orientation, which is independent of the interface orientation. If the phone is already sideways on entry, a 0.6s grace then advances (avoids a flash when the flow legitimately starts portrait).
- **Escape:** the ✕ aborts the whole Moment.
- Reduce Motion: phone rendered static in the final sideways pose (rotation dismissal unchanged).
- **QA note:** the Simulator can't be physically turned in headless runs, so `--paulo-debug-moment-hint` makes the hint auto-advance after ~1.5s (`InterludeMode.hintAutoAdvance`). Production never auto-advances.

## ② Pause & breathe {#breathe}

Drawn on the stage the layout provides: sideways, a landscape beat rendered inside the portrait window via the Moment's rotated composition; upright, the portrait window itself. The companion is a **broad symmetrical parabola anchored to the bottom** — `BreathingBlobShape`, not a scaled circle: its side edges, base and curvature are fixed and only the crest moves, so it never reads as a rounded rectangle being resized. A Headspace-style face rides below the crest, the wish sits behind it, and one serif word crossfades at the top.

- **Clock-driven.** Every frame is derived from elapsed time (`BreathingTimeline`) inside a `TimelineView`, never from chained `withAnimation` completions — repeated cycles cannot accumulate drift, and a tuned value takes effect on the next frame. Paused when the scene is inactive.
- **Tempo:** one deliberate deep breath — **2.12s inhale, 3.65s exhale**, plus a **0.6s hold at the top** (where "full" is felt; the word swaps inside it) and 0.25s at the bottom. These are the reference clip's own timings (2026-07-27). The shape, geometry and easing were already measured from that footage, so running them at a tempo the footage never had was the last place this beat and the thing it was derived from disagreed; it also restores the in:out ratio, **1:1.72** against the 1:1.25 that 4s/5s gave. What this gives up is the reasoning behind 4s/5s — an *instructional* tempo for a 4–6-year-old rather than an adult app's rhythm. That question is not settled, only inverted, and it is still the untested assumption in the beat (`TODOS.md`). The whole ritual is now **7.87s** entry-to-choice, against 11.10s. The hold is not frozen: across it the crest eases **2.5% of its travel back down** (`topSettleRelaxRatio`, ~5.7pt upright) and stays there, the way a chest settles at the top of a full breath. It is a monotone decay out of the peak — never a rise above it — so it cannot become the elastic overshoot this beat forbids, and the exhale resumes from the settled value rather than from 1. Set the ratio to 0 for the dead hold that shipped until 2026-07-27. One cycle, always ending on the exhale with the wish revealed. - **Asymmetric easing, never a spring.** Both phases are **S-curves** — cubic Béziers fitted frame-by-frame to reference footage ([#reference](#reference)) — and the asymmetry is in *where the speed peaks*, not in one side being eased and the other not:
  - Inhale `cubic-bezier(0.49, 0.20, 0.28, 0.98)`: a gentle ramp in, peak speed ~35% through, then a long settle. It does **not** answer instantly — a body filling with air accelerates.
  - Exhale `cubic-bezier(0.65, 0.08, 0.49, 0.86)`: almost imperceptible for the first third, peak speed ~76% through, then a deceleration into rest. The body *lands*; it does not drop.
  - Power curves (`1 − pow(1 − t, n)` / `pow(t, n)`, shipped until 2026-07-26) cannot make either shape: they only ever ease one end, which is why the old inhale lurched at the start and the old exhale hit the floor at full speed. No overshoot, bounce or elastic settle; the bottom hold means the rise into the transition starts from rest instead of reversing a moving body.
- **Silhouette:** the crest travels `travelRatio` 0.20 of the beat's height from a resting `collapsedApexRatio` of 0.70, and the top edge's centre sits `arcRiseRatio` 0.072 of the width above its endpoints — broad and calm, but curved enough to read as a body rather than a flat horizon.
- **Upright substitutes its own canvas-relative values** (`BreathingConfiguration.Portrait`, measured off the reference): resting crest **0.592H**, travel **0.26H**, arc rise **0.085W**, plus the four face offsets above. Those are the aspect-dependent values — travel is a fraction of height (much taller upright), arc rise a fraction of width (much narrower) — so the sideways numbers gave a short sweep under an over-domed horizon. Durations, curves, mouth and eye *sizes*, and the wish are shared: the same character, a different canvas.
- **The dome never changes curvature.** Arc rise is a fraction of width alone, independent of the breath — measured variation across 365 reference frames was ±2%, i.e. antialiasing, not morphing. The inflation is read from vertical travel and the face, never from a wobbling surface. (Our parabola vs the reference's circular arc differs by 0.2pt at the quarter points — not worth a shape change.)
- **Face** (`BreathingFaceShape`): two closed eyes whose lids dip **below** their endpoints — restful and inward-facing, not the cheerful upward arcs of a generic happy emoji — over a mouth that morphs from a narrow, flat exhale (82×13pt) to a wide, deep inhale smile (140×33pt, ~1.7× wide, ~2.5× deep). Eye size and spacing never change; the mouth's endpoints and control points are animated directly, never scaled. Measured against the reference, these sizes were already right to within a couple of points.
- **The face sinks into the body as it fills** — upright, the eyes drop from 43pt to 64pt below the crest and the mouth from 78 to 87, so the face *lags* the rising crest. This is the single strongest cue that the character is inflating rather than merely rising, and it was the biggest gap against the reference (we moved the eyes 7pt where the reference moves 21). Sideways keeps its own smaller offsets, tuned against a canvas a third as tall.
- **The wish** — variant `emergesOnExhale` (default): it sits behind the companion, is hidden as the child breathes in, and is uncovered as they breathe out. Breathe → state changes → the wish is there again. It resolves the shared `featured` role at `min(200pt, 0.23 × stage height, 1.15 × crest travel)`. The first two terms are also the upright Choice hero's contract, so the stage-owned sticker keeps one size across the handoff; the travel term preserves the cover/reveal mechanic on the shorter sideways canvas. A full reveal *and* a full cover both hold only while height ≤ 1.0 × travel; that result is too small to recognise as *your* toy, so 1.15 deliberately accepts partial peak coverage for legibility. The alternative variant, `attachedFromStart`, rides the surface and is always visible, with nothing to uncover ([PDR-0011](../decisions/0011-size-stickers-by-semantic-role.md)).
- **Sticker colour:** the real wish remains fully coloured through breathing and the handoff by
  default ([PDR-0032](../decisions/0032-show-stickers-in-full-colour-by-default.md)). The previous
  pooled-progress veil is retained only behind the DEBUG-comparable
  `FeatureFlags.stickerColorProgressEnabled` branch; it never changes the wish's size, position or
  ownership across the transition.
- **Breath haptics.** A soft CoreHaptics swell on the inhale and ebb on the exhale (`BreathHaptics`), on deadlines measured from the same clock so they cannot drift out of phase with the visual. The envelope is **shaped by the same curve the body is drawn with** — sampled into 12 control points, because `CHHapticParameterCurve` interpolates linearly between points and the three-point envelope shipped until 2026-07-27 could therefore only describe a straight line. A linear climb under a fitted S-curve told the hand a different story than the eye: 70% through the inhale the companion is ~93% inflated. Never louder than a Save ([system.md#haptics-sound](system.md)); no-ops without hardware or with haptics off.
- **An interrupted breath restarts.** The visual clock pauses with the scene, but the sequencing deadlines and the haptic engine do not, so a notification pulled down mid-breath used to return to a teleported companion, a permanently silent haptic, or a choice that had already advanced behind the shade. Any scene-phase change now stops the haptic and starts the beat over. A paused ritual is not a ritual, and the seconds were already being spent.
- **Surface depth** (`surfaceDepthEnabled`): a 2–3% vertical gradient, a hairline white top-arc highlight, and an ambient separation shadow derived from the body's own colour — never a card shadow.
- **No wish name or star row here.** The choice screen underneath owns those; a second live copy collided with it during the handoff.
- Reduce Motion: the body holds still at mid-breath with a calm face, the words alone pace the breath, and the handoff is a plain crossfade. The breath haptic still plays — a haptic is not motion. The still frame is drawn **once**, with no timeline behind it: sampling a clock to redraw an identical frame for ten seconds was waste, and throttling that clock to 10fps (which is what it did until 2026-07-27) quantised the one surviving crossfade into a two-step staircase. The words are ordinary animated state instead, so they fade at display rate. This path also has **no top hold** — there is no held crest to feel — so it spends the word-swap interval instead and its exhale runs to its own end; it used to inherit `topSettleDuration` from the animated timeline, which started the exhale haptic 0.5s before the word had finished changing and left 0.6s of silence at the end.

## ③ Subside into the choice {#transition}

**Rebuilt 2026-07-27** ([PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)). The
companion no longer covers the screen: after the bottom hold it **sinks off the bottom edge**
(0.62s) and the choice is uncovered behind it. There is no flat-colour hold and no lifting panel —
both are deleted, not left unreachable. The whole beat is **~0.8s**, against 1.25s.

Why a subside rather than a cover: a cover *is* a cut, mediated by a colour. The exhale has already
been moving the crest downward, so continuing past the resting point involves no direction
reversal, nothing to accelerate away from, and no intervening frame that belongs to neither screen.
It also lets the wish survive the handoff as one object rather than two that look alike.

Four things run off one clock, started at `bottomSettleEnd`:

- **The body subsides**, `cubic-bezier(1/3, 0, 2/3, 1/3)` — exactly the `t²` the old cover was
  written as. Ease-*in* is deliberate and load-bearing: the exhale decelerates the crest into rest,
  so the descent must accelerate from rest or it jerks, and the body is off-screen by ~91% of its
  travel, so the terminal velocity is never seen. An ease-out would jerk at the start *and* crawl at
  the bottom edge, which is the one part of an exit the eye does follow.
- **The tempo word clears** over 0.16s. Unlike the face it does not belong to the body and cannot
  ride down with it, and the walk's header takes its optical slot.
- **The wish travels** (upright only) from its breathing slot to its featured slot on the walk at
  the same resolved size, 0.52s,
  `cubic-bezier(0.23, 1, 0.32, 1)` — the eye is already locked to this object, so it moves on the
  first frame.
- **A reveal front sweeps down the stage** from 0.16s over 0.62s, fading each element of the choice
  in as it passes (120pt of softness, so it cascades rather than wiping). The front is paced to
  **trail the sinking crest the whole way down** — the body wipes the choice into existence rather
  than the two merely overlapping in time. This is asserted by
  `testTheRevealFrontTrailsTheSinkingCrestAllTheWayDown`; if you retune the sweep, that test is what
  tells you the two have drifted apart.

**The face is no longer faded out.** It belongs to the body and leaves the screen when the body
does. There is no flat fill left for it to float on, so clearing it early would only evaporate the
companion in open view — the exact defect the previous pass was trying to avoid.

**The wish is drawn by one view for the whole ritual** (`MomentView.wishHero`, upright, default
`emergesOnExhale`). Two views handing one sticker over cannot be made seamless: their clocks are
different — a per-frame timeline against an async deadline — and a 30fps capture of the first
attempt showed both failures plainly, a two-frame gap with the wish drawn by neither and a flash of
uncomposed art as the incoming `StickerView` built its veil. The stage owns it from the first frame
of the breath, drawn *behind* the companion so the inhale still covers it and the exhale still
uncovers it. `attachedFromStart` rides the crest and so needs the breath's clock; it stays with the
interlude and does not travel.

Sideways gets the subside but **not** the sticker travel: upright the wish's destination is a hero
slot on the centre line, which is neutral, but sideways its only home is the Save card's media well
— animating it there would be a pre-choice animation advantage on one card
([principles.md#choice-symmetry](principles.md)).

Sideways only, the **hint → breathe crossfade is blur-masked** (6pt): two opaque full-bleed fields dissolving through each other (the hint's taupe, the breath's cream) otherwise pass through a muddy 50/50 midpoint belonging to neither beat. Upright there is no such swap — the stage is simply the first thing drawn — so the mask is off.

## Aborting the Moment {#cancel}

The live choice pair carries a neutral ✕ in the child's top-leading corner (`MomentView.momentCloseButton`, `ink` on a `card` circle — matching the interlude beats' close button, rendered inside the rotated frame). Tapping it dismisses the whole Moment and **records no event** — nothing is saved, no Play Now is logged, no chance is spent. It is a plain exit, never an "are you sure?" or a guilt prompt ([principles.md#child-owns-choice](principles.md), [#anti-patterns](principles.md)): a parent may abort a mis-started Moment (wrong kid, mis-tap, changed mind) with no cost.

## Timing summary {#timing}

| Beat | Constant | Value |
|---|---|---:|
| Rotate hint hold (sideways only) | — | until the phone is turned sideways (no timer) |
| Hint → breathe crossfade (sideways only) | `transition.handoffCrossfade` / `handoffBlur` | 0.35s · 6pt mask |
| Inhale / top hold | `motion.inhaleDuration` / `topSettleDuration` | 2.12s / 0.6s |
| Top-hold settle | `motion.topSettleRelaxRatio` | 0.025 × travel |
| Exhale / bottom hold | `motion.exhaleDuration` / `bottomSettleDuration` | 3.65s / 0.25s |
| Word crossfade | `motion.wordFadeOut` / `wordGap` / `wordFadeIn` | 0.20s out · 0.08s gap · 0.23s in |
| Companion sinks off the bottom | `transition.subsideDuration` / `subsideCurve` | 0.62s · ease-in (`t²`) |
| Tempo word clears | `transition.wordClearDuration` | 0.16s |
| Wish travels to its hero slot (upright) | `transition.wishTravelDuration` / `wishTravelCurve` | 0.52s · ease-out |
| Reveal front: delay / sweep / softness | `transition.revealDelay` / `revealSweep` / `revealSpan` | 0.16s · 0.62s · 120pt |
| Entering elements | `transition.enterRise` / `enterScale` | 10pt rise · from 0.94 |

Every value above lives in `BreathingConfiguration`, including the four easing curves as CSS-style cubic-Bézier control points ([../engineering/architecture.md#tweaks](../engineering/architecture.md)). Nothing feel-critical in this beat is a literal in a view.

## What the reference measurement gave us {#reference}

The upright beat's geometry and easing are measured, not eyeballed. A 6.09s reference clip (1080×2338, 60fps, 365 frames) was analysed frame by frame: the crest tracked at the centre column, the arc sagitta at the edge columns, and the eyes and mouth isolated as connected components under the crest. The clip's canvas aspect (0.462) is within half a percent of our upright stage (0.460), so its fractions transfer directly.

| Measured | Reference | Ours (upright) |
|---|---|---|
| Crest at rest / peak | 0.592H / 0.332H | same |
| Travel | 0.260H | 0.26H |
| Arc sagitta | 0.085W, constant ±2% | 0.085W, constant |
| Eye centre below crest | 0.0496H → 0.0731H | 43 → 64pt |
| Mouth below crest | 0.0890H → 0.0992H | 78 → 87pt |
| Mouth size | 0.196W×0.015H → 0.352W×0.043H | 82×13 → 140×33pt |
| Inhale easing | `cubic-bezier(0.488, 0.203, 0.280, 0.977)` (rms 0.005) | rounded to (0.49, 0.20, 0.28, 0.98) |
| Exhale easing | `cubic-bezier(0.652, 0.080, 0.485, 0.861)` (rms 0.003) | rounded to (0.65, 0.08, 0.49, 0.86) |
| Tempo | 2.12s / 0.60s hold / 3.65s | same since 2026-07-27 (was 4s / 0.6s / 5s) |

For scale, the power curves we shipped until 2026-07-26 fit the same data at rms **0.13** (inhale) and **0.18** (exhale). Verified after the change by recording the beat in the Simulator and re-measuring with the same script: crest rest→peak lands on 0.592H→0.332H exactly.

**When re-measuring:** the Simulator records variable-frame-rate video, so extract with an explicit `fps=60` filter or every timing number will be wrong.

## QA {#qa}

- `--paulo-debug-open-moment` — skip the interlude, land on the choice pair (card screenshots).
- `--paulo-debug-moment-portrait` / `--paulo-debug-moment-landscape` — pin one layout for the run, without going through settings. (In DEBUG the layout is also switchable in parent settings → Testing → *Choice Moment layout*.)
- `--paulo-debug-moment-hint` — sideways only: run the full interlude but let the rotate hint auto-advance (~1.5s), since the Simulator can't be physically rotated. Pass alongside `--paulo-debug-open-moment` to open the ritual.
- `--paulo-debug-breathing-hud` — overlay cycle time, inhale/cover amounts, apex, mouth and wish sizes.

## What the 2026-07-27 motion audit changed {#audit-2026-07-27}

The breath itself — curves, geometry, face lag, clock-drift immunity — was audited and left alone; it is measured work ([#reference](#reference)). Everything that changed was at the edges of it:

| Was | Now | Why |
|---|---|---|
| Reveal `easeInOut` | `cubic-bezier(0.23, 1, 0.32, 1)` | the only change a parent would notice — see [#transition](#transition) |
| Haptic envelope: 3 points (linear) | 12 points sampled from the breath curve | touch and sight disagreed about how full the breath was |
| Scene pause froze the visual only | any scene-phase change restarts the beat | an interruption teleported the companion or skipped the ritual |
| Reduce Motion: 10fps timeline | drawn once; words are animated state | the one surviving crossfade was a staircase |
| Reduce Motion inherited `topSettleDuration` | its own deadlines | haptic 0.5s out of phase, 0.6s dead tail |
| Top hold frozen | settles 2.5% of travel | "full" was paused, not felt |
| Cover `t * t`, words `0.20/0.08/0.23`, outgoing `0.6`, crossfade `0.35`, lift `1.08` — all inline | all in `BreathingConfiguration` | the project's own rule ([../engineering/architecture.md#tweaks](../engineering/architecture.md)) |
| Hairline highlight blurred 0.5pt | no blur | a full-screen offscreen pass per frame, for a sub-pixel effect |

`BreathingTimeline` and `TimingCurve` are documented as pure and testable and now have tests (`BreathingTimelineTests`): phase-boundary continuity, no overshoot above the peak, the Reduce Motion path not inheriting a hold, the two words never both legible, and the cover curve reproducing `t²` to bisection precision. Do not tighten those tolerances past 1e-5 — below that they test the solver's iteration count, not the beat.

**Deliberately not done:** motion on the wish's emergence. It sits at a fixed screen position and the body slides off it, which is already physically coherent; anything added would be decoration on the exact beat [principles.md#anti-patterns](principles.md) guards against.

## Known follow-ups {#follow-ups}

Tracked in `TODOS.md`: optional soft *audio* breath cue to complement the haptic · user-test the 2.12s/3.65s tempo with real 4–6-year-olds (an adult rhythm may be too fast to follow) · tune the upright body ratios on device · user-test the walk itself (can a four-year-old count the stones?) · decide which layout ships for good (the accessibility gap the sideways ritual has is *answered* by the upright default, not closed — the sideways route still has no non-rotating path if it is chosen again).

The stacked-pair primacy question is **closed, not deferred**: the upright pair is side by side as
of [PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md), so there is no top card to pull.
