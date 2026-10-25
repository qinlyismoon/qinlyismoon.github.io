// Card for a selected work on the Case Studies page.
// Same visual card system as the vibe cards; the whole card is an external
// link to the Notion case study, so the title carries the external-link
// arrow. The thumbnail falls back to a text-only card if the image is
// missing.
import { useEffect, useRef, useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

/** Defer hero-video bytes until the card is near the viewport. */
function LazyHeroVideo({ src, poster }) {
  const hostRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return undefined;
    const video = videoRef.current;
    if (!video) return undefined;
    video.play().catch(() => {});
    return undefined;
  }, [shouldLoad]);

  return (
    <div ref={hostRef} className="vibe-card__thumbnail" aria-hidden="true">
      {shouldLoad ? (
        <video
          ref={videoRef}
          className="vibe-card__image vibe-card__video"
          src={src}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : poster ? (
        <img
          src={poster}
          alt=""
          className="vibe-card__image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="vibe-card__placeholder" />
      )}
    </div>
  );
}

export default function SelectedWorkCard({ project, onHover, onOpen }) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const description =
    isZh && project.descriptionZh ? project.descriptionZh : project.description;
  // Tags never translate: they are English category labels in every
  // language, so they are read directly with no Zh variant.
  const tags = project.tags;
  const [imageFailed, setImageFailed] = useState(false);
  const showVideo = Boolean(project.heroVideo);
  const showImage = !showVideo && project.thumbnail && !imageFailed;
  const showThumb = showVideo || showImage || Boolean(project.placeholder);

  const thumbnail = showThumb ? (
    showVideo ? (
      <LazyHeroVideo src={project.heroVideo} poster={project.thumbnail} />
    ) : (
      <div className="vibe-card__thumbnail" aria-hidden="true">
        {showImage ? (
          <img
            src={project.thumbnail}
            alt=""
            className="vibe-card__image"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="vibe-card__placeholder">
            <span className="vibe-card__placeholder-mark">
              {project.placeholder}
            </span>
          </div>
        )}
      </div>
    )
  ) : null;

  // v2.2.1: projects with a live website follow the vibe card pattern —
  // the card is a button that opens the introduction modal, which then
  // offers the live site and the case study. Native detail content
  // (detail / detailSections) takes the same path — the card opens
  // the in-site detail and never sends the reader out to Notion.
  if ((project.liveUrl || project.detail || project.detailSections) && onOpen) {
    return (
      <article className="vibe-card">
        <button
          type="button"
          className="vibe-card__button"
          onClick={() => onOpen(project)}
          onMouseEnter={() => onHover?.(project)}
          onMouseLeave={() => onHover?.(null)}
          onFocus={() => onHover?.(project)}
          onBlur={() => onHover?.(null)}
          aria-label={`View details for ${project.title}`}
        >
          {thumbnail}
          <div className="vibe-card__body">
            <h3 className="vibe-card__title">{project.title}</h3>
            <p className="vibe-card__description">{description}</p>
            {tags?.length ? (
              <ul className="vibe-card__tags" aria-label="Tags">
                {tags.map((tag) => (
                  <li key={tag} className="vibe-card__tag">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </button>
      </article>
    );
  }

  return (
    <article className="vibe-card">
      <a
        className="vibe-card__link"
        href={project.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => onHover?.(project)}
        onMouseLeave={() => onHover?.(null)}
        onFocus={() => onHover?.(project)}
        onBlur={() => onHover?.(null)}
        aria-label={`Read the ${project.title} case study on Notion`}
      >
        {thumbnail}
        <div className="vibe-card__body">
          <h3 className="vibe-card__title">
            {project.title}
            <span className="vibe-card__external" aria-hidden="true">
              ↗︎
            </span>
          </h3>
          <p className="vibe-card__description">{description}</p>
          {tags?.length ? (
            <ul className="vibe-card__tags" aria-label="Tags">
              {tags.map((tag) => (
                <li key={tag} className="vibe-card__tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </a>
    </article>
  );
}
