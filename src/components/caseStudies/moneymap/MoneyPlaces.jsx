import { useLang } from "./shared";

// Same visual language as the edge-case diagram below: white boxes, the
// three "saved" places grouped together.
const T = {
  en: {
    saved: "Counts as saved",
    before: { name: "New money", desc: "Not saved yet" },
    inside: [
      { name: "In a goal", desc: "Counts toward the goal" },
      { name: "Paused goal", desc: "Kept, nothing due" },
      { name: "Free to assign", desc: "Saved, no goal yet" },
    ],
    after: { name: "Taken out", desc: "Back to you" },
  },
  zh: {
    saved: "都算已存下",
    before: { name: "新的钱", desc: "还没存下" },
    inside: [
      { name: "在目标里", desc: "计入目标进度" },
      { name: "暂停的目标", desc: "保留，暂不要求存" },
      { name: "Free to assign", desc: "已存下，还没分配" },
    ],
    after: { name: "已取出", desc: "回到你手上" },
  },
};

function Place({ name, desc }) {
  return (
    <div className="mm-places__node">
      <p className="mm-places__name">{name}</p>
      <p className="mm-places__desc">{desc}</p>
    </div>
  );
}

/** The five places money can be. */
export default function MoneyPlaces() {
  const t = T[useLang()];
  return (
    <div className="mm-widget mm-places">
      <Place {...t.before} />
      <div className="mm-places__group">
        <p className="mm-places__group-label">{t.saved}</p>
        <div className="mm-places__group-row">
          {t.inside.map((p) => (
            <Place key={p.name} {...p} />
          ))}
        </div>
      </div>
      <Place {...t.after} />
    </div>
  );
}
