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
  return (
    <g className="desk-scene__layer desk-scene__layer--interaction">
      {WORKSPACE_OBJECTS.map((object) => {
        const chrome = resolveObjectChrome(object, {
          ...chromeProps,
          isLampOn,
          isMusicPlaying,
        });
        const shift =
          object.layer === "window" || object.id === "speaker" || object.id === "camera"
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

        const isToggle = object.action === "lamp" || object.action === "music";
        const isButton = object.action === "mug" || object.action === "plant";
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
