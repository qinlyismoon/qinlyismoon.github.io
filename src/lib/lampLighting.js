import {
  DESK_SURFACE_Y,
  LAMP_BULB,
  LAMP_HEIGHT,
  LAMP_ORIGIN_X,
} from "./deskLayout";

/** Hinge at the top socket of the lampshade — rotation pivot. */
export const LAMP_HINGE_X = 84;
export const LAMP_HINGE_Y = 28;

/** Counter-clockwise tilt — shade tips upward and toward the desk center. */
export const LAMP_HEAD_TILT_DEG = -20;

/** Raised shade geometry — shared between the hood mesh and beam origin. */
export const LAMP_SHADE_RAISE = 10;

/** Bottom opening rim — coincides with the light-teal shade mouth. */
export const LAMP_SHADE_RIM = {
  cx: LAMP_HINGE_X,
  cy: 76 - LAMP_SHADE_RAISE + 0.5,
  rx: 20,
  ry: 3.6,
};

/** Extend hinge→rim axis past the opening — beam follows the tilted hood. */
const LAMP_EMISSION_AXIS_POINT = {
  x: LAMP_SHADE_RIM.cx,
  y: LAMP_SHADE_RIM.cy + (LAMP_SHADE_RIM.cy - LAMP_HINGE_Y) * 1.4,
};

const LAMP_ORIGIN_Y = DESK_SURFACE_Y - LAMP_HEIGHT;

function rotatePoint(x, y, cx, cy, deg) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const dx = x - cx;
  const dy = y - cy;
  return {
    x: cx + dx * cos - dy * sin,
    y: cy + dx * sin + dy * cos,
  };
}

function toWorld(local) {
  return { x: local.x + LAMP_ORIGIN_X, y: local.y + LAMP_ORIGIN_Y };
}

export function getLampBulbWorld() {
  return toWorld(
    rotatePoint(
      LAMP_BULB.x,
      LAMP_BULB.y,
      LAMP_HINGE_X,
      LAMP_HINGE_Y,
      LAMP_HEAD_TILT_DEG
    )
  );
}

export function getLampShadeOpeningWorld() {
  return toWorld(
    rotatePoint(
      LAMP_SHADE_RIM.cx,
      LAMP_SHADE_RIM.cy,
      LAMP_HINGE_X,
      LAMP_HINGE_Y,
      LAMP_HEAD_TILT_DEG
    )
  );
}

/** Beam direction follows the tilted shade axis (from opening through hood). */
export function getLampEmissionAngle() {
  const opening = getLampShadeOpeningWorld();
  const axisPoint = toWorld(
    rotatePoint(
      LAMP_EMISSION_AXIS_POINT.x,
      LAMP_EMISSION_AXIS_POINT.y,
      LAMP_HINGE_X,
      LAMP_HINGE_Y,
      LAMP_HEAD_TILT_DEG
    )
  );

  return Math.atan2(axisPoint.y - opening.y, axisPoint.x - opening.x);
}

function pointOnRay(origin, angle, distance) {
  return {
    x: origin.x + distance * Math.cos(angle),
    y: origin.y + distance * Math.sin(angle),
  };
}

/**
 * Soft beam cone from the shade opening — gradual spread, fades toward the desk.
 */
export function buildLampBeam({
  spreadNear = 0.12,
  spreadFar = 0.44,
} = {}) {
  const opening = getLampShadeOpeningWorld();
  const angle = getLampEmissionAngle();
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const distToDesk = sin > 0.05 ? (DESK_SURFACE_Y - opening.y) / sin : 220;
  const far = Math.max(distToDesk * 1.04, 90);
  const nearDist = 0.5;
  const deskHitX = opening.x + distToDesk * cos;

  const leftFar = pointOnRay(opening, angle - spreadFar, far);
  const rightFar = pointOnRay(opening, angle + spreadFar, far);
  const midFar = pointOnRay(opening, angle, far);
  const leftMid = pointOnRay(opening, angle - spreadFar * 0.55, far * 0.55);
  const rightMid = pointOnRay(opening, angle + spreadFar * 0.55, far * 0.55);
  const leftNear = pointOnRay(opening, angle - spreadNear, nearDist);
  const rightNear = pointOnRay(opening, angle + spreadNear, nearDist);

  const outerPath = `M ${opening.x} ${opening.y}
    L ${leftNear.x} ${leftNear.y}
    Q ${leftMid.x} ${leftMid.y} ${leftFar.x} ${leftFar.y}
    Q ${midFar.x} ${midFar.y} ${rightFar.x} ${rightFar.y}
    Q ${rightMid.x} ${rightMid.y} ${rightNear.x} ${rightNear.y}
    Z`;

  const innerPath = `M ${opening.x} ${opening.y}
    L ${pointOnRay(opening, angle - spreadNear * 0.5, nearDist + 4).x} ${pointOnRay(opening, angle - spreadNear * 0.5, nearDist + 4).y}
    Q ${pointOnRay(opening, angle - spreadFar * 0.45, far * 0.62).x} ${pointOnRay(opening, angle - spreadFar * 0.45, far * 0.62).y}
      ${pointOnRay(opening, angle - spreadFar * 0.35, far * 0.78).x} ${pointOnRay(opening, angle - spreadFar * 0.35, far * 0.78).y}
    Q ${midFar.x} ${midFar.y}
      ${pointOnRay(opening, angle + spreadFar * 0.35, far * 0.78).x} ${pointOnRay(opening, angle + spreadFar * 0.35, far * 0.78).y}
    Q ${pointOnRay(opening, angle + spreadFar * 0.45, far * 0.62).x} ${pointOnRay(opening, angle + spreadFar * 0.45, far * 0.62).y}
      ${pointOnRay(opening, angle + spreadNear * 0.5, nearDist + 4).x} ${pointOnRay(opening, angle + spreadNear * 0.5, nearDist + 4).y}
    Z`;

  return {
    bulb: getLampBulbWorld(),
    opening,
    angle,
    farEnd: midFar,
    outerPath,
    innerPath,
    deskHotspot: {
      x: deskHitX,
      y: DESK_SURFACE_Y + 1,
      rx: 108,
      ry: 22,
    },
  };
}
