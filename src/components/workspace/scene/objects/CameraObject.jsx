/**
 * CameraObject — the hanging film camera with flash feedback.
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import { CAMERA_REST_BOTTOM } from "../../../../lib/deskLayout";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

function SoftContactShadow({ cx, cy, rx, ry = 2.8, color }) {
  return (
    <g className="soft-contact-shadow" aria-hidden="true">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity="0.28" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.72} fill={color} opacity="0.22" />
    </g>
  );
}

function CameraShape({ c, isHovered, isLampOn }) {
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
      <SoftContactShadow
        cx={cx}
        cy={CAMERA_REST_BOTTOM + 1.5}
        rx={26}
        ry={2.4}
        color={shadowColor}
      />

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
    </g>
  );
}

export default function CameraObject({
  c,
  isLampOn,
  isHovered,
  interaction,
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
      className="desk-object desk-object--camera"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="camera" active={isHovered}>
        <g className="desk-object__shape">
          <CameraShape
            c={c}
            isHovered={isHovered}
            isLampOn={isLampOn}
          />
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
