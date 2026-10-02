// Vibe coding projects and selected design work showcased on the
// Case Studies page. Vibe projects open a native detail view with a link
// to the live site; selected projects link out to their Notion case study.

export const VIBE_PROJECTS = [
  {
    id: "onomichi-furin",
    title: "Onomichi Furin Wish Wall",
    subtitle: "尾道 · 風鈴",
    // Shown in the sidebar Page Metadata region while the card is hovered.
    role: "Design Engineer",
    roleZh: "设计工程师",
    timeline: "2026",
    tagline:
      "Turning a one-shot AI prototype into a situated, interactive digital place.",
    taglineZh: "把一次性的 AI 原型，打磨成一个有身临感的可交互数字场所。",
    description:
      "An interactive web experience inspired by my 2023 graduation trip to Onomichi, Japan — translating the memory and atmosphere of a place into wind, chimes, and wishes.",
    descriptionZh:
      "受 2023 年日本尾道毕业旅行启发的可交互网页体验——把一个地方的记忆与氛围，翻译成风、铃与愿望。",
    tags: ["Interactive Web", "Vibe Coded"],
    liveUrl: "https://qinlyismoon.github.io/onomichi-furin/",
    notesUrl:
      "https://app.notion.com/p/Onomichi-Furin-Wish-Wall-3e97fb6b97a5808ea730fd5c41689440?source=copy_link",
    thumbnail: "/onomichi-furin-thumb.gif",
    detail: {
      background:
        "In 2023, I visited Onomichi during my graduation trip. What stayed with me was a collection of small moments: walking along hillside temple paths, looking down toward the sea and town, hearing wind chimes, and encountering cats resting and wandering around the temples.",
      question:
        "How can the memory and atmosphere of a place be translated into an interactive digital environment?",
      visual:
        "Vermilion, yellow, ultramarine, and warm white abstract the sky, sea, town, and architecture into soft, diffused color fields; ink-like lines inspired by Wu Guanzhong define the hanging wires, strings, landscape, and wind chimes.",
      interaction:
        "Swipe across the chimes to ring them, tap a strip to read its wish, tap \u98a8 and blow into your mic to stir the wind.",
      process:
        "Built with vibe coding: the visual language, physical behavior, sound, and interaction rules were described directly to an AI coding agent, then refined into a situated digital place.",
    },
    detailZh: {
      background:
        "2023 年毕业旅行时我去了尾道。留在记忆里的是一些细小的瞬间：沿着山腰的寺庙小径散步，俯瞰大海与小镇，听见风铃声，遇见在寺庙里打盹和闲逛的猫。",
      question: "一个地方的记忆与氛围，如何被翻译成可交互的数字环境？",
      visual:
        "朱红、鹅黄、群青与暖白，把尾道的天空、大海、小镇和建筑抽象成柔和晕染的色块；受吴冠中启发的墨色线条，勾勒出悬挂的铁丝、细绳、山水与风铃。",
      interaction:
        "划过风铃让它们响起，点击纸条阅读上面的愿望，点击「風」对着麦克风吹气，搅动一阵风。",
      process:
        "用 vibe coding 构建：直接向 AI 编程助手描述视觉语言、物理行为、声音与交互规则，再逐步打磨成一个有身临感的数字场所。",
    },
  },
];

// Selected design work. These live in Notion (no live URL to experience),
// so cards link straight out to the case study instead of opening a modal.
// Descriptions are taken verbatim from the Notion pages; tags, roles and
// timelines are provisional — confirm or revise them.
export const SELECTED_PROJECTS = [
  {
    id: "leaf-note",
    title: "Leaf Note",
    description:
      "LeafNote is a shared plant-care app that helps casual plant owners remember essential care, track what has happened, and confidently hand responsibility to someone else when they travel.",
    descriptionZh:
      "LeafNote 是一款共享植物养护应用，帮助新手植物主人记住关键养护事项、记录养护历史，并在旅行时放心地把照料责任交接给他人。",
    tags: ["Product Design", "UX Research"],
    url: "https://app.notion.com/p/Leaf-Note-3c77fb6b97a580628279feb164c27446?source=copy_link",
    thumbnail: "/leaf-note-thumb.png",
    role: "Product Designer",
    roleZh: "产品设计师",
    timeline: "2026",
  },
  {
    id: "money-map",
    title: "Money Map",
    description:
      "MoneyMap is a financial goal-tracking redesign focused on helping users plan their savings, manage competing goals, and understand how their progress is calculated.",
    descriptionZh:
      "MoneyMap 是一个财务目标追踪的改版设计，帮助用户规划储蓄、管理多个并行的目标，并理解进度是如何计算的。",
    tags: ["Product Design", "UX Research"],
    url: "https://app.notion.com/p/Money-Map-3aa7fb6b97a5804aa621f9657a47f5d3?source=copy_link",
    thumbnail: "/money-map-thumb.png",
    role: "Product Designer",
    roleZh: "产品设计师",
    timeline: "2026",
  },
  {
    id: "oscar-ar",
    title: "Oscar et la Dame Rose",
    description:
      "I designed and built an AR reading experience that transforms key moments from Oscar et la Dame Rose into spatial interactions, bridging a physical book with an interactive digital layer.",
    descriptionZh:
      "我设计并构建了一个 AR 阅读体验，将《Oscar et la Dame Rose》中的关键情节转化为空间交互，在纸质书与互动数字层之间架起桥梁。",
    tags: ["AR", "Interaction Design"],
    url: "https://app.notion.com/p/Oscar-et-la-Dame-Rose-Turning-reading-into-participation-through-AR-8917fb6b97a583e7a5ab01fb84401ea8?source=copy_link",
    thumbnail: "/oscar-ar-thumb.png",
    role: "Design Engineer",
    roleZh: "设计工程师",
    timeline: "2024",
  },
];
