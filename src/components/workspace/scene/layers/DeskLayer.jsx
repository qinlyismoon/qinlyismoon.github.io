/**
 * DeskLayer — the desk itself: top, front edge, drawer cabinet, legs,
 * and its floor shadow. The desk never changes with state; everything
 * that sits on it lives in the Object layer.
 */
import {
  CABINET_LEFT,
  CABINET_RIGHT,
  CABINET_WIDTH,
  DESK_BOTTOM,
  DESK_CENTER,
  DESK_FRONT_EDGE,
  DESK_LEFT,
  DESK_RIGHT,
  DESK_SURFACE_Y,
  DESK_THICK,
  LEG_LEFT,
  LEG_WIDTH,
  SCENE_CONTENT_SHIFT_X,
} from "../../../../lib/deskLayout";

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
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

export default function DeskLayer({ c }) {
  const top = DESK_SURFACE_Y;
  const under = top + DESK_THICK;
  const floor = DESK_BOTTOM;

  return (
    <g className="desk-scene__layer desk-scene__layer--desk" aria-hidden="true">
      <g transform={`translate(${SCENE_CONTENT_SHIFT_X}, 0)`}>
        <ContactShadow
          cx={DESK_CENTER}
          cy={floor + 2}
          rx={(DESK_RIGHT - DESK_LEFT) / 2 - 24}
          ry={4.5}
          color={c.softShadow}
        />
        <FlatDeskIllustration c={c} top={top} under={under} floor={floor} />
      </g>
    </g>
  );
}
