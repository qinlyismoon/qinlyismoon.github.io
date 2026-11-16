import DesignPrinciplesLoop from "./DesignPrinciplesLoop";

/**
 * About (v2.2.1) — who I am, not a case-study list. Opens with the
 * quote + roadmap (Home already introduces me), then one headed section
 * per trait. Portrait lives on Home; this page stays text + diagram.
 */
export default function AboutNarrative({ copy }) {
  const essay = copy.essay;
  return (
    <article className="log-narrative log-essay" aria-label="About Phoebe">
      {(essay.intro ?? []).map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      {essay.quote ? (
        <figure className="log-essay__quote">
          <blockquote>
            <p lang="la" className="log-essay__quote-original">
              {essay.quote.original}
            </p>
            <p className="log-essay__quote-translation">
              {essay.quote.translation}
            </p>
          </blockquote>
          {essay.quote.attribution ? (
            <figcaption>{essay.quote.attribution}</figcaption>
          ) : null}
        </figure>
      ) : null}

      {essay.roadmap ? <p>{essay.roadmap}</p> : null}

      {essay.sections.map((section) => (
        <section
          key={section.id}
          className="log-essay__section"
          aria-labelledby={`about-${section.id}`}
        >
          <h2 id={`about-${section.id}`} className="log-essay__heading">
            {section.title}
          </h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.diagram ? (
            <figure
              className="log-essay__diagram"
              aria-label={copy.processSteps.join(" → ")}
            >
              <DesignPrinciplesLoop principles={copy.processSteps} />
            </figure>
          ) : null}
        </section>
      ))}

      {essay.closing ? (
        <p className="log-essay__closing">{essay.closing}</p>
      ) : null}
    </article>
  );
}
