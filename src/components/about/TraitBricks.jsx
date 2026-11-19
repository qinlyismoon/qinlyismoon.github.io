import { useEffect, useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Three toy blocks, one per trait. Each trait tile carries its block in the
 * top-right corner; picking it up sends it to the tray here, and placing it
 * stacks it on the tower. Blocks always stack Questions → Possibilities →
 * Making from the ground up (a later, lower block slides in underneath), so
 * the tower is never floating and its bands read red · white · red. The lamp
 * lights, a soft sky fills the tile, and clouds drift in — only after the
 * last block has finished gliding into place.
 */
const IDS = ["doubt", "possibilities", "making"];
// One shared, readable glide for every hop (tile → tray, tray → tower, back).
const MOVE_MS = 1400;
const MOVE = { layout: { duration: MOVE_MS / 1000, ease: [0.45, 0, 0.2, 1] } };
const COPY = {
  en: {
    labels: ["Questions", "Possibilities", "Making"],
    kicker: "put together",
    title: "What kind of designer am I?",
    collect: "Pick up",
    place: "Place",
    lift: "Lift",
    hintEmpty: "Find the three blocks on this page and pick them up.",
    hintBuild: "Now stack them.",
    complete:
      "I design interactive systems that help people understand complexity and act with confidence.",
  },
  zh: {
    labels: ["提问", "可能性", "动手做"],
    kicker: "合在一起",
    title: "我是怎样的设计师？",
    collect: "拿起",
    place: "放上",
    lift: "取下",
    hintEmpty: "在页面上找到三块积木，把它们拿起来。",
    hintBuild: "把它们搭起来。",
    complete: "我设计交互系统，帮助人们理解复杂事物，并更有信心地采取行动。",
  },
};

/* Flat blocks -----------------------------------------------------------------
 * One smooth silhouette per block, two tones only: the face, and a slightly
 * deeper strip down the right edge. A single large tab / socket pair shows
 * which block sits on which:
 *   Questions      — tab on the left
 *   Possibilities  — socket on the left (takes Questions), tab on the right
 *   Making         — socket on the right (takes Possibilities)
 */
const W = 110; // body width, in art units
const H = 34; // body height (also the stacking pitch)
const TAB_H = 9;
const TAB_W = 26;
const R = 4; // body corner radius
const TR = 3; // tab corner radius
const SHAPE = {
  doubt: { tab: 18, tone: "red" },
  possibilities: { socket: 18, tab: 66, tone: "white" },
  making: { socket: 66, tone: "red" },
};
const TONE = {
  red: { face: "#cd6a5e", edge: "#b8584d" },
  white: { face: "#f6f2e9", edge: "#e3ddce" },
};

function blockPath({ tab, socket }) {
  const top = TAB_H;
  const bottom = TAB_H + H;
  const d = [`M${R},${top}`];
  if (tab !== undefined) {
    const x2 = tab + TAB_W;
    d.push(
      `L${tab},${top} L${tab},${TR} Q${tab},0 ${tab + TR},0`,
      `L${x2 - TR},0 Q${x2},0 ${x2},${TR} L${x2},${top}`,
    );
  }
  d.push(
    `L${W - R},${top} Q${W},${top} ${W},${top + R}`,
    `L${W},${bottom - R} Q${W},${bottom} ${W - R},${bottom}`,
  );
  if (socket !== undefined) {
    const x2 = socket + TAB_W;
    const sy = bottom - TAB_H;
    d.push(
      `L${x2},${bottom} L${x2},${sy + TR} Q${x2},${sy} ${x2 - TR},${sy}`,
      `L${socket + TR},${sy} Q${socket},${sy} ${socket},${sy + TR} L${socket},${bottom}`,
    );
  }
  d.push(`L${R},${bottom} Q0,${bottom} 0,${bottom - R} L0,${top + R} Q0,${top} ${R},${top} Z`);
  return d.join(" ");
}

function FlatBlock({ id }) {
  const clipId = useId();
  const shape = SHAPE[id];
  const c = TONE[shape.tone];
  const d = blockPath(shape);
  return (
    <svg
      className="toy-block__art"
      viewBox={`0 0 ${W} ${TAB_H + H}`}
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={clipId}>
        <path d={d} />
      </clipPath>
      <path d={d} fill={c.face} />
      <rect
        x={W - 8}
        y="0"
        width="8"
        height={TAB_H + H}
        fill={c.edge}
        clipPath={`url(#${clipId})`}
      />
    </svg>
  );
}

function FlatLamp() {
  return (
    <svg
      className="toy-lamp__art"
      viewBox="0 0 44 30"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M7,12 L22,2 L37,12 Z"
        fill="#b8584d"
        stroke="#b8584d"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect className="toy-lamp__glass" x="13" y="12" width="18" height="14" />
      <rect x="4" y="26" width="36" height="4" rx="2" fill="#4a4845" />
    </svg>
  );
}

/* Same flat toy language as the blocks: cream face + a deeper right edge. */
/* Cloud in the blocks' own geometry: a flat-bottomed pill (radius = half
   its height) with two round tops. Light comes from the left, as on the
   blocks, so only the pill's right end turns to the edge tone — a side
   face, not a slice through the puffs. Crisp, no blur, no shadow. */
function FlatCloud({ className }) {
  const clipId = useId();
  const face = TONE.white.face;
  const edge = TONE.white.edge;
  return (
    <svg
      className={className}
      viewBox="0 0 68 30"
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={clipId}>
        <rect x="4" y="15" width="60" height="13" rx="6.5" />
      </clipPath>
      <rect x="4" y="15" width="60" height="13" rx="6.5" fill={edge} />
      <rect
        x="4"
        y="15"
        width="56.5"
        height="13"
        rx="6.5"
        fill={face}
        clipPath={`url(#${clipId})`}
      />
      <circle cx="25" cy="16" r="10" fill={face} />
      <circle cx="42.5" cy="17" r="7.5" fill={face} />
    </svg>
  );
}

function Block({ id, label }) {
  return (
    <span className={`toy-block toy-block--${id}`}>
      <FlatBlock id={id} />
      <span className="toy-block__label">{label}</span>
    </span>
  );
}

/** The block as it sits in a trait tile's corner, waiting to be picked up. */
export function BrickSource({ id, language, collected, onCollect }) {
  const reduceMotion = useReducedMotion();
  const [moving, setMoving] = useState(false);
  const copy = COPY[language] ?? COPY.en;
  const index = IDS.indexOf(id);
  if (index < 0 || collected) return null;
  const label = copy.labels[index];

  return (
    <motion.button
      type="button"
      className={`toy-block-source${moving ? " is-moving" : ""}`}
      layoutId={reduceMotion ? undefined : `toy-block-${id}`}
      transition={MOVE}
      aria-label={`${copy.collect} · ${label}`}
      onLayoutAnimationStart={() => setMoving(true)}
      onLayoutAnimationComplete={() => setMoving(false)}
      onClick={(event) => {
        // Keyboard activation: the button unmounts, so park focus on the title.
        if (event.detail === 0) {
          document.getElementById(`about-${id}`)?.focus({ preventScroll: true });
        }
        onCollect(id);
      }}
    >
      <Block id={id} label={label} />
    </motion.button>
  );
}

export function TraitBricks({ language, bricks, onPlace }) {
  const reduceMotion = useReducedMotion();
  const copy = COPY[language] ?? COPY.en;
  // Placed blocks in tower order, bottom first.
  const placedOrder = IDS.filter((id) => bricks[id] === "placed");
  const collectedCount = IDS.filter((id) => bricks[id]).length;
  const complete = placedOrder.length === IDS.length;
  // Lamp waits until the last block finishes arriving — not the click.
  const [lit, setLit] = useState(false);
  const [movingId, setMovingId] = useState(null);

  useEffect(() => {
    if (!complete) setLit(false);
    else if (reduceMotion) setLit(true);
  }, [complete, reduceMotion]);

  let hint = copy.hintEmpty;
  if (complete && lit) hint = copy.complete;
  else if (collectedCount === IDS.length) hint = copy.hintBuild;

  return (
    <section
      className={`bento-tile about-bricks${lit ? " is-complete" : ""}`}
      aria-labelledby="about-bricks-title"
    >
      {/* Clipped sky layer — overflow stays on the tile so blocks can fly out. */}
      <span className="about-bricks__sky" aria-hidden="true">
        {/* Two clouds, only in the sky around the lighthouse — never
            behind the copy. */}
        <FlatCloud className="about-bricks__cloud about-bricks__cloud--b" />
        <FlatCloud className="about-bricks__cloud about-bricks__cloud--c" />
      </span>

      <div className="about-bricks__copy">
        <p className="bento-tile__kicker">{copy.kicker}</p>
        <h2 id="about-bricks-title" className="about-tile__title">
          {copy.title}
        </h2>
        <p
          key={hint}
          className={`about-bricks__hint${lit ? " is-answer" : ""}`}
          aria-live="polite"
        >
          {hint}
        </p>
      </div>

      <div className="about-bricks__stage">
        {/* Where the tower goes: three outlined places and the lamp. */}
        <span className="toy-lamp" aria-hidden="true">
          <span className="toy-lamp__beam toy-lamp__beam--left" />
          <span className="toy-lamp__beam toy-lamp__beam--right" />
          <FlatLamp />
        </span>
        {IDS.map((id, level) => (
          <span
            key={id}
            className="toy-slot"
            style={{ "--level": level }}
            hidden={level < placedOrder.length}
            aria-hidden="true"
          />
        ))}
        <span className="toy-ground" aria-hidden="true" />

        {IDS.map((id, index) => {
          if (!bricks[id]) return null;
          const level = placedOrder.indexOf(id);
          const placed = level >= 0;
          const label = copy.labels[index];
          return (
            <motion.button
              key={id}
              type="button"
              layout={reduceMotion ? false : "position"}
              layoutId={reduceMotion ? undefined : `toy-block-${id}`}
              className={`toy-block-wrap${placed ? " is-placed" : " is-loose"}${
                movingId === id ? " is-moving" : ""
              }`}
              style={{ "--tray": index, "--level": placed ? level : 0 }}
              transition={MOVE}
              aria-label={`${placed ? copy.lift : copy.place} · ${label}`}
              onLayoutAnimationStart={() => setMovingId(id)}
              onLayoutAnimationComplete={() => {
                setMovingId((current) => (current === id ? null : current));
                if (placedOrder.length === IDS.length && placed) setLit(true);
              }}
              onClick={() => onPlace(id)}
            >
              <Block id={id} label={label} />
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
