import { useMemo } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { getThemeColors } from "../../lib/theme";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif";

export default function AppLayout({ children, className = "", style = {} }) {
  const { isDarkMode } = useAppSettings();
  const themeColors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);
  const usesPaperSurface = /\blanding-page\b/.test(className);
  const isScenePage = /\b(landing-page|workspace-page)\b/.test(className);

  return (
    <div
      className={`app-layout ${className}`.trim()}
      style={{
        ...(isScenePage
          ? {
              height: "100dvh",
              maxHeight: "100dvh",
              minHeight: 0,
              overflow: "hidden",
              boxSizing: "border-box",
            }
          : { minHeight: "100vh" }),
        ...(usesPaperSurface ? {} : { background: themeColors.pageBg }),
        color: themeColors.text,
        fontFamily: FONT_STACK,
        transition: "background 0.35s ease, color 0.35s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
