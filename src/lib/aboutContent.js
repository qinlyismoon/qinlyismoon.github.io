import sketch from "../assets/about/about-sketch.jpg";
import research from "../assets/about/about-research.jpg";
import coding from "../assets/about/about-coding.jpg";
import travel from "../assets/about/about-travel.jpg";
import swim from "../assets/about/about-swim.jpg";
import vr from "../assets/about/about-vr.jpg";
import product from "../assets/about/about-product.jpg";
import teaching from "../assets/about/about-teaching.jpg";

export const ABOUT_IMAGES = {
  portrait: "/Collage%20Portrait.png",
  mountain: "/Collage%20-%20mountain.png",
  snowboard: "/Collage%20-%20snowboard.png",
  ticket: "/Collage%20-%20ticket.png",
  film: "/Collage%20-%20film.png",
  bar: "/Collage%20-%20bar.png",
  fireworks: "/Collage%20-%20fireworks.webp",
  camera: "/Collage%20-%20camera.png",
  sketch,
  research,
  coding,
  travel,
  swim,
  vr,
  product,
  teaching,
};

export const COLLAGE_ITEMS = [
  {
    id: "portrait",
    src: "portrait",
    alt: { en: "Personal portrait of Phoebe", zh: "珑月的个人肖像" },
    rotation: -1.5,
    className: "about-collage__portrait",
    variant: "portrait",
  },
];

const ABOUT_PAGE_COPY = {
  en: {
    hero: {
      greeting: "Hi, I’m Phoebe.",
      kicker: "Design engineer · product designer",
      // v2.2.2 — About shows who I am: how I think, whose eyes I look
      // through, how I find answers, and who I am underneath. Each section
      // leads with a trait; examples are light anchors, never the point.
      // quote + one-line roadmap → portrait → questions → other
      // people's perspectives → making (+ loop) → staying true to myself.
      essay: {
        quote: {
          original: "Dubito, ergo cogito, ergo sum.",
          translation: "I doubt, therefore I think, therefore I am.",
        },
        roadmap:
          "This line is closest to how I work: questions start my thinking, stepping into other people’s perspectives widens it, and making turns it into something real.",
        sections: [
          {
            id: "doubt",
            title: "I start with questions",
            paragraphs: [
              "I like to ask why. When a brief arrives, when I meet a familiar design pattern, or when I have a first idea of my own, I get curious about where it came from, who it is for, and what might happen if we tried another way. I ask my own work the most questions of all.",
              "Asking early and honestly helps me think a problem through. It also often surfaces options that the people I’m working with hadn’t seen yet.",
            ],
          },
          {
            id: "perspectives",
            title: "Seeing from every side",
            paragraphs: [
              "Before I settle on a direction, I try to take each relevant person’s standpoint—and look through their first-person view: the person handing something over and the person receiving it, the operator and the team behind the platform, the student who sees things differently from me. Once I understand what each of them cares about and worries about, and hold those views side by side, the real problem usually shows up.",
            ],
          },
          {
            id: "making",
            title: "Clarity comes from making",
            paragraphs: [
              "When I have an idea, I start making right away: a sketch, an interactive prototype, a rough build in code. That is where my questions get answered. Emotion Garden—one project within my thesis research—went through more than a hundred versions before its visual language settled, and each version showed me what the next should change. Working with AI keeps shortening the distance between an idea and something people can try, which suits me well.",
              "Put together, it becomes a loop:",
            ],
            diagram: true,
          },
          {
            id: "true",
            title: "Staying true to myself",
            paragraphs: [
              "Being honest with myself is harder than it sounds. Sometimes I think I care about something, or that a direction feels right, and only later realize it wasn’t what I truly felt. Telling the two apart takes practice; for me that practice is doing concrete work—once I’m making something, it becomes clear whether I’m absorbed or forcing it, curious or only feeling I should be.",
              "Knowing myself is also what lets me understand other people. It is hard to take someone else’s standpoint while I’m unclear about my own. I’m always learning and changing, and this honesty is what I want to hold onto through all of it.",
            ],
          },
        ],
      },
      processSteps: ["Understand people", "Shape the system", "Build to learn"],
      headshotAlt: "Portrait of Phoebe Qin",
      collageLabel: "Beyond the process",
      collageTitle: "Things that keep me curious",
      collageBody:
        "A movable board of places, habits, and small observations that keep shaping how I see and make.",
      exploring: [
        "I’m always exploring, experimenting, and making—",
        "trying to create something new, something different, and something that matters to people.",
      ],
      akaLabel: "My Chinese name",
      chineseName: "秦珑月",
      nameCardAria: "Name meaning of 秦珑月",
      principles: [
        "Build to learn",
        "Think in systems",
        "Design for people",
      ],
      notes: {
        curiosity: "Curiosity keeps me moving.",
        observe: "I look closely and ask why.",
        making: "I learn by making.",
        systemsPeople: "I see systems.\nI care about people.",
        becoming: "Always learning.\nAlways becoming.",
      },
      exploringNote: "Exploring how people\nand AI create together.",
    },
    journey: {
      heading: "My design journey",
      support:
        "Shaped by deliberate choices, hands-on practice, and curiosity about what design can still become.",
    },
    closing: {
      heading: "Thanks for reading this far.",
      body: "I’m always looking for new questions to explore, ideas to build, and chances to grow.",
      cta: "Let’s Connect",
    },
  },
  zh: {
    hero: {
      greeting: "你好，我是 Phoebe。",
      kicker: "设计工程师 · 产品设计师",
      essay: {
        quote: {
          original: "Dubito, ergo cogito, ergo sum.",
          translation: "我怀疑，故我思；我思，故我在。",
        },
        roadmap:
          "这句话最贴近我做事的方式：提问让我开始思考，带入不同立场的第一视角让想法变宽，动手去做，才把它变成真实的东西。",
        sections: [
          {
            id: "doubt",
            title: "我从提问开始",
            paragraphs: [
              "我习惯先问一句「为什么」。拿到一份需求、遇上一个常见的设计模式，或者自己刚冒出一个想法时，我会好奇：它从哪里来，为谁而做，如果换一种方式会怎样。问得最多的，往往是我自己的作品。",
              "问题早点、坦诚地提出来，能帮我把一件事想透，也常让一起工作的人看见更多可能。",
            ],
          },
          {
            id: "perspectives",
            title: "站在每一方的立场上看",
            paragraphs: [
              "定方案之前，我会试着站在每个相关的人的立场上，带入他们的第一视角：交出一件事的人和接手的人，运营商和平台背后的团队，想法跟我不一样的学生。看清他们各自在意什么、担心什么，再把这些视角放在一起，真正的问题往往就浮现了。",
            ],
          },
          {
            id: "making",
            title: "在做的过程中找到清晰",
            paragraphs: [
              "有了想法，我会马上动手：一张草图、一个可交互的原型、一个用代码搭的粗糙版本。疑问常常是在做的过程中才有答案。Emotion Garden——论文研究里的一个项目——改了一百多个版本，才找到自己的视觉语言，每一版都告诉我下一版该改什么。现在和 AI 一起工作，从想法到别人能试用的东西，距离越来越短，这很适合我。",
              "把这些放在一起，就是一个循环：",
            ],
            diagram: true,
          },
          {
            id: "true",
            title: "对自己诚实",
            paragraphs: [
              "对自己诚实，比听起来难。有时我以为自己在乎某件事、某个方向是对的，后来才发现，那并不是我真正的感受。分辨这两者需要练习；对我来说，最好的练习就是去做具体的事——一件事真正做下去，我是投入还是勉强，是好奇还是只觉得「应该」，都会慢慢清楚。",
              "认识自己，也是理解别人的前提。连自己站在哪里都看不清，就很难真正进入别人的立场。我一直在学习、在改变，这份诚实，是我想一路守住的。",
            ],
          },
        ],
      },
      processSteps: ["理解人", "构建系统", "在制作中学习"],
      headshotAlt: "Phoebe Qin 的肖像",
      collageLabel: "流程之外",
      collageTitle: "那些让我持续好奇的事物",
      collageBody:
        "一块可以移动的剪贴板，记录着地点、习惯与微小观察——它们持续影响着我如何观看与创造。",
      exploring: [
        "我一直在探索、实验，也一直在动手做——",
        "想创造一些新的、不同的，以及对人真正有意义的东西。",
      ],
      akaLabel: "我的中文名",
      chineseName: "秦珑月",
      nameCardAria: "秦珑月的姓名释义",
      principles: ["在制作中学习", "以系统思考", "为人而设计"],
      notes: {
        curiosity: "好奇心让我持续向前。",
        observe: "我仔细观察，并追问为什么。",
        making: "我在动手做中学习。",
        systemsPeople: "我看见系统。\n我关心人。",
        becoming: "一直在学习。\n一直在成为。",
      },
      exploringNote: "探索人与 AI\n如何共同创造。",
    },
    journey: {
      heading: "我的设计旅程",
      support: "由主动选择、动手实践，以及对设计还能成为什么的好奇，一路走出来。",
    },
    closing: {
      heading: "谢谢你看到这里。",
      body: "我一直在寻找值得探索的新问题、值得动手做的想法，以及可以成长的机会。",
      cta: "一起聊聊",
    },
  },
};

export const JOURNEY_STAGES = [
  {
    id: "2022",
    year: { en: "2022", zh: "2022" },
    version: "v2022.1",
    phase: { en: "Following What Draws Me", zh: "跟着被吸引的方向走" },
    title: {
      en: "Choosing a path toward making and innovation",
      zh: "选择一条能动手、能创新的路",
    },
    body: {
      en: [
        "My interest in making began long before I knew what design was. In elementary school, I represented my school in a citywide model-making competition. I also enjoyed taking things apart and imagining what else they could become—once turning a small solar-powered fan from a sun hat into a model solar boat.",
        "Later, my background in civil and coastal engineering, along with information systems management, taught me to think systematically and understand how complex systems work. Yet I found myself most drawn to innovation, hands-on making, and the process of turning ideas into things people could experience and respond to.",
      ],
      zh: [
        "我对动手做东西的兴趣，比我知道「设计」是什么要早得多。小学时，我代表学校参加全市模型制作比赛。我也喜欢拆开东西，想象它们还能变成什么——曾经把遮阳帽上的小太阳能风扇，改成了一艘太阳能模型船。",
        "后来学土木与海岸工程，又学了信息管理系统，让我学会系统地想问题，也明白复杂系统怎么运转。可最吸引我的，始终是创新、动手，以及把想法做成别人能摸到、能回应的东西。",
      ],
    },
    highlight: {
      en: "Design felt less like a change of direction,\nand more like following what had always drawn me.",
      zh: "设计不太像一次转向，\n更像是跟着一直吸引我的东西走。",
    },
    doodle: "boat",
    compact: true,
  },
  {
    id: "2023-2024",
    year: { en: "2023–2024", zh: "2023–2024" },
    version: "v2023.1",
    phase: { en: "Learning Through Practice", zh: "在实践里学" },
    title: {
      en: "Building a foundation through design research and product practice",
      zh: "在设计研究和产品实践里打底",
    },
    intro: {
      en: "After graduation, I received offers from several graduate programs. Instead of continuing directly, I chose to spend a year gaining hands-on experience in design research and product practice.",
      zh: "毕业后，我拿到了几所研究生项目的录取。没有马上接着读，我选择用一年时间，先去做设计研究和产品实践。",
    },
    subsections: [
      {
        title: {
          en: "Interaction Design & HCI Research Assistant",
          zh: "交互设计与 HCI 研究助理",
        },
        organization: {
          en: "Southern University of Science and Technology",
          zh: "南方科技大学",
        },
        period: { en: "2024–2025", zh: "2024–2025" },
        body: {
          en: [
            {
              type: "rich",
              parts: [
                {
                  text: "At the School of Design at Southern University of Science and Technology, I worked with ",
                },
                {
                  text: "Professor Luo Tao",
                  href: "https://designschool.sustech.edu.cn/about/team/faculty/375.html",
                  preview: "luo-tao",
                  title: "LUO Tao",
                  source: "SUSTech School of Design",
                },
                { text: " and " },
                {
                  text: "Professor Xiao Ruowei",
                  href: "https://designschool.sustech.edu.cn/about/team/faculty/491.html",
                  preview: "xiao-ruowei",
                  title: "XIAO Ruowei",
                  source: "SUSTech School of Design",
                },
                {
                  text: " on interaction design and HCI-related research.",
                },
              ],
            },
            "During this research experience, I explored how interaction logic is developed—from understanding people through research, to designing meaningful interactions that respond to real contexts.",
            "I participated in workshops and user interviews across both academic and industry settings, including collaborations with Guangzhou Academy of Fine Arts, NingboTech University, NetEase Games, and ECOVACS. These experiences taught me how different environments shape design methods, and how research can be translated into practical interaction strategies and product decisions.",
          ],
          zh: [
            {
              type: "rich",
              parts: [
                { text: "在南方科技大学设计学院，我与" },
                {
                  text: "罗涛教授",
                  href: "https://designschool.sustech.edu.cn/about/team/faculty/375.html",
                  preview: "luo-tao",
                  title: "LUO Tao",
                  source: "南方科技大学设计学院",
                },
                { text: "与" },
                {
                  text: "肖若薇教授",
                  href: "https://designschool.sustech.edu.cn/about/team/faculty/491.html",
                  preview: "xiao-ruowei",
                  title: "XIAO Ruowei",
                  source: "南方科技大学设计学院",
                },
                { text: "合作，参与交互设计与 HCI 相关研究。" },
              ],
            },
            "这段研究里，我慢慢弄清交互逻辑是怎么长出来的——从研究里理解人，再到做出能回应真实情境、真正有意义的交互。",
            "我也参与了学校和产业两边的工作坊与用户访谈，合作过广州美术学院、宁波工程学院、网易游戏、科沃斯等。不同环境会带来不同的设计方法；研究怎样变成能用的交互策略和产品决定，我也是在这些经历里学到的。",
          ],
        },
        images: [
          {
            src: "/t2-1.png",
            alt: "Design research workshop",
            rotate: -1.8,
            artifact: true,
            compact: true,
          },
          {
            src: "/t2-2.JPG",
            alt: "Design research session",
            rotate: 1.6,
            artifact: true,
            compact: true,
          },
        ],
        projects: [
          {
            body: {
              en: [
                {
                  type: "rich",
                  parts: [
                    {
                      text: "I also contributed to the second edition of ",
                    },
                    {
                      text: "A Universal Guide to Interaction Techniques: A Comprehensive Cross-Platform Mechanism Handbook",
                      href: "https://book.douban.com/subject/30395968/",
                      preview: "handbook-first-edition",
                      title: "First Edition",
                      source: "Douban Books",
                      rating: "8.4/10",
                      italic: true,
                    },
                    {
                      text: ", contracted by Tsinghua University Press.",
                    },
                  ],
                },
                "For the smart home and multimodal interaction chapter, I helped organize interaction gestures and their underlying logic, and contributed to the conception and structuring of the written content.",
              ],
              zh: [
                {
                  type: "rich",
                  parts: [
                    { text: "我还参与了清华大学出版社约稿的" },
                    {
                      text: "《交互技术通用指南：跨平台机制手册》",
                      href: "https://book.douban.com/subject/30395968/",
                      preview: "handbook-first-edition",
                      title: "First Edition",
                      source: "豆瓣读书",
                      rating: "8.4/10",
                      italic: true,
                    },
                    { text: "第二版的编写。" },
                  ],
                },
                "在智能家居与多模态交互这一章，我帮忙整理交互手势和它们背后的逻辑，也参与了文字的构思和结构。",
              ],
            },
          },
        ],
      },
      {
        title: {
          en: "Product Manager Intern",
          zh: "产品经理实习生",
        },
        organization: {
          en: "CS Energy Technology",
          zh: "CS Energy Technology",
        },
        period: { en: "2024", zh: "2024" },
        body: {
          en: [
            {
              type: "rich",
              parts: [
                {
                  text: "At CS Energy Technology, I began seeing products as systems. Working on the ",
                },
                {
                  text: "Charging Station Management System (CSMS)",
                  href: "https://www.csenergytech.co.th/#/softwareService",
                  preview: "cs-energy",
                  title: "CS Energy Technology",
                  source: "csenergytech.co.th",
                },
                {
                  text: ", which supported charging station operators in the Thailand market, I redesigned the user profile experience by rethinking information architecture and operational workflows.",
                },
              ],
            },
            "As I redesigned workflows across both the mobile app and management platform, I realized that every interaction connected multiple stakeholders—from end users to operations teams. Even a small feature was shaped by the needs of an entire system.",
            "I later explored personalized branding for charging station operators and early concepts for future platform capabilities. Those conversations introduced me to product strategy for the first time, showing me that successful products grow by balancing user experience, operational efficiency, and business value.",
          ],
          zh: [
            {
              type: "rich",
              parts: [
                {
                  text: "在 CS Energy Technology，我开始把产品看成系统。面向泰国充电站运营商的",
                },
                {
                  text: "Charging Station Management System (CSMS)",
                  href: "https://www.csenergytech.co.th/#/softwareService",
                  preview: "cs-energy",
                  title: "CS Energy Technology",
                  source: "csenergytech.co.th",
                },
                {
                  text: "上，我重新想了信息结构和运营流程，再去改用户个人中心。",
                },
              ],
            },
            "在手机端和管理平台两边重做流程时，我意识到每一次交互都连着好几方：终端用户、运营团队……哪怕很小的功能，也被整个系统的需求牵着，而不是单个界面。",
            "后来我也试过为运营商做个性化品牌，以及平台未来能力的早期概念。那些讨论第一次把我带到产品策略：好的产品，是在体验、运营效率和商业价值之间慢慢找平衡长起来的。",
          ],
        },
        images: [
          {
            src: "/t2-3.webp",
            alt: "CS Energy product artifact",
            rotate: -1.5,
            artifact: true,
            wide: true,
            mobility: true,
          },
        ],
      },
    ],
    highlight: {
      en: "Good design doesn't connect pages. It connects people, operations, and business.",
      zh: "好的设计连的不是页面，\n是人、运营和生意。",
    },
  },
  {
    id: "2024-now",
    year: { en: "2024–Now", zh: "2024–现在" },
    version: "v2024.1",
    phase: { en: "Expanding Design", zh: "把设计再撑开一点" },
    title: {
      en: "Exploring what design can become",
      zh: "看看设计还能成为什么",
    },
    organization: {
      en: "The Ohio State University",
      zh: "俄亥俄州立大学",
    },
    role: { en: "MFA in Design", zh: "设计硕士" },
    subsections: [
      {
        title: {
          en: "Exploring Across Mediums",
          zh: "跨媒介试试",
        },
        body: {
          en: [
            "Graduate study gave me the space to explore design beyond conventional product interfaces.",
            "Through data visualization, creative coding, physical computing, VR and AR, interactive media, and human–AI interaction, I began working across digital, spatial, physical, and computational forms. These projects expanded how I understood design: a way of shaping experiences between people, information, and technology.",
          ],
          zh: [
            "研究生阶段给了我空间，让设计不必困在传统的产品界面里。",
            "数据可视化、创意编程、实体计算、VR 与 AR、交互媒介、人机智能交互……我开始在数字、空间、物理和计算这些形态之间来回试。这些项目让我更明白：设计是在人、信息和技术之间，把体验一点点搭起来。",
          ],
        },
        images: [
          {
            src: "/t-project1.png",
            alt: "Exploration across design mediums",
            rotate: -1.8,
            strip: true,
          },
          {
            src: "/t-project2.png",
            alt: "Interactive and spatial design exploration",
            rotate: 1.4,
            strip: true,
          },
          {
            src: "/t-project3.png",
            alt: "Computational and multimodal design exploration",
            rotate: -1.1,
            strip: true,
          },
          {
            src: "/t-project4.png",
            alt: "Physical and interactive media exploration",
            rotate: 1.7,
            strip: true,
          },
          {
            src: "/t-project5.png",
            alt: "Human–AI interaction exploration",
            rotate: -1.3,
            strip: true,
          },
        ],
        topics: {
          en: [
            "Creative Coding",
            "Generative Art",
            "Speculative Design",
            "Interactive Narrative",
            "Data Visualization",
          ],
          zh: [
            "创意编程",
            "生成艺术",
            "思辨设计",
            "交互叙事",
            "数据可视化",
          ],
        },
      },
      {
        title: {
          en: "Developing a Research Perspective",
          zh: "慢慢长出研究视角",
        },
        body: {
          en: [
            "Working across these projects also changed how I thought about design. I became interested in how an experience works, and in what it helps people understand, question, and reflect on.",
            "Design research showed me that making can be a way of investigating possibilities and generating knowledge.",
          ],
          zh: [
            "这些项目也改变了我对设计的想法。我开始在意体验怎么运转，也在意它帮人理解了什么、问到了什么、想到了什么。",
            "设计研究让我看见：动手也可以是在探可能、长出新的认识。",
          ],
        },
      },
      {
        title: {
          en: "Thesis Research",
          zh: "论文研究",
        },
        body: {
          en: [
            "These explorations gradually shaped my thesis, which investigates how emotional data can move beyond numerical summaries and become something people can interpret, reflect on, and meaningfully engage with.",
            "My research explores emotional personal informatics through digital, augmented reality, and tangible modalities, with a focus on metaphor, multimodal interaction, and the ways different representations shape emotional meaning-making.",
          ],
          zh: [
            "这些尝试一点点收成了我的论文方向：情绪数据如何变成人们能读、能想、能认真参与进去的东西。",
            "我的研究从数字、增强现实和实体媒介出发，看情绪的个人信息化——关注隐喻、多模态交互，以及不同呈现方式怎样影响人对情绪的理解。",
          ],
        },
        topics: {
          en: [
            "Emotional Personal Informatics",
            "Multimodal Interaction",
            "Data × Metaphor",
          ],
          zh: [
            "情绪个人信息化",
            "多模态交互",
            "数据 × 隐喻",
          ],
        },
        images: [
          {
            src: "/t-thesis1.png",
            alt: "Thesis research framework",
            rotate: -1.2,
            sheet: true,
          },
        ],
        closing: {
          en: {
            type: "rich",
            parts: [
              { text: "This research is advised by " },
              {
                text: "Matthew Lewis",
                href: "https://design.osu.edu/people/lewis.239",
                preview: "matthew-lewis",
                title: "Matthew Lewis",
                source: "Advisor · The Ohio State University",
              },
              { text: ", with " },
              {
                text: "Maria Palazzi",
                href: "https://design.osu.edu/people/palazzi.1",
                preview: "maria-palazzi",
                title: "Maria Palazzi",
                source: "Committee Member · The Ohio State University",
              },
              { text: " and " },
              {
                text: "Gaëtan Robillard",
                href: "https://design.osu.edu/people/robillard.11",
                preview: "gaetan-robillard",
                title: "Gaëtan Robillard",
                source: "Committee Member · The Ohio State University",
              },
              { text: " serving on my thesis committee." },
            ],
          },
          zh: {
            type: "rich",
            parts: [
              { text: "这项研究由" },
              {
                text: "Matthew Lewis",
                href: "https://design.osu.edu/people/lewis.239",
                preview: "matthew-lewis",
                title: "Matthew Lewis",
                source: "导师 · 俄亥俄州立大学",
              },
              { text: "指导，" },
              {
                text: "Maria Palazzi",
                href: "https://design.osu.edu/people/palazzi.1",
                preview: "maria-palazzi",
                title: "Maria Palazzi",
                source: "委员 · 俄亥俄州立大学",
              },
              { text: "与" },
              {
                text: "Gaëtan Robillard",
                href: "https://design.osu.edu/people/robillard.11",
                preview: "gaetan-robillard",
                title: "Gaëtan Robillard",
                source: "委员 · 俄亥俄州立大学",
              },
              { text: "担任论文委员会成员。" },
            ],
          },
        },
      },
    ],
    highlight: {
      en: "I began to see design as a way of asking questions\nand generating knowledge.",
      zh: "我开始觉得，设计是提问，\n也是慢慢长出新的认识。",
    },
    rich: true,
  },
  {
    id: "2025-now",
    year: { en: "2025–Now", zh: "2025–现在" },
    version: "v2025.1",
    phase: { en: "Growing With Others", zh: "和别人一起长" },
    title: {
      en: "Learning design through teaching others",
      zh: "在教别人里学设计",
    },
    organization: {
      en: "The Ohio State University",
      zh: "俄亥俄州立大学",
    },
    role: {
      en: "Graduate Teaching Associate",
      zh: "研究生助教",
    },
    period: { en: "2025–Now", zh: "2025–现在" },
    body: {
      en: [
        "Teaching creative technology changed the way I understood my own design process. Explaining ideas to others required me to make the reasoning behind my decisions more visible—what I would do, and why.",
        "While supporting student projects in AR, projection mapping, physical computing, and interactive media, I learned that teaching design means understanding how students think, asking questions that open new directions, and helping them develop their own ideas with greater clarity and confidence.",
        {
          type: "teach-projects",
          text: "I guided projects including an AR tour of the Design Department building and a projection-mapping experience that transformed physical exercise into playful, interactive movement.",
          images: [
            {
              src: "/t-course1.png",
              alt: "Student project documentation for an AR tour concept",
              rotate: -1.6,
            },
            {
              src: "/t-course2.png",
              alt: "Student project process materials for an interactive AR experience",
              rotate: 1.8,
            },
          ],
        },
        {
          type: "teach-moment",
          text: "Working closely with students also taught me to listen more carefully, adapt feedback to different ways of thinking, and create space for experimentation. Through teaching, design became a shared process of questioning, making, and learning from one another.",
          image: {
            src: "/t-teaching.jpg",
            alt: "Teaching moment with an interactive floor projection in the studio",
            rotate: -1.4,
            taped: true,
          },
        },
      ],
      zh: [
        "教创意科技，改变了我对自己设计过程的理解。要把想法讲给别人听，就得把背后的理由摊开——我会做什么，以及为什么。",
        "陪学生做 AR、投影映射、实体计算和交互媒体项目时，我渐渐明白：教设计是看懂他们怎么想，问出能打开新方向的问题，帮他们把自己的想法想得更清楚、更有底气。",
        {
          type: "teach-projects",
          text: "我带过的项目里，有设计学院大楼的 AR 导览，也有把身体运动变成可玩互动的投影映射作品。",
          images: [
            {
              src: "/t-course1.png",
              alt: "学生 AR 导览项目概念文档",
              rotate: -1.6,
            },
            {
              src: "/t-course2.png",
              alt: "学生交互 AR 项目过程材料",
              rotate: 1.8,
            },
          ],
        },
        {
          type: "teach-moment",
          text: "和学生挨着做，也让我学会听得更细，按不同的思维方式给反馈，并为试错留一点空。教学里，设计变成一起提问、一起做、互相学的过程。",
          image: {
            src: "/t-teaching.jpg",
            alt: "工作室里带地面投影的教学现场",
            rotate: -1.4,
            taped: true,
          },
        },
      ],
    },
    highlight: {
      en: "Teaching others taught me to make my own thinking visible—\nand to leave space for ideas beyond my own.",
      zh: "教别人，让我学会把自己的想法摊开——\n也学会给超出自己的想法留一点空。",
    },
  },
  {
    id: "2026-now",
    year: { en: "2026–Now", zh: "2026–现在" },
    version: "v2026.1",
    phase: { en: "Designing in the Age of AI", zh: "在 AI 时代做设计" },
    title: {
      en: "Designing a product from zero to one",
      zh: "从 0 到 1 做一款产品",
    },
    organization: {
      en: "fAIshion",
      zh: "fAIshion",
    },
    role: {
      en: "Product Designer",
      zh: "产品设计师",
    },
    body: {
      en: [
        "Working in an early-stage AI startup introduced me to a different pace and way of designing. I have been helping shape an AI-powered fashion experience from its early ideas into a connected product.",
        "My work spans user research, product strategy, interaction design, and rapid prototyping—from onboarding and personal style discovery to wardrobe management, AI-generated style reports, stylist recommendations, and conversational experiences.",
        "Through vibe coding, I began moving more directly from design ideas to working experiences. Interactive prototypes became a way to test workflows, communicate ideas, and continuously refine the product through feedback.",
        "This experience is reshaping how I understand the role of a designer in the age of AI—designing AI-powered experiences, and using AI to explore, prototype, build, and participate more directly in taking a product from zero to one.",
      ],
      zh: [
        "在早期 AI 创业公司工作，让我碰到另一种节奏和设计方式。我正在参与把一个 AI 驱动的时尚体验，从早期想法一点点推成连贯的产品。",
        "工作覆盖用户研究、产品策略、交互设计和快速原型——从引导上手、个人风格探索，到衣橱管理、AI 风格报告、造型师推荐，还有对话式体验。",
        "靠 vibe coding，我开始更直接地从设计想法走到能用的体验。交互原型成了测流程、讲想法、再靠反馈一点点打磨产品的方式。",
        "这段经历正在改写我对 AI 时代设计师角色的理解——设计 AI 驱动的体验，也用 AI 去试、去搭、去做，更直接地参与把产品从 0 带到 1。",
      ],
    },
    highlight: {
      en: "Designing the experience.\nBuilding the experience.\nLearning from the experience.",
      zh: "设计体验。\n做出体验。\n再从体验里学。",
    },
  },
  {
    id: "journey-next",
    transition: true,
    year: { en: "", zh: "" },
    phase: { en: "", zh: "" },
    prompt: {
      en: "Where will this journey take me next?",
      zh: "接下来，这段路会带我去哪？",
    },
  },
];


export function getAboutPageCopy(language) {
  return ABOUT_PAGE_COPY[language] ?? ABOUT_PAGE_COPY.en;
}

export function pickLang(value, language) {
  if (value == null) return value;
  if (typeof value === "string") return value;
  return value[language] ?? value.en;
}

export function formatRoleMeta(item, language) {
  const organization = pickLang(item.organization, language);
  const role = pickLang(item.role, language);
  const period = pickLang(item.period, language);
  const parts = [organization, role, period].filter(Boolean);
  if (parts.length) return parts.join(" · ");
  return pickLang(item.meta, language) || "";
}
