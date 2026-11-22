/**
 * Emotion Garden native case-study body (EN + ZH).
 * 01 How it works (usage guide + live flower lab)
 * 02 Why so many versions (AI iteration loop + version log)
 *    — ends with one worked example of checking AI (the evidence rule)
 * 03 Reflection (AI as reviewer + what I learned)
 * Widgets live in components/caseStudies/emotiongarden.
 */

export const EMOTION_GARDEN_SUMMARY = [
  "Emotion Garden turns your feelings over time into a garden — a week, a month, a season, or everything you've recorded. Each moment you record grows one flower whose shape, colour and posture hold what you felt, where you were and what you did about it. I designed and built it with AI over 135+ versions; this page shows how to read it, why it took that many turns, and what they fixed.",
];

export const EMOTION_GARDEN_SUMMARY_ZH = [
  "Emotion Garden 把一段时间的情绪变成一座花园——一周、一个月、一个季度，或者全部记录。你记录的每个时刻长成一朵花，它的形状、颜色和姿态记下了你当时的感受、在哪里、做了什么。我和 AI 一起设计、搭建，迭代了 135 个以上的版本；这一页先讲怎么读它，再讲为什么迭代了这么多次、解决了什么。",
];

export const EMOTION_GARDEN_FACTS = [
  { label: "Role", lines: ["Designer & engineer, solo", "Directing AI as builder"] },
  { label: "Context", lines: ["Thesis: emotional personal informatics"] },
  { label: "Tools", lines: ["Claude", "ChatGPT", "Cursor", "p5.js studies", "Vercel"] },
  { label: "Output", lines: ["Live web prototype", "135+ versions, logged"] },
];

export const EMOTION_GARDEN_FACTS_ZH = [
  { label: "角色", lines: ["设计 & 工程，独立完成", "指挥 AI 搭建"] },
  { label: "背景", lines: ["论文：情绪个人信息学"] },
  { label: "工具", lines: ["Claude", "ChatGPT", "Cursor", "p5.js 草图", "Vercel"] },
  { label: "产出", lines: ["可用的网页原型", "135+ 个版本，有完整记录"] },
];

export const EMOTION_GARDEN_DETAIL_CHAPTERS = [
  {
    id: "how",
    label: "How it works",
    labelZh: "怎么用",
    sections: ["what", "plant", "read", "garden"],
  },
  {
    id: "why",
    label: "Why so many versions",
    labelZh: "为什么迭代这么多次",
    sections: ["problem", "loop", "log", "evidence"],
  },
  { id: "reflect", label: "Reflection", labelZh: "反思", sections: ["review", "learned"] },
];

const REVIEW_EN = {
  headers: ["Gap the review found", "My fix"],
  rows: [
    [
      "“What you lived most” listed only blends; single feelings were missing.",
      "It now covers both, each in its own colour (v75).",
    ],
    [
      "Each row capped at 12 knots — a limit with no reason behind it.",
      "One knot per moment, up to 40, stacked by day (v75–77).",
    ],
    [
      "The plant flow asked for “a line to remember it by” — the same words as step one.",
      "Removed: your first words are the note (v35).",
    ],
    [
      "Leisure vs personal time couldn't be told apart, and errands had nowhere to go.",
      "Six places with no “other”; old data migrates on load (v135).",
    ],
  ],
  caption: "AI found where the logic had holes. Deciding how to close each one stayed with me.",
};

const REVIEW_ZH = {
  headers: ["评审发现的漏洞", "我的解决方法"],
  rows: [
    ["「最常经历」只列了复合情绪，单一情绪被漏掉了。", "改为两者都覆盖，各用自己的颜色（v75）。"],
    ["每行最多 12 个结——这个上限没有任何理由。", "一个时刻一个结，最多 40 个，同一天的叠起来（v75–77）。"],
    ["记录流程要求「留一句话记住它」——和第一步写的是同一件事。", "删掉：第一步写下的话就是笔记（v35）。"],
    ["「休闲」和「个人时间」分不清，跑腿办事没地方放。", "合并为六个场景，不设「其他」，旧数据加载时自动迁移（v135）。"],
  ],
  caption: "AI 负责找出逻辑哪里有洞；每个洞怎么补，由我来决定。",
};

const EVIDENCE_EN = {
  headerColumn: true,
  headers: ["Condition", "Why", "Based on"],
  rows: [
    [
      "Still above half after allowing for luck (Wilson 95% lower bound > 50%)",
      "Small runs of luck don't count. With every try going well it takes at least 4 tries; with one miss, 7 of 8.",
      "Wilson (1927); Brown, Cai & DasGupta (2001), who recommend the Wilson interval over the textbook Wald interval for small samples",
    ],
    [
      "Tried on at least 3 different days",
      "Several tries in one afternoon are one episode. An effect has to show up at separate points in time.",
      "What Works Clearinghouse single-case design standards (Kratochwill et al., 2010)",
    ],
    [
      "Better than doing nothing",
      "Strong feelings ease on their own (regression to the mean), so an action is compared with how often feelings eased with no action.",
      "Barnett, van der Pols & Dobson (2005)",
    ],
  ],
  caption: "The rule behind every “this helped” in the garden: the What helped panel, the flower sheet, and the suggestion while planting.",
};

const EVIDENCE_ZH = {
  headerColumn: true,
  headers: ["条件", "为什么", "依据"],
  rows: [
    [
      "算上运气仍然过半（Wilson 95% 置信区间下界 > 50%）",
      "排除小样本里的好运气。全部成功也至少要 4 次；有一次没帮上，要 8 次里 7 次。",
      "Wilson (1927)；Brown, Cai & DasGupta (2001)：小样本时应使用 Wilson 区间，而不是教科书里的 Wald 区间",
    ],
    [
      "至少在 3 个不同的日子试过",
      "同一个下午试几次只算一次。效果要在不同时间点重复出现。",
      "What Works Clearinghouse 单案例设计标准（Kratochwill et al., 2010）",
    ],
    [
      "比什么都不做更好",
      "强烈的情绪本来就会自己回落（均值回归），所以要和「什么都没做」时的缓解比例比较。",
      "Barnett, van der Pols & Dobson (2005)",
    ],
  ],
  caption: "花园里每一句「有帮助」都由这条规则决定：「什么有帮助」面板、花的信息卡，以及记录时的建议。",
};

export const EMOTION_GARDEN_DETAIL_SECTIONS = [
  // ── 01 How it works ─────────────────────────────────────────
  {
    id: "what",
    label: "A garden, not a chart",
    lead: "One flower per moment. Any stretch of time becomes a place you can walk through.",
    paragraphs: [
      "Most mood trackers turn feelings into a line chart: easy to log, hard to read back, and rarely worth opening twice. Emotion Garden lays the same records out as a garden. Time runs left to right, and you choose how much of it to see: a week, a month, a season, or all of it — or drag the window to any stretch of days. Each part of life — work, relationships, daily errands, your body, your own time, the wider world — has its own bed. The sky above is the period's weather: clear for joy and trust, rain for sadness, mist for fear, wind for anger.",
      "Everything stays on your device. There is no account; you can download a copy, restore it, or clear the garden at any time.",
    ],
  },
  {
    id: "plant",
    label: "Planting a moment",
    lead: "Five short steps, starting from your own words.",
    list: [
      "Words — write what happened, in English or Chinese. The garden reads them as you type, on your device, and suggests the feelings and place it understood.",
      "Feeling — pick up to three on the wheel, and drag to reorder: the first becomes the outer petals. Then where it happened.",
      "When — the day, a from–until time (that gives the duration), and how stirred up your body was.",
      "Action — what you did about it, if anything, and whether it helped. The garden suggests what has helped you before.",
      "Plant — review it as the flower's own sheet, then plant it.",
    ],
    listOrdered: true,
  },
  {
    id: "read",
    label: "Reading a flower",
    lead: "Every part of the plant is one field of the record. Try it.",
    paragraphs: [
      "This uses the garden's own encoding, drawn live by a pocket version of its generator.",
    ],
    interactive: "eg-flower",
  },
  {
    id: "garden",
    label: "Reading the garden",
    lead: "Three views answer three questions.",
    list: [
      "How did these days feel? — the weather sentence and the feelings-over-time ridgeline. Drag across it to look closer at a stretch of days; the whole page follows.",
      "What did I live most? — each feeling or blend with a knot for every time it came, the hours it took, and a pattern: where, when, how your body felt, and the words you kept using.",
      "What helped? — each action against how often feelings eased on their own. Only actions that clear an honest evidence bar are shown as steady.",
    ],
  },

  // ── 02 Why so many versions ─────────────────────────────────
  {
    id: "problem",
    label: "The problem",
    lead: "Emotional records are easy to write and hard to read back.",
    paragraphs: [
      "This started in my thesis on emotional personal informatics. Logging a feeling takes seconds, but the record rarely tells you anything new: a chart you decode once and never open again. And with feelings, a wrong reading isn't neutral. A view that makes joy look like failure, or a lucky streak look like a cure, does harm.",
      "So the bar was not “does it work” but “does it say only true things, and is it worth coming back to?” Getting there meant many small corrections — exactly the kind of work AI makes cheap.",
    ],
    quote: "What would it take for an emotional record to feel readable — and worth coming back to?",
  },
  {
    id: "loop",
    label: "How I iterate with AI",
    lead: "AI builds each version. I decide what it should say, check it, and keep the memory.",
    paragraphs: [
      "Each version went round the same loop. AI made building cheap enough that I could test every idea in the real, working garden instead of in mockups — so most of my time went to the steps AI can't own: defining the problem, catching misreadings, and verifying claims against their sources.",
    ],
    interactive: "eg-loop",
  },
  {
    id: "log",
    label: "135 versions, one log",
    lead: "Why so many? Because each one answered one specific thing I saw going wrong.",
    paragraphs: [
      "The numbers aren't polish passes. Each version is a decision, written down with what was kept, what was removed, and why. A surprising share of the turns took something away.",
    ],
    interactive: "eg-versions",
  },

  {
    id: "evidence",
    label: "Checking AI: one example",
    lead: "An AI draft would have told someone “breathing works for you” after 6 good tries out of 7. Checked against the research, that's too early to say.",
    paragraphs: [
      "Two things can make an action look like it helped when it didn't: with only a few tries, a good result can be luck; and strong feelings ease on their own, even when you do nothing. So before the garden says something helped, it has to rule out both.",
      "The AI draft used the right rule but got the numbers wrong: it said 6 of 7 and 8 of 10 would pass. I recomputed both — each has a lower bound of 49%, so neither passes. In that case the garden now says “too few tries to tell yet”. And even when an action passes, the wording stays honest: “you felt lighter after breathing”, never “breathing made you lighter”.",
    ],
    tables: [EVIDENCE_EN],
  },

  // ── 04 Reflection ───────────────────────────────────────────
  {
    id: "review",
    label: "AI as a second reviewer",
    lead: "Besides building, AI read the whole system back to me and pointed out what was missing.",
    paragraphs: [
      "Every few versions I asked AI for a critique pass over the whole garden: where does the logic contradict itself, what case isn't covered, what is arbitrary? It's good at finding holes across a system too big to hold in my head at once. It wasn't the one to decide the fix — that needed knowing what the garden is for.",
    ],
    tables: [REVIEW_EN],
  },
  {
    id: "learned",
    label: "What I learned",
    lead: "With AI, versions are cheap. Judgment is the expensive part.",
    list: [
      "Give AI a problem and a rule, not a direction. A brief it can build well names what's wrong and what must not change.",
      "Look for misreadings, not bugs. The useful question in every review was: what would this make someone believe about their own feelings?",
      "Verify anything with a number or a citation. AI's statistics were close but not right, and close isn't good enough for a claim about someone's wellbeing.",
    ],
    items: [
      {
        title: "Next",
        paragraphs: ["Put the garden in front of other people's real weeks, and see which readings still go wrong."],
      },
    ],
  },
];

export const EMOTION_GARDEN_DETAIL_SECTIONS_ZH = [
  {
    id: "what",
    label: "一座花园，而不是一张图表",
    lead: "每个时刻一朵花。任何一段时间，都变成一个可以走进去的地方。",
    paragraphs: [
      "大多数情绪记录工具把感受画成折线图：记得快，读不懂，很少值得打开第二次。Emotion Garden 把同样的记录铺成一座花园。时间从左到右，看多长由你决定：一周、一个月、一个季度或全部，也可以拖动窗口看任意几天；生活的每个部分——工作学习、人际关系、日常琐事、身体、自己的时间、更大的世界——各有一排苗圃。上方的天空是这段时间的天气：喜悦和信任是晴天，悲伤是雨，恐惧是雾，愤怒是风。",
      "所有数据只存在你的设备上。不需要账号；随时可以下载备份、恢复，或清空花园。",
    ],
  },
  {
    id: "plant",
    label: "种下一个时刻",
    lead: "五个简短的步骤，从你自己的话开始。",
    list: [
      "文字——写下发生了什么，中英文都可以。花园边打字边在本地读取，并提示它理解到的感受和地点。",
      "感受——在情绪轮上选最多三种，拖动调整顺序：第一个会成为外圈花瓣。然后选在哪里发生。",
      "时间——哪一天、从几点到几点（由此得出时长），以及身体当时有多躁动。",
      "应对——你做了什么（如果有），以及有没有帮助。花园会提示以前对你有帮助的做法。",
      "种下——以这朵花自己的信息卡形式确认，然后种下。",
    ],
    listOrdered: true,
  },
  {
    id: "read",
    label: "读一朵花",
    lead: "植物的每个部分对应记录里的一个字段。试试看。",
    paragraphs: ["这里用的就是花园本身的编码规则，由一个精简版的生成器实时画出。"],
    interactive: "eg-flower",
  },
  {
    id: "garden",
    label: "读整座花园",
    lead: "三个视图，回答三个问题。",
    list: [
      "这些天感觉怎么样？——天气描述和「感受随时间」的山脊图。在图上拖动可以放大某几天，整页会跟着变。",
      "我最常经历的是什么？——每种感受或复合情绪：每出现一次就是一个结，占了多少小时，以及它的规律：在哪、什么时候、身体状态、你反复用到的词。",
      "什么有帮助？——每种应对方式，对比感受自己消退的比例。只有过了诚实的证据门槛，才会显示为「稳定」。",
    ],
  },
  {
    id: "problem",
    label: "问题",
    lead: "情绪记录写起来容易，读回来很难。",
    paragraphs: [
      "这个项目来自我关于情绪个人信息学的论文。记录一种感受只要几秒，但记录本身很少告诉你新东西：一张解读一次就再也不打开的图表。而且对情绪来说，读错不是中性的。一个让开心看起来像失败、让一次好运看起来像疗法的视图，是有伤害的。",
      "所以标准不是「能不能用」，而是「它是不是只说真话、值不值得再回来看」。做到这一点需要大量小修正——正好是 AI 让成本变低的那种工作。",
    ],
    quote: "怎样让一份情绪记录读得懂，也值得再回来看？",
  },
  {
    id: "loop",
    label: "我怎么和 AI 一起迭代",
    lead: "AI 搭建每一版。我决定它该说什么、核对它，并且保存记忆。",
    paragraphs: [
      "每个版本都走同一个循环。AI 让搭建便宜到我可以在真实、能用的花园里测试每个想法，而不是在线框图里——所以我的时间大多花在 AI 替代不了的步骤上：定义问题、发现误读、对照来源核实。",
    ],
    interactive: "eg-loop",
  },
  {
    id: "log",
    label: "135 个版本，一份记录",
    lead: "为什么这么多？因为每一版都在回应一个我看到的具体问题。",
    paragraphs: [
      "这些编号不是打磨次数。每个版本都是一个决定，记录了留下什么、删掉什么、为什么。其中相当一部分转折，是在做减法。",
    ],
    interactive: "eg-versions",
  },
  {
    id: "evidence",
    label: "核对 AI：一个例子",
    lead: "AI 的草稿在 7 次里 6 次有帮助时，就会告诉用户「呼吸对你有效」。对照研究核对后，这个结论下得太早了。",
    paragraphs: [
      "有两种情况会让一个做法看起来有帮助、其实没有：次数少的时候，好结果可能只是运气；而强烈的情绪本来就会自己消退，什么都不做也会好一些。所以花园在说「有帮助」之前，要先排除这两种可能。",
      "AI 的草稿用的规则是对的，但算错了：它说 7 次中 6 次、10 次中 8 次可以通过。我重算之后，两者的下界都只有 49%，都不通过。现在遇到这种情况，花园会显示「次数太少，还看不出来」。即使通过了，措辞也只说「做完呼吸后你感觉轻松了」，而不是「呼吸让你轻松了」。",
    ],
    tables: [EVIDENCE_ZH],
  },
  {
    id: "review",
    label: "AI 作为第二位评审",
    lead: "除了搭建，AI 还会把整个系统读一遍，告诉我哪里有遗漏。",
    paragraphs: [
      "每隔几个版本，我会让 AI 对整座花园做一次评审：哪里的逻辑自相矛盾，哪种情况没覆盖到，哪里是随意定的？一个系统大到没法同时装在脑子里时，它很擅长找洞。但怎么补不由它决定——那需要知道这座花园是为了什么。",
    ],
    tables: [REVIEW_ZH],
  },
  {
    id: "learned",
    label: "我学到的",
    lead: "有了 AI，版本很便宜。判断才是贵的部分。",
    list: [
      "给 AI 一个问题和一条规则，而不是一个方向。好的需求会说清楚哪里不对、什么不能变。",
      "找误读，而不是找 bug。每次评审最有用的问题是：这会让人对自己的情绪相信什么？",
      "任何带数字或引用的东西都要核实。AI 的统计接近但不对，而关于一个人身心状态的结论，「接近」不够。",
    ],
    items: [
      {
        title: "下一步",
        paragraphs: ["把花园放进别人真实的一周里，看看哪些读法还会出错。"],
      },
    ],
  },
];
