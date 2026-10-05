import { useLayoutEffect, useRef } from "react";

/**
 * Sliding underline motion — one motion for every underline that moves
 * between choices (navigation tabs, Inline Choice).
 *
 * The line travels like an inchworm: the leading edge sets off first and
 * glides to the new word; the trailing edge waits a beat, then catches up
 * with a decisive settle. The line stretches across the gap and lands —
 * smooth in travel, with a small, tactile beat on arrival.
 *
 * Driven by the Web Animations API (not CSS transitions) so it keeps
 * playing while a route change crossfades the page — the page-transition
 * freeze (`.page-transitioning * { transition: none }`) used to make the
 * tab underline jump, which read as a flicker.
 */
export const INDICATOR_MOTION = {
  lead: { duration: 240, easing: "cubic-bezier(0.2, 0.9, 0.1, 1)" },
  trail: { duration: 380, delay: 70, easing: "cubic-bezier(0.6, 0, 0.1, 1)" },
};

function reduceMotion() {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * @param containerRef  positioned parent of the indicator (and the items)
 * @param indicatorRef  the absolutely positioned line (left/right driven)
 * @param getActive     returns the active item element, or null
 * @param activeKey     changes when the selection changes (animates)
 * @param layoutKey     changes when sizes may change without a new
 *                      selection, e.g. language (re-places, no animation)
 */
export default function useSlidingIndicator({
  containerRef,
  indicatorRef,
  getActive,
  activeKey,
  layoutKey,
}) {
  const getActiveRef = useRef(getActive);
  getActiveRef.current = getActive;
  const placedKeyRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const indicator = indicatorRef.current;
    if (!container || !indicator) return undefined;

    const measure = () => {
      const active = getActiveRef.current?.();
      if (!active || container.clientWidth === 0) return null;
      return {
        left: active.offsetLeft,
        right: container.clientWidth - (active.offsetLeft + active.offsetWidth),
      };
    };

    const place = (animate) => {
      const target = measure();
      if (!target) {
        indicator.style.opacity = "0";
        return;
      }
      const computed = window.getComputedStyle(indicator);
      const from = {
        left: parseFloat(computed.left),
        right: parseFloat(computed.right),
      };
      const visible = indicator.style.opacity === "1";
      indicator.getAnimations().forEach((animation) => animation.cancel());
      indicator.style.left = `${target.left}px`;
      indicator.style.right = `${target.right}px`;
      indicator.style.opacity = "1";

      if (
        !animate ||
        !visible ||
        reduceMotion() ||
        typeof indicator.animate !== "function" ||
        Number.isNaN(from.left) ||
        (from.left === target.left && from.right === target.right)
      ) {
        return;
      }

      const movingRight = target.left > from.left;
      const lead = movingRight ? "right" : "left";
      const trail = movingRight ? "left" : "right";
      indicator.animate(
        [{ [lead]: `${from[lead]}px` }, { [lead]: `${target[lead]}px` }],
        { ...INDICATOR_MOTION.lead },
      );
      indicator.animate(
        [{ [trail]: `${from[trail]}px` }, { [trail]: `${target[trail]}px` }],
        { ...INDICATOR_MOTION.trail, fill: "backwards" },
      );
    };

    const isNewSelection =
      placedKeyRef.current !== null && placedKeyRef.current !== activeKey;
    place(isNewSelection);
    placedKeyRef.current = activeKey;

    // Re-place only when the container really changes size (the observer
    // also fires once on observe, which must not cancel the glide).
    let lastWidth = container.clientWidth;
    const observer = new ResizeObserver(() => {
      if (container.clientWidth === lastWidth) return;
      lastWidth = container.clientWidth;
      place(false);
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, indicatorRef, activeKey, layoutKey]);
}
