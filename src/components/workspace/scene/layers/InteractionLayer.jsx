/**
 * InteractionLayer — the invisible layer.
 *
 * Owns every hit area, keyboard target and hover/focus handler in the
 * scene. Contains no visible graphics at all: it mirrors the visible
 * objects' positions and delegates behavior to the scene controller.
 */
import { SCENE_CONTENT_SHIFT_X } from "../../../../lib/deskLayout";
import { WORKSPACE_OBJECTS } from "../../../../lib/workspaceObjects";
import { resolveObjectChrome } from "../objectChrome";
import { useRef } from "react";

function isExternalHref(href) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:")
  );
}

function HitRect({ object }) {
  const bounds = object.hitBounds;
  if (!bounds) return null;
  return (
    <rect
      x={bounds.x}
      y={bounds.y}
      width={bounds.width}
      height={bounds.height}
      className="desk-scene__hit-area"
    />
  );
}

export default function InteractionLayer({
  hoveredId,
  onHoverChange,
  onActivate,
  chromeProps,
  isLampOn,
  isMusicPlaying,
}) {
  const touchRef = useRef(null);

  return (
    <g className="desk-scene__layer desk-scene__layer--interaction">
      {WORKSPACE_OBJECTS.map((object) => {
        const chrome = resolveObjectChrome(object, {
          ...chromeProps,
          isLampOn,
          isMusicPlaying,
        });
        const shift =
          object.layer === "window" || ["speaker", "camera", "board", "timeline"].includes(object.id)
            ? 0
            : SCENE_CONTENT_SHIFT_X;
        const isHovered = hoveredId === object.id;

        const hoverHandlers = {
          onPointerEnter: () => onHoverChange(object.id, true),
          onPointerLeave: () => onHoverChange(object.id, false),
          onFocus: () => onHoverChange(object.id, true),
          onBlur: () => onHoverChange(object.id, false),
        };
        const activate = (event) => {
          event.stopPropagation();
          onActivate({
            id: object.id,
            action: object.action,
            href: object.href,
            event,
          });
        };
        const keyActivate = (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activate(event);
          }
        };
        const touchHandlers = {
          onPointerDown: (event) => {
            if (event.pointerType === "mouse") return;
            touchRef.current = { id: object.id, x: event.clientX, y: event.clientY, moved: false };
          },
          onPointerMove: (event) => {
            const touch = touchRef.current;
            if (!touch || touch.id !== object.id) return;
            if (Math.hypot(event.clientX - touch.x, event.clientY - touch.y) > 8) touch.moved = true;
          },
          onPointerUp: (event) => {
            const touch = touchRef.current;
            touchRef.current = null;
            if (!touch || touch.id !== object.id || touch.moved) return;
            event.preventDefault();
            activate(event);
          },
          onPointerCancel: () => {
            touchRef.current = null;
          },
        };

        const isToggle = object.action === "lamp" || object.action === "music";
        const isButton = object.action === "mug" || object.action === "plant" || object.action === "archive";
        const isLink = Boolean(object.href) && !isToggle && !isButton;
        const isHoverOnly = !isLink && !isToggle && !isButton;
        const external = isLink && isExternalHref(object.href);

        let hit;
        if (isLink) {
          hit = (
            <a
              href={object.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="desk-scene__hit"
              data-hovered={isHovered || undefined}
              aria-label={chrome.ariaLabel}
              onClick={activate}
              {...hoverHandlers}
            >
              <HitRect object={object} />
            </a>
          );
        } else if (isToggle || isButton) {
          hit = (
            <g
              role="button"
              tabIndex={0}
              className="desk-scene__hit"
              data-hovered={isHovered || undefined}
              aria-label={chrome.ariaLabel}
              aria-pressed={isToggle ? (object.action === "lamp" ? isLampOn : isMusicPlaying) : undefined}
              onClick={activate}
              onKeyDown={keyActivate}
              {...touchHandlers}
              {...hoverHandlers}
            >
              <HitRect object={object} />
            </g>
          );
        } else {
          hit = (
            <g
              className="desk-scene__hit desk-scene__hit--hover"
              onPointerEnter={hoverHandlers.onPointerEnter}
              onPointerLeave={hoverHandlers.onPointerLeave}
            >
              <HitRect object={object} />
            </g>
          );
        }

        return (
          <g key={object.id} transform={`translate(${shift}, 0)`}>
            <g transform={object.transform}>{hit}</g>
          </g>
        );
      })}
    </g>
  );
}
