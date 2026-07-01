import { useMemo, useRef } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageTransition } from "../context/PageTransitionContext";
import { getHomeCopy } from "../lib/copy";
import { getThemeColors } from "../lib/theme";
import AppLayout from "../components/shared/AppLayout";
import PortfolioNav from "../components/landing/PortfolioNav";
import PortfolioTitle from "../components/landing/PortfolioTitle";

export default function LandingPage() {
  const { language, isDarkMode } = useAppSettings();
  const { playLoopingSound, pauseSound, typingSoundRef } = usePageTransition();
  const typingHoverCountRef = useRef(0);

  const copy = useMemo(() => getHomeCopy(language), [language]);
  const themeColors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

  const handleTitleMouseEnter = () => {
    typingHoverCountRef.current += 1;
    if (typingHoverCountRef.current === 1) {
      playLoopingSound(typingSoundRef);
    }
  };

  const handleTitleMouseLeave = () => {
    typingHoverCountRef.current = Math.max(0, typingHoverCountRef.current - 1);
    if (typingHoverCountRef.current === 0) {
      pauseSound(typingSoundRef);
    }
  };

  return (
    <AppLayout className={`landing-page landing-page--${language}`}>
      <div className="landing-page__inner">
        <div className="landing-page__title-block">
          <PortfolioTitle
            titleTop={copy.titleTop}
            titleBottom={copy.titleBottom}
            onTitleMouseEnter={handleTitleMouseEnter}
            onTitleMouseLeave={handleTitleMouseLeave}
          />
        </div>

        <div className="landing-page__nav-block">
          <PortfolioNav
            copy={copy}
            themeColors={themeColors}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </AppLayout>
  );
}
