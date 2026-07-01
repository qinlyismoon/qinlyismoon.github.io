export const PAPER_PEEL_DURATION = 0.52;

export const PAPER_PEEL_EASE = [0.45, 0, 0.25, 1];

export const PAPER_PEEL_TRANSITION = {
  duration: PAPER_PEEL_DURATION,
  ease: PAPER_PEEL_EASE,
};

export const PAPER_CORNER_MIN = 108;
export const PAPER_CORNER_MAX = 148;
export const PAPER_PEEL_OPEN_SIZE = 2600;

export function getRestCornerSize(viewportWidth = window.innerWidth) {
  return Math.min(
    Math.max(viewportWidth * 0.15, PAPER_CORNER_MIN),
    PAPER_CORNER_MAX,
  );
}

export function landingClipPath(sizePx) {
  if (sizePx <= 0) {
    return "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)";
  }

  return `polygon(0px 0px, calc(100% - ${sizePx}px) 0px, 100% ${sizePx}px, 100% 100%, 0px 100%)`;
}

export function peelProgress(sizePx, restSize, openSize = PAPER_PEEL_OPEN_SIZE) {
  if (sizePx <= restSize) return 0;
  if (sizePx >= openSize) return 1;
  return (sizePx - restSize) / (openSize - restSize);
}

export const paperCornerHover = {
  x: -2,
  y: 2,
  transition: { duration: 0.38, ease: PAPER_PEEL_EASE },
};

export const WORKSPACE_VIEWBOX = "0 0 900 620";
export const WORKSPACE_ASPECT = "xMidYMid meet";
/** Shifts the entire desk illustration downward within the viewport. */
export const WORKSPACE_SCENE_OFFSET_Y = 48;
