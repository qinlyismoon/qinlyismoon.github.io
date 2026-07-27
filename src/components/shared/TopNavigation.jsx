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

/** Whole-pixel geometry — fractional values create 1px seams in Chrome/Safari. */
function snapBox(box) {
  if (!box) return null;
  const x = Math.round(box.x);
  const y = Math.round(box.y);
  const right = Math.round(box.x + box.width);
  const bottom = Math.round(box.y + box.height);
  return {
    x,
    y,
    width: Math.max(right - x, 1),
    height: Math.max(bottom - y, 1),
  };
}

/** Expand 1px so the pill overlaps the track and covers sub-pixel gaps. */
const INDICATOR_OVERLAP = 2;

function layoutIndicatorBox(box) {
  const snapped = snapBox(box);
  if (!snapped) return null;
  return {
    x: snapped.x - INDICATOR_OVERLAP,
    y: snapped.y - INDICATOR_OVERLAP,
    width: snapped.width + INDICATOR_OVERLAP * 2,
    height: snapped.height + INDICATOR_OVERLAP * 2,
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

function borderColorFromTheme(borderValue) {
  if (!borderValue) return "transparent";
  const match = String(borderValue).match(/rgba?\([^)]+\)|#[0-9a-fA-F]{3,8}/);
  return match ? match[0] : "transparent";
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

  const applyLaidOutBox = useCallback((box) => {
    const el = indicatorRef.current;
    if (!el || !box) return;
    boxRef.current = box;
    el.style.width = `${box.width}px`;
    el.style.height = `${box.height}px`;
    el.style.transform = `translate3d(${box.x}px, ${box.y}px, 0)`;
  }, []);

  const commitBox = useCallback(
    (rawBox) => {
      applyLaidOutBox(layoutIndicatorBox(rawBox));
    },
    [applyLaidOutBox],
  );

  const cancelAnimations = useCallback(() => {
    const el = indicatorRef.current;
    if (!el) return;
    el.getAnimations().forEach((animation) => animation.cancel());
  }, []);

  const morphIndicator = useCallback(
    async (fromLaidOut, toRaw) => {
      const el = indicatorRef.current;
      const nav = navRef.current;
      const toBox = layoutIndicatorBox(toRaw);
      if (!el || !nav || !toBox) {
        commitBox(toRaw);
        return;
      }

      let start = fromLaidOut;
      // Live indicator is already laid out — snap only, do not expand again.
      const live = snapBox(readBoxRelativeToNav(el, nav));
      if (live && live.width > 1 && live.height > 1) {
        start = live;
      }
      if (!start) {
        commitBox(toRaw);
        return;
      }

      if (boxesEqual(start, toBox)) {
        applyLaidOutBox(toBox);
        return;
      }

      if (prefersReducedMotion()) {
        animTokenRef.current += 1;
        cancelAnimations();
        isAnimatingRef.current = false;
        applyLaidOutBox(toBox);
        return;
      }

      const token = ++animTokenRef.current;
      isAnimatingRef.current = true;
      cancelAnimations();

      const circle = Math.min(start.height, toBox.height);
      const fromX = Math.round(start.x + (start.width - circle) / 2);
      const fromY = Math.round(start.y + (start.height - circle) / 2);
      const toX = Math.round(toBox.x + (toBox.width - circle) / 2);
      const toY = Math.round(toBox.y + (toBox.height - circle) / 2);

      applyLaidOutBox(start);

      try {
        const animation = el.animate(
          [
            {
              offset: 0,
              transform: `translate3d(${start.x}px, ${start.y}px, 0)`,
              width: `${start.width}px`,
              height: `${start.height}px`,
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
              transform: `translate3d(${toBox.x}px, ${toBox.y}px, 0)`,
              width: `${toBox.width}px`,
              height: `${toBox.height}px`,
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
        applyLaidOutBox(toBox);
        isAnimatingRef.current = false;
      } catch {
        if (token === animTokenRef.current) {
          applyLaidOutBox(toBox);
          isAnimatingRef.current = false;
        }
      }
    },
    [applyLaidOutBox, cancelAnimations, commitBox],
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
      const laidOut = layoutIndicatorBox(next);
      if (boxesEqual(boxRef.current, laidOut)) return;
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

  const ringColor = borderColorFromTheme(themeColors.navBarBorder);
  const elevationShadow = isDarkMode
    ? "0 10px 30px rgba(0,0,0,0.35)"
    : "0 10px 30px rgba(0,0,0,0.12)";

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
        // Fill + blur painted on ::before for cleaner indicator edges.
        background: "transparent",
        border: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
        boxShadow: `0 0 0 1px ${ringColor}, ${elevationShadow}`,
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
