import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useMusic } from "../../context/MusicContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import { getDeskPalette } from "../../lib/deskPalette";
import { CAMERA_FLASH_MS, MUG_STIR_AUDIO_MS, MUG_STIR_MS, PLANT_WATERING_MS } from "../../lib/workspaceInteractions";
import { WORKSPACE_SOUNDS, NATURE_SOUND_VOLUME, soundSrc } from "../../lib/sounds";
import { useCompactScene } from "../../hooks/useCompactScene";
import Scene from "../shared/Scene";
import DeskScene, { SceneBackground } from "./scene/DeskScene";
import DeskArchiveDetail from "./DeskArchiveDetail";

/**
 * InteractiveWorkspace — the desk scene controller.
 *
 * Owns all interaction state (audio, hover, toggles, growth) and composes
 * the layered DeskScene. It renders no illustration itself: visible shapes
 * live in the object components, hit areas in the Interaction layer, and
 * light in the Effect layer.
 */
export default function InteractiveWorkspace({
  copy,
  isNight,
  isLampOn,
  onLampToggle,
  environment,
  isActive,
}) {
  const { isMuted, language } = useAppSettings();
  const { isMusicPlaying, toggleMusicFromUser } = useMusic();
  const { playSound, playLoopingSound, pauseSound, clickSoundRef } =
    usePageTransition();
  const navigate = useNavigate();
  const palette = useMemo(() => getDeskPalette(isNight), [isNight]);
  const compactScene = useCompactScene();
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

  const [hoveredId, setHoveredId] = useState(null);
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
  const [archivePanel, setArchivePanel] = useState(null);

  const PLANT_MAX_STAGE = 4;
  const plantIsMaxed = plantGrowthStage >= PLANT_MAX_STAGE;
  const PLANT_SWAY_MS = 3800;
  const PLANT_GROW_MS = 520;
  const PLANT_GROW_EASE_OUT = (t) => 1 - Math.pow(1 - t, 3);

  // Plant watering / growth is session-only — do not persist across refreshes.
  useEffect(() => {
    try {
      window.localStorage.removeItem("workspacePlantGrowthStage");
    } catch {
      // Ignore storage errors.
    }
  }, []);

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

  // Desk stays mounted between routes so its scene state is preserved. Clear
  // transient hover UI and audio as soon as the workspace stops being the
  // active page; portal-based tooltips otherwise outlive the hidden layer.
  useEffect(() => {
    if (isActive) return;
    setHoveredId(null);
    stopMatchaStir();
    stopClockTick();
    stopPlantDrops();
    stopNatureSound();
  }, [isActive, stopMatchaStir, stopClockTick, stopPlantDrops, stopNatureSound]);

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

  /** Single hover entry point — the Interaction layer reports here. */
  const handleHoverChange = useCallback(
    (id, hovered) => {
      setHoveredId((prev) => (hovered ? id : prev === id ? null : prev));
      if (id === "mug") handleMugHoverChange(hovered);
      else if (id === "clock") handleClockHoverChange(hovered);
      else if (id === "plant") handlePlantHoverChange(hovered);
      else if (id === "window") handleWindowHoverChange(hovered);
    },
    [handleMugHoverChange, handleClockHoverChange, handlePlantHoverChange, handleWindowHoverChange]
  );

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
      toggleMusicFromUser();
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

    if (action === "archive") {
      playSound(clickSoundRef);
      setArchivePanel(id);
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
    hoveredId: isActive ? hoveredId : null,
    onHoverChange: handleHoverChange,
    onActivate: handleActivate,
  };

  const chromeProps = {
    copy,
    language,
    isLampOn,
    isMusicPlaying,
    plantIsMaxed,
  };

  return (
    <>
    <Scene
      className={`desk-scene desk-scene--${environment.dayPhase} desk-scene--weather-${environment.weather.kind}${
        isLampOn ? " desk-scene--lamp-on" : ""
      }${isMusicPlaying ? " desk-scene--music-on" : ""}`}
      label={copy.sceneLabel}
      background={<SceneBackground />}
      contentClassName="desk-scene__viewport"
      style={{ "--desk-caption": palette.caption, "--desk-tooltip-text": palette.inkSoft }}
    >
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

      <DeskScene
        c={palette}
        environment={environment}
        isLampOn={isLampOn}
        isNight={isNight}
        interaction={interactionState}
        chromeProps={chromeProps}
        sceneLabel={copy.sceneLabel}
      />
    </Scene>
    <DeskArchiveDetail panel={archivePanel} onClose={() => setArchivePanel(null)} />
    </>
  );
}
