import { RiGithubFill, RiLinkedinFill, RiMailLine } from "react-icons/ri";
import { PORTFOLIO_LINKS } from "../../lib/links";

const SOCIAL_ITEMS = [
  { key: "email", Icon: RiMailLine, href: PORTFOLIO_LINKS.email },
  {
    key: "github",
    Icon: RiGithubFill,
    href: PORTFOLIO_LINKS.github,
  },
  { key: "linkedin", Icon: RiLinkedinFill, href: PORTFOLIO_LINKS.linkedin },
];

export default function PortfolioNav({ copy }) {
  return (
    <section className="contact-index" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="index-section__heading">
        {copy.contactTitle}
      </h2>
      <div className="contact-index__links">
        {SOCIAL_ITEMS.map((item) => {
          const Icon = item.Icon;
          return (
            <a
              key={item.key}
              className="contact-link"
              href={item.href}
              target={item.key === "email" ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              <Icon aria-hidden="true" />
              <span>{copy[item.key]}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
