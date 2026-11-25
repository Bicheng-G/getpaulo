/**
 * Site-wide constants. Anything that changes at launch lives here.
 */

export const SITE = {
  name: 'Paulo',
  domain: 'getpaulo.app',
  url: 'https://getpaulo.app',
  /** App Store subtitle (Paulo/docs/release/app-store/metadata/app-info/en-GB.json) */
  tagline: 'Wishes worth waiting for',
  supportEmail: 'hello@goodstuffstudio.app',
} as const;

/**
 * Apple's numeric app ID. Setting it turns on the App Store link and the iOS
 * Smart App Banner across the site.
 */
export const APP_STORE_ID: string | null = '6797490684';

/**
 * `ct` is Apple's App Analytics campaign parameter. It attributes the click
 * inside App Store Connect, so we can measure web → install without running a
 * single tracker on this site.
 */
export const APP_STORE_URL = APP_STORE_ID
  ? `https://apps.apple.com/app/id${APP_STORE_ID}?ct=website&pt=&mt=8`
  : null;

/** Primary navigation, in reading order. */
export const NAV = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/story', label: 'Our story' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
] as const;
