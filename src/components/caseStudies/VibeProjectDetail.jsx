// Native detail view for a vibe coding project.
// Rendered as a modal overlay; keeps the visitor in the portfolio context
// while offering a prominent link to the live site.
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import useWindowChromeSide from "../../hooks/useWindowChromeSide";
import SiteOrgLink from "../shared/SiteOrgLink";
import CaseStudyVideo from "./CaseStudyVideo";
import FlowMediaRail from "./FlowMediaRail";
import { LEAF_NOTE_WIDGETS } from "./leafnote";
import { MONEY_MAP_WIDGETS } from "./moneymap";

// Interactive blocks a case-study section can embed by name.
const CASE_STUDY_WIDGETS = { ...MONEY_MAP_WIDGETS, ...LEAF_NOTE_WIDGETS };

/** Same org-mark fAIshion link as the home About block (system pattern). */
function withFaishionLink(text) {
  if (typeof text !== "string" || !text.includes("fAIshion")) return text;
  return text.split(/(fAIshion)/g).map((part, index) =>
    part === "fAIshion" ? (
      <SiteOrgLink key={`faishion-${index}`} org="faishion">
        fAIshion
      </SiteOrgLink>
    ) : (
      part
    ),
  );
}

function SectionWidget({ name }) {
  const Widget = CASE_STUDY_WIDGETS[name];
  return Widget ? (
    <dd className="case-study__widget">
      <Widget />
    </dd>
  ) : null;
}

const LABELS = {
  en: {
    close: "Close project details",
    viewDetails: (title) => `View details for ${title}`,
    technologies: "Technologies",
    visitLive: "Visit live site",
    projectNotes: "Project notes",
    contents: "Contents",
    nextProject: "Next project",
    prevProject: "Previous project",
    expand: "Widen panel",
    shrink: "Narrow panel",
    prototype: "Prototype",
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
    prevProject: "上一个项目",
    expand: "放大面板",
    shrink: "缩小面板",
    prototype: "原型",
    overview: "概述",
    background: "背景",
    question: "核心问题",
    visual: "视觉语言",
    interaction: "交互方式",
    process: "构建过程",
  },
};

function ExpandGlyph({ expanded }) {
  return (
    <svg
      className="vibe-detail__expand-icon"
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
    >
      {expanded ? (
        <>
          <path d="M6 2.5H3.5V5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10 2.5h2.5V5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M6 13.5H3.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10 13.5h2.5V11" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      ) : (
        <>
          <path d="M6 2.5H2.5V6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10 2.5h3.5V6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M6 13.5H2.5V10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M10 13.5h3.5V10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

function DetailToolbar({
  labels,
  expanded,
  onToggleExpand,
  onClose,
  onPrev,
  onNext,
  canPrev,
  canNext,
  prototypeUrl,
  prototypeLabel,
  chromeSide = "right",
}) {
  const chrome = (
    <div className="vibe-detail__toolbar-group vibe-detail__toolbar-group--chrome">
      {chromeSide === "left" ? (
        <>
          <button
            type="button"
            className="vibe-detail__tool vibe-detail__tool--chrome vibe-detail__tool--close"
            onClick={onClose}
            aria-label={labels.close}
          >
            <span aria-hidden="true">×</span>
          </button>
          <button
            type="button"
            className="vibe-detail__tool vibe-detail__tool--chrome"
            onClick={onToggleExpand}
            aria-label={expanded ? labels.shrink : labels.expand}
            aria-pressed={expanded}
          >
            <ExpandGlyph expanded={expanded} />
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="vibe-detail__tool vibe-detail__tool--chrome"
            onClick={onToggleExpand}
            aria-label={expanded ? labels.shrink : labels.expand}
            aria-pressed={expanded}
          >
            <ExpandGlyph expanded={expanded} />
          </button>
          <button
            type="button"
            className="vibe-detail__tool vibe-detail__tool--chrome vibe-detail__tool--close"
            onClick={onClose}
            aria-label={labels.close}
          >
            <span aria-hidden="true">×</span>
          </button>
        </>
      )}
    </div>
  );

  const nav = (
    <div className="vibe-detail__toolbar-group vibe-detail__toolbar-group--nav">
      {prototypeUrl ? (
        <a
          href={prototypeUrl}
          target="_blank"
          rel="noreferrer"
          className="vibe-detail__tool vibe-detail__tool--label vibe-detail__tool--link vibe-detail__tool--primary"
        >
          {prototypeLabel || labels.visitLive}
          <span className="external-arrow" aria-hidden="true">↗</span>
        </a>
      ) : null}
      <button
        type="button"
        className="vibe-detail__tool"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label={labels.prevProject}
      >
        ‹
      </button>
      <button
        type="button"
        className="vibe-detail__tool"
        onClick={onNext}
        disabled={!canNext}
        aria-label={labels.nextProject}
      >
        ›
      </button>
    </div>
  );

  return (
    <div
      className="vibe-detail__toolbar"
      data-chrome-side={chromeSide}
      onClick={(event) => event.stopPropagation()}
    >
      {chromeSide === "left" ? (
        <>
          {chrome}
          {nav}
        </>
      ) : (
        <>
          {nav}
          {chrome}
        </>
      )}
    </div>
  );
}

const CHAPTER_RING = { size: 16, stroke: 1.5 };

function ChapterProgressRing({ progress, active }) {
  const { size, stroke } = CHAPTER_RING;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(1, Math.max(0, progress));
  const complete = clamped >= 0.995;
  const offset = circumference * (1 - clamped);
  return (
    <svg
      className="vibe-detail__sidenav-ring"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      data-active={active ? "true" : undefined}
      data-complete={complete ? "true" : undefined}
    >
      <circle
        className="vibe-detail__sidenav-ring-track"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        strokeWidth={stroke}
      />
      {complete ? (
        <circle
          className="vibe-detail__sidenav-ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={Math.max(2.2, radius - 0.35)}
        />
      ) : (
        <circle
          className="vibe-detail__sidenav-ring-value"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ strokeDashoffset: offset }}
        />
      )}
    </svg>
  );
}

/**
 * Left sticky TOC — chapter titles with a per-chapter reading ring,
 * plus nested subsection links (no rings) when a chapter has children.
 */
function DetailSideNav({ items, label, panelRef }) {
  const chapters = items;
  const navRef = useRef(null);
  const [activeId, setActiveId] = useState(chapters[0]?.id);
  const [chapterProgress, setChapterProgress] = useState(() =>
    Object.fromEntries(chapters.map((item) => [item.id, 0])),
  );
  const observeIds = chapters.flatMap((item) => [
    item.id,
    ...(item.children?.map((child) => child.id) ?? []),
  ]);
  const idsKey = observeIds.join(",");
  const chapterIdsKey = chapters.map((item) => item.id).join(",");
  const childToParent = Object.fromEntries(
    chapters.flatMap((item) =>
      (item.children ?? []).map((child) => [child.id, item.id]),
    ),
  );

  useEffect(() => {
    const panel = panelRef?.current;
    if (!panel || !idsKey) return undefined;
    const scrollRoot = panel.querySelector("[data-detail-scroll]");
    const sections = idsKey
      .split(",")
      .map((id) => panel.querySelector(`#${CSS.escape(id)}`))
      .filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveId(entry.target.id);
        });
      },
      {
        root: scrollRoot || null,
        rootMargin: "-18% 0px -62% 0px",
      },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idsKey, panelRef]);

  useEffect(() => {
    const panel = panelRef?.current;
    const scroller = panel?.querySelector("[data-detail-scroll]");
    if (!scroller || !chapterIdsKey) return undefined;

    const chapterIds = chapterIdsKey.split(",");
    const lastId = chapterIds[chapterIds.length - 1];
    let frame = 0;

    const updateProgress = () => {
      const scrollerRect = scroller.getBoundingClientRect();
      const viewH = scroller.clientHeight;
      const readingY = scrollerRect.top + viewH * 0.32;
      const finishY = scrollerRect.top + viewH * 0.78;
      const maxScroll = Math.max(0, scroller.scrollHeight - viewH);
      const atBottom =
        maxScroll <= 4 || scroller.scrollTop >= maxScroll - 6;
      const next = {};
      chapterIds.forEach((id) => {
        const el = panel.querySelector(`#${CSS.escape(id)}`);
        if (!el) {
          next[id] = 0;
          return;
        }
        const rect = el.getBoundingClientRect();
        const height = Math.max(rect.height, 1);
        let raw = (readingY - rect.top) / height;
        // Once the chapter bottom has crossed the finish line, treat as read.
        if (rect.bottom <= finishY) raw = 1;
        // Last chapter often can't scroll the reading line through its full
        // height — snap complete when the page end is reached.
        if (id === lastId && atBottom) raw = 1;
        next[id] = Math.min(1, Math.max(0, raw));
      });
      setChapterProgress(next);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateProgress();
      });
    };

    updateProgress();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [panelRef, chapterIdsKey]);

  const jump = (id) => {
    setActiveId(id);
    panelRef?.current
      ?.querySelector(`#${CSS.escape(id)}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!chapters.length) return null;

  return (
    <aside ref={navRef} className="vibe-detail__sidenav" aria-label={label}>
      <ol className="vibe-detail__sidenav-list">
        {chapters.map((item) => {
          const progress = chapterProgress[item.id] ?? 0;
          const children = item.children ?? [];
          const activeChapterId = childToParent[activeId] ?? activeId;
          const isChapterActive = item.id === activeChapterId;
          return (
            <li key={item.id} className="vibe-detail__sidenav-item">
              <button
                type="button"
                className="vibe-detail__sidenav-link"
                aria-current={
                  isChapterActive && !children.some((c) => c.id === activeId)
                    ? "true"
                    : undefined
                }
                aria-label={`${item.label}, ${Math.round(progress * 100)}%`}
                onClick={() => jump(item.id)}
              >
                <ChapterProgressRing
                  progress={progress}
                  active={isChapterActive}
                />
                <span className="vibe-detail__sidenav-text">{item.label}</span>
              </button>
              {children.length ? (
                <ol className="vibe-detail__sidenav-sublist">
                  {children.map((child) => {
                    const isChildActive = child.id === activeId;
                    return (
                      <li
                        key={child.id}
                        className="vibe-detail__sidenav-subitem"
                      >
                        <button
                          type="button"
                          className="vibe-detail__sidenav-sublink"
                          aria-current={isChildActive ? "true" : undefined}
                          onClick={() => jump(child.id)}
                        >
                          {child.label}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              ) : null}
            </li>
          );
        })}
      </ol>
    </aside>
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
          {problem.lead ? <p className="vibe-detail__lead">{problem.lead}</p> : null}
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
          {experience.lead ? <p className="vibe-detail__lead">{experience.lead}</p> : null}
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
          {process.lead ? <p className="vibe-detail__lead">{process.lead}</p> : null}
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
          {decisions.lead ? <p className="vibe-detail__lead">{decisions.lead}</p> : null}
          {decisions.items?.map((item) => (
            <div key={item.title} className="case-study__decision">
              <h4>{item.title}</h4>
              {item.lead ? <p className="vibe-detail__lead">{item.lead}</p> : null}
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

function ItemFigure({ image }) {
  return (
    <figure className="case-study__figure">
      <img src={image.src} alt={image.alt ?? ""} loading="lazy" />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
}

/** Drop a leading "1. " / "01 " so auto step badges don’t double-number. */
function stripScreenIndex(caption) {
  if (!caption) return caption;
  return caption.replace(/^\d+[.\s、．]\s*/, "").trim();
}

/**
 * One rich section (title, copy, quotes, figures, tables, lists, videos,
 * items). Numbered when it stands alone in the flat list; inside a story
 * chapter the chapter carries the numeral instead.
 */
function DetailSection({ section, index }) {
  const { language } = useAppSettings();
  const isZh = language === "zh";

  return (
    <div
      className="vibe-detail__section"
      id={`detail-${section.key}`}
    >
      {index != null ? (
        <span className="vibe-detail__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <dt>{section.label}</dt>
      {/* Heading names the topic (short, also the nav item); the lead
          right under it carries the takeaway. */}
      {section.lead ? (
        <dd className="vibe-detail__lead">{section.lead}</dd>
      ) : null}
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
      {section.interactive ? <SectionWidget name={section.interactive} /> : null}
      {/* Project facts (role, context, deliverables, timeline) as a
          compact grid under the overview copy. */}
      {section.facts?.length ? (
        <dd className="case-study__facts-wrap">
          <dl className="case-study__facts">
            {section.facts.map((fact) => (
              <div key={fact.label} className="case-study__fact">
                <dt>{fact.label}</dt>
                {fact.lines.map((line) => (
                  <dd key={line}>{line}</dd>
                ))}
              </div>
            ))}
          </dl>
        </dd>
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
      {/* Default: stack full-width (journey maps, boards).
          `imagesLayout: "rail"` — horizontal peek rail (e.g. Money Map personas).
          Phone flows use `screens` + FlowMediaRail instead. */}
      {section.images?.length ? (
        section.imagesLayout === "rail" ? (
          <FlowMediaRail
            className="flow-media-rail--boards"
            label={isZh ? "滑动查看人物卡" : "Scroll through personas"}
          >
            {section.images.map((image) => (
              <figure
                key={image.src}
                className="case-study__figure flow-media-rail__card"
              >
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
          </FlowMediaRail>
        ) : (
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
        )
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
        // `listOrdered` numbers the points (1, 2, 3) when the copy is a
        // set of parallel reasons; plain lists keep bullets.
        section.listOrdered ? (
          <ol className="case-study__list case-study__list--ordered">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        ) : (
          <ul className="case-study__list">
            {section.list.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )
      ) : null}
      {/* Local screen recordings (mp4), same stage as Swim
          Balance — a section can carry a short loop of clips. */}
      {/* App / flow screens — horizontal rail with a peek so a long
          sequence never reads as “only these three.” Numbered like
          Money Map’s journey steps when the rail is a sequence. */}
      {section.screens?.length ? (
        <dd className="case-study__screens-wrap">
          <FlowMediaRail
            className="flow-media-rail--screens"
            fit={section.screensLayout === "fit"}
            label={
              section.screensLayout === "fit"
                ? isZh
                  ? "流程截图"
                  : "Flow screens"
                : isZh
                  ? "滑动查看流程截图"
                  : "Scroll through the flow"
            }
          >
            {section.screens.map((screen, screenIndex) => {
              const caption = stripScreenIndex(screen.caption);
              return (
                <figure
                  key={screen.src}
                  className="case-study__screen flow-media-rail__card"
                >
                  <img src={screen.src} alt={screen.alt ?? ""} loading="lazy" />
                  {caption ? (
                    <figcaption className="case-study__screen-caption">
                      <span className="case-study__screen-index" aria-hidden="true">
                        {screenIndex + 1}
                      </span>
                      <span>{caption}</span>
                    </figcaption>
                  ) : null}
                </figure>
              );
            })}
          </FlowMediaRail>
        </dd>
      ) : null}
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
                poster={video.poster}
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
          }${item.mediaFirst ? " case-study__decision--media-first" : ""}`}
        >
          <h4>{item.title}</h4>
          {item.lead ? <p className="vibe-detail__lead">{item.lead}</p> : null}
          {/* Media-first items give the artwork its own row under the
              title, then the copy runs the full measure below it. */}
          {item.image && item.mediaFirst ? (
            <ItemFigure image={item.image} />
          ) : null}
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
          {item.interactive ? <SectionWidget name={item.interactive} /> : null}
          {item.list?.length ? (
            <ul className="case-study__list">
              {item.list.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          ) : null}
          {item.image && !item.mediaFirst ? (
            <ItemFigure image={item.image} />
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
                style={
                  item.video.ratio
                    ? { aspectRatio: item.video.ratio }
                    : undefined
                }
              >
                {/\.(mp4|webm|ogg)(\?|$)/i.test(item.video.src) ? (
                  <CaseStudyVideo
                    src={item.video.src}
                    poster={item.video.poster}
                    title={item.video.title ?? item.title}
                    withSound={Boolean(item.video.withSound)}
                    controls={item.video.controls !== false}
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
          {item.screens?.length ? (
            <dd>
              <FlowMediaRail
                className="flow-media-rail--screens"
                label={isZh ? "滑动查看相关截图" : "Scroll through related screens"}
              >
                {item.screens.map((screen) => (
                  <figure
                    key={screen.src}
                    className="case-study__figure case-study__figure--screen flow-media-rail__card"
                  >
                    <img
                      src={screen.src}
                      alt={screen.alt ?? ""}
                      loading="lazy"
                    />
                    {screen.caption ? (
                      <figcaption>{screen.caption}</figcaption>
                    ) : null}
                  </figure>
                ))}
              </FlowMediaRail>
            </dd>
          ) : null}
          {/* Item tables (e.g. Money Map status / edit rules) run the
              full measure under the split copy and clip. */}
          {item.tables?.map((table) => (
            <div
              key={table.caption ?? table.headers?.join("-")}
              className="case-study__table-wrap case-study__table-wrap--item"
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
function ProjectDetailPanel({
  project,
  onClose,
  nextProject,
  prevProject,
  onOpenNext,
  onOpenPrev,
  expanded,
  onToggleExpand,
}) {
  const { language } = useAppSettings();
  const chromeSide = useWindowChromeSide();
  const labels = LABELS[language] ?? LABELS.en;
  const [imageFailed, setImageFailed] = useState(false);
  const panelRef = useRef(null);
  const scrollIdleRef = useRef(null);

  // Show a quiet scrollbar only while the reader is moving; hide when idle.
  useEffect(() => {
    const panel = panelRef.current;
    const scroller = panel?.querySelector("[data-detail-scroll]");
    if (!scroller) return undefined;
    const onScroll = () => {
      scroller.classList.add("is-scrolling");
      window.clearTimeout(scrollIdleRef.current);
      scrollIdleRef.current = window.setTimeout(() => {
        scroller.classList.remove("is-scrolling");
      }, 900);
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.clearTimeout(scrollIdleRef.current);
    };
  }, [project?.id]);

  const isZh = language === "zh";
  const detail = isZh && project.detailZh ? project.detailZh : project.detail ?? {};
  const caseStudy =
    (isZh && project.caseStudyZh ? project.caseStudyZh : project.caseStudy) ??
    null;
  const tagline = isZh && project.taglineZh ? project.taglineZh : project.tagline;
  // Fixed header slot (v2.6): project facts + a short summary of the work
  // sit under the title block, before the first numbered chapter.
  const headerFacts = (isZh && project.factsZh) || project.facts || null;
  const headerSummary = (isZh && project.summaryZh) || project.summary || null;
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
  const role = isZh && project.roleZh ? project.roleZh : project.role;
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

  // Optional story chapters (detailChapters) group the rich sections by
  // id; without them the sections stay one flat numbered list.
  const chapters =
    richSections && project.detailChapters
      ? project.detailChapters
          .map((chapter) => ({
            id: `detail-chapter-${chapter.id}`,
            label: (isZh && chapter.labelZh) || chapter.label,
            sections: chapter.sections
              .map((id) => genericSections.find((section) => section.key === id))
              .filter(Boolean),
          }))
          .filter((chapter) => chapter.sections.length)
      : null;

  // Side nav: chapter rings + nested subsection links (no rings).
  const navItems = chapters
    ? chapters.map((chapter) => ({
        id: chapter.id,
        label: chapter.label,
        children: chapter.sections.map((section) => ({
          id: `detail-${section.key}`,
          label: section.label,
        })),
      }))
    : caseStudy
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
        ref={panelRef}
        className={`vibe-detail${caseStudy ? " vibe-detail--case-study" : ""}${
          expanded ? " vibe-detail--expanded" : ""
        }`}
        data-project={project.id}
        onClick={(event) => event.stopPropagation()}
      >
        <DetailToolbar
          labels={labels}
          expanded={expanded}
          onToggleExpand={onToggleExpand}
          onClose={onClose}
          onPrev={() => prevProject && onOpenPrev?.(prevProject)}
          onNext={() => nextProject && onOpenNext?.(nextProject)}
          canPrev={Boolean(prevProject && onOpenPrev)}
          canNext={Boolean(nextProject && onOpenNext)}
          prototypeUrl={project.liveUrl || null}
          prototypeLabel={liveLabel}
          chromeSide={chromeSide}
        />
        <div className="vibe-detail__body">
        <div className="vibe-detail__layout">
          <DetailSideNav
            items={navItems}
            label={labels.contents}
            panelRef={panelRef}
          />
          {/* Only the main column scrolls — keeps the TOC from riding up at the end. */}
          <div className="vibe-detail__main-scroll" data-detail-scroll="">
          <div className="vibe-detail__main">
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
                    poster={
                      project.cardPoster || project.thumbnail || undefined
                    }
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
            <header className="vibe-detail__intro">
              <h2 className="vibe-detail__title">{project.title}</h2>
              {tagline ? (
                <p className="vibe-detail__tagline">{withFaishionLink(tagline)}</p>
              ) : null}
              {(project.timeline || project.duration || role) && (
                <div className="vibe-detail__intro-meta">
                  {project.timeline || project.duration ? (
                    <p className="vibe-detail__date">
                      {[
                        project.timeline,
                        isZh && project.durationZh
                          ? project.durationZh
                          : project.duration,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  ) : null}
                  {role ? (
                    <p className="vibe-detail__meta-role">
                      {withFaishionLink(role)}
                    </p>
                  ) : null}
                </div>
              )}
            </header>
            {headerFacts?.length || headerSummary?.length ? (
              <div className="vibe-detail__header-facts">
                {headerSummary?.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="vibe-detail__summary">
                    {withFaishionLink(paragraph)}
                  </p>
                ))}
                {headerFacts?.length ? (
                  <dl className="case-study__facts">
                    {headerFacts.map((fact) => (
                      <div key={fact.label} className="case-study__fact">
                        <dt>{fact.label}</dt>
                        {fact.lines.map((line) => (
                          <dd key={line}>{withFaishionLink(line)}</dd>
                        ))}
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            ) : null}
            {caseStudy ? <CaseStudyBody caseStudy={caseStudy} /> : null}
            {caseStudy ? null : (
              chapters ? (
                <div className="vibe-detail__sections vibe-detail__sections--chapters">
                  {chapters.map((chapter, index) => (
                    <section
                      key={chapter.id}
                      className="vibe-detail__chapter"
                      id={chapter.id}
                    >
                      <span className="vibe-detail__index" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="vibe-detail__chapter-title">{chapter.label}</h3>
                      <dl className="vibe-detail__chapter-sections">
                        {chapter.sections.map((section) => (
                          <DetailSection key={section.key} section={section} />
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              ) : (
                <dl className="vibe-detail__sections">
                  {genericSections.map((section, index) => (
                    <DetailSection
                      key={section.key}
                      section={section}
                      index={index}
                    />
                  ))}
                </dl>
              )
            )}
          </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default function VibeProjectDetail({
  project,
  onCloseStart,
  onClosed,
  nextProject,
  prevProject,
  onOpenNext,
  onOpenPrev,
}) {
  const overlayRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [closing, setClosing] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Latest callbacks in refs: the mount effect below must run exactly
  // once, or its cleanup would drop the body lock mid-handoff.
  const onCloseStartRef = useRef(onCloseStart);
  onCloseStartRef.current = onCloseStart;
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;

  // Switching projects (toolbar Next/Prev) keeps the overlay and its
  // backdrop mounted — only the panel changes. Scroll the right column
  // back to the top while the new panel eases in (see vibe-detail-rise).
  useEffect(() => {
    overlayRef.current
      ?.querySelector("[data-detail-scroll]")
      ?.scrollTo({ top: 0 });
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
      className={`vibe-detail__overlay${closing ? " is-closing" : ""}${
        expanded ? " is-expanded" : ""
      }`}
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
        prevProject={prevProject}
        onOpenNext={onOpenNext}
        onOpenPrev={onOpenPrev}
        expanded={expanded}
        onToggleExpand={() => setExpanded((value) => !value)}
      />
    </div>,
    document.body,
  );
}
