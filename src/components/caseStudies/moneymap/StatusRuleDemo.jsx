import { useState } from "react";
import { useLang } from "./shared";

const MONTHLY = 500;
const PAYDAY = 25;
const DAYS = 30;

const T = {
  en: {
    intro: `Suzie saves ${"$"}${MONTHLY} a month, all at once on payday (the ${PAYDAY}th).`,
    day: "Day of the month",
    daily: "Checked every day",
    monthly: "Checked when the month ends",
    on: "On Track",
    behind: "Behind",
    takeaway: (n) => `Checked daily, she looks Behind on ${n} of 30 days — while doing exactly what the plan asks.`,
  },
  zh: {
    intro: `Suzie 每月存 $${MONTHLY}，在发薪日（${PAYDAY} 号）一次存进去。`,
    day: "本月第几天",
    daily: "每天判断",
    monthly: "月底判断",
    on: "On Track",
    behind: "Behind",
    takeaway: (n) => `如果每天判断，她 30 天里有 ${n} 天显示 Behind —— 而她完全按计划在存。`,
  },
};

// Daily rule: by day d the plan expects monthly × d/30, but nothing is saved
// until payday — so any gap over 5% of the month reads as Behind.
const dailyStatus = (d) => {
  const expected = (MONTHLY * d) / DAYS;
  const saved = d >= PAYDAY ? MONTHLY : 0;
  return expected - saved <= MONTHLY * 0.05 ? "on" : "behind";
};
// Monthly rule: a month only counts as short once it has ended.
const monthlyStatus = () => "on";

/** Decision 2: the same saver, judged by day vs by month. */
export default function StatusRuleDemo() {
  const lang = useLang();
  const t = T[lang];
  const [day, setDay] = useState(12);
  const days = Array.from({ length: DAYS }, (_, i) => i + 1);
  const behindDays = days.filter((d) => dailyStatus(d) === "behind").length;

  const Row = ({ title, rule }) => {
    const now = rule(day);
    return (
      <div className="mm-status__row">
        <div className="mm-status__head">
          <span>{title}</span>
          <span className={`mm-chip mm-chip--${now}`}>{now === "on" ? t.on : t.behind}</span>
        </div>
        <div className="mm-status__strip" aria-hidden="true">
          {days.map((d) => (
            <span
              key={d}
              className={`mm-status__cell mm-status__cell--${rule(d)}${d === day ? " is-today" : ""}${d === PAYDAY ? " is-payday" : ""}`}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mm-widget">
      <p className="mm-widget__intro">{t.intro}</p>
      <label className="mm-slider">
        <span className="mm-slider__row">
          <span>{t.day}</span>
          <strong>{day}</strong>
        </span>
        <input type="range" min={1} max={DAYS} value={day} onChange={(e) => setDay(Number(e.target.value))} />
      </label>
      <Row title={t.daily} rule={dailyStatus} />
      <Row title={t.monthly} rule={monthlyStatus} />
      <p className="mm-widget__note">{t.takeaway(behindDays)}</p>
    </div>
  );
}
