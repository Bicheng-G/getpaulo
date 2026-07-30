# docs/design — map

**Status:** LIVE map of this folder.

## Live design system (normative)

- [DESIGN.md](DESIGN.md) — index only; routes into the split files below.
- [principles.md](principles.md) — behavioural principles, product semantics, rulings, anti-patterns, feature gate. Auto-loaded every session.
- [system.md](system.md) — tokens, typography, shape, motion, haptics, layout, accessibility.
- [components.md](components.md) — signature component contracts + SwiftUI homes.
- [screens.md](screens.md) — screen recipes + developmental bands.
- [moonshots.md](moonshots.md) — psychological moonshot playbook.
- [interlude.md](interlude.md) — choice-moment interlude, as built.

Since 2026-07-27 `principles.md` labels every rule **Required / Current / Experimental** and states the harm it prevents plus a revisit trigger. Mechanism-level rulings live in the spec files (amber allow/deny → [system.md#amber-usage](system.md); choice-pair symmetry → [components.md](components.md)). *Why* a ruling is what it is, and what would change it back: [../decisions/](../decisions/README.md).

## Design artifacts

- `mockups/Paulo Mockups (standalone).html` — double-click to open; all 8 MVP screens. `Paulo Mockups.dc.html` + `support.js`/`ios-frame.jsx`/`image-slot.js` are the editable source (serve the folder: `python3 -m http.server`).
- `wireframes/paulo-v2-wireframes.html` — v2 wireframe board (companion to `docs/strategy/paulo-v2-prd.md`).

## Historical (do not treat as authority)

- `archive/DESIGN-v1.md` — the original v1 design doc. The v2.1 monolith that replaced it was split into the live files above; its full text lives in git history.
- `reference/REFERENCE-DESIGN.md` + `reference/assets/` — CapWords / LittleBites reference design language Paulo's visuals were derived from.
