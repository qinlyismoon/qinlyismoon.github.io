import { useState } from "react";
import InlineChoice from "../../shared/InlineChoice";
import {
  ACTIONS,
  FEELINGS,
  HUE,
  OUTCOMES,
  SCENES,
  STEM,
  buildPlant,
  corePattern,
} from "./flowerGeometry";
import { NAMES, useLang } from "./copy";

// The explanation for whichever field was changed last opens under that
// field — next to the choice, so it can be read while choosing.
const READ = {
  en: {
    first: {
      joy: "Joy is gaining something you value: petals open into rounded lobes, and the plant stands tall.",
      trust: "Trust is taking in and belonging: broad petals with a scalloped rim, cupped like they hold something.",
      fear: "Fear protects you: narrow, wavering petals drawn back, and the plant shrinks a little.",
      surprise: "Surprise orients to the new: the rim splits open and the plant springs up.",
      sadness: "Sadness comes to terms with loss: pieces missing, a few spots, and the head bows.",
      disgust: "Disgust pushes something away: petals curl in around a hollow, and the head turns away.",
      anger: "Anger removes an obstacle: angular points at every tip.",
      anticipation: "Anticipation explores ahead: long pointed petals with a vein reaching forward; the plant leans in.",
    },
    second: "A second feeling becomes an inner ring in its own colour, so a blend like bittersweet still reads as two things at once.",
    body: "Still gives five calm, even petals. Racing gives up to nine, scattered, and a quicker sway.",
    scene: "Where it happened is drawn as a pattern in the core, so colour stays reserved for feeling. Each place also has its own bed in the garden.",
    action: "Each action is a different botanical leaf form, drawn by the same generator as the petals.",
    outcome: "Green and lifted: it helped. Grey and level: no change. Ochre and hanging: it made it harder.",
    labels: {
      felt: "Felt",
      also: "Also",
      none: "none",
      body: "Body",
      where: "Where",
      did: "What I did",
      after: "After",
    },
    part: {
      first: "petals",
      second: "inner ring",
      body: "petal count, sway",
      scene: "core",
      action: "leaf shape",
      outcome: "stem & leaf colour",
    },
    body3: { still: "still", stirred: "stirred", racing: "racing" },
  },
  zh: {
    first: {
      joy: "喜悦是得到了在乎的东西：花瓣张开成圆润的裂片，整株站得很高。",
      trust: "信任是接纳与归属：宽大的花瓣、扇贝边，像能盛住什么的杯子。",
      fear: "恐惧是保护自己：窄、发颤、往回收的花瓣，整株也缩小一点。",
      surprise: "惊讶是转向新的东西：花瓣边缘裂开，整株向上弹起。",
      sadness: "悲伤是接受失去：花瓣缺了几块、带几个斑点，花头低下去。",
      disgust: "厌恶是把东西推开：花瓣向内卷，围出一个空心，花头扭向一边。",
      anger: "愤怒是清除阻碍：每个花瓣尖都是棱角。",
      anticipation: "期待是向前探索：细长尖锐的花瓣，叶脉向前伸，整株往前倾。",
    },
    second: "第二种感受变成内圈花瓣，保留自己的颜色——像「又甜又酸」这样的复合情绪，仍然读得出是两种东西同时存在。",
    body: "平静时五片花瓣、均匀；心跳加速时最多九片、零散，摇摆也更快。",
    scene: "地点画成花心里的图案，把颜色留给感受。每个场景在花园里也有自己的一排苗圃。",
    action: "每种应对方式是一种不同的植物叶形，和花瓣用同一个生成器画出来。",
    outcome: "绿色上扬：有帮助。灰色平放：没变化。赭色下垂：更难了。",
    labels: {
      felt: "感受",
      also: "也有",
      none: "无",
      body: "身体",
      where: "在哪",
      did: "我做了",
      after: "之后",
    },
    part: {
      first: "花瓣",
      second: "内圈花瓣",
      body: "花瓣数、摇摆",
      scene: "花心",
      action: "叶形",
      outcome: "茎和叶的颜色",
    },
    body3: { still: "平静", stirred: "有点躁动", racing: "心跳加速" },
  },
};

const BODY_VALUE = { still: 15, stirred: 50, racing: 85 };

// Which parts of the plant each field draws; the rest fade while it's open.
const FOCUS = {
  first: ["petals"],
  second: ["inner"],
  body: ["petals", "inner"],
  scene: ["core"],
  action: ["leaves"],
  outcome: ["stem", "leaves"],
};

export function Plant({ m, label, focus }) {
  const lit = FOCUS[focus];
  const part = (name) => `eg-plant__part${lit && !lit.includes(name) ? " is-dim" : ""}`;
  const p = buildPlant(m, { cx: 160, ground: 300 });
  const core = corePattern(m.scene, p.coreR);
  return (
    <svg
      className="eg-plant"
      viewBox="30 44 260 266"
      role="img"
      aria-label={label}
      style={{ "--eg-sway": `${p.sway}deg`, "--eg-speed": `${p.swaySpeed}s` }}
    >
      <line x1="40" y1="300.5" x2="280" y2="300.5" className="eg-plant__ground" />
      <g className="eg-plant__sway" style={{ transformOrigin: "160px 300px" }}>
        <path d={p.stemPath} stroke={p.stem} strokeWidth="3" fill="none" strokeLinecap="round" className={part("stem")} />
        <g className={part("leaves")}>
        {p.leaves.map((l, i) => (
          <g key={`l${i}`}>
            <path d={l.d} fill={l.fill} className="eg-plant__organ" />
            {l.vein ? (
              <line x1={l.vein.x1} y1={l.vein.y1} x2={l.vein.x2} y2={l.vein.y2} className="eg-plant__vein" />
            ) : null}
          </g>
        ))}
        </g>
        <g transform={`translate(${p.head.x} ${p.head.y}) rotate(${p.head.tilt})`}>
          <g className={part("petals")}>
          {p.petals.map((pt, i) => (
            <path key={`p${i}`} d={pt.d} fill={pt.fill} className="eg-plant__organ" />
          ))}
          {p.marks.map((mk, i) =>
            mk.type === "line" ? (
              <line key={`m${i}`} x1="0" y1="0" x2={mk.x2} y2={mk.y2} className="eg-plant__vein" />
            ) : (
              <circle key={`m${i}`} cx={mk.cx} cy={mk.cy} r="2" className="eg-plant__spot" />
            ),
          )}
          </g>
          <g className={part("inner")}>
          {p.inner.map((pt, i) => (
            <path key={`i${i}`} d={pt.d} fill={pt.fill} className="eg-plant__organ" />
          ))}
          </g>
          <g className={part("core")}>
          <circle r={p.coreR} className="eg-plant__core" />
          {core.map((c, i) =>
            c.t === "c" ? (
              <circle key={`c${i}`} cx={c.cx ?? 0} cy={c.cy ?? 0} r={c.r} className="eg-plant__stitch" strokeDasharray={c.dash} />
            ) : c.t === "dot" ? (
              <circle key={`c${i}`} cx={c.cx} cy={c.cy} r={c.r} className="eg-plant__knot" />
            ) : (
              <path key={`c${i}`} d={c.d} className="eg-plant__stitch" />
            ),
          )}
          </g>
        </g>
      </g>
    </svg>
  );
}

/** "Read a flower": each field of a record becomes one part of the plant. */
export default function FlowerLab() {
  const lang = useLang();
  const t = READ[lang];
  const n = NAMES[lang];
  const [m, setM] = useState({
    first: "anticipation",
    second: "fear",
    body: "racing",
    scene: "work",
    action: "breathing",
    outcome: "helped",
  });
  const [open, setOpen] = useState("first");
  const set = (key) => (value) => {
    setM((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "first" && prev.second === value) next.second = null;
      return next;
    });
    setOpen(key);
  };

  const feelingOpts = (list) => list.map((f) => ({ id: f, label: n.feeling[f], swatch: HUE[f] }));
  const rows = [
    { key: "first", label: t.labels.felt, options: feelingOpts(FEELINGS), note: t.first[m.first] },
    {
      key: "second",
      label: t.labels.also,
      // Same option set every time, so the row never re-wraps. Picking the
      // feeling that is already first simply means no second feeling.
      options: [{ id: "none", label: t.labels.none }, ...feelingOpts(FEELINGS)],
      value: !m.second || m.second === m.first ? "none" : m.second,
      onChange: (v) => set("second")(v === "none" || v === m.first ? null : v),
      note: t.second,
    },
    {
      key: "body",
      label: t.labels.body,
      options: Object.keys(BODY_VALUE).map((b) => ({ id: b, label: t.body3[b] })),
      note: t.body,
    },
    { key: "scene", label: t.labels.where, options: SCENES.map((s) => ({ id: s, label: n.scene[s] })), note: t.scene },
    { key: "action", label: t.labels.did, options: ACTIONS.map((a) => ({ id: a, label: n.action[a] })), note: t.action },
    {
      key: "outcome",
      label: t.labels.after,
      options: OUTCOMES.map((o) => ({ id: o, label: n.outcome[o], swatch: STEM[o] })),
      note: t.outcome,
    },
  ];

  const plantModel = { ...m, body: BODY_VALUE[m.body] };

  // Every possible explanation, used as invisible ghosts: each row's note
  // reserves the height of the longest one, so closing one row and opening
  // another always trade the same height — the panel never changes size.
  const allNotes = [...Object.values(t.first), t.second, t.body, t.scene, t.action, t.outcome];

  return (
    <div className="eg-widget eg-lab">
      <div className="eg-lab__stage">
        <Plant
          m={plantModel}
          focus={open}
          label={`${n.feeling[m.first]}${m.second ? ` + ${n.feeling[m.second]}` : ""}`}
        />
      </div>
      <div className="eg-lab__fields">
        {rows.map((row) => (
          <div key={row.key} className={`eg-field${open === row.key ? " is-open" : ""}`}>
            <span className="eg-field__label">
              {row.label}
              <span className="eg-field__part">→ {t.part[row.key]}</span>
            </span>
            <InlineChoice
              ariaLabel={row.label}
              options={row.options}
              value={row.value ?? m[row.key]}
              onChange={row.onChange ?? set(row.key)}
              className="eg-choice"
            />
            <div className="eg-field__note" aria-hidden={open !== row.key}>
              <div className="eg-field__note-clip">
                <div className="eg-field__note-body">
                  {allNotes.map((note) => (
                    <p key={note} className="eg-field__ghost" aria-hidden="true">
                      {note}
                    </p>
                  ))}
                  <p aria-live={open === row.key ? "polite" : "off"}>{row.note}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
