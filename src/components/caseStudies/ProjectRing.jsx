// Projects as one ring: every project stands on a curved wall around the
// viewer. The viewer stands INSIDE the ring, so cards toward the edges come
// closer — bigger, bending inward — and the front card sits flat at its
// natural size. Projects of one category stand together, with a little
// extra space between categories; the category of the front card is named
// above the wall and changes as the ring turns.
//
// Gestures are kept apart:
//   · turn  — drag anywhere, scroll sideways, ← / →, or click a SIDE card
//             (it comes round to the front);
//   · open  — click the FRONT card (it shows "Open" on hover), or Enter.
// A drag never opens anything, however it ends.
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { SHELF_FOCUS } from "./ProjectShelf";
import "./project-ring.css";

/** A slice is never narrower than this (cards stay readable) … */
const MIN_STEP_DEG = 24;
/** … nor wider (a flat card past ~60° stops reading as part of a wall). */
const MAX_STEP_DEG = 60;
/** Extra space between categories, as a share of one slice. */
const GROUP_GAP = 0.45;
/** Gap between neighbouring cards, as a share of a slice. */
const GAP_SHARE = 0.08;
/** Px of drag that turns the ring by one slice, relative to card width. */
const DRAG_PER_SLICE = 0.9;
/** Movement (px) before a press counts as a drag rather than a click. */
const DRAG_SLOP = 6;
/** Cards are drawn out to this angle either side of the front. */
const VISIBLE_DEG = 105;
/** How much of the ring must be visible before the wall forms. */
const REVEAL_AT = 0.35;
/** At or below this much visible, the wall clears, ready to form again. */
const RESET_AT = 0.15;
/** Swing-in length incl. the last card's delay (matches the CSS). */
const ENTER_MS = 1400;

const mod = (value, n) => ((value % n) + n) % n;

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
  return width;
}

function coverOf(project) {
  return project.cardPoster || project.thumbnail;
}

function focusOf(project) {
  const focus = SHELF_FOCUS[project.id];
  if (focus) return { objectPosition: `${focus.open[0]} ${focus.open[1]}` };
  return project.cardObjectPosition
    ? { objectPosition: project.cardObjectPosition }
    : undefined;
}

export default function ProjectRing({
  id = "ring",
  label,
  groups,
  onOpen,
  onHover,
}) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const stageRef = useRef(null);
  const sectionRef = useRef(null);
  const width = useWidth(stageRef);

  // All categories flattened into one ring; each card remembers its group.
  const items = useMemo(
    () =>
      groups.flatMap((group, groupIndex) =>
        group.projects.map((project) => ({ project, group, groupIndex })),
      ),
    [groups],
  );
  const count = items.length;
  const groupCount = groups.filter((group) => group.projects.length).length;

  // `pos` is the ring's turn in slots, unbounded (it keeps counting as you
  // go round); the item in front is pos mod count.
  const [pos, setPos] = useState(0);
  const [drag, setDrag] = useState(0); // in slots, while dragging
  const dragRef = useRef(null);
  const wheelRef = useRef({ sum: 0, timer: null });
  const draggedRef = useRef(false);
  const hovering = useRef(false);

  // Geometry: slices sized so every card plus the gaps between categories
  // make one full turn. Radius follows the stage width; the viewer
  // (perspective) stands just behind the ring's centre, inside the ring.
  const geo = useMemo(() => {
    const radius = Math.max(360, Math.min(980, width * 0.62));
    const gaps = groupCount > 1 ? groupCount : 0;
    const units = count + gaps * GROUP_GAP;
    const stepDeg = Math.max(
      MIN_STEP_DEG,
      Math.min(MAX_STEP_DEG, 360 / Math.max(units, 1)),
    );
    const base = [];
    let at = 0;
    items.forEach((item, index) => {
      if (index > 0 && item.groupIndex !== items[index - 1].groupIndex) {
        at += GROUP_GAP * stepDeg;
      }
      base.push(at);
      at += stepDeg;
    });
    const turnDeg = Math.max(360, at + (gaps ? GROUP_GAP * stepDeg : 0));
    const stepRad = (stepDeg * Math.PI) / 180;
    const cardW = 2 * radius * Math.tan(stepRad / 2) * (1 - GAP_SHARE);
    return { radius, stepDeg, base, turnDeg, cardW, perspective: radius * 1.18 };
  }, [width, items, count, groupCount]);

  // Angle of slot k, and of a fractional turn between two slots.
  const angleOfSlot = (k) =>
    Math.floor(k / count) * geo.turnDeg + geo.base[mod(k, count)];
  const angleAt = (x) => {
    const k = Math.floor(x);
    const a = angleOfSlot(k);
    return a + (angleOfSlot(k + 1) - a) * (x - k);
  };

  const active = count ? mod(pos, count) : 0;
  const current = items[active];
  const go = (nextPos) => setPos(Math.round(nextPos));

  // Which way the ring last turned (+1 → cards moved left), so the new
  // category's light can arrive from the side the ring turned toward.
  const lastPos = useRef(pos);
  const [turnDir, setTurnDir] = useState(1);
  useEffect(() => {
    if (pos !== lastPos.current) setTurnDir(pos > lastPos.current ? 1 : -1);
    lastPos.current = pos;
  }, [pos]);
  const visibleGroups = groups.filter((group) => group.projects.length);

  // Remember the category being left, for the title crossfade.
  const shownGroup = useRef(null);
  const [leavingGroup, setLeavingGroup] = useState(null);
  const [groupChange, setGroupChange] = useState(0);
  const frontGroup = items[active]?.group;
  useEffect(() => {
    if (!frontGroup) return undefined;
    const before = shownGroup.current;
    shownGroup.current = frontGroup;
    if (!before || before.id === frontGroup.id) return undefined;
    setLeavingGroup(before);
    setGroupChange((n) => n + 1);
    const timer = window.setTimeout(() => setLeavingGroup(null), 900);
    return () => window.clearTimeout(timer);
  }, [frontGroup]);
  const turn = pos - drag;
  const turnAngle = count ? angleAt(turn) : 0;

  // Turn to the first project of a category (sidebar directory links).
  useEffect(() => {
    const toHash = () => {
      const target = window.location.hash.slice(1);
      if (!target) return;
      const index = items.findIndex((item) => item.group.id === target);
      if (index < 0) return;
      setPos((p) => {
        const here = mod(p, count);
        let delta = index - here;
        if (delta > count / 2) delta -= count;
        if (delta < -count / 2) delta += count;
        return p + delta;
      });
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    toHash();
    window.addEventListener("hashchange", toHash);
    return () => window.removeEventListener("hashchange", toHash);
  }, [items, count]);

  // The wall assembles every time it scrolls into view, and clears again
  // once it has left — so arriving always brings it in.
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setEntered(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= REVEAL_AT) setEntered(true);
        else if (entry.intersectionRatio <= RESET_AT) setEntered(false);
      },
      { threshold: [0, 0.05, 0.1, RESET_AT, 0.25, REVEAL_AT, 0.5] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!entered) return undefined;
    setEntering(true);
    const timer = window.setTimeout(() => setEntering(false), ENTER_MS);
    return () => window.clearTimeout(timer);
  }, [entered]);

  useEffect(() => () => window.clearTimeout(wheelRef.current.timer), []);

  useEffect(() => {
    if (hovering.current && current) onHover?.(current.project);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // ── Turning ──
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    // Each press starts clean: a previous drag can't swallow this click.
    draggedRef.current = false;
    dragRef.current = { x: event.clientX, moved: false, id: event.pointerId };
  };

  const onPointerMove = (event) => {
    const start = dragRef.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    if (!start.moved && Math.abs(dx) < DRAG_SLOP) return;
    if (!start.moved) {
      start.moved = true;
      draggedRef.current = true;
      event.currentTarget.setPointerCapture?.(event.pointerId);
    }
    setDrag(dx / (geo.cardW * DRAG_PER_SLICE));
  };

  const endDrag = () => {
    const start = dragRef.current;
    dragRef.current = null;
    if (!start?.moved) return;
    go(pos - drag);
    setDrag(0);
  };

  // ── Clicking: side card → turn to it; front card → open ──
  const onCardClick = (slot, project) => {
    if (draggedRef.current) return; // that press was a drag
    if (slot !== pos) go(slot);
    else onOpen(project);
  };

  // Sideways scroll (trackpad) turns the ring a slot at a time.
  const onWheel = (event) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    const state = wheelRef.current;
    state.sum += event.deltaX;
    window.clearTimeout(state.timer);
    state.timer = window.setTimeout(() => {
      state.sum = 0;
    }, 180);
    if (Math.abs(state.sum) > 60) {
      go(pos + Math.sign(state.sum));
      state.sum = 0;
    }
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(pos + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(pos - 1);
    } else if (event.key === "Enter" && current) {
      onOpen(current.project);
    }
  };

  if (!count) return null;

  // Every slot within view either side of the front.
  const reach = Math.ceil(VISIBLE_DEG / geo.stepDeg) + 2;
  const slots = [];
  for (let k = Math.floor(turn) - reach; k <= Math.ceil(turn) + reach; k += 1) {
    if (Math.abs(angleOfSlot(k) - turnAngle) <= VISIBLE_DEG + geo.stepDeg) {
      slots.push(k);
    }
  }

  const currentTitle =
    current && ((isZh && current.project.titleZh) || current.project.title);
  const description =
    current &&
    ((isZh && current.project.descriptionZh) || current.project.description);
  const openLabel = isZh ? "打开" : "Open";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`case-studies__section project-ring${entered ? " is-in" : ""}${
        entering ? " is-entering" : ""
      }`}
      aria-label={label}
      style={{
        "--ring-r": `${geo.radius}px`,
        "--ring-p": `${geo.perspective}px`,
        "--card-w": `${geo.cardW}px`,
        "--step": `${geo.stepDeg}deg`,
      }}
    >
      {/* Ambient light, one tint per category. Turning into another
          category cross-fades the room's light, drifting in from the side
          the ring turned toward. */}
      <div
        className="project-ring__ambient"
        aria-hidden="true"
        style={{ "--drift": turnDir }}
      >
        {visibleGroups.map((group) => (
          <span
            key={group.id}
            data-group={group.id}
            className={`project-ring__glow${
              group.id === current.group.id ? " is-active" : ""
            }`}
          />
        ))}
      </div>

      {/* Which category the front card belongs to; changes as it turns. */}
      <h2 className="project-ring__group" aria-live="polite">
        {/* The old name lingers and dissolves while the new one settles
            in, so the change is a crossfade, not a cut. */}
        {leavingGroup ? (
          <span
            key={`out-${leavingGroup.id}-${groupChange}`}
            className="project-ring__group-name is-leaving"
            style={{ "--drift": turnDir }}
            aria-hidden="true"
          >
            {leavingGroup.title}
          </span>
        ) : null}
        <span
          key={`in-${current.group.id}-${groupChange}`}
          className={`project-ring__group-name${groupChange ? " is-arriving" : ""}`}
          style={{ "--drift": turnDir }}
        >
          {current.group.title}
        </span>
      </h2>

      <div
        ref={stageRef}
        className={`project-ring__stage${drag ? " is-dragging" : ""}`}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`${id}-front`}
        onKeyDown={onKeyDown}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => {
          hovering.current = true;
          onHover?.(current.project);
        }}
        onPointerLeave={() => {
          hovering.current = false;
          onHover?.(null);
        }}
      >
        <div className="project-ring__scene">
          {slots.map((slot) => {
            const { project } = items[mod(slot, count)];
            const angle = angleOfSlot(slot) - turnAngle;
            const isFront = slot === pos;
            return (
              <button
                key={slot}
                id={isFront ? `${id}-front` : undefined}
                type="button"
                role="option"
                aria-selected={isFront}
                tabIndex={-1}
                className={`project-ring__card${isFront ? " is-front" : ""}`}
                style={{
                  "--angle": angle,
                  "--enter-delay": `${Math.min(Math.abs(slot - pos), 4) * 70}ms`,
                }}
                onClick={() => onCardClick(slot, project)}
                aria-label={isFront ? `${openLabel} ${project.title}` : project.title}
              >
                <img
                  src={coverOf(project)}
                  alt=""
                  draggable="false"
                  loading="lazy"
                  decoding="async"
                  style={focusOf(project)}
                />
                {isFront ? (
                  <span className="project-ring__open" aria-hidden="true">
                    {openLabel}
                    <span className="project-ring__open-arrow">↗</span>
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <p className="visually-hidden" aria-live="polite">
        {currentTitle}
        {description ? ` — ${description}` : ""}
      </p>
    </section>
  );
}
