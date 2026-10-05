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
// v2.1.2: descriptions are rewritten from the Notion case studies around
// the positioning "help people understand complexity" — each line names the
// complexity and what the design makes understandable.
export const SELECTED_PROJECTS = [
  {
    id: "leaf-note",
    title: "Leaf Note",
    description:
      "A shared plant-care app that makes a care handoff legible: the caregiver knows when to act, how, and when to flag a problem, and the owner can finally let go of the follow-up. Designed and built as a working prototype.",
    descriptionZh:
      "一款共享植物养护应用，让照料的交接变得清楚可读：临时照料者知道何时行动、如何操作、何时需要上报异常，主人也终于可以放下远程的跟进。从设计到代码，做成了可运行的原型。",
    tags: ["Product Design", "Design Engineering"],
    url: "https://app.notion.com/p/Leaf-Note-3c77fb6b97a580628279feb164c27446?source=copy_link",
    thumbnail: "/leaf-note-thumb.png",
    role: "Product Designer & Engineer",
    roleZh: "产品设计师 & 工程实现",
    timeline: "2026",
  },
  {
    id: "money-map",
    title: "Money Map",
    description:
      "A savings-goal redesign that shows what each goal requires, where you stand this month, and how a change ripples through the plan, so people can act without doing the math themselves.",
    descriptionZh:
      "一个储蓄目标的改版设计：让人看清每个目标需要什么、这个月进行到哪里，以及一次修改会如何影响整个计划——不必自己算，也能做出决定。",
    tags: ["Product Design", "Usability Testing"],
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
      "An AR reading experience that turns key moments of Oscar et la Dame Rose into spatial interactions, keeping the physical book at the center while a digital layer helps readers step into the story. Designed and built in Unity for iOS.",
    descriptionZh:
      "一个 AR 阅读体验，把《Oscar et la Dame Rose》中的关键时刻变成空间交互：纸质书始终是中心，数字层帮助读者走进故事。在 Unity 中设计并实现，运行于 iOS。",
    tags: ["AR", "Interaction Design"],
    url: "https://app.notion.com/p/Oscar-et-la-Dame-Rose-Turning-reading-into-participation-through-AR-8917fb6b97a583e7a5ab01fb84401ea8?source=copy_link",
    thumbnail: "/oscar-ar-thumb.png",
    role: "Design Engineer",
    roleZh: "设计工程师",
    timeline: "2024",
  },
];
