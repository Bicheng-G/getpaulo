---
title: Privacy Policy
description: Paulo has no advertising, no analytics, no third-party tracking, no Paulo account, and no Paulo server. Family data stays in a local replica on the device, mirrored through the parent's own private iCloud account.
lastUpdated: 2026-08-04
---

Paulo is a child-first, parent-assisted app that helps a family practise delayed gratification
together. Paulo has **no advertising, no analytics, no third-party tracking SDKs, no Paulo account
system, and no Paulo server**. Family data is stored in a local Core Data replica on the device and
mirrored through Apple's private CloudKit service using the parent's own Apple Account.

There is no Paulo-operated backend of any kind in the shipping app. An earlier design routed
subscription checks through a Paulo-operated web service; that service was removed from the release
path on 2026-08-04, and no family or account data now leaves the device to any server we run.

## Data Paulo Stores

Formal family data includes:

- Child profiles entered by a parent: name, age, avatar colour, and an optional processed profile
  photo.
- Wishes: name, processed photo sticker, target star count, focus, and lifecycle state.
- Family-defined immediate alternatives, family agreements, daily choice limits, and optional money
  settings.
- The child's append-only promise ledger: saves, plays, spending, and parent corrections.
- Keepsake achievement cards created when a wish is fulfilled.
- My Trail photo notes and voice notes.
- A child's My Plan voice recording.

These values belong to one family space. The Apple Account that creates the family technically owns
its CloudKit records. Data remains fully usable when iCloud or the network is unavailable; local
changes are sent to iCloud asynchronously when possible.

App preferences — onboarding completion, sound, haptics, appearance, and debug settings — are stored
on the device in `UserDefaults`. Temporary camera and recording files and image caches use the device
file system and are not part of the formal family record. Paulo does not intentionally retain raw,
full-resolution source photos after processing.

## Photos, Camera, and Microphone

Paulo asks for photo-library, camera, or microphone access only when a family uses the related
feature. Profile pictures and wish stickers are processed entirely on-device. My Trail photos are
resized, their orientation is baked into the pixels, and EXIF/GPS/TIFF metadata is not copied into
the saved JPEG. Processed photos and saved voice recordings are formal family data, and are therefore
included in private iCloud mirroring when iCloud is available.

When Paulo suggests a wish name from a photo, the suggestion is produced on-device using Apple's
Vision framework and, where the device supports it, Apple's on-device Foundation Models. The photo is
not sent to a Paulo server, an advertising network, or an analytics provider — there are none.

Paulo does not use location services, does not request tracking permission, and does not send
marketing or engagement notifications. The app's remote-notification capability exists solely so
Apple can wake it to deliver iCloud sync changes.

## iCloud, Family Sharing, and Roles

Creating or joining a family requires an available iCloud account. Once a family exists, iCloud
availability is irrelevant to ordinary use — capture, the choice ritual, the ledger, My Trail and My
Plan all work offline, and writes reconcile on reconnect.

An owned family space uses the current Apple Account's **private** CloudKit database from its first
formal save. Personal iCloud mirroring across that parent's own devices, and recovery after a
reinstall, are not paid features.

A second caregiver is invited through Apple's own sharing sheet, which creates a CloudKit share
(`CKShare`). An accepted participant receives and edits the same family data through Apple's shared
CloudKit database. The inviting Apple Account remains the technical owner and holds management powers
a participant does not: only the owner can invite, remove a participant, or stop sharing. A
participant can leave. All of these run through Apple's sharing interface, and Paulo neither stores
nor transmits the other caregiver's Apple Account identity itself.

Accepting an invitation does not move the family to a different database, and does not give either
caregiver access to anything outside that one family space.

## Subscriptions (Paulo Pro)

Paulo Pro is an auto-renewable subscription sold through Apple's App Store, monthly or yearly. Apple
processes the purchase; Paulo never sees or handles payment details, and there is no Paulo account to
create.

Whether a caregiver is subscribed is determined **on their own device, from their own Apple Account**,
using Apple's StoreKit. Paulo reads only what StoreKit reports for that device — product identifier,
expiry, grace-period and revocation status. **No device ever proves anything about another device's
subscription**, and no subscription information is written into the shared family data or sent
anywhere. A subscription obtained through Apple's Family Sharing is treated identically to one bought
directly; Paulo does not record which it is.

Subscription status governs only what a caregiver's own device does with sync: an unsubscribed
caregiver's shared-family mirroring is paused, and their subscription option is offered. It never
removes anyone from the family, never revokes an existing share, and never deletes data. Local Paulo
keeps working. The child never sees a paywall.

## Data Sharing and Network Use

Paulo uses two Apple services over the network and no others: **iCloud/CloudKit** for private
mirroring and invited-family collaboration, and the **App Store / StoreKit** for the subscription.
Paulo does not provide family data to advertisers, analytics companies, data brokers, or a Paulo
backend, because none exist. Apple's handling of iCloud and App Store data is governed by the user's
Apple Account and Apple's own terms.

Paulo's privacy manifest (`PrivacyInfo.xcprivacy`) declares no tracking, no tracking domains, and no
collected data types; the only declared API access is `UserDefaults` for app settings.

## Export and Deletion

A parent can export a family archive — a versioned JSON file plus the family's media — to a file they
control. It is written from the app's own records, never as a raw copy of the database.

For a family owned by the current Apple Account, **Erase family content** deletes the children,
agreements, wishes, progress, stickers, keepsake cards, My Trail photo and voice notes, and My Plan
recordings from the local family record, purges derived caches and temporary audio files, and resets
device preferences. Matching deletions are requested from the private CloudKit database through
normal asynchronous export. The app cannot promise those cloud deletions are immediate; its sync
status reports waiting, or an actual failure, when evidence is available. **A failed erase is never
shown as success.**

Deleting the app removes that device's local replica and its settings. It does not by itself delete
records already stored in iCloud, which may restore on reinstall or remain on another device. To end
a co-caregiver's access, the owner removes them or stops sharing; a participant can leave, which ends
their access to the shared data.

## Children

Paulo is designed for children roughly ages 4–8 to use together with a parent or caregiver. A parent
or caregiver sets up each child's profile and chooses the photos, names, and recordings added to the
family space. Paulo does not knowingly collect child information through analytics, advertising, or a
Paulo account, and has no mechanism to do so. Children's content stays within the family's own iCloud
storage and the caregivers the parent has explicitly invited. Paulo does not profile, score, rank, or
draw conclusions about a child.

## Contact

hi@bicheng.me
