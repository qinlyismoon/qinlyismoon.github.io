/**
 * Home bento (v3) — narrative bridges + modular shows.
 */

export const HOME_BENTO_COPY = {
  en: {
    // What I do, not a job title — reads across design, PM and
    // creative-technologist roles.
    roleLine: "From complex problems to products people can try",
    rotatingLines: [
      { id: "try", label: "Up for trying" },
      { id: "curious", label: "Curious" },
      { id: "adaptable", label: "Adaptable" },
    ],
    aboutTitle: "about",
    aboutMore: "more about me",
    aboutLead: [
      {
        t: "I make complex problems clear and actionable — then build them into something people can try.",
        strong: true,
      },
    ],
    aboutBody: [
      [
        { t: "I come from an " },
        { t: "engineering background", strong: true },
        { t: ". Currently an MFA student in " },
        { t: "Design", strong: true },
        { t: " at " },
        {
          t: "The Ohio State University",
          href: "https://design.osu.edu/",
          org: "osu",
        },
        { t: ". I " },
        {
          t: "design and build interactive products for messy problems",
          strong: true,
        },
        { t: ", and this year I’ve also been a product design intern at " },
        { t: "fAIshion", href: "https://faishion.ai/en", org: "faishion" },
        { t: "." },
      ],
      [
        {
          t: "Before that I worked in HCI research and other product internships. I also teach as a Graduate Teaching Associate — listening, taking another person’s standpoint, and figuring out how to explain.",
        },
      ],
    ],
    experienceTitle: "Experience",
    // Not shown anywhere for now. Kept for a future XR project write-up
    // on the Projects page, where the direction can be shown with work.
    xrDirection:
      "I’m also drawn to where physical and digital meet — XR interaction, and research along that edge. Spatial complexity opens a lot of interesting ground: how bodies, places, and screens talk to each other.",
    experience: [
      {
        period: "2026 —",
        role: "Product Design Intern",
        org: "fAIshion",
        icon: "/experience/faishion.png",
        href: "https://faishion.ai/en",
      },
      {
        period: "2024 — 2025",
        role: "HCI Research Assistant",
        org: "Southern University of Science and Technology",
        icon: "/experience/sustech.png",
      },
      {
        period: "2024",
        role: "Product Manager Intern",
        org: "CS Energy Technology",
        icon: "/experience/cs-energy.png",
      },
    ],
    openToWork: "Open to work",
    photoAlt: "Portrait of Phoebe Qin",
    workTitle: "digital product design",
    selectedWorkLabel: "Selected work",
    // One line under the section title — what's inside, not "selected
    // work" again.
    workBridge:
      "AI fashion flows, shared-care handoffs, money goals that stay clear when plans change, and AR on the printed page.",
    selectedWorkAll: "All projects",
    vibeBridge:
      "One thing I’ve learned building with AI: it moves fast, but not always the right way. If the product goal or the core interaction isn’t clear, a small misunderstanding turns into rounds of changes that don’t fix the problem. I don’t need everything figured out first—some things only show up once I’m building—and AI is good for trying approaches quickly. So I stay clear on what I’m trying to achieve, flexible on how: test what it builds, question it, and adjust as I learn.",
    teachingBridge:
      "Teaching changed how I see my own process. When I explain an idea, I have to show the reasoning — what I’d do, and why. Working with students taught me to listen, adjust feedback, and leave room to experiment.",
    teachingNote:
      "Presentation as Thinking · Experiential Media · Design Foundations",
    statusBridge:
      "Based in Columbus, Ohio — open to relocating. Born and raised in Chongqing, China.",
    chongqingLabel: "Chongqing, China",
    allProjects: "all projects",
    furinLabel: "Onomichi Furin",
    furinCta: "Make a wish",
    deskLabel: "desk",
    deskTitle: "Phoebe’s Desk",
    teachingLabel: "teaching",
    teachingMore: "more",
    vibeFolderLabel: "playground",
    vibeFolderAll: "all 2",
    hobbiesLabel: "away from the screen",
    hobbies: [
      {
        id: "photography",
        title: "Photography",
        note: "A discovering eye on nature",
        sticker: "/hobbies/photography.jpg",
        tilt: -6,
      },
      {
        id: "swimming",
        title: "Swimming",
        note: "Building shape and strength",
        sticker: "/hobbies/swimming.jpg",
        tilt: 4,
      },
      {
        id: "hiking",
        title: "Hiking",
        note: "Time outdoors",
        sticker: "/hobbies/hiking.png",
        tilt: -3,
      },
      {
        id: "yoga",
        title: "Yoga",
        note: "Stretching, and focusing on myself",
        sticker: "/hobbies/yoga.jpg",
        tilt: 5,
      },
    ],
    statusLabel: "Local status",
    clockLabel: "local time",
    weatherLabel: "weather",
    highShort: "H",
    lowShort: "L",
  },
  zh: {
    roleLine: "从复杂的问题，到别人能上手的产品",
    rotatingLines: [
      { id: "try", label: "爱试新东西" },
      { id: "curious", label: "强好奇心" },
      { id: "adaptable", label: "适应能力强" },
    ],
    aboutTitle: "关于",
    aboutMore: "了解更多",
    aboutLead: [
      {
        t: "让复杂变得清晰、可行动，再做成别人能上手试的东西。",
        strong: true,
      },
    ],
    aboutBody: [
      [
        { t: "我是" },
        { t: "工程背景", strong: true },
        { t: "。目前在俄亥俄州立大学" },
        {
          t: "设计系",
          href: "https://design.osu.edu/",
          org: "osu",
          strong: true,
        },
        { t: "读 MFA。" },
        {
          t: "做交互产品，对付乱七八糟的真问题",
          strong: true,
        },
        { t: "；今年也在 " },
        { t: "fAIshion", href: "https://faishion.ai/en", org: "faishion" },
        { t: " 做产品设计实习。" },
      ],
      [
        {
          t: "以前做过 HCI 研究和产品实习，现在也当研究生助教——学会听、换位想，也学会怎么讲清楚。",
        },
      ],
    ],
    experienceTitle: "经历",
    xrDirection:
      "我也对物理与数字交界的交互感兴趣，做过一些 XR 交互和研究。空间一复杂，就多出很多有趣的地带——身体、场所和屏幕怎样互相说话。",
    experience: [
      {
        period: "2026 —",
        role: "产品设计实习生",
        org: "fAIshion",
        icon: "/experience/faishion.png",
        href: "https://faishion.ai/en",
      },
      {
        period: "2024 — 2025",
        role: "HCI 研究助理",
        org: "南方科技大学",
        icon: "/experience/sustech.png",
      },
      {
        period: "2024",
        role: "产品经理实习生",
        org: "CS Energy Technology",
        icon: "/experience/cs-energy.png",
      },
    ],
    openToWork: "在找机会",
    photoAlt: "Phoebe Qin 的肖像",
    workTitle: "数字产品设计",
    selectedWorkLabel: "精选作品",
    workBridge:
      "AI 时尚流程、共享照料交接、计划一变仍能看懂的存钱目标，还有落在纸页上的 AR。",
    selectedWorkAll: "全部作品",
    vibeBridge:
      "和 AI 一起做，我学到一件事：它能跑得很快，但不一定跑对方向。产品目标和核心交互不清楚，一个小误解就会变成好几轮改来改去、却没真正解决问题。我也并不觉得一切都要事先想完——有些边界和交互，只有动手做了才看得清；AI 很适合快速试几种做法。所以我对要达成什么保持清楚，对怎么走到那里保持灵活：测它做出来的东西，多问一句，再跟着学到的往前调。",
    teachingBridge:
      "教学改了我对自己过程的看法。要把想法讲清楚，就得把理由摊开——怎么做、为什么。和学生一起，我更会听、会改反馈，也更敢留一点试错的空。",
    teachingNote: "Presentation as Thinking · 体验媒体 · 设计基础",
    statusBridge:
      "住在哥伦布，也愿意搬。重庆出生、长大。",
    chongqingLabel: "重庆",
    allProjects: "全部作品",
    furinLabel: "尾道风铃",
    furinCta: "许个愿",
    deskLabel: "工作台",
    deskTitle: "Phoebe 的工作台",
    teachingLabel: "教学",
    teachingMore: "更多",
    vibeFolderLabel: "playground",
    vibeFolderAll: "全部 2",
    hobbiesLabel: "离开屏幕之后",
    hobbies: [
      {
        id: "photography",
        title: "摄影",
        note: "发现的眼睛，记录我观察到的自然",
        sticker: "/hobbies/photography.jpg",
        tilt: -6,
      },
      {
        id: "swimming",
        title: "游泳",
        note: "塑形，也练强度",
        sticker: "/hobbies/swimming.jpg",
        tilt: 4,
      },
      {
        id: "hiking",
        title: "徒步",
        note: "出去走走",
        sticker: "/hobbies/hiking.png",
        tilt: -3,
      },
      {
        id: "yoga",
        title: "瑜伽",
        note: "拉伸身体，专注在自己身上",
        sticker: "/hobbies/yoga.jpg",
        tilt: 5,
      },
    ],
    statusLabel: "本地状态",
    clockLabel: "本地时间",
    weatherLabel: "天气",
    highShort: "高",
    lowShort: "低",
  },
};

export function getHomeBentoCopy(language) {
  return HOME_BENTO_COPY[language] ?? HOME_BENTO_COPY.en;
}
