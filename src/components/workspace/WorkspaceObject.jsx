import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { OBJECT_HOVER, OBJECT_HOVER_ORIGIN, OBJECT_NO_HOVER } from "../../lib/workspaceInteractions";

const EASE_CALM = [0.45, 0, 0.25, 1];
const HOVER_IDLE = { y: 0, scale: 1, rotate: 0 };

function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function parseHoverOrigin(origin) {
  if (!origin) return null;
  const [x, y] = origin.split(" ").map((value) => parseFloat(value));
  if (Number.isNaN(x) || Number.isNaN(y)) return null;
  return { x, y };
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

function AdaptiveTooltipForeignObject({ x, y, children }) {
  const measureRef = useRef(null);
  const [size, setSize] = useState({ width: 1, height: 1 });

  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return undefined;

    const update = () => {
      setSize({
        width: Math.ceil(node.offsetWidth),
        height: Math.ceil(node.offsetHeight),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [children]);

  return (
    <foreignObject x={x} y={y} width={size.width} height={size.height} overflow="visible">
      <div ref={measureRef} xmlns="http://www.w3.org/1999/xhtml" className="workspace-tooltip-measure">
        {children}
      </div>
    </foreignObject>
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
  hideLabel = false,
  hitBounds,
  isLampOn,
  isMusicPlaying,
  children,
  onActivate,
  onHoverChange,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const isToggle = action === "lamp" || action === "music";
  const isInteractiveOnly = action === "mug";
  const isLink = Boolean(href) && !isToggle && !isInteractiveOnly;
  const isExternal = isLink && /^https?:\/\//.test(href);
  const isPressed =
    action === "lamp" ? isLampOn : action === "music" ? isMusicPlaying : undefined;
  const accessibleLabel = ariaLabel ?? label ?? "Interactive object";

  const { active: hoverActive, transition: hoverTransition, origin: hoverOrigin } =
    getHoverAnimation(id);

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
    <g transform={transform} className="workspace-object">
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

      {tooltip && (
        <motion.g
          className="workspace-object__tooltip"
          pointerEvents="none"
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 5,
          }}
          transition={{ duration: 0.3, ease: EASE_CALM }}
        >
          <AdaptiveTooltipForeignObject x={tooltipOffset.x} y={tooltipOffset.y}>
            {tooltip}
          </AdaptiveTooltipForeignObject>
        </motion.g>
      )}
    </g>
  );
}
