import AboutChineseName from "../about/AboutChineseName";
import { PORTFOLIO_LINKS } from "../../lib/links";

export default function HomeIntro({ copy }) {
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
            {copy.role}. {copy.statement} {copy.detail}
          </p>
          <p className="home-identity__links">
            <a href={PORTFOLIO_LINKS.email}>{copy.email}</a>
            <a href={PORTFOLIO_LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={PORTFOLIO_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </p>
        </header>
      </section>

    </main>
  );
}
