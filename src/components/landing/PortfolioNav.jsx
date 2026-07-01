import emailIcon from "../../assets/email.png";
import linkedinIcon from "../../assets/linkedin.png";
import instagramIcon from "../../assets/instagram.png";
import { PORTFOLIO_LINKS } from "../../lib/links";

const SOCIAL_ITEMS = [
  { label: "Email", icon: emailIcon, href: PORTFOLIO_LINKS.email },
  { label: "LinkedIn", icon: linkedinIcon, href: PORTFOLIO_LINKS.linkedin },
  { label: "Instagram", icon: instagramIcon, href: PORTFOLIO_LINKS.instagram },
];

export default function PortfolioNav({ copy, themeColors, isDarkMode }) {
  const linkItems = [
    { key: "design", label: copy.design, href: PORTFOLIO_LINKS.design },
    { key: "ux", label: copy.ux, href: PORTFOLIO_LINKS.ux },
    {
      key: "vibeCoding",
      label: copy.vibeCoding,
      href: PORTFOLIO_LINKS.vibeCoding,
    },
  ];

  return (
    <nav className="portfolio-nav" aria-label="Portfolio links">
      <div className="portfolio-nav__links">
        {linkItems.map((item) => (
          <button
            key={item.key}
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
        ))}
      </div>

      <div className="portfolio-nav__social">
        {SOCIAL_ITEMS.map((item) => (
          <button
            key={item.label}
            type="button"
            className="portfolio-nav__social-button"
            aria-label={item.label}
            onClick={() =>
              window.open(item.href, "_blank", "noopener,noreferrer")
            }
          >
            <img
              src={item.icon}
              alt=""
              className="portfolio-nav__social-icon"
              style={{
                filter: isDarkMode ? "brightness(0) invert(1)" : "none",
              }}
            />
          </button>
        ))}
      </div>
    </nav>
  );
}
