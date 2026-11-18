import { useLang } from "./shared";

const DAYS = 30;
const PAYDAY = 25;

const T = {
  en: {
    intro: "Same person, same savings: saves the full monthly amount on payday, the 25th.",
    daily: "Checked every day",
    monthly: "Checked by the month",
    payday: "Payday",
    on: "On Track",
    behind: "Behind",
    dailyNote: "Behind for 24 days of every month, while following the plan exactly.",
    monthlyNote: "On Track all month. Only a month that ends short counts.",
  },
  zh: {
    intro: "同一个人、同样的存法：每月 25 号发薪日，一次存够当月金额。",
    daily: "按天判断",
    monthly: "按月判断",
    payday: "发薪日",
    on: "On Track",
    behind: "Behind",
    dailyNote: "每个月有 24 天显示 Behind，尽管他完全按计划在存。",
    monthlyNote: "整个月都是 On Track，只有月底没存够才算。",
  },
};

/** Why status isn't checked daily: one month, two ways of checking. */
export default function DailyVsMonthly() {
  const lang = useLang();
  const t = T[lang];
  const Row = ({ label, note, statusFor }) => (
    <div className="mm-daily__row">
      <p className="mm-daily__label">{label}</p>
      <div className="mm-daily__cells" aria-hidden="true">
        {Array.from({ length: DAYS }, (_, i) => (
          <span key={i} className={`mm-daily__cell mm-daily__cell--${statusFor(i + 1)}`} />
        ))}
      </div>
      <p className="mm-daily__note">{note}</p>
    </div>
  );
  return (
    <div className="mm-widget mm-daily">
      <p className="mm-widget__intro">{t.intro}</p>
      <div className="mm-daily__payday" aria-hidden="true">
        <span style={{ left: `calc(${((PAYDAY - 0.5) / DAYS) * 100}% )` }}>{t.payday} · 25</span>
      </div>
      <Row label={t.daily} note={t.dailyNote} statusFor={(d) => (d < PAYDAY ? "behind" : "on")} />
      <Row label={t.monthly} note={t.monthlyNote} statusFor={() => "on"} />
      <div className="mm-daily__legend" aria-hidden="true">
        <span><i className="mm-daily__cell mm-daily__cell--on" /> {t.on}</span>
        <span><i className="mm-daily__cell mm-daily__cell--behind" /> {t.behind}</span>
      </div>
    </div>
  );
}
