import { useEffect, useRef, useState } from "react";

/**
 * Horizontal rail for a multi-step flow (screens, boards).
 * Default: peeks the next frame so a long sequence never reads as complete.
 * The frames themselves fade out at whichever edge still has more to see —
 * left once you've scrolled in, right until you reach the end — so a cut
 * frame dissolves into the rail instead of ending in a hard seam.
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
  const [edges, setEdges] = useState({ start: false, end: true });

  useEffect(() => {
    if (fit) return undefined;
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const measure = () => {
      const max = scroller.scrollWidth - scroller.clientWidth;
      const x = scroller.scrollLeft;
      const next = { start: x > 2, end: x < max - 2 };
      setEdges((prev) =>
        prev.start === next.start && prev.end === next.end ? prev : next,
      );
    };

    const onScroll = () => {
      measure();
      scroller.classList.add("is-scrolling");
      window.clearTimeout(idleRef.current);
      idleRef.current = window.setTimeout(() => {
        scroller.classList.remove("is-scrolling");
      }, 900);
    };

    measure();
    const resize =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    resize?.observe(scroller);
    // Images load after first paint and change the track width.
    scroller.querySelectorAll("img").forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      resize?.disconnect();
      window.clearTimeout(idleRef.current);
    };
  }, [fit]);

  const edgeClass = fit
    ? ""
    : `${edges.start ? " has-more-start" : ""}${edges.end ? " has-more-end" : ""}`;

  return (
    <div
      className={`flow-media-rail${fit ? " flow-media-rail--fit" : ""}${edgeClass} ${className}`.trim()}
    >
      <div
        ref={scrollerRef}
        className="flow-media-rail__scroller"
        tabIndex={fit ? undefined : 0}
        aria-label={label}
      >
        <div className="flow-media-rail__track">{children}</div>
      </div>
    </div>
  );
}
