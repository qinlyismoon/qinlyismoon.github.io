/**
 * DeskScene — the layered desk scene, composed in paint order:
 *
 *   SceneDefs → Wall → Window → Shelf → Desk → Objects → Effects → Interaction
 *
 * Day/night flows through the layers without repainting the illustration:
 * SceneBackground changes → Window updates → Lamp state updates →
 * Effect layer updates → everything else stays the same.
 */
import { useRef } from "react";
import { DESK_SCENE_MIN_X } from "../../../lib/deskLayout";
import useDeskFraming from "../../../hooks/useDeskFraming";
import { SceneDefs } from "./SceneDefs";
import SceneBackground from "./layers/SceneBackground";
import WallLayer from "./layers/WallLayer";
import WindowLayer from "./layers/WindowLayer";
import ShelfLayer from "./layers/ShelfLayer";
import DeskLayer from "./layers/DeskLayer";
import ObjectLayer from "./layers/ObjectLayer";
import EffectLayer from "./layers/EffectLayer";
import InteractionLayer from "./layers/InteractionLayer";

export default function DeskScene({
  c,
  environment,
  isLampOn,
  isNight,
  interaction,
  chromeProps,
  sceneLabel,
}) {
  const stageRef = useRef(null);
  const framing = useDeskFraming(stageRef);

  return (
    <svg
      ref={stageRef}
      className="desk-scene__stage"
      viewBox={framing.viewBox}
      width={framing.width}
      height={framing.height}
      role="img"
      aria-label={sceneLabel}
    >
      <SceneDefs c={c} />
      <WallLayer c={c} isLampOn={isLampOn} />
      <WindowLayer c={c} environment={environment} />
      <ShelfLayer
        c={c}
        isLampOn={isLampOn}
        interaction={interaction}
        chromeProps={chromeProps}
      />
      <DeskLayer c={c} />
      <ObjectLayer
        c={c}
        isLampOn={isLampOn}
        interaction={interaction}
        chromeProps={chromeProps}
      />
      <EffectLayer
        c={c}
        isLampOn={isLampOn}
        isNight={isNight}
        cameraFlash={interaction.cameraFlash}
      />
      <InteractionLayer
        hoveredId={interaction.hoveredId}
        onHoverChange={interaction.onHoverChange}
        onActivate={interaction.onActivate}
        chromeProps={chromeProps}
        isLampOn={isLampOn}
        isMusicPlaying={interaction.isMusicPlaying}
      />
    </svg>
  );
}

export { SceneBackground, DESK_SCENE_MIN_X };
