/**
 * Money Map native case-study body (EN + ZH).
 * From the Notion case study (Erdős Institute UXR Bootcamp).
 * Story: research → HMW → three design decisions → usability plan.
 * Each decision: the tension → what I chose → screens or interactive where it helps.
 */

const PERSONA_TABLE_EN = {
  headers: ["Research input", "Need I carried into the design"],
  rows: [
    [
      "Suzie, the Financial Starter — knows her target and deadline, but needs help calculating contributions and whether she is keeping up.",
      "Tell her how much to save each month, and whether she’s keeping up.",
    ],
    [
      "David, the Financial Organizer — manages several goals and needs to compare them without opening screen after screen.",
      "One page that shows every goal side by side.",
    ],
    [
      "Rachel, the Financial Optimizer — checks calculations and adjusts plans when circumstances change.",
      "Show how each number is worked out, and let her change the plan.",
    ],
  ],
  caption: "Three personas from the team’s research, and the need each one carried into my design.",
};

const PERSONA_TABLE_ZH = {
  headers: ["研究输入", "我带进设计的需求"],
  rows: [
    [
      "Suzie（起步者）——知道目标和期限，但需要帮忙算每月该存多少、自己有没有跟上。",
      "告诉她每月该存多少、有没有跟上。",
    ],
    [
      "David（统筹者）——同时管好几个目标，需要一眼比较，而不用反复进出不同页面。",
      "一个页面看清所有目标。",
    ],
    [
      "Rachel（优化者）——会核对计算，情况变了就会改计划。",
      "看得到每个数字怎么算出来，也能自己改计划。",
    ],
  ],
  caption: "团队研究里的三个人物，以及各自带进我设计的需求。",
};

const EVAL_TABLE_EN = {
  headers: ["Decision", "Task", "What I’d watch for"],
  rows: [
    [
      "1. Same monthly amount everywhere",
      "Create a goal, then move its date.",
      "Whether people predict the new monthly amount before they confirm it.",
    ],
    [
      "2. Progress is checked by the month",
      "Check a goal mid-month, before payday.",
      "Whether people read On Track correctly, and trust it.",
    ],
    [
      "3. You always know where your money is",
      "Take money out of one goal, then end another.",
      "Whether people can say where each amount went — and find Free to assign afterwards.",
    ],
  ],
  caption: "A moderated, task-based study with one task per decision.",
};

const EVAL_TABLE_ZH = {
  headers: ["决定", "任务", "我会观察什么"],
  rows: [
    ["1. 每月金额处处一致", "创建一个目标，再改它的日期。", "确认前，用户能否预判新的每月金额。"],
    ["2. 按月看进度", "在月中、发薪日之前查看一个目标。", "用户是否正确理解 On Track，并且相信它。"],
    ["3. 随时知道钱在哪", "从一个目标取钱，再结束另一个目标。", "用户能否说出每笔钱去了哪，之后能否找到 Free to assign。"],
  ],
  caption: "有主持的任务式研究，每个决定对应一个任务。",
};

export const MONEY_MAP_SUMMARY = [
  "MoneyMap is a personal finance app. I redesigned its savings goals — setting a goal, saving each month, and changing plans along the way — and built the whole journey as a working prototype you can use on this page.",
];

export const MONEY_MAP_SUMMARY_ZH = [
  "MoneyMap 是一款个人理财 App。我重新设计了它的储蓄目标功能——设定目标、每月存钱、中途改计划——并把整条旅程做成了可以操作的原型，就在这个页面里。",
];

export const MONEY_MAP_FACTS = [
  { label: "Role", lines: ["Product Designer", "Strategy, UX, prototype"] },
  { label: "Background", lines: ["Erdős Institute", "UXR Bootcamp, team project"] },
  { label: "Deliverables", lines: ["Product strategy", "Interactive prototype", "Usability test plan"] },
  { label: "Timeline", lines: ["5 weeks", "2026"] },
];

export const MONEY_MAP_FACTS_ZH = [
  { label: "角色", lines: ["产品设计师", "策略、体验、原型"] },
  { label: "背景", lines: ["Erdős Institute", "UXR Bootcamp 团队项目"] },
  { label: "交付物", lines: ["产品策略", "可交互原型", "可用性测试计划"] },
  { label: "时间", lines: ["5 周", "2026"] },
];

// Story chapters over the sections (by section id), shared by EN + ZH.
export const MONEY_MAP_DETAIL_CHAPTERS = [
  { id: "overview", label: "Overview", labelZh: "概述", sections: ["overview"] },
  { id: "understand", label: "Research", labelZh: "研究", sections: ["research"] },
  { id: "journey", label: "Journey", labelZh: "旅程", sections: ["journey"] },
  {
    id: "design",
    label: "Decisions",
    labelZh: "设计决定",
    sections: ["decision-math", "decision-time", "decision-money"],
  },
  { id: "testing", label: "Testing", labelZh: "测试", sections: ["evaluate", "next"] },
];

export const MONEY_MAP_DETAIL_SECTIONS = [
  {
    id: "overview",
    label: "The problem",
    paragraphs: [
      "Savings goals are easy to set. The hard part is knowing what to do next, and what happens to your money when the plan changes.",
      "MoneyMap’s old Goal Tracker showed a progress bar and little else: no monthly amount, no sense of whether you were keeping up, no answer for where money goes when plans change. Users were confused, rarely came back, and left goals unfinished.",
    ],
  },
  {
    id: "research",
    label: "What I took from the research",
    paragraphs: [
      "My teammates built three personas. I took one need from each into the design: Suzie needs to be told what to save, David needs to see all his goals at once, and Rachel needs to check the numbers and change the plan herself.",
    ],
    imagesLayout: "rail",
    images: [
      { src: "/money-map/persona-suzie.png", alt: "Persona card for Suzie, the Financial Starter" },
      { src: "/money-map/persona-david.png", alt: "Persona card for David, the Financial Organizer" },
      { src: "/money-map/persona-rachel.png", alt: "Persona card for Rachel, the Financial Optimizer" },
    ],
    tables: [PERSONA_TABLE_EN],
    closingQuote:
      "How might MoneyMap help users understand what their goals require, decide where to focus, and revise their plans without losing track of their progress?",
  },
  {
    id: "journey",
    label: "The saving flow, end to end",
    paragraphs: [
      "I first walked through the whole saving flow: setting a goal, saving each month, changing plans, and finishing.",
    ],
    interactive: "mm-journey",
    items: [
      {
        title: "Each screen answers one question",
        paragraphs: [
          "Home: how much have I saved in total? Goals: what do I still need to save this month? All goals: how far along is each goal, and which are done? An early version put this month and each goal’s overall progress on the same page, and people couldn’t tell which numbers were about now.",
        ],
      },
    ],
  },
  {
    id: "decision-math",
    label: "1. The same monthly amount on every screen",
    paragraphs: [
      "The first thing a goal tells you is how much to save each month: what’s left to save, divided by the months left. A $6,000 trip due in 11 months asks for $545 a month.",
      "In my first build, different screens worked this number out differently. Creating a goal showed one amount; after saving, the goal split leftover income by priority and showed another; changing priority changed it again. Now every screen uses the same calculation, so the amount you agree to when you create a goal is the amount you see afterwards. Priority only decides the order.",
    ],
    screens: [
      {
        src: "/money-map/journey/1-set.webp",
        caption: "New goal — the monthly amount shows before you create it",
      },
      {
        src: "/money-map/journey/2-month.webp",
        caption: "Goals · this month — what each goal still needs this month",
      },
      {
        src: "/money-map/journey/4-status.webp",
        caption: "Goal detail — this month’s amount, plus overall progress",
      },
    ],
  },
  {
    id: "decision-time",
    label: "2. Progress is checked by the month",
    paragraphs: [
      "Pay arrives monthly. Rent, credit card bills and subscriptions are due monthly. People already think about money in months, so every goal asks for a monthly amount, and its status is judged by the month.",
      "A goal is On Track while this month is covered, Behind when a month ends more than 5% short, and At Risk past 20%. Before payday, nothing is marked late.",
    ],
  },
  {
    id: "decision-money",
    label: "3. You always know where your money is",
    paragraphs: [
      "Plans change: a bonus, a car repair, a cancelled trip. I followed the money through every change someone could make, and found my own prototype cutting money off — adding more than a goal needed made the extra disappear. Now money is always in one of five places — new money, a goal, a paused goal, Free to assign (saved money that isn’t in any goal), or taken out — and every change tells you where it’s going before it moves.",
      "Below is every edge case I designed for, including the limits. Pick one to see where the money goes, what could go wrong, and what MoneyMap does.",
    ],
    interactive: "mm-states",
    items: [
      {
        title: "Try it",
        interactive: "mm-live-change",
      },
    ],
  },
  {
    id: "evaluate",
    label: "Usability testing plan",
    paragraphs: [
      "A moderated study with one task per decision. I’d watch for errors, hesitation and requests for help, then ask people where they think their money is.",
    ],
    tables: [EVAL_TABLE_EN],
  },
  {
    id: "next",
    label: "What I’d look at next",
    paragraphs: [
      "First I’d run the study above. The three tasks already sit on the three decisions: can someone predict the new monthly amount before they save a date change; do they read On Track as safe mid-month, before payday; after a withdraw and an end, can they say where each amount went.",
      "I’d also watch whether Free to assign shows up when they need it. Decision 3 only works if that place is findable after money leaves a goal — Home shows it, but I haven’t checked whether people look there first, or hunt inside the goal they just left.",
      "A later product question, if MoneyMap ever moved money itself: transfers still processing, ones that fail, and ones that land after the month closes. Money in those situations would need its own place too, such as “in transfer”. That’s past this prototype.",
    ],
  },
];

export const MONEY_MAP_DETAIL_SECTIONS_ZH = [
  {
    id: "overview",
    label: "问题",
    paragraphs: [
      "储蓄目标好设。难的是下一步做什么，以及计划一变，钱去了哪。",
      "MoneyMap 原来的目标追踪器只有一条进度条：不说每月该存多少、跟没跟上，也不说计划变了钱去哪。人容易懵、很少回来，目标也总完不成。",
    ],
  },
  {
    id: "research",
    label: "研究里带走的",
    paragraphs: [
      "队友做了三个人物画像，我从每个人带走一个需求：Suzie 要知道该存多少，David 要一眼看到全部目标，Rachel 要能核对数字、自己改计划。",
    ],
    imagesLayout: "rail",
    images: [
      { src: "/money-map/persona-suzie.png", alt: "Suzie（起步者）人物卡" },
      { src: "/money-map/persona-david.png", alt: "David（统筹者）人物卡" },
      { src: "/money-map/persona-rachel.png", alt: "Rachel（优化者）人物卡" },
    ],
    tables: [PERSONA_TABLE_ZH],
    closingQuote:
      "How might we：MoneyMap 怎样帮人看清目标需要什么、决定先顾哪里，并在改计划时仍跟得上自己的进度？",
  },
  {
    id: "journey",
    label: "完整的储蓄流程",
    paragraphs: [
      "我先把整个储蓄流程走了一遍：设定目标、每月存钱、中途改计划，到最后完成。",
    ],
    interactive: "mm-journey",
    items: [
      {
        title: "每个页面只回答一个问题",
        paragraphs: [
          "首页：我一共存了多少？Goals：这个月还要存多少？全部目标：每个目标进行到哪了，哪些已经完成？早期版本把本月和每个目标的整体进度放在同一页，用户分不清哪些数字说的是现在。",
        ],
      },
    ],
  },
  {
    id: "decision-math",
    label: "1. 每个页面的每月金额都一样",
    paragraphs: [
      "一个目标首先告诉你的，是每月该存多少：还差多少，除以剩下几个月。一个 11 个月后到期、要存 $6,000 的旅行，每月就是 $545。",
      "我第一版里，不同页面用不同方法算这个数：创建时显示一个金额；保存后，目标改成按优先级分配剩余收入，显示另一个；改优先级又会再变。现在所有页面用同一种算法，创建时你答应的金额，就是之后看到的金额。优先级只决定顺序。",
    ],
    screens: [
      {
        src: "/money-map/journey/1-set.webp",
        caption: "新建目标——创建之前就显示每月金额",
      },
      {
        src: "/money-map/journey/2-month.webp",
        caption: "Goals · 本月——每个目标这个月还差多少",
      },
      {
        src: "/money-map/journey/4-status.webp",
        caption: "目标详情——本月金额，以及整体进度",
      },
    ],
  },
  {
    id: "decision-time",
    label: "2. 按月看进度",
    paragraphs: [
      "工资按月发，房租、信用卡账单、订阅也都按月付。人本来就是按月想钱的，所以每个目标给出每月该存的金额，状态也按月判断。",
      "本月存够了就是 On Track；一个月结束时差 5% 以上是 Behind，超过 20% 是 At Risk。发薪日之前不会被标成落后。",
    ],
  },
  {
    id: "decision-money",
    label: "3. 随时知道钱在哪",
    paragraphs: [
      "计划总会变：发了奖金、车坏了、旅行取消了。我跟着钱走过每一种可能的改动，发现自己的原型会把钱截掉——存入超过目标所需，多出来的就消失了。现在钱永远在五个地方之一：新的钱、目标里、暂停的目标里、Free to assign（已存下但不属于任何目标的钱）、已取出；每次改动前都先告诉你钱要去哪。",
      "下面是我考虑的全部边界情况，包括极限情况。选一种，看钱去了哪、可能出什么问题、MoneyMap 怎么处理。",
    ],
    interactive: "mm-states",
    items: [
      {
        title: "试一试",
        interactive: "mm-live-change",
      },
    ],
  },
  {
    id: "evaluate",
    label: "可用性测试计划",
    paragraphs: [
      "有主持的任务研究，每个决定对应一个任务。看出错、犹豫和求助，最后问：你觉得钱现在在哪？",
    ],
    tables: [EVAL_TABLE_ZH],
  },
  {
    id: "next",
    label: "接下来想看的",
    paragraphs: [
      "先把上面的测试跑起来。三个任务分别压在三个决定上：改日期保存前，能不能预判新的每月金额；月中、发薪日之前，会不会把 On Track 当成「没事」；取出再结束一个目标后，能不能说出每笔钱去哪了。",
      "也会看 Free to assign 好不好找。决定 3 要成立，钱离开目标后，那个去处还得找得到——首页有它，但我还没验证大家会先看首页，还是回到刚离开的目标里翻。",
      "再往后，如果 MoneyMap 自己转账：处理中、失败、月底之后才到账——「还在路上」的钱也得有自己的位置，比如「转账中」。那已经超出这个原型了。",
    ],
  },
];
