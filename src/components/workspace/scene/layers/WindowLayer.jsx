/**
 * WindowLayer — the window as an independent component: frame, outdoor sky,
 * sun/moon, clouds, and weather (rain / snow / overcast). Day/night still
 * owns the base sky; weather layers on top.
 */
import { ROOM_WINDOW } from "../../../../lib/deskLayout";

function RainStreaks({ innerX, innerY, innerW, innerH }) {
  const streaks = [
    [0.12, 0.08],
    [0.22, 0.18],
    [0.34, 0.05],
    [0.46, 0.22],
    [0.58, 0.12],
    [0.7, 0.28],
    [0.82, 0.1],
    [0.18, 0.42],
    [0.4, 0.48],
    [0.62, 0.4],
    [0.78, 0.52],
    [0.28, 0.62],
    [0.52, 0.68],
    [0.74, 0.72],
  ];
  return (
    <g className="workspace-room-window__rain" stroke="rgba(210, 220, 230, 0.55)" strokeWidth="1.1" strokeLinecap="round">
      {streaks.map(([fx, fy], index) => {
        const x = innerX + innerW * fx;
        const y = innerY + innerH * fy;
        return <line key={index} x1={x} y1={y} x2={x - 2.5} y2={y + 14} />;
      })}
    </g>
  );
}

function SnowFlakes({ innerX, innerY, innerW, innerH }) {
  const flakes = [
    [0.15, 0.12, 1.4],
    [0.32, 0.22, 1.1],
    [0.48, 0.1, 1.6],
    [0.64, 0.28, 1.2],
    [0.8, 0.16, 1.3],
    [0.22, 0.45, 1.0],
    [0.55, 0.5, 1.5],
    [0.72, 0.42, 1.1],
    [0.38, 0.68, 1.3],
    [0.68, 0.72, 1.0],
  ];
  return (
    <g className="workspace-room-window__snow" fill="rgba(245, 250, 255, 0.85)">
      {flakes.map(([fx, fy, r], index) => (
        <circle
          key={index}
          cx={innerX + innerW * fx}
          cy={innerY + innerH * fy}
          r={r}
        />
      ))}
    </g>
  );
}

function RoomWindow({ c, environment }) {
  const { x, y, width, height, frame, sill } = ROOM_WINDOW;
  const innerX = x + frame;
  const innerY = y + frame;
  const innerW = width - frame * 2;
  const innerH = height - frame - sill;
  const isNight = environment?.isNight;
  const kind = environment?.weather?.kind ?? "sunny";
  const isSunny = kind === "sunny";
  const isCloudy = kind === "cloudy";
  const isRainy = kind === "rainy";
  const isSnowy = kind === "snowy";
  const isOvercast = isCloudy || isRainy || isSnowy;

  // Night darkens only the sky outside the window. Weather tints the day sky.
  let skyFill = isNight ? "url(#roomWindowSkyNight)" : "url(#roomWindowSky)";
  if (!isNight && isRainy) skyFill = "url(#roomWindowSkyRain)";
  else if (!isNight && isSnowy) skyFill = "url(#roomWindowSkySnow)";
  else if (!isNight && isCloudy) skyFill = "url(#roomWindowSkyCloudy)";

  const cloudFill = isNight
    ? "rgba(200, 210, 220, 0.14)"
    : isOvercast
      ? "rgba(210, 216, 222, 0.92)"
      : c.windowCloud;
  const cloudOpacityBoost = isOvercast ? 1 : 0.82;
  const bushDeep = isNight ? "#1C2822" : c.windowBushDeep;
  const bushBase = isNight ? "#232F28" : c.windowBush;
  const bushMuted = isNight ? "#1A2520" : c.windowBushMuted;
  const bushLight = isNight ? "#2A382E" : c.windowBushLight;
  const sunOpacity = isSunny ? 0.9 : isCloudy ? 0.35 : 0.15;
  const showSun = !isRainy && !isSnowy;

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
        <linearGradient id="roomWindowSkyCloudy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C5CDD6" />
          <stop offset="100%" stopColor="#A8B2BE" />
        </linearGradient>
        <linearGradient id="roomWindowSkyRain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8E99A6" />
          <stop offset="100%" stopColor="#6E7885" />
        </linearGradient>
        <linearGradient id="roomWindowSkySnow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8DEE6" />
          <stop offset="100%" stopColor="#B8C2CE" />
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

        {showSun ? (
          <circle
            cx={innerX + innerW * 0.72}
            cy={innerY + innerH * 0.2}
            r={isNight ? 11 : 14}
            fill={isNight ? c.moon : c.yellowLight}
            opacity={sunOpacity}
          />
        ) : null}

        <ellipse
          cx={innerX + innerW * 0.34}
          cy={innerY + innerH * 0.22}
          rx={innerW * (isOvercast ? 0.28 : 0.2)}
          ry={innerH * (isOvercast ? 0.075 : 0.055)}
          fill={cloudFill}
        />
        <ellipse
          cx={innerX + innerW * 0.62}
          cy={innerY + innerH * 0.16}
          rx={innerW * (isOvercast ? 0.24 : 0.16)}
          ry={innerH * (isOvercast ? 0.06 : 0.042)}
          fill={cloudFill}
          opacity={cloudOpacityBoost}
        />
        <ellipse
          cx={innerX + innerW * 0.5}
          cy={innerY + innerH * 0.24}
          rx={innerW * (isOvercast ? 0.18 : 0.11)}
          ry={innerH * (isOvercast ? 0.05 : 0.034)}
          fill={cloudFill}
          opacity={isOvercast ? 0.88 : 0.7}
        />
        {isOvercast ? (
          <ellipse
            cx={innerX + innerW * 0.2}
            cy={innerY + innerH * 0.14}
            rx={innerW * 0.16}
            ry={innerH * 0.045}
            fill={cloudFill}
            opacity="0.75"
          />
        ) : null}

        {isRainy ? (
          <RainStreaks innerX={innerX} innerY={innerY} innerW={innerW} innerH={innerH} />
        ) : null}
        {isSnowy ? (
          <SnowFlakes innerX={innerX} innerY={innerY} innerW={innerW} innerH={innerH} />
        ) : null}

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
