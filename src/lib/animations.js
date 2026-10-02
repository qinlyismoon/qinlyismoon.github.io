/** Full illustration canvas — object layout is authored in these coordinates. */
export const WORKSPACE_SCENE_WIDTH = 900;
export const WORKSPACE_SCENE_HEIGHT = 620;

/**
 * Virtual camera — medium-shot framing on large desktops (~13% closer).
 * On laptops, stays close to the desktop crop and fills the viewport;
 * only eases out slightly on the smallest common sizes.
 */
const WORKSPACE_CAMERA_ZOOM_DESKTOP = 1.13;
/** Stay near the desktop medium-shot — only minor easing on the smallest laptops. */
const WORKSPACE_CAMERA_ZOOM_FLOOR = 1.08;
const WORKSPACE_CAMERA_FOCUS_X_DESKTOP = 428;
const WORKSPACE_CAMERA_CROP_TOP_DESKTOP = 44;
const WORKSPACE_SCENE_OFFSET_Y_DESKTOP = 26;

/** Reference size where the current desktop medium-shot is authored. */
const WORKSPACE_DESIGN_WIDTH = 1600;
const WORKSPACE_DESIGN_HEIGHT = 900;

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Width-primary fill factor — less restrictive than min(vw, vh).
 * Height only guards against severe vertical clipping.
 */
export function getWorkspaceFitFactor(
  viewportWidth = typeof window !== "undefined" ? window.innerWidth : WORKSPACE_DESIGN_WIDTH,
  viewportHeight = typeof window !== "undefined" ? window.innerHeight : WORKSPACE_DESIGN_HEIGHT,
) {
  const availW = Math.max(320, viewportWidth);
  const availH = Math.max(320, viewportHeight);
  const widthScale = availW / WORKSPACE_DESIGN_WIDTH;
  const heightScale = availH / WORKSPACE_DESIGN_HEIGHT;
  return clamp(Math.max(widthScale * 0.96, heightScale * 0.9), 0.82, 1);
}

/**
 * Compute camera framing for the current viewport.
 * Large screens keep the medium-shot; laptops stay bold with light edge crop.
 */
export function getWorkspaceCamera(
  viewportWidth = typeof window !== "undefined" ? window.innerWidth : WORKSPACE_DESIGN_WIDTH,
  viewportHeight = typeof window !== "undefined" ? window.innerHeight : WORKSPACE_DESIGN_HEIGHT,
) {
  const fill = getWorkspaceFitFactor(viewportWidth, viewportHeight);
  // 0.82 → minimum zoom; 1.0 → full desktop medium-shot.
  const t = clamp01((fill - 0.82) / (1 - 0.82));

  const zoom =
    WORKSPACE_CAMERA_ZOOM_FLOOR +
    (WORKSPACE_CAMERA_ZOOM_DESKTOP - WORKSPACE_CAMERA_ZOOM_FLOOR) * t;
  const cropTop = WORKSPACE_CAMERA_CROP_TOP_DESKTOP;

  const cameraWidth = Math.round(WORKSPACE_SCENE_WIDTH / zoom);
  const cameraHeight = Math.round(WORKSPACE_SCENE_HEIGHT / zoom);
  const cameraX = Math.round(WORKSPACE_CAMERA_FOCUS_X_DESKTOP - cameraWidth / 2);

  // Seat the composition on the camera floor — bottom-anchored desk, no dead space under legs.
  const maxOffsetY = cropTop + cameraHeight - 548 - 6;
  const offsetY = Math.max(WORKSPACE_SCENE_OFFSET_Y_DESKTOP, maxOffsetY);

  return {
    viewBox: `${cameraX} ${cropTop} ${cameraWidth} ${cameraHeight}`,
    offsetY,
    zoom,
    fit: fill,
  };
}

const desktopCamera = getWorkspaceCamera(WORKSPACE_DESIGN_WIDTH, WORKSPACE_DESIGN_HEIGHT);

/** @deprecated Prefer getWorkspaceCamera() for responsive framing. */
export const WORKSPACE_VIEWBOX = desktopCamera.viewBox;
/** Anchor the desk to the viewport bottom for a foreground, immersive feel. */
export const WORKSPACE_ASPECT = "xMidYMax meet";
/** Light vertical nudge inside the camera frame after tighter crop (desktop). */
export const WORKSPACE_SCENE_OFFSET_Y = desktopCamera.offsetY;
