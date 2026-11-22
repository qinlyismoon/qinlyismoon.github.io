import { useState } from "react";
import InlineChoice from "../../shared/InlineChoice";
import { HUE, STEM, helpQuestion } from "./flowerGeometry";
import { useLang } from "./copy";

const MOMENTS = [
  { id: "joy", feelings: ["joy"] },
  { id: "sad", feelings: ["sadness"] },
  { id: "bitter", feelings: ["joy", "sadness"] },
  { id: "surprise", feelings: ["surprise"] },
];

const T = {
  en: {
    moment: "A moment with",
    moments: { joy: "only joy", sad: "only sadness", bitter: "joy and sadness", surprise: "only surprise" },
    before: "Before v56",
    now: "Now",
    oldQ: "Afterwards, did you feel…",
    old: ["lighter", "the same", "heavier"],
    q: { ease: "Did it help ease it?", hold: "Did it help you hold onto it?", neutral: "Did it help?" },
    opts: ["it helped", "no change", "made it harder"],
    broken: "After joy, “heavier” could mean the joy grew — but its leaf turned ochre and hung down, as if it were bad.",
    fine: "For a painful feeling, lighter and heavier still made sense.",
  },
  zh: {
    moment: "一个时刻里有",
    moments: { joy: "只有喜悦", sad: "只有悲伤", bitter: "喜悦和悲伤", surprise: "只有惊讶" },
    before: "v56 之前",
    now: "现在",
    oldQ: "之后，你觉得……",
    old: ["更轻", "一样", "更重"],
    q: { ease: "它有帮你缓和下来吗？", hold: "它有帮你留住这种感觉吗？", neutral: "它有帮助吗？" },
    opts: ["有帮助", "没变化", "更难了"],
    broken: "开心之后，「更重」可能是开心变多了——叶子却变成赭色下垂，好像是坏事。",
    fine: "对痛苦的感受，「更轻 / 更重」本来是说得通的。",
  },
};

const DOTS = [STEM.helped, STEM.same, STEM.harder];

function Answers({ words }) {
  return (
    <p className="eg-answers">
      {words.map((w, i) => (
        <span key={w} className="eg-answers__item">
          {i > 0 ? <span className="eg-answers__sep" aria-hidden="true">·</span> : null}
          <span className="eg-answers__dot" style={{ background: DOTS[i] }} aria-hidden="true" />
          {w}
        </span>
      ))}
    </p>
  );
}

/** v56–57: the "did it help?" question follows the whole moment. */
export default function HelpQuestion() {
  const lang = useLang();
  const t = T[lang];
  const [id, setId] = useState("joy");
  const moment = MOMENTS.find((mm) => mm.id === id);
  const kind = helpQuestion(moment.feelings);
  const bad = moment.feelings.every((f) => f === "joy");
  const painful = moment.feelings.every((f) => f === "sadness");

  return (
    <div className="eg-widget">
      <div className="eg-field is-flat">
        <span className="eg-field__label">{t.moment}</span>
        <InlineChoice
          ariaLabel={t.moment}
          className="eg-choice"
          value={id}
          onChange={setId}
          options={MOMENTS.map((mm) => ({
            id: mm.id,
            label: t.moments[mm.id],
            swatch: HUE[mm.feelings[0]],
          }))}
        />
      </div>
      <div className="eg-compare">
        <div className="eg-compare__col is-before">
          <p className="eg-kicker">{t.before}</p>
          <p className="eg-question">{t.oldQ}</p>
          <Answers words={t.old} />
          <div className="eg-stack">
            <p className={`eg-note eg-stack__item${bad ? " is-on is-flag" : ""}`}>{t.broken}</p>
            <p className={`eg-note eg-stack__item${painful ? " is-on" : ""}`}>{t.fine}</p>
          </div>
        </div>
        <div className="eg-compare__col">
          <p className="eg-kicker">{t.now}</p>
          <p className="eg-question">{t.q[kind]}</p>
          <Answers words={t.opts} />
        </div>
      </div>
    </div>
  );
}
