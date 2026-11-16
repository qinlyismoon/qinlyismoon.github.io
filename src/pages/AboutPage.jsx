import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getAboutPageCopy } from "../lib/aboutContent";
import { getHomeBentoCopy } from "../lib/homeBento";
import { PORTFOLIO_LINKS } from "../lib/links";
import AboutBento from "../components/about/AboutBento";
import DeskCloseButton from "../components/workspace/DeskCloseButton";
import "../about.css";

export default function AboutPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getAboutPageCopy(language), [language]);
  const bento = useMemo(() => getHomeBentoCopy(language), [language]);
  const experience = bento.experience ?? [];
  const linkedInLabel = language === "zh" ? "LinkedIn" : "LinkedIn";
  const closeLabel = language === "zh" ? "返回首页" : "Back to home";

  return (
    <div className="about-page__shell about-page__shell--bento">
      <DeskCloseButton label={closeLabel} />
      <h1 className="visually-hidden">{copy.pageTitle}</h1>
      <AboutBento
        copy={copy.hero}
        language={language}
        experience={{
          title: bento.experienceTitle,
          items: experience,
          linkedIn: PORTFOLIO_LINKS.linkedin,
          linkedInLabel,
        }}
      />
    </div>
  );
}
