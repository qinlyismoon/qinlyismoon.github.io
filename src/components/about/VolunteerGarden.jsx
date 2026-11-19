import { useState } from "react";

/**
 * Volunteering as a windowsill of keepsakes, one per experience, in the
 * same flat two-tone style as the lighthouse blocks: a camera (volunteer
 * photographer), a Tibetan antelope (environmental volunteering at the
 * Yangtze source with Green River), a potted sprout (volunteer teaching). Hover, focus or tap one to read
 * what it was. The conference volunteer role is a pin at the sill's end.
 */
const COPY = {
  en: {
    kicker: "volunteering",
    title: "Doing something that matters",
    // Newest first — read left to right, back in time.
    items: [
      { id: "photo", org: "WeBright", role: "Volunteer photographer", meta: "Jiuzhaigou, Sichuan · Jan – Feb 2024" },
      { id: "river", org: "Green River", role: "Environmental volunteer", meta: "Yangtze source, 4,540 m · Dec 2023 – Jan 2024" },
      { id: "teach", org: "WeBright", role: "Volunteer teacher", meta: "Guangyuan, Sichuan · Summer 2023" },
    ],
    pin: { org: "ACM SIGGRAPH 2025", role: "Student volunteer", meta: "Vancouver · Aug 2025" },
  },
  zh: {
    kicker: "志愿",
    title: "做有意义的事",
    items: [
      { id: "photo", org: "微光公益", role: "摄影志愿者", meta: "四川九寨沟 · 2024.1 – 2024.2" },
      { id: "river", org: "绿色江河", role: "环保志愿者", meta: "长江源，海拔 4540 米 · 2023.12 – 2024.1" },
      { id: "teach", org: "微光公益", role: "支教老师", meta: "四川广元 · 2023 夏" },
    ],
    pin: { org: "ACM SIGGRAPH 2025", role: "学生志愿者", meta: "温哥华 · 2025.8" },
  },
};

// Lighthouse palette, quieter: cream pots, sage leaves, one soft accent.
const CREAM = "#f6f2e9";
const CREAM_EDGE = "#e3ddce";
const LEAF = "#9bb293";
const LEAF_DEEP = "#7f9878";
const PETAL = "#e3a99f";
const YELLOW = "#ecc96a";
const YELLOW_EDGE = "#dab454";
const BLUE = "#93b5da";
const BLUE_EDGE = "#7c9fc8";
// Tibetan antelope: pale fawn coat, darker horn — warm neutrals that sit
// between the cream pots and the clay one.
const FAWN = "#ead6b8";
const FAWN_EDGE = "#d6bb94";
const HORN = "#8d8273";

/* Each plant: a pot (two tones) + its own leaves. viewBox 0 0 60 80. */
function Pot({ face, edge }) {
  return (
    <g>
      <rect x="14" y="52" width="32" height="6" rx="1.5" fill={face} />
      <path d="M17 58 H43 L40 76 Q39.5 78 37.5 78 H22.5 Q20.5 78 20 76 Z" fill={face} />
      <path d="M38 58 H43 L40 76 Q39.5 78 37.5 78 H35 Z" fill={edge} />
      <rect x="40" y="52" width="6" height="6" rx="1.5" fill={edge} />
    </g>
  );
}

function Antelope() {
  // Green River, environmental volunteering at the Yangtze source
  // (4,540 m): a Tibetan antelope, the plateau animal the station protects. Stands on the sill, no pot; on
  // hover its head lifts, as if it heard you.
  return (
    <g>
      {/* far legs (shade) */}
      <rect x="21.5" y="60" width="3" height="18" rx="1.5" fill={FAWN_EDGE} />
      <rect x="40.5" y="60" width="3" height="18" rx="1.5" fill={FAWN_EDGE} />
      {/* body */}
      <path d="M17 56 C17 49 23 46 31 46 C40 46 47 48 47 55 C47 61 41 63 32 63 C23 63 17 61 17 56 Z" fill={FAWN} />
      <path d="M20 59 C25 62 39 62.5 46 58 C45 61.5 40 63 32 63 C25 63 21 61.5 20 59 Z" fill={FAWN_EDGE} />
      <ellipse cx="47.6" cy="52.4" rx="1.7" ry="2.6" transform="rotate(-25 47.6 52.4)" fill={FAWN_EDGE} />
      {/* near legs */}
      <rect x="24.5" y="60" width="3.2" height="18" rx="1.6" fill={FAWN} />
      <rect x="37.5" y="60" width="3.2" height="18" rx="1.6" fill={FAWN} />
      {/* neck + head */}
      <g className="garden-antelope__head">
        <path d="M18.5 51 C17 45 16.5 40 17 35 L23 35 C23 40 23.5 45 25 49 Z" fill={FAWN} />
        <path d="M11 37.5 C11 33.5 14 31 18.5 31 C22.5 31 24.5 33.5 24 37 C23.5 40 20 41 16 41 C13 41 11 39.8 11 37.5 Z" fill={FAWN} />
        <path d="M11 37.5 C11 35.6 12 34.3 13.4 33.7 C13 35.6 13.2 38.6 14.2 40.7 C12.2 40.3 11 39.2 11 37.5 Z" fill={FAWN_EDGE} />
        <ellipse cx="23.5" cy="32" rx="1.6" ry="3" transform="rotate(30 23.5 32)" fill={FAWN_EDGE} />
        <circle cx="16.6" cy="35.4" r="1.05" fill={HORN} />
        {/* the long, nearly straight horns */}
        <path d="M18.6 31.5 C18.2 24 18.8 18 20.4 12" stroke={HORN} strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path d="M21 31.8 C21.2 25 22.4 19.5 24.4 14" stroke={HORN} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.75" />
      </g>
    </g>
  );
}

function Camera() {
  // Volunteer photographer. On hover the flash window lights.
  return (
    <g>
      {/* top: viewfinder hump + shutter */}
      <path d="M21 52 L24.5 46 H35.5 L39 52 Z" fill={BLUE_EDGE} />
      <rect x="42" y="48.5" width="6" height="3.5" rx="1.2" fill={YELLOW} />
      {/* body (face + edge, like the pots) */}
      <rect x="9" y="52" width="42" height="26" rx="4.5" fill={BLUE} />
      <path d="M43 52 H46.5 Q51 52 51 56.5 V73.5 Q51 78 46.5 78 H43 Z" fill={BLUE_EDGE} />
      {/* lens */}
      <circle cx="28" cy="65" r="9.5" fill={CREAM} />
      <circle cx="28" cy="65" r="6" fill={BLUE_EDGE} />
      <circle cx="26" cy="63" r="1.7" fill={CREAM} />
      {/* flash window: lights on hover */}
      <rect className="garden-camera__flash" x="12.5" y="55.5" width="6" height="3.5" rx="1.2" fill={CREAM} />
    </g>
  );
}

function Sprout() {
  // Teaching: a young sprout, two leaves opening.
  return (
    <g className="garden-plant__leaves">
      <path d="M30 52 V30" stroke={LEAF_DEEP} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M30 36 C22 36 15 31 14 22 C23 22 29 27 30 36 Z" fill={LEAF} />
      <path d="M30 31 C38 31 45 25 46 16 C37 16 31 22 30 31 Z" fill={LEAF_DEEP} />
      <ellipse cx="30" cy="26" rx="3.6" ry="4.4" fill={YELLOW_EDGE} />
      <ellipse cx="29.4" cy="25.2" rx="2.6" ry="3.4" fill={YELLOW} />
    </g>
  );
}

// pot: null → the piece stands on the sill by itself.
const PLANTS = {
  photo: { Leaves: Camera, pot: null },
  river: { Leaves: Antelope, pot: null },
  teach: { Leaves: Sprout, pot: [CREAM, CREAM_EDGE] },
};

function Plant({ id }) {
  const { Leaves, pot } = PLANTS[id];
  return (
    <svg className="garden-plant__art" viewBox="0 0 60 80" aria-hidden="true" focusable="false">
      <Leaves />
      {pot ? <Pot face={pot[0]} edge={pot[1]} /> : null}
    </svg>
  );
}

function Pin({ pin, active, onEnter, onLeave }) {
  return (
    <button
      type="button"
      className={`garden-pin${active ? " is-active" : ""}`}
      aria-label={`${pin.org} · ${pin.role} · ${pin.meta}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onEnter}
    >
      <svg viewBox="0 0 56 56" aria-hidden="true" focusable="false">
        <circle cx="28" cy="29" r="22" fill={CREAM_EDGE} />
        <circle cx="28" cy="28" r="22" fill={CREAM} />
        <circle cx="28" cy="28" r="17" fill="none" stroke={LEAF_DEEP} strokeWidth="1.3" strokeDasharray="2.2 2.8" />
        <path d="M28 17.5 l3 6.7 7.3.6 -5.5 4.8 1.7 7.1 -6.5-3.9 -6.5 3.9 1.7-7.1 -5.5-4.8 7.3-.6z" fill={YELLOW} />
      </svg>
    </button>
  );
}

export default function VolunteerGarden({ language, stacked = false }) {
  const t = COPY[language] ?? COPY.en;
  const [active, setActive] = useState(null);
  const entries = ["pin", ...t.items];
  const shelves = stacked ? [entries.slice(0, 2), entries.slice(2)] : [entries];
  const idOf = (entry) => (entry === "pin" ? "pin" : entry.id);
  const activeShelf = shelves.findIndex((shelf) =>
    shelf.some((entry) => idOf(entry) === active),
  );
  // Stacked: the details float over the OTHER shelf (whose pieces fade
  // back), so the hovered piece is never covered and no space is reserved
  // under the title.
  const captionRow = stacked && activeShelf >= 0 ? 1 - activeShelf : null;
  const details = [
    { id: "pin", ...t.pin },
    ...t.items,
  ];
  const current =
    active === "pin" ? t.pin : t.items.find((item) => item.id === active) ?? null;

  return (
    <section
      className={`bento-tile about-tile about-tile--garden${
        stacked ? " is-stacked" : ""
      }`}
      aria-labelledby="garden-title"
    >
      <div className="about-tile__split garden__split">
        <div className="about-tile__text">
          <p className="bento-tile__kicker about-tile__kicker">{t.kicker}</p>
          <h2 id="garden-title" className="about-tile__title">
            {t.title}
          </h2>
          {/* Every keepsake's details are laid out in the same cell, all
              but the active one invisible — so the note is always as tall
              as the longest of them, at any width, and hovering never
              changes the tile's height. */}
          <div
            className="about-tile__body garden__note"
            hidden={stacked}
          >
            {details.map((detail) => (
              <div
                key={detail.id}
                className={`garden__card${active === detail.id ? " is-shown" : ""}`}
                aria-hidden="true"
              >
                <p className="garden__org">
                  {detail.org} <span>· {detail.role}</span>
                </p>
                <p className="garden__when">{detail.meta}</p>
              </div>
            ))}
          </div>
          {/* Announces the details whichever way they are shown. */}
          <span className="visually-hidden" aria-live="polite">
            {current ? `${current.org} · ${current.role} · ${current.meta}` : ""}
          </span>
        </div>

        {/* Full width: one sill, newest first. Stacked (beside
            "honesty"): two shelves of two — pin + camera, then antelope +
            sprout — that share whatever height honesty gives the row. */}
        <div
          className={`garden__shelves${stacked ? " garden__shelves--fit" : ""}`}
          data-caption-row={captionRow ?? undefined}
          onMouseLeave={() => setActive(null)}
        >
          {captionRow !== null && current ? (
            <div
              key={active}
              className="garden__float"
              style={{ gridRow: captionRow + 1 }}
              aria-hidden="true"
            >
              <p className="garden__org">
                {current.org} <span>· {current.role}</span>
              </p>
              <p className="garden__when">{current.meta}</p>
            </div>
          ) : null}
          {shelves.map(
            (shelf, shelfIndex) => (
              <ul
                key={shelfIndex}
                className="garden__sill"
                style={stacked ? { gridRow: shelfIndex + 1 } : undefined}
              >
                {shelf.map((entry) =>
                  entry === "pin" ? (
                    <li key="pin" className="garden__pin-slot garden__spot garden__spot--pin">
                      <Pin
                        pin={t.pin}
                        active={active === "pin"}
                        onEnter={() => setActive("pin")}
                        onLeave={() => setActive(null)}
                      />
                    </li>
                  ) : (
                    <li key={entry.id} className={`garden__spot garden__spot--${entry.id}`}>
                      <button
                        type="button"
                        className={`garden-plant garden-plant--${entry.id}${
                          active === entry.id ? " is-active" : ""
                        }`}
                        aria-label={`${entry.org} · ${entry.role} · ${entry.meta}`}
                        aria-pressed={active === entry.id}
                        onMouseEnter={() => setActive(entry.id)}
                        onFocus={() => setActive(entry.id)}
                        onClick={() => setActive(entry.id)}
                      >
                        <Plant id={entry.id} />
                      </button>
                    </li>
                  ),
                )}
              </ul>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
