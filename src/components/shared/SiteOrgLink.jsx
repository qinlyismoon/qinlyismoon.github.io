/**
 * Institution chip — mark + name + arrow as one unit (soft fill, stronger
 * ink, hover scale). Used in About + case-study prose so org jumps read
 * apart from body copy.
 */
import { ORG_MARKS, orgMarkByHref } from "../../lib/orgMarks";

export default function SiteOrgLink({
  org,
  href,
  icon,
  children,
  className = "",
}) {
  const mark =
    (org && ORG_MARKS[org]) ||
    (href ? orgMarkByHref(href) : null) ||
    null;
  const linkHref = href || mark?.href;
  const linkIcon = icon || mark?.icon;
  const label = children || mark?.labelEn;

  if (!linkHref || !label) return null;

  return (
    <a
      className={["site-text-link", "site-org-link", className]
        .filter(Boolean)
        .join(" ")}
      href={linkHref}
      target="_blank"
      rel="noreferrer"
    >
      {linkIcon ? (
        <img
          className="site-org-link__mark"
          src={linkIcon}
          alt=""
          width="16"
          height="16"
          loading="lazy"
          decoding="async"
        />
      ) : null}
      <span className="site-org-link__label">{label}</span>
      <span className="external-arrow" aria-hidden="true">
        {" "}
        ↗︎
      </span>
    </a>
  );
}
