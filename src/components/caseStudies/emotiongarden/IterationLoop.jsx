import { useEffect, useRef, useState } from "react";
import { useLang } from "./copy";

const STEPS = {
  en: [
    {
      name: "Brief",
      who: "me",
      what: "I write one specific problem and the rule it must follow — not “make it better”.",
      eg: "Lighter / heavier only makes sense for painful feelings. Reframe the outcome so joy isn't punished, and keep the stored keys.",
    },
    {
      name: "Build",
      who: "AI",
      what: "AI writes the version: code, copy, layout. Cheap enough that I test ideas in the real garden, not in mockups.",
      eg: "A working plant flow with the new question wired into leaves, stems, butterflies and the What helped panel.",
    },
    {
      name: "Use",
      who: "me",
      what: "I plant moments in a sample garden and look for misreadings: what would this make someone believe?",
      eg: "“Made it harder” after joy read as the joy fading — so the question had to change with the feeling.",
    },
    {
      name: "Check",
      who: "me + AI",
      what: "Anything with a number or a citation is checked against its source before it ships.",
      eg: "An AI draft said 6 of 7 passes the evidence rule. Recomputed, the lower bound is 49%. It doesn't.",
    },
    {
      name: "Log",
      who: "me",
      what: "Every decision goes into a project doc: kept, removed, and why. It's the memory between sessions, so the next version doesn't undo the last.",
      eg: "The evidence rule was written once in the log, then reused in three places.",
    },
  ],
  zh: [
    {
      name: "定义",
      who: "我",
      what: "我写下一个具体问题和它必须遵守的规则——而不是「做得更好一点」。",
      eg: "更轻 / 更重只对痛苦的感受成立。重新定义结果，别让喜悦被惩罚，存储的键保持不变。",
    },
    {
      name: "生成",
      who: "AI",
      what: "AI 写出这一版：代码、文案、布局。成本低到我可以直接在真实的花园里测试想法，而不是在线框图里。",
      eg: "一个能用的记录流程，新问题已经连到叶子、茎、蝴蝶和「什么有帮助」面板。",
    },
    {
      name: "使用",
      who: "我",
      what: "我在样本花园里种下时刻，找误读：这会让人相信什么？",
      eg: "开心之后的「更难了」会被读成开心在消退——所以问题本身要随感受变化。",
    },
    {
      name: "核对",
      who: "我 + AI",
      what: "带数字或引用的内容，上线前对照原始来源核实。",
      eg: "AI 的草稿说 7 次中 6 次能通过证据规则。重算后下界是 49%，不通过。",
    },
    {
      name: "记录",
      who: "我",
      what: "每个决定都写进项目文档：留了什么、删了什么、为什么。这是不同会话之间的记忆，下一版才不会推翻上一版。",
      eg: "证据规则在记录里写一次，之后三个地方复用。",
    },
  ],
};

const UI = {
  en: { turn: "one turn", version: "= one version", label: "The iteration loop", eg: "In this project" },
  zh: { turn: "转一圈", version: "= 一个版本", label: "迭代循环", eg: "在这个项目里" },
};

// Ring geometry (viewBox 360 × 300).
const CX = 180;
const CY = 150;
const R = 92;
const point = (deg, r = R) => [
  CX + Math.cos((deg * Math.PI) / 180) * r,
  CY + Math.sin((deg * Math.PI) / 180) * r,
];
const angle = (i) => -90 + i * 72;
// Arc from node i to i+1, trimmed so it never touches the nodes.
const arc = (i) => {
  const [x0, y0] = point(angle(i) + 14);
  const [x1, y1] = point(angle(i + 1) - 14);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${R} ${R} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

// One step every STEP_MS: the dot travels from the current node to the
// next, and the text switches as it arrives.
const STEP_MS = 3600;

export default function IterationLoop() {
  const lang = useLang();
  const steps = STEPS[lang];
  const ui = UI[lang];
  const [i, setI] = useState(0);
  // Plays on its own while in view; the first click stops it for good.
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const rootRef = useRef(null);
  const runnerRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) setPlaying(false);
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return undefined;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now) => {
      const progress = Math.min(1, (now - t0) / STEP_MS);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      const [x, y] = point(angle(i) + eased * 72);
      runnerRef.current?.setAttribute("cx", x.toFixed(1));
      runnerRef.current?.setAttribute("cy", y.toFixed(1));
      if (progress >= 1) {
        setI((prev) => (prev + 1) % steps.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, inView, i, steps.length]);

  const choose = (idx) => {
    setPlaying(false);
    setI(idx);
  };

  const onKey = (e, idx) => {
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (idx + 1) % steps.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (idx - 1 + steps.length) % steps.length;
    if (e.key === "Enter" || e.key === " ") next = idx;
    if (next === null) return;
    e.preventDefault();
    choose(next);
    e.currentTarget.closest("svg")?.querySelectorAll("[role='tab']")[next]?.focus();
  };

  return (
    <div ref={rootRef} className={`eg-widget eg-loop${playing ? " is-playing" : ""}`}>
      <svg className="eg-loop__ring" viewBox="0 0 360 300" role="tablist" aria-label={ui.label}>
        <defs>
          <marker id="eg-loop-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M1 1 L6 4 L1 7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </marker>
        </defs>
        <g className="eg-loop__arcs">
          {steps.map((_, idx) => (
            <path key={`a${idx}`} d={arc(idx)} markerEnd="url(#eg-loop-arrow)" />
          ))}
        </g>
        {/* While playing, a dot carries the loop from one step to the next. */}
        {playing ? (
          <circle ref={runnerRef} r="3" cx={point(angle(i))[0]} cy={point(angle(i))[1]} className="eg-loop__runner" />
        ) : null}
        <text x={CX} y={CY - 3} className="eg-loop__center">
          {ui.turn}
        </text>
        <text x={CX} y={CY + 15} className="eg-loop__center eg-loop__center--sub">
          {ui.version}
        </text>
        {steps.map((step, idx) => {
          const [x, y] = point(angle(idx));
          const [lx, ly] = point(angle(idx), R + 22);
          const anchor = Math.abs(lx - CX) < 8 ? "middle" : lx > CX ? "start" : "end";
          const top = idx === 0;
          const on = idx === i;
          return (
            <g
              key={step.name}
              role="tab"
              tabIndex={on ? 0 : -1}
              aria-selected={on}
              aria-label={`${idx + 1} ${step.name} · ${step.who}`}
              className={`eg-loop__node${on ? " is-on" : ""}`}
              onClick={() => choose(idx)}
              onKeyDown={(e) => onKey(e, idx)}
            >
              <circle cx={x} cy={y} r="20" className="eg-loop__hit" />
              <circle cx={x} cy={y} r="6" className="eg-loop__dot" />
              <text
                x={lx}
                y={top ? ly - 4 : ly + 4}
                textAnchor={anchor}
                className="eg-loop__name"
              >
                {step.name}
                <tspan className="eg-loop__who" dx="6">
                  {step.who}
                </tspan>
              </text>
            </g>
          );
        })}
      </svg>
      {/* Every step stacks in one cell, so switching never changes the height. */}
      <div className="eg-stack">
        {steps.map((s, idx) => (
          <div key={s.name} className={`eg-stack__item${idx === i ? " is-on" : ""}`} aria-hidden={idx !== i}>
            <p className="eg-kicker">
              <span className="eg-mono">{String(idx + 1).padStart(2, "0")}</span>
              {` / 05 · ${s.who}`}
            </p>
            <h5 className="eg-title eg-title--lg">{s.name}</h5>
            <p className="eg-text">{s.what}</p>
            <div className="eg-example">
              <p className="eg-example__label">{ui.eg}</p>
              <p className="eg-example__text">{s.eg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
