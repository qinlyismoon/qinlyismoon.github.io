/**
 * Scene — the shared page-layout primitive.
 *
 * Every page follows the same skeleton:
 *
 *   Page
 *   ├── Navigation   (SiteShell)
 *   ├── Sidebar      (SiteShell)
 *   └── Scene        (this component)
 *       ├── Background
 *       ├── Content
 *       ├── Overlay
 *       ├── Floating UI
 *       └── Effects
 *
 * Pages swap the scene; the shell never moves. New capabilities
 * (widgets, assistants, notifications) arrive as new layers or as
 * floating UI — never as edits to a monolith.
 */
export default function Scene({
  background,
  overlay,
  floating,
  effects,
  className = "",
  contentClassName = "",
  style,
  label,
  children,
}) {
  return (
    <div
      className={`scene${className ? ` ${className}` : ""}`}
      style={style}
      role={label ? "region" : undefined}
      aria-label={label}
    >
      {background ? (
        <div className="scene__background" aria-hidden="true">
          {background}
        </div>
      ) : null}
      <div className={`scene__content${contentClassName ? ` ${contentClassName}` : ""}`}>{children}</div>
      {overlay ? <div className="scene__overlay">{overlay}</div> : null}
      {floating ? <div className="scene__floating">{floating}</div> : null}
      {effects ? (
        <div className="scene__effects" aria-hidden="true">
          {effects}
        </div>
      ) : null}
    </div>
  );
}
