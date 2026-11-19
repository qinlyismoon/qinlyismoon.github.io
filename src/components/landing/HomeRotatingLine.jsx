/**
 * Living tag under the name — outgoing slides up, incoming rises from
 * below. Outer slot stays at the longest line’s width (contact links
 * don’t shift); the tinted pill eases to each line’s width.
 * Each trait keeps its own quiet tint while the copy swaps.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const INTERVAL_MS = 4200;
const EXIT_MS = 480;

function normalizeLines(lines) {
  if (!Array.isArray(lines)) return [];
  return lines
    .map((line, index) => {
      if (typeof line === "string") {
        return { id: `line-${index}`, label: line };
      }
      if (line && typeof line.label === "string") {
        return {
          id: line.id || `line-${index}`,
          label: line.label,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function measureTagWidth(tag, textNode) {
  if (!tag || !textNode) return null;
  const styles = getComputedStyle(tag);
  const padX =
    (parseFloat(styles.paddingLeft) || 0) +
    (parseFloat(styles.paddingRight) || 0);
  // Border-box width must include padding; +1 covers subpixel rounding.
  return Math.ceil(textNode.scrollWidth + padX) + 1;
}

export default function HomeRotatingLine({ lines }) {
  const items = normalizeLines(lines);
  const [index, setIndex] = useState(0);
  const [leavingIndex, setLeavingIndex] = useState(null);
  const [width, setWidth] = useState(null);
  // Width of the longest line. The slot around the chip always reserves it,
  // so whether the chip fits beside the role line or wraps below it is the
  // same for every line — the page never jumps as the copy rotates.
  const [slotWidth, setSlotWidth] = useState(null);
  const tagRef = useRef(null);
  const measureRefs = useRef([]);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const tick = window.setInterval(() => {
      setIndex((value) => {
        setLeavingIndex(value);
        return (value + 1) % items.length;
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(tick);
  }, [items.length]);

  useEffect(() => {
    if (leavingIndex == null) return undefined;
    const clear = window.setTimeout(() => setLeavingIndex(null), EXIT_MS);
    return () => window.clearTimeout(clear);
  }, [leavingIndex, index]);

  useLayoutEffect(() => {
    const next = measureTagWidth(tagRef.current, measureRefs.current[index]);
    if (next != null) setWidth(next);
  }, [index, items]);

  const labelsKey = items.map((item) => item.label).join("|");
  useLayoutEffect(() => {
    const measureSlot = () => {
      const widths = measureRefs.current
        .map((node) => measureTagWidth(tagRef.current, node))
        .filter((value) => value != null);
      if (widths.length) setSlotWidth(Math.max(...widths));
    };
    measureSlot();
    // Re-measure once web fonts settle, and on resize.
    document.fonts?.ready?.then(measureSlot);
    window.addEventListener("resize", measureSlot);
    return () => window.removeEventListener("resize", measureSlot);
  }, [labelsKey]);

  useEffect(() => {
    const onResize = () => {
      const next = measureTagWidth(tagRef.current, measureRefs.current[index]);
      if (next != null) setWidth(next);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index]);

  if (!items.length) return null;

  const activeId = items[index]?.id;

  return (
    <span
      className="home-bento__tag-slot"
      style={slotWidth != null ? { width: `${slotWidth}px` } : undefined}
    >
    <div
      ref={tagRef}
      className={[
        "home-bento__tag",
        activeId ? `home-bento__tag--${activeId}` : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-live="polite"
      style={width != null ? { width: `${width}px` } : undefined}
    >
      <span className="home-bento__tag-track">
        {items.map((line, lineIndex) => {
          const isActive = lineIndex === index;
          const isLeaving = lineIndex === leavingIndex;
          return (
            <span
              key={line.id}
              ref={(node) => {
                measureRefs.current[lineIndex] = node;
              }}
              className={[
                "home-bento__tag-text",
                isActive ? "is-active" : "",
                isLeaving ? "is-leaving" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {line.label}
            </span>
          );
        })}
      </span>
    </div>
    </span>
  );
}
