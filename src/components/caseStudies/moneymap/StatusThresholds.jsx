import { useLang } from "./shared";

// Scale runs 0–30% of the target; 30% stands for "anything above 20%".
const pos = (pct) => `${(Math.min(pct, 30) / 30) * 100}%`;

const T = {
  en: {
    axis: "How far behind the plan, as a share of the whole target · $6,000 goal",
    example: {
      pct: 3.3,
      text: "Example: the plan says $1,000 by now, you have $800. $200 behind = 3% → On Track.",
    },
    ticks: [
      { pct: 0, top: "0%", bottom: "$0" },
      { pct: 5, top: "5%", bottom: "$300" },
      { pct: 20, top: "20%", bottom: "$1,200" },
    ],
    bands: [
      { id: "on", from: 0, to: 5, label: "On Track", when: "Up to $300 behind", what: "Normal — one light month, easy to make up. No alarm." },
      { id: "behind", from: 5, to: 20, label: "Behind", when: "$300–$1,200 behind", what: "Worth noticing. The monthly amount goes up a little." },
      { id: "risk", from: 20, to: 30, label: "At Risk", when: "More than $1,200 behind", what: "A fifth is missing. Save clearly more, or move the date." },
    ],
  },
  zh: {
    axis: "比计划落后多少（占整个目标金额的比例）· 以 $6,000 的目标为例",
    example: {
      pct: 3.3,
      text: "例：按计划现在应有 $1,000，实际存了 $800。落后 $200 = 3% → On Track。",
    },
    ticks: [
      { pct: 0, top: "0%", bottom: "$0" },
      { pct: 5, top: "5%", bottom: "$300" },
      { pct: 20, top: "20%", bottom: "$1,200" },
    ],
    bands: [
      { id: "on", from: 0, to: 5, label: "On Track", when: "落后不超过 $300", what: "很正常，某个月少存一点，容易补回来。不报警。" },
      { id: "behind", from: 5, to: 20, label: "Behind", when: "落后 $300–$1,200", what: "值得注意。每月金额会稍微上调。" },
      { id: "risk", from: 20, to: 30, label: "At Risk", when: "落后超过 $1,200", what: "缺了五分之一。要明显多存，或推迟日期。" },
    ],
  },
};

/** Where On Track / Behind / At Risk start, on one labelled scale, with a worked example. */
export default function StatusThresholds() {
  const lang = useLang();
  const t = T[lang];
  return (
    <div className="mm-widget mm-thresholds">
      <p className="mm-thresholds__axis">{t.axis}</p>

      <div className="mm-thresholds__scale">
        <div className="mm-thresholds__pin" style={{ left: pos(t.example.pct) }} aria-hidden="true" />
        <div className="mm-thresholds__bar">
          {t.bands.map((b) => (
            <span
              key={b.id}
              className={`mm-thresholds__seg mm-thresholds__seg--${b.id}`}
              style={{ left: pos(b.from), width: `calc(${pos(b.to)} - ${pos(b.from)})` }}
            >
              {b.label}
            </span>
          ))}
        </div>
        <div className="mm-thresholds__ticks" aria-hidden="true">
          {t.ticks.map((k) => (
            <span key={k.pct} style={{ left: pos(k.pct) }} className={k.pct === 0 ? "is-first" : undefined}>
              <b>{k.top}</b>
              {k.bottom}
            </span>
          ))}
        </div>
      </div>

      <p className="mm-thresholds__example">
        <span className="mm-thresholds__pin-dot" aria-hidden="true" />
        {t.example.text}
      </p>

      <ul className="mm-thresholds__rows">
        {t.bands.map((b) => (
          <li key={b.id} className={`mm-thresholds__row mm-thresholds__row--${b.id}`}>
            <span className="mm-thresholds__chip">{b.label}</span>
            <span className="mm-thresholds__when">{b.when}</span>
            <span className="mm-thresholds__what">{b.what}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
