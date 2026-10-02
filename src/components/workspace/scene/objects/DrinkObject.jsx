/**
 * DrinkObject — the iced matcha on the desk, with stir interaction.
 *
 * The glass geometry it needs lives in ../mugGeometry (shared with SceneDefs).
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MUG_STIR_MS } from "../../../../lib/workspaceInteractions";
import {
  MATCHA_DRINK,
  MUG_BASE_CY,
  MUG_BASE_RX,
  MUG_BASE_RY,
  MUG_CX,
  MUG_DESK_Y,
  MUG_LIQUID_TOP,
  MUG_MATCHA_BOTTOM,
  MUG_RIM_CY,
  MUG_RIM_RX,
  MUG_RIM_RY,
  MUG_WALL,
  mugGlassSilhouette,
  mugLiquidRxAt,
} from "../mugGeometry";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
}

function DeskWarmGlow({ cx, cy, rx, ry, fill = "url(#lampHotCore)", opacity = 1 }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} opacity={opacity} aria-hidden="true" />
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

function sampleDriftPath(points, progress) {
  const span = points.length - 1;
  const scaled = progress * span;
  const index = Math.min(Math.floor(scaled), span - 1);
  const blend = scaled - index;
  const [x0, y0] = points[index];
  const [x1, y1] = points[index + 1];
  return [x0 + (x1 - x0) * blend, y0 + (y1 - y0) * blend];
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

function MugShape({ c, isLampOn, isHovered, isStirring = false, stirToken = 0 }) {
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

export default function DrinkObject({
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
      className="desk-object desk-object--drink"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="mug" active={isHovered}>
        <g className="desk-object__shape">
          <MugShape
            c={c}
            isLampOn={isLampOn}
            isHovered={isHovered}
            isStirring={interaction.mugStirring}
            stirToken={interaction.mugStirToken}
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
