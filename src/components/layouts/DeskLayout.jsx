import { useEffect, useRef } from "react";

/**
 * DeskLayout — the Desk page frame.
 *
 * Hosts the Scene. The Scene owns the background layer and the camera
 * viewport (which pans across the natural-size illustration); this frame
 * never scrolls or scales the artwork itself. It also owns the camera's
 * mouse behavior: drag-to-pan, so mouse users can pan the way touch
 * users scroll with a gesture.
 */
export default function DeskLayout({ children, style, isActive = false }) {
  const layoutRef = useRef(null);
  // Set on pointerup after a real drag, so the release click doesn't also
  // activate whatever the drag ended on (e.g. toggling the lamp after
  // panning across it).
  const suppressClickRef = useRef(false);

  // Desk opens from the beginning of the horizontal canvas. Resetting when
  // the route becomes active also prevents a previous visit's pan position
  // from becoming the next visit's default view.
  useEffect(() => {
    if (!isActive) return undefined;
    const viewport = layoutRef.current?.querySelector(".desk-scene__viewport");
    if (!viewport) return undefined;

    const frame = window.requestAnimationFrame(() => {
      viewport.scrollLeft = 0;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isActive]);

  useEffect(() => {
    const layout = layoutRef.current;
    const viewport = layout?.querySelector(".desk-scene__viewport");
    if (!viewport) return undefined;

    // Drag-to-pan for the mouse. Touch and pen keep their native
    // scrolling — only mouse pointers are handled here.
    const DRAG_THRESHOLD_PX = 4;
    let drag = null;

    const onPointerDown = (event) => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      suppressClickRef.current = false;
      drag = {
        startX: event.clientX,
        startScrollLeft: viewport.scrollLeft,
        moved: false,
      };
    };

    const onPointerMove = (event) => {
      if (!drag || event.pointerType !== "mouse") return;
      const dx = event.clientX - drag.startX;
      if (!drag.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
        drag.moved = true;
        viewport.classList.add("desk-scene__viewport--dragging");
      }
      viewport.scrollLeft = drag.startScrollLeft - dx;
    };

    const onPointerUp = (event) => {
      if (!drag || event.pointerType !== "mouse") return;
      if (drag.moved) suppressClickRef.current = true;
      drag = null;
      viewport.classList.remove("desk-scene__viewport--dragging");
    };

    const onClickCapture = (event) => {
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const onDragStart = (event) => event.preventDefault();

    viewport.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    viewport.addEventListener("click", onClickCapture, true);
    viewport.addEventListener("dragstart", onDragStart);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      viewport.removeEventListener("click", onClickCapture, true);
      viewport.removeEventListener("dragstart", onDragStart);
    };
  }, []);

  return (
    <section
      ref={layoutRef}
      className="desk-layout"
      data-layout="desk"
      style={style}
      tabIndex={0}
      aria-label="Interactive workspace canvas"
    >
      {children}
    </section>
  );
}
