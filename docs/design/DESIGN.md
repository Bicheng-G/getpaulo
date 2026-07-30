# DESIGN.md — index (the design system moved)

**Status:** INDEX ONLY. The monolithic v2.1 design contract was split on 2026-07-25 into routed files so agents load only what a task needs. Do not add content here.

| You need | Read |
|---|---|
| Behavioural principles, product semantics (ledger/stars/money), amber ruling, voice, anti-patterns, feature gate | [principles.md](principles.md) — auto-loaded into every agent session; every rule carries a strictness label ([#strictness](principles.md#strictness)) |
| Why a ruling exists, or changing one | [../decisions/](../decisions/README.md) — append-only records; written before the code |
| Colour/type/shape tokens, iconography, ceremony drift, haptics, motion, layout, accessibility | [system.md](system.md) |
| Signature components (sticker, star row, choice pair, capture flow, gates, prompts, My Trail records) | [components.md](components.md) |
| Screen-by-screen recipes and age bands / interaction modes | [screens.md](screens.md) |
| Psychological moonshot method and patterns | [moonshots.md](moonshots.md) |
| Choice-moment interlude (rotate hint, breathing, transition) | [interlude.md](interlude.md) |

Related: product summary and success measures → [../product/overview.md](../product/overview.md) · code map, invariants, build/QA → [../engineering/architecture.md](../engineering/architecture.md) · outstanding design-implementation corrections (former §11) → [TODOS.md](../../TODOS.md).

Historical versions: [archive/DESIGN-v1.md](archive/DESIGN-v1.md) · the full v2.1 text is in git history (`git log -- docs/design/DESIGN.md`).

Citation convention: cite rules as `file.md#anchor` (e.g. `principles.md#choice-symmetry`), never by section number — numbers churn, anchors don't.
