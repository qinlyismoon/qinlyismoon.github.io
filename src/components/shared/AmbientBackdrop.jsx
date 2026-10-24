import { useEffect, useRef } from "react";

/**
 * Airy ambient washes + ultra-fine grain behind page chrome.
 * Mounted once in SharedLayout. Each route pans the same field via
 * data-page; route View Transitions stay document-level out-then-in so
 * page copy never crossfades on top of itself.
 */
export default function AmbientBackdrop() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const clearShift = () => {
      root.style.removeProperty("--ambient-mx");
      root.style.removeProperty("--ambient-my");
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      root.style.setProperty("--ambient-mx", currentX.toFixed(2));
      root.style.setProperty("--ambient-my", currentY.toFixed(2));
      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        frame = window.requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    const onMove = (event) => {
      if (reduceMotion.matches || coarsePointer.matches) return;
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      targetX = nx * 22;
      targetY = ny * 18;
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const syncPreference = () => {
      if (reduceMotion.matches || coarsePointer.matches) {
        targetX = 0;
        targetY = 0;
        currentX = 0;
        currentY = 0;
        clearShift();
        if (frame) {
          window.cancelAnimationFrame(frame);
          frame = 0;
        }
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    reduceMotion.addEventListener?.("change", syncPreference);
    coarsePointer.addEventListener?.("change", syncPreference);
    syncPreference();

    return () => {
      window.removeEventListener("pointermove", onMove);
      reduceMotion.removeEventListener?.("change", syncPreference);
      coarsePointer.removeEventListener?.("change", syncPreference);
      if (frame) window.cancelAnimationFrame(frame);
      clearShift();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="ambient-backdrop"
      aria-hidden="true"
    >
      {/* Page camera — pans across one continuous field on route change. */}
      <div className="ambient-backdrop__pan">
        <div className="ambient-backdrop__shift">
          <span className="ambient-backdrop__glow ambient-backdrop__glow--a" />
          <span className="ambient-backdrop__glow ambient-backdrop__glow--b" />
        </div>
      </div>
      <div className="ambient-backdrop__grain" />
    </div>
  );
}
