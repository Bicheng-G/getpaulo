# Paulo TestFlight and App Store Metadata Draft

Last updated: 2026-07-30

## App Name
Paulo

## Subtitle
Real wishes, real choices, real promises

## Category
Primary: Education. (Family/Lifestyle are reasonable alternatives.) Final category should be
chosen by the publisher, but note: Apple's kid-directed-app requirements (parental gates on
external links/purchases, restricted third-party SDKs, the App Store Connect age-audience
questionnaire) apply based on who the app is actually for, not the storefront category label —
Paulo is explicitly built for ages 4–8, so those requirements apply regardless of category. This
build already meets them (no accounts, no ads, no analytics, no third-party tracking).

## Short Description
Paulo helps a child capture a real wish as a photo sticker, choose between enjoying something now
or saving toward it, and watch a family promise become real.

## Longer Description Draft
Paulo is a child-first, parent-assisted app for practicing delayed gratification as a family.

A child starts with a real wish — a toy, an experience, anything — turned into a photo sticker by
a parent. The family sets up a small library of everyday temptations and what one star is worth.
In a Moment, Paulo presents two equal, honest choices: enjoy a temptation now, or save toward the
wish. Both are legitimate. Paulo records the choice without judging it, and the child's promise
ledger — one pooled balance, not a score — moves accordingly.

As stars accumulate, the child sees real progress toward their wish. When a wish is fully funded,
the family fulfills it in real life, and Paulo creates a keepsake card recording the moment. My
Trail keeps a running record of these moments and any voice or photo notes a parent adds along the
way.

Paulo v1 is intentionally simple and local:

- Multiple children, each with their own wishes, ledger, and temptation library.
- A shared Family surface for the household's rules and agreements.
- No money movement by default — an optional, parent-gated real-money translation exists but stays
  out of the moment of choice.
- No streaks, rankings, sibling comparison, or scoring of the child.
- No accounts, no backend sync, no ads, no analytics, no tracking.
- Everything — photos, recordings, wishes, the ledger — stays on the device. Paulo makes no network
  requests.

## What's New Draft
Initial TestFlight build of Paulo:

- Capture a wish as a real photo sticker; on-device suggestion helps name it.
- Set up multiple children, each with their own wishes and promise ledger.
- Define a family's temptations and what a star is worth.
- Make a real choice in the Moment — enjoy now or save toward a wish — and see it recorded honestly.
- Fulfill a funded wish and keep a card commemorating it.
- Add voice and photo notes to My Trail.
- Parent settings for sound, haptics, family rules, and data export/erase.

## Keywords Draft
kids, family, wishes, promises, delayed gratification, choices, parenting, savings habit

## Support Email
hi@bicheng.me

## Support URL
https://getpaulo.app/support — domain purchased 2026-07-30, site not yet live. Do not submit until
this actually resolves; Apple checks it during review.

## Privacy Policy URL
https://getpaulo.app/privacy — same domain, same caveat: publish `docs/release/privacy-policy.md`'s
content at this URL before submission, not just reserve the address.

## Age Rating Notes
Expected content profile:

- No user-generated public content.
- No ads.
- No purchases (the optional real-money star value is a parent-configured display only; Paulo
  itself moves no money).
- No web access, no network requests of any kind.
- No social sharing.
- Uses selected/captured photos and short voice recordings locally; never uploaded.

Final age rating and the App Store Connect age-audience questionnaire must be completed in App
Store Connect — see the Category note above.

## App Privacy Disclosure Draft
Based on the current build (verified against the codebase — zero network calls anywhere,
`ModelConfiguration(cloudKitDatabase: .none)`):

- Data collected by the developer: **None** — Paulo has no server, so nothing is transmitted to
  the publisher or any third party. (This is distinct from local storage: the app does store
  child names, photos, voice recordings, and the promise ledger *on the device* — see the privacy
  policy for the full local-storage list. Apple's privacy nutrition label concerns data that
  leaves the device, which for Paulo is none today.)
- Tracking: No.
- Third-party advertising: No.
- Analytics: No.
- Photos/camera: used locally to create stickers; never uploaded.
- Microphone: used locally for My Trail and My Plan voice notes; never uploaded.

This must be rechecked before every submission if analytics, backend sync (the reserved iCloud
family-sync capability), crash reporting SDKs, export, accounts, or sharing are added or activated.
