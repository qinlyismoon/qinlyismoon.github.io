import AboutChineseName from "../about/AboutChineseName";

export default function HomeIntro({
  copy,
  onOpenLibrary,
  onOpenDesk,
  onOpenTimeline,
}) {
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
          <p className="home-identity__role">{copy.role}</p>
          <p className="home-identity__statement">{copy.statement}</p>
        </header>

      </section>

      <section className="explore-index" aria-labelledby="explore-heading">
          <h2 id="explore-heading" className="index-section__heading">
            {copy.exploreTitle}
          </h2>
          <div className="explore-index__list">
            <button
              className="explore-item explore-item--primary"
              type="button"
              onClick={onOpenLibrary}
            >
              <span className="explore-item__title">{copy.caseStudies} →</span>
              <span className="explore-item__description">{copy.caseStudiesDescription}</span>
            </button>
            <button
              className="explore-item"
              type="button"
              onClick={onOpenDesk}
            >
              <span className="explore-item__title">{copy.desk} →</span>
              <span className="explore-item__description">{copy.deskDescription}</span>
            </button>
            <button
              className="explore-item"
              type="button"
              onClick={onOpenTimeline}
            >
              <span className="explore-item__title">{copy.versionHistory} →</span>
              <span className="explore-item__description">{copy.versionHistoryDescription}</span>
            </button>
          </div>
      </section>

      <p className="home-copyright">© 2026 Phoebe Qin</p>
    </main>
  );
}
