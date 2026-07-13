import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const STROKE = 2.75;
const LOOP_GAP = 12;
const LOOP_DEPTH = 32;
/** Horizontal space reserved for each between-pill connector. */
const CONNECTOR_WIDTH = 56;
/** Drawn arrow length inside that space (leaves clear padding to pills). */
const ARROW_WIDTH = 44;

const EASE = [0.22, 1, 0.36, 1];
/** Delay after About mounts before the sequence begins. */
const MOUNT_DELAY_MS = 200;
/** Hold the finished loop before replaying once from the start. */
const HOLD_MS = 6000;
/** Short beat before a remounted replay begins. */
const REPLAY_DELAY_MS = 80;

/** Timeline offsets (ms) from sequence start. */
const T = {
  pill0: 0,
  connector1: 250,
  pill1: 500,
  connector2: 750,
  pill2: 1000,
  returnPath: 1300,
  arrowhead: 1900,
};

const PILL_DURATION = 0.42;
const CONNECTOR_DURATION = 0.38;
const RETURN_DURATION = 0.55;
const ARROWHEAD_DURATION = 0.28;
const SEQUENCE_END_MS = T.arrowhead + ARROWHEAD_DURATION * 1000 + 80;

function seconds(ms) {
  return ms / 1000;
}

function BidirectionalArrow({ play, delayMs, reduceMotion, complete }) {
  const delay = seconds(delayMs);
  const headsDelay = delay + CONNECTOR_DURATION * 0.72;
  const show = reduceMotion || play;
  const snap = reduceMotion || complete;

  return (
    <span className="about-principles__connector" aria-hidden="true">
      <svg
        className="about-principles__link"
        viewBox={`0 0 ${ARROW_WIDTH} 18`}
        width={ARROW_WIDTH}
        height="16"
        fill="none"
      >
        <motion.path
          d={`M 8 9 H ${ARROW_WIDTH - 8}`}
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={snap ? false : { pathLength: 0 }}
          animate={show ? { pathLength: 1 } : { pathLength: 0 }}
          transition={
            snap
              ? { duration: 0 }
              : { delay, duration: CONNECTOR_DURATION, ease: EASE }
          }
        />
        <motion.path
          d="M 12 4.5 L 5 9 L 12 13.5"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={snap ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={
            snap
              ? { duration: 0 }
              : { delay: headsDelay, duration: 0.2, ease: EASE }
          }
        />
        <motion.path
          d={`M ${ARROW_WIDTH - 12} 4.5 L ${ARROW_WIDTH - 5} 9 L ${ARROW_WIDTH - 12} 13.5`}
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={snap ? false : { opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={
            snap
              ? { duration: 0 }
              : { delay: headsDelay, duration: 0.2, ease: EASE }
          }
        />
      </svg>
    </span>
  );
}

/** Continuous U anchored to the horizontal centers of the first & last pills. */
function buildReturnPath(xRight, xLeft, yTop, depth) {
  const yBottom = yTop + depth;
  return `
    M ${xRight} ${yTop}
    C ${xRight} ${yTop + depth * 0.65},
      ${xRight} ${yBottom},
      ${(xRight + xLeft) / 2} ${yBottom}
    C ${xLeft} ${yBottom},
      ${xLeft} ${yTop + depth * 0.65},
      ${xLeft} ${yTop}
  `;
}

function PrinciplePill({
  children,
  play,
  delayMs,
  reduceMotion,
  complete,
  pillRef,
}) {
  const show = reduceMotion || play;
  const snap = reduceMotion || complete;

  return (
    <motion.span
      className="about-principles__pill"
      role="listitem"
      ref={pillRef}
      initial={snap ? false : { opacity: 0, y: 8, scale: 0.98 }}
      animate={
        show
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 8, scale: 0.98 }
      }
      transition={
        snap
          ? { duration: 0 }
          : {
              delay: seconds(delayMs),
              duration: PILL_DURATION,
              ease: EASE,
            }
      }
    >
      {children}
    </motion.span>
  );
}

/**
 * One full playthrough from Build to learn → return arrow.
 * Remount via `key` to replay cleanly from the start.
 */
function PrinciplesSequence({
  principles,
  ariaLabel,
  reduceMotion,
  startDelayMs,
  onSequenceComplete,
}) {
  const rootRef = useRef(null);
  const rowRef = useRef(null);
  const pillRefs = useRef([]);
  const [loop, setLoop] = useState(null);
  const [play, setPlay] = useState(false);
  const [complete, setComplete] = useState(false);
  const finishedRef = useRef(false);

  const measure = useCallback(() => {
    const root = rootRef.current;
    const first = pillRefs.current[0];
    const last = pillRefs.current[pillRefs.current.length - 1];
    if (!root || !first || !last) return;

    const rootBox = root.getBoundingClientRect();
    const firstBox = first.getBoundingClientRect();
    const lastBox = last.getBoundingClientRect();

    const xLeft = firstBox.left + firstBox.width / 2 - rootBox.left;
    const xRight = lastBox.left + lastBox.width / 2 - rootBox.left;
    const yTop =
      Math.max(firstBox.bottom, lastBox.bottom) - rootBox.top + LOOP_GAP;
    const width = Math.ceil(rootBox.width);
    const height = Math.ceil(yTop + LOOP_DEPTH + 14);

    setLoop({
      width,
      height,
      path: buildReturnPath(xRight, xLeft, yTop, LOOP_DEPTH),
      tipX: xLeft,
      tipY: yTop,
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const id = requestAnimationFrame(() => {
      measure();
      requestAnimationFrame(measure);
    });
    return () => cancelAnimationFrame(id);
  }, [measure, principles]);

  useEffect(() => {
    window.addEventListener("resize", measure);
    const root = rootRef.current;
    let observer;
    if (typeof ResizeObserver !== "undefined" && root) {
      observer = new ResizeObserver(() => measure());
      observer.observe(root);
      if (rowRef.current) observer.observe(rowRef.current);
      pillRefs.current.forEach((pill) => {
        if (pill) observer.observe(pill);
      });
    }
    return () => {
      window.removeEventListener("resize", measure);
      observer?.disconnect();
    };
  }, [measure, principles]);

  useEffect(() => {
    if (reduceMotion) {
      setPlay(true);
      setComplete(true);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setPlay(true);
    }, startDelayMs);

    return () => window.clearTimeout(timer);
  }, [reduceMotion, startDelayMs]);

  useEffect(() => {
    if (!play || reduceMotion || finishedRef.current) return undefined;

    const timer = window.setTimeout(() => {
      finishedRef.current = true;
      setComplete(true);
      onSequenceComplete?.();
    }, SEQUENCE_END_MS);

    return () => window.clearTimeout(timer);
  }, [play, reduceMotion, onSequenceComplete]);

  const pillDelays = [T.pill0, T.pill1, T.pill2];
  const connectorDelays = [T.connector1, T.connector2];
  const skipMotion = reduceMotion || complete;

  return (
    <div
      ref={rootRef}
      className="about-principles"
      role="list"
      aria-label={
        ariaLabel ??
        "Design principles as an iterative loop: Build to learn, Think in systems, Design for people"
      }
      style={{ "--principles-connector-width": `${CONNECTOR_WIDTH}px` }}
    >
      <div className="about-principles__row" ref={rowRef}>
        {principles.map((principle, index) => (
          <Fragment key={principle}>
            {index > 0 ? (
              <BidirectionalArrow
                play={play}
                delayMs={connectorDelays[index - 1]}
                reduceMotion={reduceMotion}
                complete={complete}
              />
            ) : null}
            <PrinciplePill
              play={play}
              delayMs={pillDelays[index] ?? T.pill2}
              reduceMotion={reduceMotion}
              complete={complete}
              pillRef={(node) => {
                pillRefs.current[index] = node;
              }}
            >
              {principle}
            </PrinciplePill>
          </Fragment>
        ))}
      </div>

      {loop ? (
        <svg
          className="about-principles__return"
          width={loop.width}
          height={loop.height}
          viewBox={`0 0 ${loop.width} ${loop.height}`}
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            className="about-principles__return-path"
            d={loop.path}
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={skipMotion ? false : { pathLength: 0 }}
            animate={
              reduceMotion || play ? { pathLength: 1 } : { pathLength: 0 }
            }
            transition={
              skipMotion
                ? { duration: 0 }
                : {
                    delay: seconds(T.returnPath),
                    duration: RETURN_DURATION,
                    ease: EASE,
                  }
            }
          />
          <motion.path
            d={`M ${loop.tipX - 7} ${loop.tipY + 10} L ${loop.tipX} ${loop.tipY} L ${loop.tipX + 7} ${loop.tipY + 10}`}
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={skipMotion ? false : { opacity: 0 }}
            animate={reduceMotion || play ? { opacity: 1 } : { opacity: 0 }}
            transition={
              skipMotion
                ? { duration: 0 }
                : {
                    delay: seconds(T.arrowhead),
                    duration: ARROWHEAD_DURATION,
                    ease: EASE,
                  }
            }
          />
        </svg>
      ) : null}
    </div>
  );
}

export default function DesignPrinciplesLoop({ principles, ariaLabel }) {
  const reduceMotion = useReducedMotion();
  /** 0 = first play, 1 = one full replay from Build to learn. */
  const [cycle, setCycle] = useState(0);
  const holdTimerRef = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(holdTimerRef.current);
  }, []);

  const handleSequenceComplete = useCallback(() => {
    if (reduceMotion || cycle !== 0) return;

    window.clearTimeout(holdTimerRef.current);
    holdTimerRef.current = window.setTimeout(() => {
      setCycle(1);
    }, HOLD_MS);
  }, [cycle, reduceMotion]);

  if (!principles?.length) return null;

  return (
    <PrinciplesSequence
      key={cycle}
      principles={principles}
      ariaLabel={ariaLabel}
      reduceMotion={reduceMotion}
      startDelayMs={cycle === 0 ? MOUNT_DELAY_MS : REPLAY_DELAY_MS}
      onSequenceComplete={handleSequenceComplete}
    />
  );
}
