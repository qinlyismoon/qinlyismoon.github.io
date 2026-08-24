import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getHomeCopy } from "../lib/copy";
import { getThemeColors } from "../lib/theme";
import AppLayout from "../components/shared/AppLayout";
import HomeIntro from "../components/landing/HomeIntro";
import PortfolioNav from "../components/landing/PortfolioNav";

export default function LandingPage() {
  const { language, isDarkMode } = useAppSettings();

  const copy = useMemo(() => getHomeCopy(language), [language]);
  const themeColors = useMemo(() => {
    const base = getThemeColors(isDarkMode);
    if (isDarkMode) return base;
    return {
      ...base,
      text: "#11110F",
      mutedText: "#686660",
    };
  }, [isDarkMode]);

  return (
    <AppLayout className={`landing-page landing-page--${language}`}>
      <div className="landing-page__inner">
        <div className="landing-page__hero">
          <div className="landing-page__title-block">
            <HomeIntro copy={copy} />
          </div>

          <div className="landing-page__nav-block">
            <PortfolioNav
              copy={copy}
              themeColors={themeColors}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
