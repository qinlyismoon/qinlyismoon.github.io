/**
 * Teaching strip — thumb + course line; more pinned bottom-right like About.
 */
export default function TeachingTile({ label, note, moreLabel = "more", onClick }) {
  return (
    <article className="bento-tile bento-tile--teaching">
      <button
        type="button"
        className="bento-tile__button bento-tile__button--teaching"
        onClick={onClick}
        aria-label={label}
      >
        <div className="teaching-tile__thumb" aria-hidden="true">
          <img
            className="teaching-tile__bleed"
            src="/t-teaching.jpg"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="teaching-tile__caption">
          <div className="teaching-tile__copy">
            <p className="bento-tile__kicker">{label}</p>
            {note ? <p className="teaching-tile__note">{note}</p> : null}
          </div>
          <span className="teaching-tile__more" aria-hidden="true">
            {moreLabel}
            <span className="teaching-tile__more-arrow">→</span>
          </span>
        </div>
      </button>
    </article>
  );
}
