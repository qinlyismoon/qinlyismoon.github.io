/**
 * ClockObject — the wall clock with live local-time hands.
 */
import { useRef } from "react";
import { useLocalHandAngles } from "../../../../lib/useLocalTime";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
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

function ClockShape({ c, isHovered = false, isLampOn = false }) {
  const { hour, minute, second } = useLocalHandAngles();
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

export default function ClockObject({
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
      className="desk-object desk-object--clock"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="clock" active={isHovered}>
        <g className="desk-object__shape">
          <ClockShape c={c} isHovered={isHovered} isLampOn={isLampOn} />
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
