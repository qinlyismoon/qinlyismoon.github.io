import { useEffect, useRef, useState } from "react";

/**
 * Small interactions for the About board. Each one grows out of its tile's
 * own text — nothing here adds new claims, it only lets the reader act out
 * what the paragraph describes.
 */

const STEP_MS = 1100;

/**
 * Making tile: the loop, upright. A highlight walks the steps and the return
 * path. Hover or focus a step to hold it.
 */
export function MakingLoop({ steps, caption }) {
  // phase 0..steps.length-1 = a step, steps.length = the return path.
  const [phase, setPhase] = useState(0);
  const [held, setHeld] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const query = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReduceMotion(Boolean(query?.matches));
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (held !== null || reduceMotion || !visible) return undefined;
    const timer = window.setTimeout(() => {
      setPhase((current) => (current + 1) % (steps.length + 1));
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [phase, held, reduceMotion, visible, steps.length]);

  const active = held ?? phase;
  const returning = active === steps.length;

  return (
    <figure
      ref={rootRef}
      className={`making-loop${returning ? " is-returning" : ""}`}
      aria-label={steps.join(" → ")}
    >
      <figcaption className="making-loop__caption">{caption}</figcaption>
      <div className="making-loop__track">
        <ol className="making-loop__steps">
          {steps.map((step, index) => (
            <li key={step} className="making-loop__item">
              {index > 0 ? (
                <span
                  className={`making-loop__link${
                    active === index || active === index - 1 ? " is-lit" : ""
                  }`}
                  aria-hidden="true"
                />
              ) : null}
              <button
                type="button"
                className={`making-loop__pill${active === index ? " is-active" : ""}`}
                aria-pressed={held === index}
                onMouseEnter={() => setHeld(index)}
                onMouseLeave={() => {
                  setHeld(null);
                  setPhase(index);
                }}
                onFocus={() => setHeld(index)}
                onBlur={() => {
                  setHeld(null);
                  setPhase(index);
                }}
              >
                {step}
              </button>
            </li>
          ))}
        </ol>
        <span className="making-loop__return" aria-hidden="true" />
      </div>
    </figure>
  );
}

const PHOTO_COPY = {
  en: {
    label: "Off the clock",
    hint: "tap to shuffle",
    photos: [
      "Phoebe in a white cap, smiling under green leaves in the sun",
      "Phoebe holding up a husky plush toy",
    ],
  },
  zh: {
    label: "工作之外",
    hint: "点一下换一张",
    photos: [
      "Phoebe 戴着白色棒球帽，在阳光和绿叶下微笑",
      "Phoebe 抱着一只哈士奇玩偶",
    ],
  },
};

const PHOTO_SRC = ["/about/candid-cap.jpg", "/about/candid-husky.jpg"];
const PHOTO_TILT = [-3.5, 4];
const SHUFFLE_MS = 420;

/**
 * A small stack of candid photos. The top one slides out and tucks behind
 * the others on click; hovering fans the stack a little.
 */
export function PhotoStack({ language }) {
  const t = PHOTO_COPY[language] ?? PHOTO_COPY.en;
  const [order, setOrder] = useState(() => PHOTO_SRC.map((_, i) => i));
  const [leaving, setLeaving] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const shuffle = () => {
    if (leaving) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduce) {
      setOrder((current) => [...current.slice(1), current[0]]);
      return;
    }
    setLeaving(true);
    timer.current = window.setTimeout(() => {
      setOrder((current) => [...current.slice(1), current[0]]);
      setLeaving(false);
    }, SHUFFLE_MS);
  };

  const top = order[0];

  return (
    <section className="photo-stack" aria-label={t.label}>
      <p className="bento-tile__kicker photo-stack__kicker">{t.label}</p>
      <button
        type="button"
        className={`photo-stack__deck${leaving ? " is-leaving" : ""}`}
        onClick={shuffle}
        aria-label={`${t.photos[top]} — ${t.hint}`}
      >
        {order
          .slice()
          .reverse()
          .map((photo) => {
            const depth = order.indexOf(photo);
            return (
              <span
                key={photo}
                className={`photo-stack__card${depth === 0 ? " is-top" : ""}`}
                style={{ "--depth": depth, "--tilt": `${PHOTO_TILT[photo]}deg` }}
              >
                <img
                  src={PHOTO_SRC[photo]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
              </span>
            );
          })}
      </button>
      <p className="photo-stack__hint" aria-hidden="true">
        {t.hint}
      </p>
    </section>
  );
}
