import { RiGithubFill } from "react-icons/ri";
import emailIcon from "../../assets/email.png";
import linkedinIcon from "../../assets/linkedin.png";
import { PORTFOLIO_LINKS } from "../../lib/links";

const SOCIAL_ITEMS = [
  { label: "Email", icon: emailIcon, href: PORTFOLIO_LINKS.email },
  { label: "LinkedIn", icon: linkedinIcon, href: PORTFOLIO_LINKS.linkedin },
  {
    label: "GitHub",
    ariaLabel: "Visit Longyue's GitHub profile",
    Icon: RiGithubFill,
    href: PORTFOLIO_LINKS.github,
  },
];

export default function PortfolioNav({ copy, themeColors, isDarkMode }) {
  const linkItems = [
    { key: "design", label: copy.design, href: PORTFOLIO_LINKS.design },
    {
      key: "vibeCoding",
      label: copy.vibeCoding,
      href: PORTFOLIO_LINKS.vibeCoding,
    },
  ];

  const iconFilter = isDarkMode ? "brightness(0) invert(1)" : "none";

  return (
    <nav className="portfolio-nav" aria-label="Portfolio links">
      <div className="portfolio-nav__links">
        {linkItems.map((item, index) => (
          <span key={item.key} className="portfolio-nav__link-wrap">
            {index > 0 ? (
              <span className="portfolio-nav__divider" aria-hidden="true" />
            ) : null}
            <button
              type="button"
              className="portfolio-nav__link"
              style={{ color: themeColors.text }}
              onClick={() =>
                window.open(item.href, "_blank", "noopener,noreferrer")
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.color = themeColors.mutedText;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = themeColors.text;
              }}
            >
              {item.label}
            </button>
          </span>
        ))}
      </div>

      <div className="portfolio-nav__social">
        {SOCIAL_ITEMS.map((item) => {
          const Icon = item.Icon;

          return (
            <a
              key={item.label}
              className="portfolio-nav__social-button social-button"
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.ariaLabel ?? item.label}
            >
              {Icon ? (
                <Icon
                  className="portfolio-nav__social-icon github-icon"
                  aria-hidden="true"
                  style={{ filter: iconFilter }}
                />
              ) : (
                <img
                  src={item.icon}
                  alt=""
                  className="portfolio-nav__social-icon"
                  style={{ filter: iconFilter }}
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
