import { useEffect, useRef } from "react";

/**
 * Horizontal rail for a multi-step flow (screens, boards).
 * Default: peeks the next frame so a long sequence never reads as complete.
 * `fit`: every frame is visible — no scroll cue, no edge fade.
 */
export default function FlowMediaRail({
  children,
  className = "",
  label,
  fit = false,
}) {
  const scrollerRef = useRef(null);
  const idleRef = useRef(null);

  useEffect(() => {
    if (fit) return undefined;
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;
    const onScroll = () => {
      scroller.classList.add("is-scrolling");
      window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(() => {
        scroller.classList.remove("is-scrolling");
      }, 900);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleRef.current);
    };
  }, [fit]);

  return (
    <div
      className={`flow-media-rail${fit ? " flow-media-rail--fit" : ""} ${className}`.trim()}
    >
      <div
        ref={scrollerRef}
        className="flow-media-rail__scroller"
        tabIndex={fit ? undefined : 0}
        aria-label={label}
      >
        <div className="flow-media-rail__track">{children}</div>
      </div>
      {fit ? null : <div className="flow-media-rail__fade" aria-hidden="true" />}
    </div>
  );
}
