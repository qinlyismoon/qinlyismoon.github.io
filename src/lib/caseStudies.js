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
    taglineZh: "把一次性的 AI 原型，打磨成一个能身临其境的可交互数字场所。",
    description:
      "An interactive web experience inspired by my 2023 graduation trip to Onomichi, Japan — translating the memory and atmosphere of a place into wind, chimes, and wishes.",
    descriptionZh:
      "受 2023 年日本尾道毕业旅行启发的可交互网页——把一个地方的记忆和氛围，译成风、铃与愿望。",
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
        "2023 年毕业旅行时我去了尾道。留在记忆里的是一些细小的瞬间：沿着山腰的寺庙小径散步，俯瞰大海和小镇，听见风铃声，遇见在寺庙里打盹、闲逛的猫。",
      question: "一个地方的记忆和氛围，怎样译成可交互的数字环境？",
      visual:
        "朱红、鹅黄、群青与暖白，把尾道的天空、大海、小镇和建筑收成柔和晕染的色块；受吴冠中启发的墨色线条，勾出悬挂的铁丝、细绳、山水与风铃。",
      interaction:
        "划过风铃让它们响，点纸条读上面的愿望，点「風」对着麦克风吹气，搅起一阵风。",
      process:
        "用 vibe coding 做：直接向 AI 编程助手描述视觉语言、物理行为、声音和交互规则，再一点点打磨成能身临其境的数字场所。",
    },
  },
];

// Selected design work. These live in Notion (no live URL to experience),
// so cards link straight out to the case study instead of opening a modal.
// v2.1.2: descriptions are rewritten from the Notion case studies around
// the positioning "help people understand complexity" — each line names the
// complexity and what the design makes understandable.
// v2.2.1: a selected project that also has a live website (liveUrl) opens
// the same introduction modal as the vibe projects, offering the live site
// and the Notion case study, instead of linking straight out.
export const SELECTED_PROJECTS = [
  {
    id: "leaf-note",
    title: "Leaf Note",
    description:
      "A shared plant-care app that makes a care handoff legible: the caregiver knows when to act, how, and when to flag a problem, and the owner can finally let go of the follow-up. Designed and built as a working prototype.",
    descriptionZh:
      "一款共享植物养护应用，把照料的交接说清楚：临时照料者知道什么时候动手、怎么做、什么时候该报异常，主人也能真正放下远程跟进。从设计到代码，做成了能跑的原型。",
    tags: ["Product Design", "Design Engineering"],
    url: "https://app.notion.com/p/Leaf-Note-3c77fb6b97a580628279feb164c27446?source=copy_link",
    thumbnail: "/leaf-note-thumb.png",
    role: "Product Designer & Engineer",
    roleZh: "产品设计师 & 工程实现",
    timeline: "2026",
  },
  {
    id: "emotion-garden",
    title: "Emotion Garden",
    subtitle: "Data Visualization · Interaction Design · Personal Informatics",
    description:
      "An interactive data visualization experience that turns emotional records into a living garden, helping people explore patterns, relationships, and everyday experiences over time.",
    descriptionZh:
      "一个交互式数据可视化体验，把情绪记录变成一座会生长的花园，帮人看见随时间展开的模式、关联和日常经历。",
    tags: ["Data Visualization", "Interaction Design"],
    url: "https://app.notion.com/p/Emotion-Graden-3f67fb6b97a580f395e5d6099d671d31?source=copy_link",
    liveUrl: "https://emotion-garden-sooty.vercel.app/",
    notesUrl:
      "https://app.notion.com/p/Emotion-Graden-3f67fb6b97a580f395e5d6099d671d31?source=copy_link",
    liveLabel: "Experience Website",
    liveLabelZh: "体验网站",
    notesLabel: "View Case Study",
    notesLabelZh: "查看案例研究",
    // Screen recording of the live sample garden: ambient motion plus
    // hovering flowers to reveal each moment's feeling, time and duration.
    thumbnail: "/emotion-garden-thumb.gif",
    role: "Data Visualization Designer & Engineer",
    roleZh: "数据可视化设计 & 工程实现",
    timeline: "2026",
    detail: {
      overview:
        "Emotion Garden is one project within my thesis research on emotional personal informatics. It asks how personal emotional data can become a living visual landscape—something people can read, revisit, and make sense of over time.",
      question:
        "How can emotional records become something people can interpret and reflect on?",
      visual:
        "Each emotional moment appears as a flower. Color, form, and size carry feeling, context, and duration; categories of everyday life—work and study, relationships, own time, body and health—sit along the garden so patterns read as a landscape.",
    },
    detailZh: {
      overview:
        "Emotion Garden 是我论文研究（情绪个人信息化）中的一个项目。它想弄清：个人情绪数据能不能变成一片有生命的视觉景观——让人可以读、可以回看，也能慢慢理解。",
      question: "情绪记录怎样成为人们可以解读、可以反思的东西？",
      visual:
        "每一个情绪时刻都以一朵花呈现。颜色、形态与大小承载感受、情境与时长；日常生活的类别——工作与学习、人际关系、属于自己的时间、身体与健康——排布在花园里，让模式像风景一样被读出来。",
    },
  },
  {
    id: "money-map",
    title: "Money Map",
    description:
      "A savings-goal redesign that shows what each goal requires, where you stand this month, and how a change ripples through the plan, so people can act without doing the math themselves.",
    descriptionZh:
      "一个储蓄目标的改版：让人看清每个目标需要什么、这个月进展到哪里，以及改一处会怎样影响整个计划——不必自己算，也能做出决定。",
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
      "一个 AR 阅读体验，把《Oscar et la Dame Rose》里的关键时刻变成空间交互：纸质书始终在中心，数字层帮读者走进故事。在 Unity 里设计并实现，运行于 iOS。",
    tags: ["AR", "Interaction Design"],
    url: "https://app.notion.com/p/Oscar-et-la-Dame-Rose-Turning-reading-into-participation-through-AR-8917fb6b97a583e7a5ab01fb84401ea8?source=copy_link",
    thumbnail: "/oscar-ar-thumb.png",
    role: "Design Engineer",
    roleZh: "设计工程师",
    timeline: "2024",
  },
];
