# Paulo Physical Device and TestFlight Runbook

Last updated: 2026-06-30

This runbook starts from the current validated simulator MVP and covers the remaining steps that cannot be proven by simulator automation alone.

## Current Verified State
- The simulator app builds and runs with zero warnings through XcodeBuildMCP.
- The first-run photo sticker flow has been validated with a simulator Photos item.
- A real-photo dream has been completed through Moment choice, achievement, and Journal.
- Parent settings shows the runtime build as `1.0 (1)`.
- Parent settings includes a confirmed `Erase local data` control for returning to first-run setup.
- The project uses automatic signing, but no Apple Developer Team is configured in the Xcode project.
- The current bundle identifier is `app.paulo.ios`; this must be finalized before App Store Connect setup.

## Before You Start
You need:

- A Mac with Xcode installed.
- An Apple Developer account.
- A physical iPhone running iOS 17 or later.
- A USB cable or trusted wireless debugging connection.
- At least one real photo in the iPhone Photos library that is safe to use as a child-facing sticker.

Do not change these unless you are intentionally preparing a new release:

- `MARKETING_VERSION`: currently `1.0`
- `CURRENT_PROJECT_VERSION`: currently `1`
- App target: `Paulo`
- Scheme: `Paulo`

## Step 1: Open the Project
1. Open Xcode.
2. Choose `File > Open`.
3. Open `/Users/alfie/Developer/Paulo/PauloApp/Paulo.xcodeproj`.
4. In the toolbar, select the `Paulo` scheme.
5. Select your physical iPhone as the run destination.

## Step 2: Configure Signing
1. In Xcode's project navigator, select the blue `Paulo` project.
2. Select the `Paulo` app target.
3. Open `Signing & Capabilities`.
4. Set `Team` to the Apple Developer Team that will own the app.
5. Decide the final bundle identifier.

Recommended decision:

- Use a publisher-owned reverse-DNS identifier, for example `com.yourcompany.paulo`.
- Do not ship with `app.paulo.ios` unless that identifier is intentionally owned and final.

Expected result:

- Xcode shows no signing errors.
- The physical device can be selected for Run.

## Step 3: Run on a Physical iPhone
1. Press Run in Xcode.
2. If iOS asks whether to trust the developer, follow the iPhone prompt to trust the app.
3. Confirm Paulo opens to either the first-run setup screen or the persisted test data state.

Pass criteria:

- App launches without crashing.
- Screen is not letterboxed.
- Text is readable in normal Light Mode.
- Parent tab shows `App info > Version > 1.0 (1)`.

## Step 4: Physical Device Smoke Test
Start from a clean app state.

Preferred reset path:

1. Open `Parent`.
2. Scroll to `Data controls`.
3. Tap `Erase local data`.
4. Confirm `Erase local data`.
5. Confirm Paulo returns to `Create a dream`.

If the reset path is unavailable because the app will not open, delete the app and reinstall it.

Run this exact flow:

1. Open Paulo.
2. On `Create a dream`, tap `Pick photo`.
3. Select a real photo from the device Photos library.
4. Confirm the setup screen shows `Sticker ready`.
5. Enter:
   - Child name: `Paulo`
   - Dream name: `Rocket Bike`
   - Temptation name: `Tablet Game`
6. Confirm the button becomes `Start my dream`.
7. Tap `Start my dream`.
8. Confirm the Dream screen shows `Rocket Bike` and `4 choices to go`.
9. Tap `Make a choice`.
10. Confirm both Moment choices are visually equal:
    - `Play now`
    - `Step closer`
11. Tap `Step closer`.
12. Repeat until the dream completes.
13. Confirm achievement shows `I did it.`
14. Tap `See my dream`.
15. Open Journal.
16. Confirm a hero card exists for `Rocket Bike`.

Pass criteria:

- Photo picker works with the real device Photos library.
- Haptics feel gentle, not startling.
- Sound cues are short and not harsh.
- No text is clipped or hidden by the keyboard, home indicator, or tab bar.
- Moment choice remains non-judgmental; neither choice is visually treated as the morally correct answer.
- The Journal card uses the selected dream sticker.

## Step 5: Accessibility QA
Run these checks on the physical iPhone:

1. Turn on larger text in iOS Settings.
2. Reopen Paulo and repeat first-run setup through Moment choice.
3. Turn on Dark Mode and inspect Dream, Moment, Journal, Stickers, and Parent.
4. Turn on VoiceOver and swipe through:
   - Create dream setup
   - Dream screen
   - Moment choice
   - Journal hero card
   - Parent settings
5. Turn on Reduce Motion and complete one Moment choice.

Pass criteria:

- Interactive controls remain at least 44 pt tall.
- VoiceOver labels identify the action and current state.
- Progress is understandable without color alone.
- Reduce Motion does not block the flow.
- Large text does not hide required fields or primary actions.

## Step 6: Prepare App Store Connect
Complete these before TestFlight upload:

1. Create the app record in App Store Connect.
2. Use the finalized bundle identifier.
3. Add the app name `Paulo`.
4. Add support URL.
5. Publish the privacy policy and add its URL.
6. Complete App Privacy using `docs/release/testflight-app-store-metadata.md`.
7. Complete Age Rating.
8. Add TestFlight review notes.

Current metadata drafts:

- `docs/release/testflight-app-store-metadata.md`
- `docs/release/privacy-policy.md`

Do not submit if the privacy policy still says `Add the publisher support email`.

## Step 7: Archive and Upload
1. In Xcode, select `Any iOS Device`.
2. Choose `Product > Archive`.
3. Wait for the Organizer window.
4. Select the Paulo archive.
5. Choose `Distribute App`.
6. Choose `App Store Connect`.
7. Upload for TestFlight.

Pass criteria:

- Archive completes without signing errors.
- Upload completes.
- The build appears in App Store Connect TestFlight.
- TestFlight build number matches Parent settings `App info`.

## Stop Conditions
Do not proceed to wider testing if any of these happen:

- App crashes on launch or during photo selection.
- Photo permission or picker copy is confusing or inaccurate.
- Child-facing copy sounds shaming, judgmental, or parent-control oriented.
- Moment choices are not visually equal.
- Journal card is missing after dream completion.
- App Privacy answers do not match the actual binary.
- Support URL or privacy policy URL is missing.

## QA Result Template
Use this template after each physical-device or TestFlight pass:

```text
Date:
Tester:
Device model:
iOS version:
Build shown in Parent > App info:

Smoke test:
- First-run setup:
- Photo selection:
- Moment choice:
- Achievement:
- Journal:
- Stickers:
- Parent settings:

Accessibility:
- Large Text:
- Dark Mode:
- VoiceOver:
- Reduce Motion:

Issues found:
1.
2.
3.

Ship recommendation:
- Ship / Do not ship

Notes:
```
