// Vibe coding projects and selected design work showcased on the
// Case Studies page. Vibe projects open a native detail view with a link
// to the live site; selected projects link out to their Notion case study.

import {
  LEAF_NOTE_DETAIL_SECTIONS,
  LEAF_NOTE_DETAIL_SECTIONS_ZH,
} from "./leafNoteCaseStudy";
import {
  MONEY_MAP_DETAIL_SECTIONS,
  MONEY_MAP_DETAIL_SECTIONS_ZH,
} from "./moneyMapCaseStudy";

export const VIBE_PROJECTS = [
  {
    id: "swim-balance",
    title: "Swim Balance",
    subtitle: "iOS App · Personal Informatics",
    role: "Product Designer & Engineer",
    roleZh: "产品设计师 & 工程实现",
    timeline: "2026",
    // The build time is this project's headline fact; the detail
    // footer calls it out after the year.
    duration: "Built in ~3 hours",
    durationZh: "约 3 小时建成",
    tagline:
      "Plan the next swim from your goals, the time you have, and how the last workout went.",
    taglineZh: "按目标、今天有多少时间、上次游得怎样，排下一次该怎么游。",
    description:
      "A personal swim planner I built in about three hours with AI — it uses goals, available time, and workout feedback to shape the next session, as a working SwiftUI app.",
    descriptionZh:
      "用 AI 大约三小时做成的个人游泳规划：看目标、可用时间和训练反馈，排出下一次课表。能跑的 SwiftUI 应用。",
    tags: ["SwiftUI", "Personal Informatics", "Vibe Coded"],
    // The detail's one way out: a video introduction on YouTube —
    // a click-out link (unlike Oscar's embedded player), offered as
    // the header's primary action.
    liveUrl: "https://www.youtube.com/watch?v=OFN8XVHJ8wQ",
    liveLabel: "Watch the video introduction",
    liveLabelZh: "观看视频介绍",
    thumbnail: "/swim-balance/cover.png",
    // Contents-bar crop: only the cover's sky, so no phone ever leaks
    // into the bar. Sized by height (not width) so the slice stays in
    // the top sky band at any bar width, phones included in the cover
    // start below it.
    navArtPosition: "100% 0%",
    navArtSize: "auto 44rem",
    // Footer scene: scaled much taller so the visible slice stays in
    // the sky band — the phones never enter the footer.
    footerArtSize: "auto 90rem",
    // Full case-study detail (mirrors the Notion page): longer narrative
    // sections with images and screen recordings, on the pale blue of the
    // artwork so the media blends into the page.
    caseStudy: {
      background: "#eef5f8",
      skills: ["SwiftUI", "ChatGPT", "Claude", "Muse", "GitHub"],
      problem: {
        heading: "The Problem — Why I Built It",
        paragraphs: [
          "I swim regularly, and I've recently been working on improving my freestyle. But I often struggle to balance practicing a newer stroke with getting enough exercise overall. My available time also changes from day to day.",
          "I wanted something that could help me plan more intentionally, rather than just track how far I'd swum.",
          "I spent about three hours building Swim Balance with AI.",
        ],
        quote:
          "How might I plan swims that fit the week I actually have — and the stroke I’m still learning?",
      },
      experience: {
        heading: "The Experience — What It Does",
        loop: "Plan → Swim → Reflect & Adjust",
        // PDF exports at 2× — sharper than the compressed screen recordings.
        images: [
          {
            src: "/swim-balance/plan.png",
            alt: "Plan: set strokes, goals, time, and days for the week",
            caption: "Plan",
          },
          {
            src: "/swim-balance/follow.png",
            alt: "Follow: swim the session with the plan on screen",
            caption: "Follow and swim",
          },
          {
            src: "/swim-balance/reflect.png",
            alt: "Reflect: review the swim and choose a next action",
            caption: "Reflect and Action",
          },
        ],
      },
      process: {
        heading: "The Process — How I Built with AI",
        image: {
          src: "/swim-balance/process.png",
          alt: "Three-hour timeline: frame the problem (20 minutes with ChatGPT), build the foundation (15 minutes in Cursor), then refine through iteration (2.5 hours across Claude Code and ChatGPT)",
          caption:
            "From personal friction to a working iOS app in about three hours — framing, foundation, then iteration.",
        },
      },
      decisions: {
        heading: "Design Decisions — What I Learned",
        items: [
          {
            title: "1. From Data to Actionable Feedback",
            paragraphs: [
              "At first, the workout summary only showed which goals I met and how far I swam. What I actually wanted to know was what to do differently next time.",
              "So each past swim now opens with a short takeaway and one specific suggestion. Two quick questions — how tiring it felt, and why I stopped early — shape that suggestion. If I ran out of time, the app suggests a shorter session. If my form fell apart, it holds off on adding distance.",
            ],
            image: {
              src: "/swim-balance/decision-1.png",
              alt: "Before, after, and with feedback: a workout summary that listed goals met becomes a one-line takeaway with one concrete next step, then a feedback step that shapes the next recommendation",
            },
          },
          {
            title: "2. Making Progress Comparisons Fair",
            paragraphs: [
              "While reviewing the History page, I noticed some comparisons were quietly misleading. On a Tuesday, the app compared my week so far with the whole of last week, so I always looked like I was falling behind. Weeks cut at the edges of a month could be just one or two days long.",
              "Now the current week is compared with the same days of last week, weeks always run Sunday to Sunday, and each bar shows its target as an outline, so it’s clear what “enough” looks like.",
            ],
            image: {
              src: "/swim-balance/decision-2.png",
              alt: "Before and after: a barely-started week compared against a whole week becomes full weeks shown against their own target outlines",
            },
          },
          {
            title: "3. What I Learned",
            paragraphs: [
              "Building with AI took me from an idea to a working iOS app in about three hours. The speed didn’t make design less important; it made judgment the main job.",
              "A lot of what came out looked fine but wasn’t quite right. The stage bar first looked like a row of buttons. Colors on the bar didn’t match the legend beneath it. One suggestion sounded encouraging but had nothing in the data behind it. None of these were obvious until I used the app in the simulator. Most of my time went into noticing them, deciding what to cut or simplify, and trying again.",
            ],
          },
        ],
      },
    },
    caseStudyZh: {
      background: "#eef5f8",
      skills: ["SwiftUI", "ChatGPT", "Claude", "Muse", "GitHub"],
      problem: {
        heading: "问题——我为什么做它",
        paragraphs: [
          "我经常游泳，最近在练自由泳。但我常在两件事之间拉扯：练新学的泳姿，和保证足够的总体运动量。每天能用的时间也不一样。",
          "我想要的是能帮我排好训练的东西；游了多远，只是记录的一部分。",
          "我用 AI 做了大约三小时，做出 Swim Balance。",
        ],
        quote:
          "How might I：怎样按我这周真正有的时间来排游泳——还要顾上正在练的泳姿？",
      },
      experience: {
        heading: "体验——它能做什么",
        loop: "计划 → 游泳 → 反思与调整",
        images: [
          {
            src: "/swim-balance/plan.png",
            alt: "计划：设定泳姿、目标、时间和训练日",
            caption: "计划",
          },
          {
            src: "/swim-balance/follow.png",
            alt: "跟着游：按计划完成这一次训练",
            caption: "跟着游",
          },
          {
            src: "/swim-balance/reflect.png",
            alt: "反思：回看这次游泳并选择下一步",
            caption: "反思与行动",
          },
        ],
      },
      process: {
        heading: "过程——我如何与 AI 一起做",
        image: {
          src: "/swim-balance/process.png",
          alt: "三小时时间线：用 ChatGPT 用 20 分钟框定问题，在 Cursor 里用 15 分钟搭好基础，再用 Claude Code 与 ChatGPT 迭代打磨两个半小时",
          caption: "从个人的小摩擦到能用的 iOS 应用，大约三小时——框定、搭基础、迭代。",
        },
      },
      decisions: {
        heading: "设计决定——我学到了什么",
        items: [
          {
            title: "1. 从数据到可以照着做的反馈",
            paragraphs: [
              "一开始，训练总结只显示我达成了哪些目标、游了多远。但我真正想知道的是：下一次该怎么做得不一样。",
              "所以现在每一次过去的游泳打开，先是一句简短的小结和一条具体的建议。两个快速问题——感觉有多累、为什么提前停——会塑造这条建议。如果是没时间了，建议下次缩短；如果动作散了，就先不加距离。",
            ],
            image: {
              src: "/swim-balance/decision-1.png",
              alt: "改动前、改动后与加入反馈后：训练总结从罗列达成目标，变成一句小结加一条具体下一步，再由反馈塑造下一次建议",
            },
          },
          {
            title: "2. 让进步对比更公平",
            paragraphs: [
              "看 History 页面时，我发现有些对比在悄悄误导。周二时，应用拿我本周到目前为止和上周整周比，我看起来总像在落后。月份边缘被切开的周，可能只有一两天长。",
              "现在，本周和上周相同的那几天比，周从周日到周日，每根柱子把目标画成轮廓，「够了」长什么样一眼就清楚。",
            ],
            image: {
              src: "/swim-balance/decision-2.png",
              alt: "改动前后：刚开始的一周和整周对比，变成完整周对照各自的目标轮廓",
            },
          },
          {
            title: "3. 我学到了什么",
            paragraphs: [
              "和 AI 一起做，让我用大约三小时从想法走到能用的 iOS 应用。速度没有让设计变得不重要，它让判断成了主要的工作。",
              "很多产出看起来不错，却总差一点。阶段条一开始像一排按钮，条上的颜色和下面的图例对不上，有一条建议听上去鼓励人，背后却没有数据。这些在模拟器里真正用起来之前都不明显。我大部分时间花在发现它们、决定砍掉或简化什么，再试一次。",
            ],
          },
        ],
      },
    },
  },
  {
    id: "onomichi-furin",
    title: "Onomichi Furin Wish Wall",
    subtitle: "尾道 · 風鈴",
    // Shown in the sidebar Page Metadata region while the card is hovered.
    role: "Design Engineer",
    roleZh: "设计工程师",
    timeline: "2026",
    tagline: "From a one-shot AI prototype to a place you can hang around in.",
    taglineZh: "从一次性的 AI 原型，磨成可以多待一会儿的地方。",
    description:
      "An interactive web piece from my 2023 graduation trip to Onomichi — wind, chimes, and wishes drawn from how that place still sits in memory.",
    descriptionZh:
      "受 2023 年尾道毕业旅行启发的可交互网页：风、铃、愿望，都来自那个地方还留在记忆里的样子。",
    tags: ["Interactive Web", "Vibe Coded"],
    liveUrl: "https://qinlyismoon.github.io/onomichi-furin/",
    thumbnail: "/onomichi-furin-thumb.gif",
    // Contents-bar crop: just below the top — chime tops and strings
    // against the gold sky. Calm, no UI, no strip text, still
    // unmistakably the furin wall.
    navArtPosition: "50% 10%",
    // Full case study, rewritten from the project's Notion page
    // (October 2026): background, first vibe-coded prototype, the
    // iteration passes, and the systems underneath. Images are
    // self-hosted under public/onomichi/ (Notion URLs expire).
    detailSections: [
      {
        id: "background",
        label: "Background",
        paragraphs: [
          "In 2023, I visited Onomichi during my graduation trip. What stayed with me was a collection of small moments: walking along hillside temple paths, looking down toward the sea and town, hearing wind chimes, and encountering cats resting and wandering around the temples.",
          "Years later, I returned to these memories as the starting point for this project. Instead of reproducing the landscape realistically, I began asking:",
        ],
        quote:
          "How do you bring the feel of a place into an interactive screen — without rebuilding the landscape?",
        image: {
          src: "/onomichi/memory.jpg",
          alt: "Glass wind chimes with paper wish strips hanging above Onomichi, looking down over the sea and the hillside town",
          caption:
            "The memory the wall is built from: furin above the Seto Inland Sea.",
        },
      },
      {
        id: "starting",
        label: "Starting with Vibe Coding",
        paragraphs: [
          "At the beginning, I described the visual language, physical behavior, sound, and interaction rules directly to an AI coding agent. The first prompt defined how the wall should behave, not just how it should look.",
        ],
        items: [
          {
            title: "Color as atmosphere",
            paragraphs: [
              "Vermilion, yellow, ultramarine, and warm white abstract the sky, sea, town, and architecture of Onomichi into soft, diffused color fields.",
            ],
          },
          {
            title: "Line as structure",
            paragraphs: [
              "Ink-like lines inspired by Wu Guanzhong define the hanging wires, strings, landscape, and wind chimes.",
            ],
          },
          {
            title: "Wind & physics",
            paragraphs: [
              "Each chime behaves as a small physical system: wind moves the paper strip, which drives the clapper and produces sound when it reaches the bell.",
            ],
          },
          {
            title: "Generative sound",
            paragraphs: [
              "Glass-like tones are synthesized in real time with Web Audio rather than played from fixed recordings, so the sound emerges from the movement of individual chimes.",
            ],
          },
          {
            title: "Blow & swipe",
            paragraphs: [
              "Visitors can activate the wall by blowing into the microphone or dragging across the chimes. Microphone frequency analysis translates blowing into wind strength, while pointer velocity generates directional impulses.",
            ],
          },
          {
            title: "Wishes",
            paragraphs: [
              "Visitors can write, hang, and read wishes, turning the wall from a visual simulation into a participatory space.",
            ],
          },
        ],
      },
      {
        id: "iteration",
        label: "Designing Through Iteration",
        paragraphs: [
          "AI got me a working wall quickly. What it didn’t give me was judgment about what felt wrong once I could click around — so I treated the first build as something to push against, not ship.",
          "I named what bothered me, set a rule, then asked AI to implement that rule and tried it again. The four passes below are the ones that changed the wall most.",
        ],
        items: [
          {
            title: "Control vs. Information",
            paragraphs: [
              "Before: “Sound On” and the Onomichi time sat at similar weight — one is a control, the other is just place info.",
              "After: Sound On stays obvious; local time gets quieter and separate, so it doesn’t look clickable.",
            ],
          },
          {
            title: "Wish Modal Hierarchy",
            paragraphs: [
              "Before: The wish modal had soft round corners and generic form controls — it looked like a website, not like the paper hanging behind it.",
              "After: Square edges on the card and CTA, quieter rounding on inputs. It reads as paper in the scene, not as a floating form.",
            ],
            image: {
              src: "/onomichi/wish-modal.jpg",
              alt: "The wish modal over the chime wall: a paper card with a wish written down the strip, illustrated glass chimes to pick a color, and a share-with-visitors checkbox",
            },
          },
          {
            title: "Object-based Selection",
            paragraphs: [
              "Before: Glass color was a regular color picker — abstract chips, disconnected from the chime you’d hang.",
              "After: You pick illustrated chimes instead. You’re choosing how yours will look on the wall.",
            ],
          },
          {
            title: "Wind Feedback",
            paragraphs: [
              "Before: The pointer trail was dark and heavy — readable, but more like a debug path than wind.",
              "After: Press softens into a ripple, drag leaves a light dotted trail, release drifts away. It shows where the wind started and where it went, not the cursor itself.",
            ],
          },
        ],
      },
      {
        id: "systems",
        label: "Rethinking the Systems",
        paragraphs: [],
        items: [
          {
            title: "Environment System: From a static scene to a place that changes over time",
            paragraphs: [
              "The first prototype presented Onomichi as a fixed scene. I wanted the wall to feel connected to the place it represents, even when no one was interacting with it.",
              "I introduced an environmental system based on local time in Onomichi, Japan, with four atmospheric states: Morning → Day → Sunset → Night. The system keeps the interface consistent while changing environmental properties such as ambient light, sky color, glass reflections, and atmospheric glow — and subtle signs of life in the scene, such as the presence and behavior of Onomichi's cats.",
            ],
            image: {
              src: "/onomichi/environment-system.png",
              alt: "Diagram: Onomichi local time drives four states — Morning, Day, Sunset, Night — which change atmosphere, lighting, and ambient life such as the cats",
            },
          },
          {
            title: "Wish System: From a shared database to different levels of visibility",
            paragraphs: [
              "The first prototype assumed that every new wish should immediately become visible to everyone. I realized that this technical assumption was also making a decision for the visitor.",
              "I redesigned the system so that visitors can choose whether a wish becomes part of the shared wall or remains private. All wishes now follow one consistent data model: a visitor sees the original seed wishes, community wishes, and all of their own wishes, while private wishes remain visible only to their creator.",
            ],
            image: {
              src: "/onomichi/wish-system.png",
              alt: "Diagram: the wish wall holds seed wishes, community shared wishes, and personal wishes, which are either shared or private",
            },
          },
        ],
      },
      {
        id: "building",
        label: "Building the System",
        paragraphs: [
          "As the experience became more complex, I separated its major behaviors instead of letting them remain tightly coupled inside the initial prototype. The wind interaction, environmental time, and wish data now operate as separate systems. This makes it easier to improve one layer without rewriting the others.",
          "For the wish system, a repository layer also separates the interface from storage, preparing the prototype for a future multi-user backend.",
        ],
        image: {
          src: "/onomichi/experience-system.png",
          alt: "Diagram: inputs — pointer, microphone, Onomichi time, writing a wish — feed the wind system, environment system, and the wish model with its repository and visibility rules",
          caption:
            "Input on the left; the wind, environment, and wish systems on the right.",
        },
      },
    ],
    detailSectionsZh: [
      {
        id: "background",
        label: "背景",
        paragraphs: [
          "2023 年毕业旅行时我去了尾道。留在记忆里的是一些细小的瞬间：沿着山腰的寺庙小径散步，俯瞰大海和小镇，听见风铃声，遇见在寺庙里打盹、闲逛的猫。",
          "几年后，我回到这些记忆，把它们当作这个项目的起点。比起真实地复刻那片风景，我更想先问一个问题：",
        ],
        quote: "怎样把一个地方的感觉带到屏幕上——又不用把风景重建一遍？",
        image: {
          src: "/onomichi/memory.jpg",
          alt: "挂满纸愿望的玻璃风铃，下方是尾道的海与山间小镇",
          caption: "这面墙的来源：濑户内海之上的风铃。",
        },
      },
      {
        id: "starting",
        label: "从 Vibe Coding 开始",
        paragraphs: [
          "一开始，我直接向 AI 编程助手描述视觉语言、物理行为、声音和交互规则。第一条提示词定义的，是这面墙应该怎样运作，长什么样只是其中一部分。",
        ],
        items: [
          {
            title: "颜色当氛围",
            paragraphs: [
              "朱红、鹅黄、群青与暖白，把尾道的天空、大海、小镇和建筑收成柔和晕染的色块。",
            ],
          },
          {
            title: "线条当结构",
            paragraphs: [
              "受吴冠中启发的墨色线条，勾出悬挂的铁丝、细绳、山水与风铃。",
            ],
          },
          {
            title: "风与物理",
            paragraphs: [
              "每只风铃都是一个小小的物理系统：风吹动纸条，纸条带动舌片，舌片碰到铃身时发出声音。",
            ],
          },
          {
            title: "生成式声音",
            paragraphs: [
              "玻璃般的音色用 Web Audio 实时合成，声音从每只风铃各自的运动里长出来，用的不是录好的音频文件。",
            ],
          },
          {
            title: "吹气与划动",
            paragraphs: [
              "访客可以对着麦克风吹气，或者用指针划过风铃来唤起这面墙。麦克风的频率分析把吹气变成风力，指针的速度生成有方向的推力。",
            ],
          },
          {
            title: "愿望",
            paragraphs: [
              "访客可以写愿望、挂愿望、读愿望——这面墙从一个视觉模拟，变成可以参与的空间。",
            ],
          },
        ],
      },
      {
        id: "iteration",
        label: "在迭代中设计",
        paragraphs: [
          "AI 很快搭出一面能点的墙。它给不了的是：点开之后哪里别扭——所以我把第一版当成拿来顶的东西，而不是拿来上线的东西。",
          "先说出哪里不对、定一条规则，再让 AI 按规则改，自己再试。下面四次，是对墙面改动最大的几步。",
        ],
        items: [
          {
            title: "控件与信息",
            paragraphs: [
              "之前：「Sound On」和尾道时间差不多重——一个是控件，一个只是地方信息。",
              "之后：Sound On 仍清楚可点；当地时间变安静、与控件分开，看起来就不像能点。",
            ],
          },
          {
            title: "许愿弹窗的层级",
            paragraphs: [
              "之前：许愿弹窗大圆角、通用表单，像网页，不像身后挂着的纸。",
              "之后：卡片和 CTA 用直角，输入框圆角收一点。读起来是场景里的纸，不是飘着的表单。",
            ],
            image: {
              src: "/onomichi/wish-modal.jpg",
              alt: "风铃墙之上的许愿弹窗：纸卡上写着愿望，用插画玻璃风铃选颜色，带一个与访客分享的勾选框",
            },
          },
          {
            title: "落在物件上的选择",
            paragraphs: [
              "之前：玻璃颜色是普通取色器——抽象色块，跟要挂上墙的铃没关系。",
              "之后：改成选插画风铃。挑的是自己那只挂上去会长什么样。",
            ],
          },
          {
            title: "风的反馈",
            paragraphs: [
              "之前：指针轨迹又深又重，能看清路径，但更像调试线，不像风。",
              "之后：按下起一点涟漪，拖出浅色点迹，松开就散掉。留下的是风从哪来、往哪去，不是光标本身。",
            ],
          },
        ],
      },
      {
        id: "systems",
        label: "重新思考系统",
        paragraphs: [],
        items: [
          {
            title: "环境系统：从静态场景到随时间变化的地方",
            paragraphs: [
              "第一个原型把尾道呈现成一个固定的场景。我希望这面墙和它代表的地方保持联系，哪怕没有人在和它互动。",
              "我加入了一套以日本尾道当地时间为基础的环境系统，四种氛围状态：早晨 → 白天 → 日落 → 夜晚。界面保持一致，环境光、天空颜色、玻璃反光和氛围光随之变化，场景里还有细微的生命迹象，比如尾道猫的出现和行为。",
            ],
            image: {
              src: "/onomichi/environment-system.png",
              alt: "示意图：尾道当地时间驱动早晨、白天、日落、夜晚四种状态，改变氛围、光线，以及猫这样的环境生命",
            },
          },
          {
            title: "愿望系统：从共享数据库到不同层级的可见性",
            paragraphs: [
              "第一个原型默认每个新愿望都立刻对所有人可见。我意识到，这个技术上的默认其实替访客做了一个决定。",
              "我重新设计了这套系统：访客可以自己选，愿望是成为共享墙面的一部分，还是只留给自己。所有愿望现在遵循同一套数据模型：访客能看到最初的种子愿望、社区愿望和自己的全部愿望，私密愿望只有许愿的人能看到。",
            ],
            image: {
              src: "/onomichi/wish-system.png",
              alt: "示意图：愿望墙包含种子愿望、社区共享愿望和个人愿望，个人愿望分共享与私密两种",
            },
          },
        ],
      },
      {
        id: "building",
        label: "把系统搭起来",
        paragraphs: [
          "随着体验变复杂，我把几个主要行为拆开，没有让它们继续缠在最初那个紧耦合的原型里。风的交互、环境时间和愿望数据现在是三套分开的系统，改一层时，别的层不用重写。",
          "愿望系统里还有一个仓库层（repository），把界面和存储分开，为将来接多用户后端做准备。",
        ],
        image: {
          src: "/onomichi/experience-system.png",
          alt: "示意图：左侧是输入——指针、麦克风、尾道时间、写愿望；右侧是风系统、环境系统，以及带仓库层和可见性规则的愿望模型",
          caption: "左边是输入；右边是风、环境和愿望三套系统。",
        },
      },
    ],
  },
];

// Selected design work. Projects with detailSections open a native case-study
// page; others with only a Notion url still link out.
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
    subtitle: "Shared Plant Care · Coded Prototype",
    tagline: "Know when to water. Hand off the rest.",
    taglineZh: "知道什么时候浇。剩下的交给别人。",
    description:
      "Shared plant care for when you’re away: the person covering knows what to do next, and you can stop chasing updates. Designed and built as a working prototype.",
    descriptionZh:
      "出门时把植物交给别人用的共享照料：替班的人知道下一步做什么，你也不用一直追问。从设计到代码，做成了能跑的原型。",
    tags: ["Product Design", "Design Engineering", "UX Research"],
    // Exact sage wash from the UI boards (#eef2e9) so media sits flush
    // on the same ground as the case-study page.
    panelBackground: "#eef2e9",
    liveUrl: "https://qinlyismoon.github.io/leaf-note/",
    liveLabel: "Experience Prototype",
    liveLabelZh: "体验原型",
    // Still used for the Selected Work card, contents-bar crop, and footer.
    thumbnail: "/work/leaf-note/cover.png",
    // Detail hero — looping cover video (replaces the static cover image).
    heroVideo: "/work/leaf-note/cover.mp4",
    // Contents-bar crop: only the cover's sage wash, so the phone
    // cluster never leaks into the bar. Anchored top-right and sized
    // by height so phones (lower-right) stay below the visible slice.
    navArtPosition: "100% 0%",
    navArtSize: "auto 44rem",
    // Footer: same calm band, scaled taller so phones stay out.
    footerArtPosition: "100% 0%",
    footerArtSize: "auto 90rem",
    role: "Product Designer & Engineer",
    roleZh: "产品设计师 & 工程实现",
    timeline: "2026",
    // Full case study (research tables, journey maps, evaluation,
    // coded experience, UI boards) — see leafNoteCaseStudy.js.
    detailSections: LEAF_NOTE_DETAIL_SECTIONS,
    detailSectionsZh: LEAF_NOTE_DETAIL_SECTIONS_ZH,
  },
  {
    id: "emotion-garden",
    title: "Emotion Garden",
    subtitle: "Data Visualization · Interaction Design · Personal Informatics",
    description:
      "Emotional records laid out as a garden you can walk through — color, form, and time, so patterns show up without a spreadsheet.",
    descriptionZh:
      "把情绪记录铺成一座可以走进去的花园：颜色、形态、时间排开，不用对着表格也能看出起伏。",
    tags: ["Interactive Data Visualization", "Motion Design"],
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
    // Contents-bar crop: the flower rows — the project's subject.
    // Mid-height, right end: flower heads over their stems, above the
    // busy timeline text at the bottom. The sun was rejected: it is
    // decoration, not the subject.
    navArtPosition: "50% 42%",
    role: "Data Visualization Designer & Engineer",
    roleZh: "数据可视化设计 & 工程实现",
    timeline: "2026",
    detail: {
      overview:
        "Emotion Garden sits inside my thesis on emotional personal informatics. I wanted personal feeling-data to look like a place you could return to — not a chart you decode once.",
      question: "What would it take for an emotional record to feel readable — and worth coming back to?",
      visual:
        "Each moment is a flower. Color, shape, and size hold the feeling, the context, and how long it lasted. Work, relationships, time alone, body and health sit along the garden so the week reads as a landscape.",
    },
    detailZh: {
      overview:
        "Emotion Garden 是我论文里做情绪个人信息化的其中一个项目。我想让自己的情绪数据看起来像一个可以回去的地方——不是解一次就扔的图表。",
      question: "怎样让一份情绪记录读得懂，也值得再回来看？",
      visual:
        "每一个时刻是一朵花。颜色、形态、大小带着感受、情境和持续多久。工作学习、人际关系、自己的时间、身体与健康排在花园里，一个星期读起来像一片景。",
    },
  },
  {
    id: "oscar-ar",
    title: "Oscar et la Dame Rose",
    subtitle: "AR Reading · Unity for iOS",
    description:
      "AR for Oscar et la Dame Rose: a few story moments open on the printed page, so the book stays the main thing. Built in Unity for iOS.",
    descriptionZh:
      "为《Oscar et la Dame Rose》做的 AR：几个故事时刻在纸页上展开，书仍是主线。Unity 做的，跑在 iOS 上。",
    tagline: "Read the book. Step into a few of its moments.",
    taglineZh: "还是在读书。只是有几个时刻，可以走进去。",
    tags: ["AR", "Interaction Design"],
    // The detail is fully native (detailSections below), never the
    // Notion page; the working-prototype video is embedded in the
    // system section, so there is no outbound action.
    // Still used for Selected Work fallback poster, contents-bar crop, footer.
    thumbnail: "/oscar-ar-thumb.jpg",
    // Card + detail hero — looping cover-flip video.
    heroVideo: "/oscar-ar/cover.mp4",
    // Contents-bar crop: the vine rose from the hero's top band
    // (the spiral rose at the vine's right end), framed whole at
    // the bar's revealed right edge — the image is pushed past the
    // right edge (negative right offset) so the left-of-frame vine
    // can land there, its tail melting into the mask. The footer
    // keeps the earlier crop — the rose pattern at the top of the
    // book cover — via its own footerArtPosition/footerArtSize.
    navArtPosition: "right -20.2rem top -2.9rem",
    navArtSize: "auto 30rem",
    footerArtPosition: "50% 32%",
    footerArtSize: "auto 50rem",
    role: "Design Engineer",
    roleZh: "设计工程师",
    timeline: "2024",
    // Full case study, rewritten from the project's Notion page
    // (October 2026): the reading challenge, three design principles,
    // five participatory moments, the AR system underneath, and what
    // building it established. Images are self-hosted under
    // public/oscar-ar/ (Notion URLs expire).
    detailSections: [
      {
        id: "challenge",
        label: "The Challenge",
        paragraphs: [
          "Oscar et la Dame Rose follows a terminally ill child who imagines living an entire lifetime over twelve days. Its themes — illness, aging, connection, and death — are emotionally rich but abstract, especially for younger readers.",
          "I looked at the experience from both sides of a parent–child reading relationship. For the parent, the challenge is introducing difficult topics while keeping the experience supportive and open to conversation. For the child, it is staying engaged with a text-based story while making sense of ideas that can feel distant or abstract.",
          "I was curious about AR — that was real. What made it the right fit here is how it can sit on the printed page: a few moments of participation that appear, then step back. For a story this abstract, that felt closer to reading than another screen or a longer explanation. The book stays the book; AR is there when a moment needs a body.",
        ],
        quote:
          "AR fit because it could stay with the book — present for a moment, then out of the way.",
      },
      {
        id: "principles",
        label: "Design Principles",
        paragraphs: ["From that question, I set three principles for the experience:"],
        items: [
          {
            title: "Keep the book primary",
            paragraphs: [
              "The physical book remains the main reading medium. AR appears at selected narrative moments, so the experience never turns into a screen-based activity.",
            ],
          },
          {
            title: "Make interaction meaningful",
            paragraphs: [
              "Each interaction relates to what is happening emotionally in the story — a moment earns its interaction.",
            ],
          },
          {
            title: "Connect physical and digital space",
            paragraphs: [
              "The printed page, phone camera, 3D content, animation, sound, and touch interaction should feel like parts of one continuous reading experience.",
            ],
          },
        ],
      },
      {
        id: "moments",
        label: "Five Moments",
        paragraphs: [
          "The book holds many scenes worth pausing on. I didn’t try to cover them all. The filter was interaction: where could a reader’s action deepen what the moment means, instead of turning the page into an animated illustration?",
          "That decision shaped the set below — five moments I chose to build. Others could work; these were the ones where participation felt earned. For each, I asked what the reader could do, and the work shifted from drawing the story to designing actions inside it. As Oscar’s journey unfolds, those actions change:",
        ],
        image: {
          src: "/oscar-ar/moments.png",
          alt: "Five colored chevrons in sequence: 1 Enter, cross the threshold; 2 Listen, share a moment; 3 Connect, offer support; 4 Care, express care; 5 Let go, say goodbye",
          caption:
            "Five I chose to build — enter, listen, connect, care, let go — not the only possible set.",
        },
        items: [
          {
            title: "Enter — Crossing into Oscar's world",
            split: true,
            paragraphs: [
              "A simple action marks the transition from the reader's physical world into Oscar's story. The reader scans the book and taps the door handle; the door opens, a rose grows, and the carrier pigeon appears.",
              "Building it meant placing the door relative to the page, defining its open and closed states, and connecting a tap to that behavior in C# — turning a tap into a transition between the physical book and the narrative world.",
            ],
            image: {
              src: "/oscar-ar/sketch-enter.jpg",
              alt: "Hand-drawn sketch of a door in two panels: click and open the door; then the door open, a rose growing, and a pigeon flying out with sound",
              caption: "Sketch #01 — Enter",
            },
          },
          {
            title: "Listen — Sharing a Moment Through Sound",
            split: true,
            paragraphs: [
              "Oscar and Peggy sit together and listen to The Nutcracker. The reader taps the Walkman to start the music, and music and animation bring the scene to life.",
              "A narrative detail becomes a shared sensory moment: the reader briefly listens with the characters.",
            ],
            image: {
              src: "/oscar-ar/sketch-listen.jpg",
              alt: "Hand-drawn sketch of two figures on a bench sharing a Walkman, annotated: click to play music, click again to stop, play The Nutcracker",
              caption: "Sketch #02 — Listen",
            },
          },
          {
            title: "Connect — Responding to Support",
            split: true,
            paragraphs: [
              "Granny Rose helps Oscar approach illness, aging, and death with courage. The reader triggers a fist bump between Oscar and Rose, and the characters answer through a short animated gesture.",
              "Emotional support becomes a simple physical gesture — their relationship witnessed through action.",
            ],
            image: {
              src: "/oscar-ar/sketch-connect.jpg",
              alt: "Hand-drawn sketch of Oscar and Granny Rose fist bumping, annotated: fist bump",
              caption: "Sketch #03 — Connect",
            },
          },
          {
            title: "Care — Turning Empathy into Action",
            split: true,
            paragraphs: [
              "As Oscar approaches the end of his symbolic lifetime, he becomes physically weaker. This interaction changes the reader's relationship to that moment: notice he is weaker, drag a hat or scarf to him, and offer warmth through action.",
              "I chose a drag-and-place interaction because it turns care into a physical gesture: selecting an object, moving it toward Oscar, and giving it to him.",
            ],
            image: {
              src: "/oscar-ar/sketch-care.jpg",
              alt: "Hand-drawn sketch of Oscar in a wheelchair with a hat and scarf circled, annotated: click and hold to drag",
              caption: "Sketch #04 — Care",
            },
          },
          {
            title: "Let Go — Participating in Goodbye",
            split: true,
            paragraphs: [
              "Oscar reaches the end of his life. He follows the carrier pigeon toward another world, turns back, smiles, and says goodbye.",
              "The final interaction shifts away from playful participation. The reader is asked to witness, and to let go.",
            ],
            image: {
              src: "/oscar-ar/sketch-letgo.jpg",
              alt: "Hand-drawn sketch of Oscar carried upward by white pigeons beside a rose, annotated: click and smile and wave",
              caption: "Sketch #05 — Let go",
            },
          },
        ],
      },
      {
        id: "system",
        label: "Building the AR System",
        paragraphs: [
          "To make the moments work with a physical book, I connected page recognition, spatial content, touch input, animation, and sound into one system. I built the prototype in Unity, using Vuforia to recognize selected pages and C# to connect reader input with scene behavior.",
        ],
        image: {
          src: "/oscar-ar/system.png",
          size: "contained",
          alt: "System diagram: physical book and printed page, camera recognizes page, Vuforia image target detection, Unity loads and anchors the AR scene, C# logic for touch states between 3D content and animation, user interaction by tap, drag, and listen, then Xcode to an iOS prototype",
          caption:
            "From printed page to iOS prototype: Vuforia recognizes the page, Unity anchors the scene, C# turns touch into states.",
        },
        items: [
          {
            title: "The book becomes the interface",
            paragraphs: [
              "Vuforia image targets are registered from the book's own pages and cover, each rated by how trackable its features are. Once a page is recognized, readers move between different moments of the experience by turning pages — no menus, no manually selected scenes. The printed book itself drives the experience.",
            ],
            image: {
              src: "/oscar-ar/vuforia.jpg",
              alt: "Vuforia Target Manager showing the book cover registered as an image target, rated five stars and augmentable",
              caption: "The cover as a Vuforia image target, rated for trackability.",
            },
          },
          {
            title: "Interaction becomes system behavior",
            paragraphs: [
              "Once a page is recognized, each interaction needs its own behavior logic. I translated reader actions — tapping a door, dragging an object — into states and responses Unity can control. The door is an Animator graph with Open and Close states; a C# script switches between them and flips the button label to match. Thinking in states moved me from describing what an interaction should feel like to defining exactly how the system behaves.",
            ],
            image: {
              src: "/oscar-ar/states.jpg",
              alt: "Unity Animator window: Entry leads to Close, with Open above it, and the Open-to-Close transition settings in the Inspector",
              caption: "The door's Animator states — Open and Close, driven from C#.",
            },
          },
          {
            title: "Staying connected to the physical book",
            paragraphs: [
              "AR introduced a constraint unlike a conventional screen interface: digital content had to make sense relative to a physical object. I adjusted the scale, orientation, and position of 3D elements around each image target in the editor, checking the Game view against the tracked page, so characters and objects appear to emerge from, sit on, or extend beyond the page.",
            ],
            image: {
              src: "/oscar-ar/spatial.jpg",
              alt: "Unity editor in two panes: the Scene view positioning a door model over the tracked book, the Game view showing the same door standing on the page, with the Door Open script in the Inspector",
              caption: "Placing the door on the tracked page — Scene view, Game view, Inspector.",
            },
          },
          {
            title: "The working prototype",
            // Phone beside the copy — same split rhythm as the moment sketches.
            split: true,
            paragraphs: [
              "I built the Unity project for iOS through Xcode and tested it with the physical book on a phone. On a real device, camera angle, tracking, viewing distance, object scale, and holding both book and phone all became part of the interaction.",
              "The five moments I built, held together by one physical book and an interactive AR layer.",
            ],
            video: {
              src: "/oscar-ar/working-prototype.mp4",
              // Phone recording (590×1280) — portrait stage, no side bars.
              aspect: "portrait",
              // Nutcracker bed mixed in; try unmuted when scrolled into view.
              withSound: true,
              title: "Oscar et la Dame Rose — working AR prototype",
              caption:
                "On iOS, with the printed book. Music: Dance of the Sugar Plum Fairy (Kevin MacLeod, CC BY) — from The Nutcracker.",
            },
          },
        ],
      },
      {
        id: "take-forward",
        label: "What I Took Forward",
        paragraphs: [
          "Critique from peers was practical: the look of the scenes should match the story’s tone more evenly; I still need to watch real parent–child reading, not only studio demos; and a few moments want more animation and sound so attention lands where it should.",
          "This was an early project where I designed the interaction and built it. In Unity, a sketch stops being a sketch — a gesture needs input, an animation needs states, an AR scene has to sit on a real page. That back-and-forth is still how I work: decide how it should behave, make a version you can hold, then judge it.",
        ],
      },
    ],
    detailSectionsZh: [
      {
        id: "challenge",
        label: "挑战",
        paragraphs: [
          "《奥斯卡与玫瑰奶奶》讲的是一个身患绝症的孩子，在十二天里想象自己活完了一生。疾病、衰老、连结与死亡，这些主题情感很浓，对年幼的读者来说却相当抽象。",
          "我从亲子共读的两端来看这个体验。对家长来说，难处是在引入沉重话题时，让整个过程有支持感、能打开对话；对孩子来说，难处是跟住一个以文字为主的故事，同时理解那些遥远又抽象的观念。",
          "想试 AR，这件事是有的。但放在这个故事里，它合适的地方在于：能直接落在纸页上——几个参与时刻出现，用完就退开。对这么抽象的主题来说，这比再开一块屏幕、或多解释几句，更贴阅读本身。书还是书；AR 只在「需要身体一下」的时候在。",
        ],
        quote: "合适，是因为它能跟着书走——来一下，再让开。",
      },
      {
        id: "principles",
        label: "设计原则",
        paragraphs: ["从这个问题出发，我为这个体验定了三条原则："],
        items: [
          {
            title: "书是主角",
            paragraphs: [
              "纸质书始终是主要的阅读媒介。AR 出现在选定的叙事时刻，整个体验不会变成盯着屏幕的活动。",
            ],
          },
          {
            title: "交互要有意义",
            paragraphs: [
              "每一个交互都与故事此刻的情感相连——这个时刻需要它，它才存在。",
            ],
          },
          {
            title: "连接物理与数字空间",
            paragraphs: [
              "印刷页面、手机摄像头、三维内容、动画、声音和触摸，应该像同一次阅读体验的组成部分。",
            ],
          },
        ],
      },
      {
        id: "moments",
        label: "五个时刻",
        paragraphs: [
          "书里值得停一停的地方很多，我没有打算全做。筛选标准是互动性：哪里让读者动一下，能加深这一刻的意思，而不是把书页做成动画插图？",
          "下面这五个，是按这个标准选出来去做的。别的瞬间也可以成立；我选的是「参与说得通」的那些。每一个，我都先问读者能做什么，工作也就从画故事，变成在故事里设计动作。随着 Oscar 的旅程展开，这些动作也在变：",
        ],
        image: {
          src: "/oscar-ar/moments.png",
          alt: "五个彩色箭头依次排列：1 进入，跨过门槛；2 聆听，分享一个时刻；3 连结，给予支持；4 关照，表达关心；5 放手，说再见",
          caption:
            "我选出来做的五个——进入、聆听、连结、关照、放手——不是唯一可能的一组。",
        },
        items: [
          {
            title: "进入——走进 Oscar 的世界",
            split: true,
            paragraphs: [
              "一个简单的动作，标记着从读者的物理世界进入 Oscar 故事的过渡。读者扫描书页，轻点门把手；门打开，玫瑰生长，信鸽出现。",
              "实现上，要把门相对于书页放置，定义它开与关的状态，再用 C# 把轻点和行为连起来——一次轻点，由此成为物理书页与叙事世界之间的一次过渡。",
            ],
            image: {
              src: "/oscar-ar/sketch-enter.jpg",
              alt: "手绘草图，一扇门分两格：点击并打开门；然后门开着，玫瑰生长，鸽子伴着声音飞出",
              caption: "草图 #01——进入",
            },
          },
          {
            title: "聆听——用声音分享一个时刻",
            split: true,
            paragraphs: [
              "Oscar 和 Peggy 坐在一起听《胡桃夹子》。读者轻点随身听，音乐响起，动画让场景活起来。",
              "一个叙事细节变成可以共同感受的时刻：读者短暂地和角色一起聆听。",
            ],
            image: {
              src: "/oscar-ar/sketch-listen.jpg",
              alt: "手绘草图：两个人物坐在长椅上共用一台随身听，标注写着点击播放音乐、再点一次停止、播放《胡桃夹子》",
              caption: "草图 #02——聆听",
            },
          },
          {
            title: "连结——回应支持",
            split: true,
            paragraphs: [
              "玫瑰奶奶帮助 Oscar 勇敢地面对疾病、衰老和死亡。读者触发 Oscar 和玫瑰奶奶之间的一次碰拳，两个角色用一个简短的动画手势回应。",
              "情感上的支持变成一个简单的身体动作——这段关系，用行动来见证。",
            ],
            image: {
              src: "/oscar-ar/sketch-connect.jpg",
              alt: "手绘草图：Oscar 和玫瑰奶奶碰拳，标注写着碰拳",
              caption: "草图 #03——连结",
            },
          },
          {
            title: "关照——把共情变成行动",
            split: true,
            paragraphs: [
              "当 Oscar 走近他象征性一生的终点，他的身体越来越虚弱。这个交互改变读者与这一刻的关系：注意到他的虚弱，把帽子或围巾拖给他，用行动送去温暖。",
              "我选择拖放，是因为关照由此成为一个身体动作：选一件东西，把它挪向 Oscar，交到他手里。",
            ],
            image: {
              src: "/oscar-ar/sketch-care.jpg",
              alt: "手绘草图：坐在轮椅上的 Oscar，帽子和围巾被圈出，标注写着按住并拖动",
              caption: "草图 #04——关照",
            },
          },
          {
            title: "放手——参与告别",
            split: true,
            paragraphs: [
              "Oscar 走到了生命的终点。他跟着信鸽走向另一个世界，回过头来，微笑着挥手告别。",
              "最后一个时刻离开了游戏式的参与。读者要做的，是见证，然后放手。",
            ],
            image: {
              src: "/oscar-ar/sketch-letgo.jpg",
              alt: "手绘草图：Oscar 被白鸽带向上方，旁边有一枝玫瑰，标注写着点击，微笑并挥手",
              caption: "草图 #05——放手",
            },
          },
        ],
      },
      {
        id: "system",
        label: "构建 AR 系统",
        paragraphs: [
          "要让这些时刻在一本纸质书上运作，我把页面识别、空间内容、触摸输入、动画和声音连成一个系统。原型在 Unity 中构建，用 Vuforia 识别选定的书页，用 C# 把读者的输入和场景行为连接起来。",
        ],
        image: {
          src: "/oscar-ar/system.png",
          size: "contained",
          alt: "系统图：纸质书与印刷页面，摄像头识别书页，Vuforia 图像目标检测，Unity 加载并锚定 AR 场景，C# 逻辑处理触摸状态、连接三维内容与动画，用户以轻点、拖动和聆听交互，最后经 Xcode 成为 iOS 原型",
          caption:
            "从印刷页面到 iOS 原型：Vuforia 识别书页，Unity 锚定场景，C# 把触摸变成状态。",
        },
        items: [
          {
            title: "书成为界面",
            paragraphs: [
              "Vuforia 的识别目标直接取自这本书的书页和封面，每个目标都按特征的可追踪程度评级。书页一旦被识别，读者翻页就在体验的不同时刻之间移动——不需要菜单，也不需要手动选择场景。由印刷的书本身来驱动整个体验。",
            ],
            image: {
              src: "/oscar-ar/vuforia.jpg",
              alt: "Vuforia 目标管理器：书的封面登记为一个图像目标，可追踪性评级为五星",
              caption: "作为 Vuforia 识别目标的封面，按可追踪性评级。",
            },
          },
          {
            title: "交互落成系统行为",
            paragraphs: [
              "页面被识别后，每个交互都需要自己的行为逻辑。我把读者的动作——轻点一扇门、拖动一件物品——译成 Unity 可以控制的状态和回应。那扇门就是一张带 Open 和 Close 两个状态的 Animator 图，由 C# 脚本切换，同时把按钮文字翻成对应的状态。以状态来思考，让我从描述一个交互应该有什么感觉，走到确切定义这个系统如何行为。",
            ],
            image: {
              src: "/oscar-ar/states.jpg",
              alt: "Unity 的 Animator 窗口：Entry 通向 Close，Open 在其上方，Inspector 里是 Open 到 Close 的过渡设置",
              caption: "门的 Animator 状态——Open 与 Close，由 C# 驱动。",
            },
          },
          {
            title: "与纸质书保持连接",
            paragraphs: [
              "AR 带来一个和常规屏幕界面不同的约束：数字内容必须相对于一个实体物件成立。我在编辑器里围绕每个识别目标调整三维元素的大小、朝向和位置，对照被追踪的书页检查 Game 视图，让角色和物件像是浮出页面、坐在页面上，或延伸到页面之外。",
            ],
            image: {
              src: "/oscar-ar/spatial.jpg",
              alt: "Unity 编辑器两个窗格：Scene 视图把门的模型定位到被追踪的书上，Game 视图显示同一扇门立在书页上，Inspector 里是 Door Open 脚本",
              caption: "把门放到被追踪的书页上——Scene 视图、Game 视图与 Inspector。",
            },
          },
          {
            title: "跑起来的原型",
            split: true,
            paragraphs: [
              "我通过 Xcode 把 Unity 项目构建到 iOS，在手机上拿着实体书测。到了真机上，摄像头角度、追踪稳不稳、观看距离、物件大小，还有同时拿着书和手机这件事，都成了交互的一部分。",
              "我做出来的五个时刻，由一本实体书和一个可交互的 AR 层连在一起。",
            ],
            video: {
              src: "/oscar-ar/working-prototype.mp4",
              aspect: "portrait",
              withSound: true,
              title: "Oscar et la Dame Rose——跑起来的 AR 原型",
              caption:
                "iOS 上配合实体书。配乐：Dance of the Sugar Plum Fairy（Kevin MacLeod，CC BY）——选自《胡桃夹子》。",
            },
          },
        ],
      },
      {
        id: "take-forward",
        label: "带走的收获",
        paragraphs: [
          "同伴的意见很具体：场景的样子要更贴故事的语气；还得去看真实的亲子共读，不能只停在工作室演示；有几个时刻需要更多动画和声音，注意力才落在该落的地方。",
          "这是我很早同时做交互和实现的项目。进了 Unity，草图就不再只是草图——手势要有输入，动画要有状态，AR 场景得落在真的书页上。来回这一下，到现在还是我的做法：先想清楚它该怎么动，做出能拿在手里的一版，再判断。",
        ],
      },
    ],
  },
  {
    id: "money-map",
    title: "Money Map",
    subtitle: "Savings Goals · Product Design",
    tagline: "See what the goal asks. Act without doing the math.",
    taglineZh: "看清目标要什么。不必自己算，也能行动。",
    description:
      "A savings-goal redesign that shows what each goal requires, where you stand this month, and how a change ripples through the plan, so people can act without doing the math themselves.",
    descriptionZh:
      "一个储蓄目标的改版：让人看清每个目标需要什么、这个月进展到哪里，以及改一处会怎样影响整个计划——不必自己算，也能做出决定。",
    tags: ["Product Design", "Usability Testing"],
    // Soft gray wash from the cover so hero and boards share one ground.
    panelBackground: "#eef0f2",
    // Native detail (personas → HMW → three priorities → prototype clips
    // → usability plan) — see moneyMapCaseStudy.js.
    thumbnail: "/money-map/cover.png",
    // Contents-bar / footer: phone + soft blue circle on the right.
    navArtPosition: "88% 42%",
    navArtSize: "auto 26rem",
    footerArtPosition: "80% 40%",
    footerArtSize: "auto 55rem",
    role: "Product Designer",
    roleZh: "产品设计师",
    timeline: "2026",
    detailSections: MONEY_MAP_DETAIL_SECTIONS,
    detailSectionsZh: MONEY_MAP_DETAIL_SECTIONS_ZH,
  },
];
