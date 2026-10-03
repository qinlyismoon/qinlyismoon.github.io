import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A single narrative stroke between the Home introduction and work index.
 * The marker lives in document flow; the drawing is portalled to the shared
 * page shell so it can cross the content-column boundary into the sidebar.
 */
export default function EditorialThread({ note }) {
  const markerRef = useRef(null);
  const [overlay, setOverlay] = useState({ host: null, top: 0 });

  useLayoutEffect(() => {
    const marker = markerRef.current;
    const host = marker?.closest(".shared-layout");
    if (!marker || !host) return undefined;

    const update = () => {
      const markerRect = marker.getBoundingClientRect();
      const hostRect = host.getBoundingClientRect();
      setOverlay({
        host,
        top: markerRect.top - hostRect.top,
      });
    };

    update();
    const scrollSurface = marker.closest(".home-layout");
    const observer = new ResizeObserver(update);
    observer.observe(marker);
    observer.observe(host);
    scrollSurface?.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      scrollSurface?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <div ref={markerRef} className="editorial-thread__marker" aria-hidden="true" />
      {overlay.host
        ? createPortal(
            <div
              className="editorial-thread"
              style={{ top: `${overlay.top}px` }}
              aria-hidden="true"
            >
              <svg
                className="editorial-thread__line"
                viewBox="0 0 1000 64"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path d="M 0 37 C 210 36, 355 40, 520 38 C 690 36, 835 33, 1000 36" />
              </svg>
              <span className="editorial-thread__note">{note}</span>
            </div>,
            overlay.host,
          )
        : null}
    </>
  );
}
