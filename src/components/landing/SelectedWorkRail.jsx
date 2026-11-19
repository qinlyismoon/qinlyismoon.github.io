import { useEffect, useRef, useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

/**
 * Selected projects on Home — chapter-level horizontal rail
 * (bridge + kicker + peeking photo cards; no gray tray).
 */

function HoverCardMedia({
  video,
  poster,
  objectPosition,
  zoom,
  zoomHover,
  active,
}) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!active || !video) return;
    setShouldLoad(true);
  }, [active, video]);

  useEffect(() => {
    if (!shouldLoad || !video) return undefined;
    const el = videoRef.current;
    if (!el) return undefined;
    if (active) {
      el.play().catch(() => {});
    } else {
      el.pause();
      try {
        el.currentTime = 0;
      } catch {
        /* ignore seek before metadata */
      }
    }
    return undefined;
  }, [active, shouldLoad, video]);

  if (!video && !poster) {
    return (
      <div className="selected-rail__media">
        <div className="selected-rail__placeholder" />
      </div>
    );
  }

  const mediaStyle = {
    ...(objectPosition
      ? {
          "--media-pos": objectPosition,
          "--media-origin": objectPosition,
        }
      : null),
    ...(zoom ? { "--media-zoom": zoom } : null),
    ...(zoomHover ? { "--media-zoom-hover": zoomHover } : null),
  };

  return (
    <div
      className={`selected-rail__media${active ? " is-playing" : ""}`}
      style={mediaStyle}
    >
      {poster ? (
        <img
          className="selected-rail__still"
          src={poster}
          alt=""
          loading="lazy"
          decoding="async"
        />
      ) : null}
      {video && shouldLoad ? (
        <video
          ref={videoRef}
          className="selected-rail__video"
          src={video}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
        />
      ) : null}
    </div>
  );
}

function SelectedWorkCard({ project, onOpen, isZh }) {
  const [active, setActive] = useState(false);
  const reduceMotion = useRef(false);
  // Touch / coarse pointers: ignore hover. Sticky :hover on phones was
  // zooming the still and dropping the shade without opening the project.
  const fineHover = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    fineHover.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
  }, []);

  const video = project.heroVideo || null;
  const poster = project.cardPoster || project.thumbnail || null;
  const subtitle = project.subtitle;

  const setHover = (next) => {
    if (reduceMotion.current || !fineHover.current) return;
    setActive(next);
  };

  return (
    <article className="selected-rail__card">
      <button
        type="button"
        className="selected-rail__card-btn"
        onClick={() => onOpen?.(project)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label={isZh ? `查看 ${project.title}` : `View ${project.title}`}
      >
        <HoverCardMedia
          video={video}
          poster={poster}
          objectPosition={project.cardObjectPosition}
          zoom={project.cardZoom}
          zoomHover={project.cardZoomHover}
          active={active}
        />
        {/* Shade sits beside media, not inside it — iOS scroll + media
            transforms were dropping the gradient when it lived under
            overflow/scale on the image layer. */}
        <div className="selected-rail__shade" aria-hidden="true" />
        <div className="selected-rail__meta">
          <h3 className="selected-rail__card-title">{project.title}</h3>
          {subtitle ? (
            <p className="selected-rail__card-sub">{subtitle}</p>
          ) : null}
        </div>
      </button>
    </article>
  );
}

export default function SelectedWorkRail({
  projects,
  onOpen,
  bridge,
  title,
  frameLabel,
  allLabel,
  onOpenAll,
}) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const label = frameLabel || title || (isZh ? "精选作品" : "Selected work");
  const scrollerRef = useRef(null);
  const scrollIdleRef = useRef(null);

  // Quiet scrollbar only while moving — same pattern as project detail.
  useEffect(() => {
    const scroller = scrollerRef.current;
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
  }, []);

  return (
    <section
      className="selected-rail home-bento__chapter"
      aria-label={label}
    >
      {/* One header, read top-down: what this section is (a real section
          title, not a 12px tile label), what's in it (one gray line), and
          the way to everything else. Before, a body-size sentence starting
          "Selected work…" came first and read as the end of About, with
          the label tucked under it in the page's faintest type. */}
      <header className="selected-rail__head">
        <div className="selected-rail__heading">
          <h2 className="selected-rail__title">{label}</h2>
          {bridge ? <p className="selected-rail__note">{bridge}</p> : null}
        </div>
        {onOpenAll ? (
          <button
            type="button"
            className="home-about-tile__more selected-rail__all"
            onClick={onOpenAll}
          >
            {allLabel || (isZh ? "全部作品" : "All projects")}
            <span className="home-about-tile__more-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ) : null}
      </header>

      <div
        className="selected-rail__scroller"
        ref={scrollerRef}
        tabIndex={0}
      >
        <div className="selected-rail__track">
          {projects.map((project) => (
            <SelectedWorkCard
              key={project.id}
              project={project}
              onOpen={onOpen}
              isZh={isZh}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
