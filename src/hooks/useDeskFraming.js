import { useLayoutEffect, useState } from "react";
import {
  DESK_SCENE_COMPACT_HEIGHT,
  DESK_SCENE_COMPACT_MIN_SCALE,
  DESK_SCENE_COMPACT_VIEWBOX,
  DESK_SCENE_HEIGHT,
  DESK_SCENE_SCALE,
  DESK_SCENE_VIEWBOX,
  DESK_SCENE_WIDTH,
} from "../lib/deskLayout";

const COMPACT_QUERY = "(max-width: 680px)";

const FULL = {
  compact: false,
  viewBox: DESK_SCENE_VIEWBOX,
  width: Math.round(DESK_SCENE_WIDTH * DESK_SCENE_SCALE),
  height: Math.round(DESK_SCENE_HEIGHT * DESK_SCENE_SCALE),
};

function compactFraming(availableHeight) {
  const fit = availableHeight > 0 ? availableHeight / DESK_SCENE_COMPACT_HEIGHT : DESK_SCENE_SCALE;
  const scale = Math.min(DESK_SCENE_SCALE, Math.max(DESK_SCENE_COMPACT_MIN_SCALE, fit));
  return {
    compact: true,
    viewBox: DESK_SCENE_COMPACT_VIEWBOX,
    width: Math.round(DESK_SCENE_WIDTH * scale),
    height: Math.round(DESK_SCENE_COMPACT_HEIGHT * scale),
  };
}

/**
 * Desk camera framing.
 *
 * Desktop keeps the authored room at the base scale and pans horizontally.
 * On phones the camera crops the empty wall above the shelves (the compact
 * viewBox) and fits the remaining height of the viewport, so the desk is
 * always on screen; it still pans horizontally and never drops below
 * DESK_SCENE_COMPACT_MIN_SCALE.
 * `stageRef` is the scene <svg>; its parent is the camera viewport
 * (`.desk-scene__viewport`), whose size never depends on the stage.
 */
export default function useDeskFraming(stageRef) {
  const [framing, setFraming] = useState(FULL);

  useLayoutEffect(() => {
    const viewport = stageRef.current?.parentElement;
    if (!viewport) return undefined;
    const media = window.matchMedia(COMPACT_QUERY);

    const update = () => {
      if (!media.matches) {
        setFraming((prev) => (prev.compact ? FULL : prev));
        return;
      }
      const style = window.getComputedStyle(viewport);
      const padding =
        parseFloat(style.paddingTop || "0") + parseFloat(style.paddingBottom || "0");
      // Leave room for the horizontal scrollbar on platforms that draw one.
      const available = viewport.clientHeight - padding - 2;
      const next = compactFraming(available);
      setFraming((prev) =>
        prev.compact && prev.width === next.width && prev.height === next.height ? prev : next,
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    media.addEventListener?.("change", update);
    return () => {
      observer.disconnect();
      media.removeEventListener?.("change", update);
    };
  }, [stageRef]);

  return framing;
}
