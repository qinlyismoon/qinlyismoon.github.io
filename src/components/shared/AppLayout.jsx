import { useMemo } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { getThemeColors } from "../../lib/theme";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif";

export default function AppLayout({ children, className = "", style = {} }) {
  const { isDarkMode } = useAppSettings();
  const themeColors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

  return (
    <div
      className={`app-layout ${className}`.trim()}
      style={{
        minHeight: "100vh",
        background: themeColors.pageBg,
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
