# Paulo — Product Overview

**Status:** LIVE.
**Read this when:** starting product-shaping work (new feature, scope question, copy that frames the product), or orienting as a new agent.
**Update this when:** product scope, tabs/flows, vocabulary, or success measures change (the source for direction changes is `docs/strategy/paulo-v2-prd.md`).

## What Paulo is {#what}

Paulo is an iOS app for families with children aged **4–8**: a low-friction practice layer for parent–child co-regulation around delayed gratification. A real moment happens (a child wants the shiny thing now), Paulo provides the smallest useful scaffold — a wish made visible, a calm pause, a symmetric choice — the child chooses, the consequence becomes visible, and the family may reflect later. The product wedge is **Wishes and the Moment of Choice**. Paulo is *not* a reward chart, a child-scoring system, a parenting encyclopedia, or a screen-time destination.

Current direction: the **v2 build** per [`docs/strategy/paulo-v2-prd.md`](../strategy/paulo-v2-prd.md) (2026-07-20) — promise ledger + multi-wish, shared-family multi-kid, temptation library, family rules, money peg. Out of scope for v2: co-funding, daily review, pocket money.

## Core loop {#loop}

1. **Capture a wish** — photograph the real desired thing → background removed → die-cut **wish sticker** with AI-suggested name.
2. **Agree family rules** — what one star means (a real family promise), daily choice chances, what happens at ready.
3. **The Moment** — in a hot moment the parent taps "It's a choice moment"; the interlude hands the phone to the child (rotate hint → breathing beat); the child chooses **Play Now** or **Save for Wish** on two structurally equal cards.
4. **Visible consequence** — a save adds stars to the child's pooled ledger; the wish sticker gains colour. Play Now gets an equally warm confirmation.
5. **Ready → fulfilment** — when the pooled balance meets the target: first-time ceremony, real-world redemption, keepsake photo, a Little Win record on My Trail.
6. **Reflect (optional)** — **My Trail** keeps what the family wanted to keep: fulfilled-wish keepsakes, a child's voice note about their day, a photo a grown-up added. Support fades as the child grows.

## Surfaces {#surfaces}

Four native bottom destinations — **Wish** (family home: generated family hero, one focused-wish
recognition bubble per child, truthful route and child-owned Moment entry) · **Wish Jar** (active multi-wish memory/planning grid + recoverable
Archive) · **My Trail** (keepsakes, voice notes and photo notes on one timeline drawn along Home's own path; named Little Wins until 2026-07-30, [PDR-0033](../decisions/0033-little-wins-becomes-the-diary.md), [PDR-0034](../decisions/0034-name-the-surface-my-trail.md)) · **Family** (shared agreement, verified
family attention, child/caregiver context, and the parent-gated Settings entry). On iOS 18+, the
native trailing item is a detached Camera that begins new-wish capture from any destination and
returns to the previously selected destination; iOS 17 keeps the same correctly labelled entry in
its native five-item bar ([PDR-0010](../decisions/0010-use-native-trailing-role-for-capture.md)).
Full-screen rituals above the destinations: Who's choosing? → interlude → Moment → results; Ready
ceremony; Capture flow. Family administration—profiles, temptations, money, ledgers,
caregivers/sync, privacy and data—lives behind Settings rather than on the Family landing surface
([PDR-0007](../decisions/0007-family-is-a-promise-surface.md)).

## Vocabulary {#glossary}

- **Wish** — a child's saved-for goal, represented by a sticker (`DreamJarModel`; code says "dream" for historical reasons).
- **Archive** — a recoverable holding area for wishes no longer in the active Jar; restore is primary, and permanent deletion is a separate explicit action.
- **Wish sticker** — die-cut photo cutout of the real desired object; its colour fill *is* the progress display.
- **Star** — one unit of a real family promise (never generic points). Lives in the child's **pooled ledger**, not on a wish.
- **Temptation** — a configured immediate experience (claw machine, gacha) with an honest 1–3 star skip value.
- **The Moment** — the choice ritual: Play Now vs Save for Wish, both legitimate.
- **Interlude** — rotate hint + breathing pause before the choice pair.
- **Chance** — a family-agreed daily limit of recorded Moments (practice boundary, not punishment).
- **Ready** — pooled balance ≥ wish target; unlocks fulfilment.
- **Little Win** — reviewed evidence of capability (completed wishes are one type, not the definition).
- **Parent gate** — arithmetic gate in front of adult actions.

## Success and guardrails {#success}

North-star direction: **meaningful shared practice moments per active family** (real-world event + child choice/participation + minimal parent support + visible consequence or later reflection).

Supporting measures: median time to record a moment; completion within 20 seconds; child initiation over time; parents not overriding the choice; My Trail records containing observable action or strategy; families revisiting evidence; parent usefulness at the moment of need; trust that promises, stars, and records are safe; felt progress and causality; transfer to unaided choices. (Most are family-report study measures, not in-app analytics — respect data minimisation, [`../design/principles.md#data-minimisation`](../design/principles.md).)

Guardrails — stop or revise if: child distress caused by the interface; parent pressure toward Save; transactional bargaining around ordinary contribution; hidden or broken promises; logging burden; conflict caused by recording; child use without a real-world purpose; excessive media/data creation; parents reading patterns as diagnosis; product dependence without offline transfer.

## Where the rest lives {#pointers}

Design authority: [`../design/`](../design/README.md) (principles auto-loaded). Evidence base behind the design rulings: [`../research/`](../research/README.md). Code map and workflows: [`../engineering/architecture.md`](../engineering/architecture.md). Backlog: [`/TODOS.md`](../../TODOS.md). Direction history: `docs/strategy/`, `docs/project init/`, `docs/revision v3/` (historical strata — see [`../README.md`](../README.md)).
