import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useSound } from "../../hooks/useSound";
import { getThemeColors } from "../../lib/theme";
import { getDeskPalette } from "../../lib/deskPalette";
import { getPageContext } from "../../lib/pageContext";
import useDeskEnvironment from "../../hooks/useDeskEnvironment";
import {
  ABOUT_PATH,
  DESK_PATH,
  HOME_PATH,
  LIBRARY_PATH,
  TEACHING_PATH,
  isAboutPath,
  isDeskPath,
  isLibraryPath,
  isTeachingPath,
  isLegacyDeskPath,
} from "../../lib/routes";
import AboutPage from "../../pages/AboutPage";
import LandingPage from "../../pages/LandingPage";
import LibraryPage from "../../pages/LibraryPage";
import TeachingPage from "../../pages/TeachingPage";
import WorkspacePage from "../../pages/WorkspacePage";
import SharedLayout from "../layouts/SharedLayout";
import DeskLayout from "../layouts/DeskLayout";
import VersionHistoryLayout from "../layouts/VersionHistoryLayout";
import TeachingLayout from "../layouts/TeachingLayout";
import { PageTransitionContext } from "../../context/PageTransitionContext";
import { SidebarOverrideContext } from "../../context/SidebarOverrideContext";

function viewStateFromPath(pathname) {
  if (isAboutPath(pathname)) return "about";
  if (isTeachingPath(pathname)) return "teaching";
  if (isLibraryPath(pathname)) return "library";
  if (isDeskPath(pathname)) return "workspace";
  return "landing";
}

const VIEW_PATHS = {
  landing: HOME_PATH,
  library: LIBRARY_PATH,
  workspace: DESK_PATH,
  about: ABOUT_PATH,
  teaching: TEACHING_PATH,
};

const CONTEXT_PAGES = {
  landing: "home",
  library: "caseStudies",
  workspace: "desk",
  about: "versionHistory",
  teaching: "teaching",
};

export default function SiteShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMuted, isDarkMode, language, accent } = useAppSettings();
  const { playSound, playLoopingSound, pauseSound } = useSound(isMuted);
  const [viewState, setViewState] = useState(() =>
    viewStateFromPath(location.pathname),
  );
  const [isLampOn, setIsLampOn] = useState(false);
  const [metadataOverride, setMetadataOverride] = useState(null);
  const environment = useDeskEnvironment(language);

  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const typingSoundRef = useRef(null);
  const routeTransitionRef = useRef(false);

  useEffect(() => {
    if (isLegacyDeskPath(location.pathname)) {
      navigate(DESK_PATH, { replace: true });
      return;
    }

    if (routeTransitionRef.current) return;
    const nextView = viewStateFromPath(location.pathname);
    if (nextView !== viewState) setViewState(nextView);
  }, [location.pathname, navigate, viewState]);

  const transitionTo = useCallback(
    (nextView, options = {}) => {
      if (nextView === viewState || routeTransitionRef.current) return;
      if (!options.silent) playSound(clickSoundRef);

      const commit = () => {
        flushSync(() => {
          navigate(VIEW_PATHS[nextView]);
          setViewState(nextView);
        });
      };

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const root = document.documentElement;

      if (!reduceMotion && typeof document.startViewTransition === "function") {
        routeTransitionRef.current = true;
        root.classList.add("page-transitioning");
        const transition = document.startViewTransition(commit);
        transition.finished.finally(() => {
          root.classList.remove("page-transitioning");
          routeTransitionRef.current = false;
        });
        return;
      }

      commit();
    },
    [navigate, playSound, viewState],
  );

  const navigateToHome = useCallback(
    (options = {}) => transitionTo("landing", options),
    [transitionTo],
  );
  const navigateToLibrary = useCallback(
    (options = {}) => transitionTo("library", options),
    [transitionTo],
  );
  const navigateToDesk = useCallback(
    (options = {}) => transitionTo("workspace", options),
    [transitionTo],
  );
  const navigateToAbout = useCallback(
    (options = {}) => transitionTo("about", options),
    [transitionTo],
  );
  const navigateToTeaching = useCallback(
    (options = {}) => transitionTo("teaching", options),
    [transitionTo],
  );

  useEffect(() => {
    if (isMuted) {
      pauseSound(typingSoundRef);
      pauseSound(clickSoundRef);
    }
  }, [isMuted, pauseSound]);

  const transitionContext = {
    goToWorkspace: navigateToDesk,
    goToLanding: navigateToHome,
    navigateToHome,
    navigateToDesk,
    navigateToAbout,
    navigateToTeaching,
    navigateToLibrary,
    playSound,
    playLoopingSound,
    pauseSound,
    clickSoundRef,
    typingSoundRef,
    viewState,
    isWorkspaceActive: viewState === "workspace",
  };

  const themeColors = getThemeColors(isDarkMode, accent);
  const sceneIsDark = isDarkMode;
  const deskPalette = useMemo(() => getDeskPalette(sceneIsDark), [sceneIsDark]);
  const workspaceStyle = useMemo(
    () => ({
      "--scene-background": sceneIsDark ? themeColors.pageBg : deskPalette.bg,
    }),
    [deskPalette.bg, themeColors.pageBg, sceneIsDark],
  );

  const contextPage = CONTEXT_PAGES[viewState];
  const isLanding = viewState === "landing";
  const isLibrary = viewState === "library";
  const isWorkspace = viewState === "workspace";
  const isAbout = viewState === "about";
  const isTeaching = viewState === "teaching";

  useEffect(() => {
    document.body.dataset.page = contextPage;
    return () => {
      delete document.body.dataset.page;
    };
  }, [contextPage]);

  const layoutContext = useMemo(() => {
    const base = getPageContext(language, contextPage);
    if (
      (contextPage === "home" || contextPage === "caseStudies") &&
      metadataOverride?.items?.length
    ) {
      // Section merge: the page's context section (Section B) always
      // stays as authored, while the personal section (Section C) keeps
      // the page's own fields first and gains the override's personal
      // fields (a hovered project's role / timeline).
      const baseMetadata = base.metadata ?? [];
      const overrideItems = metadataOverride.items;
      const contextItems = overrideItems.filter(
        (item) => item.section !== "personal",
      );
      const personalItems = [
        ...baseMetadata.filter((item) => item.section === "personal"),
        ...overrideItems.filter((item) => item.section === "personal"),
      ];
      // On Case Studies the default context is a directory; on Home there
      // is none, so fall back to the page's context items when the
      // override carries only personal fields.
      const hasContextOverride = contextItems.length > 0;
      return {
        ...base,
        metadata: [
          ...(hasContextOverride
            ? contextItems
            : baseMetadata.filter((item) => item.section !== "personal")),
          ...personalItems,
        ],
      };
    }
    if (contextPage !== "desk") return base;

    return {
      ...base,
      metadata: base.metadata.map((item) => {
        if (item.key === "weather") {
          return { ...item, value: environment.weather.label };
        }
        if (item.key === "currentStatus") {
          return {
            ...item,
            value: isLampOn
              ? language === "zh" ? "台灯开启" : "Lamp on"
              : language === "zh" ? "台灯关闭" : "Lamp off",
          };
        }
        return item;
      }),
    };
  }, [contextPage, environment.weather.label, isLampOn, language, metadataOverride]);

  useEffect(() => {
    if (contextPage !== "caseStudies" && contextPage !== "home") setMetadataOverride(null);
  }, [contextPage]);

  // Route-level Sidebar chrome stays mounted. ContextColumn independently
  // distinguishes the Case Studies directory mode from its project mode.
  const metadataSwapKey = contextPage;
  const metadataDirection = "static";
  const sidebarOverrideValue = useMemo(
    () => ({ metadataOverride, setMetadataOverride }),
    [metadataOverride],
  );

  return (
    <PageTransitionContext.Provider value={transitionContext}>
      <SidebarOverrideContext.Provider value={sidebarOverrideValue}>
        <div
          className="site-shell site-shell--scene-lock"
          style={{ background: themeColors.pageBg }}
        >
          <audio ref={hoverSoundRef} preload="auto" src="/hover-pop.mp3" />
          <audio ref={clickSoundRef} preload="auto" src="/folder-click.mp3" />
          <audio ref={typingSoundRef} preload="auto" src="/typing-loop.mp3" loop />

          <SharedLayout
            context={layoutContext}
            page={contextPage}
            metadataDirection={metadataDirection}
            metadataSwapKey={metadataSwapKey}
          >
            <div className="app-content-stack">
              <div
                className={`app-content-layer app-content-layer--route app-content-layer--home${
                  isLanding ? " is-active" : ""
                }`}
                aria-hidden={!isLanding}
              >
                <LandingPage />
              </div>

              <div
                className={`app-content-layer app-content-layer--route app-content-layer--desk${
                  isWorkspace ? " is-active" : ""
                }`}
                aria-hidden={!isWorkspace}
              >
                <DeskLayout style={workspaceStyle} isActive={isWorkspace}>
                  <WorkspacePage
                    environment={environment}
                    isLampOn={isLampOn}
                    onLampToggle={() => setIsLampOn((value) => !value)}
                    isNight={sceneIsDark}
                    isActive={isWorkspace}
                  />
                </DeskLayout>
              </div>

              <div
                className={`app-content-layer app-content-layer--route app-content-layer--history about-page${
                  isDarkMode ? " about-page--dark" : ""
                }${isAbout ? " is-active" : ""}`}
                aria-hidden={!isAbout}
              >
                <VersionHistoryLayout>
                  <AboutPage />
                </VersionHistoryLayout>
              </div>

              <div
                className={`app-content-layer app-content-layer--route app-content-layer--teaching${
                  isTeaching ? " is-active" : ""
                }`}
                aria-hidden={!isTeaching}
              >
                <TeachingLayout>
                  <TeachingPage />
                </TeachingLayout>
              </div>

              <div
                className={`app-content-layer app-content-layer--route app-content-layer--library${
                  isLibrary ? " is-active" : ""
                }`}
                aria-hidden={!isLibrary}
              >
                <LibraryPage />
              </div>
            </div>
          </SharedLayout>
        </div>
      </SidebarOverrideContext.Provider>
    </PageTransitionContext.Provider>
  );
}
