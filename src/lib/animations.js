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

/** Full illustration canvas — object layout is authored in these coordinates. */
const WORKSPACE_SCENE_WIDTH = 900;
const WORKSPACE_SCENE_HEIGHT = 620;

/**
 * Virtual camera — medium-shot framing (~13% closer than the full scene).
 * Tweak these instead of moving individual objects.
 */
const WORKSPACE_CAMERA_ZOOM = 1.13;
const WORKSPACE_CAMERA_FOCUS_X = 428;
/** Trim empty wall above the monitor; shelf and pegboard remain visible. */
const WORKSPACE_CAMERA_CROP_TOP = 44;

const cameraWidth = Math.round(WORKSPACE_SCENE_WIDTH / WORKSPACE_CAMERA_ZOOM);
const cameraHeight = Math.round(WORKSPACE_SCENE_HEIGHT / WORKSPACE_CAMERA_ZOOM);
const cameraX = Math.round(WORKSPACE_CAMERA_FOCUS_X - cameraWidth / 2);

export const WORKSPACE_VIEWBOX = `${cameraX} ${WORKSPACE_CAMERA_CROP_TOP} ${cameraWidth} ${cameraHeight}`;
/** Anchor the desk to the viewport bottom for a foreground, immersive feel. */
export const WORKSPACE_ASPECT = "xMidYMax meet";
/** Light vertical nudge inside the camera frame after tighter crop. */
export const WORKSPACE_SCENE_OFFSET_Y = 26;
