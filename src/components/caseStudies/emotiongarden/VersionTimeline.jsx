import { useState } from "react";
import { useLang } from "./copy";

// Each stop is a real entry in the project's decision log.
// kind: what the version did — most turns were cuts or reframes, not additions.
const STOPS = [
  {
    v: "v4",
    kind: "system",
    en: {
      title: "One generator for every petal and leaf",
      saw: "Eight feelings × three strengths × blends × eight leaf forms was too many shapes to draw by hand — and hand-drawn sets drift apart.",
      did: "Asked AI to build a single outline function driven by ~20 numbers. Each feeling became a preset; strength steps that feeling's signature number; blends interpolate between two presets.",
    },
    zh: {
      title: "一个生成器画出所有花瓣和叶子",
      saw: "八种感受 × 三档强度 × 复合情绪 × 八种叶形，手画根本画不完，而且手画的一套会越画越不统一。",
      did: "让 AI 写一个由约 20 个参数驱动的轮廓函数。每种感受是一组预设；强度改变那种感受的标志参数；复合情绪在两组预设之间插值。",
    },
  },
  {
    v: "v6",
    kind: "reframe",
    en: {
      title: "Shapes grounded in research, not taste",
      saw: "Early petals were pretty but arbitrary. I couldn't explain why fear looked the way it did.",
      did: "I tied every shape to the emotion's survival function (Plutchik) and to shape–affect studies (bouba/kiki: curves read safe, angles read threatening). AI turned the table into presets.",
    },
    zh: {
      title: "形状来自研究，而不是审美偏好",
      saw: "早期花瓣好看但随意，我说不出恐惧为什么长这样。",
      did: "我把每种形状对应到情绪的生存功能（Plutchik）和形状–情感研究（bouba/kiki：曲线显得安全，棱角显得有威胁），再让 AI 把这张表变成参数预设。",
    },
  },
  {
    v: "v8",
    kind: "cut",
    en: {
      title: "Weather: one main, at most two",
      saw: "Mixing every emotion's colour into the sky turned it to mud, and extra creatures were decoration that meant nothing.",
      did: "One main weather per period; a second only if it reaches 60% of the main. Only two creatures, each a data point: butterflies for actions that helped, fireflies for a pleasant feeling held inside a painful one.",
    },
    zh: {
      title: "天气：一个主天气，最多两个",
      saw: "把所有情绪颜色混进天空，天空变成一片浑浊；多出来的小动物只是装饰，没有意义。",
      did: "每段时间只有一个主天气；第二种天气占比达到主天气的 60% 才出现。只留两种小生物，而且都对应数据：蝴蝶代表有帮助的应对，萤火虫代表难过时刻里的一点愉快。",
    },
  },
  {
    v: "v30",
    kind: "cut",
    en: {
      title: "Field guide: four sections removed",
      saw: "The guide explained my craft metaphor and generator internals — designer-facing, not how to read your own garden. And the flowers read as twisted pinwheels.",
      did: "Cut four sections, reordered the rest to follow the plant (bloom → core → leaves → sky). Fixed petal layering: alternate petals as a back layer, the rest on top 5% smaller.",
    },
    zh: {
      title: "使用指南：删掉四个部分",
      saw: "指南在解释我的「刺绣」隐喻和生成器内部原理——是给设计师看的，不是教人读自己的花园。而且花看起来像扭曲的风车。",
      did: "删掉四个部分，剩下的按植物的顺序排（花 → 花心 → 叶 → 天空）。修好花瓣叠放：隔一片放到后层，前层缩小 5%。",
    },
  },
  {
    v: "v39",
    kind: "cut",
    en: {
      title: "Planting a moment: 6 steps → 5",
      saw: "A second “read my words” button competed with Next; a “line to remember it by” repeated step one; duration on a slider felt like guessing.",
      did: "Words are read as you type, on device. Steps regrouped by meaning (place sits with the feeling it shaped). Duration comes from a from–until time span.",
    },
    zh: {
      title: "记录一个时刻：6 步 → 5 步",
      saw: "额外的「读取我的文字」按钮和「下一步」抢注意力；「留一句话记住它」和第一步重复；用滑块选时长像在猜。",
      did: "边打字边在本地读取文字；步骤按意义重组（地点和它影响的感受放在一起）；时长由起止时间算出来。",
    },
  },
  {
    v: "v43",
    kind: "rename",
    en: {
      title: "“Energy” renamed to “body”",
      saw: "People read “energy” as vitality, or as how strong the feeling was — which is already chosen on the wheel.",
      did: "The field records arousal (Russell's circumplex). Renamed to “body”, with ends labelled “still, slow” and “racing, restless”.",
    },
    zh: {
      title: "「能量」改名为「身体」",
      saw: "「能量」会被理解成精力充沛，或者情绪有多强——而强度在情绪轮上已经选过了。",
      did: "这个字段记录的是唤醒度（Russell 环形模型）。改名为「身体」，两端写成「平静、缓慢」和「心跳快、坐不住」。",
    },
  },
  {
    v: "v56",
    kind: "reframe",
    en: {
      title: "“Lighter / heavier” → “did it help?”",
      saw: "After a joyful moment, “heavier” could mean the joy grew — but the leaf turned ochre and hung down, as if it were bad.",
      did: "The outcome became whether the action helped. For pleasant moments, helping means holding onto it (savouring). Stored keys unchanged, so old data still works.",
    },
    zh: {
      title: "「更轻 / 更重」→「有帮助吗？」",
      saw: "开心的时刻之后，「更重」可能是开心变多了——但叶子却变成赭色下垂，像是坏事。",
      did: "结果改为「这个做法有没有帮助」。对愉快的时刻，帮助意味着留住它（品味）。存储的键不变，旧数据照样能用。",
    },
  },
  {
    v: "v58",
    kind: "cut",
    en: {
      title: "Restraint pass",
      saw: "The stitched, dashed style had spread from the artwork into every button, rule and box. The interface was competing with the garden.",
      did: "One rule: the stitch belongs to the artwork only. Interface goes quiet — 1px hairlines, flat controls, one ink accent. Colour is reserved for feelings and the three outcomes.",
    },
    zh: {
      title: "克制",
      saw: "刺绣虚线风格从画面蔓延到了每个按钮、分隔线和卡片里，界面在和花园抢戏。",
      did: "定一条规则：针脚只属于画面。界面安静下来——1px 细线、扁平控件、只有一个墨色强调色。颜色只留给感受和三种结果。",
    },
  },
  {
    v: "v64",
    kind: "system",
    en: {
      title: "An honest bar for “this helped”",
      saw: "Two good tries made breathing look like a cure. Strong feelings ease on their own anyway.",
      did: "One evidence rule in three places: Wilson lower bound above 50%, at least 3 separate days, and it must beat how often feelings eased with no action at all.",
    },
    zh: {
      title: "给「有帮助」设一个诚实的门槛",
      saw: "两次成功就让「呼吸」看起来像万能药。而强烈的情绪本来就会自己消退。",
      did: "一条证据规则，用在三个地方：Wilson 下界高于 50%、至少分布在 3 天、并且要比「什么都不做」时的缓解率更高。",
    },
  },
  {
    v: "v77",
    kind: "system",
    en: {
      title: "Scroll, don't redraw",
      saw: "Dragging the date window regenerated hills and clouds on every step, so the garden flickered instead of moving.",
      did: "One shared map from day to x. Sliding or stretching the window tweens it; flowers, axis and weather move as one picture.",
    },
    zh: {
      title: "滑动，而不是重画",
      saw: "拖动日期窗口时，每一步都重新生成山和云，花园在闪，而不是在移动。",
      did: "用一个统一的「日期 → x 坐标」映射。拖动或拉伸窗口时对它做补间；花、时间轴和天气作为一整幅画一起移动。",
    },
  },
  {
    v: "v78",
    kind: "system",
    en: {
      title: "One entry, several moments",
      saw: "People wrote “stressed at the studio, then dinner with friends” as one entry — and got one confused flower.",
      did: "A splitter cuts the words at time turns, but only when each part has its own feelings and a different place. The user decides: keep as one, or plant separately.",
    },
    zh: {
      title: "一段文字，几个时刻",
      saw: "人们会把「在工作室很焦虑，后来和朋友吃饭」写成一条，结果得到一朵混乱的花。",
      did: "拆分器在时间转折处切开文字，但只有当每一段都有自己的感受和不同的地点时才拆。由用户决定：合成一朵，还是分开种。",
    },
  },
  {
    v: "v135",
    kind: "cut",
    en: {
      title: "Six places, no “other”",
      saw: "Leisure vs personal time was too fine a line to pick quickly, and errands had nowhere to go.",
      did: "Merged into six beds grounded in time-use research (ATUS, Day Reconstruction Method). No “other” bucket; old data migrates on load.",
    },
    zh: {
      title: "六个场景，没有「其他」",
      saw: "「休闲」和「个人时间」的边界太细，没法快速选；跑腿办事又没地方放。",
      did: "参考时间使用研究（ATUS、日重建法）合并为六个苗圃。不设「其他」；旧数据在加载时自动迁移。",
    },
  },
];

const KIND = {
  en: { system: "new system", cut: "removed / simplified", reframe: "reframed", rename: "renamed" },
  zh: { system: "新系统", cut: "删减 / 简化", reframe: "重新定义", rename: "改名" },
};

const UI = {
  en: {
    label: "Version log",
    saw: "What I saw",
    did: "What changed",
    tally: (c, all) => `${c} of these ${all} turns took something away or reframed it.`,
  },
  zh: {
    label: "版本记录",
    saw: "我看到的问题",
    did: "改了什么",
    tally: (c, all) => `这 ${all} 次转折里，有 ${c} 次是删减、改名或重新定义。`,
  },
};

/**
 * Version log on the shared rail language: one rail, an accent progress
 * line up to the chosen node, mono version marks. Click a node, or use
 * the arrow keys — one way to move, no second slider.
 */
export default function VersionTimeline() {
  const lang = useLang();
  const ui = UI[lang];
  const [i, setI] = useState(6);
  const last = STOPS.length - 1;
  const subtractive = STOPS.filter((s) => s.kind !== "system").length;

  const onKey = (e, idx) => {
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = Math.min(last, idx + 1);
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = Math.max(0, idx - 1);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setI(next);
    e.currentTarget.parentElement?.querySelectorAll("[role='tab']")[next]?.focus();
  };

  return (
    <div className="eg-widget eg-versions">
      <div className="eg-rail" style={{ "--eg-progress": i / last }}>
        <span className="eg-rail__line" aria-hidden="true" />
        <span className="eg-rail__progress" aria-hidden="true" />
        <div className="eg-rail__nodes" role="tablist" aria-label={ui.label}>
          {STOPS.map((s, idx) => (
            <button
              key={s.v}
              type="button"
              role="tab"
              aria-selected={idx === i}
              tabIndex={idx === i ? 0 : -1}
              className={`eg-rail__node${idx === i ? " is-on" : ""}${idx < i ? " is-past" : ""}`}
              onClick={() => setI(idx)}
              onKeyDown={(e) => onKey(e, idx)}
            >
              <span className="eg-rail__dot" aria-hidden="true" />
              <span className="eg-rail__mark">{s.v}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Every entry stacks in one cell: the card keeps the height of the
          longest entry, so nothing below moves while browsing. */}
      <div className="eg-stack eg-versions__entries">
        {STOPS.map((s, idx) => {
          const copy = s[lang];
          return (
            <div key={s.v} className={`eg-stack__item${idx === i ? " is-on" : ""}`} aria-hidden={idx !== i}>
              <p className="eg-kicker">
                <span className="eg-mono">{s.v}</span>
                {` · ${KIND[lang][s.kind]}`}
              </p>
              <h5 className="eg-title">{copy.title}</h5>
              <div className="eg-pairs">
                <div>
                  <p className="eg-pairs__label">{ui.saw}</p>
                  <p className="eg-pairs__text">{copy.saw}</p>
                </div>
                <div>
                  <p className="eg-pairs__label">{ui.did}</p>
                  <p className="eg-pairs__text">{copy.did}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="eg-note">{ui.tally(subtractive, STOPS.length)}</p>
    </div>
  );
}
