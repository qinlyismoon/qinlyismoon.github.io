import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useSound } from "../../hooks/useSound";
import { getHomeCopy } from "../../lib/copy";
import { getThemeColors } from "../../lib/theme";
import LandingPage from "../../pages/LandingPage";
import WorkspacePage from "../../pages/WorkspacePage";
import SettingsControlBar from "./SettingsControlBar";
import PaperPeelStage from "./PaperPeelStage";
import ViewportPortal from "./ViewportPortal";
import { PageTransitionContext } from "../../context/PageTransitionContext";
import { PHOEBES_DESK_PATH, isPhoebesDeskPath } from "../../lib/routes";

function viewStateFromPath(pathname) {
  return isPhoebesDeskPath(pathname) ? "workspace" : "landing";
}

export default function SiteShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMuted, isDarkMode, language } = useAppSettings();
  const { playSound, playLoopingSound, pauseSound } = useSound(isMuted);
  const [viewState, setViewState] = useState(() =>
    viewStateFromPath(location.pathname),
  );

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const closeSoundRef = useRef(null);
  const typingSoundRef = useRef(null);

  useEffect(() => {
    if (viewState === "opening" || viewState === "closing") return;
    if (location.pathname === "/workspace") {
      navigate(PHOEBES_DESK_PATH, { replace: true });
      return;
    }
    if (isPhoebesDeskPath(location.pathname) && viewState === "workspace") {
      transitionLockRef.current = false;
      return;
    }
    // URL can lag behind the peel transition — avoid snapping back to landing for a frame.
    if (
      transitionLockRef.current &&
      viewState === "workspace" &&
      !isPhoebesDeskPath(location.pathname)
    ) {
      return;
    }
    const pathView = viewStateFromPath(location.pathname);
    if (pathView !== viewState) {
      setViewState(pathView);
    }
  }, [location.pathname, viewState, navigate]);

  const goToWorkspace = useCallback(() => {
    if (viewState !== "landing") return;
    playSound(clickSoundRef);
    setViewState("opening");
  }, [playSound, viewState]);

  const goToLanding = useCallback(() => {
    if (viewState !== "workspace") return;
    playSound(closeSoundRef);
    navigate("/");
    setViewState("closing");
  }, [navigate, playSound, viewState]);

  const transitionLockRef = useRef(false);

  useEffect(() => {
    if (viewState === "opening" || viewState === "closing") {
      transitionLockRef.current = false;
    }
  }, [viewState]);

  const handleOpenComplete = useCallback(() => {
    if (transitionLockRef.current) return;
    transitionLockRef.current = true;
    navigate(PHOEBES_DESK_PATH);
    setViewState("workspace");
  }, [navigate]);

  const handleCloseComplete = useCallback(() => {
    if (transitionLockRef.current) return;
    transitionLockRef.current = true;
    setViewState("landing");
  }, []);

  useEffect(() => {
    if (isMuted) {
      pauseSound(typingSoundRef);
      pauseSound(clickSoundRef);
      pauseSound(closeSoundRef);
    }
  }, [isMuted, pauseSound]);

  const pageContext = {
    goToWorkspace,
    goToLanding,
    playSound,
    playLoopingSound,
    pauseSound,
    clickSoundRef,
    typingSoundRef,
    isWorkspaceActive: viewState === "workspace",
  };

  const themeColors = getThemeColors(isDarkMode);
  const homeCopy = getHomeCopy(language);

  return (
    <PageTransitionContext.Provider value={pageContext}>
      <div
        className="site-shell"
        style={{
          background: themeColors.pageBg,
          transition: "background 0.35s ease",
        }}
      >
        <audio ref={hoverSoundRef} preload="auto" src="/hover-pop.mp3" />
        <audio ref={clickSoundRef} preload="auto" src="/folder-click.mp3" />
        <audio ref={closeSoundRef} preload="auto" src="/window-close.mp3" />
        <audio ref={typingSoundRef} preload="auto" src="/typing-loop.mp3" loop />

        <ViewportPortal>
          <div className="viewport-controls">
            <SettingsControlBar className="viewport-controls__bar" />
          </div>
        </ViewportPortal>

        <PaperPeelStage
          viewState={viewState}
          onOpenComplete={handleOpenComplete}
          onCloseComplete={handleCloseComplete}
          onPeel={goToWorkspace}
          cornerAriaLabel={homeCopy.peelCornerLabel}
          isDarkMode={isDarkMode}
          landing={<LandingPage />}
          workspace={<WorkspacePage />}
        />
      </div>
    </PageTransitionContext.Provider>
  );
}
