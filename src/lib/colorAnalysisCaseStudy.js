/**
 * Color Analysis native case-study body (EN + ZH).
 * Internship at fAIshion (AI fashion / stylist app, chat-first).
 * Paused after a strategy change; the consumer app is unreleased, so the
 * page carries screenshots only — no deploy links.
 *
 * Header facts + summary live on the project (caseStudies.js), in the
 * fixed header slot before chapter 01.
 *
 * Media in /public/work/color-analysis/:
 *   cover.jpg      — card + hero
 *   screens/*.jpg  — individual app screens, captured from the local build
 *                    with the AI-generated sample face (no real person).
 *                    The browser blocked the camera, so drape screens show
 *                    the photo fallback; on a phone the face is the live
 *                    front camera.
 */

const S = "/work/color-analysis/screens/";
const scr = (file, caption, alt) => ({ src: `${S}${file}.jpg`, caption, alt: alt ?? caption });

export const COLOR_ANALYSIS_FACTS = [
  { label: "Role", lines: ["Product Designer (Intern) at fAIshion", "Feature lead, 0 → 1"] },
  {
    label: "Worked with",
    lines: ["2 product managers", "1 full-stack engineer", "1 color analysis expert"],
  },
  { label: "Timeline", lines: ["Aug – Sep 2026"] },
  { label: "Status", lines: ["Framework complete", "Paused after a strategy change"] },
];

export const COLOR_ANALYSIS_FACTS_ZH = [
  { label: "角色", lines: ["fAIshion 产品设计师（实习）", "功能负责人，0 → 1"] },
  { label: "合作", lines: ["2 位产品经理", "1 位全栈工程师", "1 位色彩测试专家"] },
  { label: "时间", lines: ["2026 年 8 – 9 月"] },
  { label: "状态", lines: ["已完成整体框架搭建", "因公司战略调整暂停"] },
];

export const COLOR_ANALYSIS_SUMMARY = [
  "During my product design internship at fAIshion, an AI fashion stylist startup, I led the design of an in-app color analysis. It finds which of the 12 season types a person is. Users get the clothes, makeup, and hair colors that suit them; for the product, the result gives the app’s AI stylist and its recommendation feed a clearer picture of each user.",
  "I took it from the first framework to working builds: the overall flow, how the AI and the user share each decision, the drape test, and how the test fits into the agent chat.",
];

export const COLOR_ANALYSIS_SUMMARY_ZH = [
  "在 fAIshion（AI 时尚造型师）的产品设计实习里，我主导设计了应用内的色彩测试，找出用户属于 12 季型中的哪一型。用户通过测试得到真正适合自己的衣服、妆容和发色；从产品角度，测试结果让应用的 AI 造型师和推荐流更了解每一位用户。",
  "我从最初的框架一直做到可运行的版本：整体流程、AI 和用户在每个判断上的分工、色布测试，以及测试如何放进 agent 对话里。",
];

export const COLOR_ANALYSIS_DETAIL_CHAPTERS = [
  { id: "challenge", label: "Challenge", labelZh: "挑战", sections: ["challenge"] },
  {
    id: "design",
    label: "Design & decisions",
    labelZh: "设计与决策",
    sections: ["ai-role", "flow", "guidance", "details", "drapes", "drape-final", "report"],
  },
  { id: "process", label: "Process", labelZh: "过程", sections: ["role", "reflection", "next"] },
];

export const COLOR_ANALYSIS_DETAIL_SECTIONS = [
  {
    id: "challenge",
    label: "From expert to phone",
    lead: "What changes when an in-person expert session moves onto a phone.",
    paragraphs: [
      "In person, color analysis takes a long time. An expert holds drape after drape under your face and judges four attributes by eye: temperature (warm or cool), value (light or deep), saturation, and clarity (clear or muted). The combination of the four decides the season.",
      "Digitizing it meant solving three things:",
    ],
    list: [
      "No expert in the room. The app has to tell people how to take a usable photo, and what to look at when they compare colors.",
      "Too many drapes. An expert tries dozens; a phone flow needs to get there with far fewer comparisons.",
      "A chat-first product. The app is built around conversations with an AI stylist, so the test has to live inside that chat.",
    ],
    closingQuote:
      "How might we digitize an expert color analysis so it stays credible, takes minutes, and breaks the result down into something people understand and can act on?",
  },
  {
    id: "ai-role",
    label: "AI vs. user",
    lead: "Deciding what AI does, and what the user does.",
    listOrdered: true,
    paragraphs: [
      "Many color analysis apps take one selfie and return a season directly. I decided against that for two reasons. Accuracy: lighting, white balance, camera processing, and makeup all shift how the model reads temperature or clarity — a direct answer hides that uncertainty. Trust: a season with no visible path to it is hard to believe or dress by.",
      "So the split is: AI does what it can do reliably and that saves effort; the user keeps the judgments that need to be seen to be believed. I mapped this in FigJam before building:",
    ],
    image: {
      src: "/work/color-analysis/framework.jpg",
      alt: "FigJam board: Color Analysis Feature Logic, with AI steps on top (quality check, pre-filled details, nominated color type, test groups), user input below (guided photo, confirm or revise details, drape comparisons), and the season type as output",
      caption: "My framework in FigJam: what AI does (top), what the user does (bottom), and how they meet in one season type.",
    },
    list: [
      "Check the photo: AI checks quality first, so a bad photo never reaches the analysis.",
      "Read natural features: AI pre-fills hair color, eye color, and skin depth from the photo; the user confirms or corrects each one.",
      "Compare drapes: the user decides each pair; AI can suggest which side looks better, and the user still chooses.",
      "Reach the season: each attribute narrows the seasons in front of the user, so the result comes with its reasons.",
    ],
  },
  {
    id: "flow",
    label: "Chat vs. task",
    lead: "Separating the conversation from the task.",
    paragraphs: [
      "The interface has three clear layers. The conversation is where the AI stylist explains the purpose, keeps track of progress, and sums up each step. Task cards sit inside the conversation and hold short inputs, such as confirming details. Tasks that need the whole screen — the camera and the drape test — open full-screen from their card and return to the conversation when done.",
    ],
    screens: [
      scr("01-entry", "Entry on the profile"),
      scr("02-chat-start", "The AI stylist explains what you get"),
      scr("03-photo-card", "Each step arrives as a task card"),
      scr("15-hub", "Progress through the four attributes"),
      scr("34-chat-done", "The chat hands off to the report"),
      scr("35-profile-writeback", "The result is saved to the profile"),
    ],
  },
  {
    id: "guidance",
    label: "Photo guidance",
    lead: "In the order people can act on it.",
    paragraphs: [
      "Guidance runs from setting to person: light, then clothing, then makeup and colored contacts. Light first so people can decide whether to start at all; the hardest step waits until they are ready to shoot.",
      "Early versions asked for a front photo plus two 45° sides. After checking with the model what it actually needed, one clear front photo was enough for a first read — so the flow keeps a single framed shot.",
    ],
    screens: [
      scr("04-guide1", "1. Soft window light"),
      scr("05-guide2", "2. A light, neutral top"),
      scr("06-guide3", "3. No makeup or colored contacts"),
      scr("07-camera", "One front photo, framed by an outline"),
      scr("08-review", "Review before using the photo"),
    ],
  },
  {
    id: "details",
    label: "Natural features",
    lead: "Confirming them first narrows the direction.",
    paragraphs: [
      "Natural hair color, eye color, and skin depth point toward a few likely seasons, so confirming them first cuts drape comparisons.",
      "AI pre-fills those three from the photo; the user confirms each on visual options, since dye, contacts, and lighting can shift them. Density is different: tests got volume right but strand thickness wrong, and when I asked the model how confident it was at reading thickness, that confidence was low — so density is left for the user. Everything lands on one review card.",
    ],
    screens: [
      scr("09-analyzing", "The photo is analyzed in the chat"),
      scr("10-hair", "Hair color, pre-filled from the photo"),
      scr("11-eye", "Eye color, pre-filled from the photo"),
      scr("12-skin", "Skin depth, pre-filled from the photo"),
      scr("13-density", "Hair density, chosen by the user"),
      scr("14-details-review", "One card to review and edit"),
    ],
  },
  {
    id: "drapes",
    label: "The drape test",
    lead: "From a still image to a live camera.",
    paragraphs: [
      "This step went through the most versions. Each one tried to get closer to sitting in front of a real drape: first a color block beside a cut-out face, then color filling the frame around the photo, then a full screen with a where-to-look guide and swatch buttons. I also tried a generated portrait with the drape color swapped in, and a drape-colored light laid over the photo. All of these were still pictures of a face.",
    ],
    screensLayout: "fit",
    screens: [
      scr("evo-1-cutout", "V1 · A color block beside a cut-out face; tap a swatch"),
      scr("evo-2-fullframe", "V2 · Color fills the frame around the photo"),
      scr("evo-3-guide-buttons", "V3 · Full screen with a guide and swatch buttons"),
      scr("19-drape-r2", "Final · Live camera, full-screen color, swipe to switch"),
    ],
  },
  {
    id: "drape-final",
    label: "The final drape",
    lead: "Full-screen color, one attribute at a time.",
    listOrdered: true,
    paragraphs: [
      "The final version uses the live front camera. The face sits in the same outline as the photo step; the rest of the screen fills with the drape color so its light falls on the face the way fabric reflects in a real session. Controls stay light and semi-transparent so they barely tint that light; swipe switches the two colors.",
      "Before each attribute, a short guide shows where to look — under-eye shadows, fine lines, how even the skin looks. When people still hesitated between two drapes, AI was meant to hint beside the choice while the user decides; the prototype has an early version of that.",
      "Each attribute now ends with its own result and the seasons still possible. That helps on three levels:",
    ],
    list: [
      "Users: they can see their progress, and how each choice moves them toward a season.",
      "Logic: it matches how the 12-season decision tree decides — one attribute at a time, dropping the seasons that no longer fit.",
      "Engineering: each attribute is a self-contained step with its own state, easier to build and test, and the flow can end early once one season is left.",
    ],
    screens: [
      scr("16-look-guide", "Where to look before comparing"),
      scr("17-drape-a", "The drape color fills the screen"),
      scr("18-drape-b-ai", "Swipe to compare; an early AI hint"),
      scr("21-temp-done", "Warm: Spring or Autumn left"),
      scr("23-value-done", "High value: only Spring left"),
      scr("25-sat-done", "Bright Spring — the user can stop here"),
    ],
  },
  {
    id: "report",
    label: "The color report",
    lead: "A clear answer, then what to wear.",
    paragraphs: [
      "The report gives one season, then explains it through the four attributes and the details it used. Makeup and hair previews are interactive — pick a shade, see it applied — so people can try the result on themselves.",
    ],
    screens: [
      scr("29-report-profile", "The four attributes and the details used"),
      scr("30-report-palette", "Squares: recommended colors"),
      scr("32-report-makeup", "Pick a shade, the preview changes"),
      scr("33-report-hair", "Circles: hair shades to try"),
      scr("31-report-accessories", "Metals and bags for the season"),
    ],
  },
  {
    id: "role",
    label: "My role",
    list: [
      "Built the framework: the overall flow, the order of the attributes, and which steps stay in the chat and which open full screen.",
      "Worked with the color expert on the decision points, the drape colors, and the report.",
      "Aligned with the PMs on positioning and on how the result feeds recommendations.",
      "Worked out with the full-stack engineer how photo analysis and the live drape connect to the APIs, and explored where AI holds up so we could draw the line between model output and what the user enters.",
      "Built each version as a working prototype with Cursor and Claude Code, so reviews happened on a real flow.",
    ],
  },
  {
    id: "reflection",
    label: "What I took from it",
    listOrdered: true,
    paragraphs: [
      "The framework was complete and the flow worked end to end. The feature was then paused before launch after a change in company strategy. Three things I would carry into future work:",
    ],
    list: [
      "Turn expert judgment into steps people can complete alone: each step should be something the user understands and can carry out accurately, in an order they can actually follow.",
      "Know where the model’s limits are. Test what it can and can’t judge before deciding its role: what it reads reliably can be pre-filled; anything lighting, dye, or contacts can shift goes to the user to confirm.",
      "Make the layers of the interface clear. The conversation explains and keeps track of progress; task cards hold short inputs and confirmations; full-screen windows take over for tasks that need the whole screen, then hand back to the chat.",
    ],
  },
  {
    id: "next",
    label: "If the work continued",
    listOrdered: true,
    paragraphs: [
      "Two things would come next:",
    ],
    list: [
      "Test the whole flow with users: whether each step is clear, where people hesitate or get confused, and whether they understand the result.",
      "Test accuracy: run the same people through an in-person session with an expert and through this flow, and compare where the results differ.",
    ],
  },
];

export const COLOR_ANALYSIS_DETAIL_SECTIONS_ZH = [
  {
    id: "challenge",
    label: "从专家到手机",
    lead: "把一次线下专家测试搬到手机上，会变什么。",
    paragraphs: [
      "线下的色彩测试很花时间。专家把一块块色布放到你脸下，凭眼睛判断四个属性：冷暖、明度、彩度和清浊。这四个属性的组合决定季型。",
      "把它数字化，需要解决三件事：",
    ],
    list: [
      "没有专家在旁边。应用要告诉用户怎么拍出能用的照片，比较颜色时该看哪里。",
      "色布太多。专家会试几十块；手机上的流程要用少得多的对比得到结果。",
      "以对话为主的产品。应用围绕和 AI 造型师的对话来设计，测试也要放进这个对话里。",
    ],
    closingQuote: "怎样把专家级的色彩测试数字化，让它可信、几分钟完成，并把结果拆解成用户看得懂、能用上的信息？",
  },
  {
    id: "ai-role",
    label: "AI 与用户的分工",
    lead: "决定 AI 做什么，用户做什么。",
    listOrdered: true,
    paragraphs: [
      "很多色彩测试应用是一张自拍直接出季型。我没有采用这种方式，原因有两个。一是准确性：光线、白平衡、相机处理和妆容都会让模型对冷暖、清浊的判断偏移，直接给答案会把不确定藏起来。二是信任：只拿到一个季型、看不到路径，很难相信它、按它去穿。",
      "所以分工是：AI 做它能可靠完成、又能省力的部分；需要被看见才能被相信的判断，交给用户。动手前先在 FigJam 里把这个分工画了出来：",
    ],
    image: {
      src: "/work/color-analysis/framework.jpg",
      alt: "FigJam 白板：Color Analysis Feature Logic。上方是 AI 的步骤（质量检测、预填个人信息、推测季型、测试分组），下方是用户的操作（引导拍照、确认或修改信息、色布对比），右侧输出季型",
      caption: "我在 FigJam 里画的框架：上方是 AI 做的事，下方是用户做的事，最后汇合成一个季型。",
    },
    list: [
      "检查照片：AI 先检测照片质量，不合格的照片不会进入分析。",
      "读取原生特征：AI 根据照片预填发色、瞳色和肤色深浅，用户逐项确认或修改。",
      "对比色布：每一组都由用户判断；AI 可以建议哪一边更好看，最终仍由用户选择。",
      "得出季型：每个属性都在用户眼前缩小季型范围，结果出来时也带着理由。",
    ],
  },
  {
    id: "flow",
    label: "对话与任务",
    lead: "把对话层和任务层分开。",
    paragraphs: [
      "界面分成三个清楚的层级。对话层是 AI 造型师说明目的、推进进度、总结每一步的地方；任务卡片在对话里，承载简短的输入，比如确认个人信息；需要整个屏幕的任务——拍照和色布测试——从卡片打开全屏界面，完成后回到对话。",
    ],
    screens: [
      scr("01-entry", "从个人主页进入"),
      scr("02-chat-start", "AI 造型师说明你能得到什么"),
      scr("03-photo-card", "每一步以任务卡片出现"),
      scr("15-hub", "四个属性的进度"),
      scr("34-chat-done", "对话把用户交给报告"),
      scr("35-profile-writeback", "结果保存到个人主页"),
    ],
  },
  {
    id: "guidance",
    label: "拍照指引",
    lead: "按用户能做到的顺序排列。",
    paragraphs: [
      "指引从环境到个人：光线、穿着，再到卸妆和取下美瞳。先确认光线，用户可以决定现在要不要开始；最费事的一步留到真正准备拍照时。",
      "早期版本要求正脸加两张 45 度侧脸。向模型确认它实际需要什么之后，一张清晰正脸就够做初步判断——所以流程只保留一张带轮廓线的正脸照。",
    ],
    screens: [
      scr("04-guide1", "1. 柔和的窗边光"),
      scr("05-guide2", "2. 浅色素色上衣"),
      scr("06-guide3", "3. 卸妆，取下美瞳"),
      scr("07-camera", "一张正脸照，用轮廓线辅助构图"),
      scr("08-review", "确认后再使用照片"),
    ],
  },
  {
    id: "details",
    label: "原生特征",
    lead: "先确认它们，缩小方向。",
    paragraphs: [
      "原生发色、瞳色和肤色深浅能指向几个更可能的季型，先确认它们，色布对比就会更少。",
      "这三项由 AI 根据照片预填，用户在可视化选项上确认——染发、美瞳和光线都可能让它们偏移。发量不一样：测试里发量对、发丝粗细会错，而且问过模型对粗细的可信度，本身就偏低，所以改为用户填写。最后汇总在一张核对卡片上。",
    ],
    screens: [
      scr("09-analyzing", "在对话里分析照片"),
      scr("10-hair", "发色：根据照片预填"),
      scr("11-eye", "瞳色：根据照片预填"),
      scr("12-skin", "肤色深浅：根据照片预填"),
      scr("13-density", "发量：用户选择"),
      scr("14-details-review", "一张卡片核对和修改"),
    ],
  },
  {
    id: "drapes",
    label: "色布测试",
    lead: "从静态图片到实时相机。",
    paragraphs: [
      "这一步迭代的版本最多，每一版都想更接近真的坐在色布前：最早是抠出的脸旁边一块颜色，然后让颜色铺满照片周围，再到整屏界面加上观察指引和色块按钮。我也试过根据用户照片生成人像再换成色布色，以及在照片上叠加和色布同色的光。这些看到的都还是一张静态的脸。",
    ],
    screensLayout: "fit",
    screens: [
      scr("evo-1-cutout", "V1 · 抠出的脸旁边一块颜色，点击色块选择"),
      scr("evo-2-fullframe", "V2 · 颜色铺满照片周围"),
      scr("evo-3-guide-buttons", "V3 · 整屏界面，加上指引和色块按钮"),
      scr("19-drape-r2", "最终版 · 实时相机，整屏铺满颜色，左右滑动切换"),
    ],
  },
  {
    id: "drape-final",
    label: "最终的色布",
    lead: "整屏颜色，一次测一个属性。",
    listOrdered: true,
    paragraphs: [
      "最终版用实时前置相机：脸落在和拍照时一样的轮廓里，其余屏幕铺满色布色，光会照到脸上，就像线下布料把颜色反射到脸上一样。控件保持偏淡、半透明，尽量不染那层光；左右滑切换两种颜色。",
      "每个属性开始前有简短指引——黑眼圈、细纹、肤色是否均匀。若两块色布仍难判断，AI 会在选择旁给出提示，最终仍由用户决定；原型里有这个早期版本。",
      "现在每个属性测完就给出结果，并告诉用户还剩哪些季型。这样做有三方面的好处：",
    ],
    list: [
      "对用户：能看到进度，也明白每次选择怎样一步步接近自己的季型。",
      "对判断逻辑：和 12 季型决策树的实际判断方式一致——一次一个属性，排除不再符合的季型。",
      "对工程：每个属性是一个独立的步骤，状态清楚，更容易实现和测试；只剩一个季型时也能提前结束。",
    ],
    screens: [
      scr("16-look-guide", "对比前先看哪里"),
      scr("17-drape-a", "色布颜色铺满屏幕"),
      scr("18-drape-b-ai", "滑动对比；早期的 AI 建议"),
      scr("21-temp-done", "暖：剩下春或秋"),
      scr("23-value-done", "高明度：只剩春"),
      scr("25-sat-done", "Bright Spring，可以提前结束"),
    ],
  },
  {
    id: "report",
    label: "色彩测试结果",
    lead: "明确的答案，然后告诉你怎么穿。",
    paragraphs: [
      "报告给出一个季型，再通过四个属性和用到的个人信息解释它。妆容和发色预览可交互——选一个色号就能看到上妆效果——用户可以直接把结果试在自己身上。",
    ],
    screens: [
      scr("29-report-profile", "四个属性与用到的个人信息"),
      scr("30-report-palette", "方形：推荐的颜色"),
      scr("32-report-makeup", "选择色号，预览随之变化"),
      scr("33-report-hair", "圆形：可以试的发色"),
      scr("31-report-accessories", "这个季型的金属与包"),
    ],
  },
  {
    id: "role",
    label: "我的角色",
    list: [
      "搭建框架：整体流程、属性的顺序，以及哪些步骤留在对话里、哪些打开全屏界面。",
      "和色彩专家一起确定判断点、色布颜色和报告内容。",
      "和产品经理对齐功能定位，以及结果怎样服务推荐。",
      "和全栈工程师一起确定照片分析和实时色布怎样接入 API，并一起探索 AI 实现的边界，从而划清模型输出与用户填写的界线。",
      "用 Cursor 和 Claude Code 把每一版做成可运行的原型，评审都在真实流程上进行。",
    ],
  },
  {
    id: "reflection",
    label: "我的收获",
    listOrdered: true,
    paragraphs: [
      "整体框架已经完成，流程可以从头走到尾。之后因为公司战略调整，这个功能在上线前暂停了。有三点我会带到之后的工作里：",
    ],
    list: [
      "把专家的判断拆成用户自己能完成的步骤：每一步都要让用户看得懂、能准确地做到，并按用户能做到的顺序排列。",
      "了解模型的边界在哪里。先测试它能可靠判断什么、不能判断什么，再决定它的角色：能准确读出的就预填；会被光线、染发、美瞳影响的，交给用户确认。",
      "明确界面的不同层级：对话负责说明和推进进度；任务卡片承载简短的输入和确认；需要整个屏幕的任务交给全屏窗口，完成后再回到对话。",
    ],
  },
  {
    id: "next",
    label: "如果继续做",
    listOrdered: true,
    paragraphs: [
      "接下来会做两件事：",
    ],
    list: [
      "测试整体流程：每一步用户是否看得懂，在哪里会犹豫或困惑，能否理解最后的结果。",
      "测试准确性：让同一批人分别做线下专家测试和这个流程，对比结果在哪里不一致。",
    ],
  },
];
