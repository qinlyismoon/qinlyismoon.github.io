/**
 * Leaf Note native case-study body (EN + ZH).
 * Research → reframed HMW → screen walkthrough + two-phone handoff film →
 * managing plants + design system → evaluation.
 *
 * The design flows use screen rails. The handoff film shows both phones side
 * by side, with a link out to the live prototype.
 */

const S = "/work/leaf-note/screens/";
const scr = (flow, n, caption, alt) => ({
  src: `${S}${flow}-${String(n).padStart(2, "0")}.jpg`,
  caption,
  alt: alt ?? caption,
});

export const LEAF_NOTE_FACTS = [
  { label: "Role", lines: ["Product Designer & Engineer", "Solo: research, design, and build"] },
  { label: "Research", lines: ["My own care routine", "2 short interviews"] },
  { label: "Deliverables", lines: ["Coded web prototype", "Research synthesis"] },
  { label: "Timeline", lines: ["About 1 month", "2026"] },
];

export const LEAF_NOTE_FACTS_ZH = [
  { label: "角色", lines: ["产品设计师 & 工程实现", "独立完成：研究、设计、开发"] },
  { label: "研究", lines: ["我自己的照料习惯", "2 次简短访谈"] },
  { label: "交付物", lines: ["可运行的网页原型", "研究整理"] },
  { label: "时间", lines: ["约 1 个月", "2026"] },
];

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
      "1. Casual plant owners may rely on rough judgment, with no consistent care system.",
      "The owner watched for soft leaves or an empty watering can. The caregiver mixed a few instructions with what they could see in the soil.",
      "They followed informal rules that others could still recognize. Nobody ran a precise schedule.",
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
      "A useful handoff carries the practical details along with the to-do. How much detail depends on how many plants and how unfamiliar the caregiver is.",
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
      "1. 随性的养植人可能靠粗略判断照料，没有一套稳定的系统。",
      "主人用熟悉的线索，比如叶片发软或水壶空了。照料者也把基本说明与可观察的条件（土壤干湿、是否积水）合在一起用。",
      "他们靠的是非正式、但别人也认得出的线索规则，没有精确的日程或计量。",
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
      "有用的交接要连同待办，一起带上能照着做的细节。细节多少，看植物有多少、照料者熟不熟。",
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
      "Extra taps; lost confidence; time spent figuring out the UI",
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
      "多余的点击；没把握；时间都花在摸索界面上",
    ],
  ],
  caption: "我会怎样判断原型有没有回答重新框定的 How Might We。",
};

// Story chapters over the sections (by section id), shared by EN + ZH:
// the contents bar shows these, each opening onto its sections.
export const LEAF_NOTE_DETAIL_CHAPTERS = [
  { id: "start", label: "Starting point", labelZh: "起点", sections: ["started", "problem"] },
  {
    id: "research",
    label: "Research",
    labelZh: "研究",
    sections: ["research", "assumptions", "reframed"],
  },
  {
    id: "design",
    label: "Design",
    labelZh: "设计",
    sections: [
      "handoff",
      "caregiver",
      "following",
      "handoff-film",
      "managing",
      "system",
    ],
  },
  { id: "evaluate", label: "Evaluation", labelZh: "评估", sections: ["evaluate"] },
];

export const LEAF_NOTE_DETAIL_SECTIONS = [
  {
    id: "started",
    label: "Leaving plants behind",
    paragraphs: [
      "Leaf Note started with my own plants. I like having them at home, but I’m not good at caring for them. I just want to keep them alive without having to study plant care.",
      "As an international student, I’m often away from home for a while, so my plants end up with someone else. The watering notes, what I last did, and the judgment calls I usually keep in my head are hard to hand over.",
    ],
  },
  {
    id: "problem",
    label: "Remembering care",
    paragraphs: [
      "I had several types of houseplants, each with different watering needs. Remembering when and how much to water each one was difficult for me — and even harder to communicate when someone else took over.",
      "My first question was simpler: how do I remember different watering needs — and explain them when someone else takes over?",
      "Before designing a solution, I examined how I was currently caring for my plants — everyday care, and care handoff while traveling.",
    ],
    images: [
      {
        src: "/work/leaf-note/research-everyday.png",
        alt: "Journey map of everyday plant care: noticing, deciding, watering, and the mental load in between",
        caption: "1. Everyday care — examining my own routine",
      },
      {
        src: "/work/leaf-note/research-handoff.png",
        alt: "Journey map of handing off plant care while traveling, from preparing instructions to remote follow-up",
        caption: "2. Care handoff while traveling",
      },
    ],
    items: [
      {
        title: "I watered by feel",
        paragraphs: [
          "I had no schedule and no notes for each plant. I decided when and how much to water from memory, a look at the plant, and a few rules of my own.",
        ],
      },
      {
        title: "Nothing was written down",
        paragraphs: [
          "Each watering was a one-off. Next time, whether a plant needed water came down to whether I remembered the last time.",
        ],
      },
      {
        title: "After the handoff, the planning was still mine",
        paragraphs: [
          "A friend could do the watering. I still wrote the instructions, kept track of when each plant was due, and sent reminders, without being able to see how the plants looked.",
        ],
      },
      {
        title: "No step was hard, but I was never sure",
        paragraphs: [
          "Each step was easy. Not knowing whether it was done right stayed with me, especially while I was away.",
        ],
      },
    ],
    closingQuote:
      "I could hand off the watering. Knowing how to water, what had been done, and when to check stayed with me.",
  },
  {
    id: "research",
    label: "Interviews",
    paragraphs: [
      "Looking at my own routine only got me so far. Before designing, I wanted to hear from people who had owned several plants, handed care off, or been the temporary caregiver.",
      "I wrote down four starting bets, then talked with two people for about fifteen to twenty minutes each, about their most recent experience.",
    ],
    list: [
      "Casual owners may rely on rough judgment, with no real care system.",
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
    label: "Bets vs. findings",
    paragraphs: [
      "What came through: people decide from cues they can see. Instructions only help if they say what to do next. How much support you need depends on how messy the handoff is. And a normal watering and a plant that looks wrong call for different kinds of messages.",
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
    label: "The real problem",
    paragraphs: [
      "Handing off plant care can move the watering without moving the know-how — or the sense of who’s responsible.",
      "A temporary caregiver can usually water on a normal day. They still need clear cues for when to act, how to do it, and when something looks wrong enough to flag. More plants, more variety: memory and casual notes stop being enough, and the owner stays in the loop from afar.",
    ],
    quote:
      "How might we help someone who’s not a plant expert leave enough behind — and make clear who’s responsible — without turning everyday care into homework for the person covering?",
    list: [
      "Say only what the next step needs",
      "Fit the structure to how complex the handoff actually is",
      "Say who’s responsible out loud",
      "Keep everyday checks light; make exceptions easy to spot",
    ],
  },
  {
    id: "handoff",
    label: "Owner prepares the handoff",
    paragraphs: [
      "Hand off sits on the Care list. The owner picks the plants, enters the caregiver’s email, and sends one request. Until the caregiver accepts, those plants stay on the owner’s list, with an empty seat on each card.",
    ],
    screens: [
      scr("handoff", 1, "Care first — Hand off sits on the same list as today’s checks"),
      scr("handoff", 2, "Pick the plants that leave with this request"),
      scr("handoff", 3, "One email field, then Send request"),
      scr("handoff", 4, "Pending: still on Care, with a seat marked for the caregiver"),
      scr("handoff", 5, "Accepted: those plants leave Care; one row points to Shared"),
    ],
  },
  {
    id: "caregiver",
    label: "Caregiver carries out care",
    paragraphs: [
      "For the person covering, a check is a few questions they can answer by looking and touching. Soft or firm leaves, dry or damp soil: each answer narrows the next step until one action is left. When they finish, a photo goes back to the owner.",
    ],
    screens: [
      scr("caregiver", 1, "Shared opens on the request — Decline or Accept"),
      scr("caregiver", 2, "After accept: suggested checks for the plants in their care"),
      scr("caregiver", 3, "First cue: how do the leaves feel?"),
      scr("caregiver", 4, "Next cue: how does the soil feel?"),
      scr("caregiver", 5, "One action left — Time to water, then I watered it"),
      scr("caregiver", 6, "Photo attached; Done closes the check for the owner"),
    ],
  },
  {
    id: "following",
    label: "Owner follows along",
    paragraphs: [
      "Once Jordan takes over, Maya can still see which plants are due. If one seems forgotten, she taps Remind Jordan, once a day per plant. Jordan gets a pop-up for that plant and goes straight into the check. When he’s done, the record comes back to Maya with his name and a photo.",
    ],
    screens: [
      scr("following", 1, "Your handoffs: Jordan’s plants, due first"),
      scr("following", 2, "In Jordan’s care — one action: Remind Jordan"),
      scr("following", 3, "Sent; one reminder per plant per day"),
      scr("following", 4, "Jordan gets a pop-up: which plant, and Check now"),
      scr("following", 5, "Check now opens that plant’s check"),
      scr("following", 6, "The timeline shows who did what, with the photo"),
      scr("following", 7, "Updates: the photo, a heart, and a short thanks"),
    ],
  },
  {
    id: "handoff-film",
    label: "One handoff, both sides",
    paragraphs: [
      "The same handoff from start to finish, with Maya on the left and Jordan on the right: the request, the reminder, the check, and the photo coming back.",
    ],
    interactive: "ln-handoff-film",
  },
  {
    id: "managing",
    label: "Managing plants",
    paragraphs: [
      "Adding and editing a plant use the same sheet: pick a species, then add a label, place, and tray if you want.",
    ],
    screens: [
      scr("managing", 1, "Library filtered by where plants live"),
      scr("managing", 2, "Add plant: pick a species first"),
      scr("managing", 3, "Same sheet — optional label, place, and tray"),
      scr("managing", 4, "Plant page with care basics ready for checks and handoffs"),
      scr("managing", 5, "Edit uses the same sheet; Remove plant sits at the end"),
      scr("managing", 6, "Remove asks once before anything is deleted"),
    ],
  },
  {
    id: "system",
    label: "Design system",
    image: {
      src: "/work/leaf-note/design-system.png",
      alt: "Leaf Note design system: type, color, components, and status patterns",
    },
  },
  {
    id: "evaluate",
    label: "What I’d test",
    paragraphs: [
      "I’d go back to the reframed How Might We and ask whether the prototype actually answers it.",
    ],
    tables: [EVALUATION_TABLE_EN],
  },
];

export const LEAF_NOTE_DETAIL_SECTIONS_ZH = [
  {
    id: "started",
    label: "离家时的植物",
    paragraphs: [
      "Leaf Note 是从我自己养的植物开始的。我喜欢在家里养植物，但并不擅长，只想把它们养活，不想专门去研究养护。",
      "作为留学生，我经常要离开家一段时间，植物只能托给别人照看。平时我凭记性和手感浇水，真要交给别人时，怎么浇、上次什么时候浇的、什么时候该浇，都很难说清楚。",
    ],
  },
  {
    id: "problem",
    label: "记住怎么照料",
    paragraphs: [
      "家里有好几类植物，浇水需求各不相同。记住每株该何时浇、浇多少，对我已经不容易——交接给别人时更难说清楚。",
      "一开始问得更简单：不同植物的浇水，我怎么记得住——交给别人时又怎么说清楚？",
      "动手设计之前，我先看了自己当下怎么照料植物——日常照料，以及出行时的交接。",
    ],
    images: [
      {
        src: "/work/leaf-note/research-everyday.png",
        alt: "日常植物照料旅程图：察觉、决定、浇水，以及其间的心理负担",
        caption: "1. 日常照料——审视自己的习惯",
      },
      {
        src: "/work/leaf-note/research-handoff.png",
        alt: "出行时交接植物照料的旅程图：从准备说明到远程跟进",
        caption: "2. 出行时的照料交接",
      },
    ],
    items: [
      {
        title: "浇水靠感觉",
        paragraphs: [
          "我没有固定的浇水时间，也没给每盆植物记过笔记。什么时候浇、浇多少，靠的是记性、看一眼植物的样子，再加上几条自己的小规矩。",
        ],
      },
      {
        title: "浇过就没有记录",
        paragraphs: [
          "每次浇完就过去了。下次该不该浇，全看我还记不记得上次是什么时候。",
        ],
      },
      {
        title: "托给别人之后，安排还在我身上",
        paragraphs: [
          "朋友可以帮我浇水。说明还是我来写，哪盆什么时候该浇还是我来记，还要隔几天提醒一次，而我看不到植物现在是什么样。",
        ],
      },
      {
        title: "每一步都不难，只是一直没底",
        paragraphs: [
          "每一步都很简单，可我一直不确定做得对不对，人在外面的时候尤其如此。",
        ],
      },
    ],
    closingQuote: "浇水可以托给别人，可怎么浇、浇过没有、什么时候该看，还是得我自己记着。",
  },
  {
    id: "research",
    label: "访谈",
    paragraphs: [
      "光看自己的习惯不够。动手之前，我想听听养过好几株植物、交接过、或者当过临时照料者的人怎么说。",
      "我先写下四条起点判断，再和两个人各聊十几二十分钟，聊的都是他们最近一次的具体经历。",
    ],
    list: [
      "随性养植的人，可能靠感觉照料，没有一套稳定系统。",
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
    label: "假设与发现",
    paragraphs: [
      "听下来大致是：大家靠看得见的线索做决定；说明得说清下一步才有用；交接越乱，需要的支持越多；日常浇水和「看起来不对」需要不同的消息。",
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
    label: "真正的问题",
    paragraphs: [
      "交接植物照料，可以把浇水这件事交出去，却未必把「怎么判断」和「谁负责」也交出去。",
      "临时照料者平常日子大多浇得动。他们仍需要清楚的线索：什么时候动手、怎么做、什么时候该说一声不对劲。植物越多、种类越杂，记性和随口叮嘱就越不够用，主人还得在远处跟着操心。",
    ],
    quote:
      "How might we：怎样帮不太会养植物的人留下够用的说明、把责任说清楚，又不把日常照料变成替班的人的功课？",
    list: [
      "只说下一步需要的",
      "交接有多复杂，结构就配多复杂",
      "谁负责，说出来",
      "日常检查保持轻；异常要容易看见",
    ],
  },
  {
    id: "handoff",
    label: "主人准备交接",
    paragraphs: [
      "交接的入口就在 Care 列表上。主人勾选要交接的植物，填上照料者的邮箱，发出一条请求。对方接受之前，这些植物仍留在主人的列表里，每张卡片上留着一个空座位。",
    ],
    screens: [
      scr("handoff", 1, "先从 Care 出发——Hand off 和今日检查在同一列表"),
      scr("handoff", 2, "勾选这次请求要带走的植物"),
      scr("handoff", 3, "一个邮箱字段，然后发送请求"),
      scr("handoff", 4, "待接受：仍在 Care，座位已标给照料者"),
      scr("handoff", 5, "已接受：这些植物离开 Care；一行入口指向 Shared"),
    ],
  },
  {
    id: "caregiver",
    label: "照料者执行照料",
    paragraphs: [
      "对临时照料的人来说，一次检查就是几个看一看、摸一摸就能回答的问题。叶子软不软、土干不干：每个回答收窄下一步，直到只剩一个动作。做完后拍一张照片回给主人。",
    ],
    screens: [
      scr("caregiver", 1, "Shared 打开就是请求——拒绝或接受"),
      scr("caregiver", 2, "接受后：自己照料范围内的建议检查"),
      scr("caregiver", 3, "第一个线索：叶子摸起来怎样？"),
      scr("caregiver", 4, "下一个线索：土壤摸起来怎样？"),
      scr("caregiver", 5, "只剩一个动作——该浇水了，然后点「我浇过了」"),
      scr("caregiver", 6, "附上照片；点完成，检查对主人关闭"),
    ],
  },
  {
    id: "following",
    label: "主人远程跟进",
    paragraphs: [
      "Jordan 接手之后，Maya 还是能看到哪几盆该检查了。如果觉得哪盆被落下了，她可以点一下提醒 Jordan，每盆每天一次。Jordan 那边会弹出这盆植物，点进去就开始检查。浇完水，记录会带着 Jordan 的名字和照片回到 Maya 这里。",
    ],
    screens: [
      scr("following", 1, "你的交接：Jordan 照料的植物，到期的在前"),
      scr("following", 2, "在 Jordan 手里——只有一个动作：提醒 Jordan"),
      scr("following", 3, "已提醒；每株植物每天只能提醒一次"),
      scr("following", 4, "Jordan 收到弹窗：哪株植物，点「现在检查」"),
      scr("following", 5, "点进去就是这株植物的检查"),
      scr("following", 6, "时间线：谁做了什么，附带照片"),
      scr("following", 7, "更新：看到照片，点个心，说声谢谢"),
    ],
  },
  {
    id: "handoff-film",
    label: "一次交接，两边视角",
    paragraphs: [
      "从头到尾的一次交接，左边是 Maya，右边是 Jordan：发出请求、提醒、检查，再到照片回到 Maya 手里。",
    ],
    interactive: "ln-handoff-film",
  },
  {
    id: "managing",
    label: "管理植物",
    paragraphs: [
      "添加和编辑植物用同一张表：先选品种，标签、位置、托盘可以不填。",
    ],
    screens: [
      scr("managing", 1, "资料库按植物所在位置筛选"),
      scr("managing", 2, "添加植物：先选品种"),
      scr("managing", 3, "同一张表——可选标签、位置、托盘"),
      scr("managing", 4, "植物页带上照料要点，检查和交接都能用"),
      scr("managing", 5, "编辑还是这张表；删除在最下面"),
      scr("managing", 6, "删除前再问一次"),
    ],
  },
  {
    id: "system",
    label: "设计系统",
    image: {
      src: "/work/leaf-note/design-system.png",
      alt: "Leaf Note 设计系统：字体、色彩、组件与状态模式",
    },
  },
  {
    id: "evaluate",
    label: "要验证什么",
    paragraphs: [
      "我会回到重新框定的 How Might We，看这个原型有没有真正答上。",
    ],
    tables: [EVALUATION_TABLE_ZH],
  },
];
