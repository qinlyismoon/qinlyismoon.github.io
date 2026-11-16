/**
 * Small square interest tile — image / icon forward, short label in corner.
 * Optional: external-link imply, grayscale → color on hover, desk curtain.
 */
export default function BentoSquareTile({
  label,
  title,
  image,
  onClick,
  className = "",
  showDeskIcon = false,
  showCurtain = false,
  external = false,
  desaturate = false,
}) {
  const aria = external
    ? `${title || label} (opens in a new tab)`
    : title || label;

  return (
    <article
      className={`bento-tile bento-tile--square ${
        desaturate ? "bento-tile--desaturate" : ""
      } ${showDeskIcon || showCurtain ? "bento-tile--desk" : ""} ${className}`.trim()}
    >
      <button
        type="button"
        className="bento-tile__button bento-tile__button--square"
        onClick={onClick}
        aria-label={aria}
      >
        <div className="bento-tile__media bento-tile__media--square" aria-hidden="true">
          {image ? (
            <img
              src={image}
              alt=""
              className="bento-tile__image"
              loading="lazy"
              decoding="async"
            />
          ) : showDeskIcon ? (
            <div className="bento-tile__desk-scene">
              <div className="bento-tile__desk-sky" />
              <div className="bento-tile__desk-window" />
              <div className="bento-tile__desk-lamp" />
              <div className="bento-tile__desk-monitor" />
              <div className="bento-tile__desk-top" />
            </div>
          ) : (
            <div className="bento-tile__placeholder bento-tile__placeholder--desk" />
          )}
          {showCurtain ? (
            <div className="bento-tile__curtain" aria-hidden="true">
              <span className="bento-tile__curtain-rod" />
              <span className="bento-tile__curtain-panel bento-tile__curtain-panel--left" />
              <span className="bento-tile__curtain-panel bento-tile__curtain-panel--right" />
            </div>
          ) : null}
          <div className="bento-tile__square-caption">
            <span className="bento-tile__square-label">
              {label}
              {external ? (
                <span className="bento-tile__external" aria-hidden="true">
                  {" "}
                  ↗
                </span>
              ) : null}
            </span>
            {title ? (
              <span className="bento-tile__square-title">{title}</span>
            ) : null}
          </div>
        </div>
      </button>
    </article>
  );
}
