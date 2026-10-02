/**
 * MonitorObject — the portfolio monitor with drifting screen UI.
 */
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MONITOR_TOTAL_H } from "../../../../lib/deskLayout";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

const EASE_CALM = [0.45, 0, 0.25, 1];

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
}

function DeskWarmGlow({ cx, cy, rx, ry, fill, opacity = 1 }) {
  return (
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} opacity={opacity} aria-hidden="true" />
  );
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

function MonitorShape({ c, isLampOn, isHovered = false }) {
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
        opacity="0.28"
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
            opacity={c.monitorUiHeaderOpacity ?? 0.85}
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
            opacity={c.monitorUiTealOpacity ?? 0.55}
          />
          <rect
            x={sideX}
            y={sideBottomY}
            width={sideW}
            height={sideTileH}
            rx={uiRx}
            fill={c.coral}
            className="monitor-screen-ui__coral"
            opacity={c.monitorUiCoralOpacity ?? 0.4}
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

export default function MonitorObject({
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
      className="desk-object desk-object--monitor"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="monitor" active={isHovered}>
        <g className="desk-object__shape">
          <MonitorShape c={c} isLampOn={isLampOn} isHovered={isHovered} />
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
