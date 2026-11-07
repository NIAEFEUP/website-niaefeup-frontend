interface FisheyeOptions {
  /** CSS selector for the items that react to the cursor */
  selector: string;
  /** Scale of the focused item */
  maxScale?: number;
  /** Scale of items far from the focused one */
  minScale?: number;
  /** Brightness of items far from the focused one (1 = unchanged) */
  minBrightness?: number;
  /** Influence radius, as a multiple of an item's width */
  radius?: number;
  /** How much shrunk items move towards the focused one to close the gaps (0 = none, 1 = full) */
  pull?: number;
}

const smoothstep = (t: number) => t * t * (3 - 2 * t);

/**
 * Apple Watch–style "honeycomb" effect: the item closest to the cursor is
 * focused, and the others scale and move according to their distance to it.
 * The layout only changes when the focused item changes, so moving the cursor
 * inside an item keeps everything still.
 *
 * Items expose `--fisheye-scale`, `--fisheye-x`, `--fisheye-y` and
 * `--fisheye-brightness` CSS variables for their styles.
 */
export function fisheye(element: HTMLElement, options: FisheyeOptions) {
  let opts = options;
  let rafId: number | null = null;
  let pointer: { x: number; y: number } | null = null;
  let focused: HTMLElement | null = null;
  // Last translation applied to each item, to recover its untransformed position
  const offsets = new WeakMap<HTMLElement, { x: number; y: number }>();

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const items = () => Array.from(element.querySelectorAll<HTMLElement>(opts.selector));

  const layoutCenter = (item: HTMLElement) => {
    // Scaling keeps the center in place; subtract the translation to get the layout center
    const rect = item.getBoundingClientRect();
    const prev = offsets.get(item) ?? { x: 0, y: 0 };
    return { x: rect.left + rect.width / 2 - prev.x, y: rect.top + rect.height / 2 - prev.y };
  };

  const reset = (all: HTMLElement[]) => {
    focused = null;
    for (const item of all) {
      for (const prop of [
        '--fisheye-scale',
        '--fisheye-x',
        '--fisheye-y',
        '--fisheye-brightness'
      ]) {
        item.style.removeProperty(prop);
      }
      item.style.removeProperty('z-index');
      offsets.delete(item);
    }
  };

  const update = () => {
    rafId = null;
    const all = items();
    if (!pointer) return reset(all);

    const centers = new Map(all.map((item) => [item, layoutCenter(item)]));

    let closest: HTMLElement | null = null;
    let closestDistance = Infinity;
    for (const [item, c] of centers) {
      const d = Math.hypot(pointer.x - c.x, pointer.y - c.y);
      if (d < closestDistance) {
        closest = item;
        closestDistance = d;
      }
    }

    if (!closest || closest === focused) return;
    focused = closest;

    const {
      maxScale = 1.06,
      minScale = 0.96,
      minBrightness = 0.75,
      radius = 2.2,
      pull = 0.6
    } = opts;
    const focus = centers.get(closest)!;

    for (const [item, c] of centers) {
      const dx = focus.x - c.x;
      const dy = focus.y - c.y;
      const distance = Math.hypot(dx, dy);
      // offsetWidth ignores transforms, so the radius stays stable while items scale
      const t = smoothstep(Math.max(0, 1 - distance / (item.offsetWidth * radius)));
      const scale = minScale + (maxScale - minScale) * t;
      const brightness = minBrightness + (1 - minBrightness) * t;

      // Move shrunk items towards the focused one by the space their shrinking freed up
      const shift =
        distance > 0 ? (Math.max(0, 1 - scale) * item.offsetWidth * pull) / distance : 0;
      const offset = { x: dx * shift, y: dy * shift };
      offsets.set(item, offset);

      item.style.setProperty('--fisheye-scale', scale.toFixed(3));
      item.style.setProperty('--fisheye-x', `${offset.x.toFixed(1)}px`);
      item.style.setProperty('--fisheye-y', `${offset.y.toFixed(1)}px`);
      item.style.setProperty('--fisheye-brightness', brightness.toFixed(3));
      item.style.zIndex = String(Math.round(t * 10) + 1);
    }
  };

  const schedule = () => {
    if (rafId === null) rafId = requestAnimationFrame(update);
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse' || reducedMotion.matches) return;
    pointer = { x: e.clientX, y: e.clientY };
    schedule();
  };

  const onLeave = () => {
    pointer = null;
    schedule();
  };

  element.addEventListener('pointermove', onMove);
  element.addEventListener('pointerleave', onLeave);

  return {
    update(newOptions: FisheyeOptions) {
      opts = newOptions;
      focused = null;
    },
    destroy() {
      element.removeEventListener('pointermove', onMove);
      element.removeEventListener('pointerleave', onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    }
  };
}
