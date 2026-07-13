import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SHOW_DELAY_MS = 160;
const HIDE_DELAY_MS = 80;
const OFFSET_X = 14;
const OFFSET_Y = 14;
const VIEW_PAD = 10;
const FALLBACK_WIDTH = 180;
const FALLBACK_HEIGHT = 150;

function computePreviewPosition(clientX, clientY, size) {
  const width = size?.width || FALLBACK_WIDTH;
  const height = size?.height || FALLBACK_HEIGHT;
  let left = clientX + OFFSET_X;
  let top = clientY + OFFSET_Y;

  if (left + width > window.innerWidth - VIEW_PAD) {
    left = clientX - OFFSET_X - width;
  }
  if (top + height > window.innerHeight - VIEW_PAD) {
    top = clientY - OFFSET_Y - height;
  }

  if (left < VIEW_PAD) left = VIEW_PAD;
  if (top < VIEW_PAD) top = VIEW_PAD;
  if (left + width > window.innerWidth - VIEW_PAD) {
    left = Math.max(VIEW_PAD, window.innerWidth - width - VIEW_PAD);
  }
  if (top + height > window.innerHeight - VIEW_PAD) {
    top = Math.max(VIEW_PAD, window.innerHeight - height - VIEW_PAD);
  }

  return { top, left };
}

export default function LinkPreview({
  href,
  children,
  previewSrc,
  title,
  source,
  rating,
  italic = false,
  className = "",
}) {
  const previewId = useId();
  const cardRef = useRef(null);
  const showTimer = useRef(null);
  const hideTimer = useRef(null);
  const lastPoint = useRef({ x: 0, y: 0 });
  const sizeRef = useRef({ width: FALLBACK_WIDTH, height: FALLBACK_HEIGHT });
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => {
      media.removeEventListener?.("change", sync);
      clearTimeout(showTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || !cardRef.current) return undefined;

    const measure = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      sizeRef.current = { width: rect.width, height: rect.height };
      setCoords(
        computePreviewPosition(
          lastPoint.current.x,
          lastPoint.current.y,
          sizeRef.current,
        ),
      );
    };

    measure();
    const img = cardRef.current.querySelector("img");
    if (img && !img.complete) {
      img.addEventListener("load", measure);
      return () => img.removeEventListener("load", measure);
    }
    return undefined;
  }, [open, previewSrc]);

  const updateFromPoint = (clientX, clientY) => {
    lastPoint.current = { x: clientX, y: clientY };
    setCoords(computePreviewPosition(clientX, clientY, sizeRef.current));
  };

  const showFromEvent = (event) => {
    if (!canHover) return;
    clearTimeout(hideTimer.current);
    clearTimeout(showTimer.current);
    updateFromPoint(event.clientX, event.clientY);
    showTimer.current = setTimeout(() => {
      setCoords(
        computePreviewPosition(
          lastPoint.current.x,
          lastPoint.current.y,
          sizeRef.current,
        ),
      );
      setOpen(true);
    }, SHOW_DELAY_MS);
  };

  const moveFromEvent = (event) => {
    if (!canHover) return;
    updateFromPoint(event.clientX, event.clientY);
  };

  const hide = () => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setOpen(false), HIDE_DELAY_MS);
  };

  const showFromFocus = (event) => {
    if (!canHover) return;
    const rect = event.currentTarget.getBoundingClientRect();
    updateFromPoint(rect.left + rect.width / 2, rect.bottom);
    clearTimeout(hideTimer.current);
    clearTimeout(showTimer.current);
    showTimer.current = setTimeout(() => setOpen(true), SHOW_DELAY_MS);
  };

  const hasLabel = Boolean(title || source || rating);

  const card =
    canHover && open
      ? createPortal(
          <span
            ref={cardRef}
            id={previewId}
            className="about-link-preview__card"
            role="tooltip"
            style={{ top: coords.top, left: coords.left }}
          >
            <span className="about-link-preview__thumb">
              <img src={previewSrc} alt="" loading="lazy" draggable={false} />
            </span>
            {hasLabel ? (
              <span className="about-link-preview__meta">
                {title || rating ? (
                  <span className="about-link-preview__title">
                    {title}
                    {title && rating ? (
                      <span className="about-link-preview__rating">
                        {" "}
                        · Rating {rating}
                      </span>
                    ) : rating ? (
                      <span className="about-link-preview__rating">
                        Rating {rating}
                      </span>
                    ) : null}
                  </span>
                ) : null}
                {source ? (
                  <span className="about-link-preview__source">
                    {source}
                    <span className="about-link-preview__ext" aria-hidden="true">
                      ↗
                    </span>
                  </span>
                ) : null}
              </span>
            ) : null}
          </span>,
          document.body,
        )
      : null;

  return (
    <span className={`about-link-preview ${className}`.trim()}>
      <a
        className={[
          "about-link-preview__anchor",
          italic ? "about-link-preview__anchor--italic" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-describedby={open ? previewId : undefined}
        onMouseEnter={showFromEvent}
        onMouseMove={moveFromEvent}
        onMouseLeave={hide}
        onFocus={showFromFocus}
        onBlur={hide}
      >
        {children}
        <span className="about-link-preview__icon" aria-hidden="true">
          ↗
        </span>
      </a>
      {card}
    </span>
  );
}
