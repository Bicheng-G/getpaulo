# Project documentation

These files are tracked so a fresh clone preserves the website's supporting
design notes, prototypes, reference assets and release drafts. They were reviewed
for sensitive material before being restored to version control on 2026-10-29.
See [MIGRATION-HANDOFF.md](MIGRATION-HANDOFF.md) for the review scope and limitations.

## Start here

- [design/README.md](design/README.md): design map, component contracts and prototypes.
- [release/](release/): historical iOS release instructions and metadata drafts.
- [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md): reference provenance and bundled licenses.
- [MIGRATION-PLAN.md](MIGRATION-PLAN.md): scope and validation for restoring these files.

## Historical scope

This repository contains the **website**, not the native Paulo app. The design and
release documents are snapshots from the native app project. Their original
dates, implementation claims, `LIVE` labels and agent-loading descriptions have
been preserved as historical context; they are not fresh verification of the app
or automatic agent configuration in this repository.

References to `PauloApp/`, `TODOS.md`, `uploads/`, and the `docs/decisions/`,
`docs/research/`, `docs/product/`, `docs/strategy/`, `docs/implementation/` and
`docs/engineering/` trees belong to that other project. Those files were not
present in this website checkout and are not supplied by this migration. Some
relative links therefore remain unresolved. Consult the native app project before
acting on its release checklists or treating its implementation claims as current.

The privacy draft and App Store metadata describe different stages of development.
The website's published policy source is exclusively
[`src/content/legal/privacy-policy.md`](../src/content/legal/privacy-policy.md).
Updating a draft here does not publish it or prove its agreement with the app.

## Prototypes and publication

`design/mockups/Paulo Mockups (standalone).html` includes its scripts and fonts;
the adjacent source files remain editable. The editable prototype uses external
library/font URLs and a host integration for saving dropped images. These are
historical design artifacts, not production website code or a fully standalone
editor. The production site's no-third-party-request promise does not describe
these design tools.

Do not place personal photos, recordings, account credentials or exported family
data in these public documents. Prototype image sidecars remain ignored. Keep
reference attribution and the bundled third-party license files with any copies.
