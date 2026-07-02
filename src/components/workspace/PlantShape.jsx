import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const LEAF_SIZE_MULT = 1.86;
const MAX_GROWTH_STAGE = 4;

/** Watering can — constructed like other objects (local coords). */
const WATERING_CAN = {
  height: 72,
  viewHeight: 38,
  /** Tip of the rose/head where drops originate (in local coords). */
  spoutTip: { x: 54.2, y: 11 },
  /** Pivot around body base (in local coords). */
  pivot: { x: 30, y: 31.5 },
  pourAngle: 38,
  /** Local view width before horizontal mirror. */
  viewWidth: 60,
};

export const PLANT_GEOMETRY = {
  shelfY: 46,
  potCx: 42,
  rimY: 10,
  soilY: 18,
  stemY: 18,
  waterTarget: { x: 42, y: 18 },
};

const { shelfY, potCx, soilY, waterTarget } = PLANT_GEOMETRY;

/** Pot is slightly wider + shorter than before. */
const POT_TOP_RX = 30;
const POT_BOTTOM_RX = 24;
const POT_RIM_TOP = 12;
const POT_RIM_BOTTOM = 21;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function growthToT(stageFloat) {
  if (stageFloat == null) return 0;
  return clamp(stageFloat / MAX_GROWTH_STAGE, 0, 1);
}

function mapFromSoil(value, t, amount) {
  return soilY + (value - soilY) * (1 + t * amount);
}

/** Vines that gently sway during watering — not every vine moves at once. */
const WATER_SWAY_VINES = [0, 2, 4, 5];
/** After-watering breeze sway — only a few vines move. */
const AFTER_SWAY_VINES = [0, 1, 2, 4, 5];

/** Vine stems + heart leaves: [cx, cy, size, rot, fillKey] */
const VINE_DATA = [
  {
    originX: potCx - 12,
    stem: { qx: potCx - 15, qy: 72, ex: potCx - 2, ey: 158 },
    leaves: [
      [30, 38, 7.4, -18, "plant"],
      [50, 40, 7.1, 14, "plantLight"],
      [28, 56, 6.8, -24, "plantMuted"],
      [52, 58, 6.5, 20, "plant"],
      [29, 74, 6.1, -12, "plantBright"],
      [51, 76, 5.8, 16, "plantLight"],
      [30, 92, 5.4, -20, "plant"],
      [50, 94, 5.1, 10, "plantMuted"],
      [31, 112, 4.7, -14, "plantDeep"],
      [49, 114, 4.4, 18, "plant"],
      [32, 132, 4, -8, "plantLight"],
      [48, 134, 3.7, 12, "plantMuted"],
    ],
    tipLeaf: { size: 4.4, rot: -5, fillKey: "plantBright" },
    growthLeaves: [
      { x: 33, y: 42, size: 4.5, rot: -12, fillKey: "plantLight", showAt: 0.2 },
      { x: 47, y: 36, size: 4.0, rot: 8, fillKey: "plantMuted", showAt: 0.65 },
    ],
  },
  {
    originX: potCx + 11,
    stem: { qx: potCx + 18, qy: 68, ex: potCx + 10, ey: 142 },
    leaves: [
      [54, 40, 7, 22, "plant"],
      [36, 42, 6.7, -16, "plantLight"],
      [55, 58, 6.3, 18, "plantMuted"],
      [34, 60, 6, -22, "plant"],
      [54, 76, 5.6, 14, "plantBright"],
      [35, 78, 5.3, -10, "plantLight"],
      [53, 96, 4.9, 20, "plant"],
      [36, 98, 4.6, -14, "plantMuted"],
      [52, 118, 4.2, 12, "plantDeep"],
      [37, 120, 3.9, -8, "plant"],
    ],
    tipLeaf: { size: 4.2, rot: 11, fillKey: "plantLight" },
    growthLeaves: [
      { x: 48, y: 38, size: 4.3, rot: 16, fillKey: "plant", showAt: 0.25 },
      { x: 40, y: 44, size: 3.8, rot: -10, fillKey: "plantBright", showAt: 0.8 },
    ],
  },
  {
    originX: potCx - 21,
    stem: { qx: potCx - 28, qy: 64, ex: potCx - 18, ey: 128 },
    leaves: [
      [24, 40, 6.8, -28, "plantDeep"],
      [38, 42, 6.5, -8, "plant"],
      [20, 58, 6.1, -32, "plantMuted"],
      [36, 60, 5.8, -12, "plantLight"],
      [19, 78, 5.4, -26, "plant"],
      [34, 80, 5.1, -6, "plantBright"],
      [20, 100, 4.7, -20, "plantMuted"],
      [33, 102, 4.4, -4, "plant"],
    ],
    tipLeaf: { size: 4.0, rot: -16, fillKey: "plantBright" },
    growthLeaves: [
      { x: 22, y: 40, size: 4.1, rot: -26, fillKey: "plantMuted", showAt: 0.35 },
    ],
  },
  {
    originX: potCx + 17,
    stem: { qx: potCx + 24, qy: 62, ex: potCx + 22, ey: 118 },
    leaves: [
      [58, 42, 6.6, 26, "plant"],
      [44, 44, 6.3, 6, "plantLight"],
      [60, 60, 5.9, 22, "plantMuted"],
      [42, 62, 5.6, 2, "plant"],
      [58, 80, 5.2, 16, "plantBright"],
      [43, 82, 4.9, -4, "plantLight"],
    ],
    tipLeaf: { size: 4.1, rot: 19, fillKey: "plantDeep" },
    growthLeaves: [
      { x: 56, y: 40, size: 4.2, rot: 24, fillKey: "plantLight", showAt: 0.45 },
    ],
  },
  {
    originX: potCx - 16,
    stem: { qx: potCx - 26, qy: 58, ex: potCx - 24, ey: 108 },
    leaves: [
      [14, 44, 6.2, -34, "plantMuted"],
      [28, 46, 5.9, -14, "plant"],
      [12, 64, 5.5, -28, "plantDeep"],
      [26, 66, 5.2, -10, "plantLight"],
      [13, 86, 4.8, -22, "plant"],
    ],
    tipLeaf: { size: 3.9, rot: -22, fillKey: "plantMuted" },
    growthLeaves: [
      { x: 18, y: 46, size: 3.9, rot: -30, fillKey: "plantDeep", showAt: 0.55 },
    ],
  },
  {
    originX: potCx + 3,
    stem: { qx: potCx + 4, qy: 52, ex: potCx + 2, ey: 88 },
    leaves: [
      [34, 36, 6.4, -10, "plantBright"],
      [50, 38, 6.1, 12, "plant"],
      [33, 52, 5.7, -16, "plantLight"],
      [51, 54, 5.4, 8, "plantMuted"],
      [34, 70, 5, -6, "plant"],
    ],
    tipLeaf: { size: 4.0, rot: -3, fillKey: "plantDeep" },
    growthLeaves: [
      { x: 38, y: 34, size: 4.4, rot: -8, fillKey: "plantBright", showAt: 0.15 },
      { x: 52, y: 35, size: 4.0, rot: 14, fillKey: "plant", showAt: 0.9 },
    ],
  },
];

/** Upward shoots — spread across soil, not one central cluster. */
const UPRIGHT_DATA = [
  {
    originX: potCx - 14,
    leaf: { x: potCx - 11, y: 12.5, size: 5.0, rot: -20, fillKey: "plantMuted" },
    showAt: 0,
    sway: true,
  },
  {
    originX: potCx - 4,
    leaf: { x: potCx - 1, y: 9.5, size: 5.4, rot: -6, fillKey: "plant" },
    showAt: 0,
    sway: true,
  },
  {
    originX: potCx + 9,
    leaf: { x: potCx + 12, y: 10.5, size: 5.2, rot: 14, fillKey: "plantLight" },
    showAt: 0,
    sway: false,
  },
  {
    originX: potCx + 16,
    leaf: { x: potCx + 18, y: 13.5, size: 4.8, rot: 26, fillKey: "plant" },
    showAt: 0.2,
    sway: true,
  },
  {
    originX: potCx - 19,
    leaf: { x: potCx - 16, y: 14.5, size: 4.6, rot: -30, fillKey: "plantDeep" },
    showAt: 0.35,
    sway: false,
  },
  {
    originX: potCx + 2,
    leaf: { x: potCx + 5, y: 8.2, size: 5.6, rot: 8, fillKey: "plantBright" },
    showAt: 0.5,
    sway: true,
  },
];

function heartLeafPath(cx, cy, size) {
  return `M ${cx} ${cy + size * 0.34}
    C ${cx - size * 0.95} ${cy - size * 0.12} ${cx - size * 0.42} ${cy - size * 0.92} ${cx} ${cy - size * 0.62}
    C ${cx + size * 0.42} ${cy - size * 0.92} ${cx + size * 0.95} ${cy - size * 0.12} ${cx} ${cy + size * 0.34} Z`;
}

function PlantContactShadow({ c, isHovered, isLampOn }) {
  const color = isLampOn ? c.shadow : c.softShadow;

  return (
    <ellipse
      className="plant-shadow"
      cx={potCx}
      cy={shelfY + 1.5}
      rx={isHovered ? 30 : 28}
      ry={isHovered ? 3.8 : 3.4}
      fill={color}
      opacity={isHovered ? 0.92 : 0.78}
    />
  );
}

/** Matte ceramic pot — thick rim and tapered body as one silhouette. */
function potCeramicPath() {
  const lx = potCx - POT_TOP_RX;
  const rx = potCx + POT_TOP_RX;

  return `M ${lx + 7} ${POT_RIM_TOP + 1}
    Q ${lx} ${POT_RIM_TOP + 4} ${lx + 5} ${POT_RIM_BOTTOM}
    L ${potCx - POT_BOTTOM_RX} ${shelfY - 3}
    Q ${potCx} ${shelfY + 0.6} ${potCx + POT_BOTTOM_RX} ${shelfY - 3}
    L ${rx - 5} ${POT_RIM_BOTTOM}
    Q ${rx} ${POT_RIM_TOP + 4} ${rx - 7} ${POT_RIM_TOP + 1}
    Q ${potCx} ${POT_RIM_TOP - 4} ${lx + 7} ${POT_RIM_TOP + 1}
    Z`;
}

function potCavityPath() {
  return `M ${potCx - POT_TOP_RX + 7} ${soilY + 0.2}
    L ${potCx - POT_BOTTOM_RX + 2} ${shelfY - 2}
    L ${potCx + POT_BOTTOM_RX - 2} ${shelfY - 2}
    L ${potCx + POT_TOP_RX - 7} ${soilY + 0.2}
    Z`;
}

function PlantPot({ c }) {
  return (
    <g className="plant-pot">
      <path d={potCeramicPath()} fill={c.ceramic} />
      {/* Thick rounded rim — subtle inner shadow, no glass look. */}
      <ellipse cx={potCx} cy={POT_RIM_TOP + 3.3} rx={POT_TOP_RX - 2} ry={3.1} fill={c.ceramicDeep} opacity="0.22" />
      <ellipse cx={potCx} cy={POT_RIM_TOP + 2.8} rx={POT_TOP_RX - 5.5} ry={2.4} fill={c.ceramic} />
    </g>
  );
}

function PlantSoil({ c }) {
  return (
    <ellipse
      className="plant-soil"
      cx={potCx}
      cy={soilY}
      rx={POT_TOP_RX - 6}
      ry={2.9}
      fill={c.potSoil}
    />
  );
}

function PlantLeaf({ cx, cy, size, rot, fillKey, c, leafScale = 1, opacity = 1 }) {
  const leafSize = size * LEAF_SIZE_MULT * leafScale;
  return (
    <g className="plant-leaf" transform={`rotate(${rot} ${cx} ${cy})`} opacity={opacity}>
      <path d={heartLeafPath(cx, cy, leafSize)} fill={c[fillKey]} />
      <line
        x1={cx}
        y1={cy - leafSize * 0.52}
        x2={cx}
        y2={cy + leafSize * 0.12}
        stroke={c.plantDeep}
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.38"
      />
    </g>
  );
}

function vineStemPath(vine, t) {
  const originX = vine.originX;
  const endX = originX + (vine.stem.ex - originX) * (1 + t * 0.04);
  return `M ${originX} ${soilY} Q ${vine.stem.qx} ${mapFromSoil(vine.stem.qy, t, 0.1)} ${endX} ${mapFromSoil(
    vine.stem.ey,
    t,
    0.14
  )}`;
}

function vineStemTip(vine, t) {
  const originX = vine.originX;
  return {
    x: originX + (vine.stem.ex - originX) * (1 + t * 0.04),
    y: mapFromSoil(vine.stem.ey, t, 0.14),
  };
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

/** Reliable SVG vine sway — Framer rotate on <g> is unreliable in Chrome. */
function SvgVineSway({
  active,
  token = 0,
  pivotX,
  pivotY,
  angles,
  durationMs,
  delayMs = 0,
  loop = false,
  children,
}) {
  const groupRef = useRef(null);

  useEffect(() => {
    const node = groupRef.current;
    if (!active || !node || !angles?.length) {
      node?.removeAttribute("transform");
      return undefined;
    }

    let frameId = 0;
    let startedAt = null;

    const tick = (now) => {
      if (startedAt == null) {
        startedAt = now + delayMs;
      }
      if (now < startedAt) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      const elapsed = now - startedAt;
      if (loop) {
        const progress = (elapsed % durationMs) / durationMs;
        const angle = sampleKeyframes(angles, progress);
        node.setAttribute("transform", `rotate(${angle} ${pivotX} ${pivotY})`);
        frameId = requestAnimationFrame(tick);
        return;
      }

      const progress = Math.min(elapsed / durationMs, 1);
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
  }, [active, token, pivotX, pivotY, angles, durationMs, delayMs, loop]);

  return <g ref={groupRef}>{children}</g>;
}

function getVineSway(vineIndex, { isWatering, isSwaying, hoverSway }) {
  if (isWatering && WATER_SWAY_VINES.includes(vineIndex)) {
    const wave = 2.4 + (vineIndex % 3) * 0.9;
    const ripple = WATER_SWAY_VINES.indexOf(vineIndex) * 0.09;
    return {
      active: true,
      loop: false,
      angles: [0, wave, -(wave * 0.68), wave * 0.28, 0],
      durationMs: 920,
      delayMs: 300 + ripple * 1000,
    };
  }

  if (isSwaying && AFTER_SWAY_VINES.includes(vineIndex)) {
    const wave = 4.2 + (vineIndex % 3) * 0.7;
    const ripple = AFTER_SWAY_VINES.indexOf(vineIndex) * 0.16;
    return {
      active: true,
      loop: false,
      angles: [0, wave, -(wave * 0.52), wave * 0.14, 0],
      durationMs: 3000,
      delayMs: 80 + ripple * 1000,
    };
  }

  if (hoverSway) {
    const wave = 1.1 + vineIndex * 0.1;
    return {
      active: true,
      loop: true,
      angles: [0, wave, -(0.85 + vineIndex * 0.08), 0],
      durationMs: 3400,
      delayMs: 0,
    };
  }

  return { active: false };
}

function growthEmerge(t, showAt) {
  return clamp((t - showAt) / 0.22, 0, 1);
}

function compactVines(vines) {
  return vines.map((vine) => ({
    originX: vine.originX,
    stem: vine.stem,
    tipLeaf: vine.tipLeaf,
    growthLeaves: vine.growthLeaves,
    leaves: vine.leaves
      .filter((_, index) => index % 2 === 0 || index < 6)
      .map(([x, y, size, rot, fillKey]) => [
        x,
        shelfY + (y - shelfY) * 0.72,
        size * 0.94,
        rot,
        fillKey,
      ]),
  }));
}

function PlantVines({
  c,
  isHovered,
  isWatering,
  isSwaying,
  swayToken,
  compact,
  waterToken,
  growthStage,
}) {
  const vines = compact ? compactVines(VINE_DATA) : VINE_DATA;
  const t = growthToT(growthStage);

  const hoverSway = isHovered && !isWatering && !isSwaying;

  return (
    <g className="plant-vines" key={`${waterToken}-${swayToken}`}>
      <defs>
        <clipPath id="plant-stem-clip" clipRule="evenodd">
          <rect x="-16" y={soilY} width="124" height="200" />
          <path d={potCavityPath()} />
        </clipPath>
      </defs>
      {vines.map((vine, vineIndex) => {
        const sway = getVineSway(vineIndex, { isWatering, isSwaying, hoverSway });
        const tip = vineStemTip(vine, t);

        return (
          <SvgVineSway
            key={`vine-${vineIndex}`}
            active={sway.active}
            token={`${waterToken}-${swayToken}`}
            pivotX={vine.originX}
            pivotY={soilY}
            angles={sway.angles}
            durationMs={sway.durationMs}
            delayMs={sway.delayMs}
            loop={sway.loop}
          >
            <g className="plant-vine">
              <path
                d={vineStemPath(vine, t)}
                fill="none"
                stroke={c.coralDeep}
                strokeWidth="2.05"
                strokeLinecap="round"
                opacity="0.76"
                clipPath="url(#plant-stem-clip)"
              />
              {vine.leaves.map(([x, y, size, rot, fillKey], leafIndex) => (
                <PlantLeaf
                  key={`leaf-${vineIndex}-${leafIndex}`}
                  cx={potCx + (x - potCx) * (1 + t * 0.05)}
                  cy={mapFromSoil(y, t, 0.1)}
                  size={size * (1 + t * 0.08)}
                  rot={rot}
                  fillKey={fillKey}
                  c={c}
                  leafScale={1 + t * 0.2}
                />
              ))}
              {(vine.growthLeaves ?? []).map((leaf, growthIndex) => {
                const emerge = growthEmerge(t, leaf.showAt);
                if (emerge <= 0) return null;

                return (
                  <PlantLeaf
                    key={`growth-${vineIndex}-${growthIndex}`}
                    cx={potCx + (leaf.x - potCx) * (1 + t * 0.05)}
                    cy={mapFromSoil(leaf.y, t, 0.1)}
                    size={leaf.size * (1 + t * 0.08)}
                    rot={leaf.rot}
                    fillKey={leaf.fillKey}
                    c={c}
                    leafScale={(0.88 + emerge * 0.12) * (1 + t * 0.16)}
                    opacity={0.55 + emerge * 0.45}
                  />
                );
              })}
              {vine.tipLeaf && (
                <PlantLeaf
                  key={`tip-${vineIndex}`}
                  cx={tip.x}
                  cy={tip.y}
                  size={vine.tipLeaf.size * (1 + t * 0.08)}
                  rot={vine.tipLeaf.rot}
                  fillKey={vine.tipLeaf.fillKey}
                  c={c}
                  leafScale={1.18 + t * 0.2}
                />
              )}
            </g>
          </SvgVineSway>
        );
      })}
    </g>
  );
}

function getUprightSway(shootIndex, { isWatering, isSwaying }) {
  const shoot = UPRIGHT_DATA[shootIndex];
  if (!shoot.sway) {
    return { animate: { rotate: 0 }, transition: { duration: 0.35 } };
  }

  if (isSwaying) {
    const wave = 2.2 + (shootIndex % 3) * 0.7;
    return {
      animate: { rotate: [0, wave, -(wave * 0.5), 0] },
      transition: { duration: 1.3, delay: shootIndex * 0.08, ease: [0.42, 0, 0.25, 1] },
    };
  }

  if (isWatering) {
    const wave = 1.8 + (shootIndex % 2) * 0.6;
    return {
      animate: { rotate: [0, wave, -(wave * 0.55), 0] },
      transition: { duration: 0.85, delay: 0.22 + shootIndex * 0.06, ease: "easeInOut" },
    };
  }

  return { animate: { rotate: 0 }, transition: { duration: 0.35 } };
}

function PlantUprightFoliage({ c, isWatering, isSwaying, growthStage }) {
  const t = growthToT(growthStage);

  return (
    <g className="plant-upright">
      {UPRIGHT_DATA.map((shoot, index) => {
        const emerge = growthEmerge(t, shoot.showAt);
        if (emerge <= 0 && shoot.showAt > 0) return null;
        const visible = shoot.showAt === 0 ? 1 : emerge;
        const sway = getUprightSway(index, { isWatering, isSwaying });
        const { x, y, size, rot, fillKey } = shoot.leaf;
        const stemMidX = shoot.originX + (x - shoot.originX) * 0.55;
        const stemMidY = soilY - 5.5 - t * 1.2;
        const cx = shoot.originX + (x - shoot.originX) * (1 + t * 0.04);
        const cy = y - t * 1.8;

        return (
          <motion.g
            key={`upright-${index}`}
            animate={sway.animate}
            transition={sway.transition}
            style={{ transformOrigin: `${shoot.originX}px ${soilY}px` }}
            opacity={visible}
          >
            <path
              d={`M ${shoot.originX} ${soilY} Q ${stemMidX} ${stemMidY} ${cx} ${cy}`}
              fill="none"
              stroke={c.coralDeep}
              strokeWidth="1.9"
              strokeLinecap="round"
              opacity="0.64"
            />
            <PlantLeaf
              cx={cx}
              cy={cy}
              size={size * (1 + t * 0.07)}
              rot={rot}
              fillKey={fillKey}
              c={c}
              leafScale={(0.9 + visible * 0.1) * (1 + t * 0.18)}
              opacity={0.6 + visible * 0.4}
            />
          </motion.g>
        );
      })}
    </g>
  );
}

function WateringCan({ c }) {
  const scale = WATERING_CAN.height / WATERING_CAN.viewHeight;
  const { viewWidth } = WATERING_CAN;

  return (
    <g
      className="plant-watering-can"
      transform={`translate(${viewWidth} 0) scale(${-scale} ${scale})`}
    >
      {/* Body — narrow, tall tapered cylinder. */}
      <path
        d="M 22 13.5
          L 20.5 31.5
          Q 30 34 39.5 31.5
          L 38 13.5
          Q 30 11 22 13.5 Z"
        fill={c.canPurple}
      />
      <path
        d="M 21.5 26.5
          L 20.8 31.5
          Q 30 33.6 39.2 31.5
          L 38.5 26.5
          Q 30 29.2 21.5 26.5 Z"
        fill={c.canPurpleDeep}
        opacity="0.15"
      />
      <path
        d="M 23 14.5
          L 21.8 30
          Q 27.5 32.2 33 31.4
          L 33.8 14.2
          Q 28.5 12 23 14.5 Z"
        fill={c.canPurpleLight}
        opacity="0.45"
      />
      <ellipse cx="30" cy="14" rx="6.2" ry="1.7" fill={c.canPurpleLight} opacity="0.38" />
      <ellipse cx="30" cy="14.3" rx="5.5" ry="1.4" fill={c.canPurpleDeep} opacity="0.14" />
      <ellipse cx="30" cy="14.1" rx="4.6" ry="1" fill={c.canPurpleDeep} opacity="0.08" />

      {/* Spout — uniform filled tube, no strokes. */}
      <path
        d="M 20.2 23.6
          C 16 19 10.8 14.2 6.4 11.2
          L 5.2 12.4
          C 9.8 15.6 15 20.2 19.4 24.6
          Q 21 25.8 20.2 23.6 Z"
        fill={c.canPurple}
      />
      <path
        d="M 19.8 23
          C 16.2 19.2 11.8 15 7.8 12.2
          L 7.2 13.2
          C 10.8 16 14.8 19.8 18.6 23.4 Z"
        fill={c.canPurpleLight}
        opacity="0.34"
      />

      {/* Rose/head — slightly smaller than the tube. */}
      <ellipse cx="5.8" cy="11" rx="2" ry="1.4" fill={c.canPurple} />
      <ellipse cx="5.8" cy="11" rx="1.35" ry="0.92" fill={c.canPurpleDeep} opacity="0.14" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <circle
          key={`can-rose-${deg}`}
          cx={5.8 + Math.cos((deg * Math.PI) / 180) * 0.72}
          cy={11 + Math.sin((deg * Math.PI) / 180) * 0.72}
          r="0.3"
          fill={c.canPurpleDeep}
          opacity="0.32"
        />
      ))}

      {/* Handle — filled ribbon, no strokes. */}
      <path
        d="M 39.4 16.8
          C 42.2 15.4 43.4 18.2 43.2 21.2
          C 43 24.2 41.4 27.4 39.2 27.8
          L 38.4 27
          C 40.4 26.6 41.8 23.8 42 21
          C 42.2 18.2 40.6 17.4 39.4 16.8 Z"
        fill={c.canPurple}
      />
      <path
        d="M 39.6 17.2
          C 41.8 16.2 42.8 18.6 42.6 21
          C 42.4 23.4 41.2 26 39.6 26.4
          L 39.2 25.8
          C 40.6 25.4 41.6 23.2 41.8 21
          C 42 18.8 40.8 17.6 39.6 17.2 Z"
        fill={c.canPurpleLight}
        opacity="0.42"
      />
      <ellipse cx="39.2" cy="17.2" rx="1.3" ry="0.95" fill={c.canPurple} />
      <ellipse cx="39" cy="26.8" rx="1.2" ry="0.85" fill={c.canPurple} />
    </g>
  );
}

function PlantWaterDrop({ c, delay, x, startY, endY, radius = 1.8 }) {
  const fromY = Math.min(startY, endY);
  const toY = Math.max(startY, endY);

  return (
    <motion.circle
      className="plant-water-drop"
      r={radius}
      fill={c.tealLight}
      opacity="0.88"
      initial={{ cx: x, cy: fromY, opacity: 0 }}
      animate={{
        cx: x,
        cy: [fromY, toY],
        opacity: [0, 0.88, 0],
      }}
      transition={{
        duration: 0.38 + radius * 0.04,
        delay,
        ease: [0.42, 0, 0.58, 1],
      }}
    />
  );
}

function mirroredCanPoint(localX, localY, viewWidth, scale) {
  return {
    x: viewWidth - localX * scale,
    y: localY * scale,
  };
}

function PlantWateringAnimation({ c, isWatering, waterToken, isLampOn }) {
  if (!isWatering) return null;

  const canScale = WATERING_CAN.height / WATERING_CAN.viewHeight;
  const { spoutTip, pivot, pourAngle, viewWidth } = WATERING_CAN;
  const pivotPt = mirroredCanPoint(pivot.x, pivot.y, viewWidth, canScale);
  const tipPt = mirroredCanPoint(5.8, spoutTip.y, viewWidth, canScale);
  const pivotLocalX = pivotPt.x;
  const pivotLocalY = pivotPt.y;
  const tipDx = tipPt.x - pivotLocalX;
  const tipDy = tipPt.y - pivotLocalY;
  const rad = (pourAngle * Math.PI) / 180;

  const spoutOffsetX = tipDx * Math.cos(rad) - tipDy * Math.sin(rad);
  const spoutOffsetY = tipDx * Math.sin(rad) + tipDy * Math.cos(rad);
  const canPourX = waterTarget.x - (pivotLocalX + spoutOffsetX);
  const canStartX = canPourX - 16;
  const canEndX = canPourX - 20;
  const canStartY = -58;
  const canPourY = -46;
  const canEndY = -54;

  const dropEndY = waterTarget.y;
  const spoutX = canPourX + pivotLocalX + spoutOffsetX;
  const spoutY = canPourY + pivotLocalY + spoutOffsetY;
  const dropStartY = Math.max(4, Math.min(spoutY, dropEndY - 4));
  const dropCenterX = spoutX;
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  const drops = [
    { delay: 0.3, x: dropCenterX, radius: 1.5 },
    { delay: 0.38, x: dropCenterX + 1.2, radius: 1.8 },
    { delay: 0.46, x: dropCenterX - 1, radius: 1.6 },
    { delay: 0.54, x: dropCenterX + 0.6, radius: 2 },
    { delay: 0.62, x: dropCenterX - 0.7, radius: 1.5 },
  ];

  return (
    <g className="plant-watering" key={waterToken}>
      <motion.ellipse
        className="plant-watering-shadow"
        cx={canPourX + pivotLocalX - 6}
        cy={canPourY + pivotLocalY + 6}
        rx={12}
        ry={2}
        fill={shadowColor}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.32, 0.32, 0] }}
        transition={{
          duration: 1,
          times: [0, 0.14, 0.78, 1],
          ease: "easeInOut",
        }}
      />
      <motion.g
        initial={{ opacity: 0, x: canStartX, y: canStartY, rotate: 6 }}
        animate={{
          opacity: [0, 1, 1, 0],
          x: [canStartX, canPourX, canPourX, canEndX],
          y: [canStartY, canPourY, canPourY, canEndY],
          rotate: [6, 8, pourAngle, pourAngle - 2],
        }}
        transition={{
          duration: 1,
          times: [0, 0.12, 0.78, 1],
          ease: "easeInOut",
        }}
        style={{ transformOrigin: `${pivotLocalX}px ${pivotLocalY}px` }}
      >
        <WateringCan c={c} />
      </motion.g>
      {drops.map((drop, index) => (
        <PlantWaterDrop
          key={`drop-${index}`}
          c={c}
          delay={drop.delay}
          x={drop.x}
          startY={dropStartY}
          endY={dropEndY}
          radius={drop.radius}
        />
      ))}
    </g>
  );
}

export function PlantShape({
  c,
  isHovered = false,
  isLampOn = false,
  compact = false,
  isWatering = false,
  waterToken = 0,
  isSwaying = false,
  swayToken = 0,
  growthStage = 0,
}) {
  return (
    <g className="plant-shape">
      <PlantContactShadow c={c} isHovered={isHovered} isLampOn={isLampOn} />
      <PlantPot c={c} />
      <PlantUprightFoliage
        c={c}
        isWatering={isWatering}
        isSwaying={isSwaying}
        growthStage={growthStage}
      />
      <PlantVines
        c={c}
        isHovered={isHovered}
        isWatering={isWatering}
        isSwaying={isSwaying}
        swayToken={swayToken}
        compact={compact}
        waterToken={waterToken}
        growthStage={growthStage}
      />
      <PlantSoil c={c} />
      <PlantWateringAnimation
        c={c}
        isWatering={isWatering}
        waterToken={waterToken}
        isLampOn={isLampOn}
      />
    </g>
  );
}
