/**
 * Living tag under the name — outgoing slides up, incoming rises from
 * below; width eases with each line (short lines shrink back).
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
  );
}
