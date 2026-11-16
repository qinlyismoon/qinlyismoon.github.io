const HOME_COPY = {
  en: {
    name: "Longyue Qin",
    nameEn: "Phoebe",
    role: "Design Engineer & Product Designer",
    statement:
      "I design and build interactive products for messy problems.",
    detail:
      "I take a tangled problem to a working prototype — figure out what matters, shape how it behaves, and build it in code so other people can try it.",
    akaLabel: "My Chinese name",
    chineseName: "秦珑月",
    nameCardAria: "Name meaning of 秦珑月",
    exploreTitle: "Explore",
    caseStudies: "Case Studies",
    caseStudiesDescription: "My design work and technical explorations.",
    opensNotion: "Opens Notion",
    desk: "Desk",
    deskDescription: "An interactive workspace.",
    versionHistory: "Log",
    versionHistoryDescription: "How my thinking has evolved.",
    statusTitle: "Status",
    basedIn: "Columbus, Ohio",
    weather: "22°C · Sunny",
    availability: "Open to opportunities",
    disciplines: ["Design", "Research", "Design Engineering"],
    contactTitle: "Contact",
    contactHeading: "Got a question, an idea, or a messy system to untangle?",
    contactBody: "I’m open to product design, design engineering, and research-led work.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    editorialThreadNote: "Everything connects.",
    peelCornerLabel: "Open Phoebe's Desk",
  },
  zh: {
    name: "Longyue Qin",
    nameEn: "Phoebe",
    role: "设计工程师 & 产品设计师",
    statement: "我做交互产品，对付乱七八糟的真问题。",
    detail:
      "把一团乱的问题做到能跑的原型：先弄清什么要紧，再设计它怎么动，最后用代码做成别人能上手试的东西。",
    akaLabel: "我的中文名",
    chineseName: "秦珑月",
    nameCardAria: "秦珑月的姓名释义",
    exploreTitle: "探索",
    caseStudies: "作品",
    caseStudiesDescription: "设计作品和技术探索。",
    opensNotion: "在 Notion 打开",
    desk: "工作台",
    deskDescription: "可交互的工作台。",
    // Chinese nav term for "Log" pending the user's approval —
    // keep the English word rather than inventing a translation.
    versionHistory: "Log",
    versionHistoryDescription: "想法怎么一步步变过来的。",
    statusTitle: "状态",
    basedIn: "哥伦布，俄亥俄",
    weather: "22°C · 晴",
    availability: "在找机会",
    disciplines: ["设计", "研究", "设计工程"],
    contactTitle: "联系",
    contactHeading: "有问题、有想法，或有一团乱要理，欢迎来聊。",
    contactBody: "产品设计、设计工程、研究向的合作都可以。",
    email: "邮箱",
    github: "GitHub",
    linkedin: "LinkedIn",
    editorialThreadNote: "都连着。",
    peelCornerLabel: "打开 Phoebe 的工作台",
  },
};

const NAV_COPY = {
  en: {
    home: "Home",
    caseStudies: "Projects",
    desk: "Desk",
    about: "About",
    teaching: "Teaching",
    ariaLabel: "Site navigation",
  },
  zh: {
    home: "首页",
    caseStudies: "作品",
    desk: "工作台",
    about: "关于",
    // Chinese label is a draft pending Phoebe's approval.
    teaching: "教学",
    ariaLabel: "网站导航",
  },
};

const ABOUT_COPY = {
  en: {
    title: "About",
    placeholder: "Content coming soon.",
  },
  zh: {
    title: "关于",
    placeholder: "稍后更新。",
  },
};

const WORKSPACE_COPY = {
  en: {
    closeLabel: "Close Phoebe's Desk",
    sceneLabel: "Phoebe's Desk — interactive creative workspace",
    objects: {
      books: "MFA Thesis Research",
      monitor: "Portfolio",
      lamp: "Desk Lamp",
      lampTurnOff: "Turn Off Lamp",
      lampTurnOn: "Turn On Lamp",
      clock: "Timeline",
      clockAria: "Wall clock, local time",
      camera: "Photography",
      musicPlay: "Play",
      musicPause: "Pause",
      musicAria: "Desk speaker, play or pause music",
      mugAria: "Matcha latte",
      plantAria: "Trailing plant on shelf",
      plantAriaMaxed: "Trailing plant (fully grown, no more watering)",
      boardAria: "Open interactive inspiration board",
      timelineAria: "Open design journey timeline",
      boardLabel: "Inspiration Board",
      timelineLabel: "Design Journey",
      windowAria: "Window, nature sounds on hover",
    },
  },
  zh: {
    closeLabel: "关闭 Phoebe's Desk",
    sceneLabel: "Phoebe 的工作台 — 可以互动的创作空间",
    objects: {
      books: "艺术硕士论文",
      monitor: "作品集",
      lamp: "台灯",
      lampTurnOff: "关闭台灯",
      lampTurnOn: "打开台灯",
      clock: "历程",
      clockAria: "挂钟，本地时间",
      camera: "摄影",
      musicPlay: "播放",
      musicPause: "暂停",
      musicAria: "桌面音箱，播放或暂停音乐",
      mugAria: "抹茶拿铁",
      plantAria: "搁板上的垂吊绿植",
      plantAriaMaxed: "搁板上的绿植（已经长满了，不用再浇）",
      boardAria: "打开互动剪贴板",
      timelineAria: "打开设计旅程",
      boardLabel: "灵感剪贴板",
      timelineLabel: "设计旅程",
      windowAria: "窗户，悬停可听自然声",
    },
  },
};

/** Plant hover tooltip — one language at a time. */
export const PLANT_TOOLTIP_CONTENT = {
  en: ["Click to water it.", "Watch it grow a little each time."],
  zh: ["点一下给它浇水。", "浇一次，它就长高一点。"],
};

export const PLANT_TOOLTIP_MAX_CONTENT = {
  en: ["It’s fully grown.", "No more watering needed."],
  zh: ["它已经长满了。", "不用再浇啦。"],
};

export function getPlantTooltipCopy(language, { isMaxed = false } = {}) {
  const content = isMaxed ? PLANT_TOOLTIP_MAX_CONTENT : PLANT_TOOLTIP_CONTENT;
  return content[language] ?? content.en;
}

/** Mug hover tooltip — one language at a time, keyed like other copy. */
export const MUG_TOOLTIP_CONTENT = {
  en: ["My favorite drink is Matcha Latte.", "Would you like to try one?"],
  zh: ["我最爱喝抹茶拿铁。", "你也想尝尝吗？"],
};

export function getMugTooltipCopy(language) {
  return MUG_TOOLTIP_CONTENT[language] ?? MUG_TOOLTIP_CONTENT.en;
}

export function getHomeCopy(language) {
  return HOME_COPY[language] ?? HOME_COPY.en;
}

export function getWorkspaceCopy(language) {
  return WORKSPACE_COPY[language] ?? WORKSPACE_COPY.en;
}

export function getNavCopy(language) {
  return NAV_COPY[language] ?? NAV_COPY.en;
}

export function getAboutCopy(language) {
  return ABOUT_COPY[language] ?? ABOUT_COPY.en;
}
