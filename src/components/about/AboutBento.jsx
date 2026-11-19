import { Fragment, useState } from "react";
import { LayoutGroup } from "framer-motion";
import { MakingLoop } from "./AboutInteractions";
import { BrickSource, TraitBricks } from "./TraitBricks";
import VolunteerGarden from "./VolunteerGarden";

/**
 * About as a bento board — same grammar as Home: a page header, then flat
 * gray tiles with a quiet lowercase kicker, a small heading and gray body
 * copy. Traits read in the essay's order; the loop sits inside "making";
 * Experience closes the board as its own tile.
 */
const KICKERS = {
  en: {
    doubt: "questions",
    possibilities: "possibilities",
    making: "making",
    true: "honesty",
    loop: "my workflow",
  },
  zh: {
    doubt: "提问",
    possibilities: "可能",
    making: "动手",
    true: "诚实",
    loop: "我的工作流程",
  },
};

function paragraphKey(paragraph) {
  if (typeof paragraph === "string") return paragraph;
  if (Array.isArray(paragraph)) {
    return paragraph.map((part) => part.t).join("");
  }
  return String(paragraph);
}

function AboutParagraph({ paragraph }) {
  if (typeof paragraph === "string") {
    return <p>{paragraph}</p>;
  }
  if (!Array.isArray(paragraph)) return null;
  return (
    <p>
      {paragraph.map((part) =>
        part.href ? (
          <a
            key={`${part.t}-${part.href}`}
            className="site-text-link"
            href={part.href}
            target="_blank"
            rel="noreferrer"
          >
            {part.t}
            <span className="external-arrow" aria-hidden="true">
              ↗︎
            </span>
          </a>
        ) : (
          <span key={part.t}>{part.t}</span>
        ),
      )}
    </p>
  );
}

function TraitTile({ section, kicker, brick }) {
  // The loop has its own tile (LoopTile); its caption ("Put together, it
  // becomes a loop:") goes with it.
  const paragraphs = section.diagram
    ? section.paragraphs.slice(0, -1)
    : section.paragraphs;

  const text = (
    <>
      <p className="bento-tile__kicker about-tile__kicker">{kicker}</p>
      <h2 id={`about-${section.id}`} className="about-tile__title" tabIndex={-1}>
        {section.title}
      </h2>
      <div className="about-tile__body">
        {paragraphs.map((paragraph) => (
          <AboutParagraph key={paragraphKey(paragraph)} paragraph={paragraph} />
        ))}
      </div>
    </>
  );

  return (
    <section
      className={`bento-tile about-tile about-tile--${section.id}`}
      aria-labelledby={`about-${section.id}`}
    >
      {brick}
      {text}
    </section>
  );
}

/** Making's loop as its own tile, beside Making. Splitting it out lets
 *  Making carry its block top-right like every other trait tile. */
function LoopTile({ section, kicker, processSteps, language }) {
  return (
    <section className="bento-tile about-tile about-tile--loop" aria-label={kicker}>
      <p className="bento-tile__kicker about-tile__kicker">{kicker}</p>
      <MakingLoop
        steps={processSteps}
        language={language}
        caption={section.paragraphs[section.paragraphs.length - 1]}
      />
    </section>
  );
}

/** Experience as Home's hobby strips: one row per role, sticker tilts on hover. */
function ExperienceStack({ title, items, linkedIn, linkedInLabel }) {
  return (
    <section className="about-roles" aria-labelledby="about-experience-title">
      <p id="about-experience-title" className="bento-tile__kicker about-roles__kicker">
        {title}
      </p>
      <ul className="about-roles__list">
        {items.map((item, index) => {
          const Strip = item.href ? "a" : "article";
          return (
            <li key={`${item.period}-${item.role}`}>
              <Strip
                className="bento-tile hobby-strip about-roles__strip"
                {...(item.href
                  ? { href: item.href, target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                <span
                  className="hobby-strip__sticker"
                  style={{ "--sticker-tilt": `${index % 2 ? 4 : -4}deg` }}
                  aria-hidden="true"
                >
                  {item.icon ? (
                    <img src={item.icon} alt="" loading="lazy" decoding="async" />
                  ) : (
                    <span className="about-roles__initial">
                      {item.initial || item.org?.[0] || "·"}
                    </span>
                  )}
                </span>
                <span className="hobby-strip__copy">
                  <span className="hobby-strip__title">
                    {item.org}
                    {item.href ? (
                      <span className="external-arrow" aria-hidden="true">
                        {" "}↗︎
                      </span>
                    ) : null}
                  </span>
                  <span className="hobby-strip__note">
                    {item.role} · {item.period}
                  </span>
                </span>
              </Strip>
            </li>
          );
        })}
      </ul>
      <a
        className="about-tile__more"
        href={linkedIn}
        target="_blank"
        rel="noreferrer"
      >
        {linkedInLabel}
        <span className="about-tile__more-arrow" aria-hidden="true">↗︎</span>
      </a>
    </section>
  );
}

export default function AboutBento({ copy, language, experience }) {
  const [bricks, setBricks] = useState({});
  const essay = copy.essay;

  function collect(id) {
    setBricks((current) => current[id] ? current : { ...current, [id]: "collected" });
  }

  function togglePlacement(id, placeOnly) {
    // Re-insert the key last, so key order is last-changed order: the
    // tower stacks blocks in the order they were placed.
    setBricks((current) => {
      const { [id]: state, ...rest } = current;
      return {
        ...rest,
        [id]: !placeOnly && state === "placed" ? "collected" : "placed",
      };
    });
  }
  const kickers = KICKERS[language] ?? KICKERS.en;
  const note = [essay.quote?.translation, essay.roadmap].filter(Boolean);

  return (
    <div className="about-bento">
      <header className="projects-page__header about-bento__header">
        <p className="projects-page__title about-bento__motto" lang="la">
          {essay.quote?.original}
        </p>
        {note.length ? (
          <p className="projects-page__note">
            <span className="about-bento__translation">{note[0]}</span>{" "}
            {note.slice(1).join(" ")}
          </p>
        ) : null}
      </header>

      <LayoutGroup>
        <div className="about-bento__grid">
          {essay.sections.map((section) => (
            <Fragment key={section.id}>
              {/* Volunteering sits beside "honesty" (the photo stack that
                  was here is retired). */}
              {section.id === "true" ? (
                <VolunteerGarden language={language} stacked />
              ) : null}
              <TraitTile
                section={section}
                kicker={kickers[section.id] ?? section.id}
                brick={<BrickSource id={section.id} language={language} collected={Boolean(bricks[section.id])} onCollect={collect} />}
              />
              {section.id === "doubt" && (
                <TraitBricks language={language} bricks={bricks} onPlace={togglePlacement} />
              )}
              {section.diagram ? (
                <LoopTile
                  section={section}
                  kicker={kickers.loop}
                  processSteps={copy.processSteps}
                  language={language}
                />
              ) : null}
            </Fragment>
          ))}
          {experience.items.length ? <ExperienceStack {...experience} /> : null}
        </div>
      </LayoutGroup>
    </div>
  );
}
