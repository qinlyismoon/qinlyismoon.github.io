import { useLang } from "./copy";

// One case from the evidence log: breathing, tried 7 times, helped 6.
// The AI draft would have called it proven; recomputed, it isn't yet.
const TRIES = [1, 1, 1, 0, 1, 1, 1];

const T = {
  en: {
    record: "Breathing · tried 7 times · helped 6",
    helped: "helped",
    not: "didn't",
    ai: "AI's draft",
    aiWhy: "6 of 7 is 86% — counted as proof.",
    me: "After I checked",
    meWhy: "Seven tries is too few: allowing for luck, the honest low estimate is 49% — under half.",
    says: "The garden would say",
    aiSays: "“Breathing works for you.”",
    meSays: "“Too few tries to tell yet.”",
    rule: "The rule now: tried on at least 3 different days, still above half after allowing for luck, and better than doing nothing.",
  },
  zh: {
    record: "呼吸 · 试了 7 次 · 6 次有帮助",
    helped: "有帮助",
    not: "没有",
    ai: "AI 的草稿",
    aiWhy: "7 次里 6 次，86%——就当作证据了。",
    me: "我核对之后",
    meWhy: "7 次太少：把运气算进去，保守估计只有 49%，不到一半。",
    says: "花园会说",
    aiSays: "「呼吸对你有效。」",
    meSays: "「次数太少，还看不出来。」",
    rule: "现在的规则：至少在 3 个不同的日子试过；算上运气，仍然过半；而且比什么都不做更好。",
  },
};

/** Checking AI, shown as one before/after instead of a statistics lesson. */
export default function EvidenceRule() {
  const lang = useLang();
  const t = T[lang];
  return (
    <div className="eg-widget eg-check">
      <div className="eg-check__record">
        <p className="eg-kicker">{t.record}</p>
        <ol className="eg-tries" aria-label={t.record}>
          {TRIES.map((ok, i) => (
            <li key={i} className={ok ? "is-ok" : ""}>
              <span className="eg-tries__dot" aria-hidden="true" />
              <span className="eg-tries__label">{ok ? t.helped : t.not}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="eg-check__cols">
        <div className="eg-check__col is-wrong">
          <p className="eg-check__head">{t.ai}</p>
          <p className="eg-check__why">{t.aiWhy}</p>
          <p className="eg-check__says-label">{t.says}</p>
          <p className="eg-check__says">{t.aiSays}</p>
        </div>
        <div className="eg-check__col is-right">
          <p className="eg-check__head">{t.me}</p>
          <p className="eg-check__why">{t.meWhy}</p>
          <p className="eg-check__says-label">{t.says}</p>
          <p className="eg-check__says">{t.meSays}</p>
        </div>
      </div>
      <p className="eg-note">{t.rule}</p>
    </div>
  );
}
