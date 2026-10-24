/**
 * Whose Dreams Shape Tomorrow? — Youth Voices on Sustainability
 * Structure follows the team lead’s page; role is Phoebe’s. EN stays plain;
 * ZH is written as Chinese, not a line-by-line gloss of the English.
 */

const BASE = "/research-craft/whose-dreams";

export const WHOSE_DREAMS_DETAIL_SECTIONS = [
  {
    id: "overview",
    label: "Overview",
    paragraphs: [
      "High-school students imagined life in 2050, then built and filmed a small future town out of LEGO. Sustainability kept coming up as what they cared about most.",
    ],
    items: [
      {
        title: "Problem",
        paragraphs: [
          "Adults don’t always know how teens picture the future. Without that, it’s hard to run a workshop that gets honest answers—not just what they think we want to hear.",
        ],
      },
      {
        title: "What we did",
        paragraphs: [
          "Two co-design workshops. Students picked a theme that mattered to them, then turned it into stories and things they could show. Before meeting them, we tested the activities with ChatGPT and Claude as stand-in participants.",
        ],
      },
      {
        title: "My role & team",
        paragraphs: [
          "I joined ideation, took photos and notes in the sessions, and helped prepare the plan, materials, and activities.",
          "Team: Kahmin Ong (lead), Chip Orban, Jackie Brandon, Longyue Qin.",
        ],
      },
      {
        title: "When & what kind of work",
        paragraphs: [
          "January–April 2025. Design research, workshop planning and facilitation, then looking at what came out of the sessions.",
        ],
      },
    ],
    image: {
      src: `${BASE}/hero-workshop.jpg`,
      alt: "Easel pads labeled Sustainability and Connection with sticky notes",
      caption: "Boards from the theme debate.",
    },
  },
  {
    id: "objective",
    label: "Goal",
    paragraphs: [
      "See how teens imagine—and talk about—how we might live in 2050. In the workshops they chose a theme first, then explored that future through stories and hands-on making.",
      "We used ChatGPT and Claude to dry-run the activities before the real sessions.",
    ],
  },
  {
    id: "timeline",
    label: "Timeline",
    paragraphs: [
      "Roughly four months. A slow start, then recruiting and planning from late February. First workshop March 3, second March 17. After that we went through the notes and figured out how to share what we’d heard.",
      "Five students from the Dublin City Schools FIRST Robotics Team, ages 15–18 (four male, one female).",
    ],
  },
  {
    id: "tools",
    label: "Tools we designed",
    paragraphs: [
      "Crazy 8s, story-arc / storyboard sheets, and backcasting / forecasting worksheets. We wanted materials they’d actually use—enough structure to get started, enough room to invent.",
    ],
    images: [
      {
        src: `${BASE}/engagement-framework.jpg`,
        alt: "Board for planning how to work with students",
        caption: "Planning how to work with STEM students.",
      },
      {
        src: `${BASE}/ideation-clusters.jpg`,
        alt: "Moodboards for early themes",
        caption: "Theme clusters before the workshops.",
      },
    ],
  },
  {
    id: "workshop-1",
    label: "Workshop 1",
    paragraphs: [
      "Find one theme to focus on for 2050.",
    ],
    image: {
      src: `${BASE}/workshop1-bts.jpg`,
      alt: "Students and facilitator during Workshop 1",
      caption: "Workshop 1.",
    },
    items: [
      {
        title: "Activity 1 — Crazy 8s",
        paragraphs: [
          "Timed rounds to dump as many topic ideas as possible. More time usually meant more ideas. They brought up remote work, food, healthcare, and more.",
        ],
        list: [
          "Remote work",
          "Routine office jobs replaced by AI",
          "Less landfill",
          "More sustainability",
          "Better food systems",
          "Better transport",
          "Easier travel across countries",
          "Talking across languages",
          "Better healthcare",
        ],
        image: {
          src: `${BASE}/workshop1-crazy8.jpg`,
          alt: "Crazy 8s worksheet",
          caption: "Crazy 8s.",
        },
      },
      {
        title: "Activity 2 — Group & vote",
        paragraphs: [
          "They sorted sticky notes into named piles, then voted. Two themes won: Sustainability and Connection.",
          "Sustainability: waste, renewable energy, climate, and not much time left.",
          "Connection: talking and working with people elsewhere, so ideas can actually travel.",
        ],
        image: {
          src: `${BASE}/workshop1-hive-map.jpg`,
          alt: "Theme map from clustering",
          caption: "Sorting themes.",
        },
      },
      {
        title: "Activity 3 — Debate",
        paragraphs: [
          "They argued which one mattered more for 2050. They landed on a middle ground: sustainability awareness—care about the environment, and say it in a way that helps people act together.",
        ],
        image: {
          src: `${BASE}/workshop1-pitch.jpg`,
          alt: "Pitch notes from Workshop 1",
          caption: "Pitches and feedback.",
        },
      },
    ],
  },
  {
    id: "workshop-1-findings",
    label: "What Workshop 1 showed",
    items: [
      {
        title: "The clock feels short",
        paragraphs: [
          "Waste, climate, landfills—they talked about these as things that need action now.",
        ],
      },
      {
        title: "Talking still matters",
        paragraphs: [
          "Even when they stressed urgency, they said sharing information and working together is how anything gets done at scale.",
        ],
      },
      {
        title: "Both, not either/or",
        paragraphs: [
          "Push sustainability with no communication and you stall. Talk with no focus on the environment and you drift. They wanted both—and to use networks people already have.",
        ],
      },
    ],
  },
  {
    id: "workshop-2",
    label: "Workshop 2",
    paragraphs: [
      "Take the theme further, and make something you can see and film.",
    ],
    images: [
      {
        src: `${BASE}/workshop2-bts.jpg`,
        alt: "Students building with LEGO",
        caption: "Workshop 2.",
      },
      {
        src: `${BASE}/workshop2-agenda.jpg`,
        alt: "Workshop 2 agenda slide",
        caption: "That day’s plan.",
      },
    ],
    items: [
      {
        title: "Backcasting",
        paragraphs: [
          "Start from a 2050 where sustainability awareness is normal, then ask what had to change to get there—infrastructure, laws, schools. They used the ozone-layer recovery as an example of a big fix that worked.",
        ],
        image: {
          src: `${BASE}/workshop2-story-arc.jpg`,
          alt: "Story worksheet",
          caption: "Worksheets for the 2050 vision.",
        },
      },
      {
        title: "Forecasting",
        paragraphs: [
          "Look forward from today: consumer habits, climate, what governments might do. They mentioned EVs and zero-waste towns, pushback from culture, and starting local as a way to grow.",
        ],
        image: {
          src: `${BASE}/workshop2-universes.jpg`,
          alt: "Board of other possible futures",
          caption: "Other futures next to the main story.",
        },
      },
      {
        title: "Build & film",
        paragraphs: [
          "We set out LEGO, Play-Doh, puppets, and more. This robotics group went straight to LEGO. They built Sustaintown—waste-to-energy, greener schools and transit—and filmed a tiny town with a puppet walking the viewer through it.",
        ],
        image: {
          src: `${BASE}/workshop2-present.jpg`,
          alt: "Students presenting before filming",
          caption: "Sharing before the film.",
        },
      },
    ],
  },
  {
    id: "film",
    label: "Their film",
    paragraphs: [
      "The short film from Workshop 2—Sustaintown, made by the students.",
    ],
    videos: [
      {
        src: `${BASE}/workshop-film.mp4`,
        aspect: "landscape",
        caption: "Sustaintown — student film.",
        withSound: true,
      },
    ],
  },
  {
    id: "quotes",
    label: "What they said",
    items: [
      {
        title: "M, 17",
        paragraphs: [
          "“I think it's exciting. You know, on the flip side of that, I think all this shows that there's, there is a lot for us to do, but you know, that kind of gives us a goal to work towards.”",
        ],
      },
      {
        title: "AM, 17",
        paragraphs: [
          "“I agree with M… It's kind of a daunting task… but I feel like this was a group of high school students that got together and made a short video. I feel like if you get to higher levels, you can do a lot more… So, yeah, I'm excited.”",
        ],
      },
      {
        title: "MG, 16",
        paragraphs: [
          "“I got really depressed. I was just realizing how much like we have to do in terms of like environmental stuff and how much like, it's probably not gonna happen.”",
          "“I think if they show this at, like, at the UN and, like, also, like, congressional meetings, this would be really helpful. Like, the video that we've done.”",
        ],
      },
      {
        title: "A, 17",
        paragraphs: [
          "“Kind of just building off what MG said. Like, it's just kind of depressing, like.”",
        ],
      },
    ],
  },
  {
    id: "insights",
    label: "What we took away",
    items: [
      {
        title: "01 — More than one path",
        paragraphs: [
          "Getting anywhere on sustainability needs several things at once: school, media, policy, and community.",
        ],
      },
      {
        title: "02 — Start early",
        paragraphs: [
          "What people learn young shapes habits—and whether caring about the environment feels normal.",
        ],
      },
      {
        title: "03 — Stories move people",
        paragraphs: [
          "Film and storytelling change what people notice and whether they’ll do anything about it.",
        ],
      },
      {
        title: "04 — Policy and daily life",
        paragraphs: [
          "Rules from above matter. So do neighborhood efforts and what individuals do. The workshops treated both as needed.",
        ],
      },
    ],
  },
  {
    id: "reflection",
    label: "Notes from being there",
    paragraphs: [
      "Workshop 1: the students drove most of it. The debate did more than our prompts. The schedule felt about right. We reused an icebreaker they’d already done—familiar wasn’t a bad thing; it left more energy for the harder conversation. Crazy 8s plus clustering kept topics from sprawling. Next time I’d print the sign-up sheets before we start (emails, gift cards).",
      "Workshop 2: people showed up late. Kahmin cut the warm-up so we still ended on time. LEGO won; puppets got some use; Play-Doh sat mostly untouched. We’d split film time evenly between picking a style, shooting, and watching—shooting took longer. Next time I’d leave more time for whatever they’re actually into.",
    ],
  },
];

export const WHOSE_DREAMS_DETAIL_SECTIONS_ZH = [
  {
    id: "overview",
    label: "概览",
    paragraphs: [
      "一群高中生想象 2050 年的生活，用乐高搭了一座未来小镇并拍成短片。聊着聊着，可持续成了他们最在意的事。",
    ],
    items: [
      {
        title: "问题",
        paragraphs: [
          "大人其实不太清楚青少年心里的未来长什么样。不清楚的话，工作坊就容易变成「猜老师想听什么」，而不是他们真正怎么想。",
        ],
      },
      {
        title: "我们做了什么",
        paragraphs: [
          "两场共创工作坊。学生先选自己在意的主题，再做成故事和能拿给人看的东西。见面前，我们用 ChatGPT、Claude 先把活动跑了一遍。",
        ],
      },
      {
        title: "我的角色与团队",
        paragraphs: [
          "我一起构思，现场拍照记笔记，并帮忙准备流程、材料和活动。",
          "团队：Kahmin Ong（主导）、Chip Orban、Jackie Brandon、秦珑月。",
        ],
      },
      {
        title: "时间与类型",
        paragraphs: [
          "2025 年 1–4 月。设计研究、工作坊策划与带领，之后整理大家说了什么。",
        ],
      },
    ],
    image: {
      src: `${BASE}/hero-workshop.jpg`,
      alt: "写着 Sustainability 和 Connection 的挂纸",
      caption: "定主题时的挂纸。",
    },
  },
  {
    id: "objective",
    label: "目标",
    paragraphs: [
      "想知道青少年怎样想象——又怎样说出——2050 年我们可能怎样生活。工作坊里先定主题，再用故事和动手往下做。",
      "正式开始前，用 ChatGPT 和 Claude 试跑过活动。",
    ],
  },
  {
    id: "timeline",
    label: "时间线",
    paragraphs: [
      "大约四个月。开头慢，二月底才开始招人和策划。第一场 3 月 3 日，第二场 3 月 17 日。之后对着笔记整理，想怎么把听到的东西说出去。",
      "参与者是都柏林市公立学校 FIRST 机器人队的五名学生，15–18 岁（四男一女）。",
    ],
  },
  {
    id: "tools",
    label: "我们准备的工具",
    paragraphs: [
      "Crazy 8s、故事弧／分镜表，还有从未来倒推、从现在往前看的工作纸。希望他们愿意用——有一点框，又留得出空去编。",
    ],
    images: [
      {
        src: `${BASE}/engagement-framework.jpg`,
        alt: "怎么带学生的策划板",
        caption: "怎么和 STEM 学生一起做。",
      },
      {
        src: `${BASE}/ideation-clusters.jpg`,
        alt: "早期主题板",
        caption: "进工作坊前的主题归类。",
      },
    ],
  },
  {
    id: "workshop-1",
    label: "工作坊 1",
    paragraphs: [
      "先为 2050 定一个要抓住的主题。",
    ],
    image: {
      src: `${BASE}/workshop1-bts.jpg`,
      alt: "工作坊 1 现场",
      caption: "工作坊 1。",
    },
    items: [
      {
        title: "活动 1 — Crazy 8s",
        paragraphs: [
          "限时尽量多写题目。时间越长，想法往往越多。出现过远程办公、食物、医疗等。",
        ],
        list: [
          "远程办公",
          "重复的办公室工作被 AI 取代",
          "少往填埋场扔",
          "更可持续",
          "食物系统变好",
          "交通变好",
          "跨国出行更容易",
          "不同语言也能聊",
          "医疗变好",
        ],
        image: {
          src: `${BASE}/workshop1-crazy8.jpg`,
          alt: "Crazy 8s 表格",
          caption: "Crazy 8s。",
        },
      },
      {
        title: "活动 2 — 归类与投票",
        paragraphs: [
          "便利贴收成有名字的几堆，再投票。胜出的是「可持续」和「连接」。",
          "可持续：垃圾、可再生能源、气候，以及能动手的时间不多了。",
          "连接：跟别处的人说话、协作，好让想法真的传得开。",
        ],
        image: {
          src: `${BASE}/workshop1-hive-map.jpg`,
          alt: "主题归类图",
          caption: "主题归类。",
        },
      },
      {
        title: "活动 3 — 辩论",
        paragraphs: [
          "争 2050 哪个更要紧。最后折中成「可持续意识」：既在意环境，也要把话说清楚，好一起做事。",
        ],
        image: {
          src: `${BASE}/workshop1-pitch.jpg`,
          alt: "工作坊 1 的短讲笔记",
          caption: "短讲和反馈。",
        },
      },
    ],
  },
  {
    id: "workshop-1-findings",
    label: "工作坊 1 看出什么",
    items: [
      {
        title: "时间很紧",
        paragraphs: [
          "垃圾、气候、填埋——他们觉得这些事现在就得动手。",
        ],
      },
      {
        title: "沟通仍然重要",
        paragraphs: [
          "就算再急，他们也说：信息流通、一起做事，才是把事做大的办法。",
        ],
      },
      {
        title: "不是二选一",
        paragraphs: [
          "只抓可持续、不沟通，会卡住；只聊天、不盯环境，会飘。他们要两边，也想用上大家已经有的关系网。",
        ],
      },
    ],
  },
  {
    id: "workshop-2",
    label: "工作坊 2",
    paragraphs: [
      "把主题做深，做成能看见、能拍下来的东西。",
    ],
    images: [
      {
        src: `${BASE}/workshop2-bts.jpg`,
        alt: "学生用乐高搭建",
        caption: "工作坊 2。",
      },
      {
        src: `${BASE}/workshop2-agenda.jpg`,
        alt: "工作坊 2 流程幻灯",
        caption: "当天安排。",
      },
    ],
    items: [
      {
        title: "从未来倒推",
        paragraphs: [
          "先假定 2050 年大家已经普遍有可持续意识，再问要改什么才能到那里——基础设施、法律、学校。他们拿臭氧层修复当例子：大事也有做成过的。",
        ],
        image: {
          src: `${BASE}/workshop2-story-arc.jpg`,
          alt: "故事工作纸",
          caption: "写 2050 愿景用的表。",
        },
      },
      {
        title: "从现在往前看",
        paragraphs: [
          "顺着今天的趋势往下想：消费习惯、气候、政府可能怎么做。提到电动车、零废城镇，也提到文化上的抵触，以及从身边做起再慢慢变大。",
        ],
        image: {
          src: `${BASE}/workshop2-universes.jpg`,
          alt: "其他可能未来的板",
          caption: "主线旁边的别的未来。",
        },
      },
      {
        title: "搭建与拍摄",
        paragraphs: [
          "桌上放了乐高、橡皮泥、木偶等。这组机器人社几乎全用乐高。他们搭了 Sustaintown——废物发电、更绿的学校和出行——再用木偶带着人在模型里走一圈，拍成短片。",
        ],
        image: {
          src: `${BASE}/workshop2-present.jpg`,
          alt: "拍片前学生在讲",
          caption: "拍之前先讲一遍。",
        },
      },
    ],
  },
  {
    id: "film",
    label: "他们拍的片子",
    paragraphs: [
      "工作坊 2 的短片——学生们做的 Sustaintown。",
    ],
    videos: [
      {
        src: `${BASE}/workshop-film.mp4`,
        aspect: "landscape",
        caption: "Sustaintown——学生短片。",
        withSound: true,
      },
    ],
  },
  {
    id: "quotes",
    label: "他们说的话",
    items: [
      {
        title: "M，17 岁",
        paragraphs: [
          "「我觉得挺激动的。反过来想，这也说明我们还有好多要做——不过至少有个能往前走的目标。」",
        ],
      },
      {
        title: "AM，17 岁",
        paragraphs: [
          "「同意 M……事情挺吓人的……但我们就是一群高中生凑一块拍了短片。到更高的层面，大概能做更多……所以我还是挺期待的。」",
        ],
      },
      {
        title: "MG，16 岁",
        paragraphs: [
          "「我挺郁闷的。突然觉得环境方面要做的事太多了，而且好多大概根本做不成。」",
          "「要是拿到联合国、国会那种会上放，我觉得会有用。就是我们拍的这个。」",
        ],
      },
      {
        title: "A，17 岁",
        paragraphs: [
          "「顺着 MG 说的……就是有点丧。」",
        ],
      },
    ],
  },
  {
    id: "insights",
    label: "我们带走的",
    items: [
      {
        title: "01 — 不只有一条路",
        paragraphs: [
          "可持续要往前走，得几件事一起：学校、媒体、政策、社区。",
        ],
      },
      {
        title: "02 — 要趁早",
        paragraphs: [
          "小时候学到的东西，会影响习惯，也会影响「在意环境」算不算正常。",
        ],
      },
      {
        title: "03 — 故事能带动人",
        paragraphs: [
          "片子和叙事会改人们注意到什么，以及会不会真的去做点什么。",
        ],
      },
      {
        title: "04 — 上面的规矩和日常都要",
        paragraphs: [
          "政策重要。小区里的行动、个人怎么做也重要。工作坊里两边都被当成需要。",
        ],
      },
    ],
  },
  {
    id: "reflection",
    label: "现场记下的",
    paragraphs: [
      "工作坊 1：大半是学生自己在跑。辩论比我们的提示有用。时间安排还行。破冰用了他们做过的那套——不新也没关系，省下力气聊更难的。Crazy 8s 加归类，主题不会散开。下次会提前印好登记表（邮箱、礼品卡）。",
      "工作坊 2：人来晚了。Kahmin 砍掉热身，还是准时结束。乐高最受欢迎；木偶有人玩；橡皮泥基本没动。拍片原定选风格、拍、看各占一块——拍摄拖长了。下次会把时间多留给他们真正投入的那一步。",
    ],
  },
];
