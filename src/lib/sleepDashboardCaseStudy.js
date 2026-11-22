/**
 * Beyond Metrics — sleep dashboard A/B test (EN + ZH).
 * Rewritten from the Notion page and the project poster (Nov 2026),
 * cut around one skill: an A/B comparison of two dashboard designs.
 * Plain statements only: what was built, what was asked, what came
 * back, what changed. Phase II appears only as the response to the test.
 * Media is self-hosted under public/research-craft/sleep-dashboard/.
 */

const BASE = "/research-craft/sleep-dashboard";

export const SLEEP_SUMMARY = [
  "A research-through-design project on mobile sleep dashboards. This page covers one part of it: an A/B test of two dashboard designs, and how the result shaped the next version.",
];

export const SLEEP_SUMMARY_ZH = [
  "一个关于手机睡眠看板的设计研究项目。这一页只讲其中一段：两个看板方案的 A/B 测试，以及测试结果怎样影响了下一版设计。",
];

export const SLEEP_FACTS = [
  { label: "Role", lines: ["Designer & researcher", "Solo, faculty-advised"] },
  { label: "Method", lines: ["A/B test", "Paper prototypes + questionnaire"] },
  { label: "Participants", lines: ["8"] },
  { label: "Timeline", lines: ["Aug – Dec 2025"] },
];

export const SLEEP_FACTS_ZH = [
  { label: "角色", lines: ["设计与研究", "独立完成，教授指导"] },
  { label: "方法", lines: ["A/B 测试", "纸面原型 + 问卷"] },
  { label: "参与者", lines: ["8 人"] },
  { label: "时间", lines: ["2025 年 8 – 12 月"] },
];

// Story chapters over the sections (by section id), shared by EN + ZH.
export const SLEEP_DETAIL_CHAPTERS = [
  { id: "question", label: "Question", labelZh: "问题", sections: ["question"] },
  { id: "variants", label: "Two versions", labelZh: "两个版本", sections: ["variants"] },
  { id: "test", label: "The test", labelZh: "测试", sections: ["test-design", "results"] },
  { id: "decision", label: "Next version", labelZh: "下一版", sections: ["decision"] },
  { id: "reflection", label: "Takeaways", labelZh: "收获", sections: ["takeaways"] },
];

export const SLEEP_DETAIL_SECTIONS = [
  {
    id: "question",
    label: "The question",
    paragraphs: [
      "Most sleep apps show a night as isolated numbers. When someone wants to know why a night went well or badly, the app rarely shows what came before it — caffeine, activity, noise, light — or what followed.",
    ],
    quote: "When someone wonders why last night went badly, what should the dashboard show them first?",
  },
  {
    id: "variants",
    label: "Two versions, one variable",
    paragraphs: [
      "Both versions use the same four sections — physiological metrics, nutrition, physical activity, and environment — and the same data. Only the way the data is framed changes.",
    ],
    tables: [
      {
        headers: ["", "Version A", "Version B"],
        headerColumn: true,
        rows: [
          ["Framing", "One period, every metric expanded", "Two adjacent periods of equal length, overlaid"],
          ["Compared against", "The user’s average", "The period right before"],
          ["Amount shown", "Everything", "Less — differences first"],
        ],
      },
    ],
    items: [
      {
        title: "Version A — one period, every metric",
        paragraphs: [
          "Select a day or a week and every metric expands, each shown next to the user’s average.",
        ],
        image: {
          src: `${BASE}/version-a-wide.png`,
          alt: "Version A, one long screen shown in three columns: time asleep, sleep duration, heart rate, respiratory rate, wrist temperature, macronutrients, water and caffeine, exercise, move and steps, and environment",
          caption: "Version A, one screen split into three columns.",
        },
      },
      {
        title: "Version B — two adjacent periods",
        paragraphs: [
          "Each chart overlays the selected period (dark) on the period right before it (light): today and yesterday, this week and last week, or before and after a change.",
        ],
        image: {
          src: `${BASE}/version-b-wide.png`,
          alt: "Version B, one screen shown in two columns: sleep stages, heart rate, respiratory rate, wrist temperature, nutrients, water, coffee, steps, move, exercise, and environment, each as overlapping bars",
          caption: "Version B, one screen split into two columns.",
        },
      },
    ],
  },
  {
    id: "test-design",
    label: "Test design",
    paragraphs: [
      "Paper prototypes and a three-part questionnaire. Each of the 8 participants saw and rated both versions.",
    ],
    tables: [
      {
        headers: ["Part", "What it asked", "Why"],
        rows: [
          [
            "1. Background",
            "Age; whether they use health tracking; which data they track; how often they check it; whether they’ve thought about how behavior affects sleep",
            "To group participants by tracking habits",
          ],
          [
            "2. Rating both versions",
            "Seven items, 1–5 for each version: clarity, readability, understanding cause and effect through comparison, logical structure, prompting reflection, encouraging behavior change, wanting to keep using it",
            "To compare how easy each version is to read and how well it prompts reflection",
          ],
          [
            "3. Scenarios",
            "Use each version to explain a specific night; what other data they would want",
            "To see whether reflection goes beyond reading numbers, and what data is missing",
          ],
        ],
      },
    ],
    image: {
      src: `${BASE}/test-session.png`,
      alt: "Participants reviewing the paper prototypes at a table",
      caption: "A test session.",
    },
  },
  {
    id: "results",
    label: "Results",
    list: [
      "Preference split evenly between A and B.",
      "Participants who prefer clear metrics and overviews strongly preferred A.",
      "Some found B harder to understand.",
      "Those who preferred B said it felt more playful and closer to their own behavior, and made them think beyond the numbers.",
      "Most requested data: mood and stress (a majority), menstrual cycle, and screen time before bed. Some doubted how accurate mood and stress data could be.",
      "Some wanted to choose their own comparison periods, such as this Monday against last Monday, or the week before and after an event.",
    ],
  },
  {
    id: "decision",
    label: "What changed in the next version",
    paragraphs: [
      "With no winner, the next version kept both: B’s comparison as the default, and A’s full overview one tap away. Each change answers a finding.",
    ],
    items: [
      {
        title: "Make the comparison easier to read",
        lead: "Finding: some found B harder to understand.",
        paragraphs: [
          "The comparison period shows less detail than the selected one; more detail opens in a bottom drawer. Awake time moved out of the sleep-stage chart into its own section.",
          "For heart rate and breathing, I tried bar and circular encodings with marked start and end values, so ranges can be compared without reading every number.",
        ],
        images: [
          {
            src: `${BASE}/phase2-drawer.png`,
            alt: "Sleep stage comparison with a bottom drawer for time asleep",
            caption: "Bottom drawer for detail.",
          },
          {
            src: `${BASE}/phase2-physio.png`,
            alt: "Bar and circular encodings for heart rate and respiratory rate with reference marks",
            caption: "Encodings for physiological ranges.",
          },
        ],
      },
      {
        title: "Overview on demand",
        lead: "Finding: overview-oriented users preferred A.",
        paragraphs: [
          "Users choose which sections to show. The active section stays in color; the rest turn gray.",
        ],
        images: [
          {
            src: `${BASE}/phase2-info-1.png`,
            alt: "Sleep information page with selectable sections",
            caption: "Choose which sections to show.",
          },
          {
            src: `${BASE}/phase2-info-2.png`,
            alt: "Active section in color, other sections in gray",
            caption: "Color marks the active section.",
          },
        ],
      },
      {
        title: "Structure before numbers",
        lead: "Finding: B prompted reflection beyond the numbers.",
        paragraphs: [
          "A causal-analysis page first shows how sleep, body signals, possible causes, and outcomes connect. Values appear only when the user opens a category.",
        ],
        image: {
          src: `${BASE}/phase2-causal.png`,
          alt: "Causal analysis page with color-coded regions for sleep, physiology, causes, and outcomes",
          caption: "Causal analysis page.",
        },
      },
    ],
  },
  {
    id: "takeaways",
    label: "Takeaways",
    items: [
      {
        title: "What the test showed",
        paragraphs: [
          "How the data is framed changes how people read it. Overview-oriented users relied on structure; others got more from comparison. One fixed layout doesn’t serve both.",
        ],
      },
      {
        title: "What it can’t show",
        paragraphs: [
          "Eight participants on paper prototypes point to a direction, not a conclusion. Ratings measure how people felt about each version, not whether they read the data correctly.",
        ],
      },
      {
        title: "Next round",
        list: [
          "Alternate which version participants see first.",
          "Add tasks that check understanding, such as finding the likely cause of a given night.",
          "Test the interactive version instead of paper.",
        ],
      },
    ],
  },
];

export const SLEEP_DETAIL_SECTIONS_ZH = [
  {
    id: "question",
    label: "问题",
    paragraphs: [
      "大多数睡眠应用把一晚的睡眠呈现成孤立的数字。想知道某一晚为什么睡得好或不好时，应用很少告诉你之前发生了什么——咖啡因、运动、噪音、光线——或者之后带来了什么。",
    ],
    quote: "当一个人想知道昨晚为什么没睡好，看板最先该给他看什么？",
  },
  {
    id: "variants",
    label: "两个版本，一个变量",
    paragraphs: [
      "两个版本用同样的四个板块——生理指标、营养摄入、身体活动、环境条件——和同一份数据，只改变数据的呈现方式。",
    ],
    tables: [
      {
        headers: ["", "版本 A", "版本 B"],
        headerColumn: true,
        rows: [
          ["呈现方式", "一个时段，所有指标展开", "两段相邻的等长时段，叠在一起"],
          ["对照基准", "个人平均值", "前一个时段"],
          ["信息量", "全部", "少，先看差异"],
        ],
      },
    ],
    items: [
      {
        title: "版本 A——一个时段，所有指标",
        paragraphs: ["选一天或一周，所有指标展开，每项旁边是个人平均值。"],
        image: {
          src: `${BASE}/version-a-wide.png`,
          alt: "版本 A，一屏长图分成三栏：睡眠时长、心率、呼吸、手腕温度、营养、喝水和咖啡因、运动、步数和环境",
          caption: "版本 A，同一屏分成三栏展示。",
        },
      },
      {
        title: "版本 B——相邻两段时间",
        paragraphs: [
          "每张图把选中的时段（深色）叠在紧挨着的前一个时段（浅色）上：今天和昨天、这周和上周，或者某个变化的前后。",
        ],
        image: {
          src: `${BASE}/version-b-wide.png`,
          alt: "版本 B，一屏分成两栏：睡眠阶段、心率、呼吸、手腕温度、营养、喝水、咖啡、步数、运动和环境，都用叠放的条形表示",
          caption: "版本 B，同一屏分成两栏展示。",
        },
      },
    ],
  },
  {
    id: "test-design",
    label: "测试设计",
    paragraphs: ["纸面原型加一份三部分的问卷。8 位参与者每人都看了两个版本，并分别打分。"],
    tables: [
      {
        headers: ["部分", "问了什么", "为了什么"],
        rows: [
          [
            "1. 基本信息",
            "年龄；是否使用健康追踪；追踪哪些数据；多久看一次；是否想过行为怎样影响睡眠",
            "按追踪习惯给参与者分组",
          ],
          [
            "2. 两版评分",
            "7 项，两个版本各打 1–5 分：数据是否清楚、是否易读、能否通过对比理解因果、结构是否有逻辑、是否引导反思、是否促使调整行为、是否愿意继续用",
            "比较两版的易读程度和引发反思的效果",
          ],
          [
            "3. 情境问题",
            "用两个版本分别解释某一个具体的夜晚；还想看到哪些数据",
            "看反思能否超出读数字，以及缺了哪些数据",
          ],
        ],
      },
    ],
    image: {
      src: `${BASE}/test-session.png`,
      alt: "参与者围坐在桌边看纸面原型",
      caption: "测试现场。",
    },
  },
  {
    id: "results",
    label: "结果",
    list: [
      "偏好在 A、B 之间平分。",
      "偏好清楚指标和全貌的参与者，明显更喜欢 A。",
      "有人觉得 B 更难懂。",
      "喜欢 B 的人觉得它更有趣、更贴近自己的生活，会让他们想到数字之外的东西。",
      "最想加的数据：情绪和压力（多数人提到）、生理期、睡前屏幕时间。也有人怀疑情绪和压力数据能否准确。",
      "有人希望自己选对比的时段，比如这周一和上周一，或者某件事前后各一周。",
    ],
  },
  {
    id: "decision",
    label: "下一版改了什么",
    paragraphs: [
      "测试没有赢家，所以下一版两者都留：B 的对比作为默认视图，A 的完整全貌点一下就能展开。每处改动对应一条发现。",
    ],
    items: [
      {
        title: "让对比更好读",
        lead: "发现：有人觉得 B 更难懂。",
        paragraphs: [
          "对比时段显示的细节比选中时段少，更多细节放进底部抽屉。清醒时间从睡眠阶段图里拿出来，单独成一节。",
          "心率和呼吸试了柱状和环形两种编码，并标出起止值，不用逐个读数字也能比较区间。",
        ],
        images: [
          {
            src: `${BASE}/phase2-drawer.png`,
            alt: "睡眠阶段对比，底部抽屉展开细节",
            caption: "底部抽屉放细节。",
          },
          {
            src: `${BASE}/phase2-physio.png`,
            alt: "心率和呼吸频率的柱状与环形编码，带参照标记",
            caption: "生理区间的编码。",
          },
        ],
      },
      {
        title: "全貌按需展开",
        lead: "发现：偏好全貌的用户更喜欢 A。",
        paragraphs: ["用户自己选显示哪些板块。当前板块保留颜色，其余变灰。"],
        images: [
          {
            src: `${BASE}/phase2-info-1.png`,
            alt: "可选择板块的睡眠信息页",
            caption: "自选显示哪些板块。",
          },
          {
            src: `${BASE}/phase2-info-2.png`,
            alt: "当前板块有颜色，其余为灰色",
            caption: "颜色标出当前板块。",
          },
        ],
      },
      {
        title: "先看结构，再看数字",
        lead: "发现：B 让人想到数字之外的东西。",
        paragraphs: [
          "因果分析页先展示睡眠、身体信号、可能原因和结果之间怎样相连。用户打开某一类，才出现具体数值。",
        ],
        image: {
          src: `${BASE}/phase2-causal.png`,
          alt: "因果分析页：睡眠、生理、原因、结果四个区域用颜色区分",
          caption: "因果分析页。",
        },
      },
    ],
  },
  {
    id: "takeaways",
    label: "收获",
    items: [
      {
        title: "测试说明了什么",
        paragraphs: [
          "数据怎样呈现，会改变人怎样读它。偏好全貌的用户依赖结构，其他人从对比里得到更多。一个固定的布局满足不了两种人。",
        ],
      },
      {
        title: "说明不了什么",
        paragraphs: [
          "8 个人、纸面原型，只能指出方向，不能下结论。评分反映的是感受，不代表他们真的读对了数据。",
        ],
      },
      {
        title: "下一轮",
        list: [
          "轮换两个版本出现的先后顺序。",
          "加入检验理解的任务，比如找出某一晚的可能原因。",
          "用可交互的版本测试，而不是纸面。",
        ],
      },
    ],
  },
];
