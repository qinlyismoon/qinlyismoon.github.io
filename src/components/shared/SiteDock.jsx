import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  RiHome5Line,
  RiGridLine,
  RiSettings3Line,
} from "react-icons/ri";
import { TbChalkboard } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useMusic } from "../../context/MusicContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import useSlidingIndicator, {
  DOCK_INDICATOR_MOTION,
} from "../../hooks/useSlidingIndicator";
import {
  THEME_MODES,
  TYPE_VOICES,
  getSettingsLabels,
} from "../../lib/settings";
import {
  isAboutPath,
  isHomePath,
  isLibraryPath,
  isTeachingPath,
  projectIdFromPath,
  viewIdFromPath,
} from "../../lib/routes";
import InlineChoice from "./InlineChoice";

const DOCK_COPY = {
  en: {
    ariaLabel: "Site dock",
    home: "Home",
    projects: "Projects",
    teaching: "Teaching",
    settings: "Settings",
    expand: "Expand dock",
    collapse: "Collapse dock",
  },
  zh: {
    ariaLabel: "站点导航",
    home: "首页",
    projects: "作品",
    teaching: "教学",
    settings: "设置",
    expand: "展开导航",
    collapse: "收起导航",
  },
};

const NAV_ITEMS = [
  { id: "home", Icon: RiHome5Line },
  { id: "projects", Icon: RiGridLine },
  { id: "teaching", Icon: TbChalkboard },
];

const DOCK_STORAGE_KEY = "phoebe-dock-expanded";

/**
 * Collapsible dock — the + stays pinned at the viewport center; the bar
 * opens/closes beside it without recentering the whole cluster.
 */
export default function SiteDock() {
  const { pathname } = useLocation();
  const {
    language,
    themeMode,
    typeVoice,
    isMuted,
    toggleLanguage,
    setThemeMode,
    setTypeVoice,
    setMuted,
  } = useAppSettings();
  const { isMusicPlaying, pauseMusic } = useMusic();
  const { navigateToHome, navigateToLibrary, navigateToTeaching, viewState } =
    usePageTransition();
  const labels = getSettingsLabels(language);
  const dockCopy = DOCK_COPY[language] ?? DOCK_COPY.en;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pendingId, setPendingId] = useState(null);
  const [expanded, setExpanded] = useState(() => {
    try {
      const saved = localStorage.getItem(DOCK_STORAGE_KEY);
      if (saved === "0") return false;
      if (saved === "1") return true;
    } catch {
      // ignore
    }
    return true;
  });
  const rootRef = useRef(null);
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef({});
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  const routeActiveId = useMemo(() => {
    if (viewState === "teaching" || isTeachingPath(pathname)) return "teaching";
    // Detail on /:id keeps the underlay’s dock highlight — Home stays
    // Home when the case study was opened from the homepage.
    if (viewState === "landing") return "home";
    if (viewState === "about" || isAboutPath(pathname)) return "home";
    if (viewState === "workspace") return "home";
    if (
      viewState === "library" ||
      isLibraryPath(pathname) ||
      projectIdFromPath(pathname)
    ) {
      return "projects";
    }
    if (isHomePath(pathname)) return "home";
    return viewIdFromPath(pathname) === "caseStudies" ? "projects" : "home";
  }, [pathname, viewState]);

  // Optimistic highlight: circle leaves on click, not after the page settles.
  const activeId = pendingId ?? routeActiveId;

  useEffect(() => {
    if (pendingId && routeActiveId === pendingId) setPendingId(null);
  }, [pendingId, routeActiveId]);

  useEffect(() => {
    try {
      localStorage.setItem(DOCK_STORAGE_KEY, expanded ? "1" : "0");
    } catch {
      // ignore
    }
  }, [expanded]);

  useEffect(() => {
    if (!settingsOpen) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setSettingsOpen(false);
        setPendingId(null);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        setPendingId(null);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [settingsOpen]);

  const indicatorKey = settingsOpen ? "settings" : activeId;

  useSlidingIndicator({
    containerRef: navRef,
    indicatorRef,
    getActive: () => itemRefs.current[indicatorKey] ?? null,
    activeKey: `${indicatorKey}-${expanded ? "open" : "closed"}`,
    layoutKey: language,
    motion: DOCK_INDICATOR_MOTION,
    awaitPageTurn: false,
  });

  const handlers = {
    home: () => {
      setSettingsOpen(false);
      setPendingId("home");
      navigateToHome({ silent: true });
    },
    projects: () => {
      setSettingsOpen(false);
      setPendingId("projects");
      navigateToLibrary({ silent: true });
    },
    teaching: () => {
      setSettingsOpen(false);
      setPendingId("teaching");
      navigateToTeaching({ silent: true });
    },
    settings: () => {
      if (!expanded) setExpanded(true);
      setSettingsOpen((open) => {
        const next = !open;
        setPendingId(next ? "settings" : null);
        return next;
      });
    },
  };

  const handleSound = (id) => {
    const nextMuted = id === "off";
    if (nextMuted && isMusicPlaying) pauseMusic();
    setMuted(nextMuted);
  };

  const toggleExpanded = () => {
    setSettingsOpen(false);
    setPendingId(null);
    setExpanded((value) => !value);
  };

  // Portaled to body so z-index beats the project-detail overlay
  // (also on body). Inside SharedLayout, isolation: isolate traps the dock.
  return createPortal(
    <div
      ref={rootRef}
      className="site-dock"
      data-settings-open={settingsOpen}
      data-expanded={expanded ? "true" : "false"}
    >
      <AnimatePresence>
        {settingsOpen && expanded ? (
          <motion.div
            key="dock-settings"
            id={panelId}
            className="site-dock__settings"
            role="dialog"
            aria-label={labels.settings}
            initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? undefined : { opacity: 0, y: 8, scale: 0.98 }
            }
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="site-dock__settings-row">
              <span className="site-dock__settings-label">
                {language === "zh" ? "语言" : "Language"}
              </span>
              <InlineChoice
                ariaLabel={labels.language}
                value={language}
                onChange={(id) => {
                  if (id !== language) toggleLanguage();
                }}
                options={[
                  { id: "en", label: "EN" },
                  { id: "zh", label: "中文" },
                ]}
              />
            </div>
            <div className="site-dock__settings-row">
              <span className="site-dock__settings-label">{labels.mode}</span>
              <InlineChoice
                ariaLabel={labels.mode}
                value={themeMode}
                onChange={setThemeMode}
                options={THEME_MODES.map((id) => ({
                  id,
                  label: labels.modes[id] ?? id,
                }))}
              />
            </div>
            <div className="site-dock__settings-row">
              <span className="site-dock__settings-label">{labels.type}</span>
              <InlineChoice
                ariaLabel={labels.type}
                value={typeVoice}
                onChange={setTypeVoice}
                options={TYPE_VOICES.map((id) => ({
                  id,
                  label: labels.typeVoices[id] ?? id,
                }))}
              />
            </div>
            <div className="site-dock__settings-row">
              <span className="site-dock__settings-label">{labels.sound}</span>
              <InlineChoice
                ariaLabel={labels.sound}
                value={isMuted ? "off" : "on"}
                onChange={handleSound}
                options={[
                  { id: "on", label: labels.soundOn },
                  { id: "off", label: labels.soundOff },
                ]}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="site-dock__cluster">
        <button
          type="button"
          className="site-dock__plus-btn"
          aria-label={expanded ? dockCopy.collapse : dockCopy.expand}
          aria-expanded={expanded}
          onClick={toggleExpanded}
        >
          <span
            className={`site-dock__plus${expanded ? " site-dock__plus--close" : ""}`}
            aria-hidden="true"
          />
        </button>

        <div
          className={`site-dock__bar-shell${expanded ? " is-open" : ""}`}
          aria-hidden={!expanded}
        >
          <div className="site-dock__bar-clip">
            <nav
              ref={navRef}
              className="site-dock__bar"
              aria-label={dockCopy.ariaLabel}
            >
              <span
                ref={indicatorRef}
                className="site-dock__indicator"
                aria-hidden="true"
              />
              {NAV_ITEMS.map(({ id, Icon }) => {
                const isActive = activeId === id && !settingsOpen;
                return (
                  <button
                    key={id}
                    ref={(node) => {
                      itemRefs.current[id] = node;
                    }}
                    type="button"
                    className="site-dock__item"
                    aria-label={dockCopy[id]}
                    aria-current={isActive ? "page" : undefined}
                    data-active={isActive ? "true" : undefined}
                    tabIndex={expanded ? 0 : -1}
                    onClick={() => handlers[id]?.()}
                  >
                    <Icon aria-hidden="true" className="site-dock__icon" />
                  </button>
                );
              })}

              <span className="site-dock__divider" aria-hidden="true" />

              <button
                ref={(node) => {
                  itemRefs.current.settings = node;
                }}
                type="button"
                className="site-dock__item"
                aria-label={dockCopy.settings}
                aria-expanded={settingsOpen}
                aria-controls={panelId}
                data-active={settingsOpen ? "true" : undefined}
                tabIndex={expanded ? 0 : -1}
                onClick={() => handlers.settings()}
              >
                <RiSettings3Line
                  aria-hidden="true"
                  className="site-dock__icon"
                />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
