import { Fragment, useEffect, useId, useRef, useState } from "react";
import { useLocalTimeLabel } from "../../lib/useLocalTime";
import { PORTFOLIO_LINKS } from "../../lib/links";
import SystemStatus from "./SystemStatus";

/**
 * Contact links live in the identity block as one quiet text line — words
 * separated by middle dots, no label. They follow the design-system Links
 * rule: the .ds-link underline voice, and the external-link arrow (↗)
 * on destinations that open a new page. The Lucide contact icon system
 * was retired (2026-10-01): text links fit the editorial typography
 * language and lighten the panel.
 */
const CONTACT_LINKS = [
  { key: "email", href: PORTFOLIO_LINKS.email, external: false },
  { key: "github", href: PORTFOLIO_LINKS.github, external: true },
  { key: "linkedin", href: PORTFOLIO_LINKS.linkedin, external: true },
];

/**
 * Smooth-scrolls to an in-page section. Works with any scroll container
 * (scrollIntoView scrolls every scrollable ancestor); honors the user's
 * reduced-motion preference.
 */
function scrollToSection(event, targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;
  event.preventDefault();
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Live values (desk lamp status, the clock) update in place. The span
 * itself never remounts: on each change it fades out, swaps text at the
 * midpoint, then fades back in — one calm motion, no blink. (Keying the
 * span on its text removed the old value in the same frame the new one
 * started at opacity 0, which read as a flicker.) 120ms out + 120ms in
 * stays near the system's 200ms motion voice. Under reduced motion the CSS
 * transition is disabled (see site-chrome.css) and the swap is instant.
 */
function LiveValue({ value }) {
  const [display, setDisplay] = useState(value);
  const [fading, setFading] = useState(false);
  // Mirrors `display` for the effect below, which intentionally depends
  // on `value` only: the display-sync re-render must not cancel the
  // in-flight fade's timers.
  const displayRef = useRef(value);
  const timersRef = useRef([]);

  useEffect(() => {
    // A newer toggle cancelled the fade before the text changed — settle
    // back to visible instead of leaving the span faded out.
    if (value === displayRef.current) {
      setFading(false);
      return undefined;
    }
    const clearTimers = () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
      timersRef.current = [];
    };
    clearTimers();
    // Reduced motion: swap instantly, no fade (mirrors the CSS, which
    // disables the transition under prefers-reduced-motion).
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      displayRef.current = value;
      setDisplay(value);
      setFading(false);
      return clearTimers;
    }
    setFading(true);
    timersRef.current.push(
      window.setTimeout(() => {
        displayRef.current = value;
        setDisplay(value);
        timersRef.current.push(
          window.setTimeout(() => setFading(false), 120),
        );
      }, 120),
    );
    return clearTimers;
  }, [value]);

  useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    [],
  );

  return (
    <span className={`context-metadata__value${fading ? " is-fading" : ""}`}>
      {display}
    </span>
  );
}

function ContextMetadata({ item }) {
  const localTime = useLocalTimeLabel();

  if (item.status) {
    return (
      <div className="context-metadata context-metadata--status">
        <dt className="sr-only">{item.label}</dt>
        <dd className="context-column__availability">
          <span className="context-column__status-dot" aria-hidden="true" />
          <LiveValue value={item.value} />
        </dd>
      </div>
    );
  }

  // Directory variant: a heading over a stack of in-page section links
  // (Case Studies default state). The heading remains mounted while only the
  // content slot beneath it swaps to project details on card hover.
  if (item.links) {
    const contentKey = item.contentSwapKey ?? "directory";
    return (
      <div className="context-metadata">
        <dt>{item.label}</dt>
        <dd>
          <div key={contentKey} className="context-metadata__content-swap">
            {item.details?.length ? (
              <div className="context-metadata__details">
                {item.details.map((detail) => (
                  <div className="context-metadata__detail" key={detail.key ?? detail.label}>
                    <span className="context-metadata__detail-label">
                      {detail.label}
                    </span>
                    <span className="context-metadata__detail-value">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="context-metadata__links">
                {item.links.map((link) => (
                  <a
                    key={link.target}
                    href={`#${link.target}`}
                    className="context-metadata__link"
                    onClick={(event) => scrollToSection(event, link.target)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </dd>
      </div>
    );
  }

  const value = item.dynamic === "localTime" ? localTime : item.value;

  return (
    <div className="context-metadata">
      <dt>{item.label}</dt>
      {/* Live values swap through <LiveValue>: the span stays mounted and
          fades out/in around the text change, so the metadata block never
          remounts and the swap can't blink. */}
      <dd>
        <LiveValue value={value} />
      </dd>
    </div>
  );
}

/**
 * Fixed information panel: three regions (identity / page metadata /
 * system status). Divider positions never move between pages — only
 * the content inside each region changes per route (the system status
 * region is identical on every page). The handwritten logo, name, roles
 * and contact links form one identity block with no divider between
 * them. Generous whitespace between metadata and system status is
 * intentional — the sidebar reads as an editorial margin, not a filled
 * panel.
 */
export default function ContextColumn({
  identity,
  metadata = [],
  contactLabels,
  page,
  direction = "none",
  metadataSwapKey,
}) {
  const headingId = useId();
  const previousMetadataStateRef = useRef({ page, mode: null });
  const roles = identity.roles ?? [];
  const metadataMode =
    page === "caseStudies"
      ? metadata.some((item) => item.links)
        ? "directory"
        : "project"
      : page;
  const shouldAnimateMetadataMode =
    previousMetadataStateRef.current.page === page &&
    previousMetadataStateRef.current.mode !== null &&
    previousMetadataStateRef.current.mode !== metadataMode;

  useEffect(() => {
    previousMetadataStateRef.current = { page, mode: metadataMode };
  }, [metadataMode, page]);

  return (
    <aside className="context-column" aria-labelledby={headingId}>
      <section
        className="context-column__region context-column__region--identity"
        aria-label="Identity"
      >
        <img
          className="context-column__logo"
          src="/name-logo.png"
          alt=""
          aria-hidden="true"
        />
        <p id={headingId} className="context-column__name">{identity.name}</p>
        <p className="context-column__roles">
          {roles.map((role) => (
            <span key={role} className="context-column__role">{role}</span>
          ))}
        </p>
        <p className="context-column__contact-line">
          {CONTACT_LINKS.map(({ key, href, external }, index) => (
            <Fragment key={key}>
              {index > 0 ? (
                <span aria-hidden="true" className="context-column__contact-separator">
                  {" · "}
                </span>
              ) : null}
              <a
                className="ds-link"
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
              >
                {contactLabels[key]}
                {external ? <span aria-hidden="true">{" ↗"}</span> : null}
              </a>
            </Fragment>
          ))}
        </p>
      </section>

      <section
        className="context-column__region context-column__region--metadata"
        aria-label="Page information"
      >
        {/* The section (and its divider) stays static; only the inner
            content remounts and slides on page change — or vertically on
            hover-driven overrides. */}
        <div
          key={metadataSwapKey ?? page}
          className={`context-column__metadata-swap context-column__metadata-swap--${direction}`}
        >
          {metadata.length ? (
            <dl
              key={metadataMode}
              className={`context-column__metadata${
                page === "caseStudies"
                  ? " context-column__metadata--case-study-mode"
                  : ""
              }${
                shouldAnimateMetadataMode
                  ? " context-column__metadata--mode-transition"
                  : ""
              }`}
            >
              {metadata.map((item) => (
                <ContextMetadata item={item} key={item.key ?? item.label} />
              ))}
            </dl>
          ) : null}


        </div>
      </section>

      <section className="context-column__region context-column__region--system-status">
        <SystemStatus />
      </section>
    </aside>
  );
}
