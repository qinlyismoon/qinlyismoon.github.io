import AboutChineseName from "../about/AboutChineseName";
import { PORTFOLIO_LINKS } from "../../lib/links";
import { useAppSettings } from "../../context/AppSettingsContext";

export default function HomeIntro({ copy }) {
  const { language } = useAppSettings();
  // Chinese uses a full stop (。); English keeps the ASCII period.
  const roleStop = language === "zh" ? "。" : ". ";

  return (
    <main className="home-index">
      <section className="home-hero" aria-labelledby="home-title">
        <header className="home-identity">
          <div className="home-identity__name-row">
            <h1 id="home-title" className="home-identity__name">{copy.name}</h1>
            <AboutChineseName
              akaLabel={copy.akaLabel}
              chineseName={copy.chineseName}
              cardAriaLabel={copy.nameCardAria}
            />
          </div>
          <p className="home-identity__introduction">
            {copy.role}
            {roleStop}
            {copy.statement} {copy.detail}
          </p>
          <p className="home-identity__links">
            <a href={PORTFOLIO_LINKS.email}>{copy.email}</a>
            <a href={PORTFOLIO_LINKS.github} target="_blank" rel="noreferrer">GitHub <span className="external-arrow" aria-hidden="true">↗︎</span></a>
            <a href={PORTFOLIO_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn <span className="external-arrow" aria-hidden="true">↗︎</span></a>
          </p>
        </header>
      </section>

    </main>
  );
}
