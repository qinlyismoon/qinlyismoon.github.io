import { useState } from "react";

/**
 * Volunteering as a windowsill: one small potted plant per experience, in
 * the same flat two-tone style as the lighthouse blocks. Hover, focus or tap
 * a plant to read what it was — about as much as an experience strip says.
 * The conference volunteer role is a pin on the tile's corner.
 */
const COPY = {
  en: {
    kicker: "volunteering",
    title: "Doing something that matters",
    // Newest first — read left to right, back in time.
    items: [
      { id: "photo", org: "WeBright", role: "Volunteer photographer", meta: "Jiuzhaigou, Sichuan · Jan – Feb 2024" },
      { id: "river", org: "Green River", role: "Volunteer", meta: "Yangtze source, 4,540 m · Dec 2023 – Jan 2024" },
      { id: "teach", org: "WeBright", role: "Volunteer teacher", meta: "Guangyuan, Sichuan · Summer 2023" },
    ],
    pin: { org: "ACM SIGGRAPH 2025", role: "Student volunteer", meta: "Vancouver · Aug 2025" },
  },
  zh: {
    kicker: "志愿",
    title: "做有意义的事",
    items: [
      { id: "photo", org: "微光公益", role: "摄影志愿者", meta: "四川九寨沟 · 2024.1 – 2024.2" },
      { id: "river", org: "绿色江河", role: "志愿者", meta: "长江源，海拔 4540 米 · 2023.12 – 2024.1" },
      { id: "teach", org: "微光公益", role: "支教老师", meta: "四川广元 · 2023 夏" },
    ],
    pin: { org: "ACM SIGGRAPH 2025", role: "学生志愿者", meta: "温哥华 · 2025.8" },
  },
};

// Lighthouse palette, quieter: cream pots, sage leaves, one soft accent.
const CREAM = "#f6f2e9";
const CREAM_EDGE = "#e3ddce";
const CLAY = "#e6d3c4";
const CLAY_EDGE = "#d4bba8";
const LEAF = "#9bb293";
const LEAF_DEEP = "#7f9878";
const PETAL = "#e3a99f";
const YELLOW = "#ecc96a";
const YELLOW_EDGE = "#dab454";
const LILAC = "#bba6d9";
const LILAC_EDGE = "#a690c8";
const BLUE = "#93b5da";
const BLUE_EDGE = "#7c9fc8";

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

function Alpine() {
  // The river: a low, hardy cushion plant — the kind that holds on up high.
  return (
    <g className="garden-plant__leaves">
      <ellipse cx="30" cy="47" rx="15" ry="7" fill={LEAF_DEEP} />
      <ellipse cx="22" cy="43" rx="8" ry="6.5" fill={LEAF} />
      <ellipse cx="37" cy="42" rx="9" ry="7" fill={LEAF} />
      <ellipse cx="30" cy="38" rx="8" ry="6.5" fill={LEAF_DEEP} />
      <circle cx="24" cy="40" r="2.8" fill={BLUE_EDGE} />
      <circle cx="24" cy="39.6" r="2.1" fill={BLUE} />
      <circle cx="33.5" cy="35.5" r="2.8" fill={BLUE_EDGE} />
      <circle cx="33.5" cy="35.1" r="2.1" fill={BLUE} />
      <circle cx="39" cy="43.5" r="2.4" fill={BLUE_EDGE} />
      <circle cx="39" cy="43.1" r="1.8" fill={BLUE} />
    </g>
  );
}

function Bloom() {
  // The photos: a flowering stem — something handed on, in bloom.
  return (
    <g className="garden-plant__leaves">
      <path d="M30 52 C30 42 31 34 30 20" stroke={LEAF_DEEP} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M30 44 C24 44 19 40 18 34 C24 34 29 38 30 44 Z" fill={LEAF} />
      <path d="M30 40 C36 40 41 36 42 30 C36 30 31 34 30 40 Z" fill={LEAF_DEEP} />
      <g transform="translate(30 17)">
        <circle cx="0" cy="-5" r="4.2" fill={LILAC} />
        <circle cx="4.8" cy="-1.5" r="4.2" fill={LILAC} />
        <circle cx="3" cy="4" r="4.2" fill={LILAC_EDGE} />
        <circle cx="-3" cy="4" r="4.2" fill={LILAC_EDGE} />
        <circle cx="-4.8" cy="-1.5" r="4.2" fill={LILAC} />
        <circle cx="0" cy="0" r="2.6" fill={YELLOW} />
      </g>
    </g>
  );
}

const PLANTS = {
  teach: { Leaves: Sprout, pot: [CREAM, CREAM_EDGE] },
  river: { Leaves: Alpine, pot: [CLAY, CLAY_EDGE] },
  photo: { Leaves: Bloom, pot: [CREAM, CREAM_EDGE] },
};

function Plant({ id }) {
  const { Leaves, pot } = PLANTS[id];
  return (
    <svg className="garden-plant__art" viewBox="0 0 60 80" aria-hidden="true" focusable="false">
      <Leaves />
      <Pot face={pot[0]} edge={pot[1]} />
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

export default function VolunteerGarden({ language }) {
  const t = COPY[language] ?? COPY.en;
  const [active, setActive] = useState(null);
  const current =
    active === "pin" ? t.pin : t.items.find((item) => item.id === active) ?? null;

  return (
    <section
      className="bento-tile about-tile about-tile--garden"
      aria-labelledby="garden-title"
    >
      <div className="about-tile__split garden__split">
        <div className="about-tile__text">
          <p className="bento-tile__kicker about-tile__kicker">{t.kicker}</p>
          <h2 id="garden-title" className="about-tile__title">
            {t.title}
          </h2>
          <div className="about-tile__body garden__note" aria-live="polite">
            {current ? (
              <div key={active} className="garden__card">
                <p className="garden__org">
                  {current.org} <span>· {current.role}</span>
                </p>
                <p className="garden__when">{current.meta}</p>
              </div>
            ) : null}
          </div>
        </div>

        <ul className="garden__sill" onMouseLeave={() => setActive(null)}>
          <li className="garden__pin-slot">
            <Pin
              pin={t.pin}
              active={active === "pin"}
              onEnter={() => setActive("pin")}
              onLeave={() => setActive(null)}
            />
          </li>
          {t.items.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={`garden-plant garden-plant--${item.id}${
                  active === item.id ? " is-active" : ""
                }`}
                style={{ "--i": index }}
                aria-label={`${item.org} · ${item.role} · ${item.meta}`}
                aria-pressed={active === item.id}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                onClick={() => setActive(item.id)}
              >
                <Plant id={item.id} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
