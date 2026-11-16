/**
 * Four hobby strips beside vibe coding — one row each, sticker tilts
 * only on that strip’s hover.
 */
export default function HobbyListTile({ label, items }) {
  if (!items?.length) return null;

  return (
    <section className="hobby-stack" aria-label={label}>
      <p className="bento-tile__kicker hobby-stack__kicker">{label}</p>
      <ul className="hobby-stack__list">
        {items.map((item) => (
          <li key={item.id} className="hobby-stack__item">
            <article className="bento-tile hobby-strip">
              {item.sticker ? (
                <span
                  className="hobby-strip__sticker"
                  style={{ "--sticker-tilt": `${item.tilt ?? -4}deg` }}
                  aria-hidden="true"
                >
                  <img
                    src={item.sticker}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              ) : null}
              <div className="hobby-strip__copy">
                <p className="hobby-strip__title">{item.title}</p>
                {item.note ? (
                  <p className="hobby-strip__note">{item.note}</p>
                ) : null}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
