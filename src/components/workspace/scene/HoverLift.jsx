/**
 * HoverLift — per-object hover motion for the desk scene.
 *
 * Subtle, physical lifts: a few pixels up, ~1% scale, calm easing.
 * Some objects (lamp, books, window) intentionally stay still — only the
 * label and drop-shadow respond.
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  OBJECT_HOVER,
  OBJECT_HOVER_ORIGIN,
  OBJECT_NO_HOVER,
} from "../../../lib/workspaceInteractions";

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
 * Wraps an object's visible shape with the right hover treatment.
 * `id` selects the config; `active` is the hovered/focused state.
 */
export default function HoverLift({ id, active, children }) {
  const {
    active: hoverActive,
    transition: hoverTransition,
    origin: hoverOrigin,
  } = getHoverAnimation(id);

  if (hoverOrigin) {
    return (
      <SvgHoverLift
        active={active}
        origin={hoverOrigin}
        motion={hoverActive}
        transition={hoverTransition}
      >
        {children}
      </SvgHoverLift>
    );
  }

  if (OBJECT_NO_HOVER.has(id)) {
    return <g>{children}</g>;
  }

  return (
    <motion.g animate={active ? hoverActive : HOVER_IDLE} transition={hoverTransition}>
      {children}
    </motion.g>
  );
}
