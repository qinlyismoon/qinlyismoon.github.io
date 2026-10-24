// Native detail view for a vibe coding project.
// Rendered as a modal overlay; keeps the visitor in the portfolio context
// while offering a prominent link to the live site.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import useSlidingIndicator from "../../hooks/useSlidingIndicator";
import CaseStudyVideo from "./CaseStudyVideo";

const LABELS = {
  en: {
    close: "Close project details",
    viewDetails: (title) => `View details for ${title}`,
    technologies: "Technologies",
    visitLive: "Visit live site",
    projectNotes: "Project notes",
    contents: "Contents",
    nextProject: "Next project",
    overview: "Overview",
    background: "Background",
    question: "The question",
    visual: "Visual language",
    interaction: "Interaction",
    process: "Process",
  },
  zh: {
    close: "关闭项目详情",
    viewDetails: (title) => `查看${title}的详情`,
    technologies: "技术",
    visitLive: "打开体验网站",
    projectNotes: "项目笔记",
    contents: "本页内容",
    nextProject: "下一个项目",
    overview: "概述",
    background: "背景",
    question: "核心问题",
    visual: "视觉语言",
    interaction: "交互方式",
    process: "构建过程",
  },
};

// Sticky contents bar for the detail view: shows which sections the page
// has, highlights the one being read, and jumps on click. Editorial-tab
// voice from the design system — bare caption text on a hairline, the
// current section marked by ONE accent underline that travels between
// items with the shared sliding-indicator motion (useSlidingIndicator,
// the same inchworm glide as the site tabs and Inline Choice). The bar
// itself stays solid page ground so the text is always calm; the
// project's hero image only breathes in at the right edge, masked so
// it fades out before it can reach the words — and the crop picks the
// calmest band of the hero (see the nav-art rule in DESIGN_SYSTEM.md).
// The close control lives on the hero at rest (circled, top-right);
// once the bar sticks, a matching circled close fades in at the bar's
// right end — there is always exactly one close within reach.
function DetailNav({ items, art, artPosition, artSize, fade, label, closeLabel, onClose }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef(null);
  const itemsRef = useRef(null);
  const indicatorRef = useRef(null);
  const itemRefs = useRef(new Map());
  const idsKey = items.map((item) => item.id).join(",");
  const labelsKey = items.map((item) => item.label).join("|");

  useSlidingIndicator({
    containerRef: itemsRef,
    indicatorRef,
    getActive: () => itemRefs.current.get(activeId),
    activeKey: activeId,
    layoutKey: labelsKey,
  });

  // The bar sticks at the viewport top; when it arrives there, reveal
  // its close control (the hero's own close has scrolled away by then).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const onScroll = () => {
      setStuck(nav.getBoundingClientRect().top <= 1);
    };
    onScroll();
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const panel = navRef.current?.closest(".vibe-detail");
    if (!panel) return undefined;
    const sections = idsKey
      .split(",")
      .map((id) => panel.querySelector(`#${CSS.escape(id)}`))
      .filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idsKey]);

  const jump = (id) => {
    setActiveId(id);
    navRef.current
      ?.closest(".vibe-detail")
      ?.querySelector(`#${CSS.escape(id)}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      ref={navRef}
      className="vibe-detail__nav"
      style={fade ? { background: fade } : undefined}
      aria-label={label}
    >
      {art ? (
        <span
          className="vibe-detail__nav-art"
          style={{
            backgroundImage: `url(${art})`,
            backgroundPosition: artPosition ?? "50% 0%",
            backgroundSize: artSize ?? "cover",
          }}
          aria-hidden="true"
        />
      ) : null}
      <div ref={itemsRef} className="vibe-detail__nav-items">
        <span
          ref={indicatorRef}
          className="vibe-detail__nav-indicator"
          aria-hidden="true"
        />
        {items.map((item) => (
          <button
            key={item.id}
            ref={(node) => {
              if (node) itemRefs.current.set(item.id, node);
              else itemRefs.current.delete(item.id);
            }}
            type="button"
            className="vibe-detail__nav-item"
            aria-current={item.id === activeId ? "true" : undefined}
            onClick={() => jump(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        className={`vibe-detail__close vibe-detail__close--nav${stuck ? " is-visible" : ""}`}
        onClick={onClose}
        aria-label={closeLabel}
        aria-hidden={stuck ? undefined : "true"}
        tabIndex={stuck ? undefined : -1}
      >
        ×
      </button>
    </nav>
  );
}

/**
 * Full case-study body (Swim Balance): the Notion page's structure —
 * problem, experience with screen recordings, process, and design
 * decisions with before/after artwork — instead of the short section
 * list used by the other vibe projects. Typography comes from the
 * shared Reading primitives in styles.css, like every other detail.
 */
function CaseStudyBody({ caseStudy }) {
  const { problem, experience, process, decisions } = caseStudy;
  return (
    <div className="case-study">
      {problem ? (
        <section className="case-study__section" id="case-study-problem">
          <span className="vibe-detail__index" aria-hidden="true">
            01
          </span>
          <h3>{problem.heading}</h3>
          {problem.paragraphs?.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
          {problem.quote ? (
            <blockquote className="vibe-detail__quote">{problem.quote}</blockquote>
          ) : null}
        </section>
      ) : null}

      {experience ? (
        <section className="case-study__section" id="case-study-experience">
          <span className="vibe-detail__index" aria-hidden="true">
            02
          </span>
          <h3>{experience.heading}</h3>
          {experience.loop ? <p>{experience.loop}</p> : null}
          {/* Prefer crisp stills (PDF exports) when present; fall back
              to screen recordings for motion demos. */}
          {experience.images?.length ? (
            <div className="case-study__videos">
              {experience.images.map((image) => (
                <figure
                  key={image.src}
                  className="case-study__video case-study__video--still"
                >
                  <img src={image.src} alt={image.alt ?? ""} loading="lazy" />
                  {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          ) : experience.videos?.length ? (
            <div className="case-study__videos">
              {experience.videos.map((video) => (
                <figure key={video.src} className="case-study__video">
                  <CaseStudyVideo src={video.src} />
                  <figcaption>{video.caption}</figcaption>
                </figure>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {process ? (
        <section className="case-study__section" id="case-study-process">
          <span className="vibe-detail__index" aria-hidden="true">
            03
          </span>
          <h3>{process.heading}</h3>
          {process.image ? (
            <figure className="case-study__figure">
              <img src={process.image.src} alt={process.image.alt ?? ""} loading="lazy" />
              {process.image.caption ? (
                <figcaption>{process.image.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </section>
      ) : null}

      {decisions ? (
        <section className="case-study__section" id="case-study-decisions">
          <span className="vibe-detail__index" aria-hidden="true">
            04
          </span>
          <h3>{decisions.heading}</h3>
          {decisions.items?.map((item) => (
            <div key={item.title} className="case-study__decision">
              <h4>{item.title}</h4>
              {item.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              {item.image ? (
                <figure className="case-study__figure">
                  <img src={item.image.src} alt={item.image.alt ?? ""} loading="lazy" />
                  {item.image.caption ? (
                    <figcaption>{item.image.caption}</figcaption>
                  ) : null}
                </figure>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}

// "The Problem — Why I Built It" -> "The Problem"; "问题——我为什么做它" -> "问题".
const shortLabel = (heading) => heading.split(/—+/)[0].trim();

/**
 * The detail surface itself — hero, contents bar, and the numbered
 * sections. It lives in the modal overlay; the overlay itself is what
 * a project route (/<id>) opens, so a shared link lands on
 * this same presentation.
 */
function ProjectDetailPanel({ project, onClose, nextProject, onOpenNext }) {
  const { language } = useAppSettings();
  const labels = LABELS[language] ?? LABELS.en;
  const [imageFailed, setImageFailed] = useState(false);

  const isZh = language === "zh";
  const detail = isZh && project.detailZh ? project.detailZh : project.detail ?? {};
  const caseStudy =
    (isZh && project.caseStudyZh ? project.caseStudyZh : project.caseStudy) ??
    null;
  const tagline = isZh && project.taglineZh ? project.taglineZh : project.tagline;
  const showImage = project.thumbnail && !imageFailed;
  // Card may use a short loop (`heroVideo`); detail can swap in a longer
  // cut via `detailHeroVideo` (e.g. full workshop film).
  const detailHeroSrc = project.detailHeroVideo || project.heroVideo;
  const showHeroVideo = Boolean(detailHeroSrc);
  const showHero = showHeroVideo || showImage;
  // Optional per-project action labels (v2.2.1+); vibe projects keep the
  // shared defaults. Emotion Garden (v2.2.2) also fills question / visual /
  // interaction in the same section slots.
  const liveLabel =
    (isZh ? project.liveLabelZh : project.liveLabel) ?? labels.visitLive;
  const notesLabel =
    (isZh ? project.notesLabelZh : project.notesLabel) ?? labels.projectNotes;
  const livePendingLabel =
    (isZh ? project.livePendingLabelZh : project.livePendingLabel) ??
    (isZh ? "即将上线" : "Coming soon");
  const chips = caseStudy?.skills?.length ? caseStudy.skills : project.tags;
  const role = isZh && project.roleZh ? project.roleZh : project.role;
  const hasActions = Boolean(
    project.liveUrl || project.notesUrl || project.livePending,
  );
  const panelBackground =
    project.panelBackground ?? caseStudy?.background ?? null;

  // Rich per-project sections (detailSections) when present; otherwise
  // the legacy detail fields in their fixed slots. Both feed the same
  // numbered-section rendering below.
  const richSections =
    isZh && project.detailSectionsZh
      ? project.detailSectionsZh
      : project.detailSections;
  const genericSections = richSections
    ? richSections.map((section) => ({ ...section, key: section.id }))
    : [
        { key: "overview", label: labels.overview, paragraphs: [detail.overview] },
        { key: "background", label: labels.background, paragraphs: [detail.background] },
        {
          key: "question",
          label: labels.question,
          paragraphs: [detail.question],
          quote: true,
        },
        { key: "visual", label: labels.visual, paragraphs: [detail.visual] },
        { key: "interaction", label: labels.interaction, paragraphs: [detail.interaction] },
        { key: "process", label: labels.process, paragraphs: [detail.process] },
      ].filter((section) => section.paragraphs[0]);

  const navItems = caseStudy
    ? [
        caseStudy.problem && {
          id: "case-study-problem",
          label: shortLabel(caseStudy.problem.heading),
        },
        caseStudy.experience && {
          id: "case-study-experience",
          label: shortLabel(caseStudy.experience.heading),
        },
        caseStudy.process && {
          id: "case-study-process",
          label: shortLabel(caseStudy.process.heading),
        },
        caseStudy.decisions && {
          id: "case-study-decisions",
          label: shortLabel(caseStudy.decisions.heading),
        },
      ].filter(Boolean)
    : genericSections.map((section) => ({
        id: `detail-${section.key}`,
        label: section.label,
      }));

  return (
      <div
        className={`vibe-detail${caseStudy ? " vibe-detail--case-study" : ""}${
          panelBackground ? " vibe-detail--tinted" : ""
        }`}
        style={
          panelBackground ? { background: panelBackground } : undefined
        }
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="vibe-detail__close"
          onClick={onClose}
          aria-label={labels.close}
        >
          ×
        </button>
        {showHero ? (
          <div
            className={`vibe-detail__hero${
              showHeroVideo ? " vibe-detail__hero--video" : ""
            }`}
          >
            {showHeroVideo ? (
              <CaseStudyVideo
                className="vibe-detail__image vibe-detail__hero-video"
                src={detailHeroSrc}
                poster={project.thumbnail || undefined}
                controls={false}
              />
            ) : (
              <img
                src={project.thumbnail}
                alt=""
                className="vibe-detail__image"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
        ) : null}
        <DetailNav
          items={navItems}
          art={showImage ? project.thumbnail : null}
          artPosition={project.navArtPosition}
          artSize={project.navArtSize}
          fade={panelBackground ?? "var(--color-surface)"}
          label={labels.contents}
          closeLabel={labels.close}
          onClose={onClose}
        />
        <div className="vibe-detail__body">
          <p className="vibe-detail__kicker">{project.subtitle}</p>
          <h2 className="vibe-detail__title">{project.title}</h2>
          {tagline ? <p className="vibe-detail__tagline">{tagline}</p> : null}
          {chips?.length ? (
            <ul className="vibe-detail__tags" aria-label={labels.technologies}>
              {chips.map((chip) => (
                <li key={chip} className="vibe-detail__tag">
                  {chip}
                </li>
              ))}
            </ul>
          ) : null}
          {hasActions ? (
            <div className="vibe-detail__actions">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="vibe-detail__action vibe-detail__action--primary"
                >
                  {liveLabel} ↗
                </a>
              ) : project.livePending ? (
                <span
                  className="vibe-detail__action vibe-detail__action--primary vibe-detail__action--pending"
                  aria-disabled="true"
                >
                  {liveLabel}
                  <span className="vibe-detail__action-note">
                    {" "}
                    · {livePendingLabel}
                  </span>
                </span>
              ) : null}
              {project.notesUrl ? (
                <a
                  href={project.notesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="vibe-detail__action"
                >
                  {notesLabel} ↗
                </a>
              ) : null}
            </div>
          ) : null}
          {caseStudy ? <CaseStudyBody caseStudy={caseStudy} /> : null}
          {caseStudy ? null : (
            <dl className="vibe-detail__sections">
              {genericSections.map((section, index) => (
                <div
                  key={section.key}
                  className="vibe-detail__section"
                  id={`detail-${section.key}`}
                >
                  <span className="vibe-detail__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <dt>{section.label}</dt>
                  {section.paragraphs?.map((paragraph) => (
                    <dd
                      key={paragraph.slice(0, 24)}
                      className={section.quote === true ? "vibe-detail__quote" : undefined}
                    >
                      {paragraph}
                    </dd>
                  ))}
                  {/* A string quote is its own pulled line after the
                      paragraphs (the legacy `quote: true` instead
                      styles the paragraph itself as the quote). */}
                  {typeof section.quote === "string" ? (
                    <dd className="vibe-detail__quote">{section.quote}</dd>
                  ) : null}
                  {/* Evidence before synthesis: section figures/images
                      lead tables so research boards aren't interrupted
                      by a summary table sitting above them. */}
                  {section.image ? (
                    <figure
                      className={`case-study__figure${
                        section.image.size === "contained"
                          ? " case-study__figure--contained"
                          : ""
                      }`}
                    >
                      <img
                        src={section.image.src}
                        alt={section.image.alt ?? ""}
                        loading="lazy"
                      />
                      {section.image.caption ? (
                        <figcaption>{section.image.caption}</figcaption>
                      ) : null}
                    </figure>
                  ) : null}
                  {section.images?.length ? (
                    <div className="case-study__figures">
                      {section.images.map((image) => (
                        <figure key={image.src} className="case-study__figure">
                          <img
                            src={image.src}
                            alt={image.alt ?? ""}
                            loading="lazy"
                          />
                          {image.caption ? (
                            <figcaption>{image.caption}</figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  {section.tables?.map((table) => (
                    <div
                      key={table.caption ?? table.headers?.join("-")}
                      className="case-study__table-wrap"
                    >
                      <table
                        className={`case-study__table${
                          table.headerColumn ? " case-study__table--row-head" : ""
                        }`}
                      >
                        {table.headers?.length ? (
                          <thead>
                            <tr>
                              {table.headers.map((header) => (
                                <th key={header} scope="col">
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                        ) : null}
                        <tbody>
                          {table.rows?.map((row) => (
                            <tr key={row.join("|").slice(0, 48)}>
                              {row.map((cell, cellIndex) =>
                                table.headerColumn && cellIndex === 0 ? (
                                  <th key={cellIndex} scope="row">
                                    {cell}
                                  </th>
                                ) : (
                                  <td key={cellIndex}>{cell}</td>
                                ),
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {table.caption ? (
                        <p className="case-study__table-caption">{table.caption}</p>
                      ) : null}
                    </div>
                  ))}
                  {section.list?.length ? (
                    <ul className="case-study__list">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {/* Local screen recordings (mp4), same stage as Swim
                      Balance — a section can carry a short loop of clips. */}
                  {section.videos?.length ? (
                    <div
                      className={`case-study__videos${
                        section.videos.some((video) => video.aspect === "landscape")
                          ? " case-study__videos--stack"
                          : ""
                      }`}
                    >
                      {section.videos.map((video) => (
                        <figure
                          key={video.src}
                          className={`case-study__video${
                            video.aspect === "landscape"
                              ? " case-study__video--landscape"
                              : ""
                          }`}
                        >
                          <CaseStudyVideo
                            src={video.src}
                            withSound={Boolean(video.withSound)}
                          />
                          {video.caption ? (
                            <figcaption>{video.caption}</figcaption>
                          ) : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}
                  {section.items?.map((item) => (
                    <div
                      key={item.title}
                      className={`case-study__decision${
                        item.split ? " case-study__decision--split" : ""
                      }`}
                    >
                      <h4>{item.title}</h4>
                      {/* Split items pair their copy with the artwork
                          beside it; the copy keeps one column so the
                          grid never interleaves paragraphs and figure. */}
                      {item.split ? (
                        <div className="case-study__split-text">
                          {item.paragraphs?.map((paragraph) => (
                            <dd key={paragraph.slice(0, 24)}>{paragraph}</dd>
                          ))}
                        </div>
                      ) : (
                        item.paragraphs?.map((paragraph) => (
                          <dd key={paragraph.slice(0, 24)}>{paragraph}</dd>
                        ))
                      )}
                      {item.list?.length ? (
                        <ul className="case-study__list">
                          {item.list.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      ) : null}
                      {item.image ? (
                        <figure className="case-study__figure">
                          <img
                            src={item.image.src}
                            alt={item.image.alt ?? ""}
                            loading="lazy"
                          />
                          {item.image.caption ? (
                            <figcaption>{item.image.caption}</figcaption>
                          ) : null}
                        </figure>
                      ) : null}
                      {item.images?.length ? (
                        <div className="case-study__figures">
                          {item.images.map((image) => (
                            <figure key={image.src} className="case-study__figure">
                              <img
                                src={image.src}
                                alt={image.alt ?? ""}
                                loading="lazy"
                              />
                              {image.caption ? (
                                <figcaption>{image.caption}</figcaption>
                              ) : null}
                            </figure>
                          ))}
                        </div>
                      ) : null}
                      {/* Local mp4 or external embed. Portrait clips
                          (phone recordings) use a tall stage so the
                          frame fills without pillarbox bars; landscape
                          stays 16:9. Playback is shared: in-view play. */}
                      {item.video ? (
                        <figure className="case-study__figure case-study__figure--video">
                          <div
                            className={`case-study__embed${
                              item.video.aspect === "portrait"
                                ? " case-study__embed--portrait"
                                : ""
                            }`}
                          >
                            {/\.(mp4|webm|ogg)(\?|$)/i.test(item.video.src) ? (
                              <CaseStudyVideo
                                src={item.video.src}
                                title={item.video.title ?? item.title}
                                withSound={Boolean(item.video.withSound)}
                              />
                            ) : (
                              <iframe
                                src={item.video.src}
                                title={item.video.title ?? item.title}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                              />
                            )}
                          </div>
                          {item.video.caption ? (
                            <figcaption>{item.video.caption}</figcaption>
                          ) : null}
                        </figure>
                      ) : null}
                    </div>
                  ))}
                  {/* Closing quote after evidence/items (e.g. Leaf Note
                      self-analysis insight that follows the four issues). */}
                  {typeof section.closingQuote === "string" ? (
                    <dd className="vibe-detail__quote vibe-detail__quote--closing">
                      {section.closingQuote}
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          )}
        </div>
        {/* Scene footer: no divider lines — the panel settles onto a
            quiet slice of the project's own artwork (the same crop
            the contents bar breathes), with the record kept at the
            left (title · year, role, shared tag chips) and the next
            project waiting at the right. */}
        <footer className="vibe-detail__footer">
          {showImage ? (
            <span
              className="vibe-detail__footer-art"
              style={{
                backgroundImage: `url(${project.thumbnail})`,
                backgroundPosition:
                  project.footerArtPosition ?? project.navArtPosition ?? "50% 0%",
                backgroundSize:
                  project.footerArtSize ?? project.navArtSize ?? "cover",
              }}
              aria-hidden="true"
            />
          ) : null}
          <div className="vibe-detail__footer-info">
            <p className="vibe-detail__footer-meta">
              {[project.title, project.timeline].filter(Boolean).join(" · ")}
              {project.duration ? (
                <>
                  {"  ·  "}
                  <span className="vibe-detail__footer-duration">
                    {isZh && project.durationZh
                      ? project.durationZh
                      : project.duration}
                  </span>
                </>
              ) : null}
            </p>
            {role ? (
              <p className="vibe-detail__footer-role">{role}</p>
            ) : null}
            {chips?.length ? (
              <ul
                className="vibe-detail__tags vibe-detail__footer-tags"
                aria-label={labels.technologies}
              >
                {chips.map((chip) => (
                  <li key={chip} className="vibe-detail__tag">
                    {chip}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {nextProject && onOpenNext ? (
            <button
              type="button"
              className="vibe-detail__next"
              onClick={() => onOpenNext(nextProject)}
            >
              <span className="vibe-detail__next-label">
                {labels.nextProject}
              </span>
              <span className="vibe-detail__next-title">
                {nextProject.title}{" "}
                <span className="vibe-detail__next-arrow" aria-hidden="true">
                  →
                </span>
              </span>
            </button>
          ) : null}
        </footer>
      </div>
  );
}

export default function VibeProjectDetail({
  project,
  onCloseStart,
  onClosed,
  nextProject,
  onOpenNext,
}) {
  const overlayRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [closing, setClosing] = useState(false);

  // Latest callbacks in refs: the mount effect below must run exactly
  // once, or its cleanup would drop the body lock mid-handoff.
  const onCloseStartRef = useRef(onCloseStart);
  onCloseStartRef.current = onCloseStart;
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  // Switching projects (the footer's Next) keeps the overlay and its
  // backdrop mounted — only the panel changes, scrolling back to the
  // top while the new panel eases in (see vibe-detail-rise).
  useEffect(() => {
    overlayRef.current?.scrollTo({ top: 0 });
  }, [project?.id]);

  // Closing is a reveal, not a cut — and the destination lands FIRST.
  // The route returns Home immediately (onCloseStart) so the page
  // behind, scroll position included, settles under the still-opaque
  // backdrop; only then do backdrop and panel ease out over it
  // (is-closing), and onClosed unmounts the overlay at the end.
  // Fading out over the page that happens to sit behind the detail
  // flashed that page's top before Home ever arrived.
  const handleCloseRef = useRef(() => {});
  handleCloseRef.current = () => {
    if (closing) return;
    setClosing(true);
    onCloseStartRef.current?.();
    closeTimerRef.current = window.setTimeout(
      () => onClosedRef.current?.(),
      300,
    );
  };
  const handleClose = () => handleCloseRef.current();

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") handleCloseRef.current();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // The shell hides its fixed top navigation while a project detail
    // is open (site-chrome.css), so the overlay — and its sticky
    // contents bar — own the full viewport.
    document.body.dataset.projectDetail = "open";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      delete document.body.dataset.projectDetail;
      window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  if (!project) return null;

  // Portaled to the body: the overlay must outlive its page layer.
  // When the route returns Home at close-start, the Library layer
  // switches off instantly — an overlay still parented inside it
  // would vanish with the layer instead of fading over Home.
  return createPortal(
    <div
      ref={overlayRef}
      className={`vibe-detail__overlay${closing ? " is-closing" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={handleClose}
    >
      <ProjectDetailPanel
        key={project.id}
        project={project}
        onClose={handleClose}
        nextProject={nextProject}
        onOpenNext={onOpenNext}
      />
    </div>,
    document.body,
  );
}
