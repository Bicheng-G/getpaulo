/**
 * Small motion helpers shared by the page's interactive moments.
 * No library: CSS linear() springs + the Web Animations API.
 */

export const SPRING =
  'linear(0, 0.043, 0.147, 0.282, 0.426, 0.564, 0.687, 0.791, 0.875, 0.938, 0.984, 1.015, 1.034, 1.043, 1.045, 1.043, 1.039, 1.033, 1.026, 1.02, 1.014, 1.009, 1.006, 1.003, 1.001, 0.999, 0.998, 0.998, 0.999, 1)';
export const SPRING_SOFT =
  'linear(0, 0.055, 0.175, 0.319, 0.461, 0.587, 0.694, 0.78, 0.846, 0.896, 0.932, 0.958, 0.975, 0.987, 0.994, 0.999, 1.001, 1.002, 1.003, 1.002, 1.001, 1)';
export const SPRING_BOUNCY =
  'linear(0, 0.037, 0.132, 0.261, 0.407, 0.555, 0.694, 0.816, 0.919, 0.999, 1.058, 1.097, 1.118, 1.126, 1.122, 1.111, 1.096, 1.078, 1.059, 1.041, 1.025, 1.012, 1.002, 0.994, 0.988, 0.985, 0.984, 0.986, 0.99, 0.994, 0.998, 1.001, 1.002, 1.001, 1)';
export const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

/** Reduce Motion: the final state, straight away. Read live, so a change applies at once. */
export function reduced(): boolean {
  return reduceQuery.matches;
}

/**
 * Run a WAAPI animation, or jump to its last frame under Reduce Motion.
 * Resolves when finished (or cancelled).
 */
export function play(
  el: Element,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options: KeyframeAnimationOptions,
): Promise<void> {
  const opts = reduced() ? { ...options, duration: 0, delay: 0 } : options;
  const anim = el.animate(keyframes, { fill: 'both', ...opts });
  return anim.finished.then(
    () => undefined,
    () => undefined,
  );
}

export const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, reduced() ? 0 : ms));

/** Call once when the element first comes into view. */
export function onceInView(el: Element, fn: () => void, rootMargin = '0px 0px -20% 0px') {
  if (!('IntersectionObserver' in window)) {
    fn();
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    },
    { rootMargin },
  );
  io.observe(el);
}

/** Centre of an element, in viewport coordinates. */
export function centre(el: Element) {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
