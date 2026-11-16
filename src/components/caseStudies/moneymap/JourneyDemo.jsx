import { useLang } from "./shared";

const STEPS = {
  en: [
    {
      id: "set",
      label: "Set a goal",
      screen: "Create goal",
      happens: "A target and a date become one monthly amount, shown before saving.",
      decision: "Decision 1 — the same monthly amount on every screen.",
    },
    {
      id: "month",
      label: "Each month",
      screen: "Goals · this month",
      happens: "Every goal shows what this month still needs. Goals split into To save, Covered and Paused.",
      decision: "Goals is only about this month; Home shows everything saved.",
    },
    {
      id: "save",
      label: "Add money",
      screen: "Money sheet · Add",
      happens: "Pick an amount and where it comes from — new money or Free to assign. The result is previewed first.",
      decision: "Every money action shows its result before you confirm.",
    },
    {
      id: "check",
      label: "Check status",
      screen: "Goal detail",
      happens: "On Track, Behind or At Risk — judged when a month ends, not every day.",
      decision: "Decision 2 — progress is checked by the month.",
    },
    {
      id: "change",
      label: "Life changes",
      screen: "Money sheet · Withdraw",
      happens: "Taking money out shows what’s left and the status change, then asks how to catch up: save more, or move the date.",
      decision: "Decision 3 — you always know where your money is.",
    },
    {
      id: "done",
      label: "Finish or end",
      screen: "All goals",
      happens: "Completed and ended goals stay in All goals. An ended goal’s money moves to Free to assign.",
      decision: "Money never disappears with a goal.",
    },
  ],
  zh: [
    {
      id: "set",
      label: "设定目标",
      screen: "创建目标",
      happens: "目标金额和日期在保存前就变成一个每月金额。",
      decision: "决定 1 —— 每个页面的每月金额都一样。",
    },
    {
      id: "month",
      label: "每个月",
      screen: "Goals · 本月",
      happens: "每个目标显示本月还差多少，并分成「待存 / 已存够 / 暂停」。",
      decision: "Goals 只看本月；首页看全部储蓄。",
    },
    {
      id: "save",
      label: "存一笔",
      screen: "存取面板 · 存入",
      happens: "选金额和来源（新的钱，或 Free to assign），先预览结果再确认。",
      decision: "每个动钱的操作，确认前都先显示结果。",
    },
    {
      id: "check",
      label: "看状态",
      screen: "目标详情",
      happens: "On Track / Behind / At Risk —— 每月结束时判断，而不是每天。",
      decision: "决定 2 —— 按月看进度。",
    },
    {
      id: "change",
      label: "计划变了",
      screen: "存取面板 · 取出",
      happens: "取钱时先显示还剩多少、状态怎么变，再问怎么补：每月多存，还是推迟日期。",
      decision: "决定 3 —— 随时知道钱在哪。",
    },
    {
      id: "done",
      label: "完成或结束",
      screen: "全部目标",
      happens: "已完成和已结束的目标都留在全部目标里；结束目标的钱进入 Free to assign。",
      decision: "钱不会跟着目标一起消失。",
    },
  ],
};

const IMAGES = {
  set: "1-set",
  month: "2-month",
  save: "3-add",
  check: "4-status",
  change: "5-change",
  done: "6-done",
};

/** The whole life of a goal, screen by screen (static — the decisions
 *  further down each open the live prototype). */
export default function JourneyDemo() {
  const lang = useLang();
  const steps = STEPS[lang];
  return (
    <div className="mm-widget mm-flow">
      <ol className="mm-flow__track">
        {steps.map((step, i) => (
          <li key={step.id} className="mm-flow__step">
            <img
              src={`${import.meta.env.BASE_URL}money-map/journey/${IMAGES[step.id]}.webp`}
              alt={step.screen}
              loading="lazy"
              className="mm-flow__shot"
            />
            <p className="mm-flow__label">
              <span>{i + 1}</span>
              {step.label}
            </p>
            <p className="mm-flow__text">{step.happens}</p>
            <p className="mm-flow__why">{step.decision}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
