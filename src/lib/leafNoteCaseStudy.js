/**
 * Leaf Note native case-study body (EN + ZH).
 * Rewritten from the Notion page, with research tables, journey maps,
 * evaluation criteria, coded-experience videos, UI boards, and system shots.
 */

const ASSUMPTIONS_TABLE_EN = {
  headerColumn: true,
  headers: [
    "Initial assumptions",
    "What I learned",
    "Revised understanding",
    "Change",
  ],
  rows: [
    [
      "1. Casual plant owners may rely on rough judgment rather than a consistent care system.",
      "The owner watched for soft leaves or an empty watering can. The caregiver mixed a few instructions with what they could see in the soil.",
      "It wasn’t random — just informal rules people could still recognize. Nobody was running a precise schedule.",
      "Sharpened",
    ],
    [
      "2. Without a visible care history, owners may feel uncertain about what has already been done.",
      "A simple completion message was considered sufficient for routine watering. Neither conversation clearly demonstrated a need for a detailed, long-term history.",
      "Knowing what’s due now may matter more than a full archive. Whether people need long history is still open.",
      "Narrower",
    ],
    [
      "3. When care changes hands, instructions may transfer more easily than the context behind them.",
      "The caregiver received basic instructions but still needed information about watering methods, pot setups, stopping cues, and abnormal conditions. The amount of information needed also changed with the number and variety of plants.",
      "A useful handoff has to carry the practical details, not just a to-do. How much detail depends on how many plants and how unfamiliar the caregiver is.",
      "Sharpened",
    ],
    [
      "4. Even after delegating the task, owners may continue carrying the planning and follow-up responsibility.",
      "The temporary caregiver expected the owner to remember the schedule and provide reminders. However, the other plant owner delegated one plant without repeated follow-up. The two handoffs involved different levels of complexity.",
      "Responsibility doesn’t always stick with the owner. It shifts with how many plants, how well the caregiver knows them, and how long the care lasts.",
      "It depends",
    ],
    [
      "I hadn’t framed this: routine care and something looking wrong may need different kinds of messages.",
      "Routine watering only needed a short “done.” When a plant looked off, people wanted a photo, more context, or a second opinion.",
      "Keep everyday confirmation light; give exceptions a clearer path to report.",
      "New",
    ],
  ],
  caption: "What held, what shrank, what depends on the situation, and what I hadn’t named yet.",
};

const ASSUMPTIONS_TABLE_ZH = {
  headerColumn: true,
  headers: ["最初假设", "我学到什么", "修正后的理解", "变化"],
  rows: [
    [
      "1. 随性的养植人可能靠粗略判断，而不是一套稳定的照料系统。",
      "主人用熟悉的线索，比如叶片发软或水壶空了。照料者也把基本说明与可观察的条件（土壤干湿、是否积水）合在一起用。",
      "他们的决定并不只是粗糙或随机，而是靠非正式但可辨认的线索规则，而不是精确日程或计量。",
      "更清楚了",
    ],
    [
      "2. 没有可见的照料历史时，主人可能不确定已经做过什么。",
      "日常浇水时，一句完成消息就被认为够用。两次对话都没有清楚证明需要详细的长期历史。",
      "现在该做什么，可能比完整档案更要紧。要不要长期历史，还说不准。",
      "范围更小",
    ],
    [
      "3. 照料换手时，说明比背后的情境更容易交接。",
      "照料者拿到了基本说明，但仍需要浇水方式、花盆设置、停止线索和异常情况。需要多少信息，也随植物数量与种类变化。",
      "有用的交接得带上能照着做的细节，不能只丢一张待办。细节多少，看植物有多少、照料者熟不熟。",
      "更清楚了",
    ],
    [
      "4. 即使委托了任务，主人仍可能继续承担排程与跟进责任。",
      "临时照料者期望主人记得日程并提醒。另一位主人交接一株植物时却没有反复跟进。两次交接的复杂度不同。",
      "责任不一定一直挂在主人身上。植物多少、照料者熟不熟、托多久，都会让分工不一样。",
      "看情况",
    ],
    [
      "一开始没写进假设：日常照料和「看起来不对」可能需要不同的说话方式。",
      "日常浇水只要一句「浇好了」。植物看起来不对时，大家会想要照片、更多上下文，或者再问一个人。",
      "日常确认保持轻；异常要有更清楚的上报路径。",
      "后来才看到",
    ],
  ],
  caption: "哪些站得住、哪些变窄了、哪些要看情况，以及我一开始没叫上名的一点。",
};

const EVALUATION_TABLE_EN = {
  headers: ["What I’m aiming for", "It works if…", "I’d watch for…"],
  rows: [
    [
      "The caregiver gets enough to act",
      "What they think they should do matches what the owner meant to leave behind.",
      "Misread instructions; questions that shouldn’t still need answering; gaps in pot setup or stopping cues",
    ],
    [
      "Both people know who’s on the hook",
      "It’s obvious who does the next check, and who only follows along.",
      "Hesitation about “is this mine?”; reminders that feel like nagging; work that falls between them",
    ],
    [
      "Everyday care stays easy",
      "The caregiver can finish a routine check without hunting through the app.",
      "Extra taps; lost confidence; time spent figuring out the UI instead of the plant",
    ],
  ],
  caption: "How I’d tell whether the prototype answers the reframed How Might We.",
};

const EVALUATION_TABLE_ZH = {
  headers: ["我想做到的", "怎样算成了", "我会看什么"],
  rows: [
    [
      "照料者有足够信息能动手",
      "他们以为该做的事，和主人想留下的说明对得上。",
      "读歪的说明；本不该再问的问题；花盆设置或「何时停」的缺口",
    ],
    [
      "两边都清楚谁负责下一步",
      "谁去做下一次检查、谁只是跟着看，一眼能分清。",
      "「这算我的吗」的犹豫；像在催人的提醒；掉在两人中间的活",
    ],
    [
      "日常照料仍然简单",
      "照料者能做完一次例行检查，而不用在应用里找半天。",
      "多余的点击；没把握；花在摸界面而不是看植物上的时间",
    ],
  ],
  caption: "我会怎样判断原型有没有回答重新框定的 How Might We。",
};

export const LEAF_NOTE_DETAIL_SECTIONS = [
  {
    id: "started",
    label: "How it started",
    paragraphs: [
      "Leaf Note began with my own experience. I enjoy having plants at home, but I am not an experienced plant owner — I mainly want to keep them alive without mastering plant care.",
      "My inconsistent routine became a larger problem when I traveled and asked someone else to look after them. The care instructions, watering history, and decisions I normally kept in my head were difficult to hand over.",
    ],
  },
  {
    id: "problem",
    label: "Initial problem",
    paragraphs: [
      "I had several types of houseplants, each with different watering needs. Remembering when and how much to water each one was difficult for me — and even harder to communicate when someone else took over.",
      "My first question was simpler: how do I remember different watering needs — and explain them when someone else takes over?",
      "Before designing a solution, I examined how I was currently caring for my plants — everyday care, and care handoff while traveling.",
    ],
    images: [
      {
        src: "/leaf-note/research-everyday.png",
        alt: "Journey map of everyday plant care: noticing, deciding, watering, and the mental load in between",
        caption: "1. Everyday care — examining my own routine",
      },
      {
        src: "/leaf-note/research-handoff.png",
        alt: "Journey map of handing off plant care while traveling, from preparing instructions to remote follow-up",
        caption: "2. Care handoff while traveling",
      },
    ],
    items: [
      {
        title: "Care relied on rough judgment",
        paragraphs: [
          "I did not follow precise schedules or keep detailed information about each plant. I relied on vague memory, visual cues, and simple personal rules to decide when and how much to water.",
        ],
      },
      {
        title: "Each action left no continuous history",
        paragraphs: [
          "Watering was treated as an isolated task. Without a record of what had happened, the next decision still depended on incomplete recollection.",
        ],
      },
      {
        title: "Handoff transferred the task, but not the responsibility",
        paragraphs: [
          "A temporary caregiver could perform the watering, but I still had to organize instructions, remember when care was needed, send reminders, and follow up without seeing the plants’ current condition.",
        ],
      },
      {
        title: "Repeated uncertainty created a low-level mental burden",
        paragraphs: [
          "No individual step felt especially difficult, but the combined uncertainty kept the experience between neutral and mildly frustrated — especially when I was away.",
        ],
      },
    ],
    closingQuote:
      "The task could be delegated, but the context and mental responsibility could not.",
  },
  {
    id: "research",
    label: "Broadening the perspective",
    paragraphs: [
      "Looking at my own routine only got me so far. Before designing, I wanted to hear from people who had owned several plants, handed care off, or been the temporary caregiver.",
      "I wrote down four starting bets, then talked with two people for about fifteen to twenty minutes each — short, recent stories, not a survey meant to prove a market need.",
    ],
    list: [
      "Casual owners may rely on rough judgment instead of a real care system.",
      "Without a visible history, owners may not know what has already been done.",
      "When care changes hands, instructions travel more easily than the context behind them.",
      "Even after handing the task off, owners may still hold the planning and follow-up.",
    ],
    items: [
      {
        title: "Who I talked with",
        paragraphs: [
          "Two people: experience with several plants, a care handoff, or being the temporary caregiver.",
          "Fifteen to twenty minutes, asynchronous, built around their most recent experience.",
        ],
      },
      {
        title: "How I read it",
        paragraphs: [
          "Two conversations aren’t proof of a universal need. I kept owner and caregiver stories apart first, then put them next to each other where the same themes showed up.",
          "Then I went back to the four bets and asked what still held, what got smaller, and what I hadn’t named yet.",
        ],
      },
    ],
  },
  {
    id: "assumptions",
    label: "Revisiting assumptions",
    paragraphs: [
      "What came through: people decide from cues they can see, not from precise schedules. Instructions only help if they say what to do next. How much support you need depends on how messy the handoff is. And a normal watering and a plant that looks wrong are not the same kind of message.",
      "The table below is how each starting bet shifted — including one pattern I hadn’t put on the list.",
    ],
    tables: [ASSUMPTIONS_TABLE_EN],
    list: [
      "Sharpened — still true, but more specific than I first wrote.",
      "Narrower — true in a smaller slice of situations than I expected.",
      "It depends — true for some handoffs, not others.",
      "New — showed up in the conversations; wasn’t in my original list.",
    ],
  },
  {
    id: "reframed",
    label: "Reframed problem",
    paragraphs: [
      "Handing off plant care can move the watering without moving the know-how — or the sense of who’s responsible.",
      "A temporary caregiver can usually water on a normal day. They still need clear cues for when to act, how to do it, and when something looks wrong enough to flag. More plants, more variety: memory and casual notes stop being enough, and the owner stays in the loop from afar.",
    ],
    quote:
      "How might we help someone who’s not a plant expert leave enough behind — and make clear who’s responsible — without turning everyday care into homework for the person covering?",
    list: [
      "Say what to do next, not everything you know about the plant",
      "Fit the structure to how complex the handoff actually is",
      "Say who’s responsible out loud",
      "Keep everyday checks light; make exceptions easy to spot",
    ],
  },
  {
    id: "experience",
    label: "Building it",
    paragraphs: [
      "Coding the prototype forced me to treat the handoff as one connected loop, not a pile of separate screens. Three recordings, from both sides:",
    ],
    videos: [
      {
        src: "/leaf-note/01-owner-hand-off.mp4",
        aspect: "landscape",
        caption:
          "Preparing the handoff — owner: select plants, set the care period, assign a caregiver, clarify pot setup, and share the plan.",
      },
      {
        src: "/leaf-note/02-caregiver-care.mp4",
        aspect: "landscape",
        caption:
          "Carrying out care — caregiver: review tasks, follow watering cues, confirm routine care, and report an abnormal condition with a photo.",
      },
      {
        src: "/leaf-note/03-owner-follow-along.mp4",
        aspect: "landscape",
        caption:
          "Following along — owner: stay oriented on what happened while away without reclaiming day-to-day follow-up.",
      },
    ],
  },
  {
    id: "interface",
    label: "Interface",
    paragraphs: [
      "The interface keeps owner and caregiver in one shared care model: preparing a handoff, carrying out care, staying oriented after the handoff without reclaiming the work, then managing plants and reading history.",
    ],
    items: [
      {
        title: "Owner prepares the handoff",
        paragraphs: [
          "Select which plants are included, set the care window, assign a caregiver, and review the plan before it leaves the owner’s hands.",
        ],
        image: {
          src: "/leaf-note/ui-owner-handoff.png",
          alt: "UI board: owner prepares a plant-care handoff across phone screens",
          caption: "Owner · preparing the handoff",
        },
      },
      {
        title: "Caregiver carries out care",
        paragraphs: [
          "Current and upcoming tasks, observable watering cues, routine confirmation, and a clearer path when something looks wrong.",
        ],
        image: {
          src: "/leaf-note/ui-caregiver.png",
          alt: "UI board: caregiver care tasks and confirmation flows",
          caption: "Caregiver · carrying out care",
        },
      },
      {
        title: "Responsibility after the handoff",
        paragraphs: [
          "Once care is shared, the owner no longer does the checks — but can still see what is due and nudge once a day. The caregiver gets one clear prompt that leads straight into the check, and a lightweight update closes the loop when the work is done.",
        ],
        image: {
          src: "/leaf-note/ui-responsibility.png",
          alt: "UI board: after handoff, owner sees overdue care and reminds once; caregiver gets a prompt into the check; an update closes the loop",
          caption: "Shared care · responsibility after the handoff",
        },
      },
      {
        title: "Managing plants",
        paragraphs: [
          "Plant profiles and care details stay modular, so the same information can appear in everyday care and in a handoff without being rewritten from scratch.",
        ],
        image: {
          src: "/leaf-note/ui-managing.png",
          alt: "UI board: managing plant profiles and care details",
          caption: "Managing plants",
        },
      },
      {
        title: "History, updates, and library",
        paragraphs: [
          "A lightweight record of what happened, updates between owner and caregiver, and a library that keeps plants findable after the handoff ends.",
        ],
        image: {
          src: "/leaf-note/ui-history.png",
          alt: "UI board: care history, updates, and plant library",
          caption: "History, updates, and library",
        },
      },
    ],
  },
  {
    id: "system",
    label: "Design system",
    paragraphs: [
      "A shared visual and interaction system keeps care information, inputs, and status language consistent across owner and caregiver views — so building in code stayed coherent as the flows grew.",
    ],
    image: {
      src: "/leaf-note/design-system.png",
      alt: "Leaf Note design system: type, color, components, and status patterns",
      caption: "Design system for the coded prototype",
    },
  },
  {
    id: "evaluate",
    label: "How I would evaluate",
    paragraphs: [
      "I’d go back to the reframed How Might We and ask whether the prototype actually answers it.",
    ],
    tables: [EVALUATION_TABLE_EN],
  },
];

export const LEAF_NOTE_DETAIL_SECTIONS_ZH = [
  {
    id: "started",
    label: "它怎么开始的",
    paragraphs: [
      "Leaf Note 从我自己的经验开始。我喜欢家里有植物，但不是资深养植人——我主要只想把它们养活，不必精通养护。",
      "日常不太规律的照料，在我出门、把植物托给别人时变得更难。平时记在脑子里的浇水说明、养护记录和判断，很难交接出去。",
    ],
  },
  {
    id: "problem",
    label: "最初的问题",
    paragraphs: [
      "家里有好几类植物，浇水需求各不相同。记住每株该何时浇、浇多少，对我已经不容易——交接给别人时更难说清楚。",
      "一开始问得更简单：不同植物的浇水，我怎么记得住——交给别人时又怎么说清楚？",
      "动手设计之前，我先看了自己当下怎么照料植物——日常照料，以及出行时的交接。",
    ],
    images: [
      {
        src: "/leaf-note/research-everyday.png",
        alt: "日常植物照料旅程图：察觉、决定、浇水，以及其间的心理负担",
        caption: "1. 日常照料——审视自己的习惯",
      },
      {
        src: "/leaf-note/research-handoff.png",
        alt: "出行时交接植物照料的旅程图：从准备说明到远程跟进",
        caption: "2. 出行时的照料交接",
      },
    ],
    items: [
      {
        title: "照料靠粗略判断",
        paragraphs: [
          "我没有精确日程，也很少为每株植物保留详细信息。多半靠模糊记忆、目测和几条个人规矩，决定何时浇、浇多少。",
        ],
      },
      {
        title: "每一次动作留不下连续记录",
        paragraphs: [
          "浇水被当成孤立任务。没有发生过什么的记录，下一次判断仍依赖不完整的回忆。",
        ],
      },
      {
        title: "交接转走了任务，却没转走责任",
        paragraphs: [
          "临时照料者可以动手浇水，但我仍要整理说明、记住何时该照料、反复提醒，并在看不见现状的情况下远程跟进。",
        ],
      },
      {
        title: "反复的不确定带来低强度负担",
        paragraphs: [
          "单一步骤并不特别难，合在一起的不确定却让体验停在中性与轻微烦躁之间——尤其在我出门时。",
        ],
      },
    ],
    closingQuote: "任务可以委托，但情境与心里的责任托不出去。",
  },
  {
    id: "research",
    label: "把视角拉开",
    paragraphs: [
      "光看自己的习惯不够。动手之前，我想听听养过好几株植物、交接过、或者当过临时照料者的人怎么说。",
      "我先写下四条起点判断，再和两个人各聊十几二十分钟——都是最近的具体事，不是想证明「市场需要这个」的问卷。",
    ],
    list: [
      "随性养植的人，可能靠感觉，而不是一套稳定系统。",
      "没有看得见的记录，主人可能不知道已经做过什么。",
      "照料换手时，说明比背后的情境更好交出去。",
      "活交出去了，排程和跟进可能还挂在主人身上。",
    ],
    items: [
      {
        title: "聊了谁",
        paragraphs: [
          "两个人：有多种植物经验，交接过，或当过临时照料者。",
          "十五到二十分钟，异步，围着他们最近一次经历聊。",
        ],
      },
      {
        title: "怎么看这些话",
        paragraphs: [
          "两段对话证明不了普遍需求。我先把主人和照料者的故事分开看，再在同一主题上对照。",
          "然后回到那四条判断：哪些还站得住，哪些变窄了，哪些是我一开始没写上的。",
        ],
      },
    ],
  },
  {
    id: "assumptions",
    label: "回看假设",
    paragraphs: [
      "听下来大致是：大家靠看得见的线索做决定，不是靠精确日程；说明得说清下一步才有用；交接越乱，需要的支持越多；日常浇水和「看起来不对」不是同一种消息。",
      "下表是每条起点判断怎么动的——包括一条我一开始没写进清单的。",
    ],
    tables: [ASSUMPTIONS_TABLE_ZH],
    list: [
      "更清楚了 — 还成立，但比我原先写的更具体。",
      "范围更小 — 只在比我预期更窄的情境里成立。",
      "看情况 — 有的交接成立，有的不成立。",
      "后来才看到 — 对话里冒出来的，原清单没有。",
    ],
  },
  {
    id: "reframed",
    label: "重新框定的问题",
    paragraphs: [
      "交接植物照料，可以把浇水这件事交出去，却未必把「怎么判断」和「谁负责」也交出去。",
      "临时照料者平常日子大多浇得动。他们仍需要清楚的线索：什么时候动手、怎么做、什么时候该说一声不对劲。植物越多、种类越杂，记性和随口叮嘱就越不够用，主人还得在远处跟着操心。",
    ],
    quote:
      "How might we：怎样帮不太会养植物的人留下够用的说明、把责任说清楚，又不把日常照料变成替班的人的功课？",
    list: [
      "说清下一步，别把植物百科塞过去",
      "交接有多复杂，结构就配多复杂",
      "谁负责，说出来",
      "日常检查保持轻；异常要容易看见",
    ],
  },
  {
    id: "experience",
    label: "做成能跑的",
    paragraphs: [
      "写成代码之后，交接不再是一串拆开的屏幕，而是一条连着的回路。三段录像，两边各看一遍：",
    ],
    videos: [
      {
        src: "/leaf-note/01-owner-hand-off.mp4",
        aspect: "landscape",
        caption:
          "准备交接——主人：选择植物、设定照料时段、指定照料者、说明花盆设置，并分享计划。",
      },
      {
        src: "/leaf-note/02-caregiver-care.mp4",
        aspect: "landscape",
        caption:
          "执行照料——照料者：查看任务、跟随浇水线索、确认日常照料，并用照片报告异常。",
      },
      {
        src: "/leaf-note/03-owner-follow-along.mp4",
        aspect: "landscape",
        caption:
          "远程跟进——主人：出门在外仍能看清发生了什么，而不必收回日常跟进。",
      },
    ],
  },
  {
    id: "interface",
    label: "界面",
    paragraphs: [
      "界面把主人与照料者放在同一套共享照料模型里：准备交接、执行照料、交接之后仍能跟住而不把活收回来，再管理植物与阅读历史。",
    ],
    items: [
      {
        title: "主人准备交接",
        paragraphs: [
          "选择纳入交接的植物、设定照料窗口、指定照料者，并在计划离开主人之手以前完成确认。",
        ],
        image: {
          src: "/leaf-note/ui-owner-handoff.png",
          alt: "界面板：主人准备植物照料交接",
          caption: "主人 · 准备交接",
        },
      },
      {
        title: "照料者执行照料",
        paragraphs: [
          "当前与即将到来的任务、可观察的浇水线索、日常确认，以及看起来不对时更清楚的上报路径。",
        ],
        image: {
          src: "/leaf-note/ui-caregiver.png",
          alt: "界面板：照料者任务与确认流程",
          caption: "照料者 · 执行照料",
        },
      },
      {
        title: "交接之后的责任",
        paragraphs: [
          "照料已经共享之后，主人不再亲自做检查——但仍能看到到期事项，并每天提醒一次。照料者收到一条清楚提示，直接进入检查；做完后用一条轻量更新把闭环收住。",
        ],
        image: {
          src: "/leaf-note/ui-responsibility.png",
          alt: "界面板：交接之后，主人看到逾期并提醒一次；照料者收到提示进入检查；更新收住闭环",
          caption: "共享照料 · 交接之后的责任",
        },
      },
      {
        title: "管理植物",
        paragraphs: [
          "植物档案与照料信息保持模块化，同一套信息既能用于日常照料，也能用于交接，而不必重写一遍。",
        ],
        image: {
          src: "/leaf-note/ui-managing.png",
          alt: "界面板：管理植物档案与照料细节",
          caption: "管理植物",
        },
      },
      {
        title: "历史、更新与资料库",
        paragraphs: [
          "轻量记录发生过什么、主人与照料者之间的更新，以及交接结束后仍能找到植物的资料库。",
        ],
        image: {
          src: "/leaf-note/ui-history.png",
          alt: "界面板：照料历史、更新与植物资料库",
          caption: "历史、更新与资料库",
        },
      },
    ],
  },
  {
    id: "system",
    label: "设计系统",
    paragraphs: [
      "共享的视觉与交互系统，让照料信息、输入与状态语言在主人与照料者视图之间保持一致——流程变多时，用代码搭建仍能连贯。",
    ],
    image: {
      src: "/leaf-note/design-system.png",
      alt: "Leaf Note 设计系统：字体、色彩、组件与状态模式",
      caption: "编码原型的设计系统",
    },
  },
  {
    id: "evaluate",
    label: "我会如何评估",
    paragraphs: [
      "我会回到重新框定的 How Might We，看这个原型有没有真正答上。",
    ],
    tables: [EVALUATION_TABLE_ZH],
  },
];
