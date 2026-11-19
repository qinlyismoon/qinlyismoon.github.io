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
  headers: ["Part of the design", "Task", "What I’d watch for"],
  rows: [
    ["Where the money is", "Take money out of one goal, then end another.", "Whether people can say where each amount went, and find Free to assign afterwards."],
    ["Pause, end and delete", "Stop saving for a goal for three months.", "Whether people choose Pause rather than End or Delete, and know their money is still there."],
    ["One monthly amount", "Create a goal, then move its date.", "Whether people can guess the new monthly amount before they confirm it."],
    ["Monthly progress", "Check a goal mid-month, before payday.", "Whether people read On Track correctly, and trust it."],
  ],
  caption: "A moderated, task-based study. Most tasks are about changing a plan.",
};

const EVAL_TABLE_ZH = {
  headers: ["设计部分", "任务", "我会观察什么"],
  rows: [
    ["钱在哪里", "从一个目标取钱，再结束另一个目标。", "用户能否说出每笔钱去了哪，之后能否找到 Free to assign。"],
    ["暂停、结束和删除", "先停三个月，不给某个目标存钱。", "用户会选「暂停」而不是「结束」或「删除」吗？知道钱还在吗？"],
    ["统一的每月金额", "创建一个目标，再改它的日期。", "确认前，用户能否猜到新的每月金额。"],
    ["按月看进度", "在月中、发薪日之前查看一个目标。", "用户是否正确理解 On Track，并且相信它。"],
  ],
  caption: "有主持的任务式测试，大部分任务都和改计划有关。",
};

export const MONEY_MAP_SUMMARY = [
  "MoneyMap is a personal finance app. I redesigned its savings goals, with one focus: what happens when a plan changes. I listed every change someone can make to a goal, decided where the money goes in each case, and built it all into a working prototype you can use on this page.",
];

export const MONEY_MAP_SUMMARY_ZH = [
  "MoneyMap 是一款个人理财 App。我重新设计了它的储蓄目标功能，重点只有一个：计划变了之后会发生什么。我列出了用户对一个目标能做的每一种改动，决定了每种情况下钱该去哪，并把它们都做进了一个可以操作的原型，就在这个页面里。",
];

export const MONEY_MAP_FACTS = [
  { label: "Role", lines: ["Solo product designer", "Worked with UX researchers"] },
  { label: "Background", lines: ["Erdős Institute", "UXR Bootcamp"] },
  { label: "Deliverables", lines: ["Product strategy", "Interactive prototype", "Usability test plan"] },
  { label: "Timeline", lines: ["5 weeks", "2026"] },
];

export const MONEY_MAP_FACTS_ZH = [
  { label: "角色", lines: ["唯一的产品设计师", "与 UX 研究员合作"] },
  { label: "背景", lines: ["Erdős Institute", "UXR Bootcamp"] },
  { label: "交付物", lines: ["产品策略", "可交互原型", "可用性测试计划"] },
  { label: "时间", lines: ["5 周", "2026"] },
];

// Story chapters over the sections (by section id), shared by EN + ZH.
// The weight sits on "When plans change"; the baseline is the short setup.
export const MONEY_MAP_DETAIL_CHAPTERS = [
  { id: "overview", label: "Overview", labelZh: "概述", sections: ["overview"] },
  { id: "understand", label: "Research", labelZh: "研究", sections: ["research"] },
  { id: "journey", label: "Journey", labelZh: "旅程", sections: ["journey"] },
  { id: "baseline", label: "The baseline", labelZh: "先定基准", sections: ["decision-math", "decision-time"] },
  {
    id: "change",
    label: "When plans change",
    labelZh: "计划变了",
    sections: ["change-method", "decision-money", "change-rules"],
  },
  { id: "testing", label: "Testing", labelZh: "测试", sections: ["evaluate", "next"] },
];

export const MONEY_MAP_DETAIL_SECTIONS = [
  {
    id: "overview",
    label: "The problem",
    paragraphs: [
      "Savings plans rarely go to plan. A bonus comes in, the car breaks down, a trip gets cancelled, and the goal has to change.",
      "MoneyMap’s old Goal Tracker only showed a progress bar. It didn’t say how much to save, whether you were keeping up, or what happens to your money when you change a goal. Users got confused, rarely came back, and left goals unfinished.",
      "I was the only designer on the team, working with UX researchers. They ran the research and built the personas. I turned their findings into a product strategy, designed and built a working prototype, and wrote the test plan. Most of my work went into the hardest part: what happens when a plan changes.",
    ],
  },
  {
    id: "research",
    label: "What I took from the research",
    paragraphs: [
      "The researchers built three personas, each needing something different (see the table).",
      "Two of them pull against each other. Rachel changes her plans often and wants to adjust freely. Suzie is afraid that one wrong move will undo months of saving. Letting people change plans freely while keeping their money safe and easy to follow became the focus of my design.",
      "David needs to see every goal at once. That shaped how the screens are split.",
    ],
    imagesLayout: "rail",
    images: [
      {src: "/money-map/persona-suzie.png", alt: "Persona card for Suzie, the Financial Starter"},
      {src: "/money-map/persona-david.png", alt: "Persona card for David, the Financial Organizer"},
      {src: "/money-map/persona-rachel.png", alt: "Persona card for Rachel, the Financial Optimizer"},
    ],
    tables: [PERSONA_TABLE_EN],
    closingQuote: "How might MoneyMap help users understand what their goals require, decide where to focus, and revise their plans without losing track of their progress?",
  },
  {
    id: "journey",
    label: "The saving flow",
    lead: "Walked end to end before designing any one screen.",
    paragraphs: [
      "A goal goes through six steps. The first four set up the plan. Steps five and six are where plans change, and where most of my design work went.",
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
    label: "One monthly amount",
    lead: "The number every change is measured against.",
    paragraphs: [
      "Before designing for changes, I needed something to measure them against: how much to save this month, and whether the goal is on track.",
      "The monthly amount is what’s left to save, divided by the months left. A $6,000 trip in 11 months is $545 a month. Every screen works it out the same way, so the number you see when you create a goal is the number you see later.",
    ],
    screens: [
      {src: "/money-map/journey/1-set.webp", caption: "New goal — the monthly amount shows before you create it"},
      {src: "/money-map/journey/2-month.webp", caption: "Goals · this month — what each goal still needs this month"},
      {src: "/money-map/journey/4-status.webp", caption: "Goal detail — this month’s amount, plus overall progress"},
    ],
  },
  {
    id: "decision-time",
    label: "Monthly progress",
    lead: "Checked by the month, the way pay and bills arrive.",
    paragraphs: [
      "Status is checked by the month, because money moves by the month: pay comes in monthly, and rent, card bills and subscriptions go out monthly.",
      "The app compares what you’ve saved with where the plan says you should be after the months that have already ended. A $6,000 goal over 12 months expects $500 after month one, $1,000 after month two, and so on.",
      "The 5% and 20% cut-offs below are my starting point, not research findings; the usability test checks them.",
    ],
    items: [
      {
        title: "Why 5% and 20%",
        paragraphs: [
          "The gap is how far your savings are behind the plan, as a share of the whole target. For a $6,000 goal:",
        ],
        list: [
          "Up to $300 behind (5%) → On Track. One light month, easy to make up.",
          "$300 to $1,200 behind (5–20%) → Behind. Worth noticing.",
          "More than $1,200 behind (over 20%) → At Risk. Save clearly more, or move the date.",
        ],
      },
      {
        title: "Why not check every day",
        paragraphs: [
          "The month you’re in only counts once it ends. Checking daily would punish people who save on payday, and they’d soon stop trusting the label.",
        ],
        interactive: "mm-daily",
      },
    ],
  },
  {
    id: "change-method",
    label: "Finding every change",
    lead: "List every change, then follow the money.",
    paragraphs: [
      "I listed every change someone could make to a goal after setting it up: edit the date, target or priority, add or take out money, move money between goals, pause, resume, end, or delete.",
      "For each one I asked five questions. Three about the numbers: Where does the money go? What happens to the monthly amount? Does the status change? Two about the person: Do they understand what just happened? Can they trust what the app tells them to do next? Then I pushed each action to its limit: more than is saved, more than is free, a date that has already passed, $0.",
      "This found real problems in my own prototype:",
    ],
    list: [
      "Adding more than a goal needed made the extra disappear.",
      "Lowering a target below what was saved cut off the difference.",
      "Changing a goal’s priority quietly changed its monthly amount.",
      "Delete was the only way to stop a goal, so pausing, finishing early and throwing it away all looked the same.",
    ],
  },
  {
    id: "decision-money",
    label: "Where the money is",
    lead: "You always know, even when plans change.",
    paragraphs: [
      "All of these had the same fix: money is always in one of five places, and before any change, the app shows which one it will move to.",
    ],
    interactive: "mm-places",
    items: [
      {
        title: "Every case",
        paragraphs: [
          "Below is every case I designed for, sorted into four groups. Pick one to see where the money goes, what could go wrong, and what the app does.",
        ],
        interactive: "mm-states",
      },
    ],
  },
  {
    id: "change-rules",
    label: "Rules every change follows",
    lead: "So no change is a surprise.",
    paragraphs: [
      "Across all the cases, the same three rules kept coming back.",
    ],
    items: [
      {
        title: "Show the result before you confirm",
        paragraphs: [
          "Add, Withdraw and Move use the same sheet. You enter the amount, then see the result: what’s still needed this month or what’s left in the goal, and whether the status changes. Questions like “how do you want to catch up?” come after the result, not before.",
        ],
        image: {src: "/money-map/rules/preview.webp", alt: "Add and Withdraw: the result and any status change show before the button.", caption: "Add and Withdraw: the result and any status change show before the button."},
      },
      {
        title: "Pause, end and delete are different",
        paragraphs: [
          "Pause keeps the money in the goal and asks for nothing until you resume. End stops the goal and moves its money to Free to assign; the goal stays in the list as Ended. Delete removes the goal, after moving its money to Free to assign. A goal with money in it never just disappears.",
        ],
        image: {src: "/money-map/rules/pause-end.webp", alt: "Three separate actions. Ending a goal says where its money goes before you confirm.", caption: "Three separate actions. Ending a goal says where its money goes before you confirm."},
      },
      {
        title: "Never change a number without saying why",
        paragraphs: [
          "If you change a date or target, a confirm step shows the new monthly amount, what it was before, and the difference. When money leaves a goal, a message says where it went, such as “$1,800 moved to Free to assign”.",
        ],
        image: {src: "/money-map/rules/explain.webp", alt: "Left: a date change shows the new amount, the old one and the difference. Right: a message says where an ended goal’s money went.", caption: "Left: a date change shows the new amount, the old one and the difference. Right: a message says where an ended goal’s money went."},
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
      "I planned a moderated test. Most tasks are about changing a plan, because that’s where people are most likely to lose track of their money. While people do each task, I’d note mistakes, pauses and questions. At the end I’d ask: where do you think your money is right now?",
    ],
    tables: [EVAL_TABLE_EN],
  },
  {
    id: "next",
    label: "What I’d look at next",
    paragraphs: [
      "First, run the test above. I’d especially watch whether people can find Free to assign. It’s on Home, but people might look for the money inside the goal they just left.",
      "Later, if MoneyMap moved real money, new cases would come up: transfers still processing, transfers that fail, and money that arrives after the month ends. That money would need its own place too, such as “in transfer”.",
      "What I learned: edge cases aren’t extra work at the end. Following the money through every change is what found the bugs, and what shaped the design.",
    ],
  },
];

export const MONEY_MAP_DETAIL_SECTIONS_ZH = [
  {
    id: "overview",
    label: "问题",
    paragraphs: [
      "储蓄计划很少按计划走。发了奖金、车坏了、旅行取消了，目标就得跟着改。",
      "MoneyMap 原来的目标追踪只有一条进度条：不说每月该存多少、有没有跟上，也不说改了目标之后钱去哪。用户看不懂，很少回来，目标也常常完不成。",
      "我是团队里唯一的设计师，和 UX 研究员一起合作。他们做了用户研究和人物画像；我把研究结论变成产品策略，设计并搭建了可交互原型，并写了测试计划。我把大部分精力放在最难的部分：计划变了之后会发生什么。",
    ],
  },
  {
    id: "research",
    label: "研究里带走的",
    paragraphs: [
      "研究员做了三个人物画像，每个人需要的东西不一样，见下表。",
      "其中两个人的需求是互相拉扯的。Rachel 经常改计划，想随时调整；Suzie 担心动错一下，几个月的储蓄就白费了。既让人随时改计划，又让钱安全、看得清，成了我设计的重点。",
      "David 需要一眼看到所有目标，这决定了页面怎么分。",
    ],
    imagesLayout: "rail",
    images: [
      {src: "/money-map/persona-suzie.png", alt: "Suzie（起步者）人物卡"},
      {src: "/money-map/persona-david.png", alt: "David（统筹者）人物卡"},
      {src: "/money-map/persona-rachel.png", alt: "Rachel（优化者）人物卡"},
    ],
    tables: [PERSONA_TABLE_ZH],
    closingQuote: "How might we：MoneyMap 怎样帮人看清目标需要什么、决定先顾哪里，并在改计划时仍跟得上自己的进度？",
  },
  {
    id: "journey",
    label: "储蓄流程",
    lead: "先把整个流程走一遍，再去设计单个页面。",
    paragraphs: [
      "一个目标会经过六步。前四步是把计划定下来；第五、六步是计划变了的时候，也是我大部分设计工作所在。",
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
    label: "统一的每月金额",
    lead: "所有改动都拿它来对比。",
    paragraphs: [
      "在设计「改动」之前，需要先有一个对比的基准：这个月该存多少，以及目标有没有跟上。",
      "每月金额 = 还差多少 ÷ 剩下几个月。一个 11 个月后的 $6,000 旅行，就是每月 $545。每个页面都用同一种算法，所以创建目标时看到多少，之后就是多少。",
    ],
    screens: [
      {src: "/money-map/journey/1-set.webp", caption: "新建目标——创建之前就显示每月金额"},
      {src: "/money-map/journey/2-month.webp", caption: "Goals · 本月——每个目标这个月还差多少"},
      {src: "/money-map/journey/4-status.webp", caption: "目标详情——本月金额，以及整体进度"},
    ],
  },
  {
    id: "decision-time",
    label: "按月看进度",
    lead: "和工资、账单一样，按月来算。",
    paragraphs: [
      "状态按月判断，因为钱就是按月进出的：工资按月发，房租、信用卡、订阅也按月付。",
      "App 会把你已经存下的钱，和计划在「已经结束的月份」之后应该存到的金额做比较。比如一个 12 个月存 $6,000 的目标，第一个月结束时应该有 $500，第二个月结束时 $1,000，以此类推。",
      "下面的 5% 和 20% 是我定的起点，不是研究结论，会在可用性测试里验证。",
    ],
    items: [
      {
        title: "为什么是 5% 和 20%",
        paragraphs: [
          "差距 = 已存的钱比计划落后多少，按整个目标金额来算。以 $6,000 的目标为例：",
        ],
        list: [
          "落后不超过 $300（5%）→ On Track。某个月少存一点，容易补回来。",
          "落后 $300–$1,200（5–20%）→ Behind。值得注意。",
          "落后超过 $1,200（20% 以上）→ At Risk。要明显多存，或推迟日期。",
        ],
      },
      {
        title: "为什么不按天判断",
        paragraphs: [
          "当前这个月要等它结束才算。如果按天判断，发薪日才存钱的人会一直被标成落后，很快就不会再相信这个标签了。",
        ],
        interactive: "mm-daily",
      },
    ],
  },
  {
    id: "change-method",
    label: "找出每一种改动",
    lead: "先列出所有改动，再跟着钱走一遍。",
    paragraphs: [
      "我列出了目标设好之后，用户能做的每一种改动：改日期、改金额、改优先级，存钱、取钱、在目标之间挪钱，暂停、恢复、结束、删除。",
      "对每一种，我都问五个问题。三个关于数字：钱去哪了？每月金额怎么变？状态会不会变？两个关于用户：用户明白刚刚发生了什么吗？App 给出的下一步建议值得信赖吗？然后把每个操作推到极限：取的比存的多、分配的比可用的多、日期已经过了、金额是 $0。",
      "这样找出了我自己原型里真实存在的问题：",
    ],
    list: [
      "存入超过目标所需时，多出来的钱直接消失了。",
      "把目标金额改到低于已存，差额被截掉了。",
      "改优先级时，每月金额也悄悄变了。",
      "「删除」是停下一个目标的唯一方式，所以暂停、提前结束和彻底丢掉，看起来都一样。",
    ],
  },
  {
    id: "decision-money",
    label: "钱在哪里",
    lead: "计划怎么变，你都知道钱去了哪。",
    paragraphs: [
      "这些问题有同一个解法：钱永远在五个地方之一。每次改动之前，App 都会先告诉你钱要去哪一个。",
    ],
    interactive: "mm-places",
    items: [
      {
        title: "所有情况",
        paragraphs: [
          "下面是我考虑过的所有情况，分成四组。选一种，看钱去了哪、可能出什么问题、App 怎么处理。",
        ],
        interactive: "mm-states",
      },
    ],
  },
  {
    id: "change-rules",
    label: "每次改动都遵守的规则",
    lead: "让任何改动都不意外。",
    paragraphs: [
      "把所有情况走完，有三条规则反复出现。",
    ],
    items: [
      {
        title: "先看结果，再确认",
        paragraphs: [
          "存入、取出、挪动用同一个面板：先填金额，再看结果，也就是本月还差多少或目标里还剩多少，以及状态会不会变。像「怎么补回来」这样的问题，放在结果之后再问。",
        ],
        image: {src: "/money-map/rules/preview.webp", alt: "存入和取出：结果和状态变化都显示在按钮之前。", caption: "存入和取出：结果和状态变化都显示在按钮之前。"},
      },
      {
        title: "暂停、结束、删除是三件事",
        paragraphs: [
          "暂停：钱留在目标里，恢复之前不要求存钱。结束：目标停下，钱进入 Free to assign，目标以「已结束」留在列表里。删除：先把钱移到 Free to assign，再删除目标。有钱的目标不会凭空消失。",
        ],
        image: {src: "/money-map/rules/pause-end.webp", alt: "三个独立的操作。结束目标时，确认前先说清钱会去哪。", caption: "三个独立的操作。结束目标时，确认前先说清钱会去哪。"},
      },
      {
        title: "数字变了，就说清为什么",
        paragraphs: [
          "改日期或目标金额时，保存前会先确认一次：显示新的每月金额、原来的金额，以及差了多少。钱离开一个目标时，会有一条提示告诉你它去了哪，比如「$1,800 已移到 Free to assign」。",
        ],
        image: {src: "/money-map/rules/explain.webp", alt: "左：改日期后显示新金额、原来的金额和差额。右：提示告诉你结束目标的钱去了哪。", caption: "左：改日期后显示新金额、原来的金额和差额。右：提示告诉你结束目标的钱去了哪。"},
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
      "我计划做一次有主持的测试。大部分任务都和改计划有关，因为那是用户最容易搞不清钱在哪的时候。用户做任务时，我记录出错、停顿和提问；最后问一句：你觉得你的钱现在在哪？",
    ],
    tables: [EVAL_TABLE_ZH],
  },
  {
    id: "next",
    label: "接下来想看的",
    paragraphs: [
      "先把上面的测试做完。我会特别留意用户能不能找到 Free to assign。它在首页上，但用户可能会回到刚离开的目标里去找钱。",
      "再往后，如果 MoneyMap 真的帮用户转账，会出现新的情况：转账处理中、转账失败、月底之后才到账。这些钱也需要自己的位置，比如「转账中」。",
      "我学到的：边界情况不是最后补的工作。正是跟着钱走过每一种改动，才发现了 bug，也定下了整个设计。",
    ],
  },
];
