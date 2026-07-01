const HOME_COPY = {
  en: {
    titleTop: "Phoebe is making,",
    titleBottom: "thinking, and researching",
    design: "Design",
    ux: "UX Research",
    vibeCoding: "Vibe Coding Paradise",
    expand: "Expand",
    peelCornerLabel: "Open workspace",
  },
  zh: {
    titleTop: "珑月正在制作、",
    titleBottom: "思考与研究",
    design: "设计",
    ux: "用户研究",
    vibeCoding: "Vibe Coding Paradise",
    expand: "展开",
    peelCornerLabel: "打开工作区",
  },
};

const WORKSPACE_COPY = {
  en: {
    closeLabel: "Close workspace",
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
      calendar: "Current Work",
      speaker: "Music",
      mugAria: "Matcha latte",
    },
  },
  zh: {
    closeLabel: "关闭详情页",
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
      calendar: "近期工作",
      speaker: "音乐",
      mugAria: "抹茶拿铁",
    },
  },
};

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
