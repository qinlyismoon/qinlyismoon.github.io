import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { OBJECT_HOVER, OBJECT_HOVER_ORIGIN, OBJECT_NO_HOVER } from "../../lib/workspaceInteractions";
import ViewportPortal from "../shared/ViewportPortal";

const EASE_CALM = [0.45, 0, 0.25, 1];
const HOVER_IDLE = { y: 0, scale: 1, rotate: 0 };
const TOOLTIP_FADE_MS = 300;
const TOOLTIP_VIEWPORT_PAD = 16;
const TOOLTIP_OBJECT_GAP = 10;

function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function parseHoverOrigin(origin) {
  if (!origin) return null;
  const [x, y] = origin.split(" ").map((value) => parseFloat(value));
  if (Number.isNaN(x) || Number.isNaN(y)) return null;
  return { x, y };
}

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

/** Reliable hover lift for SVG groups — Framer scale on <g> is inconsistent in Chrome. */
function SvgHoverLift({ active, origin, motion, transition, children }) {
  const groupRef = useRef(null);
  const animRef = useRef({ scale: 1, y: 0, rotate: 0 });

  useEffect(() => {
    const node = groupRef.current;
    const originPt = parseHoverOrigin(origin);
    if (!node || !originPt) return undefined;

    const durationMs = (transition?.duration ?? 0.45) * 1000;
    const target = active
      ? {
          scale: motion.scale ?? 1,
          y: motion.y ?? 0,
          rotate: motion.rotate ?? 0,
        }
      : { scale: 1, y: 0, rotate: 0 };
    const from = { ...animRef.current };
    let startTime = null;
    let frameId = 0;

    const apply = (scale, y, rotate) => {
      const { x, y: oy } = originPt;
      node.setAttribute(
        "transform",
        `translate(${x} ${oy + y}) rotate(${rotate}) scale(${scale}) translate(${-x} ${-oy})`
      );
    };

    const tick = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / durationMs, 1);
      const t = easeInOutSine(progress);
      const scale = from.scale + (target.scale - from.scale) * t;
      const y = from.y + (target.y - from.y) * t;
      const rotate = from.rotate + (target.rotate - from.rotate) * t;
      animRef.current = { scale, y, rotate };
      apply(scale, y, rotate);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else if (!active) {
        node.removeAttribute("transform");
        animRef.current = { scale: 1, y: 0, rotate: 0 };
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      if (!active) {
        node.removeAttribute("transform");
      }
    };
  }, [active, origin, motion, transition]);

  return <g ref={groupRef}>{children}</g>;
}

function getHoverAnimation(id) {
  if (OBJECT_NO_HOVER.has(id)) {
    return {
      active: HOVER_IDLE,
      transition: { duration: 0.45, ease: EASE_CALM },
      origin: null,
    };
  }

  const config = OBJECT_HOVER[id] ?? {
    y: -3,
    scale: 1.01,
    transition: { duration: 0.45, ease: EASE_CALM },
  };
  const { transition, ...active } = config;

  return {
    active,
    transition: transition ?? { duration: 0.45, ease: EASE_CALM },
    origin: OBJECT_HOVER_ORIGIN[id],
  };
}

/**
 * HTML portal tooltip — measures object + bubble with getBoundingClientRect
 * and keeps the bubble inside the viewport (flip / clamp). Avoids SVG
 * foreignObject CSS-transform bugs in Safari.
 */
function ViewportAwareTooltip({
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

export default function WorkspaceObject({
  id,
  label,
  tooltip,
  ariaLabel,
  href,
  action,
  transform,
  labelOffset = { x: 24, y: -8 },
  tooltipOffset = { x: 66, y: -16 },
  tooltipAlign = "start",
  hideLabel = false,
  hitBounds,
  isLampOn,
  isMusicPlaying,
  children,
  onActivate,
  onHoverChange,
}) {
  const objectRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipMounted, setTooltipMounted] = useState(false);
  const isToggle = action === "lamp" || action === "music";
  const isInteractiveOnly = action === "mug" || action === "plant";
  const isLink = Boolean(href) && !isToggle && !isInteractiveOnly;
  const isExternal = isLink && /^https?:\/\//.test(href);
  const isPressed =
    action === "lamp" ? isLampOn : action === "music" ? isMusicPlaying : undefined;
  const accessibleLabel = ariaLabel ?? label ?? "Interactive object";
  const tooltipVisible = Boolean(tooltip) && isHovered;

  const { active: hoverActive, transition: hoverTransition, origin: hoverOrigin } =
    getHoverAnimation(id);

  // Mount only while shown (or briefly while fading out).
  useEffect(() => {
    if (tooltipVisible) {
      setTooltipMounted(true);
      return undefined;
    }
    const timer = window.setTimeout(() => setTooltipMounted(false), TOOLTIP_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [tooltipVisible]);

  const handleActivate = (event) => {
    event.stopPropagation();
    onActivate?.({ id, action, href, event });
  };

  const setHover = (value) => () => {
    setIsHovered(value);
    onHoverChange?.(value);
  };

  const bindHover = {
    onPointerEnter: setHover(true),
    onPointerLeave: setHover(false),
    onHoverStart: setHover(true),
    onHoverEnd: setHover(false),
    onFocus: setHover(true),
    onBlur: setHover(false),
  };

  const hitProps = {
    id: `workspace-hit-${id}`,
    "aria-label": accessibleLabel,
    className: hitBounds
      ? "workspace-object__hit workspace-object__hit--bounds"
      : "workspace-object__hit",
    onClick: handleActivate,
    ...bindHover,
    "data-hovered": isHovered || undefined,
  };

  const shapeContent = typeof children === "function" ? children(isHovered) : children;
  const shapeIgnoresPointer = Boolean(hitBounds);

  const shape = hoverOrigin ? (
    <g
      className="workspace-object__shape"
      data-hovered={isHovered || undefined}
      pointerEvents={shapeIgnoresPointer ? "none" : undefined}
    >
      <SvgHoverLift
        active={isHovered}
        origin={hoverOrigin}
        motion={hoverActive}
        transition={hoverTransition}
      >
        {shapeContent}
      </SvgHoverLift>
    </g>
  ) : OBJECT_NO_HOVER.has(id) ? (
    <g
      className="workspace-object__shape"
      data-hovered={isHovered || undefined}
      pointerEvents={shapeIgnoresPointer ? "none" : undefined}
    >
      {shapeContent}
    </g>
  ) : (
    <motion.g
      className="workspace-object__shape"
      data-hovered={isHovered || undefined}
      pointerEvents={shapeIgnoresPointer ? "none" : undefined}
      animate={isHovered ? hoverActive : HOVER_IDLE}
      transition={hoverTransition}
    >
      {shapeContent}
    </motion.g>
  );

  const hitOverlay = hitBounds ? (
    <rect
      x={hitBounds.x}
      y={hitBounds.y}
      width={hitBounds.width}
      height={hitBounds.height}
      fill="transparent"
      className="workspace-object__hit-area"
    />
  ) : null;

  return (
    <g ref={objectRef} transform={transform} className="workspace-object">
      {isLink ? (
        <motion.a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...hitProps}
        >
          {shape}
          {!hideLabel && label && (
            <text className="workspace-object__label" x={labelOffset.x} y={labelOffset.y}>
              {label}
            </text>
          )}
          {hitOverlay}
        </motion.a>
      ) : (
        <g
          role="button"
          tabIndex={0}
          aria-pressed={isToggle ? isPressed : undefined}
          {...hitProps}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleActivate(event);
            }
          }}
        >
          {shape}
          {!hideLabel && label && (
            <text className="workspace-object__label" x={labelOffset.x} y={labelOffset.y}>
              {label}
            </text>
          )}
          {hitOverlay}
        </g>
      )}

      {tooltip && tooltipMounted && (
        <ViewportAwareTooltip
          objectRef={objectRef}
          offset={tooltipOffset}
          align={tooltipAlign}
          visible={tooltipVisible}
        >
          {tooltip}
        </ViewportAwareTooltip>
      )}
    </g>
  );
}
