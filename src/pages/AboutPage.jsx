import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getAboutPageCopy } from "../lib/aboutContent";
import AboutNarrative from "../components/about/AboutNarrative";

export default function AboutPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getAboutPageCopy(language), [language]);

  return (
    <div className="about-page__shell">
      <AboutNarrative copy={copy.hero} language={language} />
    </div>
  );
}
