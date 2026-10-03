/**
 * WallLayer — wall dressing only: wire grid, clip shelves, sticky note.
 *
 * Decorative and non-interactive (aria-hidden). Hanging objects (speaker,
 * camera) live in the Object layer; their clip shelves stay here as wall
 * structure.
 */
import {
  CAMERA_PANEL_W,
  CAMERA_PANEL_X,
  CAMERA_PANEL_Y,
  GRID_SHELF_H,
  SPEAKER_PANEL_W,
  SPEAKER_PANEL_X,
  SPEAKER_PANEL_Y,
  STICKY_NOTE_X,
  STICKY_NOTE_Y,
  WIRE_GRID_BOTTOM,
  WIRE_GRID_TOP,
  WIRE_GRID_W,
  WIRE_GRID_X,
} from "../../../../lib/deskLayout";

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
function GridShelf({ x, y, w, h, fill, metal, highlight, clipXs }) {
  const cap = h / 2;

  return (
    <g className="workspace-grid-shelf">
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
        metal={metal}
        highlight={highlight}
        clipXs={cameraClipXs}
      />
    </g>
  );
}

function StickyNoteShape({ c, isLampOn }) {
  const W = 44;
  const H = 52;

  return (
    <g>
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

export default function WallLayer({ c, isLampOn }) {
  return (
    <g className="desk-scene__layer desk-scene__layer--wall" aria-hidden="true">
      <WireGridPanel c={c} isLampOn={isLampOn} />
    </g>
  );
}
