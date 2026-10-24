/**
 * Money Map native case-study body (EN + ZH).
 * From the Notion case study (Erdős Institute UXR Bootcamp):
 * personas → HMW → three design priorities → prototype clips → usability plan.
 */

const PERSONA_TABLE_EN = {
  headers: ["Research input", "Need I carried into the design"],
  rows: [
    [
      "Suzie, the Financial Starter — knows her target and deadline, but needs help calculating contributions and whether she is keeping up.",
      "Guidance that turns a goal into an understandable commitment.",
    ],
    [
      "David, the Financial Organizer — manages several goals and needs to compare them without opening screen after screen.",
      "An overview that supports organizing and reviewing multiple commitments.",
    ],
    [
      "Rachel, the Financial Optimizer — checks calculations and adjusts plans when circumstances change.",
      "Access to supporting information and control over the plan.",
    ],
  ],
  caption: "Three personas from the team’s research, and the need each one carried into my design.",
};

const PERSONA_TABLE_ZH = {
  headers: ["研究输入", "我带进设计的需求"],
  rows: [
    [
      "Suzie（起步者）——知道目标和期限，但需要帮忙算每月该存多少、自己有没有跟上。",
      "把目标变成能看懂的承诺。",
    ],
    [
      "David（统筹者）——同时管好几个目标，需要一眼比较，而不用反复进出不同页面。",
      "能组织和回看多项承诺的总览。",
    ],
    [
      "Rachel（优化者）——会核对计算，情况变了就会改计划。",
      "能看到依据，也能自己改计划。",
    ],
  ],
  caption: "团队研究里的三个人物，以及各自带进我设计的需求。",
};

const EVAL_TABLE_EN = {
  headers: ["Design priority", "Representative task", "What I would evaluate"],
  rows: [
    [
      "Guide planning",
      "Create a goal with a target amount and deadline.",
      "Whether users understand the resulting monthly requirement.",
    ],
    [
      "Make next steps clear",
      "Review the dashboard and record a contribution toward a selected goal.",
      "Whether users interpret the savings information and find the relevant action.",
    ],
    [
      "Support customization",
      "Change a goal’s priority and revise its target date.",
      "Whether users distinguish organizational changes from changes to the savings plan.",
    ],
    [
      "Preserve clarity after changes",
      "Review the updated requirement and check a previous contribution.",
      "Whether users understand the recalculation and can verify retained savings.",
    ],
  ],
  caption: "Proposed moderated, task-based usability study aligned to the three priorities.",
};

const EVAL_TABLE_ZH = {
  headers: ["设计重点", "代表任务", "我会看什么"],
  rows: [
    [
      "引导规划",
      "用目标金额和截止日期创建一个目标。",
      "用户是否理解算出来的每月要求。",
    ],
    [
      "说清下一步",
      "看仪表盘，并向某个目标记一笔存款。",
      "用户是否读得懂储蓄信息，并找到对应操作。",
    ],
    [
      "支持自定义",
      "改目标优先级，并改截止日期。",
      "用户是否分得清「组织方式」的改动和「储蓄计划」的改动。",
    ],
    [
      "改完之后仍清楚",
      "看更新后的要求，并核对一笔已有存款。",
      "用户是否理解重算，并能确认已存金额还在。",
    ],
  ],
  caption: "按三个设计重点拟定的、有主持的任务式可用性测试。",
};

export const MONEY_MAP_DETAIL_SECTIONS = [
  {
    id: "challenge",
    label: "The challenge",
    paragraphs: [
      "The brief described a personal finance app whose Goal Tracker let people set goals and watch progress. It named confusion, low engagement, and unfinished goals — but left the underlying usability problems open.",
      "My work was to turn the team’s research into design decisions: what support different people needed, how that should shape the experience, and how we would evaluate the redesign.",
    ],
  },
  {
    id: "research",
    label: "What I took from the research",
    paragraphs: [
      "The team’s personas described three different relationships with financial planning. Teammates built the personas; I carried their needs into product strategy and interface decisions.",
      "Those needs pulled in two directions: clear guidance for people who want a plan, and room to inspect and adjust for people who want control.",
    ],
    images: [
      {
        src: "/money-map/persona-suzie.png",
        alt: "Persona card for Suzie, the Financial Starter",
      },
      {
        src: "/money-map/persona-david.png",
        alt: "Persona card for David, the Financial Organizer",
      },
      {
        src: "/money-map/persona-rachel.png",
        alt: "Persona card for Rachel, the Financial Optimizer",
      },
    ],
    tables: [PERSONA_TABLE_EN],
    closingQuote:
      "How might MoneyMap help users understand what their goals require, decide where to focus, and revise their plans without losing track of their progress?",
  },
  {
    id: "strategy",
    label: "Design strategy",
    paragraphs: [
      "I translated the persona needs into three priorities:",
    ],
    list: [
      "Guide planning — help people see what a target and deadline require, with less manual calculation.",
      "Make next steps clear — connect savings info to what’s still needed and what they can do next.",
      "Support customization — let people set priorities and revise amounts or timelines while keeping what’s already saved.",
    ],
  },
  {
    id: "guide",
    label: "1. Guide from a target to a plan",
    paragraphs: [
      "Suzie knew what she wanted to save and by when. She needed help seeing what that goal asked of her — the gap between setting a target and having a plan.",
    ],
    items: [
      {
        title: "Design decision",
        split: true,
        paragraphs: [
          "Goal creation connects target amount and completion date to a calculated monthly savings requirement. The system does the math so the commitment is visible — a concrete starting point for the plan.",
        ],
        video: {
          src: "/money-map/01-create-goal.mp4",
          aspect: "portrait",
          title: "Creating a goal and seeing the monthly requirement",
          caption: "Enter a target and date; MoneyMap shows the monthly amount needed.",
        },
      },
    ],
  },
  {
    id: "next-steps",
    label: "2. Make the next savings step clear",
    paragraphs: [
      "Suzie needed to know whether she was keeping up. David needed an overview of several commitments. When people return to MoneyMap, how does the experience show where they stand and what to do next?",
    ],
    items: [
      {
        title: "Organize the dashboard around the month",
        split: true,
        paragraphs: [
          "A monthly view brings goals with different amounts and deadlines into one shared frame: this month’s savings commitment. Cards extend that view to each active goal. I emphasized what’s still remaining so people can see what the month still asks of them — then open a goal to contribute.",
        ],
        video: {
          src: "/money-map/02-dashboard.mp4",
          aspect: "portrait",
          title: "Monthly dashboard overview",
          caption: "Monthly target, saved, and remaining — with per-goal cards.",
        },
      },
      {
        title: "Give progress a planning context",
        split: true,
        paragraphs: [
          "A completion percentage says how much is saved. Whether that’s enough depends on the timeline. The redesign pairs progress with Ahead, On Track, or Behind — so people can read their position before they contribute or revisit the plan.",
        ],
        video: {
          src: "/money-map/03-progress-status.mp4",
          aspect: "portrait",
          title: "Progress with Ahead / On Track / Behind",
          caption: "Progress plus status labels for planning context.",
        },
      },
      {
        title: "Connect information to an action",
        split: true,
        paragraphs: [
          "The goal detail view puts Add Contribution next to the savings numbers — a path from reviewing the commitment to recording a deposit. When the commitment itself needs to change, editing controls stay reachable.",
        ],
        video: {
          src: "/money-map/04-add-contribution.mp4",
          aspect: "portrait",
          title: "Add contribution from goal detail",
          caption: "From review to recording a contribution in one place.",
        },
      },
    ],
  },
  {
    id: "customize",
    label: "3. Let users shape and revise plans",
    paragraphs: [
      "David needed to organize competing goals. Rachel needed to revise a plan and understand the math. Both called for flexibility — in how goals are ordered, and in how a single plan changes over time.",
    ],
    items: [
      {
        title: "Priorities are user-defined",
        split: true,
        paragraphs: [
          "High, Medium, and Low priority with priority-based sorting. People say which goals matter most, and that order is still there when they come back.",
        ],
        video: {
          src: "/money-map/05-priority.mp4",
          aspect: "portrait",
          title: "Setting goal priority",
          caption: "Priority controls for organizing competing goals.",
        },
      },
      {
        title: "Recalculate after changes",
        split: true,
        paragraphs: [
          "People can revise the target amount or completion date. The experience recalculates the savings requirement while keeping what’s already saved. The feedback that matters: what changed, what the new requirement is, and that earlier deposits still count. Changing priority reorganizes; changing amount or date rewrites the plan.",
        ],
        video: {
          src: "/money-map/06-revise-plan.mp4",
          aspect: "portrait",
          title: "Revising a goal and seeing the new requirement",
          caption: "Edit target or date; the monthly requirement updates, savings stay.",
        },
      },
    ],
  },
  {
    id: "evaluate",
    label: "Usability testing plan",
    paragraphs: [
      "I drafted a moderated, task-based study around the three priorities. Participants would complete realistic tasks while thinking aloud. I’d watch completion, errors, hesitation, and asks for help — then ask about understanding and confidence.",
    ],
    tables: [EVAL_TABLE_EN],
  },
];

export const MONEY_MAP_DETAIL_SECTIONS_ZH = [
  {
    id: "challenge",
    label: "挑战",
    paragraphs: [
      "简报描述的是一款个人理财应用：目标追踪器让人设定目标、盯进度。它点出了困惑、参与度低、目标完不成——但底下的可用性问题留给我们去查。",
      "我的工作是把团队的研究收成设计决定：不同的人需要怎样的支持、体验该怎么长、以及怎么评估这次改版。",
    ],
  },
  {
    id: "research",
    label: "我从研究里带走的",
    paragraphs: [
      "团队的人物画像写了三种和理财规划的关系。画像是队友做的；我把其中的需求带进产品策略和界面决定。",
      "这些需求往两边拉：既要给想要计划的人清楚引导，也要给想核对、想调整的人留出空间。",
    ],
    images: [
      {
        src: "/money-map/persona-suzie.png",
        alt: "Suzie（起步者）人物卡",
      },
      {
        src: "/money-map/persona-david.png",
        alt: "David（统筹者）人物卡",
      },
      {
        src: "/money-map/persona-rachel.png",
        alt: "Rachel（优化者）人物卡",
      },
    ],
    tables: [PERSONA_TABLE_ZH],
    closingQuote:
      "How might we：MoneyMap 怎样帮人看清目标需要什么、决定先顾哪里，并在改计划时仍跟得上自己的进度？",
  },
  {
    id: "strategy",
    label: "设计策略",
    paragraphs: ["我把人物需求收成三个重点："],
    list: [
      "引导规划 — 少靠手算，让人看清目标和期限分别要求什么。",
      "说清下一步 — 把已存信息接到「还差多少」和「现在能做什么」。",
      "支持自定义 — 能排优先级、改金额或时间，同时保住已经存下的。",
    ],
  },
  {
    id: "guide",
    label: "1. 从目标走到计划",
    paragraphs: [
      "Suzie 知道要存多少、什么时候要存到。她缺的是：这个目标对她意味着每月多少——设定目标和真正有计划之间的空档。",
    ],
    items: [
      {
        title: "设计决定",
        split: true,
        paragraphs: [
          "创建目标时，把目标金额和完成日接到算好的每月储蓄要求。系统来算，承诺看得见——计划有一个具体的起点。",
        ],
        video: {
          src: "/money-map/01-create-goal.mp4",
          aspect: "portrait",
          title: "创建目标并看到每月要求",
          caption: "输入目标和日期；MoneyMap 给出每月需要存的金额。",
        },
      },
    ],
  },
  {
    id: "next-steps",
    label: "2. 说清下一步存什么",
    paragraphs: [
      "Suzie 要知道自己有没有跟上。David 要一眼看好几项承诺。人回到 MoneyMap 时，体验怎样告诉他们站在哪、下一步做什么？",
    ],
    items: [
      {
        title: "仪表盘按「这个月」组织",
        split: true,
        paragraphs: [
          "月视图把金额、期限各不相同的目标放进同一时间框：这个月的储蓄承诺。卡片把同一视角落到每个进行中的目标。我强调「还剩多少」，好让人看见这个月还欠什么——再点进目标去存。",
        ],
        video: {
          src: "/money-map/02-dashboard.mp4",
          aspect: "portrait",
          title: "月度仪表盘总览",
          caption: "本月目标、已存、剩余，以及各目标卡片。",
        },
      },
      {
        title: "给进度一个规划语境",
        split: true,
        paragraphs: [
          "完成百分比说明存了多少。够不够，还得看时间线。改版把进度和 Ahead / On Track / Behind 放在一起——先读懂自己站在哪，再决定存一笔还是改计划。",
        ],
        video: {
          src: "/money-map/03-progress-status.mp4",
          aspect: "portrait",
          title: "进度与状态标签",
          caption: "进度加上状态，方便判断。",
        },
      },
      {
        title: "信息和操作接在一起",
        split: true,
        paragraphs: [
          "目标详情里，Add Contribution 就在储蓄数字旁边——从回看承诺到记下存款是一条路。若要改承诺本身，编辑入口也在手边。",
        ],
        video: {
          src: "/money-map/04-add-contribution.mp4",
          aspect: "portrait",
          title: "在目标详情记一笔存款",
          caption: "回看和记账在同一处。",
        },
      },
    ],
  },
  {
    id: "customize",
    label: "3. 让人能改、能排计划",
    paragraphs: [
      "David 要把互相抢时间的目标排清楚。Rachel 要改计划、也要懂账怎么算。两边都要灵活——目标怎么排，以及单个计划怎么随情况变。",
    ],
    items: [
      {
        title: "优先级由用户定",
        split: true,
        paragraphs: [
          "高 / 中 / 低优先级，并按优先级排序。人说清哪些目标更要紧，下次回来顺序还在。",
        ],
        video: {
          src: "/money-map/05-priority.mp4",
          aspect: "portrait",
          title: "设置目标优先级",
          caption: "用优先级整理互相竞争的目标。",
        },
      },
      {
        title: "改完就重算",
        split: true,
        paragraphs: [
          "可以改目标金额或完成日。体验会重算储蓄要求，同时保住已经存下的。关键反馈是：改了什么、新的每月要求是多少、以前的存款还算数。改优先级动的是组织；改金额或日期动的是计划本身。",
        ],
        video: {
          src: "/money-map/06-revise-plan.mp4",
          aspect: "portrait",
          title: "修改目标并看到新要求",
          caption: "改目标或日期；每月要求更新，已存保留。",
        },
      },
    ],
  },
  {
    id: "evaluate",
    label: "可用性测试计划",
    paragraphs: [
      "我按三个重点草拟了一场有主持的任务式研究。参与者边想边说地完成真实任务。我会看完成度、错误、犹豫和求助——再问理解和把握。",
    ],
    tables: [EVAL_TABLE_ZH],
  },
];
