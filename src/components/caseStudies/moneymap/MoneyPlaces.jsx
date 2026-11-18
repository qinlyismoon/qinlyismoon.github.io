import { useLang } from "./shared";

const T = {
  en: {
    saved: "Counts as saved — the total on Home",
    places: [
      { id: "new", name: "New money", desc: "Coming in, not saved yet — like this month’s pay." },
      { id: "goal", name: "In a goal", desc: "Saved toward a goal. Counts toward its progress." },
      { id: "paused", name: "Paused goal", desc: "Still in the goal, but nothing is due." },
      { id: "free", name: "Free to assign", desc: "Saved, but not in any goal yet. Always on Home." },
      { id: "out", name: "Taken out", desc: "Withdrawn from savings, back to you." },
    ],
  },
  zh: {
    saved: "都算已存下——首页的总额",
    places: [
      { id: "new", name: "新的钱", desc: "刚进来、还没存下，比如这个月的工资。" },
      { id: "goal", name: "在目标里", desc: "存进某个目标，计入它的进度。" },
      { id: "paused", name: "暂停的目标", desc: "还在目标里，只是暂时不要求存钱。" },
      { id: "free", name: "Free to assign", desc: "已存下，但还没放进任何目标。首页随时可见。" },
      { id: "out", name: "已取出", desc: "从储蓄里取出，回到你手上。" },
    ],
  },
};

/** The five places money can be: before saving → saved (3) → taken out. */
export default function MoneyPlaces() {
  const lang = useLang();
  const t = T[lang];
  return (
    <div className="mm-widget mm-places">
      <div className="mm-places__bracket" aria-hidden="true">
        <span>{t.saved}</span>
      </div>
      <ol className="mm-places__row">
        {t.places.map((p) => (
          <li key={p.id} className={`mm-places__card mm-places__card--${p.id}`}>
            <span className="mm-places__dot" aria-hidden="true" />
            <p className="mm-places__name">{p.name}</p>
            <p className="mm-places__desc">{p.desc}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
