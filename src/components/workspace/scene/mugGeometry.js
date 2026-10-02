// Mug geometry — shared by SceneDefs (clip path) and DrinkObject (glass).
export const MATCHA_DRINK = {
  matchaDeep: "#6E9070",
  matcha: "#8BA888",
  matchaLight: "#A5C49E",
  matchaWarm: "#9CB88A",
  milkTop: "#E8DDD0",
  milkMid: "#F2EBE0",
  milkBottom: "#FFFCF7",
  milkWarm: "#FFF6EC",
  ice: "rgba(255, 252, 247, 0.42)",
  straw: "#FFFCF7",
  strawAccent: "#F5EFE3",
  foam: "#FFFCF7",
};

export const MUG_CX = 34;
export const MUG_DESK_Y = 78;
export const MUG_RIM_CY = 20;
export const MUG_RIM_RX = 19;
export const MUG_RIM_RY = 4.8;
export const MUG_BASE_RX = 13.5;
export const MUG_BASE_RY = 2.8;
export const MUG_BASE_CY = MUG_DESK_Y - MUG_BASE_RY;
export const MUG_WALL = 1.8;
export const MUG_LIQUID_TOP = 27;
export const MUG_MATCHA_BOTTOM = 50;
export const MUG_LIQUID_BOTTOM = MUG_BASE_CY - MUG_BASE_RY - 0.4;

export function mugGlassSilhouette(cx, rimCy, rimRx, rimRy, baseCy, baseRx, baseRy) {
  return `M ${cx - rimRx} ${rimCy}
    A ${rimRx} ${rimRy} 0 0 0 ${cx + rimRx} ${rimCy}
    L ${cx + baseRx} ${baseCy}
    A ${baseRx} ${baseRy} 0 0 1 ${cx - baseRx} ${baseCy}
    L ${cx - rimRx} ${rimCy}
    A ${rimRx} ${rimRy} 0 0 1 ${cx - rimRx} ${rimCy} Z`;
}

export function mugInnerSilhouette(cx, wall = MUG_WALL) {
  return mugGlassSilhouette(
    cx,
    MUG_RIM_CY,
    MUG_RIM_RX - wall,
    MUG_RIM_RY - wall * 0.45,
    MUG_BASE_CY,
    MUG_BASE_RX - wall,
    MUG_BASE_RY - wall * 0.35
  );
}

export function mugLiquidRxAt(y) {
  const topRx = MUG_RIM_RX - MUG_WALL;
  const botRx = MUG_BASE_RX - MUG_WALL;
  const t = (y - MUG_RIM_CY) / (MUG_BASE_CY - MUG_RIM_CY);
  return topRx + (botRx - topRx) * t;
}

export const MUG_INNER_CLIP_PATH = mugInnerSilhouette(MUG_CX);
