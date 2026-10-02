import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getAboutPageCopy } from "../lib/aboutContent";
import AboutHeroCollage from "../components/about/AboutHeroCollage";
import JourneyTimeline from "../components/about/JourneyTimeline";
import AboutClosing from "../components/about/AboutClosing";

export default function AboutPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getAboutPageCopy(language), [language]);

  return (
    <div className="about-page__shell">
      <AboutHeroCollage copy={copy.hero} language={language} />
      <JourneyTimeline copy={copy.journey} language={language} />
      <AboutClosing copy={copy.closing} />
    </div>
  );
}
