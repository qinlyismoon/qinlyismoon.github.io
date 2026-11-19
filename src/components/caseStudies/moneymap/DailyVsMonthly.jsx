import { useLang } from "./shared";

const DAYS = 30;
const PAYDAY = 25;

const T = {
  en: {
    setup: "$500 a month, all saved on payday (the 25th).",
    saved: "Saved",
    savedBefore: "$0",
    savedAfter: "$500",
    payday: "Payday",
    rows: [
      {
        id: "daily",
        label: "Checked daily",
        note: "Behind for 24 days.",
        status: (d) => (d < PAYDAY ? "behind" : "on"),
      },
      {
        id: "monthly",
        label: "Checked monthly",
        note: "On Track all month.",
        status: () => "on",
      },
    ],
    on: "On Track",
    behind: "Behind",
  },
  zh: {
    setup: "每月 $500，发薪日（25 号）一次存够。",
    saved: "已存",
    savedBefore: "$0",
    savedAfter: "$500",
    payday: "发薪日",
    rows: [
      {
        id: "daily",
        label: "按天判断",
        note: "24 天显示 Behind。",
        status: (d) => (d < PAYDAY ? "behind" : "on"),
      },
      {
        id: "monthly",
        label: "按月判断",
        note: "整个月都是 On Track。",
        status: () => "on",
      },
    ],
    on: "On Track",
    behind: "Behind",
  },
};

const col = (day) => `${((day - 1) / DAYS) * 100}%`;

/** Why status isn't checked daily: the same month, checked two ways. */
export default function DailyVsMonthly() {
  const lang = useLang();
  const t = T[lang];
  return (
    <div className="mm-widget mm-daily">
      <div className="mm-daily__head">
        <p className="mm-daily__setup">{t.setup}</p>
        <div className="mm-daily__legend" aria-hidden="true">
          <span><i className="mm-daily__swatch mm-daily__cell--on" />{t.on}</span>
          <span><i className="mm-daily__swatch mm-daily__cell--behind" />{t.behind}</span>
        </div>
      </div>

      <div className="mm-daily__grid" style={{ "--mm-pay": (PAYDAY - 1) / DAYS }}>
        <span className="mm-daily__payline" aria-hidden="true">
          <em>{t.payday} · 25</em>
        </span>
        {/* Saved-so-far track and day numbers share the cell columns. */}
        <p className="mm-daily__label mm-daily__label--muted">{t.saved}</p>
        <div className="mm-daily__track">
          <span className="mm-daily__savedbar" style={{ left: col(1), width: col(PAYDAY) }}>{t.savedBefore}</span>
          <span className="mm-daily__savedbar is-full" style={{ left: col(PAYDAY), right: 0 }}>{t.savedAfter}</span>
        </div>

        {t.rows.map((r) => (
          <div key={r.id} className="mm-daily__row">
            <p className="mm-daily__label">{r.label}</p>
            <div className="mm-daily__cells" aria-hidden="true">
              {Array.from({ length: DAYS }, (_, i) => (
                <span key={i} className={`mm-daily__cell mm-daily__cell--${r.status(i + 1)}`} />
              ))}
            </div>
            <p className="mm-daily__note">{r.note}</p>
          </div>
        ))}

        <p className="mm-daily__label" aria-hidden="true" />
        <div className="mm-daily__days" aria-hidden="true">
          {[1, 10, 20, 25, 30].map((d) => (
            <span key={d} style={{ left: `calc(${col(d)} + ${100 / DAYS / 2}%)` }}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
