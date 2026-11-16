import { useRef } from "react";
import TryTaskList from "../TryTaskList";
import { useLang } from "./shared";
import LivePhone from "./LivePhone";

const T = {
  en: { reset: "Start over" },
  zh: { reset: "重新开始" },
};

/** One flow: a short task list next to the live phone. */
export default function LiveFlow({ start, title, tasks }) {
  const lang = useLang();
  const phone = useRef(null);
  const list = tasks[lang] ?? tasks.en;
  const t = T[lang];

  return (
    <div className="mm-widget mm-live">
      <div className="mm-live__side">
        <TryTaskList tasks={list} />
        <button
          type="button"
          className="mm-live__reset"
          onClick={() => phone.current?.reset()}
        >
          {t.reset}
        </button>
      </div>
      <LivePhone ref={phone} start={start} title={title} />
    </div>
  );
}

export function CreateGoalFlow() {
  return (
    <LiveFlow
      start="/goals/new"
      title="MoneyMap prototype — create a goal"
      tasks={{
        en: [
          "Give the goal a name, a target and a date.",
          "Move the date — the monthly amount updates before you save.",
          "Save it, then find it on Goals with this month’s amount.",
        ],
        zh: [
          "给目标起个名字，填金额和日期。",
          "改一下日期——保存之前，每月金额就跟着变。",
          "保存，然后在 Goals 里看到它本月要存多少。",
        ],
      }}
    />
  );
}

export function ChangePlanFlow() {
  return (
    <LiveFlow
      start="/goals/goal-japan"
      title="MoneyMap prototype — change a plan"
      tasks={{
        en: [
          "Tap Withdraw and take some money out — the preview shows what it does to this month.",
          "Open ⋯ and pause the goal. Nothing is due while it’s paused.",
          "Open ⋯ again and end it. Its money moves to Free to assign.",
          "Go back to Goals and find Free to assign — then add it to another goal.",
        ],
        zh: [
          "点「取出」拿出一笔钱——确认前会预览它对本月的影响。",
          "打开 ⋯ 暂停目标。暂停期间不要求存钱。",
          "再打开 ⋯ 结束它。它的钱会进入 Free to assign。",
          "回到 Goals 找到 Free to assign，再把它存进别的目标。",
        ],
      }}
    />
  );
}
