/**
 * LampObject — the architect lamp. Its light lives in the Effect layer;
 * this component is only the visible fixture.
 */
import { useRef } from "react";
import {
  LAMP_HEIGHT,
  LAMP_BULB,
} from "../../../../lib/deskLayout";
import {
  LAMP_HEAD_TILT_DEG,
  LAMP_SHADE_RIM,
  LAMP_HINGE_X,
  LAMP_HINGE_Y,
  LAMP_SHADE_RAISE,
} from "../../../../lib/lampLighting";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
}

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

function LampShape({ c, isLampOn }) {
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

export default function LampObject({
  c,
  isLampOn,
  isHovered,
  label,
  labelOffset,
  tooltip,
  tooltipOffset,
  tooltipAlign,
}) {
  const objectRef = useRef(null);
  return (
    <g
      ref={objectRef}
      className="desk-object desk-object--lamp"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="lamp" active={isHovered}>
        <g className="desk-object__shape">
          <LampShape c={c} isLampOn={isLampOn} />
        </g>
      </HoverLift>
      {label && labelOffset && (
        <text className="desk-scene__label" x={labelOffset.x} y={labelOffset.y}>
          {label}
        </text>
      )}
      <ObjectTooltipHost
        objectRef={objectRef}
        offset={tooltipOffset}
        align={tooltipAlign}
        visible={isHovered}
      >
        {tooltip}
      </ObjectTooltipHost>
    </g>
  );
}
