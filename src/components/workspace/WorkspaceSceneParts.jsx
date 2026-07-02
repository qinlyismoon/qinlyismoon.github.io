import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useEasternHandAngles } from "../../hooks/useEasternTime";
import { PlantShape } from "./PlantShape";
import {
  CABINET_LEFT,
  CABINET_RIGHT,
  CABINET_WIDTH,
  STICKY_NOTE_X,
  STICKY_NOTE_Y,
  CAMERA_HANG_X,
  CAMERA_HANG_Y,
  CAMERA_REST_BOTTOM,
  DESK_BOTTOM,
  DESK_CENTER,
  DESK_LEFT,
  DESK_OVERHANG_SIDE,
  DESK_RIGHT,
  DESK_SURFACE_Y,
  DESK_THICK,
  DESK_FRONT_EDGE,
  LAMP_BULB,
  LAMP_HEIGHT,
  LAMP_ORIGIN_X,
  LEG_LEFT,
  LEG_RIGHT,
  LEG_WIDTH,
  SHELF_LEFT_W,
  SHELF_LEFT_X,
  SHELF_LEFT_Y,
  SPEAKER_HANG_X,
  SPEAKER_HANG_Y,
  SPEAKER_PANEL_X,
  SPEAKER_PANEL_Y,
  SPEAKER_PANEL_W,
  CAMERA_PANEL_X,
  CAMERA_PANEL_Y,
  CAMERA_PANEL_W,
  GRID_SHELF_H,
  WIRE_GRID_X,
  WIRE_GRID_W,
  WIRE_GRID_TOP,
  WIRE_GRID_BOTTOM,
  MONITOR_TOTAL_H,
  BOOKS_MAX_H,
} from "../../lib/deskLayout";
import {
  buildLampBeam,
  LAMP_HEAD_TILT_DEG,
  LAMP_HINGE_X,
  LAMP_HINGE_Y,
  LAMP_SHADE_RAISE,
  LAMP_SHADE_RIM,
} from "../../lib/lampLighting";
import { MUG_STIR_MS } from "../../lib/workspaceInteractions";

const EASE_CALM = [0.45, 0, 0.25, 1];

function sampleDriftPath(points, progress) {
  const span = points.length - 1;
  const scaled = progress * span;
  const index = Math.min(Math.floor(scaled), span - 1);
  const blend = scaled - index;
  const [x0, y0] = points[index];
  const [x1, y1] = points[index + 1];
  return [x0 + (x1 - x0) * blend, y0 + (y1 - y0) * blend];
}

const MONITOR_CURSOR_DRIFT = [
  [0, 0],
  [10, -10],
  [-8, -6],
  [6, -12],
  [-4, -4],
  [0, 0],
];
const MONITOR_UI_DRIFT = [
  [0, 0],
  [1, -1],
  [0, 0],
];

/** SVG `<g>` ignores CSS/Framer transforms in Chrome — drive `transform` via rAF instead. */
function SvgTranslateDrift({ active, points, duration = 3000, className, children }) {
  const driftRef = useRef(null);

  useEffect(() => {
    const node = driftRef.current;
    if (!active || !node) {
      node?.setAttribute("transform", "translate(0, 0)");
      return undefined;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const progress = ((now - startedAt) % duration) / duration;
      const [dx, dy] = sampleDriftPath(points, progress);
      node.setAttribute("transform", `translate(${dx}, ${dy})`);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      node.setAttribute("transform", "translate(0, 0)");
    };
  }, [active, duration, points]);

  return (
    <g ref={driftRef} className={className}>
      {children}
    </g>
  );
}

/** Matcha drink fills — fixed across light/dark; only lighting overlays change. */
const MATCHA_DRINK = {
  matchaDeep: "#6E9070",
  matcha: "#8BA888",
  matchaLight: "#A5C49E",
  matchaWarm: "#9CB88A",
  milkTop: "#E8DDD0",
  milkMid: "#F2EBE0",
  milkBottom: "#FFFCF7",
  milkWarm: "#FFF6EC",
  ice: "rgba(255, 252, 247, 0.42)",
  straw: "#FFFCF7",
  strawAccent: "#F5EFE3",
  foam: "#FFFCF7",
};

const MUG_CX = 34;
const MUG_DESK_Y = 78;
const MUG_RIM_CY = 20;
const MUG_RIM_RX = 19;
const MUG_RIM_RY = 4.8;
const MUG_BASE_RX = 13.5;
const MUG_BASE_RY = 2.8;
const MUG_BASE_CY = MUG_DESK_Y - MUG_BASE_RY;
const MUG_WALL = 1.8;
const MUG_LIQUID_TOP = 27;
const MUG_MATCHA_BOTTOM = 50;
const MUG_LIQUID_BOTTOM = MUG_BASE_CY - MUG_BASE_RY - 0.4;

function mugGlassSilhouette(cx, rimCy, rimRx, rimRy, baseCy, baseRx, baseRy) {
  return `M ${cx - rimRx} ${rimCy}
    A ${rimRx} ${rimRy} 0 0 0 ${cx + rimRx} ${rimCy}
    L ${cx + baseRx} ${baseCy}
    A ${baseRx} ${baseRy} 0 0 1 ${cx - baseRx} ${baseCy}
    L ${cx - rimRx} ${rimCy}
    A ${rimRx} ${rimRy} 0 0 1 ${cx - rimRx} ${rimCy} Z`;
}

function mugInnerSilhouette(cx, wall = MUG_WALL) {
  return mugGlassSilhouette(
    cx,
    MUG_RIM_CY,
    MUG_RIM_RX - wall,
    MUG_RIM_RY - wall * 0.45,
    MUG_BASE_CY,
    MUG_BASE_RX - wall,
    MUG_BASE_RY - wall * 0.35
  );
}

function mugLiquidRxAt(y) {
  const topRx = MUG_RIM_RX - MUG_WALL;
  const botRx = MUG_BASE_RX - MUG_WALL;
  const t = (y - MUG_RIM_CY) / (MUG_BASE_CY - MUG_RIM_CY);
  return topRx + (botRx - topRx) * t;
}

const MUG_INNER_CLIP_PATH = mugInnerSilhouette(MUG_CX);

const BOOKS_CONTACT_Y = BOOKS_MAX_H;

const BOOK_SPECS = [
  { x: 0, y: 28, w: 15, h: 50, fill: "coralDeep", spine: "coralLight", accent: "coral" },
  { x: 12, y: 20, w: 18, h: 58, fill: "tealDeep", spine: "tealLight", accent: "teal" },
  { x: 27, y: 12, w: 17, h: 66, fill: "teal", spine: "tealLight", accent: "white" },
  { x: 40, y: 22, w: 20, h: 56, fill: "coral", spine: "coralLight", accent: "cream" },
  { x: 55, y: 8, w: 17, h: 70, fill: "cream", spine: "white", accent: "coral" },
  { x: 67, y: 18, w: 16, h: 60, fill: "tealDeep", spine: "tealLight", accent: "teal" },
];

function BookContactShadow({ book, shelfY, color }) {
  return (
    <ellipse
      cx={book.x + book.w / 2}
      cy={shelfY + 2}
      rx={book.w * 0.64}
      ry={3.2}
      fill={color}
      opacity="0.72"
    />
  );
}

function BooksRowShadow({ shelfY, color }) {
  const left = BOOK_SPECS[0].x;
  const right = BOOK_SPECS[BOOK_SPECS.length - 1].x + BOOK_SPECS[BOOK_SPECS.length - 1].w;

  return (
    <ellipse
      cx={(left + right) / 2}
      cy={shelfY + 3}
      rx={(right - left) / 2 + 6}
      ry={4}
      fill={color}
      opacity="0.38"
    />
  );
}

function BookVolume({ book, c }) {
  return (
    <g>
      <rect x={book.x} y={book.y} width={book.w} height={book.h} rx="2.5" fill={c[book.fill]} />
      <rect
        x={book.x + 2}
        y={book.y + 3}
        width="3"
        height={book.h - 6}
        rx="1"
        fill={c[book.spine]}
        opacity="0.55"
      />
      <rect
        x={book.x + 5}
        y={book.y + 10}
        width={Math.max(book.w - 8, 6)}
        height="2"
        rx="1"
        fill={c[book.accent]}
        opacity="0.35"
      />
      {book.fill === "cream" && (
        <rect
          x={book.x + 5}
          y={book.y + 20}
          width={Math.max(book.w - 8, 6)}
          height="1.5"
          rx="0.75"
          fill={c.inkSoft}
          opacity="0.22"
        />
      )}
    </g>
  );
}

export function SceneDefs({ c }) {
  return (
    <defs>
      <radialGradient id="lampWarmLight" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.68" />
        <stop offset="45%" stopColor="#FFE8B4" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#FFE8B4" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lampHotCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.82" />
        <stop offset="100%" stopColor="#FFF8E8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="matchaLiquid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.matchaDeep} />
        <stop offset="100%" stopColor={MATCHA_DRINK.matcha} />
      </linearGradient>
      <linearGradient id="matchaLiquidWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.matchaDeep} stopOpacity="0.92" />
        <stop offset="100%" stopColor={MATCHA_DRINK.matchaWarm} />
      </linearGradient>
      <linearGradient id="matchaMilk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.milkTop} stopOpacity="0.92" />
        <stop offset="52%" stopColor={MATCHA_DRINK.milkMid} />
        <stop offset="100%" stopColor={MATCHA_DRINK.milkBottom} />
      </linearGradient>
      <linearGradient id="matchaMilkWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.milkMid} stopOpacity="0.9" />
        <stop offset="100%" stopColor={MATCHA_DRINK.milkWarm} />
      </linearGradient>
      <clipPath id="glassInteriorClip">
        <path d={MUG_INNER_CLIP_PATH} />
      </clipPath>
      <linearGradient id="calendarPaper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.white} />
        <stop offset="100%" stopColor={c.cream} stopOpacity="0.55" />
      </linearGradient>
      <radialGradient id="lensGlare" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="screenBreath" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
    </defs>
  );
}

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
}

function DeskWarmGlow({ cx, cy, rx, ry, fill = "url(#lampWarmLight)", opacity = 0.32 }) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fill}
      opacity={opacity}
      aria-hidden="true"
    />
  );
}

export function LampLightLayer({ isOn, lampLight }) {
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

const DESK_CORNER_R = 10;
const DESK_BEAM_H = 2;
const DESK_DRAWER_R = 6;

function FlatDeskIllustration({ c, top, under, floor }) {
  const deskW = DESK_RIGHT - DESK_LEFT;
  const supportH = floor - under;
  const kneeLeft = CABINET_RIGHT;
  const kneeRight = LEG_LEFT;

  const drawerInsetX = 12;
  const drawerInsetTop = 16;
  const drawerInsetBottom = 12;
  const drawerGap = 10;
  const drawerW = CABINET_WIDTH - drawerInsetX * 2;
  const drawerX = CABINET_LEFT + drawerInsetX;
  const drawerAreaH = supportH - drawerInsetTop - drawerInsetBottom;
  const drawerH = Math.floor((drawerAreaH - drawerGap * 2) / 3);
  const drawerYs = [0, 1, 2].map((index) => under + drawerInsetTop + index * (drawerH + drawerGap));
  const handleCx = CABINET_LEFT + CABINET_WIDTH / 2;
  const drawerFrontInset = 3;

  return (
    <g className="flat-desk">
      <rect
        x={CABINET_LEFT}
        y={under}
        width={CABINET_WIDTH}
        height={supportH}
        rx={DESK_CORNER_R}
        fill={c.wood}
      />

      <rect
        x={LEG_LEFT}
        y={under}
        width={LEG_WIDTH}
        height={supportH}
        rx={DESK_CORNER_R}
        fill={c.wood}
      />

      <rect
        x={kneeLeft}
        y={under}
        width={kneeRight - kneeLeft}
        height={DESK_BEAM_H}
        rx={1}
        fill={c.woodDark}
      />

      {drawerYs.map((y, index) => (
        <g key={`drawer-${index}`}>
          {index > 0 && (
            <line
              x1={drawerX + 2}
              y1={y - drawerGap / 2}
              x2={drawerX + drawerW - 2}
              y2={y - drawerGap / 2}
              stroke={c.woodDark}
              strokeWidth="0.75"
              strokeOpacity="0.2"
            />
          )}
          <rect
            x={drawerX + drawerFrontInset}
            y={y + drawerFrontInset}
            width={drawerW - drawerFrontInset * 2}
            height={drawerH - drawerFrontInset * 2}
            rx={DESK_DRAWER_R}
            fill={c.woodLight}
            opacity="0.52"
          />
          <rect
            x={handleCx - 9}
            y={y + drawerH / 2 - 1.25}
            width="18"
            height="2.5"
            rx="1.25"
            fill={c.woodDark}
            opacity="0.35"
          />
        </g>
      ))}

      <rect
        x={DESK_LEFT + 3}
        y={under}
        width={deskW - 6}
        height={DESK_FRONT_EDGE}
        rx={2}
        fill={c.wood}
      />
      <rect
        x={DESK_LEFT}
        y={top}
        width={deskW}
        height={DESK_THICK}
        rx={DESK_CORNER_R}
        fill={c.woodLight}
      />
    </g>
  );
}

/** Soft drop shadow — light from upper-left, shadow falls down-right. */
function WallShadow({ cx, cy, rx, ry, color, opacity = 0.55 }) {
  return <ellipse cx={cx + 2.5} cy={cy + 3} rx={rx} ry={ry} fill={color} opacity={opacity} />;
}

/** Continuous rounded-rect path for bent metal wire. */
function roundedWireRectPath(ix, iy, iw, ih, r) {
  return `M ${ix + r} ${iy} H ${ix + iw - r} Q ${ix + iw} ${iy} ${ix + iw} ${iy + r} V ${iy + ih - r} Q ${ix + iw} ${iy + ih} ${ix + iw - r} ${iy + ih} H ${ix + r} Q ${ix} ${iy + ih} ${ix} ${iy + ih - r} V ${iy + r} Q ${ix} ${iy} ${ix + r} ${iy} Z`;
}

/** Visible metal rod for the wire grid. */
function MetalRod({ x1, y1, x2, y2, metal, highlight, thickness = 2.2 }) {
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={metal}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
      <line
        x1={x1}
        y1={y1 - 0.35}
        x2={x2}
        y2={y2 - 0.35}
        stroke={highlight}
        strokeWidth={thickness * 0.3}
        strokeLinecap="round"
        opacity="0.5"
      />
    </g>
  );
}

/** Thin pastel shelf — single layer, clips onto grid wires. */
function GridShelf({ x, y, w, h, fill, shadowColor, metal, highlight, clipXs }) {
  const cap = h / 2;

  return (
    <g className="workspace-grid-shelf">
      <WallShadow
        cx={x + w / 2}
        cy={y + h + 1}
        rx={w / 2 - 6}
        ry={1.8}
        color={shadowColor}
        opacity={0.28}
      />

      {clipXs.map((clipX) => (
        <MetalRod
          key={clipX}
          x1={clipX}
          y1={y - 7}
          x2={clipX}
          y2={y}
          metal={metal}
          highlight={highlight}
          thickness={1.55}
        />
      ))}

      <rect x={x} y={y} width={w} height={h} rx={cap} fill={fill} />
    </g>
  );
}

/** Metal wire grid wall — open mesh, no background panel. */
function WireGridPanel({ c, isLampOn }) {
  const x0 = WIRE_GRID_X;
  const y0 = WIRE_GRID_TOP;
  const w = WIRE_GRID_W;
  const h = WIRE_GRID_BOTTOM - WIRE_GRID_TOP;
  const shadowColor = isLampOn ? c.shadow : c.softShadow;
  const metal = isLampOn ? "#C8BEB4" : "#B0A89C";
  const highlight = isLampOn ? "rgba(255, 248, 236, 0.62)" : "rgba(255, 252, 247, 0.48)";
  const rod = 2.2;
  const panelSpeaker = c.coral;
  const panelCamera = c.yellow;

  const inset = 5;
  const ix = x0 + inset;
  const iy = y0 + inset;
  const iw = w - inset * 2;
  const ih = h - inset * 2;
  const cornerR = 10;
  const cols = 4;
  const rows = 7;
  const framePath = roundedWireRectPath(ix, iy, iw, ih, cornerR);
  const rodLeft = ix + cornerR;
  const rodRight = ix + iw - cornerR;
  const rodTop = iy + cornerR;
  const rodBottom = iy + ih - cornerR;

  const verticalXs = Array.from({ length: cols - 1 }, (_, i) => ix + (iw / (cols - 1)) * (i + 1));
  const horizontalYs = Array.from({ length: rows - 1 }, (_, i) => iy + (ih / (rows - 1)) * (i + 1));

  const speakerClipXs = [SPEAKER_PANEL_X + 14, SPEAKER_PANEL_X + SPEAKER_PANEL_W - 14];
  const cameraClipXs = [CAMERA_PANEL_X + 14, CAMERA_PANEL_X + CAMERA_PANEL_W - 14];

  return (
    <g className="workspace-wire-grid">
      <path
        d={framePath}
        fill="none"
        stroke={metal}
        strokeWidth={rod}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d={framePath}
        fill="none"
        stroke={highlight}
        strokeWidth={rod * 0.32}
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
        transform="translate(0, -0.35)"
      />

      {verticalXs.map((cx, i) => (
        <MetalRod
          key={`v-${i}`}
          x1={cx}
          y1={rodTop}
          x2={cx}
          y2={rodBottom}
          metal={metal}
          highlight={highlight}
          thickness={rod}
        />
      ))}

      {horizontalYs.map((cy, i) => (
        <MetalRod
          key={`h-${i}`}
          x1={rodLeft}
          y1={cy}
          x2={rodRight}
          y2={cy}
          metal={metal}
          highlight={highlight}
          thickness={rod}
        />
      ))}

      <GridShelf
        x={SPEAKER_PANEL_X}
        y={SPEAKER_PANEL_Y}
        w={SPEAKER_PANEL_W}
        h={GRID_SHELF_H}
        fill={panelSpeaker}
        shadowColor={shadowColor}
        metal={metal}
        highlight={highlight}
        clipXs={speakerClipXs}
      />
      <GridShelf
        x={CAMERA_PANEL_X}
        y={CAMERA_PANEL_Y}
        w={CAMERA_PANEL_W}
        h={GRID_SHELF_H}
        fill={panelCamera}
        shadowColor={shadowColor}
        metal={metal}
        highlight={highlight}
        clipXs={cameraClipXs}
      />
    </g>
  );
}

export function PhoebeDeskScene({ palette, isLampOn = false }) {
  const c = palette;
  const top = DESK_SURFACE_Y;
  const under = top + DESK_THICK;
  const floor = DESK_BOTTOM;

  return (
    <g className="workspace-scene__structure" aria-hidden="true">
      <g transform={`translate(${SHELF_LEFT_X}, ${SHELF_LEFT_Y})`}>
        <ContactShadow cx={SHELF_LEFT_W / 2} cy={2} rx={SHELF_LEFT_W / 2 - 8} ry={4} color={c.softShadow} />
        <rect x="0" y="0" width={SHELF_LEFT_W} height="10" rx="3" fill={c.shelf} />
        <rect x="0" y="0" width={SHELF_LEFT_W} height="3" rx="2" fill={c.woodLight} opacity="0.45" />
      </g>

      <WireGridPanel c={c} isLampOn={isLampOn} />

      <g transform={`translate(${STICKY_NOTE_X}, ${STICKY_NOTE_Y})`}>
        <StickyNoteShape c={c} isLampOn={isLampOn} />
      </g>

      <ContactShadow
        cx={DESK_CENTER}
        cy={floor + 2}
        rx={(DESK_RIGHT - DESK_LEFT) / 2 - 24}
        ry={4.5}
        color={c.softShadow}
      />
      <FlatDeskIllustration c={c} top={top} under={under} floor={floor} />
    </g>
  );
}

export function BooksShape({ c, isLampOn }) {
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  return (
    <g>
      <BooksRowShadow shelfY={BOOKS_CONTACT_Y} color={shadowColor} />
      {BOOK_SPECS.map((book, index) => (
        <BookContactShadow
          key={`shadow-${index}`}
          book={book}
          shelfY={BOOKS_CONTACT_Y}
          color={shadowColor}
        />
      ))}
      {BOOK_SPECS.map((book, index) => (
        <BookVolume key={index} book={book} c={c} />
      ))}
    </g>
  );
}

function ClockHand({ angle, length, stroke, strokeWidth, opacity = 1 }) {
  return (
    <g transform={`rotate(${angle} 38 38)`}>
      <line
        x1="38"
        y1="38"
        x2="38"
        y2={38 - length}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={opacity}
      />
    </g>
  );
}

export function ClockShape({ c, isHovered = false, isLampOn = false }) {
  const { hour, minute, second } = useEasternHandAngles();
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  return (
    <g>
      <ContactShadow
        cx={38}
        cy={80}
        rx={isHovered ? 34 : 32}
        ry={isHovered ? 3.4 : 3}
        color={shadowColor}
      />
      <rect x="28" y="68" width="6" height="10" rx="2" fill={c.woodDark} />
      <rect x="42" y="68" width="6" height="10" rx="2" fill={c.woodDark} />
      <circle cx="38" cy="38" r="36" fill={c.white} />
      <circle cx="38" cy="38" r="30" fill={c.cream} opacity="0.5" />

      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <line
          key={deg}
          x1="38"
          y1="10"
          x2="38"
          y2="14"
          stroke={c.inkSoft}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.35"
          transform={`rotate(${deg} 38 38)`}
        />
      ))}

      <ClockHand angle={hour} length={16} stroke={c.ink} strokeWidth="2.5" />
      <ClockHand angle={minute} length={22} stroke={c.inkSoft} strokeWidth="1.5" />
      <ClockHand angle={second} length={24} stroke={c.coral} strokeWidth="1" opacity="0.85" />

      <circle cx="38" cy="38" r="2.5" fill={c.coral} />
    </g>
  );
}

function MusicNotes({ c }) {
  const noteColor = c.ink ?? "#4A4038";

  const note = (scale = 1) => (
    <g transform={`scale(${scale})`} opacity="0.9">
      <path
        d="M6 2 C6 1 6.7 0.4 7.6 0.6 L13.2 1.8 C14.1 2 14.6 2.7 14.4 3.6 L13.6 7.6 C13.4 8.6 12.5 9.3 11.5 9.2 L8.7 8.8 L8.7 14.5 C8.7 16.5 6.9 18 4.7 18 C2.8 18 1.3 16.9 1.1 15.3 C0.8 13.4 2.4 11.8 4.7 11.8 C5.6 11.8 6.4 12.1 7 12.5 L7 2 Z"
        fill={noteColor}
      />
    </g>
  );

  const configs = [
    { x: 30, y: 0, driftX: [-3, 8, 20], driftY: [6, -18, -48], delay: 0, scale: 0.9 },
    { x: 50, y: 8, driftX: [3, -10, -22], driftY: [8, -22, -52], delay: 1.1, scale: 0.84 },
  ];

  return (
    <g className="speaker-music-notes" pointerEvents="none">
      {configs.map((cfg, index) => (
        <motion.g
          key={index}
          initial={{ opacity: 0, y: cfg.driftY[0], x: cfg.driftX[0] }}
          animate={{
            opacity: [0, 0.5, 0],
            y: cfg.driftY,
            x: cfg.driftX,
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: cfg.delay,
            ease: "easeOut",
          }}
        >
          <g transform={`translate(${cfg.x}, ${cfg.y})`}>{note(cfg.scale)}</g>
        </motion.g>
      ))}
    </g>
  );
}

export function SpeakerShape({ c, isLampOn, isMusicPlaying = false }) {
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  return (
    <g>
      <ContactShadow cx={30} cy={85} rx={22} ry={1.8} color={shadowColor} opacity={0.65} />
      <rect x="0" y="0" width="56" height="84" rx="9" fill={c.gray} />
      <rect x="4" y="4" width="48" height="76" rx="7" fill={c.grayLight} opacity={0.45} />
      <circle cx="28" cy="26" r="11" fill={c.inkSoft} opacity="0.35" />
      <circle cx="28" cy="58" r="15" fill={c.inkSoft} opacity="0.35" />
      <circle cx="28" cy="78" r="2" fill={c.plant} opacity="0.55" />
      {isMusicPlaying && <MusicNotes c={c} />}
    </g>
  );
}

export function StickyNoteShape({ c, isLampOn }) {
  const W = 44;
  const H = 52;
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  return (
    <g>
      <ContactShadow cx={W / 2 + 1.5} cy={H + 1.5} rx={18} ry={1.8} color={shadowColor} opacity={0.55} />

      <rect x="4" y="3" width={W - 6} height={H - 3} rx="5" fill={c.cream} opacity="0.35" />
      <rect x="0" y="0" width={W} height={H} rx="6" fill={isLampOn ? c.white : c.white} />
      <rect x="0" y="0" width={W} height={H} rx="6" fill={c.cream} opacity={isLampOn ? 0.42 : 0.55} />

      <circle cx={W / 2} cy="5" r="3.2" fill={c.coral} opacity="0.55" />
      <circle cx={W / 2 - 0.6} cy="4.2" r="1" fill={c.white} opacity="0.45" />

      <rect x="7" y="14" width="26" height="2" rx="1" fill={c.inkSoft} opacity="0.16" />
      <rect x="7" y="22" width="30" height="2" rx="1" fill={c.inkSoft} opacity="0.12" />
      <rect x="7" y="30" width="22" height="2" rx="1" fill={c.inkSoft} opacity="0.1" />
      <rect x="7" y="38" width="18" height="2" rx="1" fill={c.coral} opacity="0.14" />

      <rect x={W - 1.5} y="2" width="1.5" height={H - 2} rx="0.75" fill={c.cream} opacity="0.5" />
    </g>
  );
}

export function CameraShape({ c, isHovered, cameraFlash, isLampOn }) {
  const W = 68;
  const cx = W / 2;
  const bodyY = 10;
  const bodyH = 42;
  const bandY = 20;
  const bandH = 16;
  const lensCy = bandY + bandH / 2;
  const bandFill = "#2E3836";
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  return (
    <g>
      <ContactShadow cx={cx} cy={CAMERA_REST_BOTTOM + 2} rx={24} ry={1.6} color={shadowColor} opacity={0.65} />

      {/* Chassis — upper / lower teal panels */}
      <rect x="0" y={bodyY} width={W} height={bodyH} rx="8" fill={c.teal} />
      <rect x="4" y={bodyY + 2} width="60" height="10" rx="4" fill={c.tealLight} opacity="0.26" />
      <rect x="4" y={bodyY + bodyH - 11} width="60" height="9" rx="4" fill={c.tealLight} opacity="0.2" />

      {/* Dark front band */}
      <rect x="4" y={bandY} width="60" height={bandH} rx="2.5" fill={bandFill} />

      {/* Top plate */}
      <rect x="2" y="3" width="64" height="9" rx="3.5" fill={c.teal} />
      <rect x="2" y="3" width="64" height="3" rx="3.5" fill={c.tealLight} opacity="0.3" />

      {/* Flash */}
      <rect x="27" y="1" width="14" height="6" rx="2" fill={bandFill} />
      <rect x="29" y="2.5" width="10" height="3.5" rx="1" fill={c.cream} opacity="0.82" />

      {/* Shutter */}
      <rect x="54" y="4.5" width="5" height="4.5" rx="1.5" fill={bandFill} />

      {/* Front viewfinder */}
      <circle cx="57" cy="16" r="3.5" fill={bandFill} />
      <circle cx="57" cy="16" r="2.1" fill={c.tealLight} opacity="0.55" />

      {/* Rangefinder window on band */}
      <circle cx="18" cy={lensCy - 2} r="2" fill={c.cream} opacity="0.55" />

      {/* Lens — focal point */}
      <circle cx={cx} cy={lensCy} r="14" fill={c.white} />
      <circle cx={cx} cy={lensCy} r="10.5" fill={c.teal} />
      <circle cx={cx} cy={lensCy} r="8.5" fill={c.tealDeep} />
      <circle cx={cx} cy={lensCy} r="5.8" fill="#3A4A4E" opacity="0.88" />
      <ellipse cx={cx - 4} cy={lensCy - 3} rx="3.5" ry="2.6" fill={c.cream} opacity="0.62" />

      <motion.ellipse
        cx={cx}
        cy={lensCy}
        rx="5"
        ry="3"
        fill="url(#lensGlare)"
        animate={{
          cx: isHovered ? [cx - 6, cx + 6, cx - 6] : cx - 2,
          cy: isHovered ? [lensCy - 3, lensCy + 3, lensCy - 3] : lensCy - 1,
          opacity: isHovered ? [0, 0.55, 0] : 0,
        }}
        transition={{
          duration: isHovered ? 2.2 : 0.4,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut",
        }}
      />

      <motion.rect
        x="-4"
        y="0"
        width="76"
        height="58"
        rx="10"
        fill="#FFFFFF"
        initial={false}
        animate={{ opacity: cameraFlash ? [0, 0.75, 0] : 0 }}
        transition={{ duration: 0.34, ease: "easeOut" }}
        pointerEvents="none"
      />
    </g>
  );
}

/** One continuous architect-shade silhouette — tapered metal hood with rounded top. */
const LAMP_SHADE_BODY = `M ${LAMP_HINGE_X} ${32 - LAMP_SHADE_RAISE}
  C 74 ${34 - LAMP_SHADE_RAISE} 66 ${40 - LAMP_SHADE_RAISE} 62 ${50 - LAMP_SHADE_RAISE}
  C 57 ${62 - LAMP_SHADE_RAISE} 58 ${72 - LAMP_SHADE_RAISE} 64 ${76 - LAMP_SHADE_RAISE}
  C 72 ${79 - LAMP_SHADE_RAISE} 96 ${79 - LAMP_SHADE_RAISE} 104 ${76 - LAMP_SHADE_RAISE}
  C 110 ${72 - LAMP_SHADE_RAISE} 111 ${62 - LAMP_SHADE_RAISE} 106 ${50 - LAMP_SHADE_RAISE}
  C 102 ${40 - LAMP_SHADE_RAISE} 94 ${34 - LAMP_SHADE_RAISE} ${LAMP_HINGE_X} ${32 - LAMP_SHADE_RAISE} Z`;

/** Front lip — covers only the lower front of the bulb. */
const LAMP_SHADE_LIP = `M 93 ${45 - LAMP_SHADE_RAISE}
  C 98 ${45 - LAMP_SHADE_RAISE} 106 ${52 - LAMP_SHADE_RAISE} 108 ${60 - LAMP_SHADE_RAISE}
  C 106 ${67 - LAMP_SHADE_RAISE} 98 ${70 - LAMP_SHADE_RAISE} 92 ${68 - LAMP_SHADE_RAISE}
  C 88 ${62 - LAMP_SHADE_RAISE} 89 ${52 - LAMP_SHADE_RAISE} 93 ${45 - LAMP_SHADE_RAISE} Z`;

function lampParallelArm(x1, y1, x2, y2, c, gap = 2.5, strokeW = 2.75) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * gap;
  const ny = (dx / len) * gap;

  return (
    <g stroke={c.teal} strokeWidth={strokeW} strokeLinecap="round">
      <line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} />
      <line x1={x1 - nx} y1={y1 - ny} x2={x2 - nx} y2={y2 - ny} />
    </g>
  );
}

function lampJoint(cx, cy, r, c) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={c.tealDeep} />
      <circle cx={cx} cy={cy} r={r * 0.56} fill={c.teal} />
    </g>
  );
}

function FlatLampHead({ c, isLampOn }) {
  const bx = LAMP_BULB.x;
  const by = LAMP_BULB.y;
  const bulbR = 7;
  const hx = LAMP_HINGE_X;
  const rim = LAMP_SHADE_RIM;
  const bulbFill = isLampOn ? "#FFF4D6" : "#E8D5A8";

  return (
    <g>
      <rect x={hx - 9} y={23} width={18} height={10} rx={3.5} fill={c.tealDeep} />
      <rect x={hx - 6} y={26} width={12} height={3.5} rx={1.75} fill={c.teal} />

      {/* Bulb sits inside the shade — drawn first so the hood covers it */}
      <circle cx={bx} cy={by} r={bulbR} fill={bulbFill} />
      {isLampOn && (
        <circle cx={bx} cy={by} r={bulbR + 2.5} fill="#FFE8B4" opacity={c.lampLight?.bulbHalo ?? 0.48} />
      )}

      <path d={LAMP_SHADE_BODY} fill={c.teal} />
      {/* Interior rim — flush with the light-teal opening edge */}
      <ellipse cx={rim.cx} cy={rim.cy} rx={rim.rx} ry={rim.ry} fill={c.tealDeep} />
      <path d={LAMP_SHADE_LIP} fill={c.teal} />
    </g>
  );
}

export function LampShape({ c, isLampOn }) {
  const deskY = LAMP_HEIGHT;
  const base = { x: 4, y: deskY - 13, w: 78, h: 13 };
  const pivotBase = { x: 18, y: deskY - 13 };
  const jointElbow = { x: 24, y: 86 };

  return (
    <g>
      <ContactShadow
        cx={base.x + base.w / 2}
        cy={deskY + 1}
        rx={34}
        ry={3.5}
        color={isLampOn ? c.shadow : c.softShadow}
      />
      {isLampOn && (
        <DeskWarmGlow
          cx={base.x + base.w / 2}
          cy={deskY + 1}
          rx={34}
          ry={8}
          opacity={c.lampLight?.glowBase ?? 0.44}
        />
      )}

      <rect x={base.x} y={base.y} width={base.w} height={base.h} rx="4" fill={c.tealDeep} />
      <line
        x1={base.x + 5}
        y1={base.y + 1.5}
        x2={base.x + base.w - 5}
        y2={base.y + 1.5}
        stroke={c.tealLight}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <rect x={58} y={deskY - 10} width="10" height="5" rx="1.5" fill={c.coral} />

      {lampJoint(pivotBase.x, pivotBase.y, 5, c)}

      {lampParallelArm(pivotBase.x, pivotBase.y, jointElbow.x, jointElbow.y, c, 2.5, 2.8)}

      {lampJoint(jointElbow.x, jointElbow.y, 5.5, c)}

      {lampParallelArm(
        jointElbow.x,
        jointElbow.y,
        LAMP_HINGE_X,
        LAMP_HINGE_Y,
        c,
        2.3,
        2.6
      )}

      {lampJoint(LAMP_HINGE_X, LAMP_HINGE_Y, 4.5, c)}

      <g transform={`rotate(${LAMP_HEAD_TILT_DEG} ${LAMP_HINGE_X} ${LAMP_HINGE_Y})`}>
        <FlatLampHead c={c} isLampOn={isLampOn} />
      </g>
    </g>
  );
}

function easeInOutSine(t) {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function sampleKeyframes(values, progress) {
  const eased = easeInOutSine(Math.min(Math.max(progress, 0), 1));
  const span = values.length - 1;
  const scaled = eased * span;
  const index = Math.min(Math.floor(scaled), span - 1);
  const blend = scaled - index;
  return values[index] + (values[index + 1] - values[index]) * blend;
}

/** SVG rotate stir — Framer `rotate` on `<g>` is unreliable in Chrome. */
function SvgStirRotate({ active, stirToken = 0, pivotX, pivotY, angles, duration = MUG_STIR_MS, delay = 0, children }) {
  const groupRef = useRef(null);

  useEffect(() => {
    const node = groupRef.current;
    if (!active || !node) {
      node?.removeAttribute("transform");
      return undefined;
    }

    let frameId = 0;
    const startedAt = performance.now() + delay;

    const tick = (now) => {
      if (now < startedAt) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startedAt) / duration, 1);
      const angle = sampleKeyframes(angles, progress);
      node.setAttribute("transform", `rotate(${angle} ${pivotX} ${pivotY})`);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        node.removeAttribute("transform");
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      node.removeAttribute("transform");
    };
  }, [active, stirToken, pivotX, pivotY, angles, duration, delay]);

  return <g ref={groupRef}>{children}</g>;
}

/** Ice cube stir — combined drift + rotate on one SVG transform. */
function SvgStirIceCube({ x, y, size, active, stirToken = 0, stirPhase = 0, duration = MUG_STIR_MS }) {
  const groupRef = useRef(null);
  const pivotX = x + size / 2;
  const pivotY = y + size / 2;
  const driftX = [0, 0.45, -0.35, 0.28, -0.15, 0];
  const driftY = [0, -0.32, 0.26, -0.2, 0.12, 0];
  const angles = [0, 3.5, -3, 2.5, -1.5, 0];

  useEffect(() => {
    const node = groupRef.current;
    if (!active || !node) {
      node?.removeAttribute("transform");
      return undefined;
    }

    let frameId = 0;
    const startedAt = performance.now() + stirPhase * 80;

    const tick = (now) => {
      if (now < startedAt) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min((now - startedAt) / duration, 1);
      const dx = sampleKeyframes(driftX, progress);
      const dy = sampleKeyframes(driftY, progress);
      const angle = sampleKeyframes(angles, progress);
      node.setAttribute(
        "transform",
        `translate(${dx}, ${dy}) rotate(${angle} ${pivotX} ${pivotY})`
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        node.removeAttribute("transform");
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      node.removeAttribute("transform");
    };
  }, [active, stirToken, duration, stirPhase, pivotX, pivotY]);

  return (
    <g ref={groupRef}>
      <IceCubeVisual x={x} y={y} size={size} />
    </g>
  );
}

/** Single-pass ripple for stir — SVG `<g>` ignores Framer x/y in Chrome. */
function SvgStirRipple({ active, stirToken = 0, points, duration = MUG_STIR_MS, children }) {
  const rippleRef = useRef(null);

  useEffect(() => {
    const node = rippleRef.current;
    if (!active || !node) {
      node?.setAttribute("transform", "translate(0, 0)");
      return undefined;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const [dx, dy] = sampleDriftPath(points, easeInOutSine(progress));
      node.setAttribute("transform", `translate(${dx}, ${dy})`);
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        node.setAttribute("transform", "translate(0, 0)");
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameId);
      node.setAttribute("transform", "translate(0, 0)");
    };
  }, [active, stirToken, duration, points]);

  return <g ref={rippleRef}>{children}</g>;
}

const MUG_RIPPLE = [
  [0, 0],
  [0.3, -0.45],
  [-0.2, 0.32],
  [0.14, -0.22],
  [0, 0],
];
const MUG_STRAW_ANGLES = [0, 12, 0, -11, 0, 10, 0];

function IceCubeVisual({ x, y, size }) {
  return (
    <rect x={x} y={y} width={size} height={size} rx="1.6" fill={MATCHA_DRINK.ice} />
  );
}

function IceCube({ x, y, size, delay, isStirring, stirToken, stirPhase = 0 }) {
  if (isStirring) {
    return (
      <SvgStirIceCube
        x={x}
        y={y}
        size={size}
        active={isStirring}
        stirToken={stirToken}
        stirPhase={stirPhase}
      />
    );
  }

  return (
    <motion.g
      animate={{ x: [0, 0.5, 0], y: [0, -1.2, 0] }}
      transition={{
        duration: 3.4 + delay * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      <IceCubeVisual x={x} y={y} size={size} />
    </motion.g>
  );
}

function buildMatchaPath(cx) {
  const topRx = mugLiquidRxAt(MUG_LIQUID_TOP);
  const midRx = mugLiquidRxAt(MUG_MATCHA_BOTTOM);
  const innerRy = MUG_RIM_RY - MUG_WALL * 0.45;

  return `M ${cx - topRx} ${MUG_LIQUID_TOP}
    A ${topRx} ${innerRy} 0 0 0 ${cx + topRx} ${MUG_LIQUID_TOP}
    L ${cx + midRx} ${MUG_MATCHA_BOTTOM}
    C ${cx + 5} ${MUG_MATCHA_BOTTOM + 2.5} ${cx - 5} ${MUG_MATCHA_BOTTOM - 2.5} ${cx - midRx} ${MUG_MATCHA_BOTTOM}
    L ${cx - topRx} ${MUG_LIQUID_TOP} Z`;
}

function buildMilkPath(cx) {
  const midRx = mugLiquidRxAt(MUG_MATCHA_BOTTOM);
  const botRx = MUG_BASE_RX - MUG_WALL - 0.2;
  const botRy = MUG_BASE_RY - MUG_WALL * 0.35 - 0.2;
  const botY = MUG_BASE_CY - MUG_BASE_RY + 0.6;

  return `M ${cx - midRx} ${MUG_MATCHA_BOTTOM}
    C ${cx - 5} ${MUG_MATCHA_BOTTOM - 2.5} ${cx + 5} ${MUG_MATCHA_BOTTOM + 2.5} ${cx + midRx} ${MUG_MATCHA_BOTTOM}
    L ${cx + botRx} ${botY}
    A ${botRx} ${botRy} 0 0 1 ${cx - botRx} ${botY}
    L ${cx - midRx} ${MUG_MATCHA_BOTTOM} Z`;
}

const MUG_ICE = [
  { xOff: -2, y: 44, size: 4.5, delay: 0, stirPhase: 0 },
  { xOff: 9, y: 48, size: 4, delay: 0.6, stirPhase: 1 },
  { xOff: -7, y: 52, size: 4, delay: 1.1, stirPhase: 2 },
  { xOff: 4, y: 38, size: 3.5, delay: 1.6, stirPhase: 3 },
];

export function MugShape({ c, isLampOn, isHovered, isStirring = false, stirToken = 0 }) {
  const liquidFill = isLampOn ? "url(#matchaLiquidWarm)" : "url(#matchaLiquid)";
  const cx = MUG_CX;
  const glassBody = mugGlassSilhouette(
    cx,
    MUG_RIM_CY,
    MUG_RIM_RX,
    MUG_RIM_RY,
    MUG_BASE_CY,
    MUG_BASE_RX,
    MUG_BASE_RY
  );
  const matchaPath = buildMatchaPath(cx);
  const milkPath = buildMilkPath(cx);
  const highlightOpacity = isLampOn ? 0.2 : 0.13;
  const glassStrokeOpacity = isLampOn ? 0.58 : 0.48;

  const strawTopX = cx + MUG_RIM_RX - 6;
  const strawTopY = 10;
  const strawBottomX = cx + 5;
  const strawBottomY = 48;
  const strawPivotX = cx + 4;
  const strawPivotY = 40;

  const strawStripeStops = Array.from({ length: 10 }, (_, i) => {
    const t0 = (i / 10) * 100;
    const t1 = ((i + 0.5) / 10) * 100;
    const color = i % 2 === 0 ? c.coral : "#FFFCF7";
    return [
      <stop key={`${i}-a`} offset={`${t0}%`} stopColor={color} />,
      <stop key={`${i}-b`} offset={`${t1}%`} stopColor={color} />,
    ];
  }).flat();

  return (
    <g>
      <defs>
        <linearGradient
          id="mugStrawStripe"
          gradientUnits="userSpaceOnUse"
          x1={strawTopX}
          y1={strawTopY}
          x2={strawBottomX}
          y2={strawBottomY}
        >
          {strawStripeStops}
        </linearGradient>
      </defs>

      <ContactShadow
        cx={cx}
        cy={MUG_DESK_Y + 1}
        rx={isHovered ? 20 : 17.5}
        ry={isHovered ? 3.2 : 2.7}
        color={isLampOn ? c.shadow : c.softShadow}
      />
      {isLampOn && (
        <DeskWarmGlow
          cx={cx}
          cy={MUG_DESK_Y + 1}
          rx={isHovered ? 20 : 17.5}
          ry={6}
          opacity={c.lampLight?.glowMug ?? 0.19}
        />
      )}

      <g clipPath="url(#glassInteriorClip)">
        <SvgStirRipple active={isStirring} stirToken={stirToken} points={MUG_RIPPLE} duration={MUG_STIR_MS}>
          <path d={milkPath} fill={isLampOn ? "url(#matchaMilkWarm)" : "url(#matchaMilk)"} />
          <ellipse
            cx={cx}
            cy={MUG_BASE_CY - 7}
            rx={MUG_BASE_RX - MUG_WALL - 2.5}
            ry={1.8}
            fill={MATCHA_DRINK.milkBottom}
            opacity={isLampOn ? 0.3 : 0.24}
          />
          <path d={matchaPath} fill={liquidFill} />
        </SvgStirRipple>

        {MUG_ICE.map((cube) => (
          <IceCube
            key={`${cube.xOff}-${cube.y}`}
            x={cx + cube.xOff - cube.size / 2}
            y={cube.y}
            size={cube.size}
            delay={cube.delay}
            stirPhase={cube.stirPhase}
            isStirring={isStirring}
            stirToken={stirToken}
          />
        ))}
      </g>

      <path
        d={glassBody}
        fill={c.glassWall ?? c.glass}
        stroke={c.glassStroke}
        strokeWidth="0.85"
        strokeOpacity={glassStrokeOpacity}
        strokeLinejoin="round"
      />

      <ellipse
        cx={cx}
        cy={MUG_RIM_CY}
        rx={MUG_RIM_RX}
        ry={MUG_RIM_RY}
        fill="none"
        stroke={c.glassStroke}
        strokeWidth="0.75"
        strokeOpacity={glassStrokeOpacity * 0.9}
      />

      <ellipse
        cx={cx}
        cy={MUG_BASE_CY}
        rx={MUG_BASE_RX}
        ry={MUG_BASE_RY}
        fill="none"
        stroke={c.glassStroke}
        strokeWidth="0.8"
        strokeOpacity={glassStrokeOpacity * 0.85}
      />

      <path
        d={`M ${cx - MUG_RIM_RX + 5} ${MUG_RIM_CY + 8} L ${cx - MUG_BASE_RX + 3} ${MUG_BASE_CY - 1}`}
        fill="none"
        stroke={c.glassHighlight}
        strokeWidth="1"
        strokeLinecap="round"
        opacity={highlightOpacity}
      />

      <SvgStirRotate
        active={isStirring}
        stirToken={stirToken}
        pivotX={strawPivotX}
        pivotY={strawPivotY}
        angles={MUG_STRAW_ANGLES}
        duration={MUG_STIR_MS}
      >
        <line
          x1={strawTopX}
          y1={strawTopY}
          x2={strawBottomX}
          y2={strawBottomY}
          stroke="url(#mugStrawStripe)"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      </SvgStirRotate>
    </g>
  );
}

export function MonitorShape({ c, isLampOn, isHovered = false }) {
  const w = 296;
  const frameRx = 18;
  const screenX = 14;
  const screenY = 12;
  const screenW = w - 28;
  const screenH = 136;
  const chinH = 22;
  const frameH = screenY + screenH + chinH;
  const shell = c.monitorShell;
  const shellShade = c.monitorShellShade ?? c.monitorShellTint;

  const standTop = frameH;
  const standH = 26;
  const standTopW = 22;
  const standBottomW = 42;
  const standBottom = standTop + standH;

  const footH = 5;
  const footW = 76;
  const footY = standBottom;
  const footBottom = footY + footH;
  const cx = w / 2;

  const screenPad = 12;
  const uiGap = 8;
  const uiRx = 4;
  const contentX = screenX + screenPad;
  const contentY = screenY + screenPad;
  const contentW = screenW - screenPad * 2;
  const contentH = screenH - screenPad * 2;

  const headerH = 12;
  const bodyY = contentY + headerH + uiGap;
  const bodyH = contentH - headerH - uiGap;

  const mainW = Math.round(contentW * 0.58);
  const sideW = contentW - mainW - uiGap;
  const sideX = contentX + mainW + uiGap;
  const sideTileH = Math.round((bodyH - uiGap) / 2);
  const sideBottomY = bodyY + sideTileH + uiGap;

  const cursorRestX = contentX + mainW - 30;
  const cursorRestY = bodyY + bodyH - 24;
  const clipId = "monitor-screen-clip";

  return (
    <g>
      <defs>
        <clipPath id={clipId}>
          <rect x={screenX} y={screenY} width={screenW} height={screenH} rx="10" />
        </clipPath>
      </defs>
      <rect
        x="0"
        y="-14"
        width={w}
        height={footBottom + 18}
        fill="transparent"
        aria-hidden="true"
      />

      <ContactShadow
        cx={w / 2}
        cy={MONITOR_TOTAL_H + 1}
        rx={40}
        ry={3.5}
        color={isLampOn ? c.shadow : c.softShadow}
      />
      {isLampOn && (
        <DeskWarmGlow
          cx={w / 2}
          cy={MONITOR_TOTAL_H + 1}
          rx={40}
          ry={10}
          fill="url(#lampHotCore)"
          opacity={c.lampLight?.glowMonitor ?? 0.17}
        />
      )}

      {/* Unified shell — frame, stand, and foot as one continuous form */}
      <rect x="0" y="0" width={w} height={frameH} rx={frameRx} fill={shell} />
      <path
        d={`M ${cx - standTopW / 2} ${standTop}
           L ${cx + standTopW / 2} ${standTop}
           L ${cx + standBottomW / 2} ${standBottom}
           L ${cx + footW / 2} ${standBottom}
           L ${cx + footW / 2} ${footBottom}
           L ${cx - footW / 2} ${footBottom}
           L ${cx - footW / 2} ${standBottom}
           L ${cx - standBottomW / 2} ${standBottom} Z`}
        fill={shell}
      />

      {/* Neck depth — inset shade only, no edge strokes */}
      <path
        d={`M ${cx - standTopW / 2 + 1} ${standTop + 1}
           L ${cx + standTopW / 2 - 1} ${standTop + 1}
           L ${cx + standBottomW / 2 - 1.5} ${standBottom - 1}
           L ${cx - standBottomW / 2 + 1.5} ${standBottom - 1} Z`}
        fill={shellShade}
        opacity="0.16"
      />

      <rect x={screenX} y={screenY} width={screenW} height={screenH} rx="10" fill={c.monitorScreen} />

      {!isLampOn && (
        <motion.rect
          x={screenX + 8}
          y={screenY + 8}
          width={screenW - 16}
          height={screenH - 16}
          rx="8"
          fill="url(#screenBreath)"
          animate={{ opacity: c.monitorScreenBreath ?? [0.12, 0.28, 0.12] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <g clipPath={`url(#${clipId})`} className={isHovered ? "monitor-screen--hovered" : undefined}>
        <SvgTranslateDrift
          active={isHovered}
          points={MONITOR_UI_DRIFT}
          duration={2600}
          className="monitor-screen-ui"
        >
          <rect
            x={contentX}
            y={contentY}
            width={contentW}
            height={headerH}
            rx={uiRx}
            fill={c.coral}
            opacity="0.85"
          />
          <rect
            x={contentX}
            y={bodyY}
            width={mainW}
            height={bodyH}
            rx={uiRx}
            fill={c.monitorUiTile ?? c.monitorShell}
            opacity={c.monitorUiTileOpacity ?? 0.92}
          />
          <rect
            x={sideX}
            y={bodyY}
            width={sideW}
            height={sideTileH}
            rx={uiRx}
            fill={c.teal}
            className="monitor-screen-ui__teal"
          />
          <rect
            x={sideX}
            y={sideBottomY}
            width={sideW}
            height={sideTileH}
            rx={uiRx}
            fill={c.coral}
            className="monitor-screen-ui__coral"
          />
        </SvgTranslateDrift>

        <g transform={`translate(${cursorRestX}, ${cursorRestY})`}>
          <SvgTranslateDrift
            active={isHovered}
            points={MONITOR_CURSOR_DRIFT}
            duration={3000}
            className="monitor-screen-cursor__drift"
          >
            <path
              className="monitor-screen-cursor__icon"
              d="M0 0 L0 9 L2.5 7 L4.5 11.5 L6 10.5 L4 6.5 L7.5 6.5 Z"
              fill={c.ink}
            />
          </SvgTranslateDrift>
        </g>

        <rect
          className="monitor-screen-glow"
          x={screenX}
          y={screenY}
          width={screenW}
          height={screenH}
          rx="10"
          fill={c.monitorScreenGlow ?? c.yellowLight}
          pointerEvents="none"
        />

      </g>

      {isLampOn && (
        <motion.rect
          x={screenX}
          y={screenY}
          width={screenW}
          height={screenH}
          rx="10"
          fill={c.monitorLampWash ?? "#FFF4D6"}
          animate={{ opacity: c.monitorLampPulse ?? [0.06, 0.14, 0.06] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </g>
  );
}

export function renderDeskObject(id, palette, interaction = {}) {
  const c = palette;
  const {
    isHovered = false,
    isLampOn = false,
    isMusicPlaying = false,
    cameraFlash = false,
    mugStirring = false,
    mugStirToken = 0,
    plantWatering = false,
    plantWaterToken = 0,
    plantSwaying = false,
    plantSwayToken = 0,
    plantGrowthStage = 0,
  } = interaction;

  switch (id) {
    case "books":
      return <BooksShape c={c} isLampOn={isLampOn} />;
    case "clock":
      return <ClockShape c={c} isHovered={isHovered} isLampOn={isLampOn} />;
    case "plant":
      return (
        <PlantShape
          c={c}
          isHovered={isHovered}
          isLampOn={isLampOn}
          compact={interaction.compactScene}
          isWatering={interaction.plantWatering}
          waterToken={interaction.plantWaterToken}
          isSwaying={plantSwaying}
          swayToken={plantSwayToken}
          growthStage={plantGrowthStage}
        />
      );
    case "speaker":
      return <SpeakerShape c={c} isLampOn={isLampOn} isMusicPlaying={isMusicPlaying} />;
    case "camera":
      return (
        <CameraShape
          c={c}
          isHovered={isHovered}
          cameraFlash={cameraFlash}
          isLampOn={isLampOn}
        />
      );
    case "lamp":
      return <LampShape c={c} isLampOn={isLampOn} />;
    case "mug":
      return (
        <MugShape
          c={c}
          isLampOn={isLampOn}
          isHovered={isHovered}
          isStirring={interaction.mugStirring}
          stirToken={interaction.mugStirToken}
        />
      );
    case "monitor":
      return <MonitorShape c={c} isLampOn={isLampOn} isHovered={isHovered} />;
    default:
      return null;
  }
}
