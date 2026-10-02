/**
 * SceneDefs — shared SVG defs for the layered desk scene.
 *
 * Pure markup: gradients, clips, filters used by the layers below.
 * No behavior, no interactivity. Lives at the root of DeskScene so every
 * layer can reference it.
 */
import { MATCHA_DRINK, MUG_INNER_CLIP_PATH } from "./mugGeometry";

export function SceneDefs({ c }) {
  return (
    <defs>
      <radialGradient id="lampWarmLight" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF4D6" stopOpacity="0.68" />
        <stop offset="45%" stopColor="#FFE8B4" stopOpacity="0.32" />
        <stop offset="100%" stopColor="#FFE8B4" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="lampHotCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF8E8" stopOpacity="0.82" />
        <stop offset="100%" stopColor="#FFF8E8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="matchaLiquid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.matchaDeep} />
        <stop offset="100%" stopColor={MATCHA_DRINK.matcha} />
      </linearGradient>
      <linearGradient id="matchaLiquidWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.matchaDeep} stopOpacity="0.92" />
        <stop offset="100%" stopColor={MATCHA_DRINK.matchaWarm} />
      </linearGradient>
      <linearGradient id="matchaMilk" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.milkTop} stopOpacity="0.92" />
        <stop offset="52%" stopColor={MATCHA_DRINK.milkMid} />
        <stop offset="100%" stopColor={MATCHA_DRINK.milkBottom} />
      </linearGradient>
      <linearGradient id="matchaMilkWarm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={MATCHA_DRINK.milkMid} stopOpacity="0.9" />
        <stop offset="100%" stopColor={MATCHA_DRINK.milkWarm} />
      </linearGradient>
      <clipPath id="glassInteriorClip">
        <path d={MUG_INNER_CLIP_PATH} />
      </clipPath>
      <linearGradient id="calendarPaper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.white} />
        <stop offset="100%" stopColor={c.cream} stopOpacity="0.55" />
      </linearGradient>
      <radialGradient id="lensGlare" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="screenBreath" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="roomWindowSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c.windowSky} />
        <stop offset="100%" stopColor={c.windowSkyDeep} />
      </linearGradient>
    </defs>
  );
}
