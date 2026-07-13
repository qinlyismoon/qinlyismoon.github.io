import { PORTFOLIO_LINKS } from "../../lib/links";

export default function AboutClosing({ copy }) {
  return (
    <section className="about-closing" aria-labelledby="about-closing-heading">
      <div className="about-closing__inner">
        <h2 id="about-closing-heading" className="about-closing__heading">
          {copy.heading}
        </h2>
        {copy.body ? <p className="about-closing__body">{copy.body}</p> : null}
        <a className="about-closing__cta" href={PORTFOLIO_LINKS.email}>
          <span>{copy.cta}</span>
          <span className="about-closing__cta-arrow" aria-hidden="true">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
