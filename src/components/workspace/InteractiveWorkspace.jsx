import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import { WORKSPACE_ASPECT, WORKSPACE_SCENE_OFFSET_Y, WORKSPACE_VIEWBOX } from "../../lib/animations";
import { getDeskPalette } from "../../lib/deskPalette";
import { CAMERA_FLASH_MS, MUG_STIR_AUDIO_MS, MUG_STIR_MS } from "../../lib/workspaceInteractions";
import WorkspaceMugTooltip from "./WorkspaceMugTooltip";
import WorkspaceClockTooltip from "./WorkspaceClockTooltip";
import { WORKSPACE_OBJECTS } from "../../lib/workspaceObjects";
import WorkspaceObject from "./WorkspaceObject";
import {
  LampLightLayer,
  PhoebeDeskScene,
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
  const musicRef = useRef(null);
  const matchaStirRef = useRef(null);
  const mugStirTimerRef = useRef(null);
  const matchaStirStopTimerRef = useRef(null);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [cameraFlash, setCameraFlash] = useState(false);
  const [mugStirring, setMugStirring] = useState(false);
  const [mugStirToken, setMugStirToken] = useState(0);

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

  useEffect(() => {
    if (isMuted) {
      pauseSound(musicRef);
      stopMatchaStir();
    }
  }, [isMuted, pauseSound, stopMatchaStir]);

  useEffect(() => () => {
    pauseSound(musicRef);
    pauseSound(matchaStirRef);
    window.clearTimeout(mugStirTimerRef.current);
    window.clearTimeout(matchaStirStopTimerRef.current);
  }, [pauseSound]);

  const handleMugHoverChange = useCallback(
    (hovered) => {
      if (!hovered) {
        stopMatchaStir();
      }
    },
    [stopMatchaStir]
  );

  const toggleMusic = () => {
    setIsMusicPlaying((playing) => {
      const next = !playing;
      if (next && !isMuted) {
        playLoopingSound(musicRef);
      } else {
        pauseSound(musicRef);
      }
      return next;
    });
  };

  const handleActivate = ({ id, action, href, event }) => {
    if (id === "clock") return;

    if (action === "lamp") {
      onLampToggle();
      playSound(clickSoundRef);
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

    if (id === "camera") {
      setCameraFlash(true);
      window.setTimeout(() => setCameraFlash(false), CAMERA_FLASH_MS);
    }

    if (!href) return;

    if (href.startsWith("#")) {
      event?.preventDefault();
      return;
    }

    playSound(clickSoundRef);

    if (href.startsWith("/")) {
      event?.preventDefault();
      navigate(href);
    }
  };

  const interactionState = { isLampOn, isMusicPlaying, cameraFlash, mugStirring, mugStirToken };

  return (
    <div
      className={`workspace-scene${isLampOn ? " workspace-scene--lamp-on" : ""}${
        isMusicPlaying ? " workspace-scene--music-on" : ""
      }`}
      style={{ "--desk-caption": palette.caption, "--desk-tooltip-text": palette.inkSoft }}
    >
      <audio ref={musicRef} preload="auto" src="/desk-ambient.mp3" loop />
      <audio ref={matchaStirRef} preload="auto" src="/matcha-stir.mp3" />

      <svg
        className="workspace-scene__svg"
        viewBox={WORKSPACE_VIEWBOX}
        preserveAspectRatio={WORKSPACE_ASPECT}
        role="img"
        aria-label={copy.sceneLabel}
      >
        <SceneDefs c={palette} />
        <g transform={`translate(0, ${WORKSPACE_SCENE_OFFSET_Y})`}>
          <PhoebeDeskScene palette={palette} />

          {WORKSPACE_OBJECTS.filter((object) => object.id !== "lamp").map((object) => (
          <WorkspaceObject
            key={object.id}
            id={object.id}
            label={
              object.labelKey && !object.hideLabel
                ? copy.objects[object.labelKey]
                : undefined
            }
            tooltip={
              object.id === "mug" ? (
                <WorkspaceMugTooltip key={language} />
              ) : object.id === "clock" ? (
                <WorkspaceClockTooltip key={language} />
              ) : undefined
            }
            ariaLabel={
              object.ariaLabelKey ? copy.objects[object.ariaLabelKey] : undefined
            }
            href={object.href}
            action={object.action}
            transform={object.transform}
            labelOffset={object.labelOffset}
            tooltipOffset={object.tooltipOffset}
            hideLabel={object.hideLabel}
            hitBounds={object.hitBounds}
            isLampOn={object.action === "lamp" ? isLampOn : undefined}
            isMusicPlaying={object.action === "music" ? isMusicPlaying : undefined}
            onActivate={handleActivate}
            onHoverChange={object.action === "mug" ? handleMugHoverChange : undefined}
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
      </svg>
    </div>
  );
}
