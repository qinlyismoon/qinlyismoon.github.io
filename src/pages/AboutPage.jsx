import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getAboutPageCopy } from "../lib/aboutContent";
import AppLayout from "../components/shared/AppLayout";
import AboutHeroCollage from "../components/about/AboutHeroCollage";
import JourneyTimeline from "../components/about/JourneyTimeline";
import AboutClosing from "../components/about/AboutClosing";

export default function AboutPage() {
  const { language, isDarkMode } = useAppSettings();
  const copy = useMemo(() => getAboutPageCopy(language), [language]);

  return (
    <AppLayout
      className={`about-page${isDarkMode ? " about-page--dark" : ""}`}
      style={{
        // Match SiteShell so route edges don't flash a different page bg.
        background: isDarkMode
          ? "linear-gradient(180deg, #2A2620 0%, #241F1A 45%, #1C1916 100%)"
          : "linear-gradient(180deg, #faf8f4 0%, #f7f4ef 42%, #f3f0ea 100%)",
        color: isDarkMode ? "#E6DFD4" : "#1d1b18",
      }}
    >
      <div className="about-page__shell">
        <AboutHeroCollage copy={copy.hero} language={language} />
        <JourneyTimeline copy={copy.journey} language={language} />
        <AboutClosing copy={copy.closing} />
      </div>
    </AppLayout>
  );
}
