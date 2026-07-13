import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ABOUT_IMAGES,
  JOURNEY_STAGES,
  formatRoleMeta,
  pickLang,
} from "../../lib/aboutContent";
import LinkPreview from "./LinkPreview";
import JourneyReflection from "./JourneyReflection";

const LINK_PREVIEWS = {
  "luo-tao": "/t2-luo.png",
  "xiao-ruowei": "/t2-xiao.png",
  "handbook-first-edition": "/t2-book.jpg",
  "cs-energy": "/t2-csenergy.png",
  "matthew-lewis": "/t3-lewis.jpg",
  "maria-palazzi": "/t3-palazzi.png",
  "gaetan-robillard": "/t3-robillard.jpg",
};

function FadeIn({ children, className = "" }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-8% 0px -12% 0px" });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Reveal once when near the reading band; never fade out while parent is active. */
function SubsectionReveal({ children, className = "" }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    amount: 0.28,
    margin: "-18% 0px -22% 0px",
  });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0.35, y: 14 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0.35, y: 14 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function EvCar({ variant = 0 }) {
  const bodies = [
    "M6 18.5c1.2-4.2 4.8-7 10.2-7.2h18.5c4.2.2 7.2 2.6 8.6 6.4l1.4 3.8H8.2z",
    "M5.5 19c1.4-4.6 5.4-7.4 11-7.6h16.8c4.6.3 7.8 2.8 9.2 6.8l1.2 3.6H7.4z",
    "M7 18.2c1-3.8 4.4-6.6 9.6-6.8h17.2c3.8.2 6.6 2.4 8 5.8l1.6 4H8.4z",
    "M6.2 18.8c1.3-4 5-6.8 10.4-7h17.6c4 .3 7 2.5 8.4 6.2l1.5 3.8H8z",
  ];
  const cabin = [
    "M16.2 11.4h8.2c2.2 0 3.6 1.4 4 3.2H14.8c.3-1.8 1.4-3.2 1.4-3.2z",
    "M15.6 11.6h9c2.4.1 3.8 1.5 4.1 3.1H14.2c.4-1.7 1.4-3.1 1.4-3.1z",
    "M16.8 11.5h7.6c2.1 0 3.4 1.3 3.8 3.1H15.2c.3-1.7 1.5-3.1 1.6-3.1z",
    "M15.8 11.3h8.8c2.3.1 3.7 1.4 4 3.2H14.4c.4-1.8 1.4-3.2 1.4-3.2z",
  ];
  const wheelY = 21.2 + (variant % 2) * 0.25;

  return (
    <svg
      className={`about-ev__car about-ev__car--${variant}`}
      viewBox="0 0 48 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={bodies[variant % bodies.length]}
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={cabin[variant % cabin.length]}
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
      <circle
        cx="15.2"
        cy={wheelY}
        r="2.55"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      <circle
        cx="33.4"
        cy={wheelY}
        r="2.55"
        stroke="currentColor"
        strokeWidth="1.35"
      />
      {variant === 1 ? (
        <path
          d="M24.2 8.2l1.1 2.2h2.3l-1.9 1.5.7 2.3-2.2-1.4-2.2 1.4.7-2.3-1.9-1.5h2.3z"
          stroke="currentColor"
          strokeWidth="1.05"
          strokeLinejoin="round"
          opacity="0.75"
        />
      ) : null}
      {variant === 2 ? (
        <path
          d="M25.5 7.6v3.8M23.8 9.1h3.4"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.72"
        />
      ) : null}
    </svg>
  );
}

function EvCloud({ variant }) {
  const clouds = {
    0: {
      viewBox: "0 0 60 28",
      d: "M5 21C2 21 0 18.2 0 14.8C0 11.8 2 9.2 4.8 8.2C4.8 5.2 7.8 2.8 11.8 2.8C14.5 2.8 16.8 4.4 18 6.8C19.8 5.8 22.2 5.5 24.8 6.5C28.5 6.5 31.8 9.2 31.8 12.8C31.8 13.5 31.6 14.2 31.4 14.8C34.8 15.5 37.2 18.2 37.2 21.2C37.2 24.5 34.2 27 30.5 27C27.5 27 25 25.5 23.5 23.2C20.5 24 17 24.2 13.5 24.2C9.5 24.2 6.5 23 5 21Z",
      stroke: 1.25,
    },
    1: {
      viewBox: "0 0 16 14",
      d: "M3 10.5C1.5 10.5 0.5 9.2 0.5 7.6C0.5 6.2 1.4 5 2.8 4.5C2.8 3.2 4 2.2 5.6 2.2C6.8 2.2 7.8 3 8.3 4.2C9.2 3.8 10.4 3.8 11.5 4.5C12.8 4.5 14 5.8 14 7.4C14 8.8 13 10.2 11.2 10.2C10 10.2 9 9.6 8.4 8.6C7.2 9.4 5.8 9.2 4.6 8.2C4 9.2 3.4 10 3 10.5Z",
      stroke: 1.1,
    },
    2: {
      viewBox: "0 0 50 16",
      d: "M4 11.5C2 11.5 0.5 9.8 0.5 7.8C0.5 6 1.8 4.5 3.8 3.8C3.8 2.2 5.5 1 7.8 1C9.5 1 11 1.9 12 3.2C13.2 2.6 14.8 2.5 16.5 3.2C18.8 3.2 20.8 4.8 20.8 7C20.8 7.4 20.7 7.8 20.5 8.2C22.5 8.6 24 10.2 24 12C24 13.8 22.2 15.5 20 15.5C18.2 15.5 16.8 14.5 16 13.2C14.2 14 12 13.8 10.2 12.8C8.5 13.8 6.2 13.5 4.5 11.8C3.8 12.4 3.8 12 4 11.5Z",
      stroke: 1.15,
    },
    3: {
      viewBox: "0 0 22 20",
      d: "M3 15.5C1.5 15.5 0.5 14 0.5 12.2C0.5 10.6 1.5 9.2 3.2 8.6C3.2 6.8 4.8 5.4 6.8 5.4C8.2 5.4 9.4 6.2 10 7.5C11 6.8 12.5 6.6 14 7.4C15.8 7.4 17.2 8.8 17.2 10.6C17.2 11 17.1 11.4 17 11.8C18.2 12.2 19.2 13.4 19.2 14.8C19.2 16.4 17.8 17.8 16 17.8C14.6 17.8 13.5 16.9 12.8 15.6C11.6 16.4 9.8 16.2 8.6 15C7.6 15.8 6 15.6 4.8 14.2C4.2 15 3.6 15.4 3 15.5Z",
      stroke: 1.1,
    },
    4: {
      viewBox: "0 0 42 24",
      d: "M4 18.5C1.5 18.5 0 16.2 0 13.2C0 10.5 1.8 8.2 4.5 7.2C4.5 4.5 7 2.2 10.2 2.2C12.5 2.2 14.5 3.6 15.6 5.8C17 5 18.8 4.9 20.5 6C23.2 6 25.5 8 25.5 10.6C25.5 11.2 25.4 11.8 25.2 12.3C27.5 13 29.2 15.2 29.2 17.8C29.2 20.5 26.8 22.8 23.8 22.8C21.5 22.8 19.5 21.5 18.4 19.5C16.2 20.2 13.5 20.5 10.8 20.5C7.5 20.5 5 19.5 4 18.5Z",
      stroke: 1.2,
    },
  };

  const cloud = clouds[variant];

  return (
    <svg
      className={`about-ev__cloud about-ev__cloud--${variant}`}
      viewBox={cloud.viewBox}
      fill="none"
      overflow="visible"
    >
      <path
        d={cloud.d}
        stroke="currentColor"
        strokeWidth={cloud.stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EvMobilityDoodle() {
  return (
    <div className="about-ev" aria-hidden="true">
      <div className="about-ev__sky">
        {[0, 1, 2, 3, 4].map((variant) => (
          <EvCloud key={variant} variant={variant} />
        ))}
      </div>

      <svg className="about-ev__road" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
        <path
          d="M0 7.2c32-1.2 64-2 96-1.5 64.5.6 129 1.8 193 1 32-.5 64-1 96-1.4 32-.3 64-.8 96-1.2"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M12 9.6c48-.3 96-.1 144 .2M168 9.8c48 .2 96 0 132-.3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 7"
          opacity="0.45"
        />
      </svg>

      <div className="about-ev__traffic">
        {[0, 1, 2, 3].map((variant) => (
          <span
            key={variant}
            className={`about-ev__lane about-ev__lane--${variant}`}
          >
            <EvCar variant={variant} />
          </span>
        ))}
      </div>
    </div>
  );
}

function StageVisuals({ images }) {
  if (!images?.length) return null;
  const natural = images.some((image) => image.natural);
  const artifact = images.some((image) => image.artifact);
  const withMobility = images.some((image) => image.mobility);
  const strip = images.some((image) => image.strip);
  const sheet = images.some((image) => image.sheet);

  return (
    <div
      className={[
        "about-stage__visuals",
        `about-stage__visuals--${images.length}`,
        natural ? "about-stage__visuals--natural" : "",
        artifact ? "about-stage__visuals--artifact" : "",
        strip ? "about-stage__visuals--strip" : "",
        sheet ? "about-stage__visuals--sheet" : "",
        withMobility ? "about-stage__visuals--with-mobility" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {images.map((image) => {
        const src =
          image.src.startsWith("/") || image.src.startsWith("http")
            ? image.src
            : ABOUT_IMAGES[image.src];

        if (image.artifact) {
          return (
            <figure
              key={`${image.src}-${image.alt}`}
              className={[
                "about-stage__artifact",
                image.compact ? "about-stage__artifact--compact" : "",
                image.wide ? "about-stage__artifact--wide" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--about-rotate": `${image.rotate ?? -1.5}deg` }}
            >
              <span className="about-stage__artifact-tape" aria-hidden="true" />
              <img src={src} alt={image.alt} loading="lazy" />
            </figure>
          );
        }

        if (image.strip || image.sheet) {
          return (
            <figure
              key={`${image.src}-${image.alt}`}
              className={[
                "about-stage__paper",
                image.strip ? "about-stage__paper--strip" : "",
                image.sheet ? "about-stage__paper--sheet" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ "--about-rotate": `${image.rotate ?? 0}deg` }}
            >
              <span className="about-stage__artifact-tape" aria-hidden="true" />
              <img src={src} alt={image.alt} loading="lazy" />
            </figure>
          );
        }

        return (
          <figure
            key={`${image.src}-${image.alt}`}
            className={[
              "about-stage__photo",
              image.natural ? "about-stage__photo--natural" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ "--about-rotate": `${image.rotate ?? 0}deg` }}
          >
            <img src={src} alt={image.alt} loading="lazy" />
          </figure>
        );
      })}
      {withMobility ? <EvMobilityDoodle /> : null}
    </div>
  );
}

function PaperSheet({ image, className = "", taped = false }) {
  const src =
    image.src.startsWith("/") || image.src.startsWith("http")
      ? image.src
      : ABOUT_IMAGES[image.src];

  return (
    <figure
      className={["about-teach__sheet", className].filter(Boolean).join(" ")}
      style={{ "--about-rotate": `${image.rotate ?? 0}deg` }}
    >
      {taped || image.taped ? (
        <span className="about-stage__artifact-tape" aria-hidden="true" />
      ) : null}
      <img src={src} alt={image.alt} loading="lazy" />
    </figure>
  );
}

function TeachProjectsBlock({ paragraph }) {
  return (
    <div className="about-teach-projects">
      <p className="about-stage__copy about-teach-projects__copy">
        {paragraph.text}
      </p>
      <div className="about-teach-projects__stack">
        {paragraph.images.map((image, index) => (
          <PaperSheet
            key={`${image.src}-${index}`}
            image={image}
            taped
            className={`about-teach-projects__sheet about-teach-projects__sheet--${index}`}
          />
        ))}
      </div>
    </div>
  );
}

function TeachMomentBlock({ paragraph }) {
  return (
    <div className="about-teach-moment">
      <PaperSheet
        image={paragraph.image}
        className="about-teach-moment__photo"
        taped
      />
      <p className="about-stage__copy about-teach-moment__copy">
        {paragraph.text}
      </p>
    </div>
  );
}

function FashionInsertBlock({ paragraph }) {
  const side = paragraph.side === "left" ? "left" : "right";
  const variant = paragraph.variant === "single" ? "single" : "pair";

  return (
    <div
      className={[
        "about-fashion-insert",
        `about-fashion-insert--${side}`,
        `about-fashion-insert--${variant}`,
      ].join(" ")}
    >
      <p className="about-stage__copy about-fashion-insert__copy">
        {paragraph.text}
      </p>
      <div className="about-fashion-insert__stack">
        {paragraph.images.map((image, index) => (
          <PaperSheet
            key={`${image.src}-${index}`}
            image={image}
            taped
            className={`about-fashion-insert__sheet about-fashion-insert__sheet--${index}`}
          />
        ))}
      </div>
    </div>
  );
}

function RichCopy({ paragraph, language }) {
  if (typeof paragraph === "string") {
    return <p className="about-stage__copy">{paragraph}</p>;
  }

  if (paragraph?.type === "teach-projects") {
    return <TeachProjectsBlock paragraph={paragraph} />;
  }

  if (paragraph?.type === "teach-moment") {
    return <TeachMomentBlock paragraph={paragraph} />;
  }

  if (paragraph?.type === "fashion-insert") {
    return <FashionInsertBlock paragraph={paragraph} />;
  }

  if (paragraph?.type === "rich" && Array.isArray(paragraph.parts)) {
    return (
      <p className="about-stage__copy">
        {paragraph.parts.map((part, index) => {
          if (part.href) {
            return (
              <LinkPreview
                key={`${part.text}-${index}`}
                href={part.href}
                previewSrc={LINK_PREVIEWS[part.preview]}
                title={pickLang(part.title, language) || part.title}
                source={
                  part.source
                    ? pickLang(part.source, language) || part.source
                    : undefined
                }
                rating={part.rating}
                italic={Boolean(part.italic)}
              >
                {part.text}
              </LinkPreview>
            );
          }
          return <span key={`${part.text}-${index}`}>{part.text}</span>;
        })}
      </p>
    );
  }

  return null;
}

function ExperienceMeta({ item, language }) {
  const organization = pickLang(item.organization, language);
  const period = pickLang(item.period, language);
  if (!organization && !period) return null;

  const link = item.organizationLink;
  const orgNode =
    organization && link ? (
      <LinkPreview
        href={link.href}
        previewSrc={LINK_PREVIEWS[link.preview]}
        title={pickLang(link.title, language) || organization}
        source={pickLang(link.source, language)}
      >
        {organization}
      </LinkPreview>
    ) : (
      organization
    );

  return (
    <p className="about-stage__meta">
      {orgNode}
      {organization && period ? " · " : null}
      {period}
    </p>
  );
}

function SubsectionBodyParagraphs({ body, language }) {
  return (body ?? []).flatMap((paragraph, index) => {
    if (typeof paragraph === "string") {
      return paragraph.split("\n").map((line, lineIndex) => (
        <p
          key={`${paragraph}-${lineIndex}`}
          className="about-stage__copy"
        >
          {line}
        </p>
      ));
    }

    return (
      <RichCopy
        key={`sub-rich-${index}`}
        paragraph={paragraph}
        language={language}
      />
    );
  });
}

function BoatDoodle() {
  return (
    <div
      className="about-stage__doodle about-stage__doodle--boat"
      aria-hidden="true"
    >
      <svg
        className="about-stage__doodle-svg"
        viewBox="0 0 96 58"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Slightly crooked mast */}
        <path
          d="M48 36V14"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
        />
        {/* Loose sail */}
        <path
          d="M49 16c8 2 14 8 16 16-10-1-18-2-24-1 2-6 5-11 8-15z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Boat hull */}
        <path
          d="M18 38c6 6 22 9 42 4 8-2 14-5 16-8-14 1-32 1-48-1-4-.4-8 1.5-10 5z"
          stroke="currentColor"
          strokeWidth="1.55"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 34c10 1.2 26 1.8 38-.8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Water lines */}
        <path
          d="M12 48c5 1.5 9-1 14 0.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.65"
        />
        <path
          d="M36 51c6 1.2 11-1.2 17 0.4"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M62 49c5 1.4 9-0.8 14 0.6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

function StageBody({ stage, language, isActive }) {
  if (stage.transition) {
    return (
      <div className="about-stage__content about-stage__content--transition">
        <JourneyReflection text={pickLang(stage.prompt, language)} />
      </div>
    );
  }

  const paragraphs = pickLang(stage.body, language) ?? [];
  const subsections = stage.subsections;
  const meta = formatRoleMeta(stage, language);

  return (
    <div className="about-stage__content">
      <h3 className="about-stage__title">{pickLang(stage.title, language)}</h3>

      {meta ? <p className="about-stage__meta">{meta}</p> : null}

      {stage.intro ? (
        <div className="about-stage__intro">
          {pickLang(stage.intro, language)
            .split("\n")
            .filter(Boolean)
            .map((line) => (
              <p key={line}>{line}</p>
            ))}
        </div>
      ) : null}

      {paragraphs.map((paragraph, index) => {
        const showBoat = stage.doodle === "boat" && index === 0;

        if (showBoat && typeof paragraph === "string") {
          return (
            <div key={paragraph} className="about-stage__copy-with-doodle">
              <p className="about-stage__copy">{paragraph}</p>
              <BoatDoodle />
            </div>
          );
        }

        if (typeof paragraph === "string") {
          return (
            <p key={paragraph} className="about-stage__copy">
              {paragraph}
            </p>
          );
        }

        return (
          <RichCopy
            key={`rich-${index}`}
            paragraph={paragraph}
            language={language}
          />
        );
      })}

      {subsections?.map((subsection) => {
        const body = (
          <>
            <h4>{pickLang(subsection.title, language)}</h4>
            <ExperienceMeta item={subsection} language={language} />
            <SubsectionBodyParagraphs
              body={pickLang(subsection.body, language)}
              language={language}
            />
            {subsection.learning ? (
              <JourneyReflection
                text={pickLang(subsection.learning, language)}
              />
            ) : null}
            {subsection.highlight ? (
              <JourneyReflection
                text={pickLang(subsection.highlight, language)}
              />
            ) : null}
            {subsection.topics ? (
              <p className="about-stage__topics">
                {pickLang(subsection.topics, language).join("  ·  ")}
              </p>
            ) : null}
            <StageVisuals images={subsection.images} />
            {subsection.closing ? (
              <RichCopy
                paragraph={pickLang(subsection.closing, language)}
                language={language}
              />
            ) : null}
            {subsection.projects?.map((project, projectIndex) => {
              const projectTitle = pickLang(project.title, language);
              return (
                <div
                  key={projectTitle || `project-${projectIndex}`}
                  className="about-stage__project"
                >
                  {projectTitle ? (
                    <h5 className="about-stage__project-title">
                      {projectTitle}
                    </h5>
                  ) : null}
                  <SubsectionBodyParagraphs
                    body={pickLang(project.body, language)}
                    language={language}
                  />
                </div>
              );
            })}
          </>
        );

        return isActive ? (
          <SubsectionReveal
            key={pickLang(subsection.title, language)}
            className="about-stage__sub"
          >
            {body}
          </SubsectionReveal>
        ) : (
          <div
            key={pickLang(subsection.title, language)}
            className="about-stage__sub"
          >
            {body}
          </div>
        );
      })}

      {stage.highlight ? (
        <JourneyReflection text={pickLang(stage.highlight, language)} />
      ) : null}

      {stage.note ? (
        <p className="about-stage__note">{pickLang(stage.note, language)}</p>
      ) : null}

      {stage.topics ? (
        <p className="about-stage__topics">
          {pickLang(stage.topics, language).join("  ·  ")}
        </p>
      ) : null}

      {stage.images ? <StageVisuals images={stage.images} /> : null}
    </div>
  );
}

function JourneySection({
  stage,
  language,
  index,
  activeIndex,
  arrivingIndex,
}) {
  const isActive = activeIndex === index;
  const isPast = activeIndex > index;
  const isArriving = arrivingIndex === index;

  return (
    <article
      id={`about-stage-${stage.id}`}
      className={[
        "about-stage",
        stage.compact ? "about-stage--compact" : "",
        stage.rich ? "about-stage--rich" : "",
        stage.transition ? "about-stage--transition" : "",
        isActive ? "is-active" : "",
        isPast ? "is-past" : "",
        isArriving ? "is-arriving" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="about-stage__timeline-meta" aria-hidden="true">
        {stage.transition ? null : (
          <span className="about-stage__year-mark">
            {pickLang(stage.year, language)}
          </span>
        )}
      </div>

      <div className="about-stage__rail" aria-hidden="true">
        <span className="about-stage__node" />
      </div>

      <FadeIn className="about-stage__body">
        <StageBody stage={stage} language={language} isActive={isActive} />
      </FadeIn>
    </article>
  );
}

function MovingTimelineLabel({
  stage,
  language,
  indicatorY,
  reduceMotion,
}) {
  if (stage.transition) {
    return (
      <div
        className="about-journey__moving-label about-journey__moving-label--quiet"
        style={{
          top: `${indicatorY}px`,
          transition: reduceMotion ? "none" : undefined,
        }}
        aria-hidden="true"
      />
    );
  }

  const year = pickLang(stage.year, language);
  const phase = pickLang(stage.phase, language);

  return (
    <div
      className="about-journey__moving-label"
      style={{
        top: `${indicatorY}px`,
        transition: reduceMotion ? "none" : undefined,
      }}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${year}-${phase}`}
          className="about-journey__moving-label-content"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{
            duration: 0.34,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="about-journey__moving-year">{year}</div>
          <div className="about-journey__moving-phase">{phase}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function measureNodeCenters(railEl, nodeEls) {
  if (!railEl) return [];
  const railTop = railEl.getBoundingClientRect().top;
  return nodeEls.map((node) => {
    if (!node) return 0;
    const rect = node.getBoundingClientRect();
    return rect.top - railTop + rect.height / 2;
  });
}

/** Active while indicator is within [sectionStart, nextSectionStart). */
function pickActiveByRange(indicatorY, sectionStarts, railHeight) {
  if (!sectionStarts.length) return 0;

  for (let index = 0; index < sectionStarts.length; index += 1) {
    const start = sectionStarts[index];
    const end =
      index < sectionStarts.length - 1
        ? sectionStarts[index + 1]
        : railHeight + 1;
    if (indicatorY >= start && indicatorY < end) {
      return index;
    }
  }

  return sectionStarts.length - 1;
}

export default function JourneyTimeline({ copy, language }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorY, setIndicatorY] = useState(0);
  const [railOriginY, setRailOriginY] = useState(0);
  const [arrivingIndex, setArrivingIndex] = useState(-1);
  const trackRef = useRef(null);
  const railRef = useRef(null);
  const arrivedRef = useRef(new Set());
  const prevIndicatorYRef = useRef(0);
  const arrivalTimerRef = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const track = trackRef.current;
      const rail = railRef.current;
      if (!track || !rail) return;

      const sections = [...track.querySelectorAll(":scope > .about-stage")];
      if (!sections.length) return;

      const nodes = sections.map((section) =>
        section.querySelector(".about-stage__node")
      );

      const railRect = rail.getBoundingClientRect();
      const railHeight = rail.offsetHeight || railRect.height;
      if (railHeight <= 0) return;

      const centers = measureNodeCenters(rail, nodes);
      const firstNodeY = centers[0] ?? 0;
      // Activate a stage from its node until the next node — not the midpoint.
      // Midpoints make long stages (e.g. 2023–2024) flip to the next label
      // while the user is still reading that stage's later subsections.
      const sectionStarts = centers.map((center, index) => {
        if (index === 0) return 0;
        return center;
      });

      // Reading anchor slightly above viewport center.
      const viewportAnchorY = window.innerHeight * 0.42;
      // Timeline begins at the first milestone node — not above it.
      const timelineStart = railRect.top + firstNodeY;
      const timelineEnd = railRect.bottom;
      const span = Math.max(timelineEnd - timelineStart, 1);

      const scrollProgress = clamp(
        (viewportAnchorY - timelineStart) / span,
        0,
        1
      );
      const nextY = firstNodeY + scrollProgress * (railHeight - firstNodeY);
      const nextActive = pickActiveByRange(nextY, sectionStarts, railHeight);

      // Milestone arrival — once per downward pass when crossing a node.
      const prevY = prevIndicatorYRef.current;
      centers.forEach((center, index) => {
        const crossedDown = prevY < center && nextY >= center;
        const wentAbove = nextY < center - 12;

        if (wentAbove) {
          arrivedRef.current.delete(index);
        }

        if (crossedDown && !arrivedRef.current.has(index) && !reduceMotion) {
          arrivedRef.current.add(index);
          setArrivingIndex(index);
          window.clearTimeout(arrivalTimerRef.current);
          arrivalTimerRef.current = window.setTimeout(() => {
            setArrivingIndex((current) => (current === index ? -1 : current));
          }, 520);
        }
      });

      prevIndicatorYRef.current = nextY;
      setRailOriginY((prev) =>
        Math.abs(prev - firstNodeY) < 0.4 ? prev : firstNodeY
      );
      setActiveIndex((prev) => (prev === nextActive ? prev : nextActive));
      setIndicatorY((prev) => (Math.abs(prev - nextY) < 0.4 ? prev : nextY));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    schedule();

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(schedule)
        : null;
    if (trackRef.current && resizeObserver) {
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      resizeObserver?.disconnect();
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(arrivalTimerRef.current);
    };
  }, [language, reduceMotion]);

  // Progress ends exactly at the circle center — never above it.
  const progressHeight = Math.max(indicatorY - railOriginY, 0);
  const activeStage = JOURNEY_STAGES[activeIndex] ?? JOURNEY_STAGES[0];
  const motionTransition = reduceMotion ? "none" : undefined;

  return (
    <section className="about-journey" aria-labelledby="about-journey-heading">
      <div className="about-journey__intro">
        <h2 id="about-journey-heading" className="about-section-heading">
          {copy.heading}
        </h2>
        <p className="about-journey__support">{copy.support}</p>
      </div>

      <div ref={trackRef} className="about-journey__track">
        <div ref={railRef} className="about-journey__rail-wrapper">
          <div
            className="about-journey__base-line"
            style={{ top: `${railOriginY}px` }}
            aria-hidden="true"
          />
          <div
            className="about-journey__progress-line"
            style={{
              top: `${railOriginY}px`,
              height: `${progressHeight}px`,
            }}
            aria-hidden="true"
          />

          <MovingTimelineLabel
            stage={activeStage}
            language={language}
            indicatorY={indicatorY}
            reduceMotion={reduceMotion}
          />

          <div
            className="about-journey__active-indicator"
            style={{
              top: `${indicatorY}px`,
              transition: motionTransition,
            }}
            aria-hidden="true"
          >
            <span className="about-journey__active-pulse" />
            <span className="about-journey__active-core" />
          </div>
        </div>

        {JOURNEY_STAGES.map((stage, index) => (
          <JourneySection
            key={stage.id}
            stage={stage}
            language={language}
            index={index}
            activeIndex={activeIndex}
            arrivingIndex={arrivingIndex}
          />
        ))}
      </div>
    </section>
  );
}
