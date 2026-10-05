import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";

const NAME_ENTRIES = [
  {
    pinyin: "Qín",
    character: "秦",
    meaning: "surname; an ancient Chinese state and dynasty",
  },
  {
    pinyin: "Lóng",
    character: "珑",
    meaning: "exquisite jade; delicate, luminous, and finely crafted",
  },
  {
    pinyin: "Yuè",
    character: "月",
    meaning: "the moon; a symbol of serenity, radiance, and poetic beauty",
  },
];

const VIEW_PAD = 16;
const GAP = 10;
const HIDE_DELAY_MS = 140;

function placeCard(anchorRect, cardSize) {
  const width = cardSize.width || 280;
  const height = cardSize.height || 220;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  // Prefer right / lower-right of the Chinese name so the greeting stays clear.
  let placement = "right";
  let left = anchorRect.right + GAP;
  let top = anchorRect.top + 2;

  if (left + width > vw - VIEW_PAD) {
    placement = "below";
    left = Math.min(anchorRect.left, Math.max(VIEW_PAD, vw - width - VIEW_PAD));
    top = anchorRect.bottom + GAP;
  }

  if (left + width > vw - VIEW_PAD) {
    left = Math.max(VIEW_PAD, vw - width - VIEW_PAD);
  }
  if (left < VIEW_PAD) left = VIEW_PAD;

  if (top + height > vh - VIEW_PAD) {
    top = Math.max(VIEW_PAD, vh - height - VIEW_PAD);
  }
  if (top < VIEW_PAD) top = VIEW_PAD;

  return { left, top, placement };
}

export default function AboutChineseName({
  akaLabel,
  chineseName,
  cardAriaLabel,
}) {
  const panelId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelRef = useRef(null);
  const hideTimer = useRef(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState(null);
  const [canHover, setCanHover] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => {
      media.removeEventListener?.("change", sync);
      clearTimeout(hideTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return undefined;

    const update = () => {
      if (!triggerRef.current || !panelRef.current) return;
      const anchor = triggerRef.current.getBoundingClientRect();
      const card = panelRef.current.getBoundingClientRect();
      const next = placeCard(anchor, card);
      setCoords((prev) => {
        if (
          prev &&
          Math.abs(prev.left - next.left) < 0.5 &&
          Math.abs(prev.top - next.top) < 0.5 &&
          prev.placement === next.placement
        ) {
          return prev;
        }
        return next;
      });
    };

    update();
    const frame = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        clearTimeout(hideTimer.current);
        setOpen(false);
        setCoords(null);
        triggerRef.current?.focus();
      }
    };

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        clearTimeout(hideTimer.current);
        setOpen(false);
        setCoords(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const show = () => {
    clearTimeout(hideTimer.current);
    setOpen(true);
  };

  const scheduleHide = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      setOpen(false);
      setCoords(null);
    }, HIDE_DELAY_MS);
  };

  const toggle = () => {
    clearTimeout(hideTimer.current);
    setOpen((value) => {
      if (value) setCoords(null);
      return !value;
    });
  };

  const ready = Boolean(coords);
  const panelStyle =
    open && ready
      ? { left: coords.left, top: coords.top }
      : { left: -9999, top: -9999 };

  return (
    <div
      ref={rootRef}
      className={`about-aka${open ? " is-open" : ""}`}
      onMouseEnter={canHover ? show : undefined}
      onMouseLeave={canHover ? scheduleHide : undefined}
    >
      <p className="about-aka__line">
        <span className="about-aka__label">{akaLabel}</span>
        <span className="about-aka__separator" aria-hidden="true">·</span>
        <button
          ref={triggerRef}
          type="button"
          className="about-aka__name"
          aria-expanded={open}
          aria-controls={panelId}
          aria-haspopup="true"
          onFocus={show}
          onBlur={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget)) {
              scheduleHide();
            }
          }}
          onClick={() => {
            if (canHover) return;
            toggle();
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggle();
            }
          }}
        >
          {chineseName}
        </button>
      </p>

      <div
        ref={panelRef}
        id={panelId}
        role="tooltip"
        aria-hidden={!open}
        aria-label={cardAriaLabel}
        className={`about-aka__card${open && ready ? " is-visible" : ""}${
          coords?.placement === "below" ? " about-aka__card--below" : ""
        }`}
        style={panelStyle}
        onMouseEnter={canHover ? show : undefined}
        onMouseLeave={canHover ? scheduleHide : undefined}
      >
        <ul className="about-aka__entries">
          {NAME_ENTRIES.map((entry) => (
            <li key={entry.character} className="about-aka__entry">
              <span className="about-aka__glyph" aria-hidden="true">
                <span className="about-aka__pinyin">{entry.pinyin}</span>
                <span className="about-aka__character">{entry.character}</span>
              </span>
              <span className="about-aka__meaning">{entry.meaning}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
