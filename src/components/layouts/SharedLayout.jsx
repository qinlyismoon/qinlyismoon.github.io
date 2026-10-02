import { useMemo } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { getThemeColors } from "../../lib/theme";
import ContextColumn from "../shared/ContextColumn";
import TopNavigation from "../shared/TopNavigation";
import ViewportPortal from "../shared/ViewportPortal";

export default function SharedLayout({
  children,
  context,
  page,
  metadataDirection = "none",
  metadataSwapKey,
}) {
  const { isDarkMode } = useAppSettings();
  const themeColors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);
  // Home and Desk share the same fixed application grid. Page-specific
  // content changes must never move the persistent chrome.
  const isStageView = page === "desk" || page === "home";

  return (
    <div
      className={`shared-layout${isStageView ? " shared-layout--desk" : ""}`}
      style={{
        background: themeColors.pageBg,
        color: themeColors.text,
        // Theme changes crossfade complete page snapshots, so the shell and
        // page-specific artwork cannot visibly lead or lag one another.
      }}
    >
      <ViewportPortal>
        <div className="viewport-top-nav">
          <TopNavigation className="viewport-top-nav__bar" />
        </div>
      </ViewportPortal>

      <div className="shared-layout__grid">
        <ContextColumn
          {...context}
          page={page}
          direction={metadataDirection}
          metadataSwapKey={metadataSwapKey}
        />
        <main className="shared-layout__content">{children}</main>
      </div>
    </div>
  );
}
