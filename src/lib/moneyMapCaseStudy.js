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
      "Setting a savings goal is easy. Knowing what to do next is hard: how much to save this month, whether you’re on track, and what happens to your money when plans change.",
      "MoneyMap’s old Goal Tracker only showed a progress bar. It didn’t answer any of those questions. Users got confused, rarely came back, and left goals unfinished.",
      "This was a five-week team project. My teammates ran the research and built the personas. I turned their findings into a product strategy, designed and built a working prototype of the whole saving flow, and wrote the plan to test it.",
    ],
  },
  {
    id: "research",
    label: "What I took from the research",
    paragraphs: [
      "My teammates built three personas. Each one needed something different (see the table).",
      "These needs became the design decisions further down. Suzie’s need shaped decisions 1 and 2: one clear monthly amount, and a fair answer to “am I keeping up?”. Rachel’s shaped decision 3: change the plan and still know where the money is. David’s shaped how the screens are split: one page for this month, one for everything saved.",
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
    label: "The saving flow",
    lead: "Walked end to end before designing any one screen.",
    paragraphs: [
      "A goal goes through six steps, from setting it to finishing it. Each step below is one screen in the prototype, with the decision behind it.",
    ],
    interactive: "mm-journey",
    items: [
      {
        title: "Each screen answers one question",
        paragraphs: [
          "Home answers: how much have I saved in total? Goals answers: what do I still need to save this month? All goals answers: how is each goal doing overall? In an early version, one page mixed this month’s numbers with overall numbers, and it was hard to tell which was which.",
        ],
      },
    ],
  },
  {
    id: "decision-math",
    label: "1. One monthly amount",
    lead: "The same number on every screen.",
    paragraphs: [
      "A target and a date are hard to act on. A monthly amount is easy: it’s what you set aside on payday. So the first number a goal shows is how much to save each month: what’s left, divided by the months left. A $6,000 trip in 11 months is $545 a month.",
      "In my first build, this number changed between screens. A new goal showed one amount while I was creating it, and another once it was saved. Changing its priority changed it again.",
      "Now every screen works it out the same way. The amount you see when you create a goal is the amount you see afterwards. Priority only changes the order of goals.",
      "If you later change the date or the target, a confirm step shows the new monthly amount and how much it went up or down before anything is saved.",
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
    label: "2. Monthly progress",
    lead: "Checked by the month, the way pay and bills arrive.",
    paragraphs: [
      "A percentage tells you how much is saved, not whether it’s enough. 60% sounds good, unless the deadline is next week. So each goal also gets a status: On Track, Behind or At Risk.",
      "Status is checked by the month, because money moves by the month. Pay comes in monthly. Rent, card bills and subscriptions go out monthly.",
      "Checking every day would be unfair. Someone who saves on payday would look Behind for most of the month, even while following the plan. So a goal is only Behind if a month ends more than 5% short, and At Risk if it ends more than 20% short.",
    ],
  },
  {
    id: "decision-money",
    label: "3. Where the money is",
    lead: "You always know, even when plans change.",
    paragraphs: [
      "Plans change: a bonus comes in, the car breaks down, a trip is cancelled. Rachel wanted to adjust freely. Suzie worried that one wrong tap would undo months of saving.",
      "I went through every change someone could make, and followed the money each time. That’s how I found a bug in my own prototype: if you added more than a goal needed, the extra just disappeared.",
      "So I made sure money is always in one of five places: new money, in a goal, in a paused goal, Free to assign (saved, but not in any goal yet), or taken out. Before any change, the app shows where the money will go.",
      "Below are all the cases I designed for, including the limits. Pick one to see where the money goes, what could go wrong, and what the app does.",
    ],
    interactive: "mm-states",
    items: [
      {
        title: "Pause, end and delete are different",
        paragraphs: [
          "Pause keeps the money in the goal and asks for nothing until you resume. End stops the goal and moves its money to Free to assign; the goal stays in the list as Ended. Delete removes the goal, after moving its money to Free to assign. A goal with money in it never just disappears.",
        ],
      },
      {
        title: "See the result before you confirm",
        paragraphs: [
          "Add, Withdraw and Move use the same sheet. You enter the amount first, then see the result: what’s still needed this month or what’s left in the goal, and whether the status changes. Questions like “how do you want to catch up?” come after the result, not before.",
        ],
      },
      {
        title: "Try it",
        interactive: "mm-live-change",
      },
    ],
  },
  {
    id: "evaluate",
    label: "Testing plan",
    paragraphs: [
      "I planned a moderated test with one task per decision. While people do each task, I’d note mistakes, pauses and questions. At the end I’d ask: where do you think your money is right now?",
    ],
    tables: [EVAL_TABLE_EN],
  },
  {
    id: "next",
    label: "What I’d look at next",
    paragraphs: [
      "First, run the test above. Each decision comes down to one question. Can people guess the new monthly amount before saving a date change? Do they understand On Track in the middle of the month, before payday? After taking money out and ending a goal, can they say where each amount went?",
      "I’d also check whether people can find Free to assign. It’s on Home, but people might look for the money inside the goal they just left.",
      "Later, if MoneyMap moved real money, new cases would come up: transfers still processing, transfers that fail, and money that arrives after the month ends. That money would need its own place too, such as “in transfer”.",
      "What I learned: edge cases weren’t extra work at the end. Following the money through each one is what found the bugs, and what shaped the three decisions.",
    ],
  },
];

export const MONEY_MAP_DETAIL_SECTIONS_ZH = [
  {
    id: "overview",
    label: "问题",
    paragraphs: [
      "设一个储蓄目标很容易，难的是之后：这个月该存多少、有没有跟上、计划变了钱去哪。",
      "MoneyMap 原来的目标追踪只有一条进度条，这些问题一个都没回答。用户看不懂，很少回来，目标也常常完不成。",
      "这是一个 5 周的团队项目。队友做了用户研究和人物画像；我把研究结论变成产品策略，设计并搭建了覆盖整个储蓄流程的可交互原型，并写了测试计划。",
    ],
  },
  {
    id: "research",
    label: "研究里带走的",
    paragraphs: [
      "队友做了三个人物画像，每个人需要的东西不一样，见下表。",
      "这些需求变成了后面的设计决定。Suzie 的需求对应决定 1 和 2：一个清楚的每月金额，以及对「我跟上了吗」的公平判断。Rachel 的需求对应决定 3：改计划时也知道钱在哪。David 的需求决定了页面怎么分：一个页面看本月，一个页面看全部。",
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
    label: "储蓄流程",
    lead: "先把整个流程走一遍，再去设计单个页面。",
    paragraphs: [
      "一个目标从设定到完成，会经过六步。下面每一步都是原型里的一个页面，以及它背后的决定。",
    ],
    interactive: "mm-journey",
    items: [
      {
        title: "每个页面只回答一个问题",
        paragraphs: [
          "首页回答：我一共存了多少？Goals 回答：这个月还要存多少？全部目标回答：每个目标整体进行得怎么样？早期版本把本月的数字和整体的数字放在同一页，很难分清哪个是哪个。",
        ],
      },
    ],
  },
  {
    id: "decision-math",
    label: "1. 统一的每月金额",
    lead: "每个页面上看到的都是同一个数。",
    paragraphs: [
      "目标金额加日期，很难直接行动；每月金额就容易了，发工资时存下这么多就行。所以目标首先显示的，是每月该存多少：还差多少，除以剩下几个月。一个 11 个月后的 $6,000 旅行，就是每月 $545。",
      "我第一版里，这个数在不同页面不一样：创建时显示一个，保存后变成另一个，改优先级又变一次。",
      "现在每个页面都用同一种算法。创建时看到多少，之后就是多少。优先级只改目标的先后顺序。",
      "之后如果改日期或目标金额，保存前会先确认一次：显示新的每月金额，以及比原来多了还是少了多少。",
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
    lead: "和工资、账单一样，按月来算。",
    paragraphs: [
      "百分比只说明存了多少，不说明够不够。存了 60% 听起来不错，但如果下周就到期，就不够了。所以每个目标还有一个状态：On Track、Behind 或 At Risk。",
      "状态按月判断，因为钱就是按月进出的：工资按月发，房租、信用卡、订阅也按月付。",
      "如果每天判断，就不公平：习惯发薪日存钱的人，一个月里大部分时间都会显示 Behind，哪怕他完全按计划在存。所以只有一个月结束时差了 5% 以上，才算 Behind；差 20% 以上算 At Risk。",
    ],
  },
  {
    id: "decision-money",
    label: "3. 钱在哪里",
    lead: "计划怎么变，你都知道钱去了哪。",
    paragraphs: [
      "计划总会变：发了奖金、车坏了、旅行取消了。Rachel 想随时调整；Suzie 担心点错一下，几个月的储蓄就没了。",
      "我把用户可能做的每一种改动都走了一遍，每次都跟着钱看它去了哪。也因此发现了自己原型里的 bug：存入超过目标所需时，多出来的钱直接消失了。",
      "所以我确保钱永远在五个地方之一：新的钱、目标里、暂停的目标里、Free to assign（存下了但还没放进任何目标）、已取出。每次改动之前，App 都会先告诉你钱要去哪。",
      "下面是我考虑过的所有情况，包括极限情况。选一种，看钱去了哪、可能出什么问题、App 怎么处理。",
    ],
    interactive: "mm-states",
    items: [
      {
        title: "暂停、结束、删除是三件事",
        paragraphs: [
          "暂停：钱留在目标里，恢复之前不要求存钱。结束：目标停下，钱进入 Free to assign，目标以「已结束」留在列表里。删除：先把钱移到 Free to assign，再删除目标。有钱的目标不会凭空消失。",
        ],
      },
      {
        title: "先看结果，再确认",
        paragraphs: [
          "存入、取出、挪动用同一个面板：先填金额，再看结果，也就是本月还差多少或目标里还剩多少，以及状态会不会变。像「怎么补回来」这样的问题，放在结果之后再问。",
        ],
      },
      {
        title: "试一试",
        interactive: "mm-live-change",
      },
    ],
  },
  {
    id: "evaluate",
    label: "测试计划",
    paragraphs: [
      "我计划做一次有主持的测试，每个决定对应一个任务。用户做任务时，我记录出错、停顿和提问；最后问一句：你觉得你的钱现在在哪？",
    ],
    tables: [EVAL_TABLE_ZH],
  },
  {
    id: "next",
    label: "接下来想看的",
    paragraphs: [
      "先把上面的测试做完。每个决定要验证的问题都很直接：改日期时，用户能在保存前猜到新的每月金额吗？月中、发薪日之前，用户能看懂 On Track 吗？取出一笔钱、再结束一个目标之后，用户能说出每笔钱去哪了吗？",
      "我也想看看用户能不能找到 Free to assign。它在首页上，但用户可能会回到刚离开的目标里去找钱。",
      "再往后，如果 MoneyMap 真的帮用户转账，会出现新的情况：转账处理中、转账失败、月底之后才到账。这些钱也需要自己的位置，比如「转账中」。",
      "我学到的：边界情况不是最后补的工作。正是跟着钱一个个走过去，才发现了 bug，也定下了这三个设计决定。",
    ],
  },
];
