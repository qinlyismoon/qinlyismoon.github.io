import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import { getNavCopy } from "../../lib/copy";
import { NAV_ITEMS, viewIdFromPath } from "../../lib/routes";

/**
 * Editorial tabs — one text tab per section on a hairline baseline.
 * Inactive tabs are bare text; the active tab carries a 2px accent
 * underline (see site-chrome.css). No capsule, no sliding pill.
 * Each tab keeps a fixed slot across languages: a hidden ghost twin of
 * the other language's label reserves the widest width, so EN/ZH
 * toggling never shifts the tabs.
 */
export default function TopNavigation({ className, style }) {
  const { language } = useAppSettings();
  const { pathname } = useLocation();
  const {
    navigateToHome,
    navigateToDesk,
    navigateToAbout,
    navigateToLibrary,
    viewState,
  } = usePageTransition();

  const copy = useMemo(() => getNavCopy(language), [language]);
  // Width anchors for language-toggle stability — each tab sizes to the
  // widest of its EN/ZH labels (see the ghost twins below).
  const copyEn = useMemo(() => getNavCopy("en"), []);
  const copyZh = useMemo(() => getNavCopy("zh"), []);

  const activeId = useMemo(() => {
    if (viewState === "opening" || viewState === "workspace") return "desk";
    if (viewState === "closing" || viewState === "landing") return "home";
    if (viewState === "about") return "about";
    if (viewState === "library") return "caseStudies";
    return viewIdFromPath(pathname);
  }, [viewState, pathname]);

  const handlers = {
    home: navigateToHome,
    caseStudies: navigateToLibrary,
    desk: navigateToDesk,
    about: navigateToAbout,
  };

  return (
    <nav
      className={`site-nav ${className ?? ""}`.trim()}
      aria-label={copy.ariaLabel}
      style={style}
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        // The ghost twin is the other language's label, stacked invisibly
        // in the same grid cell — the tab reserves the widest width.
        const ghostCopy = language === "en" ? copyZh : copyEn;
        return (
          <button
            key={item.id}
            type="button"
            className="site-nav__item"
            aria-current={isActive ? "page" : undefined}
            onClick={() => handlers[item.id]?.({ silent: true })}
          >
            <span className="site-nav__label">{copy[item.id]}</span>
            <span className="site-nav__label--ghost" aria-hidden="true">
              {ghostCopy[item.id]}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
