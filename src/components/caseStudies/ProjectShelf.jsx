// Projects page as a library: each section is one shelf (a bento tile),
// each project a book. At rest one book is pulled out — cover, title,
// summary — and the rest stand as spines. Pointing at a spine pulls that
// book out (the others slide back); its words arrive a beat after the
// book has opened, so text never reflows while the width moves. Click or
// Enter opens the case study.
//
// Touch (no hover), the rules are explicit:
//   1. Tapping a spine pulls the book out — it never navigates.
//   2. In an open book only the cover and the "Open" button go to the case
//      study; the words don't react, so reading or scrolling can't
//      mis-fire.
//   3. The row you tapped stays under your finger: when the book closing
//      above it shrinks, the page scroll is compensated frame by frame.
//   4. Tapping the open book elsewhere does nothing — a shelf always has
//      one book out, as on desktop.
// Narrow screens stack the shelf vertically (spines become rows).
import { useEffect, useRef, useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import "./project-shelf.css";

/** Pause between pointer arriving and the book moving, so sweeping the
 *  mouse across a shelf doesn't make every book twitch. */
const PULL_INTENT_MS = 40;

/** Pull duration (--pull-dur) plus a margin. */
const VIDEO_AFTER_MS = 720;

/** The tapped row is held in place for at least the pull, and until the
 *  layout has settled — capped, so it can never fight the user for long. */
const HOLD_MIN_MS = 560;
const HOLD_MAX_MS = 1600;

/**
 * Where to look in each cover. A closed book shows a tall, narrow strip
 * of its cover; an open book a near-square cover. Centre-cropping both
 * cut phones in half or landed on empty background, so each project
 * names its subject: [x y] for the spine strip, [x y] for the open cover.
 * The crop glides from one to the other as the book is pulled.
 */
export const SHELF_FOCUS = {
  "color-analysis": { spine: ["21%", "50%"], open: ["40%", "50%"] }, // face phone
  "leaf-note-case": { spine: ["47%", "50%"], open: ["45%", "50%"] }, // handoff cards
  "money-map": { spine: ["50%", "50%"], open: ["50%", "50%"] }, // the phone
  "swim-balance": { spine: ["72%", "50%"], open: ["70%", "50%"] }, // "Today" phone
  "oscar-ar": { spine: ["38%", "50%"], open: ["60%", "50%"] }, // book, then book + AR
  "procedural-animation": { spine: ["52%", "50%"], open: ["52%", "50%"] }, // hot pot
  "whose-dreams": { spine: ["38%", "50%"], open: ["45%", "50%"] }, // sticky notes
  "emotion-garden": { spine: ["68%", "50%"], open: ["65%", "50%"] }, // flowers
  "onomichi-furin": { spine: ["45%", "50%"], open: ["50%", "50%"] }, // bells
};

function focusStyle(project) {
  const focus = SHELF_FOCUS[project.id];
  if (!focus) {
    return project.cardObjectPosition
      ? { objectPosition: project.cardObjectPosition }
      : undefined;
  }
  return {
    "--spine-x": focus.spine[0],
    "--spine-y": focus.spine[1],
    "--open-x": focus.open[0],
    "--open-y": focus.open[1],
  };
}

function BookCover({ project, open }) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);
  const poster = project.cardPoster || project.thumbnail;
  // The video mounts only after the pull has finished: decoding its
  // first frame mid-animation dropped frames exactly while the book was
  // moving. Until then the poster stands in (same frame).
  // Same for an animated cover (GIF): it plays only on the open book —
  // closed books stay still and quiet — and arrives after the pull.
  const moving = project.heroVideo || project.animatedCover;
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    if (!open || !moving) {
      setSettled(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setSettled(true), VIDEO_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [open, moving]);
  const playVideo = settled;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playVideo) video.play().catch(() => {});
    else video.pause();
  }, [playVideo]);

  const style = focusStyle(project);

  return (
    <div className="shelf-book__cover" aria-hidden="true">
      {poster && !failed ? (
        <img
          src={poster}
          alt=""
          className="shelf-book__image"
          style={style}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : null}
      {!project.heroVideo && project.animatedCover && settled ? (
        <img
          src={project.animatedCover}
          alt=""
          className="shelf-book__image shelf-book__video"
          style={style}
          decoding="async"
        />
      ) : null}
      {project.heroVideo && settled ? (
        <video
          ref={videoRef}
          className="shelf-book__image shelf-book__video"
          style={style}
          src={project.heroVideo}
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

function Book({ project, open, index, onPull, onOpen, onHover, coarse }) {
  const itemRef = useRef(null);
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const title = (isZh && project.titleZh) || project.title;
  const description =
    (isZh && project.descriptionZh) || project.description;
  const tint = project.panelBackground;

  const handleClick = (event) => {
    if (coarse) {
      if (!open) {
        onPull(index, false, itemRef.current);
        onHover?.(project);
        return;
      }
      // Open book on touch: only the cover and the Open button navigate.
      if (!event.target.closest(".shelf-book__cover, .shelf-book__cue")) return;
    }
    onOpen(project);
  };

  return (
    <li
      ref={itemRef}
      className={`shelf-book${open ? " is-open" : ""}`}
      style={tint ? { "--book-tint": tint } : undefined}
    >
      <button
        type="button"
        className="shelf-book__button"
        onClick={handleClick}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") onPull(index, true);
          onHover?.(project);
        }}
        onFocus={() => {
          onPull(index);
          onHover?.(project);
        }}
        onBlur={() => onHover?.(null)}
        aria-expanded={open}
        aria-label={
          isZh ? `查看 ${title} 详情` : `View details for ${project.title}`
        }
      >
        <BookCover project={project} open={open} />

        {/* Spine: what a closed book shows. */}
        <span className="shelf-book__spine" aria-hidden="true">
          <span className="shelf-book__spine-title">{title}</span>
          {project.timeline ? (
            <span className="shelf-book__spine-year">{project.timeline}</span>
          ) : null}
        </span>

        {/* Pages: what a pulled-out book shows, after it has opened. */}
        <span className="shelf-book__body">
          <span className="shelf-book__title">{title}</span>
          <span className="shelf-book__description">{description}</span>
          {project.tags?.length ? (
            <span className="shelf-book__tags">
              {project.tags.map((tag) => (
                <span key={tag} className="shelf-book__tag">
                  {tag}
                </span>
              ))}
            </span>
          ) : null}
          <span className="shelf-book__cue">
            {isZh ? "翻开" : "Open"}
            <span className="shelf-book__cue-arrow" aria-hidden="true">→</span>
          </span>
        </span>
      </button>
    </li>
  );
}

/** The element that actually scrolls the page around `el` (the site
 *  layout scrolls an inner panel, not the window). */
function scrollParentOf(el) {
  for (let node = el.parentElement; node; node = node.parentElement) {
    const { overflowY } = getComputedStyle(node);
    if (/(auto|scroll)/.test(overflowY) && node.scrollHeight > node.clientHeight + 1) {
      return node;
    }
  }
  return document.scrollingElement || document.documentElement;
}

/** Keep `el` at the same spot on screen while the shelf re-lays out
 *  (the book closing above it shrinks and would drag it upward). Only
 *  matters when the shelf is stacked vertically. */
function holdInPlace(el) {
  const row = el.parentElement;
  if (!row || getComputedStyle(row).flexDirection !== "column") return;
  const scroller = scrollParentOf(el);
  const startTop = el.getBoundingClientRect().top;

  // Where the tapped book should end up: if, once open, it would run under
  // the bottom of the screen (or the floating dock), bring it up just
  // enough to show all of it — never past the top margin.
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const openH =
    (parseFloat(getComputedStyle(row).getPropertyValue("--open-h")) || 24) * rem;
  const dock = document.querySelector(".site-dock__bar-shell, .site-dock");
  const dockTop = dock ? dock.getBoundingClientRect().top : window.innerHeight;
  const bottomLimit = Math.min(window.innerHeight, dockTop) - 12;
  const topLimit =
    (scroller === document.scrollingElement || scroller === document.documentElement
      ? 0
      : Math.max(0, scroller.getBoundingClientRect().top)) + 16;
  const endTop =
    startTop + openH > bottomLimit
      ? Math.max(topLimit, bottomLimit - openH)
      : startTop;

  const begun = performance.now();
  let still = 0;
  let stopped = false;
  // The user takes over the moment they touch or scroll.
  const stop = () => {
    stopped = true;
    window.removeEventListener("touchstart", stop, true);
    window.removeEventListener("wheel", stop, true);
  };
  window.addEventListener("touchstart", stop, { capture: true, passive: true });
  window.addEventListener("wheel", stop, { capture: true, passive: true });
  const step = () => {
    if (stopped) return;
    const elapsed = performance.now() - begun;
    // The book's top travels from where it was tapped to where it should
    // end, on the pull's own curve and duration — so the page scroll and
    // the book opening read as one motion. Each frame also cancels any
    // shift from the book closing above.
    const t = Math.min(1, elapsed / GUIDE_MS);
    const target = startTop + (endTop - startTop) * easeInOut(t);
    const drift = el.getBoundingClientRect().top - target;
    if (Math.abs(drift) > 0.5) {
      scroller.scrollTop += drift;
      still = 0;
    } else {
      still += 1;
    }
    // Hold through the pull, then until the layout has been still for a
    // few frames (the pull can run long on a busy device); never longer
    // than the cap.
    if (elapsed < HOLD_MIN_MS || (still < 4 && elapsed < HOLD_MAX_MS)) {
      requestAnimationFrame(step);
    } else {
      stop();
    }
  };
  requestAnimationFrame(step);
}

/** Same feel as the pull's cubic-bezier(0.4, 0, 0.2, 1). */
function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

/** Matches the stacked shelf's --pull-dur (0.5s). */
const GUIDE_MS = 500;

export default function ProjectShelf({
  id,
  title,
  note,
  projects,
  onOpen,
  onHover,
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [coarse, setCoarse] = useState(false);
  const intentTimer = useRef(null);

  useEffect(() => {
    const query = window.matchMedia("(hover: none)");
    const sync = () => setCoarse(query.matches);
    sync();
    query.addEventListener?.("change", sync);
    return () => {
      query.removeEventListener?.("change", sync);
      window.clearTimeout(intentTimer.current);
    };
  }, []);

  const pull = (index, withIntent = false, anchorEl = null) => {
    window.clearTimeout(intentTimer.current);
    if (!withIntent) {
      if (anchorEl) holdInPlace(anchorEl);
      setOpenIndex(index);
      return;
    }
    intentTimer.current = window.setTimeout(
      () => setOpenIndex(index),
      PULL_INTENT_MS,
    );
  };

  if (!projects.length) return null;

  return (
    <section
      id={id}
      className="case-studies__section project-shelf bento-tile"
      aria-label={title}
    >
      <header className="project-shelf__header">
        <h2 className="project-shelf__title">{title}</h2>
        {note ? <p className="project-shelf__note">{note}</p> : null}
      </header>
      <ul
        className="project-shelf__row"
        style={{ "--books": projects.length }}
        data-single={projects.length === 1 ? "" : undefined}
        // Leaving the shelf keeps the last book out (no snap back), but a
        // pending pull for a book the pointer only brushed is dropped.
        onPointerLeave={() => {
          window.clearTimeout(intentTimer.current);
          onHover?.(null);
        }}
      >
        {projects.map((project, index) => (
          <Book
            key={project.id}
            project={project}
            index={index}
            open={index === openIndex}
            onPull={pull}
            onOpen={onOpen}
            onHover={onHover}
            coarse={coarse}
          />
        ))}
      </ul>
    </section>
  );
}
