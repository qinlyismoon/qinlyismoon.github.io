/**
 * Home about block — Hudson-style: title on top, photo floats,
 * status + More share the footer row.
 */
import headshot from "../../assets/about/professional-headshot.jpg";

function AboutRichText({ parts }) {
  if (typeof parts === "string") return parts;
  return parts.map((part, index) =>
    part.href ? (
      <a
        key={`${part.t}-${index}`}
        className="site-text-link"
        href={part.href}
        target="_blank"
        rel="noreferrer"
      >
        {part.t}
        <span className="external-arrow" aria-hidden="true">
          {" "}
          ↗︎
        </span>
      </a>
    ) : (
      <span key={`${part.t}-${index}`}>{part.t}</span>
    ),
  );
}

export default function HomeAboutTile({ copy, onMore }) {
  return (
    <article className="bento-tile home-about-tile">
      <p className="bento-tile__kicker home-about-tile__title">
        {copy.aboutTitle}
      </p>

      <div className="home-about-tile__flow">
        {onMore ? (
          <button
            type="button"
            className="home-about-tile__photo"
            onClick={onMore}
            aria-label={copy.aboutMore}
          >
            <img
              src={headshot}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </button>
        ) : (
          <figure className="home-about-tile__photo">
            <img
              src={headshot}
              alt={copy.photoAlt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        )}
        {copy.aboutLead ? (
          <p className="home-about-tile__body">{copy.aboutLead}</p>
        ) : null}
        {copy.aboutBody.map((paragraph, index) => (
          <p key={index} className="home-about-tile__body">
            <AboutRichText parts={paragraph} />
          </p>
        ))}
      </div>

      <div className="home-about-tile__footer">
        <ul className="home-about-tile__status">
          <li className="home-about-tile__status-item home-about-tile__status-item--open">
            {copy.openToWork}
          </li>
        </ul>
        {onMore ? (
          <button
            type="button"
            className="home-about-tile__more"
            onClick={onMore}
          >
            {copy.aboutMore}
            <span className="home-about-tile__more-arrow" aria-hidden="true">
              →
            </span>
          </button>
        ) : null}
      </div>
    </article>
  );
}
