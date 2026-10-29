# Version-controlled documentation migration

Date: 2026-10-29

## Objective
Make a fresh clone contain the website source and the existing local project
documentation, after reviewing the documentation for material unsuitable for a
public repository. This supersedes the earlier local-only documentation policy.

## Scope and constraints
- Review every document, prototype source, embedded asset and reference image.
- Remove incidental personal machine paths or personal contact details where a
  portable path or the existing public support address serves the same purpose.
- Preserve design history and third-party attribution. Do not claim this review
  grants rights to third-party assets or proves current iOS app behavior.
- Include the portable local preview configuration if it contains no credentials.
- Keep dependencies, generated outputs, OS metadata, credentials and machine-local
  settings ignored. Do not modify the website product experience or the iOS app.
- Do not publish credentials, real family data or other sensitive records. If
  found, stop publication of the affected material and explicitly revise this plan.

## Verified baseline
- Website main and GitHub main match at a5a4d0f.
- docs/ is intentionally ignored by a historical decision, not a build requirement.
- Initial pattern scan found no recognized credential tokens or private keys;
  it found one personal machine path and legacy contact email addresses.
- Local docs include historical design/release notes, executable mockups and two
  reference JPEGs. Pattern scanning alone is insufficient for publication.

## Sequential slices and validation
1. Review textual content, scripts, images, embedded data and metadata. Record
   concrete findings and limitations in docs/MIGRATION-HANDOFF.md.
2. Make only publication/portability edits; track reviewed docs and portable config;
   update README and ignore rules. Inspect the staged diff and rescan final files.
3. Build a clean staged export to check that docs do not break the static website.
   Commit and push normally; no force push or history rewrite.
4. Clone from GitHub into a fresh temporary directory. Compare the complete tracked
   tree and reviewed document hashes against the local checkout; verify that main,
   origin/main and live remote agree. Report any remaining local-only material.

## Rollback and recovery
The private migration archive created before this task preserves the original
docs and Git history. Changes are a normal commit that can be reverted. Reverting
does not remove published files from Git history, so the review must precede push.
No deletion of the original checkout is part of this task.

## Review decision and completed preparation
The review found no material requiring a publication block. Incidental personal
paths/contact details were generalized, third-party notices were retained and
supplemented, and historical cross-project references were documented. The clean
staged export passed installation/build validation. Exact review findings and
checks are recorded in MIGRATION-HANDOFF.md; publication uses a normal commit and
push followed by a fresh remote clone comparison.

## Inventory correction before publication
The backup-to-index comparison found `.claude/settings.local.json`, which the
initial `rg --files` inventory omitted because it honors ignore rules. Publication
was held while this file was inspected. It contains only local shell-permission
allow rules and stays excluded under the existing machine-local settings boundary.
The corrected inventory is 24 non-OS originals: 23 portable files tracked and one
local permission file retained in the private archive. Subsequent completeness
checks use the backup manifest and Git's full ignored-file inventory.
