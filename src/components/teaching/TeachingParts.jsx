/**
 * Teaching page building blocks. Structure comes from type and space, not
 * rules: sections, courses and the work inside them are separated by the
 * spacing scale; the only lines are the pull-quote accent rule and the
 * hairline frame around images (the Log headshot treatment).
 */

export function SectionHeader({ section, title, note, as: Heading = "h2", id }) {
  return (
    <header className="teaching-section__header">
      <p className="teaching-section__kicker">
        <span className="teaching-section__index">{section.index}</span>
        <span aria-hidden="true" className="teaching-section__slash">/</span>
        <span>{section.label}</span>
      </p>
      <Heading id={id} className="teaching-section__title">
        {title}
      </Heading>
      {note ? <p className="teaching-section__note">{note}</p> : null}
    </header>
  );
}

export function Figure({ src, alt, caption, className = "" }) {
  return (
    <figure className={`teaching-figure ${className}`.trim()}>
      <div className="teaching-figure__frame">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption ? <figcaption className="teaching-caption">{caption}</figcaption> : null}
    </figure>
  );
}

function Meta({ items }) {
  return (
    <p className="teaching-meta">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  );
}

/** A tall lead image beside a stack of wide ones; images are never cropped. */
function Gallery({ items, caption }) {
  const [lead, ...rest] = items;
  return (
    <figure className="teaching-figure teaching-gallery">
      <div className="teaching-gallery__grid">
        <div className="teaching-figure__frame teaching-gallery__lead">
          <img src={lead.src} alt={lead.alt} loading="lazy" decoding="async" />
        </div>
        <div className="teaching-gallery__stack">
          {rest.map((item) => (
            <div className="teaching-figure__frame" key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
      {caption ? <figcaption className="teaching-caption">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * The hand-drawn voice, used sparingly (twice on the page): this thread
 * between Introduction and Philosophy, and the arrows of the session arc.
 * The thread reuses the Home editorial thread's stroke, curve and slow
 * breathing (`.editorial-thread__line`), so both pages share one hand.
 */
export function TeachingThread({ note }) {
  return (
    <div className="teaching-thread" aria-hidden="true">
      <svg
        className="editorial-thread__line"
        viewBox="0 0 1000 64"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path d="M 0 37 C 210 36, 355 40, 520 38 C 690 36, 835 33, 1000 36" />
      </svg>
      {note ? <span className="teaching-thread__note">{note}</span> : null}
    </div>
  );
}

/** A small hand-drawn arrow between two arc steps. */
function SketchArrow() {
  return (
    <svg
      className="teaching-arc__arrow"
      viewBox="0 0 40 20"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M 2 11.5 C 10 9.5, 20 12.5, 34 10" />
      <path d="M 28.5 5.5 C 31 7.5, 33 9, 35 10 C 33 11.5, 31 13, 29 15" />
    </svg>
  );
}

/** A teaching method as a sequence of steps, each shown by a real slide. */
function SessionArc({ steps, caption }) {
  return (
    <figure className="teaching-figure teaching-arc">
      <ol className="teaching-arc__steps">
        {steps.map((step, index) => (
          <li key={step.index} className="teaching-arc__step">
            <div className="teaching-arc__media">
              {index > 0 ? <SketchArrow /> : null}
              <div className="teaching-figure__frame">
                <img src={step.src} alt={step.alt} loading="lazy" decoding="async" />
              </div>
            </div>
            <p className="teaching-arc__label">
              <span className="teaching-arc__index">{step.index}</span> {step.label}
            </p>
            <p className="teaching-arc__text">{step.text}</p>
          </li>
        ))}
      </ol>
      {caption ? <figcaption className="teaching-caption">{caption}</figcaption> : null}
    </figure>
  );
}

/**
 * External documentation card: the Home Selected Work card (`.vibe-card`
 * system) — 16:10 thumbnail when provided, text-only otherwise; the whole
 * card is the link.
 */
function DocumentCard({ card }) {
  return (
    <article className="vibe-card teaching-card">
      <a
        className="vibe-card__link"
        href={card.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${card.title} on Notion`}
      >
        {card.thumbnail ? (
          <div className="vibe-card__thumbnail" aria-hidden="true">
            <img
              src={card.thumbnail}
              alt=""
              className="vibe-card__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className="vibe-card__body">
          <h3 className="vibe-card__title">
            {card.title}
            <span className="vibe-card__external" aria-hidden="true">↗︎</span>
          </h3>
          <p className="vibe-card__description">{card.description}</p>
          {card.tags?.length ? (
            <ul className="vibe-card__tags" aria-label="Tags">
              {card.tags.map((tag) => (
                <li key={tag} className="vibe-card__tag">{tag}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </a>
    </article>
  );
}

/** One piece of evidence inside a course: a session, projects, prototypes. */
function CourseWork({ work, labels }) {
  return (
    <section className="teaching-work">
      <h4 className="teaching-work__title">{work.title}</h4>
      <div className="teaching-work__body">
        {work.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {work.arc ? <SessionArc steps={work.arc} caption={work.arcCaption} /> : null}
      {work.figure ? <Figure {...work.figure} className="teaching-work__figure" /> : null}
      {work.gallery ? <Gallery items={work.gallery} caption={work.galleryCaption} /> : null}
      {work.card ? <DocumentCard card={work.card} /> : null}

      {work.reflection ? (
        <blockquote className="teaching-reflection">
          <p className="teaching-label">{labels.reflection}</p>
          <p>{work.reflection}</p>
        </blockquote>
      ) : null}
    </section>
  );
}

export function CourseEntry({ course, labels }) {
  const meta = [course.number, course.term].filter(Boolean);

  return (
    <article
      id={course.id}
      className="teaching-course"
      aria-labelledby={`${course.id}-title`}
    >
      <header className="teaching-course__header">
        <h3 id={`${course.id}-title`} className="teaching-course__title">
          {course.title}
        </h3>
        <Meta items={meta} />
      </header>

      {/* Official course content reads quieter than my own role. */}
      <p className="teaching-course__focus">{course.focus}</p>

      <div className="teaching-course__role">
        <p className="teaching-label">{labels.role}</p>
        <ul className="teaching-list">
          {course.role.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {course.work?.map((work) => (
        <CourseWork key={work.title} work={work} labels={labels} />
      ))}
    </article>
  );
}

export function PrincipleList({ principles }) {
  return (
    <ol className="teaching-principles">
      {principles.map((principle) => (
        <li key={principle.index} className="teaching-principles__item">
          <h3 className="teaching-principles__title">
            <span className="teaching-principles__index">{principle.index}</span>
            {principle.title}
          </h3>
          <p className="teaching-principles__description">{principle.description}</p>
        </li>
      ))}
    </ol>
  );
}
