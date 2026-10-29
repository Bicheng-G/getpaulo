# Paulo Screen Recipes & Developmental Bands

**Status:** LIVE · normative screen-level recipes plus the age-band context they serve.
**Read this when:** working on a specific screen or flow (onboarding, home, Moment, results, Jar, My Trail, Kids, ledger, privacy).
**Update this when:** a screen's recipe changes or a new screen ships. Cite as `screens.md#anchor`.
**See also:** [principles.md](principles.md) · [system.md](system.md) · [components.md](components.md) · [interlude.md](interlude.md).

## Developmental bands and interaction modes {#bands}

Primary target ages **4–8**; age nine stays technically compatible but never drives defaults. Birthdays don't determine readiness — complexity is enabled gradually by the parent and observed behaviour ("capability override").

- **~4–5:** concrete images and physical outcomes; strong parent co-use; two choices at a time; short horizons; minimal reading; voice/pointing/movement/numbers over explanation; progress as stars, objects, visual filling — not percentages. Parents operate setup; children own the visible choice.
- **~6–8:** simple planning and comparison; child-created or edited wishes; short strategy reflection; simple real-money translation where the family already uses money meaningfully; multiple wishes with limits; value projects; increased child control with fewer prompts.

Three interaction modes:

- **Parent mode — prepare and maintain:** rules, money settings, targets/ledger, corrections, profiles, data/privacy, private coaching. Text density and standard controls permitted; parent gate for sensitive actions.
- **Child handoff mode — practise:** Who's choosing?, the interlude, Moment of Choice, immediate consequence, brief strategy selection, first-time ceremonies. Image-first, minimal, emotionally neutral.
- **Shared reflection mode — integrate:** My Trail, contribution stories, brief voice/photo memories. Used together; not a hidden evaluation dashboard.

## Welcome {#welcome}

Warm paper and dot grid; restrained sticker fragments; 64pt coral CTA; concise privacy/legal note.
This is a **parent value bridge**, not a campaign page: state the concrete job (pause a real
temptation and hand the choice to the child), name both Play Now and Save for Wish, and state the
durable benefit (the family no longer keeps promises in its head). Avoid claiming waiting
guarantees future success ([PDR-0019](../decisions/0019-orient-the-parent-and-preview-the-real-moment.md)).

## Profile and child setup {#profile-setup}

Parent-operated and explicitly phrased around **your child**: one question per screen; name,
primary age 4–8, then avatar. Avatar offers an optional recognisable family photo plus the Morandi
owner colour; the colour remains the fallback and semantic owner cue when a photo exists. Photos
use the existing metadata-free, centre-cropped 512px persistence boundary. Multiple children remain
available after onboarding; capability-sensitive settings stay parent-controlled.

## Family Rules {#family-rules-screen}

Onboarding sequence: Welcome → Child setup → Family Rules → Demonstration. Address the operating
parent plainly: decide what real situations count and how many chances exist before the first
Moment, with an explicit explanation that this is what keeps stars and family promises meaningful.
The family still confirms star meaning, designated chances, and the ready promise together.
Shared-agreement language, never rules imposed on a "good" child. A first agreement may use the
bounded ceremony drift.

## Onboarding demonstration {#onboarding-demo}

Teach mechanics to the parent through a simulated real interaction — but never that Save is the
correct answer. Start with the three-part operational loop: a real temptation happens, the child
sees two equal choices, and Paulo remembers the consequence. Then render the **current upright
Choice Moment** through the shared `WishWalkView`, including its wish hero, walk and equal circular
pucks ([PDR-0019](../decisions/0019-orient-the-parent-and-preview-the-real-moment.md)).

Both consequences are inspectable. Tapping Play Now explains that the live Moment ends warmly and
nothing is lost; it does not fabricate a play event or branch into a fake result. Tapping Save for
Wish runs the existing target-1 guided practice and future-ready preview. The sticker remains full
colour by default; the DEBUG `stickerColorProgress` comparison adds the former colour-fill beat.
The exit
restores that either way belongs to the child in a real Moment. This remains guided practice under
[PDR-0003](../decisions/0003-onboarding-demo-is-guided-practice.md): helper copy may not describe
the preview as an autonomous child choice, present ready as praise for Save, or add full confetti.

DEBUG parent Settings may replay the complete onboarding sequence as a non-destructive visual
preview. Replay keeps the same screen recipes and transitions, pre-fills the first stored child,
and returns to the existing app; it must not change the profile mirror, agreement revision,
temptation library, wishes, ledger, My Trail, or real onboarding-complete state.

## Family Home / Wish {#home}

Home is the path, and **the child is the button** ([components.md#wish-path](components.md),
[PDR-0012](../decisions/0012-home-is-the-path-and-the-child-is-the-button.md)). Greeting, then
"Tap yourself when it's time to choose" — the only instruction on the screen; there is no primary
CTA pill. A generated-art stage heads the route
([PDR-0023](../decisions/0023-use-generated-home-heroes-and-a-general-wish-star.md),
[PDR-0026](../decisions/0026-center-home-hero-and-move-ready-status-under-title.md),
[PDR-0038](../decisions/0038-show-focused-wishes-as-equal-home-companions.md)): **Mountain**
is the default and **Planet** is a parent-selectable alternative. The same shared renderer
alpha-trims, aspect-fits and centres every catalog asset by its visible bounds. Its shared optical
centre sits at 26% of the drawable Home canvas—approximately 35% of the complete iPhone 17
screen after the real greeting ([PDR-0027](../decisions/0027-lift-the-home-hero-and-center-ready-toast.md)).
Transparent edges render directly with shared ShadowKit elevation 16 @12% mounted on the
alpha-tight artwork ([PDR-0030](../decisions/0030-elevate-the-home-hero.md)); there is no
foundation blend and neither the stage nor wish star inherits the shadow. On the base phone, the reviewed compact
composition is approximately 0.93W
grounded / 0.67W floating / 0.14W character, leaving the paper and route as real participants
rather than turning the hero into a backdrop. A cheerful glowing character star means wishes in
general and slowly wanders at one screen-relative anchor independent of the selected hero. It does
not orbit, encode state or hit-test. One equal star-sized bubble per child restores the child's
real focused/fallback wish sticker: neutral card, full-colour sticker, thin owner-colour rim, no
progress/readiness response. The star and bubbles share one bounded distributor and the same slow
wandering function with stable phase offsets. The route descends from this whole hero block, and
the child's own token stands at the near end. Bubbles remain noninteractive; tapping your own token
opens your Moment, while a funded wish opens the ready ceremony instead. A *second* funded wish
appears as a horizontally centred compact tappable toast directly under the subtitle; it opens
that wish's ready ceremony without auto-presenting or reserving layout space. The toast may overlap
decorative hero space and never changes the hero's position.

**Single-child:** the route is that child's own walk — the same stone count, walked/unwalked split,
amber rule and `+N` marker as [the choice walk](components.md#choice-walk), shared in code and
asserted by `WishPathGeometryTests`. One number, as text, under the hero:
"**3** more to *[wish]*". That child's real sticker first appears as a small recognition bubble on
Home, then enters in full colour at its larger `featured` role with the Moment
([PDR-0032](../decisions/0032-show-stickers-in-full-colour-by-default.md)).

**Multi-child:** the tokens cluster together at the near end, evenly spaced and identically sized,
and the route is drawn as one deterministic neutral rhythm of beads, oblong pebbles and an
occasional four-point ink twinkle — **no semantic stones, no amber, no marker**. Siblings placed
along one axis is a leaderboard however the route marks are coloured
([principles.md#multi-child](principles.md)). Above the hero, one equal bubble per valid child
shows that child's focused/fallback sticker. The bubbles share size, material, depth and motion
amplitude; their position is a non-semantic constellation anchor, never standing. The generated
hero, general-wish character and route remain family-level.

**States:** *saving* — full route, token breathing · *ready* — the route is complete, caption reads
"[wish] is ready!", and the tap goes to the ceremony; the hero, character and wish bubble do not
change, brighten or celebrate · *chance used* — the token stops breathing (the Moment still opens, onto
its own warm [Chance Used](#chance-used) state) · *no valid focused wish* — no hero and no route.

The child token's default visual diameter is 70% of the first path build. Its waiting affordance is
an open two-arc owner-colour doodle with one end bead and one tiny twinkle; it breathes through
shallow scale/counter-turn only. Reduce Motion keeps the same static doodle and freezes the
general-wish character and every wish bubble at their composed anchors while preserving the
character's glow.

## Who's choosing? {#whos-choosing}

**Only the Siri shortcut reaches this now** — Home asks the question with the child's own token instead ([#home](#home)), but the shortcut enters the ritual without passing Home. Large avatar/name choices; no balances or performance metadata; proceeds immediately into the interlude/handoff ritual.

## The Moment {#the-moment}

Entry runs the [interlude](interlude.md) in one of two layouts ([interlude.md#layouts](interlude.md), `FeatureFlags.momentLayout`).

**Upright** (default): breathing beat → the companion sinks off the bottom edge, the wish travels up into its hero slot, and **the walk** is uncovered behind it ([components.md#choice-walk](components.md), [PDR-0006](../decisions/0006-the-choice-moment-is-a-walk.md)) — a stepping-stone route from the wish down to the Save token, as long as the wish's target with the near stones drawn as ground already covered, earned stars collapsed into one `★ N` chip between the walk and the token, and two circular tokens side by side. A Save lands its star on the next stone and advances the marker one step, then returns (~2s, same geometry, no new screen). The sticker remains full colour throughout by default; the `stickerColorProgress` comparison also advances its colour boundary.

The breathing wish and upright Choice hero share the `featured` sticker role (200pt nominal, one
short-stage cap); the smaller copy inside the Save token is `thumbnail` (80pt nominal). This is one
continuous sticker across the handoff, not two views approximating the same scale
([PDR-0011](../decisions/0011-size-stickers-by-semantic-role.md)).

**Sideways:** rotate hint (shown every Moment, dismisses on the physical turn) → breathing beat → the same subside, uncovering the older choice pair side by side in a wide composition rotated inside the portrait app.

Both carry soft breath haptics. Required either way: two choices of identical size, media, type and interaction weight; temptation image and focused wish sticker; optional temptation swap strip; a neutral ✕ to abort with no event recorded; no money; nothing amber, badged or glowing attached to one of the two choices before the child chooses; no explanatory paragraphs. The parent privately receives at most one cue before handoff. When the daily chance is already used, the interlude is skipped and [Chance Used](#chance-used) shows instead.

## Play Now result {#play-now-result}

Warm confirmation; state the chosen consequence without judgement; haptic/sound satisfaction equivalent to Save; no progress loss; no "are you sure?" or regret prompt; return offline quickly. Example: "You chose this today."

## Save result {#save-result}

Apply the ledger event; spring count/slot change in place; keep the real sticker in full colour;
state consequence, not character praise ("Two stars joined your promise."); full ready ceremony
only on the first transition to ready. The default-off `stickerColorProgress` comparison may reveal
the next colour fraction, but the ledger event and walk remain the authoritative consequence.

## Chance Used {#chance-used}

Replaces the choice pair when the pre-agreed daily limit is reached. Warm neutral surface; state the
family agreement; no accusation, lock, broken streak, or red styling; return offline. If that child
has an optional My Plan recording, offer one explicit play/pause action with a generic waveform;
never autoplay it. With a plan, wait for **Done** rather than dismissing while audio may be playing.
Without a plan, the calm automatic return remains. Example: "Today's Paulo choice is complete. See
you next time."

## Ready Ceremony {#ready-ceremony}

First entry: fully saturated `hero` sticker (280pt nominal); glow, tinted dots, short serif line; bounded `ceremonyDrift`; optional `wishReady` feedback; coral "Take a photo of your prize" and plain "Not yet — I'll wait". Re-entry: calm ready state, no repeated confetti or sound burst.

## Fulfilment capture and keepsake {#fulfilment}

Capture the real fulfilled object/moment; `winsDeep` full-screen keepsake beat; first-person evidence-based line; consume the agreed stars transparently; retain the remaining pooled balance; create a completed-wish Little Win candidate on My Trail.

## Wish Jar {#wish-jar}

Two-column die-cut `collection` sticker grid (160pt nominal); drag to reorder; filter by child/date;
owner chips; optional full-screen focal preview; **no star rows per wish**
([principles.md#pooled-ledger](principles.md)).
The active Jar shows focused and funded wishes. A funded sticker receives no surrounding star,
sparkle, glow, particle or motion treatment; its plain amber status reads **Ready to redeem**
([PDR-0040](../decisions/0040-keep-funded-wish-jar-stickers-plain.md)). Archive owns recoverable
inactive wishes, and My Trail owns fulfilled memories. A memory and planning space, not an
inventory collection game.

By default, an active sticker tap opens the management sheet directly. The release-compiled
`wishJarFullscreenPreview` feature flag can instead open
[the full-screen preview](components.md#wish-sticker-preview): semantic `hero` art and its name at
one stable focal coordinate over dark frosted material. A compact bottom dock keeps Back/Edit near
the safe area and permanently reserves the same conditional Redeem slot, so funding never shifts
the wish. Empty background and Back dismiss to this grid. Edit presents the management sheet;
closing it returns to the preview. Redeem appears only when the pooled ledger still funds the active
wish, then dismisses the preview before opening the established Ready ceremony
([PDR-0018](../decisions/0018-preview-wish-before-editing-or-redeeming.md),
[PDR-0031](../decisions/0031-default-wish-jar-taps-to-edit.md)).

The active grid excludes archived wishes. Its header opens a dedicated Archive: newest archived
first, washed but still recognisable sticker, owner and one plain status line. Empty Archive says
that wishes remain safe until restored or permanently deleted. New-wish capture is not in this
header; on iOS 18+ it is the native detached Camera beside the four persistent destinations
([PDR-0010](../decisions/0010-use-native-trailing-role-for-capture.md)).

## Wish lifecycle / edit sheet {#wish-edit}

Active wishes reach this sheet directly by default or through the enabled preview's explicit Edit
action; Archive rows remain management-first. The management header uses the `hero` role, while the
active Jar remains `collection` ([PDR-0037](../decisions/0037-make-wish-management-a-hero-surface.md)).
For a funded active wish, its Ready action dismisses management before the Jar raises the existing
Ready ceremony. Rename freely; set focus;
archive; transfer ownership; parent-gated target change. Archive is the
only removal action on an active wish: it clears an invalid focus pointer but preserves the wish,
sticker, audit history and pooled stars (“Every saved star stays yours” at the decision point).
Inside Archive, Restore to Wish Jar is primary; permanent deletion is secondary and requires
irreversible confirmation. Transfer changes wish ownership, not another child's ledger. Target
edits explain their consequence and create an audit record
([PDR-0010](../decisions/0010-use-native-trailing-role-for-capture.md)).

## My Trail {#little-wins}

*(Named Little Wins until 2026-07-30, then briefly Diary; the anchor is deliberately unchanged so
the existing citations still resolve. [PDR-0033](../decisions/0033-little-wins-becomes-the-diary.md)
for the surface, [PDR-0034](../decisions/0034-name-the-surface-my-trail.md) for the name.)*

Group entries by local calendar date in newest-first sections. Three kinds coexist without becoming
one currency: a fulfilled-wish keepsake uses a `featured` sticker, concrete first-person evidence
and earned-star metadata; a voice note uses a compact memo strip with an outer playback-progress
arc, waveform and duration; a photo note is a photograph on a tinted stage and nothing else. All
share a layered paper grammar, but palette and restrained turn are stable to entry identity rather
than list position, and only the fulfilled wish may show a star.

**One route runs down the left of the whole scroll.** It is Home's path, not a lookalike: the same
arc-length walk and the same bead / pebble / twinkle rhythm, drawn one row at a time so a scroll of
unknown height never needs measuring. It begins under the title and ends in a short tail run past
the last entry. It carries **no stones, no count and no amber** — this is Home's `.route` mode, a
way through time rather than a measure of anything ([#amber-ruling](principles.md)). Every row of
the page draws its own piece, including the title and the day labels: a gap in the list would be a
gap in the path, so row air lives inside rows, never in the stack's spacing.

Each entry's owner appears as a round avatar sitting **on** the route beside its card, and the route
clears it the way Home's trail clears a stone. This is attribution, not comparison: there is no
per-child count, no grouping by child, and no ordering other than time
([#multi-child](principles.md)). An entry recorded before ownership existed keeps a neutral avatar
rather than being assigned to a guess. Cards are narrowed to make room for the rail; that trade —
a smaller keepsake sticker for a continuous surface — is the one PDR-0033 accepts and names a
trigger for reversing.

The prompt sits **above** the entries and says **Add a note** / *What did you do today?* — a
question about the day, not a request for an achievement, and never a daily task or quota. The row
carries two targets, one tap each: the child's voice note is the row itself; a grown-up's photo is
the smaller control beside it. No chooser menu stands between the tap and the action. With more than
one child, both ask whose note it is first, in a names-and-avatars sheet with nothing comparable on
it. A picked photo gets a **keep-or-choose-another** review beat before it is written, mirroring the
voice note's record → review → keep it, because this record type has no delete
(tracked in `TODOS.md`).

A newly added entry may settle once in under 300ms. Beyond that, **My Trail may be worth coming
back to** ([PDR-0035](../decisions/0035-my-trail-may-be-worth-coming-back-to.md)): route marks draw
themselves in as a row first comes into view, staggered along the route and latched so re-scrolling
does not replay them. The line is *who caused the motion* — motion the child produced by scrolling
is the interface answering them; motion that happens on its own is the interface asking for them.
So: nothing loops, nothing is ambient, and this surface never gets a visit streak, a "you haven't
been back", a reminder or a count of entries ([principles.md#doorway](principles.md)). Reduce Motion
keeps the appearance and drops travel and scale. Detail view supports
revisiting what was difficult and what helped; parent gate before external sharing/export.

## Family tab {#kids-tab}

A warm shared promise surface styled as a family fridge door
([PDR-0007](../decisions/0007-family-is-a-promise-surface.md)): conditional verified
needs-attention card → one self-sizing soft-paper Family Agreement artifact → scoped circular child
magnets along its lower edge → one primary review action → compact truthful caregiver/device row.
The artifact uses one restrained tape strip and shallow backing sheet, not square card furniture or
literal fridge simulation. The selected child's agreement states the daily Paulo boundary, that
Play Now and Save both count, the reciprocal grown-up promise, agreement date/revision, and an
optional child-authored **My Plan** voice-note slip. A generic waveform indicates that audio exists;
never replace it with helper copy claiming a device or voice state the system has not verified.

The Family header owns the parent-gated Settings control; Wish home has none. Family shows compact
child and caregiver context, but administration lives in Settings: add/edit/remove children,
profiles, money, ledgers, app feedback, privacy, export and erase. Release one shows caregiver/sync
truthfully as **this device / not connected**; invitation and sync troubleshooting join this
workshop only when those capabilities exist. No sibling rankings, "best saver," behavioural
dashboards, or invitation pressure.

Settings and its Edit Kid drill-in use the same native inline sheet navigation: centred
**Settings** / **Edit kid**, with a leading **Cancel** action. Settings does not repeat a large
“For grown-ups” hero after the parent has already passed the gate.

DEBUG Testing also owns a presentation-only Single child / Multiple children picker. It exists to
exercise both recipes against real fixtures and never becomes the prohibited family-facing global
switcher: single mode shows the first stored child's surfaces, while Settings administration still
lists every real profile.

Settings ends with the informational
[maker signature card](components.md#maker-signature-card), after App info and after the DEBUG-only
Testing controls when present. It remains inside the parent-gated sheet and has no navigation or
contact action.

Release one groups the existing per-child agreements in this one surface: selecting a pinned child
changes the sheet being reviewed and is not a persistent global switcher. Magnet identity,
imperfection and selection remain stable when children reorder; Reduce Motion preserves the
content change and selected state without spatial lift or travel. My Plan is optional,
never autoplayed, never missing setup, and first appears outside the normal Moment (Family plus the
optional Chance Used playback).

**Money mode is never age-triggered ([PDR-0004](../decisions/0004-money-readiness-not-age.md)):** no `child.age` condition may enable, recommend or hint at `showRealMoney` in either direction — consistent with [#bands](#bands) ("birthdays don't determine readiness"). While off, the toggle carries a neutral explanation of what turning it on changes and that children differ; it offers no verdict, and no readiness questionnaire (that would be parent homework — [principles.md#low-burden](principles.md)).

## Parent Ledger {#parent-ledger-screen}

In Edit Kid, this rare maintenance surface is labelled **Promise history** and starts collapsed on
every visit. Its summary says what it is for: reviewing recorded saves and plays or correcting a
mistake. Expansion is deliberately not persisted. The current release then asks the parent to pick
a wish as event context and opens **Wish history** with `thumbnail` wish identity, event history,
corrections and undo-last. Corrections remain additive audit events; there is no hidden retroactive
edit. A future child-wide stream may remove the context-picker step without changing the pooled
ledger semantics.

## Privacy, archive, and deletion {#privacy}

Parent-only: privacy guide; export family archive; erase local data; clear consequence copy; confirmation appropriate to irreversibility; no dark patterns discouraging deletion.
