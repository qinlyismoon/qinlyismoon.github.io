import { useCallback, useEffect, useRef, useState } from "react";
import { ABOUT_IMAGES, pickLang } from "../../lib/aboutContent";
import DesignPrinciplesLoop from "./DesignPrinciplesLoop";

const PORTRAIT = {
  src: "portrait",
  alt: { en: "Personal portrait of Phoebe", zh: "珑月的个人肖像" },
  rotation: -1.5,
};

const COLLAGE_NOTES = [
  {
    // Core personality — highest visual weight
    key: "curiosity",
    className:
      "about-collage__note-ideas about-sticky--secondary about-sticky--core",
    rotate: -4.2,
    attach: "pin",
    attachClass: "about-sticky__attach--ideas",
    tint: "warm",
  },
  {
    // Observation — ordinary weight
    key: "observe",
    className:
      "about-collage__note-curious about-sticky--supporting",
    rotate: 3.8,
    attach: "tape",
    attachClass: "about-sticky__attach--curious",
    tint: "sage",
  },
  {
    // Making — second-tier emphasis
    key: "making",
    className:
      "about-collage__note-asking about-sticky--emphasis",
    rotate: -3.4,
    attach: "pin",
    attachClass: "about-sticky__attach--asking",
    tint: "mist",
  },
  {
    // Systems + people — second-tier emphasis
    key: "systemsPeople",
    className:
      "about-collage__note-observe about-sticky--emphasis about-sticky--front",
    rotate: 3.1,
    tint: "clay",
  },
  {
    // Becoming — quiet footnote, lower edge. Stays untinted: one neutral
    // card keeps the palette restrained.
    key: "becoming",
    className:
      "about-collage__note-making about-sticky--quiet about-sticky--front",
    rotate: -4.6,
    tint: null,
  },
];

const NOTE_POSITION_STORAGE_KEY = "about-collage-note-positions:v1";
const NOTE_NUDGE_STEP = 8;
const NOTE_NUDGE_STEP_LARGE = 32;

function readStoredNotePositions() {
  try {
    const raw = window.localStorage.getItem(NOTE_POSITION_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Makes the collage note cards draggable inside the board.
 *
 * Dragging writes a per-note pixel offset (applied as CSS vars, so the
 * designed left/top/rotation stay untouched); the offset is clamped to the
 * board bounds and persisted to localStorage. Double-click — or Enter/Space
 * on a focused card — resets it to its designed spot. Arrow keys nudge a
 * focused card (Shift for larger steps).
 */
function useDraggableNotes() {
  const boardRef = useRef(null);
  const dragRef = useRef(null);
  const [positions, setPositions] = useState(readStoredNotePositions);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        NOTE_POSITION_STORAGE_KEY,
        JSON.stringify(positions),
      );
    } catch {
      // Storage unavailable (private mode, etc.) — the arrangement
      // simply won't persist between visits.
    }
  }, [positions]);

  const clampToBoard = useCallback((card, x, y) => {
    const board = boardRef.current;
    if (!board || !card) return { x, y };
    // The card is absolutely positioned inside .about-collage__background
    // (inset: 0 of the board), so offsetLeft/Top are board-relative.
    const minX = -card.offsetLeft;
    const maxX = Math.max(
      minX,
      board.clientWidth - card.offsetLeft - card.offsetWidth,
    );
    const minY = -card.offsetTop;
    const maxY = Math.max(
      minY,
      board.clientHeight - card.offsetTop - card.offsetHeight,
    );
    return {
      x: Math.min(Math.max(x, minX), maxX),
      y: Math.min(Math.max(y, minY), maxY),
    };
  }, []);

  const resetNote = useCallback((key) => {
    setPositions((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const nudgeNote = useCallback(
    (key, dx, dy) => {
      const card =
        boardRef.current?.querySelector(`[data-note-key="${key}"]`);
      setPositions((prev) => {
        const origin = prev[key] ?? { x: 0, y: 0 };
        return {
          ...prev,
          [key]: clampToBoard(card, origin.x + dx, origin.y + dy),
        };
      });
    },
    [clampToBoard],
  );

  const handlePointerDown = useCallback(
    (key) => (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const card = event.currentTarget;
      const origin = positions[key] ?? { x: 0, y: 0 };
      dragRef.current = {
        key,
        startX: event.clientX,
        startY: event.clientY,
        origin,
      };
      card.setPointerCapture(event.pointerId);
      card.classList.add("about-sticky--dragging");
      // Suppress text selection and native image dragging mid-gesture.
      event.preventDefault();
    },
    [positions],
  );

  const handlePointerMove = useCallback(
    (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      const card = event.currentTarget;
      const next = clampToBoard(
        card,
        drag.origin.x + (event.clientX - drag.startX),
        drag.origin.y + (event.clientY - drag.startY),
      );
      setPositions((prev) => ({ ...prev, [drag.key]: next }));
    },
    [clampToBoard],
  );

  const handlePointerEnd = useCallback((event) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    event.currentTarget.classList.remove("about-sticky--dragging");
  }, []);

  const handleKeyDown = useCallback(
    (key) => (event) => {
      const step = event.shiftKey ? NOTE_NUDGE_STEP_LARGE : NOTE_NUDGE_STEP;
      switch (event.key) {
        case "ArrowLeft":
          nudgeNote(key, -step, 0);
          event.preventDefault();
          break;
        case "ArrowRight":
          nudgeNote(key, step, 0);
          event.preventDefault();
          break;
        case "ArrowUp":
          nudgeNote(key, 0, -step);
          event.preventDefault();
          break;
        case "ArrowDown":
          nudgeNote(key, 0, step);
          event.preventDefault();
          break;
        case "Enter":
        case " ":
          resetNote(key);
          event.preventDefault();
          break;
        default:
          break;
      }
    },
    [nudgeNote, resetNote],
  );

  const getNoteDragProps = useCallback(
    (key, label) => {
      const position = positions[key] ?? { x: 0, y: 0 };
      return {
        "data-note-key": key,
        tabIndex: 0,
        role: "button",
        "aria-label": `${label} \u2014 draggable note. Drag it anywhere on the board, or use the arrow keys to move it. Press Enter to put it back.`,
        style: {
          "--about-x": `${position.x}px`,
          "--about-y": `${position.y}px`,
        },
        onPointerDown: handlePointerDown(key),
        onPointerMove: handlePointerMove,
        onPointerUp: handlePointerEnd,
        onPointerCancel: handlePointerEnd,
        onDoubleClick: () => resetNote(key),
        onKeyDown: handleKeyDown(key),
      };
    },
    [
      positions,
      handlePointerDown,
      handlePointerMove,
      handlePointerEnd,
      handleKeyDown,
      resetNote,
    ],
  );

  return { boardRef, getNoteDragProps };
}

function StickyNote({
  children,
  className = "",
  rotate = 0,
  attach,
  attachClass = "",
  dragProps = {},
}) {
  const { style: dragStyle = {}, className: extraClass = "", ...restDragProps } = dragProps;
  return (
    <div
      className={`about-sticky ${className} ${extraClass}`.trim()}
      style={{ "--about-rotate": `${rotate}deg`, ...dragStyle }}
      {...restDragProps}
    >
      {attach === "pin" ? (
        <span
          className={`about-sticky__pin ${attachClass}`.trim()}
          aria-hidden="true"
        />
      ) : null}
      {attach === "tape" ? (
        <span
          className={`about-sticky__tape ${attachClass}`.trim()}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}

/** Below this board width the scattered notes cover each other and the
 * portrait, so the board switches to the note stack. */
const STACK_BREAKPOINT = 560;

function useCompactBoard(boardRef) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;
    const update = () => setCompact(board.clientWidth > 0 && board.clientWidth < STACK_BREAKPOINT);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(board);
    return () => observer.disconnect();
  }, [boardRef]);
  return compact;
}

/**
 * Note stack — the compact board's answer to six notes on a phone.
 *
 * Scattered at phone size, every note covered another note or the
 * portrait. Compact boards gather the notes into one hand-held stack in
 * the lower-left corner: the top card is full size and readable, the rest
 * peek out behind it at their own small angles. Tapping the stack (or
 * Enter / Space) slips the top card to the back — reading becomes leafing
 * through notes, one thought at a time, and the portrait stays visible.
 * A quiet mono counter on the top card reports where you are. Desktop keeps the free,
 * draggable scatter.
 */
function useNoteStack(keys) {
  const [order, setOrder] = useState(keys);
  const [leaving, setLeaving] = useState(null);
  const timerRef = useRef(0);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const advance = useCallback(() => {
    if (leaving) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      return;
    }
    setLeaving(order[0]);
    timerRef.current = window.setTimeout(() => {
      setOrder((prev) => [...prev.slice(1), prev[0]]);
      setLeaving(null);
    }, 220);
  }, [leaving, order]);

  const position = (key) => order.indexOf(key);
  return { order, leaving, advance, position };
}

const STACK_TILTS = [-2.5, 3, -4, 2, -1.5, 4];

export default function AboutHeroCollage({ copy, language = "en" }) {
  const portraitAlt = pickLang(PORTRAIT.alt, language);
  const notes = copy.notes;
  const { boardRef, getNoteDragProps } = useDraggableNotes();
  const heroRef = useRef(null);
  const isStack = useCompactBoard(boardRef);
  const stackKeys = [...COLLAGE_NOTES.map((note) => note.key), "exploring"];
  const stack = useNoteStack(stackKeys);
  const noteText = (key) => (key === "exploring" ? copy.exploringNote : notes[key]);
  const stackLabel = language === "zh" ? "便签" : "Note";

  // In stack mode a note is a card in the pile, not a draggable scrap.
  const getNoteProps = (key) => {
    if (!isStack) return getNoteDragProps(key, noteText(key));
    const depth = stack.position(key);
    const isTop = depth === 0;
    return {
      "data-note-key": key,
      "data-stack-depth": depth,
      "data-stack-index": `${stackKeys.indexOf(key) + 1} / ${stackKeys.length}`,
      tabIndex: isTop ? 0 : -1,
      role: "button",
      "aria-hidden": isTop ? undefined : true,
      "aria-label": isTop
        ? `${noteText(key)} \u2014 ${stackLabel} ${stackKeys.indexOf(key) + 1} / ${stackKeys.length}. ${
            language === "zh" ? "点按查看下一张。" : "Tap for the next note."
          }`
        : undefined,
      className: `about-sticky--stacked${isTop ? " is-top" : ""}${
        stack.leaving === key ? " is-leaving" : ""
      }`,
      style: {
        "--stack-depth": depth,
        "--stack-tilt": `${STACK_TILTS[stackKeys.indexOf(key) % STACK_TILTS.length]}deg`,
      },
      onClick: stack.advance,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          stack.advance();
        }
      },
    };
  };

  return (
    <section
      id="about-intro"
      className="about-hero"
      aria-label="Personal collage"
      ref={heroRef}
    >
      <div className="about-hero__text">
        <DesignPrinciplesLoop principles={copy.principles} />
      </div>

      <div className={`about-collage about-collage--scene${isStack ? " about-collage--stack" : ""}`}>
        <div className="about-collage__board" ref={boardRef}>
          {/* Landscape base — clipped to the board */}
          <div className="about-collage__landscape" aria-hidden="true">
            <div className="about-collage__prop about-collage__mountain">
              <img src={ABOUT_IMAGES.mountain} alt="" draggable={false} />
            </div>
          </div>

          {/* Atmosphere — in front of mountains, can overflow the frame */}
          <div className="about-collage__atmosphere" aria-hidden="true">
            <div
              className="about-collage__prop about-collage__fireworks"
              style={{ "--about-rotate": "-6deg" }}
            >
              <img src={ABOUT_IMAGES.fireworks} alt="" draggable={false} />
            </div>
          </div>

          <div className="about-collage__background">
            {/* Supporting scrapbook objects */}
            <div
              className="about-collage__prop about-collage__ticket"
              style={{ "--about-rotate": "-10deg" }}
            >
              <img
                src={ABOUT_IMAGES.ticket}
                alt={pickLang(
                  { en: "Travel ticket scrap", zh: "旅行票根" },
                  language,
                )}
                draggable={false}
              />
            </div>

            <div
              className="about-collage__prop about-collage__film"
              style={{ "--about-rotate": "9deg" }}
              aria-hidden="true"
            >
              <img src={ABOUT_IMAGES.film} alt="" draggable={false} />
            </div>

            <div
              className="about-collage__prop about-collage__camera"
              style={{ "--about-rotate": "-14deg" }}
              aria-hidden="true"
            >
              <img src={ABOUT_IMAGES.camera} alt="" draggable={false} />
            </div>

            <div
              className="about-collage__prop about-collage__bar"
              style={{ "--about-rotate": "20deg" }}
              aria-hidden="true"
            >
              <img src={ABOUT_IMAGES.bar} alt="" draggable={false} />
            </div>

            {/* Portrait — primary focus */}
            <div
              className="about-portrait about-collage__item about-collage__lift about-collage__portrait"
              style={{ "--about-rotate": `${PORTRAIT.rotation}deg` }}
            >
              <img src={ABOUT_IMAGES.portrait} alt={portraitAlt} />
            </div>

            {/* Personality notes */}
            {COLLAGE_NOTES.map((note) => (
              <StickyNote
                key={note.key}
                className={`about-collage__note ${note.className}${
                  note.tint ? ` about-sticky--tint-${note.tint}` : ""
                }`}
                rotate={note.rotate}
                attach={note.attach}
                attachClass={note.attachClass}
                dragProps={getNoteProps(note.key)}
              >
                {notes[note.key]}
              </StickyNote>
            ))}

            <StickyNote
              className="about-collage__note about-collage__note-exploring about-sticky--secondary about-sticky--tint-straw"
              rotate={3.6}
              attach="tape"
              attachClass="about-sticky__attach--exploring"
              dragProps={getNoteProps("exploring")}
            >
              {copy.exploringNote}
            </StickyNote>
          </div>

          {/* Overflowing foreground props */}
          <div className="about-collage__foreground" aria-hidden="true">
            <div
              className="about-collage__prop about-collage__snowboard"
              style={{ "--about-rotate": "32deg" }}
            >
              <img src={ABOUT_IMAGES.snowboard} alt="" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
