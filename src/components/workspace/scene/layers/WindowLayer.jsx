/**
 * WindowLayer — the window as an independent component: frame, outdoor sky,
 * sun/moon, clouds. Future weather (rain, snow, sunrise, sunset) plugs in
 * here without touching the desk.
 */
import { ROOM_WINDOW } from "../../../../lib/deskLayout";

function RoomWindow({ c, environment }) {
  const { x, y, width, height, frame, sill } = ROOM_WINDOW;
  const innerX = x + frame;
  const innerY = y + frame;
  const innerW = width - frame * 2;
  const innerH = height - frame - sill;
  const isNight = environment?.isNight;

  // Night darkens only the sky outside the window. The room palette stays
  // day; WindowLayer owns its own night colors.
  const skyFill = isNight ? "url(#roomWindowSkyNight)" : "url(#roomWindowSky)";
  const cloudFill = isNight ? "rgba(200, 210, 220, 0.14)" : c.windowCloud;
  const bushDeep = isNight ? "#1C2822" : c.windowBushDeep;
  const bushBase = isNight ? "#232F28" : c.windowBush;
  const bushMuted = isNight ? "#1A2520" : c.windowBushMuted;
  const bushLight = isNight ? "#2A382E" : c.windowBushLight;

  return (
    <g className="workspace-room-window" aria-hidden="true">
      <defs>
        <clipPath id="room-window-view">
          <rect x={innerX} y={innerY} width={innerW} height={innerH} rx="1.5" />
        </clipPath>
        <linearGradient id="roomWindowSkyNight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#182230" />
          <stop offset="100%" stopColor="#0B111A" />
        </linearGradient>
      </defs>

      <rect x={x} y={y} width={width} height={height} rx="4" fill={c.windowFrame} />

      <g clipPath="url(#room-window-view)">
        <rect x={innerX} y={innerY} width={innerW} height={innerH} fill={skyFill} />

        {isNight ? (
          <g fill="#FFFFFF" opacity="0.75">
            <circle cx={innerX + innerW * 0.14} cy={innerY + innerH * 0.14} r="1.2" />
            <circle cx={innerX + innerW * 0.3} cy={innerY + innerH * 0.07} r="1" />
            <circle cx={innerX + innerW * 0.48} cy={innerY + innerH * 0.17} r="1.4" />
            <circle cx={innerX + innerW * 0.86} cy={innerY + innerH * 0.09} r="1" />
            <circle cx={innerX + innerW * 0.68} cy={innerY + innerH * 0.32} r="0.9" />
            <circle cx={innerX + innerW * 0.22} cy={innerY + innerH * 0.34} r="0.8" />
          </g>
        ) : null}

        <circle
          cx={innerX + innerW * 0.72}
          cy={innerY + innerH * 0.2}
          r={isNight ? 11 : 14}
          fill={isNight ? c.moon : c.yellowLight}
          opacity={environment?.weather?.kind === "sunny" ? 0.9 : 0.45}
        />

        <ellipse
          cx={innerX + innerW * 0.34}
          cy={innerY + innerH * 0.22}
          rx={innerW * 0.2}
          ry={innerH * 0.055}
          fill={cloudFill}
        />
        <ellipse
          cx={innerX + innerW * 0.62}
          cy={innerY + innerH * 0.16}
          rx={innerW * 0.16}
          ry={innerH * 0.042}
          fill={cloudFill}
          opacity="0.82"
        />
        <ellipse
          cx={innerX + innerW * 0.5}
          cy={innerY + innerH * 0.24}
          rx={innerW * 0.11}
          ry={innerH * 0.034}
          fill={cloudFill}
          opacity="0.7"
        />

        <ellipse
          cx={innerX + innerW * 0.22}
          cy={innerY + innerH - 18}
          rx={34}
          ry={26}
          fill={bushDeep}
        />
        <ellipse
          cx={innerX + innerW * 0.22}
          cy={innerY + innerH - 30}
          rx={24}
          ry={20}
          fill={bushBase}
        />
        <ellipse
          cx={innerX + innerW * 0.58}
          cy={innerY + innerH - 14}
          rx={40}
          ry={30}
          fill={bushMuted}
        />
        <ellipse
          cx={innerX + innerW * 0.58}
          cy={innerY + innerH - 28}
          rx={28}
          ry={22}
          fill={bushLight}
        />
        <ellipse
          cx={innerX + innerW * 0.84}
          cy={innerY + innerH - 10}
          rx={30}
          ry={24}
          fill={bushDeep}
          opacity="0.85"
        />
        <ellipse
          cx={innerX + innerW * 0.84}
          cy={innerY + innerH - 24}
          rx={20}
          ry={17}
          fill={bushBase}
          opacity="0.88"
        />
      </g>
    </g>
  );
}

export default function WindowLayer({ c, environment }) {
  return (
    <g className="desk-scene__layer desk-scene__layer--window" aria-hidden="true">
      <RoomWindow c={c} environment={environment} />
    </g>
  );
}
