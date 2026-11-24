import { useState } from "react";
import { useLang } from "./shared";

const PLACES = {
  en: { new: "New money", goal: "In a goal", paused: "Paused goal", free: "Free to assign", out: "Taken out" },
  zh: { new: "新的钱", goal: "在目标里", paused: "暂停的目标", free: "Free to assign", out: "已取出" },
};

// Every change someone can make mid-plan. `from`/`to` are places; a change
// with no `to` edits the plan and leaves the money where it is.
const GROUPS = {
  en: [
    {
      title: "Plan edits",
      cases: [
        { id: "date", label: "Move the date", at: "goal", risk: "The monthly amount jumps with no reason given.", does: "Works it out again from what was saved before this month, and shows the new amount before saving." },
        { id: "target", label: "Change the target", at: "goal", risk: "The monthly amount changes, and you can’t tell why.", does: "Works out the new monthly amount from what’s left and the months left, and shows it before saving." },
        { id: "priority", label: "Change priority", at: "goal", risk: "Amounts quietly change with the order.", does: "Only the order changes. Monthly amounts stay the same." },
        { id: "entry", label: "Fix a past entry", at: "goal", risk: "Progress and status go stale.", does: "Progress, this month and status are worked out again." },
        { id: "reach", label: "Reach the target", at: "goal", route: "Money stays in the goal — it’s marked Completed", risk: "It keeps asking for this month.", does: "Asks for nothing and moves to Completed." },
      ],
    },
    {
      title: "Money moves",
      cases: [
        { id: "add", edge: "add", label: "Add money", from: "new", to: "goal", risk: "You can’t see what it changes.", does: "Shows what this month still needs, and the status after." },
        { id: "assign", edge: "assign", label: "Add from Free to assign", from: "free", to: "goal", risk: "More goes in than the goal needs.", does: "Stops at what the goal needs. The rest stays free." },
        { id: "over", edge: "extra", also: "goal", label: "Add more than needed", from: "new", to: "free", route: "What’s needed → the goal · the extra → Free to assign", risk: "The extra is cut off and disappears.", does: "The goal completes. You choose: keep the extra in Free to assign, or only add what’s needed." },
        { id: "withdraw", edge: "out", label: "Take money out", from: "goal", to: "out", risk: "The cost is hidden.", does: "Shows what’s left in the goal and whether its status changes, then asks how to catch up: save more each month, or move the date." },
        { id: "move", edge: "move", label: "Move to another goal", from: "goal", to: "goal", risk: "One goal falls behind without saying so.", does: "Shows both goals’ new balances, with the change on each." },
        { id: "lower", edge: "release", label: "Lower the target below what’s saved", from: "goal", to: "free", risk: "Money above the new target is cut off.", does: "The goal completes. The extra goes to Free to assign." },
      ],
    },
    {
      title: "Stop or restart",
      cases: [
        { id: "pause", edge: "pause", label: "Pause", from: "goal", to: "paused", risk: "It keeps asking for money and turns At Risk.", does: "Nothing is due. The money stays, and can still be taken out or moved." },
        { id: "resume", edge: "resume", label: "Resume", from: "paused", to: "goal", risk: "Missed months land as one big amount.", does: "Asks how to catch up: save more each month, or push the date back by the months it was paused." },
        { id: "end", edge: "release", label: "End", from: "goal", to: "free", risk: "The money is lost, or stuck in a dead goal.", does: "The money goes to Free to assign. The goal stays, marked Ended." },
        { id: "delete", edge: "release", label: "Delete", from: "goal", to: "free", risk: "The money disappears with the goal.", does: "The money moves to Free to assign first, then the goal is removed." },
      ],
    },
    {
      title: "Limits",
      cases: [
        { id: "lim-out", edge: "out", label: "Take out more than is saved", risk: "The goal drops below zero.", does: "Capped at what’s in the goal. “All” takes it to $0 and the goal stays." },
        { id: "lim-move", edge: "move", label: "Move more than either goal allows", risk: "One goal goes negative, or the other overfills.", does: "Capped at what this goal has and what the other still needs." },
        { id: "lim-free", edge: "assign", label: "Assign more than is free", risk: "Spending money that isn’t there.", does: "Capped at the Free to assign balance. At $0 the option is greyed out." },
        { id: "lim-paused", at: "paused", route: "Nothing moves — Add isn’t offered", label: "Add to a paused goal", risk: "Money goes in while nothing is due.", does: "Add is hidden while paused. Take out and Move still work." },
        { id: "lim-date", at: "goal", route: "No money moves — only the monthly amount changes", label: "A date this month, or already passed", risk: "Zero months left — the amount can’t be worked out.", does: "Months left never drops below one, so everything left is due this month." },
        { id: "lim-zero", at: "goal", route: "Nothing moves", label: "Enter $0", risk: "Empty entries clutter the history.", does: "The confirm button stays off until there’s an amount." },
      ],
    },
  ],
  zh: [
    {
      title: "改计划",
      cases: [
        { id: "date", label: "改日期", at: "goal", risk: "每月金额突然变了，没有解释。", does: "按本月之前已存的金额重新算，保存前先显示新金额。" },
        { id: "target", label: "改目标金额", at: "goal", risk: "每月金额变了，却看不出为什么。", does: "按还差多少、剩几个月重新算出每月金额，保存前先显示。" },
        { id: "priority", label: "改优先级", at: "goal", risk: "顺序一变，金额也悄悄跟着变。", does: "只改顺序，每月金额不变。" },
        { id: "entry", label: "修改历史记录", at: "goal", risk: "进度和状态没跟着更新。", does: "重新计算进度、本月金额和状态。" },
        { id: "reach", label: "达成目标", at: "goal", route: "钱留在目标里，标为「已完成」", risk: "还在要求本月存钱。", does: "不再要求存钱，移到「已完成」。" },
      ],
    },
    {
      title: "钱在移动",
      cases: [
        { id: "add", edge: "add", label: "存入", from: "new", to: "goal", risk: "看不出这笔钱带来什么变化。", does: "显示本月还差多少，以及存入后的状态。" },
        { id: "assign", edge: "assign", label: "从 Free to assign 存入", from: "free", to: "goal", risk: "存进去的超过目标所需。", does: "最多存到目标所需，其余留在 Free to assign。" },
        { id: "over", edge: "extra", also: "goal", label: "存入超过所需", from: "new", to: "free", route: "所需部分 → 目标 · 多出的 → Free to assign", risk: "多出来的被截掉、消失。", does: "目标完成；你选择把多余的留在 Free to assign，或只存需要的部分。" },
        { id: "withdraw", edge: "out", label: "取出", from: "goal", to: "out", risk: "看不到代价。", does: "先显示目标里还剩多少、状态会不会变，再问怎么补：每月多存，还是推迟日期？" },
        { id: "move", edge: "move", label: "挪到别的目标", from: "goal", to: "goal", risk: "一个目标悄悄落后。", does: "同时显示两个目标的新余额，以及各自的变化。" },
        { id: "lower", edge: "release", label: "把目标改到低于已存", from: "goal", to: "free", risk: "超出新目标的钱被截掉。", does: "目标完成，多出来的进入 Free to assign。" },
      ],
    },
    {
      title: "停下或重启",
      cases: [
        { id: "pause", edge: "pause", label: "暂停", from: "goal", to: "paused", risk: "还在要求存钱，最后变成 At Risk。", does: "不要求存钱；钱留在原处，仍可取出或挪走。" },
        { id: "resume", edge: "resume", label: "恢复", from: "paused", to: "goal", risk: "错过的几个月压成一大笔。", does: "问怎么补：之后每月多存，还是把日期顺延暂停的月数？" },
        { id: "end", edge: "release", label: "结束", from: "goal", to: "free", risk: "钱丢了，或卡在不再用的目标里。", does: "钱进入 Free to assign；目标保留为「已结束」。" },
        { id: "delete", edge: "release", label: "删除", from: "goal", to: "free", risk: "钱跟着目标一起消失。", does: "先把钱移到 Free to assign，再删除目标。" },
      ],
    },
    {
      title: "极限情况",
      cases: [
        { id: "lim-out", edge: "out", label: "取出超过已存", risk: "目标变成负数。", does: "最多取到目标里有的钱。点「全部」会取到 $0，目标保留。" },
        { id: "lim-move", edge: "move", label: "挪动超过两边允许的", risk: "一边变负数，或另一边存超了。", does: "最多挪这个目标有的、对方还需要的金额。" },
        { id: "lim-free", edge: "assign", label: "分配超过可用的钱", risk: "花了不存在的钱。", does: "最多到 Free to assign 的余额；余额为 $0 时选项变灰。" },
        { id: "lim-paused", at: "paused", route: "钱不动——不提供「存入」", label: "给暂停的目标存钱", risk: "说好不用存，钱却进去了。", does: "暂停期间不显示「存入」，取出和挪动仍可用。" },
        { id: "lim-date", at: "goal", route: "钱不动，只改每月金额", label: "日期在本月，或已经过了", risk: "剩 0 个月，金额算不出来。", does: "剩余月数最少按 1 算，剩下的全部本月到期。" },
        { id: "lim-zero", at: "goal", route: "钱不动", label: "输入 $0", risk: "空记录弄乱历史。", does: "没有金额时确认按钮不可点。" },
      ],
    },
  ],
};

const T = {
  en: {
    stays: "Money stays where it is — only the plan changes",
    risk: "What could go wrong",
    does: "What MoneyMap does",
    route: "Money goes",
    inBy: "Comes in by",
    outBy: "Leaves by",
    none: "—",
    edges: { add: "Add", extra: "Extra", assign: "Assign", out: "Take out", move: "Move", release: "End · Delete", pause: "Pause", resume: "Resume" },
  },
  zh: {
    stays: "钱不动，只改计划",
    risk: "可能出的问题",
    does: "MoneyMap 怎么做",
    route: "钱去哪",
    inBy: "怎么进来",
    outBy: "怎么出去",
    none: "—",
    edges: { add: "存入", extra: "多出的", assign: "分配", out: "取出", move: "挪动", release: "结束 · 删除", pause: "暂停", resume: "恢复" },
  },
};

// Diagram: boxes for places, arrows for the ways money moves between them.
const NODES = {
  new: { x: 10, y: 86, w: 120, h: 48 },
  goal: { x: 245, y: 80, w: 150, h: 60 },
  paused: { x: 260, y: 4, w: 120, h: 40 },
  out: { x: 510, y: 86, w: 120, h: 48 },
  free: { x: 245, y: 214, w: 150, h: 48 },
};

const EDGES = [
  { id: "add", from: "new", to: "goal", d: "M132,110 L241,110", lx: 187, ly: 101, a: "middle" },
  { id: "out", from: "goal", to: "out", d: "M397,110 L506,110", lx: 452, ly: 127, a: "middle" },
  { id: "pause", from: "goal", to: "paused", d: "M300,78 L300,48", lx: 292, ly: 67, a: "end" },
  { id: "resume", from: "paused", to: "goal", d: "M340,46 L340,76", lx: 348, ly: 67, a: "start" },
  { id: "assign", from: "free", to: "goal", d: "M300,212 L300,144", lx: 292, ly: 182, a: "end" },
  { id: "release", from: "goal", to: "free", d: "M340,142 L340,210", lx: 348, ly: 182, a: "start" },
  { id: "move", from: "goal", to: "goal", d: "M397,96 C455,92 455,38 386,76", lx: 458, ly: 58, a: "start" },
  { id: "extra", from: "new", to: "free", d: "M70,136 C70,205 150,238 241,238", lx: 150, ly: 260, a: "middle" },
];

/** Decision 3: pick a change (top) → the diagram shows where the money ends up (bottom). */
export default function MoneyStatesDemo() {
  const lang = useLang();
  const places = PLACES[lang];
  const groups = GROUPS[lang];
  const t = T[lang];
  const all = groups.flatMap((g) => g.cases);
  const [id, setId] = useState("withdraw");
  const c = all.find((x) => x.id === id) || all[0];
  const groupIndex = Math.max(0, groups.findIndex((g) => g.cases.some((x) => x.id === c.id)));
  const group = groups[groupIndex];
  const edge = c.edge ? EDGES.find((x) => x.id === c.edge) : null;
  const nodeOn = (k) => (c.at ? c.at === k : c.also === k || (edge && (edge.from === k || edge.to === k)));

  return (
    <div className="mm-moves-wrap">
      <div className="mm-moves__tabs" role="tablist">
        {groups.map((g, gi) => (
          <button
            key={g.title}
            type="button"
            role="tab"
            aria-selected={gi === groupIndex}
            className={`mm-moves__tab${gi === groupIndex ? " is-active" : ""}`}
            onClick={() => setId(g.cases[0].id)}
          >
            {g.title}
            <span>{g.cases.length}</span>
          </button>
        ))}
      </div>
      <div className="mm-widget mm-moves">
      <div className="mm-moves__stack mm-moves__cases-stack">
        {groups.map((g, gi) => (
          <ul
            key={g.title}
            className={`mm-moves__cases mm-moves__layer${gi === groupIndex ? " is-on" : ""}`}
            aria-hidden={gi !== groupIndex}
          >
            {g.cases.map((x) => (
              <li key={x.id}>
                <button
                  type="button"
                  tabIndex={gi === groupIndex ? 0 : -1}
                  className={`mm-moves__case${c.id === x.id ? " is-active" : ""}`}
                  onClick={() => setId(x.id)}
                >
                  {x.label}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="mm-moves__result">
        <svg className="mm-map" viewBox="0 0 640 266" aria-hidden="true">
          <defs>
            <marker id="mm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="mm-map__head" />
            </marker>
            <marker id="mm-arrow-on" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,0 L10,5 L0,10 z" className="mm-map__head is-on" />
            </marker>
          </defs>
          {EDGES.map((e) => (
            <g key={e.id} className={`mm-map__edge${edge?.id === e.id ? " is-on" : ""}`}>
              <path d={e.d} markerEnd={edge?.id === e.id ? "url(#mm-arrow-on)" : "url(#mm-arrow)"} />
              <text x={e.lx} y={e.ly} textAnchor={e.a}>{t.edges[e.id]}</text>
            </g>
          ))}
          {Object.entries(NODES).map(([k, n]) => (
            <g key={k} className={`mm-map__node${nodeOn(k) ? " is-on" : ""}`}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="14" />
              <text x={n.x + n.w / 2} y={n.y + n.h / 2 + 5} textAnchor="middle">{places[k]}</text>
            </g>
          ))}
        </svg>

        <div className="mm-moves__detail">
          {/* Every case sits in the same cell; only the picked one is visible,
              so the card is always as tall as the longest case — no jumping. */}
          <div className="mm-moves__stack">
            {all.map((x) => {
              const e = x.edge ? EDGES.find((y) => y.id === x.edge) : null;
              return (
                <div
                  key={x.id}
                  className={`mm-moves__layer${x.id === c.id ? " is-on" : ""}`}
                  aria-hidden={x.id !== c.id}
                >
                  <p className="mm-moves__title">{x.label}</p>
                  <div className="mm-moves__route">
                    {x.route || !e ? (
                      <span className="mm-moves__tag mm-moves__tag--note">{x.route || t.stays}</span>
                    ) : (
                      <>
                        <span className="mm-moves__tag">{places[e.from]}</span>
                        <span className="mm-moves__arrow" aria-hidden="true">→</span>
                        <span className="mm-moves__tag mm-moves__tag--to">{places[e.to]}</span>
                      </>
                    )}
                  </div>
                  <dl>
                    <div className="mm-moves__risk">
                      <dt>{t.risk}</dt>
                      <dd>{x.risk}</dd>
                    </div>
                    <div className="mm-moves__does">
                      <dt>{t.does}</dt>
                      <dd>{x.does}</dd>
                    </div>
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
