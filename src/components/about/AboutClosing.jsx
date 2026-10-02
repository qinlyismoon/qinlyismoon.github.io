import { PORTFOLIO_LINKS } from "../../lib/links";
import { Button, Section } from "../shared/DesignSystem";

export default function AboutClosing({ copy }) {
  return (
    <Section
      id="about-closing"
      className="about-closing"
      aria-labelledby="about-closing-heading"
    >
      <div className="about-closing__inner">
        <h2 id="about-closing-heading" className="about-closing__heading">
          {copy.heading}
        </h2>
        {copy.body ? <p className="about-closing__body">{copy.body}</p> : null}
        <Button
          as="a"
          className="about-closing__cta"
          href={PORTFOLIO_LINKS.email}
        >
          {copy.cta}
        </Button>
      </div>
    </Section>
  );
}
