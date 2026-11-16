import { useEffect, useRef } from "react";

/**
 * Horizontal rail for a multi-step flow (screens, boards).
 * Peeks the next frame and shows a quiet scrollbar only while moving,
 * so a short visible set never reads as “that’s all there is.”
 */
export default function FlowMediaRail({
  children,
  className = "",
  label,
}) {
  const scrollerRef = useRef(null);
  const idleRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div className={`flow-media-rail ${className}`.trim()}>
      <div
        ref={scrollerRef}
        className="flow-media-rail__scroller"
        tabIndex={0}
        aria-label={label}
      >
        <div className="flow-media-rail__track">{children}</div>
      </div>
      <div className="flow-media-rail__fade" aria-hidden="true" />
    </div>
  );
}
