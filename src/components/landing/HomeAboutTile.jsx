/**
 * Home about block — Hudson-style: title on top, photo floats,
 * status + More share the footer row.
 * Hover swaps the headshot for a wink — same crop, expression only.
 */
import headshot from "../../assets/about/professional-headshot.jpg";
import headshotWink from "../../assets/about/professional-headshot-wink.jpg";
import SiteOrgLink from "../shared/SiteOrgLink";

/** Home shows the positioning line and the first paragraph (background,
 *  school, internship) — enough to know who made the work below. The
 *  rest (research, teaching) reads on the About page, behind "more about
 *  me". The XR line is kept aside (homeBento xrDirection) for a future
 *  Projects write-up.
 *  Raise this to show more here. */
const HOME_ABOUT_PARAGRAPHS = 1;

function AboutRichText({ parts }) {
  if (typeof parts === "string") return parts;
  return parts.map((part, index) => {
    const className = [
      part.href && !part.org && !part.icon ? "site-text-link" : null,
      part.strong ? "home-about-tile__strong" : null,
    ]
      .filter(Boolean)
      .join(" ");
    if (part.href) {
      if (part.org || part.icon) {
        return (
          <SiteOrgLink
            key={`${part.t}-${index}`}
            org={part.org}
            href={part.href}
            icon={part.icon}
            className={part.strong ? "home-about-tile__strong" : undefined}
          >
            {part.t}
          </SiteOrgLink>
        );
      }
      return (
        <a
          key={`${part.t}-${index}`}
          className={className}
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
      );
    }
    return (
      <span key={`${part.t}-${index}`} className={className || undefined}>
        {part.t}
      </span>
    );
  });
}

function AboutPhotoStack({ alt = "" }) {
  return (
    <span className="home-about-tile__photo-stack">
      <img
        className="home-about-tile__photo-img home-about-tile__photo-img--rest"
        src={headshot}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
      <img
        className="home-about-tile__photo-img home-about-tile__photo-img--wink"
        src={headshotWink}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </span>
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
            <AboutPhotoStack />
          </button>
        ) : (
          <figure className="home-about-tile__photo">
            <AboutPhotoStack alt={copy.photoAlt} />
          </figure>
        )}
        {copy.aboutLead ? (
          <p className="home-about-tile__body home-about-tile__body--lead">
            <AboutRichText parts={copy.aboutLead} />
          </p>
        ) : null}
        {copy.aboutBody.slice(0, HOME_ABOUT_PARAGRAPHS).map((paragraph, index) => (
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
