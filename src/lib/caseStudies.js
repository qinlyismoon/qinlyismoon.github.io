// Vibe coding projects and selected design work showcased on the
// Case Studies page. Vibe projects open a native detail view with a link
// to the live site; selected projects link out to their Notion case study.

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
      "A personal swim planner that turns goals, available time, and workout feedback into actionable training plans.",
    taglineZh:
      "一个个人游泳规划工具，把目标、可用时间和每次训练的反馈，变成下一次可以照着做的训练计划。",
    description:
      "A personal swim planner that turns goals, available time, and workout feedback into actionable training plans. Designed and built as a working SwiftUI app in about three hours, with AI.",
    descriptionZh:
      "一个个人游泳规划工具，把目标、可用时间和训练反馈变成可执行的训练计划。用 AI 在大约三小时内设计并做成了能用的 SwiftUI 应用。",
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
          "How might I make swim training more intentional and adaptable to my schedule?",
      },
      experience: {
        heading: "The Experience — What It Does",
        loop: "Plan → Swim → Reflect & Adjust",
        videos: [
          { src: "/swim-balance/plan.mp4", caption: "Plan" },
          { src: "/swim-balance/follow.mp4", caption: "Follow and swim" },
          { src: "/swim-balance/reflect.mp4", caption: "Reflect and Action" },
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
          "我希望它帮我更用心地规划训练；游了多远，只是记录的一部分。",
          "我用 AI 做了大约三小时，做出 Swim Balance。",
        ],
        quote: "怎样让游泳训练更用心，也能跟着我的日程调整？",
      },
      experience: {
        heading: "体验——它能做什么",
        loop: "计划 → 游泳 → 反思与调整",
        videos: [
          { src: "/swim-balance/plan.mp4", caption: "计划" },
          { src: "/swim-balance/follow.mp4", caption: "跟着游" },
          { src: "/swim-balance/reflect.mp4", caption: "反思与行动" },
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
    tagline:
      "Turning a one-shot AI prototype into a situated, interactive digital place.",
    taglineZh: "把一次性的 AI 原型，打磨成一个能身临其境的可交互数字场所。",
    description:
      "An interactive web experience inspired by my 2023 graduation trip to Onomichi, Japan — translating the memory and atmosphere of a place into wind, chimes, and wishes.",
    descriptionZh:
      "受 2023 年日本尾道毕业旅行启发的可交互网页——把一个地方的记忆和氛围，译成风、铃与愿望。",
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
          "How can the memory and atmosphere of a place be translated into an interactive digital environment?",
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
          "With AI-assisted coding, I quickly built a functional prototype. But it raised a more interesting question: what is the designer's role when AI can produce a functional prototype before the interaction system has been fully designed?",
          "Instead of treating the first generation as a finished solution, I used it as a working prototype to critique and redesign. My method: Generate → Test → Critique → Define → Iterate. Rather than asking AI to simply “make it better,” I defined what was not working, established new rules, and then used AI to implement and test those decisions.",
        ],
        items: [
          {
            title: "Control vs. Information",
            paragraphs: [
              "Before: “Sound On” and the Onomichi time indicator appeared with similar visual weight, even though one was an interactive control and the other was environmental information.",
              "Iteration: I kept Sound On as a clear control while making Onomichi local time quieter and visually separate. Interactive elements should communicate action, while environmental information should remain readable without suggesting that it can be clicked.",
            ],
          },
          {
            title: "Wish Modal Hierarchy",
            paragraphs: [
              "Before: The generated wish modal used large rounded corners and generic form controls. Its visual language felt closer to a standard web interface than the angular, paper-based environment behind it.",
              "Iteration: I moved toward a more structured paper-card language: square outer edges and CTA buttons, restrained rounding for inputs, and smaller-radius cards only where selection needed to be communicated. The geometry now communicates hierarchy while connecting the interface more closely to the physical wish papers hanging in the scene.",
            ],
            image: {
              src: "/onomichi/wish-modal.jpg",
              alt: "The wish modal over the chime wall: a paper card with a wish written down the strip, illustrated glass chimes to pick a color, and a share-with-visitors checkbox",
            },
          },
          {
            title: "Object-based Selection",
            paragraphs: [
              "Before: Choosing a glass color functioned like a conventional UI color picker, separating the choice from the object the visitor was actually creating.",
              "Iteration: I replaced abstract color choices with illustrated glass wind chimes, showing the color directly on the object. Visitors are choosing what their wind chime will look like on the wall.",
            ],
          },
          {
            title: "Wind Feedback",
            paragraphs: [
              "Before: The early pointer trail was dark and visually heavy. It clearly showed the cursor path, but felt more like a debug trace than part of the environment.",
              "Iteration: I redesigned the feedback around three interaction states — Press → soft ripple; Drag → light dotted wind trail; Release → drift and fade. Instead of visualizing the cursor itself, the feedback now communicates the origin, direction, and dissipation of wind.",
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
        quote: "一个地方的记忆和氛围，怎样译成可交互的数字环境？",
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
            title: "颜色即氛围",
            paragraphs: [
              "朱红、鹅黄、群青与暖白，把尾道的天空、大海、小镇和建筑收成柔和晕染的色块。",
            ],
          },
          {
            title: "线条即结构",
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
              "访客可以对着麦克风吹气，或者用指针划过风铃来唤起这面墙。麦克风的频率分析把吹气译成风力，指针的速度生成有方向的推力。",
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
          "在 AI 的协助下，我很快做出了一个能跑的原型。但它带来了一个更有意思的问题：当 AI 能在交互系统被完整设计出来之前就生成可用的原型时，设计师的角色是什么？",
          "我把第一次生成当作可以批评和重做的原型，用它来检验视觉传达、交互回应、环境行为和底层数据结构，再逐层迭代。我的方法是：生成 → 测试 → 批评 → 定义 → 迭代。我先说清楚哪里不对、定下新规则，再让 AI 实现和验证这些决定，很少只说一句「做得更好」。",
        ],
        items: [
          {
            title: "控件与信息",
            paragraphs: [
              "之前：「Sound On」和尾道时间指示的视觉权重差不多，但一个是可交互的控件，一个是环境信息。",
              "迭代：我让 Sound On 保持明确的控件样子，把尾道当地时间放得更安静、与控件分开。可交互的元素应该传达「可以点」，环境信息保持可读，同时不暗示自己能点。",
            ],
          },
          {
            title: "许愿弹窗的层级",
            paragraphs: [
              "之前：生成的许愿弹窗用大圆角和通用表单控件，视觉语言更接近标准网页界面，和身后那个有棱角、以纸为基础的环境不属于同一种语言。",
              "迭代：我改用更结构化的纸卡语言：外缘和 CTA 按钮用直角，输入框只保留克制的圆角，小圆角卡片只用在需要表达选择的地方。几何形态把层级说清楚，也让界面和场景里挂着的纸愿望属于同一种语言。",
            ],
            image: {
              src: "/onomichi/wish-modal.jpg",
              alt: "风铃墙之上的许愿弹窗：纸卡上写着愿望，用插画玻璃风铃选颜色，带一个与访客分享的勾选框",
            },
          },
          {
            title: "落在物件上的选择",
            paragraphs: [
              "之前：选玻璃颜色是一个常规的 UI 取色器，选择和人真正在做的物件被分开了。",
              "迭代：我用插画里的玻璃风铃替代抽象色块，颜色直接长在物件上。访客挑的，是自己那只风铃挂上墙的样子。",
            ],
          },
          {
            title: "风的反馈",
            paragraphs: [
              "之前：早期的指针轨迹又深又重，能看清光标路径，但更像调试用的描线，属于环境之外的东西。",
              "迭代：我把反馈重做成三个交互状态——按下 → 柔和涟漪；拖动 → 浅色点状风轨；松开 → 漂移消散。反馈传达的是风的起点、方向和消散，画面里留下的不是光标本身。",
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
    thumbnail: "/leaf-note-thumb.jpg",
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
    subtitle: "AR Reading · Unity for iOS",
    description:
      "An AR reading experience that turns key moments of Oscar et la Dame Rose into spatial interactions, keeping the physical book at the center while a digital layer helps readers step into the story. Designed and built in Unity for iOS.",
    descriptionZh:
      "一个 AR 阅读体验，把《Oscar et la Dame Rose》里的关键时刻变成空间交互：纸质书始终在中心，数字层帮读者走进故事。在 Unity 里设计并实现，运行于 iOS。",
    tagline:
      "Turning reading into participation — the book's key moments become spatial interactions on the printed page.",
    taglineZh: "让阅读变成参与——书里的关键时刻，在纸页上化作空间交互。",
    tags: ["AR", "Interaction Design"],
    // The detail is fully native (detailSections below), never the
    // Notion page; the working-prototype video is embedded in the
    // system section, so there is no outbound action.
    thumbnail: "/oscar-ar-thumb.jpg",
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
          "This led me to treat AR as a way to create small moments of participation within the reading experience, appearing at chosen moments while the book stays a book.",
        ],
        quote:
          "How might AR help readers participate in emotionally significant moments of the story, while keeping the physical book at the center of the experience?",
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
          "I selected moments where reader participation could reinforce the meaning of the narrative instead of recreating the book as a series of animated scenes. For each moment I asked what the reader could do that would make it more meaningful, and the design process shifted from illustrating the story to designing actions within it.",
          "Across the experience, those actions gradually change as Oscar's journey unfolds:",
        ],
        image: {
          src: "/oscar-ar/moments.png",
          alt: "Five colored chevrons in sequence: 1 Enter, cross the threshold; 2 Listen, share a moment; 3 Connect, offer support; 4 Care, express care; 5 Let go, say goodbye",
          caption: "Five moments, one arc: enter, listen, connect, care, let go.",
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
            title: "From editor to device",
            paragraphs: [
              "I built the Unity project for iOS through Xcode and tested the experience with the physical book on a phone. Moving from the editor to a real device changed how I evaluated the design: camera angle, tracking stability, viewing distance, object scale, and the way the reader holds both the book and the phone all became part of the interaction.",
            ],
          },
          {
            title: "The working prototype",
            paragraphs: [
              "Five narrative moments, connected through one physical book and an interactive AR layer.",
            ],
            video: {
              src: "https://www.youtube-nocookie.com/embed/sJ8vCeXCPzo",
              title: "Oscar et la Dame Rose — working AR prototype",
              caption: "The working prototype, running on iOS with the printed book.",
            },
          },
        ],
      },
      {
        id: "take-forward",
        label: "What I Took Forward",
        paragraphs: [
          "Peer critique pointed to three areas to grow: refining the visual and modeling language so the scenes support the story's tone more consistently; testing in real parent–child reading contexts, where pacing, clarity, and emotional engagement can be observed as shared reading actually happens; and richer animation and sound, guiding attention and deepening emotional resonance at key moments.",
          "Building this project gave me an early opportunity to work across interaction design and implementation. As I moved from sketches into Unity, each interaction became more specific: a gesture required input logic, an animation required states and timing, and an AR scene required careful relationships between physical and digital space. Working through these details helped me understand interaction at the level of behavior — how an experience responds, transitions, and communicates feedback, and how technical decisions shape what the reader ultimately experiences.",
          "This project also established a workflow that I continue to develop today: moving between design intent, interaction behavior, and implementation, and using working prototypes to explore these relationships together. As AI tools continue to lower the barrier to building, I find this ability increasingly important — being able to define how an experience should behave, translate that intent into a working system, and critically evaluate what gets built.",
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
          "这让我把 AR 看作在阅读中创造小小参与时刻的方式：它只在选定的时刻出现，书仍然是书。",
        ],
        quote:
          "AR 怎样帮助读者参与故事中情感重要的时刻，同时让纸质书留在体验的中心？",
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
          "我没有把这本书做成一连串的动画场景，而是挑出那些读者参与能加强叙事意义的时刻。每一个时刻，我都先问：读者能做一件什么事，让这一刻更有意义？设计过程也由此从呈现故事，转向在故事里设计动作。",
          "随着 Oscar 的旅程展开，这些动作也在逐渐变化：",
        ],
        image: {
          src: "/oscar-ar/moments.png",
          alt: "五个彩色箭头依次排列：1 进入，跨过门槛；2 聆听，分享一个时刻；3 连结，给予支持；4 关照，表达关心；5 放手，说再见",
          caption: "五个时刻，一条弧线：进入、聆听、连结、关照、放手。",
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
            title: "从编辑器到真机",
            paragraphs: [
              "我通过 Xcode 把 Unity 项目构建到 iOS，在手机上拿着实体书测试。从编辑器走到真实设备，改变了我评估设计的方式：摄像头角度、追踪稳定性、观看距离、物件大小，还有读者同时拿着一本书和一部手机这件事本身，都成了交互的一部分。",
            ],
          },
          {
            title: "跑起来的原型",
            paragraphs: [
              "五个叙事时刻，由一本实体书和一个可交互的 AR 层连在一起。",
            ],
            video: {
              src: "https://www.youtube-nocookie.com/embed/sJ8vCeXCPzo",
              title: "Oscar et la Dame Rose——跑起来的 AR 原型",
              caption: "跑起来的原型：在 iOS 上配合实体书运行。",
            },
          },
        ],
      },
      {
        id: "take-forward",
        label: "带走的收获",
        paragraphs: [
          "同伴评审指出了三个可以继续打磨的方向：让场景的视觉与建模语言更统一地承载故事的语气；在真实的亲子共读场景中测试，观察共同阅读实际发生时，节奏、清晰度和情感投入是否成立；在关键时刻用更丰富的动画和声音，引导注意力，加深情感共鸣。",
          "这个项目让我很早就同时做交互设计和实现。从草图走进 Unity，每个交互都变得具体：一个手势需要输入逻辑，一个动画需要状态和时机，一个 AR 场景需要仔细处理物理空间与数字空间之间的关系。把这些细节一一做下来，让我在行为的层面上理解交互——一个体验如何回应、如何过渡、如何传递反馈，以及技术决定如何塑造读者最终感受到的东西。",
          "它也定下了一个我沿用至今的工作方式：在设计意图、交互行为和实现之间来回移动，用能跑起来的原型把这三者放在一起探索。随着 AI 工具不断降低构建的门槛，我越来越觉得这种能力重要：能够定义一个体验应该如何行为，把意图译成能运作的系统，并审慎地评估最终做出来的东西。",
        ],
      },
    ],
  },
];
