import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import { getNavCopy } from "../../lib/copy";
import { getThemeColors } from "../../lib/theme";
import { NAV_ITEMS, viewIdFromPath } from "../../lib/routes";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif";

const INDICATOR_DURATION_MS = 480;
// Soft but responsive — avoid long ease-in that looks like a delayed snap.
const EASE_SHRINK = "cubic-bezier(0.2, 0, 0, 1)";
const EASE_MOVE = "cubic-bezier(0.4, 0, 0.2, 1)";
const EASE_EXPAND = "cubic-bezier(0.2, 0, 0, 1)";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Box of `el` relative to `nav`'s border box (matches absolute + translate positioning). */
function readBoxRelativeToNav(el, nav) {
  if (!el || !nav) return null;
  const elBox = el.getBoundingClientRect();
  const navBox = nav.getBoundingClientRect();
  return {
    x: elBox.left - navBox.left,
    y: elBox.top - navBox.top,
    width: elBox.width,
    height: elBox.height,
  };
}

function boxesEqual(a, b, epsilon = 0.5) {
  if (!a || !b) return false;
  return (
    Math.abs(a.x - b.x) < epsilon &&
    Math.abs(a.y - b.y) < epsilon &&
    Math.abs(a.width - b.width) < epsilon &&
    Math.abs(a.height - b.height) < epsilon
  );
}

export default function TopNavigation({ className, style }) {
  const { language, isDarkMode } = useAppSettings();
  const { pathname } = useLocation();
  const { navigateToHome, navigateToDesk, navigateToAbout, viewState } =
    usePageTransition();

  const themeColors = useMemo(
    () => getThemeColors(isDarkMode),
    [isDarkMode],
  );
  const copy = useMemo(() => getNavCopy(language), [language]);

  const activeId = useMemo(() => {
    if (viewState === "opening" || viewState === "workspace") return "desk";
    if (viewState === "closing" || viewState === "landing") return "home";
    if (viewState === "about") return "about";
    return viewIdFromPath(pathname);
  }, [viewState, pathname]);

  const handlers = {
    home: navigateToHome,
    desk: navigateToDesk,
    about: navigateToAbout,
  };

  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const tabRefs = useRef({});
  const boxRef = useRef(null);
  const prevActiveIdRef = useRef(null);
  const activeIdRef = useRef(activeId);
  const animTokenRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const [indicatorReady, setIndicatorReady] = useState(false);

  activeIdRef.current = activeId;

  const commitBox = useCallback((box) => {
    const el = indicatorRef.current;
    if (!el || !box) return;
    boxRef.current = box;
    el.style.width = `${box.width}px`;
    el.style.height = `${box.height}px`;
    el.style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`;
  }, []);

  const cancelAnimations = useCallback(() => {
    const el = indicatorRef.current;
    if (!el) return;
    el.getAnimations().forEach((animation) => animation.cancel());
  }, []);

  const morphIndicator = useCallback(
    async (from, to) => {
      const el = indicatorRef.current;
      const nav = navRef.current;
      if (!el || !nav || !from || !to) {
        commitBox(to ?? from);
        return;
      }
      if (boxesEqual(from, to)) {
        commitBox(to);
        return;
      }

      if (prefersReducedMotion()) {
        animTokenRef.current += 1;
        cancelAnimations();
        isAnimatingRef.current = false;
        commitBox(to);
        return;
      }

      const token = ++animTokenRef.current;
      isAnimatingRef.current = true;
      cancelAnimations();

      // Continue from wherever the pill currently sits if a morph was interrupted.
      const live = readBoxRelativeToNav(el, nav);
      if (live && live.width > 1 && live.height > 1) {
        from = live;
      }

      const circle = Math.min(from.height, to.height);
      const fromX = from.x + (from.width - circle) / 2;
      const fromY = from.y + (from.height - circle) / 2;
      const toX = to.x + (to.width - circle) / 2;
      const toY = to.y + (to.height - circle) / 2;

      // Keep underlying styles at the start; WAAPI drives the visible motion.
      commitBox(from);

      try {
        const animation = el.animate(
          [
            {
              offset: 0,
              transform: `translate3d(${from.x}px, ${from.y}px, 0)`,
              width: `${from.width}px`,
              height: `${from.height}px`,
              easing: EASE_SHRINK,
            },
            {
              offset: 0.28,
              transform: `translate3d(${fromX}px, ${fromY}px, 0)`,
              width: `${circle}px`,
              height: `${circle}px`,
              easing: EASE_MOVE,
            },
            {
              offset: 0.72,
              transform: `translate3d(${toX}px, ${toY}px, 0)`,
              width: `${circle}px`,
              height: `${circle}px`,
              easing: EASE_EXPAND,
            },
            {
              offset: 1,
              transform: `translate3d(${to.x}px, ${to.y}px, 0)`,
              width: `${to.width}px`,
              height: `${to.height}px`,
            },
          ],
          {
            duration: INDICATOR_DURATION_MS,
            easing: "linear",
            fill: "forwards",
          },
        );

        await animation.finished;
        if (token !== animTokenRef.current) return;

        cancelAnimations();
        commitBox(to);
        isAnimatingRef.current = false;
      } catch {
        if (token === animTokenRef.current) {
          commitBox(to);
          isAnimatingRef.current = false;
        }
      }
    },
    [cancelAnimations, commitBox],
  );

  // Morph only when the active tab id actually changes.
  useLayoutEffect(() => {
    const nav = navRef.current;
    const tab = tabRefs.current[activeId];
    const next = readBoxRelativeToNav(tab, nav);
    if (!next) return;

    const prevId = prevActiveIdRef.current;

    // Same tab: keep current geometry unless we still need the initial snap.
    if (prevId === activeId) {
      if (!indicatorReady) {
        commitBox(next);
        setIndicatorReady(true);
      }
      return;
    }

    const prevBox = boxRef.current;
    prevActiveIdRef.current = activeId;

    if (indicatorReady && prevId != null && prevBox != null) {
      morphIndicator(prevBox, next);
      return;
    }

    animTokenRef.current += 1;
    cancelAnimations();
    isAnimatingRef.current = false;
    commitBox(next);
    setIndicatorReady(true);
  }, [
    activeId,
    copy,
    isDarkMode,
    indicatorReady,
    morphIndicator,
    commitBox,
    cancelAnimations,
  ]);

  // Resize / label-width sync — do not recreate observer on activeId (avoids cancel races).
  useEffect(() => {
    const snapToActive = () => {
      if (isAnimatingRef.current) return;
      const nav = navRef.current;
      const tab = tabRefs.current[activeIdRef.current];
      const next = readBoxRelativeToNav(tab, nav);
      if (!next) return;
      if (boxesEqual(boxRef.current, next)) return;
      commitBox(next);
    };

    window.addEventListener("resize", snapToActive);

    const nav = navRef.current;
    let observer;
    if (typeof ResizeObserver !== "undefined" && nav) {
      observer = new ResizeObserver(snapToActive);
      observer.observe(nav);
      Object.values(tabRefs.current).forEach((tab) => {
        if (tab) observer.observe(tab);
      });
    }

    return () => {
      window.removeEventListener("resize", snapToActive);
      observer?.disconnect();
    };
  }, [language, copy, commitBox]);

  return (
    <nav
      ref={navRef}
      className={`top-navigation ${className ?? ""}`.trim()}
      aria-label={copy.ariaLabel}
      style={{
        "--nav-bar-bg": themeColors.navBarBg,
        "--nav-bar-border": themeColors.navBarBorder,
        "--nav-inactive-text": themeColors.navInactiveText,
        "--nav-active-text": themeColors.navActiveText,
        "--nav-hover-bg": themeColors.navHoverBg,
        "--nav-active-bg": themeColors.navActiveBg,
        "--nav-active-hover-bg": themeColors.navActiveHoverBg,
        boxSizing: "border-box",
        padding: "6px",
        borderRadius: "999px",
        background: "var(--nav-bar-bg)",
        border: "var(--nav-bar-border)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.35)"
          : "0 10px 30px rgba(0,0,0,0.12)",
        fontFamily: FONT_STACK,
        ...style,
      }}
    >
      <span
        ref={indicatorRef}
        className={`top-navigation__indicator${
          indicatorReady ? " top-navigation__indicator--ready" : ""
        }`}
        aria-hidden="true"
      />

      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        const label = copy[item.id];
        return (
          <button
            key={item.id}
            type="button"
            ref={(node) => {
              tabRefs.current[item.id] = node;
            }}
            className="top-navigation__tab"
            aria-current={isActive ? "page" : undefined}
            onClick={() => handlers[item.id]?.({ silent: true })}
          >
            <span className="top-navigation__tab-label" data-label={label}>
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
