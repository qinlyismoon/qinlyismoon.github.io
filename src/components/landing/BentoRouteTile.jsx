/**
 * A bento tile that navigates to another site section (Teaching, Desk).
 * Image is optional — text-led tiles still read as blocks in the grid.
 */
export default function BentoRouteTile({
  label,
  title,
  note,
  image,
  onClick,
  className = "",
}) {
  return (
    <article className={`bento-tile bento-tile--route ${className}`.trim()}>
      <button
        type="button"
        className="bento-tile__button"
        onClick={onClick}
        aria-label={title}
      >
        {image ? (
          <div className="bento-tile__media" aria-hidden="true">
            <img
              src={image}
              alt=""
              className="bento-tile__image"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
        <div className="bento-tile__body">
          <p className="bento-tile__kicker">{label}</p>
          <h3 className="bento-tile__title">{title}</h3>
          {note ? <p className="bento-tile__note">{note}</p> : null}
        </div>
      </button>
    </article>
  );
}
