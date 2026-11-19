/**
 * Pokeable clay. Anything with [data-poke] squishes when pressed and can be
 * dragged a little way; let go and it springs home. It is decorative, so it
 * never blocks scrolling on touch (a vertical swipe still scrolls the page).
 */
import { SPRING_BOUNCY, reduced } from './motion';

const MAX = 90; // px: the clay stretches, it never leaves its spot

function rubber(d: number) {
  // Each pixel past the start moves the object less: friction, not a wall.
  const sign = Math.sign(d);
  const a = Math.abs(d);
  return sign * MAX * (1 - Math.exp(-a / (MAX * 1.4)));
}

function squish(el: HTMLElement) {
  if (reduced()) return;
  el.animate(
    [
      { transform: 'scale(1, 1)' },
      { transform: 'scale(1.12, 0.86)', offset: 0.18 },
      { transform: 'scale(0.94, 1.08)', offset: 0.42 },
      { transform: 'scale(1.03, 0.98)', offset: 0.7 },
      { transform: 'scale(1, 1)' },
    ],
    { duration: 620, easing: 'ease-out', composite: 'add' },
  );
}

function bind(el: HTMLElement) {
  let id: number | null = null;
  let sx = 0;
  let sy = 0;
  let dx = 0;
  let dy = 0;
  let moved = false;
  let back: Animation | null = null;

  const set = () => {
    el.style.transform = `translate(${rubber(dx)}px, ${rubber(dy)}px) rotate(${rubber(dx) * 0.12}deg)`;
  };

  el.addEventListener('pointerdown', (e) => {
    if (id !== null) return; // one finger at a time
    id = e.pointerId;
    sx = e.clientX;
    sy = e.clientY;
    dx = dy = 0;
    moved = false;
    back?.cancel();
    el.style.cursor = 'grabbing';
    if (e.pointerType === 'mouse') el.setPointerCapture(e.pointerId);
  });

  el.addEventListener('pointermove', (e) => {
    if (e.pointerId !== id) return;
    dx = e.clientX - sx;
    dy = e.clientY - sy;
    if (!moved && Math.hypot(dx, dy) > 4) moved = true;
    if (moved && !reduced()) set();
  });

  const release = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    id = null;
    el.style.cursor = '';
    if (!moved) {
      squish(el);
      return;
    }
    const from = el.style.transform;
    el.style.transform = '';
    if (reduced()) return;
    back = el.animate([{ transform: from }, { transform: 'translate(0,0) rotate(0deg)' }], {
      duration: 900,
      easing: SPRING_BOUNCY,
    });
  };

  el.addEventListener('pointerup', release);
  el.addEventListener('pointercancel', release);
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      squish(el);
    }
  });
}

document.querySelectorAll<HTMLElement>('[data-poke]').forEach(bind);
