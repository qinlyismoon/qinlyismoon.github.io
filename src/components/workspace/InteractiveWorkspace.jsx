import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import { SCENE_CONTENT_SHIFT_X, ROOM_WINDOW } from "../../lib/deskLayout";
import { WORKSPACE_ASPECT, WORKSPACE_SCENE_OFFSET_Y, WORKSPACE_VIEWBOX } from "../../lib/animations";
import { getDeskPalette } from "../../lib/deskPalette";
import { CAMERA_FLASH_MS, MUG_STIR_AUDIO_MS, MUG_STIR_MS, PLANT_WATERING_MS } from "../../lib/workspaceInteractions";
import { WORKSPACE_SOUNDS, NATURE_SOUND_VOLUME, soundSrc } from "../../lib/sounds";
import WorkspaceMugTooltip from "./WorkspaceMugTooltip";
import WorkspaceClockTooltip from "./WorkspaceClockTooltip";
import WorkspacePlantTooltip from "./WorkspacePlantTooltip";
import { WORKSPACE_OBJECTS } from "../../lib/workspaceObjects";
import WorkspaceObject from "./WorkspaceObject";
import { useCompactScene } from "../../hooks/useCompactScene";
import { useYouTubeMusic } from "../../hooks/useYouTubeMusic";
import {
  LampLightLayer,
  PhoebeDeskScene,
  RoomWindow,
  renderDeskObject,
  SceneDefs,
} from "./WorkspaceSceneParts";

export default function InteractiveWorkspace({
  copy,
  isDarkMode,
  isLampOn,
  onLampToggle,
}) {
  const { isMuted, language } = useAppSettings();
  const { playSound, playLoopingSound, pauseSound, clickSoundRef } =
    usePageTransition();
  const navigate = useNavigate();
  const palette = useMemo(() => getDeskPalette(isDarkMode), [isDarkMode]);
  const compactScene = useCompactScene();
  const youtubeMusicRef = useRef(null);
  const matchaStirRef = useRef(null);
  const lampToggleRef = useRef(null);
  const pageFlipRef = useRef(null);
  const cameraShutterRef = useRef(null);
  const clockTickRef = useRef(null);
  const plantDropsRef = useRef(null);
  const natureRef = useRef(null);
  const mugStirTimerRef = useRef(null);
  const matchaStirStopTimerRef = useRef(null);
  const plantWaterTimerRef = useRef(null);
  const plantDropsStopTimerRef = useRef(null);
  const plantSwayTimerRef = useRef(null);
  const plantGrowTimerRef = useRef(null);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [mugStirring, setMugStirring] = useState(false);
  const [mugStirToken, setMugStirToken] = useState(0);
  const [plantWatering, setPlantWatering] = useState(false);
  const [plantWaterToken, setPlantWaterToken] = useState(0);
  const [plantSwaying, setPlantSwaying] = useState(false);
  const [plantSwayToken, setPlantSwayToken] = useState(0);
  const [plantGrowthStage, setPlantGrowthStage] = useState(0);
  const [plantGrowthFloat, setPlantGrowthFloat] = useState(0);
  const [plantGrowing, setPlantGrowing] = useState(false);

  const PLANT_MAX_STAGE = 4;
  const plantIsMaxed = plantGrowthStage >= PLANT_MAX_STAGE;
  const PLANT_SWAY_MS = 3800;
  const PLANT_GROW_MS = 520;
  const PLANT_GROW_EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("workspacePlantGrowthStage");
      if (saved == null) return;
      const parsed = Math.max(0, Math.min(PLANT_MAX_STAGE, Number(saved)));
      if (Number.isFinite(parsed)) {
        setPlantGrowthStage(parsed);
        setPlantGrowthFloat(parsed);
      }
    } catch {
      // Ignore storage errors.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("workspacePlantGrowthStage", String(plantGrowthStage));
    } catch {
      // Ignore storage errors.
    }
  }, [plantGrowthStage]);

  const animatePlantGrowthTo = useCallback((nextStage) => {
    const from = plantGrowthFloat;
    const to = nextStage;
    if (from === to) return;

    setPlantGrowing(true);
    window.clearTimeout(plantGrowTimerRef.current);

    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / PLANT_GROW_MS, 1);
      const eased = PLANT_GROW_EASE_OUT(progress);
      setPlantGrowthFloat(from + (to - from) * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
        return;
      }
      setPlantGrowthFloat(to);
      setPlantGrowing(false);
    };
    requestAnimationFrame(tick);
  }, [plantGrowthFloat]);

  useYouTubeMusic({
    containerRef: youtubeMusicRef,
    isPlaying: isMusicPlaying,
    isMuted,
  });

  const stopMatchaStir = useCallback(() => {
    window.clearTimeout(matchaStirStopTimerRef.current);
    const audio = matchaStirRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const playMatchaStir = useCallback(() => {
    if (isMuted) return;
    const audio = matchaStirRef.current;
    if (!audio) return;

    window.clearTimeout(matchaStirStopTimerRef.current);
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay-related rejections until the user interacts.
    });
    matchaStirStopTimerRef.current = window.setTimeout(stopMatchaStir, MUG_STIR_AUDIO_MS);
  }, [isMuted, stopMatchaStir]);

  const stopClockTick = useCallback(() => {
    const audio = clockTickRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const playClockTick = useCallback(() => {
    if (isMuted) return;
    const audio = clockTickRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    playLoopingSound(clockTickRef);
  }, [isMuted, playLoopingSound]);

  const stopNatureSound = useCallback(() => {
    const audio = natureRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const playNatureSound = useCallback(() => {
    if (isMuted) return;
    const audio = natureRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = NATURE_SOUND_VOLUME;
    playLoopingSound(natureRef);
  }, [isMuted, playLoopingSound]);

  const stopPlantDrops = useCallback(() => {
    window.clearTimeout(plantDropsStopTimerRef.current);
    const audio = plantDropsRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
  }, []);

  const playPlantDrops = useCallback(() => {
    if (isMuted) return;
    const audio = plantDropsRef.current;
    if (!audio) return;

    window.clearTimeout(plantDropsStopTimerRef.current);
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {
      // Ignore autoplay-related rejections until the user interacts.
    });
    plantDropsStopTimerRef.current = window.setTimeout(stopPlantDrops, PLANT_WATERING_MS);
  }, [isMuted, stopPlantDrops]);

  useEffect(() => {
    if (isMuted) {
      stopMatchaStir();
      stopClockTick();
      stopPlantDrops();
      stopNatureSound();
    }
  }, [isMuted, stopMatchaStir, stopClockTick, stopPlantDrops, stopNatureSound]);

  useEffect(() => () => {
    pauseSound(matchaStirRef);
    stopClockTick();
    stopPlantDrops();
    stopNatureSound();
    window.clearTimeout(mugStirTimerRef.current);
    window.clearTimeout(matchaStirStopTimerRef.current);
    window.clearTimeout(plantWaterTimerRef.current);
    window.clearTimeout(plantSwayTimerRef.current);
    window.clearTimeout(plantGrowTimerRef.current);
  }, [pauseSound, stopClockTick, stopPlantDrops, stopNatureSound]);

  const handleMugHoverChange = useCallback(
    (hovered) => {
      if (!hovered) {
        stopMatchaStir();
      }
    },
    [stopMatchaStir]
  );

  const handleClockHoverChange = useCallback(
    (hovered) => {
      if (hovered) {
        playClockTick();
        return;
      }

      stopClockTick();
    },
    [playClockTick, stopClockTick]
  );

  const handlePlantHoverChange = useCallback(
    (hovered) => {
      if (!hovered) {
        stopPlantDrops();
      }
    },
    [stopPlantDrops]
  );

  const handleWindowHoverChange = useCallback(
    (hovered) => {
      if (hovered) {
        playNatureSound();
        return;
      }

      stopNatureSound();
    },
    [playNatureSound, stopNatureSound]
  );

  const toggleMusic = () => {
    setIsMusicPlaying((playing) => !playing);
  };

  const playObjectSound = useCallback(
    (id) => {
      if (id === "books") {
        playSound(pageFlipRef);
        return;
      }
      if (id === "camera") {
        playSound(cameraShutterRef);
        return;
      }
      playSound(clickSoundRef);
    },
    [playSound, clickSoundRef]
  );

  const handleActivate = ({ id, action, href, event }) => {
    if (id === "clock" || id === "window") return;

    if (action === "lamp") {
      onLampToggle();
      playSound(lampToggleRef);
      return;
    }

    if (action === "music") {
      toggleMusic();
      return;
    }

    if (action === "mug") {
      playMatchaStir();
      setMugStirToken((token) => token + 1);
      setMugStirring(true);
      window.clearTimeout(mugStirTimerRef.current);
      mugStirTimerRef.current = window.setTimeout(() => setMugStirring(false), MUG_STIR_MS);
      return;
    }

    if (action === "plant") {
      if (plantWatering || plantSwaying || plantGrowing) return;

      playPlantDrops();
      setPlantWaterToken((token) => token + 1);
      setPlantWatering(true);
      window.clearTimeout(plantWaterTimerRef.current);
      plantWaterTimerRef.current = window.setTimeout(
        () => {
          setPlantWatering(false);
          setPlantSwayToken((token) => token + 1);
          setPlantSwaying(true);
          window.clearTimeout(plantSwayTimerRef.current);
          plantSwayTimerRef.current = window.setTimeout(() => {
            setPlantSwaying(false);

            setPlantGrowthStage((stage) => {
              const atMax = stage >= PLANT_MAX_STAGE;
              if (atMax) return stage;
              const next = stage + 1;
              animatePlantGrowthTo(next);
              return next;
            });
          }, PLANT_SWAY_MS);
        },
        PLANT_WATERING_MS
      );
      return;
    }

    if (id === "camera") {
      setCameraFlash(true);
      window.setTimeout(() => setCameraFlash(false), CAMERA_FLASH_MS);
    }

    if (!href) return;

    if (href.startsWith("#")) {
      event?.preventDefault();
      return;
    }

    playObjectSound(id);

    if (href.startsWith("/")) {
      event?.preventDefault();
      navigate(href);
    }
  };

  const interactionState = {
    isLampOn,
    isMusicPlaying,
    cameraFlash,
    mugStirring,
    mugStirToken,
    plantWatering,
    plantWaterToken,
    plantSwaying,
    plantSwayToken,
    plantGrowthStage: plantGrowthFloat,
    plantIsMaxed,
    compactScene,
  };

  return (
    <div
      className={`workspace-scene${isLampOn ? " workspace-scene--lamp-on" : ""}${
        isMusicPlaying ? " workspace-scene--music-on" : ""
      }`}
      style={{ "--desk-caption": palette.caption, "--desk-tooltip-text": palette.inkSoft }}
    >
      <div className="workspace-youtube-player" aria-hidden="true">
        <div ref={youtubeMusicRef} />
      </div>
      <audio ref={matchaStirRef} preload="auto" src="/matcha-stir.mp3" />
      <audio ref={lampToggleRef} preload="auto" src={soundSrc(WORKSPACE_SOUNDS.lampToggle)} />
      <audio ref={pageFlipRef} preload="auto" src={soundSrc(WORKSPACE_SOUNDS.pageFlip)} />
      <audio
        ref={cameraShutterRef}
        preload="auto"
        src={soundSrc(WORKSPACE_SOUNDS.cameraShutter)}
      />
      <audio
        ref={clockTickRef}
        preload="auto"
        src={soundSrc(WORKSPACE_SOUNDS.clockTick)}
        loop
      />
      <audio
        ref={plantDropsRef}
        preload="auto"
        src={soundSrc(WORKSPACE_SOUNDS.plantDrops)}
      />
      <audio
        ref={natureRef}
        preload="auto"
        src={soundSrc(WORKSPACE_SOUNDS.nature)}
        loop
      />

      <svg
        className="workspace-scene__svg"
        viewBox={WORKSPACE_VIEWBOX}
        preserveAspectRatio={WORKSPACE_ASPECT}
        role="img"
        aria-label={copy.sceneLabel}
      >
        <SceneDefs c={palette} />
        <g transform={`translate(0, ${WORKSPACE_SCENE_OFFSET_Y})`}>
          <RoomWindow c={palette} />
          <WorkspaceObject
            id="window"
            ariaLabel={copy.objects.windowAria}
            transform={`translate(${ROOM_WINDOW.x}, ${ROOM_WINDOW.y})`}
            hitBounds={{ x: 0, y: 0, width: ROOM_WINDOW.width, height: ROOM_WINDOW.height }}
            hideLabel
            onHoverChange={handleWindowHoverChange}
          >
            {() => null}
          </WorkspaceObject>
          <g transform={`translate(${SCENE_CONTENT_SHIFT_X}, 0)`}>
          <PhoebeDeskScene palette={palette} isLampOn={isLampOn} />

          {WORKSPACE_OBJECTS.filter((object) => object.id !== "lamp").map((object) => (
          <WorkspaceObject
            key={object.id}
            id={object.id}
            label={
              object.id === "speaker"
                ? isMusicPlaying
                  ? copy.objects.musicPause
                  : copy.objects.musicPlay
                : object.labelKey && !object.hideLabel
                  ? copy.objects[object.labelKey]
                  : undefined
            }
            tooltip={
              object.id === "mug" ? (
                <WorkspaceMugTooltip key={language} />
              ) : object.id === "clock" ? (
                <WorkspaceClockTooltip key={language} />
              ) : object.id === "plant" ? (
                <WorkspacePlantTooltip key={language} isMaxed={plantIsMaxed} />
              ) : undefined
            }
            ariaLabel={
              object.id === "speaker"
                ? isMusicPlaying
                  ? copy.objects.musicPause
                  : copy.objects.musicPlay
                : object.ariaLabelKey
                  ? object.id === "plant" && plantIsMaxed
                    ? language === "zh"
                      ? "搁板上的绿植（已长到最大，不需要再浇水）"
                      : "Trailing plant (fully grown, no more watering)"
                    : copy.objects[object.ariaLabelKey]
                  : undefined
            }
            href={object.href}
            action={object.action}
            transform={object.transform}
            labelOffset={object.labelOffset}
            tooltipOffset={object.tooltipOffset}
            tooltipAlign={object.tooltipAlign}
            hideLabel={object.hideLabel}
            hitBounds={object.hitBounds}
            isLampOn={object.action === "lamp" ? isLampOn : undefined}
            isMusicPlaying={object.action === "music" ? isMusicPlaying : undefined}
            onActivate={handleActivate}
            onHoverChange={
              object.action === "mug"
                ? handleMugHoverChange
                : object.id === "clock"
                  ? handleClockHoverChange
                  : object.action === "plant"
                    ? handlePlantHoverChange
                    : undefined
            }
          >
            {(isHovered) =>
              renderDeskObject(object.id, palette, {
                ...interactionState,
                isHovered,
              })
            }
          </WorkspaceObject>
          ))}

          <LampLightLayer isOn={isLampOn} lampLight={palette.lampLight} />

          {WORKSPACE_OBJECTS.filter((object) => object.id === "lamp").map((object) => (
          <WorkspaceObject
            key={object.id}
            id={object.id}
            label={isLampOn ? copy.objects.lampTurnOff : copy.objects.lampTurnOn}
            ariaLabel={isLampOn ? copy.objects.lampTurnOff : copy.objects.lampTurnOn}
            href={object.href}
            action={object.action}
            transform={object.transform}
            labelOffset={object.labelOffset}
            tooltipOffset={object.tooltipOffset}
            tooltipAlign={object.tooltipAlign}
            hideLabel={object.hideLabel}
            hitBounds={object.hitBounds}
            isLampOn={isLampOn}
            onActivate={handleActivate}
          >
            {(isHovered) =>
              renderDeskObject(object.id, palette, {
                ...interactionState,
                isHovered,
              })
            }
          </WorkspaceObject>
          ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
