const HOME_COPY = {
  en: {
    greeting: "Hi, I’m Phoebe.",
    akaLabel: "Also known as:",
    chineseName: "秦珑月",
    nameCardAria: "Name meaning of 秦珑月",
    exploring:
      "I’m always exploring, experimenting, and making—trying to create something new, something different, and something that matters to people.",
    whatIDoLabel: "WHAT I DO",
    whoIAmLabel: "WHO I AM",
    bio: "I turn ambiguous ideas into clear, end-to-end experiences—balancing people, aesthetics, and technical feasibility.",
    personality:
      "I’m always learning, changing, and becoming. Through it all, I try to stay true to who I am and honest with myself.",
    design: "Design",
    ux: "UX Research",
    vibeCoding: "Vibe Coding Paradise",
    expand: "Expand",
    peelCornerLabel: "Open Phoebe's Desk",
  },
  zh: {
    greeting: "你好，我是 Phoebe.",
    akaLabel: "也叫：",
    chineseName: "秦珑月",
    nameCardAria: "秦珑月的姓名释义",
    exploring:
      "我一直在探索、实验，也一直在动手做——想创造一些新的、不同的东西，以及真正对人有意义的东西。",
    whatIDoLabel: "我做什么",
    whoIAmLabel: "我是谁",
    bio: "我把模糊的想法做成清晰的端到端体验——在人、美学与技术可行性之间取得平衡。",
    personality:
      "我总在学习、变化，也总在成为。无论怎样，我都努力忠于自己，并对自己诚实。",
    design: "设计",
    ux: "用户研究",
    vibeCoding: "Vibe Coding Paradise",
    expand: "展开",
    peelCornerLabel: "打开 Phoebe's Desk",
  },
};

const NAV_COPY = {
  en: {
    home: "Home",
    desk: "Desk",
    about: "Timeline",
    ariaLabel: "Site navigation",
  },
  zh: {
    home: "首页",
    desk: "工作台",
    about: "时间线",
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
      clockAria: "Wall clock, US Eastern Time",
      camera: "Photography",
      musicPlay: "Play",
      musicPause: "Pause",
      musicAria: "Desk speaker, play or pause music",
      mugAria: "Matcha latte",
      plantAria: "Trailing plant on shelf",
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
      clockAria: "挂钟，美东时间",
      camera: "摄影",
      musicPlay: "播放",
      musicPause: "暂停",
      musicAria: "桌面音箱，播放或暂停音乐",
      mugAria: "抹茶拿铁",
      plantAria: "搁板上的垂吊绿植",
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
