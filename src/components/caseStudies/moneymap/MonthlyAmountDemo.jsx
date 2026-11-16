import { useState } from "react";
import { money, useLang } from "./shared";

const T = {
  en: {
    target: "Target",
    months: "Months to go",
    saved: "Already saved",
    added: "Added this month",
    monthly: "Monthly amount",
    still: "Still need this month",
    note: "Adding money during the month lowers what's still needed — the monthly amount itself stays put until next month.",
  },
  zh: {
    target: "目标金额",
    months: "剩余月数",
    saved: "已存",
    added: "本月已存入",
    monthly: "每月金额",
    still: "本月还差",
    note: "月中存钱只减少「本月还差」；每月金额本身到下个月才会重算。",
  },
};

function Slider({ label, value, min, max, step, onChange, format }) {
  return (
    <label className="mm-slider">
      <span className="mm-slider__row">
        <span>{label}</span>
        <strong>{format(value)}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

/** Decision 1: one rule — (target − saved before this month) ÷ months left. */
export default function MonthlyAmountDemo() {
  const lang = useLang();
  const t = T[lang];
  const [target, setTarget] = useState(6000);
  const [months, setMonths] = useState(12);
  const [saved, setSaved] = useState(0);
  const [added, setAdded] = useState(0);

  const savedBefore = Math.min(saved, target);
  const monthly = Math.max(target - savedBefore, 0) / Math.max(months, 1);
  const still = Math.max(monthly - added, 0);
  const pct = monthly > 0 ? Math.min((added / monthly) * 100, 100) : 100;

  return (
    <div className="mm-widget mm-widget--split">
      <div className="mm-widget__controls">
        <Slider label={t.target} value={target} min={1000} max={20000} step={500} onChange={setTarget} format={money} />
        <Slider label={t.months} value={months} min={3} max={36} step={1} onChange={setMonths} format={(v) => v} />
        <Slider label={t.saved} value={saved} min={0} max={target} step={100} onChange={setSaved} format={money} />
        <Slider label={t.added} value={added} min={0} max={Math.ceil(monthly / 10) * 10 || 0} step={10} onChange={setAdded} format={money} />
      </div>
      <div className="mm-widget__result">
        <p className="mm-widget__label">{t.monthly}</p>
        <p className="mm-widget__big">{money(monthly)}<span>/mo</span></p>
        <div className="mm-bar mm-bar--month">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="mm-widget__label">{t.still}: <strong>{money(still)}</strong></p>
        <p className="mm-widget__note">{t.note}</p>
      </div>
    </div>
  );
}
