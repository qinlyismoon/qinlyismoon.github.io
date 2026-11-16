import { useEffect, useMemo, useRef } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { getThemeColors } from "../../lib/theme";
import SiteDock from "../shared/SiteDock";

/**
 * V3 shell — no top nav, no left column, no ambient flash.
 * Shared page inset so Home / Projects / Teaching breathe the same.
 */
export default function SharedLayout({ children, page }) {
  const { isDarkMode, accent } = useAppSettings();
  const themeColors = useMemo(
    () => getThemeColors(isDarkMode, accent),
    [isDarkMode, accent],
  );
  const isDesk = page === "desk";
  const contentRef = useRef(null);

  useEffect(() => {
    if (isDesk) return;
    const scroller = contentRef.current;
    if (scroller) scroller.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [page, isDesk]);

  return (
    <div
      className={`shared-layout shared-layout--v3${
        isDesk ? " shared-layout--desk" : ""
      }`}
      style={{
        background: themeColors.pageBg,
        color: themeColors.text,
      }}
    >
      <main
        ref={contentRef}
        className={`shared-layout__content shared-layout__content--v3${
          isDesk ? " shared-layout__content--desk" : ""
        }`}
      >
        {children}
      </main>
      <SiteDock />
    </div>
  );
}
