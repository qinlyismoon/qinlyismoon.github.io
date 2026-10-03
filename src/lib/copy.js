const HOME_COPY = {
  en: {
    name: "Phoebe Qin",
    role: "Design Engineer & Product Designer",
    statement:
      "I design and build thoughtful systems where product thinking, interaction, and code come together.",
    detail:
      "I’m interested in the space between a promising idea and a credible product: framing the right problem, making the system legible, and prototyping until the experience feels clear, useful, and human.",
    akaLabel: "Also known as:",
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
    contactHeading: "Have a question, an idea, or a messy system to untangle?",
    contactBody: "I’m open to product design, design engineering, and research-led collaborations.",
    email: "Email",
    github: "GitHub",
    linkedin: "LinkedIn",
    editorialThreadNote: "Everything connects.",
    peelCornerLabel: "Open Phoebe's Desk",
  },
  zh: {
    name: "Phoebe Qin",
    role: "设计工程师 & 产品设计师",
    statement: "我设计并构建有思考的系统，让产品思维、交互与代码在其中相遇。",
    detail: "我关注一个有潜力的想法如何变成可信的产品：找到真正的问题，让系统清晰可读，并通过原型不断验证，直到体验变得清楚、实用，也有人情味。",
    akaLabel: "也叫：",
    chineseName: "秦珑月",
    nameCardAria: "秦珑月的姓名释义",
    exploreTitle: "探索",
    caseStudies: "案例研究",
    caseStudiesDescription: "我的设计工作与技术探索。",
    opensNotion: "在 Notion 中打开",
    desk: "工作台",
    deskDescription: "一个可互动的工作空间。",
    // Chinese nav term for "Log" pending the user's approval —
    // keep the English word rather than inventing a translation.
    versionHistory: "Log",
    versionHistoryDescription: "我的思考如何逐步演变。",
    statusTitle: "状态",
    basedIn: "俄亥俄州哥伦布市",
    weather: "22°C · 晴",
    availability: "正在寻找新的机会",
    disciplines: ["设计", "研究", "设计工程"],
    contactTitle: "联系",
    contactHeading: "如果你有一个问题、一个想法，或一个需要理清的复杂系统，欢迎来聊聊。",
    contactBody: "我期待产品设计、设计工程，以及由研究驱动的合作机会。",
    email: "邮箱",
    github: "GitHub",
    linkedin: "LinkedIn",
    editorialThreadNote: "一切都有联系。",
    peelCornerLabel: "打开 Phoebe's Desk",
  },
};

const NAV_COPY = {
  en: {
    home: "Home",
    caseStudies: "Case Studies",
    desk: "Desk",
    about: "About",
    ariaLabel: "Site navigation",
  },
  zh: {
    home: "首页",
    caseStudies: "案例研究",
    desk: "工作台",
    about: "关于",
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
    placeholder: "内容即将到来。",
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
    sceneLabel: "Phoebe 的工作台 — 交互式创作空间",
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
      plantAriaMaxed: "搁板上的绿植（已长到最大，不需要再浇水）",
      boardAria: "打开互动剪贴板",
      timelineAria: "打开设计旅程",
      boardLabel: "灵感剪贴板",
      timelineLabel: "设计旅程",
      windowAria: "窗户，悬停播放自然声",
    },
  },
};

/** Plant hover tooltip — one language at a time. */
export const PLANT_TOOLTIP_CONTENT = {
  en: ["Click to water it.", "Watch it grow a little each time."],
  zh: ["点击给它浇水。", "每次浇水它都会长大一点。"],
};

export const PLANT_TOOLTIP_MAX_CONTENT = {
  en: ["It’s fully grown.", "No more watering needed."],
  zh: ["它已经长到最大了。", "不需要再浇水啦。"],
};

export function getPlantTooltipCopy(language, { isMaxed = false } = {}) {
  const content = isMaxed ? PLANT_TOOLTIP_MAX_CONTENT : PLANT_TOOLTIP_CONTENT;
  return content[language] ?? content.en;
}

/** Mug hover tooltip — one language at a time, keyed like other copy. */
export const MUG_TOOLTIP_CONTENT = {
  en: ["My favorite drink is Matcha Latte.", "Would you like to try one?"],
  zh: ["我最喜欢的饮品是抹茶拿铁。", "你也想尝尝吗？"],
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
