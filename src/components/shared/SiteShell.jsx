import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useSound } from "../../hooks/useSound";
import { getHomeCopy } from "../../lib/copy";
import { getThemeColors } from "../../lib/theme";
import {
  ABOUT_PATH,
  DESK_PATH,
  HOME_PATH,
  isAboutPath,
  isDeskPath,
  isLegacyDeskPath,
} from "../../lib/routes";
import AboutPage from "../../pages/AboutPage";
import LandingPage from "../../pages/LandingPage";
import WorkspacePage from "../../pages/WorkspacePage";
import SettingsControlBar from "./SettingsControlBar";
import TopNavigation from "./TopNavigation";
import PaperPeelStage from "./PaperPeelStage";
import ViewportPortal from "./ViewportPortal";
import { PageTransitionContext } from "../../context/PageTransitionContext";

function viewStateFromPath(pathname) {
  if (isAboutPath(pathname)) return "about";
  if (isDeskPath(pathname)) return "workspace";
  return "landing";
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
  const transitionLockRef = useRef(false);
  const aboutLayerRef = useRef(null);

  // Freeze Home/Desk peel while About covers it, so returning doesn't reset.
  const peelViewStateRef = useRef(
    viewState === "about" ? "landing" : viewState,
  );
  if (viewState !== "about") {
    peelViewStateRef.current = viewState;
  }

  useEffect(() => {
    if (viewState === "opening" || viewState === "closing") return;

    if (isLegacyDeskPath(location.pathname)) {
      navigate(DESK_PATH, { replace: true });
      return;
    }

    if (isDeskPath(location.pathname) && viewState === "workspace") {
      transitionLockRef.current = false;
      return;
    }

    // URL can lag behind the peel transition — avoid snapping back to landing for a frame.
    if (
      transitionLockRef.current &&
      viewState === "workspace" &&
      !isDeskPath(location.pathname)
    ) {
      return;
    }

    const pathView = viewStateFromPath(location.pathname);
    if (pathView !== viewState) {
      setViewState(pathView);
    }
  }, [location.pathname, viewState, navigate]);

  const goToWorkspace = useCallback((options = {}) => {
    if (viewState !== "landing") return;
    if (!options.silent) playSound(clickSoundRef);
    setViewState("opening");
  }, [playSound, viewState]);

  const goToLanding = useCallback((options = {}) => {
    if (viewState !== "workspace") return;
    if (!options.silent) playSound(closeSoundRef);
    navigate(HOME_PATH);
    setViewState("closing");
  }, [navigate, playSound, viewState]);

  const navigateToHome = useCallback((options = {}) => {
    if (viewState === "landing" || viewState === "closing") return;

    if (viewState === "workspace") {
      goToLanding(options);
      return;
    }

    if (viewState === "opening") return;

    if (!options.silent) playSound(clickSoundRef);
    navigate(HOME_PATH);
    setViewState("landing");
  }, [goToLanding, navigate, playSound, viewState]);

  const navigateToDesk = useCallback((options = {}) => {
    if (
      viewState === "workspace" ||
      viewState === "opening" ||
      viewState === "closing"
    ) {
      return;
    }

    if (viewState === "landing") {
      goToWorkspace(options);
      return;
    }

    if (!options.silent) playSound(clickSoundRef);
    navigate(DESK_PATH);
    setViewState("workspace");
  }, [goToWorkspace, navigate, playSound, viewState]);

  const navigateToAbout = useCallback((options = {}) => {
    if (viewState === "about" || viewState === "opening" || viewState === "closing") {
      return;
    }

    if (!options.silent) playSound(clickSoundRef);
    navigate(ABOUT_PATH);
    setViewState("about");
  }, [navigate, playSound, viewState]);

  useEffect(() => {
    if (viewState === "opening" || viewState === "closing") {
      transitionLockRef.current = false;
    }
  }, [viewState]);

  // About scrolls inside its own fixed layer — always reset when covering the peel.
  useEffect(() => {
    if (viewState !== "about") return;
    const layer = aboutLayerRef.current;
    if (layer) layer.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [viewState]);

  const handleOpenComplete = useCallback(() => {
    if (transitionLockRef.current) return;
    transitionLockRef.current = true;
    navigate(DESK_PATH);
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
    navigateToHome,
    navigateToDesk,
    navigateToAbout,
    playSound,
    playLoopingSound,
    pauseSound,
    clickSoundRef,
    typingSoundRef,
    viewState,
    isWorkspaceActive: viewState === "workspace",
  };

  const themeColors = getThemeColors(isDarkMode);
  const homeCopy = getHomeCopy(language);
  const isAbout = viewState === "about";
  const aboutBackground = isDarkMode
    ? "linear-gradient(180deg, #2A2620 0%, #241F1A 45%, #1C1916 100%)"
    : "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 42%, #f3f0ea 100%)";

  return (
    <PageTransitionContext.Provider value={pageContext}>
      {/* Always scene-locked: About scrolls inside its overlay, same chrome as Home/Desk. */}
      <div
        className="site-shell site-shell--scene-lock"
        style={{ background: themeColors.pageBg }}
      >
        <audio ref={hoverSoundRef} preload="auto" src="/hover-pop.mp3" />
        <audio ref={clickSoundRef} preload="auto" src="/folder-click.mp3" />
        <audio ref={closeSoundRef} preload="auto" src="/window-close.mp3" />
        <audio ref={typingSoundRef} preload="auto" src="/typing-loop.mp3" loop />

        <ViewportPortal>
          <div className="viewport-top-nav">
            <TopNavigation className="viewport-top-nav__bar" />
          </div>
        </ViewportPortal>

        <ViewportPortal>
          <div className="viewport-controls">
            <SettingsControlBar className="viewport-controls__bar" />
          </div>
        </ViewportPortal>

        {/* Peel stays painted underneath About — no blank frame when covering/uncovering. */}
        <div className="site-view site-view--peel" aria-hidden={isAbout}>
          <PaperPeelStage
            viewState={peelViewStateRef.current}
            onOpenComplete={handleOpenComplete}
            onCloseComplete={handleCloseComplete}
            onPeel={goToWorkspace}
            cornerAriaLabel={homeCopy.peelCornerLabel}
            isDarkMode={isDarkMode}
            landing={<LandingPage />}
            workspace={<WorkspacePage />}
          />
        </div>

        <div
          ref={aboutLayerRef}
          className={`site-view site-view--about${isAbout ? " is-active" : ""}`}
          aria-hidden={!isAbout}
          style={{ background: aboutBackground }}
        >
          <AboutPage />
        </div>
      </div>
    </PageTransitionContext.Provider>
  );
}
