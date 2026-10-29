# Paulo Release Readiness Checklist

Use `docs/release/physical-device-testflight-runbook.md` for the step-by-step physical-device, TestFlight, and human QA process.

## Code and Build
- [x] iOS app builds on simulator with zero warnings.
- [x] App icon exists and is referenced by the asset catalog.
- [x] Privacy manifest exists in the app target.
- [x] Photo picker purpose string exists in `Info.plist`.
- [x] String catalog is valid JSON.
- [x] Domain checks pass with `PauloCoreCheck`.

## Simulator QA
- [x] First-run setup creates a dream with a selected photo sticker.
- [x] Moment choice records progress.
- [x] Dream completion shows the achievement ritual.
- [x] Journal hero card persists.
- [x] Sticker book and detail sheet render.
- [x] Parent settings toggles render and remain practical.
- [x] Parent settings can erase local data after confirmation and return to first-run setup.
- [x] Dark Mode checked.
- [x] Accessibility Dynamic Type checked.
- [x] Small iPhone simulator checked.
- [x] Large iPhone simulator checked.
- [x] Relaunch persistence checked.

## Human QA Required
- [ ] Physical iPhone install and smoke test.
- [ ] Real Photos library selection on physical device.
- [ ] Sound and haptic feel on physical device.
- [ ] VoiceOver pass on physical device.
- [ ] Parent/child wording review by the product owner.
- [ ] Final visual review against the intended child-first tone.

## Apple Release Setup Required
- [ ] Apple Developer Team selected in Xcode.
- [ ] Bundle identifier finalized.
- [ ] Signing and capabilities validated for device build.
- [ ] Archive build created.
- [ ] TestFlight upload completed.
- [ ] App Store Connect app record created.
- [ ] App privacy answers completed.
- [ ] Age rating completed.
- [ ] Support URL added.
- [ ] Privacy policy URL published and added.
- [ ] Test notes prepared for reviewers.

## Do Not Ship Until
- [ ] Physical-device QA passes.
- [ ] Privacy policy is reviewed and published.
- [ ] App Store privacy disclosures match the final binary.
- [ ] Any added SDKs are reflected in `PrivacyInfo.xcprivacy`.
- [ ] Product owner approves the final app experience.
