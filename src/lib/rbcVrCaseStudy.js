/**
 * RBC No.505 — VR learning prototype (EN + ZH).
 * Rewritten from the Notion page (Nov 2026). Positioning on the 3D shelf:
 * Oscar = design + build, Procedural = technical craft, this one =
 * spatial UX — turning invisible science into an embodied flow, and
 * moving from a 2D flow to prototyping on the target platform (VR).
 * Trimmed on purpose: the AI-tooling pitch and literature quotes are
 * reduced to one line in the reflection; the walkthrough keeps only
 * the screens that carry a decision.
 * Media is self-hosted under public/research-craft/rbc-505/.
 */

const BASE = "/research-craft/rbc-505";

export const RBC_SUMMARY = [
  "RBC No.505 is a VR learning prototype about how red blood cells pick up oxygen and drop off carbon dioxide. The learner becomes a red blood cell and, guided by a cell called No.505, travels from the heart to the lungs and makes the exchange themselves.",
  "I designed the experience structure and the interaction (the animation was made by a collaborating animator): turning cardiovascular science into a flow, prototyping it in 2D, then prototyping it inside a headset with ShapesXR, where spatial details can be judged more accurately than in 2D.",
];

export const RBC_SUMMARY_ZH = [
  "RBC No.505 是一个 VR 学习原型，讲红细胞怎样带上氧气、放下二氧化碳。学习者自己变成一个红细胞，跟着一个叫 No.505 的红细胞，从心脏走到肺，亲手完成这次交换。",
  "我负责体验结构和交互（动画由合作的动画师制作）：把心血管的科学知识整理成一条流程，先在 2D 里做原型，再用 ShapesXR 直接在头显里做原型——空间上的细节，在目标平台上判断更准确。",
];

export const RBC_FACTS = [
  { label: "Role", lines: ["UX & prototyping", "Designed the 2D flow and 3D prototype", "Animation by a collaborating animator"] },
  { label: "Tools", lines: ["Figma", "ShapesXR"] },
  { label: "Output", lines: ["Learning flow", "2D prototype", "ShapesXR prototype"] },
  { label: "Timeline", lines: ["Feb – Apr 2025"] },
];

export const RBC_FACTS_ZH = [
  { label: "角色", lines: ["UX 与原型", "独立设计 2D 流程和 3D 原型", "动画由合作的动画师完成"] },
  { label: "工具", lines: ["Figma", "ShapesXR"] },
  { label: "产出", lines: ["学习流程", "2D 原型", "ShapesXR 原型"] },
  { label: "时间", lines: ["2025 年 2 – 4 月"] },
];

// Story chapters over the sections (by section id), shared by EN + ZH.
export const RBC_DETAIL_CHAPTERS = [
  { id: "context", label: "Context", labelZh: "背景", sections: ["challenge", "why-vr", "structure"] },
  { id: "science", label: "Science → design", labelZh: "从科学到设计", sections: ["translation"] },
  { id: "flow-2d", label: "2D flow", labelZh: "2D 流程", sections: ["flow-2d", "gap"] },
  { id: "flow-3d", label: "3D prototype", labelZh: "3D 原型", sections: ["prototype-3d"] },
  { id: "reflection", label: "Reflection", labelZh: "反思", sections: ["take-forward"] },
];

export const RBC_DETAIL_SECTIONS = [
  {
    id: "challenge",
    label: "The challenge",
    paragraphs: [
      "Red blood cells carry oxygen and carbon dioxide around the body, but the exchange happens at a scale no one sees. For someone without a medical background, it stays a sentence in a textbook.",
      "Finding the science wasn’t the hard part. The hard part was deciding what a learner should do with it — and where in space they should be when it happens.",
    ],
    quote: "How do you turn a process no one can see into something a learner can do?",
    videos: [
      {
        src: `${BASE}/final-animation.mp4`,
        aspect: "landscape",
        caption: "The biomedical animation that opens and closes the experience, made by a collaborating animator.",
      },
    ],
  },
  {
    id: "why-vr",
    label: "Why VR, and why first person",
    items: [
      {
        title: "Why VR",
        paragraphs: [
          "Gas exchange happens at a scale no one can see, in a place no one can go. A diagram shows it from the outside. VR can put the learner inside it — in the heart, at the size of a cell.",
          "Research supports this for science learning: immersive VR has been found to improve retention and engagement compared with video instruction (Makransky et al., 2022).",
        ],
      },
      {
        title: "Why first person",
        paragraphs: [
          "The learner doesn’t watch a red blood cell; they are one. Their cell starts dark red and turns bright red only after they drag the carbon dioxide away themselves, next to No.505, who has already changed. The change happens to them, so cause and effect is hard to miss.",
          "It also makes the key moment something the learner does, not a scene they watch — an active, generative task, which research links to better understanding of biological processes (Fiorella & Mayer, 2019).",
        ],
      },
    ],
  },
  {
    id: "structure",
    label: "Animation, then VR, then animation",
    paragraphs: [
      "The first decision was structural: how much of this should be immersive at all. VR on its own is engaging but heavy — not every concept is easy to read in 3D. Animation on its own is clear but passive.",
      "So the experience is a sandwich. An animation sets up the concepts, VR lets the learner live through them, and a closing animation puts what they did back into the bigger picture.",
    ],
    tables: [
      {
        headers: ["Approach", "Strength", "Cost"],
        rows: [
          ["VR only", "First-person, memorable", "High cognitive load; some ideas don’t read well in 3D"],
          ["Animation only", "Clear, structured, accessible", "Passive; lower engagement and retention"],
          ["Animation → VR → animation", "Structure before and after, immersion in the middle", "Two transitions to design carefully"],
        ],
        caption: "Why the experience starts and ends outside VR.",
      },
    ],
  },
  {
    id: "translation",
    label: "From science to interaction",
    paragraphs: [
      "Before designing anything, I studied how blood moves through the heart’s chambers, valves, and vessels, and mapped circulation as a sequence of transitions: chamber to valve, valve to the lungs, back into the body.",
      "Valves and vessels — the vena cava, pulmonary artery, aorta — set the direction of flow and stop it from going backwards. That became the pacing of the experience: one region at a time, always forward.",
    ],
    tables: [
      {
        headers: ["What the science says", "What the design does"],
        rows: [
          ["Blood flows one way through valves", "The flow is one-way; there is no going back a step"],
          ["Exchange happens in the capillaries of the lungs", "The one hands-on moment is the exchange itself"],
          ["Circulation is a loop", "The experience closes by sending the cell back out, not by stopping"],
        ],
        caption: "Each scientific fact became a rule for the flow.",
      },
    ],
  },
  {
    id: "flow-2d",
    label: "The 2D flow",
    paragraphs: [
      "I prototyped the flow in Figma from the learner’s point of view. A countdown and arrow cues ease the switch into VR; a location indicator and region colors keep the learner oriented; the exchange ends with the learner’s cell turning bright red, like No.505’s.",
    ],
    screensLayout: "wide",
    screens: [
      { src: `${BASE}/countdown.png`, alt: "Animation frame with a countdown before the switch to VR", caption: "A countdown before switching from animation to VR." },
      { src: `${BASE}/cue-arrows.png`, alt: "VR view with arrow cues", caption: "Arrows show where to look first." },
      { src: `${BASE}/first-person.png`, alt: "First-person view inside the right ventricle with No.505 and a location indicator", caption: "First person in the right ventricle; location in the corner." },
      { src: `${BASE}/teleport.png`, alt: "View after teleporting to the valve", caption: "Click the valve to teleport; the camera refocuses on it." },
      { src: `${BASE}/region-color.png`, alt: "New heart region with a different background color", caption: "Each region has its own background color." },
      { src: `${BASE}/gas-exchange.png`, alt: "Dragging carbon dioxide away in the lungs while No.505 is bright red", caption: "Drag CO₂ away; No.505 is already bright red." },
      { src: `${BASE}/color-shift.png`, alt: "The learner’s cell turned bright red after the exchange", caption: "When done, the learner’s cell turns bright red too." },
    ],
  },
  {
    id: "gap",
    label: "What a 2D prototype can’t show",
    paragraphs: [
      "The 2D flow worked for deciding the order and content of each step. Its limit is space: depth, scale, orientation, and the learner’s own movement all change how an interaction reads in VR. A button that’s clear on a frame might sit behind the learner, too far away, or too close to read. Peer critique pointed to the same gap.",
      "So the next step was prototyping on the target platform, inside a headset.",
    ],
    quote: "2D settles the order; spatial details are judged more accurately in the headset.",
  },
  {
    id: "prototype-3d",
    label: "Prototyping in ShapesXR",
    paragraphs: [
      "ShapesXR let me lay out and test scenes inside a headset without a Unity build. I asked for feedback on two things — whether navigation cues were clear, and how information was organized in space — and changed three things:",
    ],
    list: [
      "A button instead of a laser: the learner advances the dialogue with the controller’s A button, instead of aiming a laser at a “Next” button. No precise aiming, so moving on takes less time. There’s no skip, so no one misses the science.",
      "Confirming the press: buttons have idle, pressed, and released states, so every press gets an immediate answer.",
      "Where the UI lives: location stays fixed in the upper-right of the view, always in the same place. Dialogue panels sit on the anatomy and turn to face the learner, so wherever they stand, the text stays readable and stays next to the part of the heart it explains — something a flat screen can’t do.",
    ],
    screensLayout: "wide",
    screens: [
      { src: `${BASE}/audio-animation.png`, alt: "No.505 speaking in the right ventricle, with an A button prompt on the dialogue panel", caption: "Press A to continue — no laser aiming." },
      { src: `${BASE}/a-button.png`, alt: "Dialogue beside No.505, with a Valve label marking the next stop", caption: "A label marks the valve, the next stop." },
      { src: `${BASE}/press-idle.png`, alt: "Button in its idle state", caption: "Button: idle." },
      { src: `${BASE}/press-down.png`, alt: "Button in its pressed state", caption: "Button: pressed." },
      { src: `${BASE}/press-release.png`, alt: "Button in its released state", caption: "Button: released." },
    ],
  },
  {
    id: "take-forward",
    label: "What I took forward",
    items: [
      {
        title: "Prototype on the target platform",
        paragraphs: [
          "A 2D flow is good for deciding the order of steps. Where UI sits, how a cue reads, and how a press feels are judged more accurately inside the headset.",
        ],
      },
      {
        title: "Design for the device in hand",
        paragraphs: [
          "On a screen, clicking “Next” costs nothing. In VR, aiming a laser at a small button takes precision and time; the controller’s A button doesn’t. Space also allows things a screen can’t, like panels that turn to face the learner. Interactions should be chosen for the platform and input device, not carried over from 2D.",
        ],
      },
      {
        title: "Next",
        list: [
          "Add sound and animation to guide learners to the next stop, as critique suggested.",
          "Test with first-time learners: can they find the valve on their own, and does the color change read as learning or as decoration?",
        ],
      },
    ],
  },
];

export const RBC_DETAIL_SECTIONS_ZH = [
  {
    id: "challenge",
    label: "挑战",
    paragraphs: [
      "红细胞在全身运送氧气和二氧化碳，但这场交换发生在谁也看不见的尺度上。对没有医学背景的人来说，它只是课本里的一句话。",
      "科学知识不难找。难的是决定学习者要拿它做什么——以及事情发生时，他们人在空间里的哪里。",
    ],
    quote: "一个谁也看不见的过程，怎样变成学习者可以亲手做的事？",
    videos: [
      {
        src: `${BASE}/final-animation.mp4`,
        aspect: "landscape",
        caption: "体验开头和结尾播放的生物医学动画，由合作的动画师制作。",
      },
    ],
  },
  {
    id: "why-vr",
    label: "为什么是 VR，为什么是第一人称",
    items: [
      {
        title: "为什么是 VR",
        paragraphs: [
          "气体交换发生在一个谁也看不见、谁也去不了的尺度和地方。图示只能从外面看它；VR 能把学习者放进去——在心脏里，和细胞一样大。",
          "研究也支持这一点：在科学学习中，沉浸式 VR 比视频教学更有助于记忆和投入（Makransky 等，2022）。",
        ],
      },
      {
        title: "为什么是第一人称",
        paragraphs: [
          "学习者不是在看一个红细胞，而是自己就是红细胞。他的细胞一开始是暗红色，只有亲手把二氧化碳拖走之后才变成鲜红；旁边的 No.505 已经先变了。变化发生在「自己」身上，因果关系就很难错过。",
          "这也让关键时刻变成学习者亲手做的事，而不是看的一段画面。研究表明，这类主动的生成式学习活动，能帮助理解生物过程（Fiorella & Mayer，2019）。",
        ],
      },
    ],
  },
  {
    id: "structure",
    label: "动画—VR—动画",
    paragraphs: [
      "第一个决定是结构上的：到底有多少内容该放进沉浸式体验里。只用 VR 有吸引力，但负担重——不是每个概念放进 3D 都好读；只用动画清楚，却很被动。",
      "所以整个体验像一个三明治：开头的动画先把概念铺好，中间的 VR 让学习者亲身经历，结尾的动画再把他们做过的事放回更大的图景里。",
    ],
    tables: [
      {
        headers: ["做法", "优点", "代价"],
        rows: [
          ["只用 VR", "第一人称，记得住", "认知负担重；有些概念在 3D 里不好读"],
          ["只用动画", "清楚、有结构、人人看得懂", "被动；投入度和记忆都更低"],
          ["动画 → VR → 动画", "前后有结构，中间有沉浸", "两次切换需要仔细设计"],
        ],
        caption: "为什么体验在 VR 之外开始、也在 VR 之外结束。",
      },
    ],
  },
  {
    id: "translation",
    label: "从科学到交互",
    paragraphs: [
      "动手设计之前，我先弄清血液怎样流过心脏的心房心室、瓣膜和血管，把循环画成一串过渡：从心室到瓣膜，从瓣膜到肺，再回到全身。",
      "瓣膜和血管——上下腔静脉、肺动脉、主动脉——决定了血流的方向，也防止它倒流。这成了整个体验的节奏：一次一个区域，只往前走。",
    ],
    tables: [
      {
        headers: ["科学上是什么", "设计上怎么做"],
        rows: [
          ["血液经瓣膜单向流动", "流程单向，不能退回上一步"],
          ["交换发生在肺部毛细血管", "唯一一次动手的时刻，就是交换本身"],
          ["循环是一个环", "体验以细胞再次出发收尾，而不是戛然而止"],
        ],
        caption: "每一条科学事实，都变成流程里的一条规则。",
      },
    ],
  },
  {
    id: "flow-2d",
    label: "2D 流程",
    paragraphs: [
      "我先在 Figma 里按学习者的视角做出整条流程。倒计时和箭头让切换进 VR 更平稳；位置提示和区域颜色让学习者不迷失方向；交换完成时，学习者的细胞和 No.505 一样变成鲜红。",
    ],
    screensLayout: "wide",
    screens: [
      { src: `${BASE}/countdown.png`, alt: "切换到 VR 前带倒计时的动画画面", caption: "从动画切到 VR 前的倒计时。" },
      { src: `${BASE}/cue-arrows.png`, alt: "带箭头提示的 VR 画面", caption: "箭头指出先看哪里。" },
      { src: `${BASE}/first-person.png`, alt: "右心室里的第一人称视角，有 No.505 和位置提示", caption: "右心室里的第一人称，角落显示位置。" },
      { src: `${BASE}/teleport.png`, alt: "传送到瓣膜后的画面", caption: "点击瓣膜即传送，镜头重新对准它。" },
      { src: `${BASE}/region-color.png`, alt: "换了背景色的新心脏区域", caption: "每个区域有自己的背景色。" },
      { src: `${BASE}/gas-exchange.png`, alt: "在肺部拖走二氧化碳，No.505 已是鲜红色", caption: "拖走 CO₂；No.505 已经是鲜红色。" },
      { src: `${BASE}/color-shift.png`, alt: "交换后学习者的细胞变成鲜红", caption: "完成后，学习者的细胞也变成鲜红。" },
    ],
  },
  {
    id: "gap",
    label: "2D 原型的局限",
    paragraphs: [
      "2D 流程适合确定每一步的顺序和内容。它的局限在空间上：深度、尺度、朝向和学习者自己的移动，都会改变一个交互在 VR 里的样子。一帧画面上很清楚的按钮，可能在学习者身后、离得太远，或者近到看不清。同伴评审也指出了这一点。",
      "所以下一步，是直接在目标平台——头显里——做原型。",
    ],
    quote: "2D 定顺序；空间上的细节，在头显里判断更准确。",
  },
  {
    id: "prototype-3d",
    label: "在 ShapesXR 里做原型",
    paragraphs: [
      "ShapesXR 让我不用 Unity 构建，就能直接在头显里布置和试场景。我就两件事要反馈——导航提示清不清楚、信息在空间里怎么组织——然后改了三处：",
    ],
    list: [
      "用 A 键代替激光：学习者直接按手柄上现成的 A 键推进对白，不用拿激光对准「下一步」按钮点击。不需要精确对齐，往下走更快。不设跳过，免得错过科学内容。",
      "确认按下去了：按钮有未按、按下、松开三个状态，每次按压都立刻有回应。",
      "界面放在哪：位置信息固定在视野右上角，永远在同一个地方。对话框挂在解剖结构上，并始终转向学习者——不管人站在哪，文字都读得清，也始终贴着它所讲的那部分心脏。这是平面屏幕做不到的。",
    ],
    screensLayout: "wide",
    screens: [
      { src: `${BASE}/audio-animation.png`, alt: "右心室里 No.505 在说话，对话框上有 A 键提示", caption: "按 A 继续，不用激光对准。" },
      { src: `${BASE}/a-button.png`, alt: "No.505 旁的对话框，Valve 标签标出下一站", caption: "标签标出下一站：瓣膜。" },
      { src: `${BASE}/press-idle.png`, alt: "按钮未按下的状态", caption: "按钮：未按。" },
      { src: `${BASE}/press-down.png`, alt: "按钮按下的状态", caption: "按钮：按下。" },
      { src: `${BASE}/press-release.png`, alt: "按钮松开的状态", caption: "按钮：松开。" },
    ],
  },
  {
    id: "take-forward",
    label: "带走的收获",
    items: [
      {
        title: "在目标平台上做原型",
        paragraphs: [
          "2D 流程适合决定步骤的顺序。界面放在哪、提示读起来怎样、按下去是什么感觉，在头显里判断更准确。",
        ],
      },
      {
        title: "按手里的设备设计交互",
        paragraphs: [
          "在屏幕上，点「下一步」几乎没有成本；在 VR 里，拿激光对准一个小按钮需要精度和时间，手柄上的 A 键则不用。空间也能做到屏幕做不到的事，比如始终转向学习者的对话框。交互要按平台和操作设备来选，而不是从 2D 直接搬过去。",
        ],
      },
      {
        title: "下一步",
        list: [
          "按评审的建议，加入声音和动画，引导学习者找到下一站。",
          "找第一次接触的学习者测试：能不能自己找到瓣膜？颜色的变化被当成学到的东西，还是只是装饰？",
        ],
      },
    ],
  },
];
