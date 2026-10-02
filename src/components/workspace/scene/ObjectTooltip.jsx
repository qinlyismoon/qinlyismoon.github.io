/**
 * ObjectTooltip — HTML portal tooltip for desk objects.
 *
 * Measures the object and the bubble with getBoundingClientRect and keeps
 * the bubble inside the viewport (flip / clamp). Rendering in HTML instead
 * of SVG foreignObject avoids Safari CSS-transform bugs.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import ViewportPortal from "../../shared/ViewportPortal";

const TOOLTIP_FADE_MS = 300;
const TOOLTIP_VIEWPORT_PAD = 16;
const TOOLTIP_OBJECT_GAP = 10;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Map an SVG local point on `node` into viewport (CSS pixel) coordinates. */
function svgLocalToViewport(node, localX, localY) {
  const svg = node?.ownerSVGElement;
  const ctm = node?.getScreenCTM?.();
  if (!svg || !ctm) return null;
  const point = svg.createSVGPoint();
  point.x = localX;
  point.y = localY;
  const screen = point.matrixTransform(ctm);
  return { x: screen.x, y: screen.y };
}

/**
 * Prefer the authored offset; if that overflows the viewport, flip beside /
 * above / below the object, then clamp with edge padding.
 */
function placeTooltipInViewport({
  objectRect,
  tooltipWidth,
  tooltipHeight,
  preferredLeft,
  preferredTop,
  preferredAlign,
}) {
  const pad = TOOLTIP_VIEWPORT_PAD;
  const gap = TOOLTIP_OBJECT_GAP;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maxLeft = Math.max(pad, vw - pad - tooltipWidth);
  const maxTop = Math.max(pad, vh - pad - tooltipHeight);

  const spaceLeft = objectRect.left - pad;
  const spaceRight = vw - pad - objectRect.right;
  const fitsLeft = tooltipWidth <= spaceLeft;
  const fitsRight = tooltipWidth <= spaceRight;
  const narrowBeside = !fitsLeft && !fitsRight;

  let left = preferredLeft;
  let top = preferredTop;

  // Very narrow: sit below the object, centered — stay visually connected.
  if (narrowBeside) {
    left = objectRect.left + objectRect.width / 2 - tooltipWidth / 2;
    top = objectRect.bottom + gap;
    if (top + tooltipHeight > vh - pad) {
      top = objectRect.top - tooltipHeight - gap;
    }
  } else {
    const overflowsLeft = left < pad;
    const overflowsRight = left + tooltipWidth > vw - pad;

    if (preferredAlign === "end") {
      // Preferred: left of object. Flip to the right when clipped.
      if (overflowsLeft && fitsRight) {
        left = objectRect.right + gap;
      } else if (overflowsRight && fitsLeft) {
        left = objectRect.left - tooltipWidth - gap;
      }
    } else {
      // Preferred: right / start. Flip to the left when clipped.
      if (overflowsRight && fitsLeft) {
        left = objectRect.left - tooltipWidth - gap;
      } else if (overflowsLeft && fitsRight) {
        left = objectRect.right + gap;
      }
    }

    if (top < pad) {
      top = objectRect.bottom + gap;
    }
    if (top + tooltipHeight > vh - pad) {
      const above = objectRect.top - tooltipHeight - gap;
      top = above >= pad ? above : pad;
    }
  }

  return {
    left: clamp(left, pad, maxLeft),
    top: clamp(top, pad, maxTop),
  };
}

export default function ObjectTooltip({
  objectRef,
  offset = { x: 66, y: -16 },
  align = "start",
  visible,
  children,
}) {
  const measureRef = useRef(null);
  const [tipNode, setTipNode] = useState(null);
  const [coords, setCoords] = useState(null);

  const setMeasureNode = useCallback((node) => {
    measureRef.current = node;
    setTipNode((prev) => (prev === node ? prev : node));
  }, []);

  useLayoutEffect(() => {
    const objectNode = objectRef.current;
    const node = tipNode ?? measureRef.current;
    if (!objectNode || !node) return undefined;

    const update = () => {
      const objectRect = objectNode.getBoundingClientRect();
      if (objectRect.width <= 0 && objectRect.height <= 0) return;

      const tipRect = node.getBoundingClientRect();
      const tooltipWidth = Math.ceil(node.offsetWidth || tipRect.width);
      const tooltipHeight = Math.ceil(node.offsetHeight || tipRect.height);
      if (tooltipWidth <= 0 || tooltipHeight <= 0) return;

      const offsetX = typeof offset?.x === "number" && Number.isFinite(offset.x) ? offset.x : 0;
      const offsetY = typeof offset?.y === "number" && Number.isFinite(offset.y) ? offset.y : 0;
      const preferredPoint = svgLocalToViewport(objectNode, offsetX, offsetY);
      if (!preferredPoint) return;

      const preferredLeft =
        align === "end" ? preferredPoint.x - tooltipWidth : preferredPoint.x;
      const preferredTop = preferredPoint.y;

      const next = placeTooltipInViewport({
        objectRect,
        tooltipWidth,
        tooltipHeight,
        preferredLeft,
        preferredTop,
        preferredAlign: align,
      });

      setCoords((prev) => {
        if (
          prev &&
          Math.abs(prev.left - next.left) < 0.5 &&
          Math.abs(prev.top - next.top) < 0.5
        ) {
          return prev;
        }
        return next;
      });
    };

    update();
    const frame = requestAnimationFrame(update);
    const observer = new ResizeObserver(update);
    observer.observe(node);
    const svg = objectNode.ownerSVGElement;
    if (svg) observer.observe(svg);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
    // `children` intentionally omitted — new element identities on parent re-render
    // were restarting measurement and freezing CSS show transitions at opacity 0.
  }, [objectRef, offset, align, visible, tipNode]);

  const ready =
    coords &&
    Number.isFinite(coords.left) &&
    Number.isFinite(coords.top);

  return (
    <ViewportPortal>
      <div
        ref={setMeasureNode}
        className={`workspace-tooltip-layer${visible && ready ? " is-visible" : ""}`}
        style={
          ready
            ? { left: coords.left, top: coords.top }
            : { left: -9999, top: -9999 }
        }
        aria-hidden={!visible}
      >
        {children}
      </div>
    </ViewportPortal>
  );
}

/**
 * Hosts the tooltip with its show/hide lifecycle. Keeps the portal mounted
 * for the fade-out after `visible` turns false.
 */
export function ObjectTooltipHost({ objectRef, offset, align, visible, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return;
    }
    const timer = setTimeout(() => setMounted(false), TOOLTIP_FADE_MS);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!children || !mounted) return null;

  return (
    <ObjectTooltip objectRef={objectRef} offset={offset} align={align} visible={visible}>
      {children}
    </ObjectTooltip>
  );
}
