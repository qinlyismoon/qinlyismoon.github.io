import { useLang } from "./shared";

const T = {
  en: {
    example: "A $6,000 goal — how far behind the plan it is:",
    bands: [
      { id: "on", label: "On Track", range: "0–5% · up to $300", note: "Normal. One light month, easy to make up." },
      { id: "behind", label: "Behind", range: "5–20% · $300–$1,200", note: "Worth noticing. The monthly amount goes up a little." },
      { id: "risk", label: "At Risk", range: "over 20% · over $1,200", note: "A fifth is missing. Save clearly more, or move the date." },
    ],
  },
  zh: {
    example: "以一个 $6,000 的目标为例，比计划落后多少：",
    bands: [
      { id: "on", label: "On Track", range: "0–5% · 最多 $300", note: "很正常。某个月少存一点，容易补回来。" },
      { id: "behind", label: "Behind", range: "5–20% · $300–$1,200", note: "值得注意。每月金额会稍微上调。" },
      { id: "risk", label: "At Risk", range: "20% 以上 · 超过 $1,200", note: "缺了五分之一。要明显多存，或推迟日期。" },
    ],
  },
};

/** Decision: where On Track / Behind / At Risk start, on one scale. */
export default function StatusThresholds() {
  const lang = useLang();
  const t = T[lang];
  return (
    <div className="mm-widget mm-thresholds">
      <p className="mm-widget__intro">{t.example}</p>
      <div className="mm-thresholds__bar" aria-hidden="true">
        {t.bands.map((b) => (
          <span key={b.id} className={`mm-thresholds__seg mm-thresholds__seg--${b.id}`} />
        ))}
      </div>
      <div className="mm-thresholds__ticks" aria-hidden="true">
        <span style={{ left: "0%" }}>0%</span>
        <span style={{ left: "16.66%" }}>5%</span>
        <span style={{ left: "66.66%" }}>20%</span>
      </div>
      <ul className="mm-thresholds__bands">
        {t.bands.map((b) => (
          <li key={b.id} className={`mm-thresholds__band mm-thresholds__band--${b.id}`}>
            <span className="mm-thresholds__chip">{b.label}</span>
            <p className="mm-thresholds__range">{b.range}</p>
            <p className="mm-thresholds__note">{b.note}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
