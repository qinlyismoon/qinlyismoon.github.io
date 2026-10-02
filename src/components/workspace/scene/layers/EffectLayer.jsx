/**
 * EffectLayer — light and atmosphere only. No objects live here:
 * the lamp beam and glow, plus the day/night room dim. Everything else
 * in the scene stays exactly the same between day and night.
 */
import { motion } from "framer-motion";
import { buildLampBeam } from "../../../../lib/lampLighting";
import {
  CAMERA_HANG_X,
  CAMERA_HANG_Y,
  DESK_SURFACE_Y,
  DESK_SCENE_MIN_X,
  DESK_SCENE_WIDTH,
  LAMP_HEIGHT,
  LAMP_ORIGIN_X,
  SCENE_CONTENT_SHIFT_X,
} from "../../../../lib/deskLayout";
import { CAMERA_FLASH_MS } from "../../../../lib/workspaceInteractions";

const EASE_CALM = [0.45, 0, 0.25, 1];

function LampLightLayer({ isOn, lampLight }) {
  const beam = buildLampBeam();
  const {
    opening,
    outerPath,
    innerPath,
    deskHotspot,
    farEnd,
    angle,
  } = beam;
  const L = lampLight ?? {
    beamOpening: 0.65,
    beamOuterHalo: 0.8,
    beamOuterSoft: 0.62,
    beamInner: 0.65,
    beamDesk: 0.32,
  };

  const perp = angle + Math.PI / 2;
  const clipW = 260;
  const clipD = 420;
  const clipA = {
    x: opening.x + clipW * Math.cos(perp),
    y: opening.y + clipW * Math.sin(perp),
  };
  const clipB = {
    x: opening.x - clipW * Math.cos(perp),
    y: opening.y - clipW * Math.sin(perp),
  };
  const clipC = {
    x: clipB.x + clipD * Math.cos(angle),
    y: clipB.y + clipD * Math.sin(angle),
  };
  const clipDpt = {
    x: clipA.x + clipD * Math.cos(angle),
    y: clipA.y + clipD * Math.sin(angle),
  };
  const beamClip = `M ${clipA.x} ${clipA.y} L ${clipB.x} ${clipB.y} L ${clipC.x} ${clipC.y} L ${clipDpt.x} ${clipDpt.y} Z`;

  return (
    <motion.g
      className="workspace-lamp-light"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: isOn ? 1 : 0 }}
      transition={{ duration: 0.5, ease: EASE_CALM }}
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient
          id="lampBeamAxis"
          gradientUnits="userSpaceOnUse"
          x1={opening.x}
          y1={opening.y}
          x2={farEnd.x}
          y2={farEnd.y}
        >
          <stop offset="0%" stopColor="#FFF8E8" stopOpacity={0.58 * (L.beamOuterHalo / 0.82)} />
          <stop offset="18%" stopColor="#FFE8B4" stopOpacity={0.38 * (L.beamOuterSoft / 0.65)} />
          <stop offset="50%" stopColor="#FFE4A8" stopOpacity={0.18 * (L.beamOuterSoft / 0.65)} />
          <stop offset="100%" stopColor="#FFE4A8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="lampBeamCore"
          gradientUnits="userSpaceOnUse"
          x1={opening.x}
          y1={opening.y}
          x2={farEnd.x}
          y2={farEnd.y}
        >
          <stop offset="0%" stopColor="#FFFBE8" stopOpacity={0.72 * (L.beamInner / 0.68)} />
          <stop offset="28%" stopColor="#FFE8B4" stopOpacity={0.42 * (L.beamInner / 0.68)} />
          <stop offset="100%" stopColor="#FFE4A8" stopOpacity="0" />
        </linearGradient>
        <filter id="lampBeamHalo" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="20" />
        </filter>
        <filter id="lampBeamSoft" x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="11" />
        </filter>
        <clipPath id="lampBeamBelowShade">
          <path d={beamClip} />
        </clipPath>
      </defs>

      <g clipPath="url(#lampBeamBelowShade)">
        <ellipse
          cx={opening.x}
          cy={opening.y}
          rx={14}
          ry={5}
          fill="url(#lampBeamCore)"
          opacity={L.beamOpening}
          filter="url(#lampBeamSoft)"
          transform={`rotate(${(angle * 180) / Math.PI} ${opening.x} ${opening.y})`}
        />
        <path d={outerPath} fill="url(#lampBeamAxis)" opacity={L.beamOuterHalo} filter="url(#lampBeamHalo)" />
        <path d={outerPath} fill="url(#lampBeamAxis)" opacity={L.beamOuterSoft} filter="url(#lampBeamSoft)" />
        <path d={innerPath} fill="url(#lampBeamCore)" opacity={L.beamInner} filter="url(#lampBeamSoft)" />
      </g>

      <ellipse
        cx={deskHotspot.x}
        cy={deskHotspot.y}
        rx={deskHotspot.rx}
        ry={deskHotspot.ry}
        fill="url(#lampWarmLight)"
        opacity={L.beamDesk}
      />
    </motion.g>
  );
}

export default function EffectLayer({ c, isLampOn, isNight, cameraFlash }) {
  return (
    <g className="desk-scene__layer desk-scene__layer--effects" aria-hidden="true">
      <g transform={`translate(${SCENE_CONTENT_SHIFT_X}, 0)`}>
        <LampLightLayer isOn={isLampOn} lampLight={c.lampLight} />
        {/* Lamp base warm glow — the light pool on the desk when the lamp is on. */}
        {isLampOn && (
          <g
            transform={`translate(${LAMP_ORIGIN_X}, ${DESK_SURFACE_Y - LAMP_HEIGHT})`}
          >
            <ellipse
              cx={43}
              cy={141}
              rx={34}
              ry={8}
              fill="url(#lampWarmLight)"
              opacity={c.lampLight?.glowBase ?? 0.44}
              style={{ pointerEvents: "none" }}
            />
          </g>
        )}
        {/* Camera flash — a transient light effect, not an object. */}
        <g transform={`translate(${CAMERA_HANG_X}, ${CAMERA_HANG_Y})`}>
          <motion.rect
            x="-4"
            y="0"
            width="76"
            height="58"
            rx="10"
            fill="#FFFFFF"
            initial={false}
            animate={{ opacity: cameraFlash ? [0, 0.75, 0] : 0 }}
            transition={{ duration: CAMERA_FLASH_MS / 1000, ease: "easeOut" }}
            style={{ pointerEvents: "none" }}
          />
        </g>
      </g>
      {/* Room dim is a theme value, not an independent animation. It updates
          atomically before the global page snapshot is captured; otherwise a
          second opacity animation lingers when changing from dark to light. */}
      <motion.rect
        className="desk-scene__room-dim"
        x={DESK_SCENE_MIN_X}
        y={0}
        width={DESK_SCENE_WIDTH}
        height={620}
        fill={c.roomDim}
        initial={false}
        animate={{ opacity: isNight ? 1 : 0 }}
        transition={{ duration: 0 }}
        style={{ pointerEvents: "none" }}
      />
    </g>
  );
}
