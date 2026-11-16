/**
 * Teaching — same page grammar as Projects (header, section title + note,
 * lifted cards). Principles read as one interactive surface; each links to
 * the course where it shows up. Courses expand downward in place.
 */
import { useCallback, useId, useRef, useState } from "react";

function Meta({ items }) {
  if (!items?.length) return null;
  return (
    <p className="teaching-meta">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  );
}

function Figure({ src, alt, caption, className = "" }) {
  return (
    <figure className={`teaching-figure ${className}`.trim()}>
      <div className="teaching-figure__frame">
        <img src={src} alt={alt} loading="lazy" decoding="async" />
      </div>
      {caption ? <figcaption className="teaching-caption">{caption}</figcaption> : null}
    </figure>
  );
}

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

function DocumentCard({ card }) {
  return (
    <a
      className="teaching-doc"
      href={card.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${card.title} on Notion`}
    >
      {card.thumbnail ? (
        <img
          className="teaching-doc__thumb"
          src={card.thumbnail}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <div className="teaching-doc__body">
        <p className="teaching-doc__title">
          {card.title}
          <span aria-hidden="true"> ↗︎</span>
        </p>
        <p className="teaching-doc__desc">{card.description}</p>
        {card.tags?.length ? (
          <ul className="teaching-doc__tags" aria-label="Tags">
            {card.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </a>
  );
}

function CourseWork({ work, labels }) {
  return (
    <div className="teaching-course__block teaching-work">
      <h4 className="teaching-work__title">{work.title}</h4>
      <div className="teaching-work__body">
        {work.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {work.arc ? <SessionArc steps={work.arc} caption={work.arcCaption} /> : null}
      {work.figure ? <Figure {...work.figure} /> : null}
      {work.gallery ? (
        <Gallery items={work.gallery} caption={work.galleryCaption} />
      ) : null}
      {work.card ? <DocumentCard card={work.card} /> : null}
      {work.reflection ? (
        <blockquote className="teaching-reflection">
          <p className="teaching-label">{labels.reflection}</p>
          <p>{work.reflection}</p>
        </blockquote>
      ) : null}
    </div>
  );
}

function courseThumb(course) {
  if (course.thumbnail) return course.thumbnail;
  for (const work of course.work ?? []) {
    if (work.figure?.src) return work.figure.src;
    if (work.gallery?.[0]?.src) return work.gallery[0].src;
    if (work.card?.thumbnail) return work.card.thumbnail;
  }
  return null;
}

function courseInitials(title = "") {
  return title
    .split(/\s+/)
    .filter((word) => /^[A-Z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function Chevron() {
  return (
    <svg
      className="teaching-course__chevron"
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" />
    </svg>
  );
}

function CourseCard({ course, labels, open, onToggle, moreLabel, lessLabel }) {
  const panelId = useId();
  const meta = [course.number, course.term].filter(Boolean);
  const thumb = courseThumb(course);
  const hasEvidence = Boolean(course.work?.length || course.role?.length);

  return (
    <article
      id={course.id}
      className={`teaching-course${open ? " is-open" : ""}`}
    >
      <button
        type="button"
        className="teaching-course__hit"
        aria-expanded={hasEvidence ? open : undefined}
        aria-controls={hasEvidence ? panelId : undefined}
        onClick={() => hasEvidence && onToggle()}
        disabled={!hasEvidence}
      >
        {thumb ? (
          <img
            className="teaching-course__thumb"
            src={thumb}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span
            className="teaching-course__thumb teaching-course__thumb--empty"
            aria-hidden="true"
          >
            {courseInitials(course.title)}
          </span>
        )}
        <span className="teaching-course__copy">
          <Meta items={meta} />
          <span className="teaching-course__title">{course.title}</span>
          <span className="teaching-course__focus">{course.focus}</span>
        </span>
        {hasEvidence ? (
          <span className="teaching-course__toggle" aria-hidden="true">
            <span className="teaching-course__toggle-label">
              {open ? lessLabel : moreLabel}
            </span>
            <Chevron />
          </span>
        ) : null}
      </button>

      {hasEvidence ? (
        <div
          id={panelId}
          className="teaching-course__drawer"
          inert={open ? undefined : ""}
        >
          <div className="teaching-course__drawer-inner">
            <div className="teaching-course__panel">
              {course.role?.length ? (
                <div className="teaching-course__block teaching-course__role">
                  <p className="teaching-label">{labels.role}</p>
                  <ul className="teaching-list">
                    {course.role.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {course.work?.map((work) => (
                <CourseWork key={work.title} work={work} labels={labels} />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </article>
  );
}

/**
 * Principles as a card file: folder tabs across the top, one card in front,
 * the rest stacked behind it with their edges showing. Click a tab, use the
 * arrow keys, or "next" to flip. All cards share one grid cell, so the file
 * keeps the height of the longest principle.
 */
function Approach({ principles, evidenceLabel, nextLabel, onEvidence }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef([]);
  const count = principles.length;

  const select = (index, focus = false) => {
    const next = (index + count) % count;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event) => {
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active + 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next === null) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <div className="teaching-file" style={{ "--file-count": count }}>
      <div className="teaching-file__tabs" role="tablist" onKeyDown={onKeyDown}>
        {principles.map((principle, index) => {
          const selected = index === active;
          return (
            <button
              key={principle.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              className={`teaching-file__tab${selected ? " is-active" : ""}`}
              title={principle.title}
              onClick={() => select(index)}
            >
              <span className="teaching-file__tab-name">
                {principle.tab || principle.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="teaching-file__stack">
        {principles.map((principle, index) => {
          const depth = (index - active + count) % count;
          const selected = depth === 0;
          return (
            <div
              key={principle.title}
              role="tabpanel"
              id={`${baseId}-panel-${index}`}
              aria-labelledby={`${baseId}-tab-${index}`}
              aria-hidden={selected ? undefined : true}
              inert={selected ? undefined : ""}
              className={`teaching-file__card${selected ? " is-active" : ""}`}
              style={{ "--depth": depth }}
            >
              <div className="teaching-file__content">
                <h3 className="teaching-file__title">{principle.title}</h3>
                <p className="teaching-file__text">{principle.description}</p>
                <div className="teaching-file__footer">
                  {principle.evidence ? (
                    <button
                      type="button"
                      className="teaching-file__evidence"
                      onClick={() => onEvidence(principle.evidence.courseId)}
                    >
                      <span className="teaching-file__evidence-kicker">
                        {evidenceLabel}
                      </span>
                      <span>{principle.evidence.label}</span>
                      <Chevron />
                    </button>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    className="teaching-file__next"
                    onClick={() => select(index + 1)}
                  >
                    {nextLabel}
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TeachingBoard({ copy }) {
  const { introduction, philosophy, experience } = copy;
  const [openId, setOpenId] = useState(null);
  const moreLabel = copy.language === "zh" ? "展开" : "more";
  const lessLabel = copy.language === "zh" ? "收起" : "less";
  const nextLabel = copy.language === "zh" ? "下一张" : "next";
  const note = introduction.paragraphs.join(" ");

  const showCourse = useCallback((courseId) => {
    if (!courseId) return;
    setOpenId(courseId);
    window.requestAnimationFrame(() => {
      document
        .getElementById(courseId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <article className="projects-page teaching-page" aria-labelledby="teaching-title">
      <header className="projects-page__header">
        <h1 id="teaching-title" className="projects-page__title">
          {introduction.title}
        </h1>
        <p className="projects-page__note">{note}</p>
      </header>

      <section
        id="teaching-philosophy"
        className="case-studies__section teaching-section"
        aria-labelledby="teaching-philosophy-title"
      >
        <h2 id="teaching-philosophy-title" className="case-studies__section-title">
          {philosophy.title}
        </h2>
        {philosophy.paragraphs[0] ? (
          <p className="case-studies__section-note">{philosophy.paragraphs[0]}</p>
        ) : null}
        <Approach
          principles={philosophy.principles}
          evidenceLabel={experience.evidenceLabel}
          nextLabel={nextLabel}
          onEvidence={showCourse}
        />
      </section>

      <section
        id="teaching-experience"
        className="case-studies__section teaching-section"
        aria-labelledby="teaching-experience-title"
      >
        <h2 id="teaching-experience-title" className="case-studies__section-title">
          {experience.title}
        </h2>
        {experience.note ? (
          <p className="case-studies__section-note">{experience.note}</p>
        ) : null}
        <div className="teaching-course-list">
          {experience.courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              labels={experience.labels}
              open={openId === course.id}
              moreLabel={moreLabel}
              lessLabel={lessLabel}
              onToggle={() =>
                setOpenId((current) => (current === course.id ? null : course.id))
              }
            />
          ))}
        </div>
      </section>
    </article>
  );
}
