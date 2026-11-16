import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getAboutPageCopy } from "../lib/aboutContent";
import { getHomeBentoCopy } from "../lib/homeBento";
import { PORTFOLIO_LINKS } from "../lib/links";
import AboutNarrative from "../components/about/AboutNarrative";
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
    <div className="about-page__shell">
      <DeskCloseButton label={closeLabel} />
      <h1 className="visually-hidden">{copy.pageTitle}</h1>
      <AboutNarrative copy={copy.hero} language={language} />

      {experience.length ? (
        <section className="about-experience" aria-labelledby="about-experience-title">
          <h2 id="about-experience-title" className="about-experience__title">
            {bento.experienceTitle}
          </h2>
          <ol className="about-experience__list">
            {experience.map((item) => (
              <li key={`${item.period}-${item.role}`} className="about-experience__item">
                <span className="about-experience__icon" aria-hidden="true">
                  {item.icon ? (
                    <img src={item.icon} alt="" />
                  ) : (
                    <span className="about-experience__initial">
                      {item.initial || item.org?.[0] || "·"}
                    </span>
                  )}
                </span>
                <div className="about-experience__copy">
                  {item.href ? (
                    <a
                      className="about-experience__org site-text-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.org}
                      <span className="external-arrow" aria-hidden="true">
                        {" "}
                        ↗︎
                      </span>
                    </a>
                  ) : (
                    <p className="about-experience__org">{item.org}</p>
                  )}
                  <p className="about-experience__role">{item.role}</p>
                </div>
                <p className="about-experience__period">{item.period}</p>
              </li>
            ))}
          </ol>
          <a
            className="about-experience__linkedin site-text-link"
            href={PORTFOLIO_LINKS.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            {linkedInLabel}{" "}
            <span className="external-arrow" aria-hidden="true">
              ↗︎
            </span>
          </a>
        </section>
      ) : null}
    </div>
  );
}
