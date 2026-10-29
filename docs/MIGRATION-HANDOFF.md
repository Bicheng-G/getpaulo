# Documentation migration handoff

Date: 2026-10-29

## Result and scope

The owner requested that a fresh clone include the previously ignored project
documents after a sensitivity review. The migration includes all 22 original
non-OS-metadata files under `docs/design/` and `docs/release/`, plus the portable
`.claude/launch.json` preview configuration. The website's application behavior
and deployed legal content are unchanged.

## Review evidence

- Pattern scans covered every text source, decoded standalone HTML template and
  embedded JavaScript resource. No recognized private keys, service credentials,
  access tokens, credential-bearing URLs or private network addresses were found.
- Document content consists of design specifications, historical product choices,
  release instructions and example UI copy. No actual family exports, recordings,
  customer lists, payment records or account credentials were identified.
- The standalone HTML's 15 embedded resources were decoded without executing the
  prototype: three helper scripts matching adjacent files byte for byte, three
  library scripts (React, React DOM, Babel), and nine Baloo 2/Nunito font subsets.
  There are no embedded photo or audio assets, and no saved image-slot sidecar was
  present. Visible prototype names and wishes are sample UI content.
- Both reference JPEGs were visually inspected. They depict CapWords interfaces,
  without visible personal records. JPEG metadata consists of colour/profile and
  basic format/dimension/orientation fields; no GPS, personal identity, device
  serial or capture-time metadata was found.
- Replaced a personal machine's absolute Xcode path with a native-checkout-relative
  instruction, two legacy personal contact addresses with the site's public support
  email, and an unnecessary first-name attribution with the existing founder role.
  The app maker's public credit remains intact.
- Preserved provenance comments and added upstream library/font license notices.
  Screenshot and helper provenance limits are documented in
  [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md); this sensitivity review is not a
  claim of ownership or a third-party licensing audit.

Pattern scans and contextual review reduce publication risk; they are not a
guarantee that every possible form of sensitive information can be detected.

## Validation before publication

- Final scan covered 37 text sources, including the decoded template and scripts:
  no unresolved findings. The only email value is the public support address.
  The IP-pattern scan matched 31 explicitly labelled V8 version literals in Babel's
  Node release table; contextual inspection confirmed these are not network addresses.
- The original backup contains 24 non-OS files. All 23 portable project files
  (22 documents/assets and the preview config) are included: 18 byte-identical,
  five changed only for the documented publication edits or whitespace cleanup.
- The remaining file, `.claude/settings.local.json`, was inspected and contains
  three historical local shell-permission allow rules, with no credentials.
  It stays ignored: local agent permissions should be chosen on the new computer,
  not inherited as project requirements. Its original is in the private backup.
- `git diff --cached --check` passed. Apart from that local permission file, only
  dependency/build caches and OS metadata remain ignored in this checkout.
- A fresh staged export installed the lockfile with `npm ci --no-audit --no-fund`
  and passed `npm run build` under Node 22.17.0. The output contains the expected
  index, 404, privacy and support pages; no documentation, prototype scripts or
  embedded font files were copied into the website output. Public support contact
  and CloudKit policy text render successfully.

For each future migration, compare local main with the live remote and verify a
fresh clone before removing the old checkout. The website build is not a test of
the separate native iOS app or an interactive test of the historical prototypes.

## New-computer setup

```sh
git clone https://github.com/Bicheng-G/getpaulo.git
cd getpaulo
npm ci
npm run dev
```

Use Node 22 to match Netlify. No private local environment file is required for
the current static website. Dependencies, `.astro/`, `dist/`, OS metadata, other
editor settings and future user-dropped image sidecars remain ignored.

## Boundaries and follow-ups

- This restores all project documents that actually existed in this website
  checkout. The native iOS app and missing cross-project references are not here;
  see [README.md](README.md) for details.
- Older design/release claims are preserved as dated source material. They are
  not renewed evidence of current iOS behavior or release readiness.
- The pre-existing mismatch between website homepage/support copy and the published
  privacy policy remains a separate product task.
- The earlier private archive preserves the pre-migration originals. It is optional
  for normal website setup once this migration has been pushed and clone-verified.
- A normal revert can remove the newly tracked files from the latest tree but
  cannot remove already-published history. The original checkout is not deleted.
