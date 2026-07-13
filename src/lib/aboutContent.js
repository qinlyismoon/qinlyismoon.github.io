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
      line1: "I have many ideas.",
      line2: "I like bringing them to life.",
      bio: "I’m a systems-minded designer, curious researcher, and hands-on maker. I use research to understand complex questions, design to give them structure, and prototyping to bring ideas to life.",
      principles: [
        "Build to learn",
        "Think in systems",
        "Design for people",
      ],
      notes: {
        ideas: "Ideas → Experiments",
        askingWhy: "Always asking why.",
        systems: "Think in systems.\nDesign for people.",
        curious: "Curious by nature",
        making: "Always making",
        observe: "Observe. Question. Try.",
      },
      exploring: "Currently exploring:\nHuman × AI ×\nInteraction",
    },
    journey: {
      heading: "My design journey",
      support:
        "A journey shaped by deliberate choices, hands-on practice, and a growing curiosity about what design can become.",
    },
    closing: {
      heading: "Thanks for following the journey.",
      body: "I’m always looking for new questions to explore, ideas to build, and opportunities to grow.",
      cta: "Let’s Connect",
    },
  },
  zh: {
    hero: {
      greeting: "你好，我是珑月。",
      line1: "我有很多想法。",
      line2: "也喜欢把它们做出来。",
      bio: "我是一位以系统思维思考的设计师、好奇的研究者，也是动手实践的创造者。我用研究理解复杂问题，用设计赋予结构，用原型让想法落地。",
      principles: ["在制作中学习", "以系统思考", "为人而设计"],
      notes: {
        ideas: "想法 → 实验",
        askingWhy: "总是在问为什么。",
        systems: "以系统思考。\n为人而设计。",
        curious: "天性好奇",
        making: "总在动手做",
        observe: "观察。提问。尝试。",
      },
      exploring: "正在探索：\n人 × AI ×\n交互",
    },
    journey: {
      heading: "我的设计旅程",
      support: "这是一段由主动选择、实践积累，以及对设计边界持续好奇所塑造的旅程。",
    },
    closing: {
      heading: "谢谢你跟随这段旅程。",
      body: "我一直在寻找值得探索的新问题、值得动手做的想法，以及可以成长的机会。",
      cta: "一起聊聊",
    },
  },
};

export const JOURNEY_STAGES = [
  {
    id: "2022",
    year: { en: "2022", zh: "2022" },
    phase: { en: "Following What Draws Me", zh: "追随吸引我的方向" },
    title: {
      en: "Choosing a path toward making and innovation",
      zh: "选择一条通往制作与创新的路",
    },
    body: {
      en: [
        "My interest in making began long before I knew what design was. In elementary school, I represented my school in a citywide model-making competition. I also enjoyed taking things apart and imagining what else they could become—once turning a small solar-powered fan from a sun hat into a model solar boat.",
        "Later, my background in civil and coastal engineering, along with information systems management, taught me to think systematically and understand how complex systems work. Yet I found myself most drawn to innovation, hands-on making, and the process of turning ideas into things people could experience and respond to.",
        "During my junior year of college, I began to recognize that these interests were pointing me toward design. Following what had always drawn me, I decided to pursue a new direction.",
      ],
      zh: [
        "我对制作的兴趣，早在我知道设计是什么之前就开始了。小学时，我代表学校参加全市模型制作比赛。我也喜欢拆开东西，想象它们还能变成什么——曾经把遮阳帽上的小太阳能风扇改成了一个太阳能模型船。",
        "后来，土木与海岸工程的背景，连同信息管理系统，让我学会系统思考，并理解复杂系统如何运作。但最吸引我的，始终是创新、动手制作，以及把想法变成人们能够体验并回应的东西。",
        "大三时，我开始意识到这些兴趣正指向设计。追随一直吸引着我的东西，我决定走向新的方向。",
      ],
    },
    highlight: {
      en: "Design felt less like a change of direction,\nand more like following what had always drawn me.",
      zh: "设计并不像一次转向，\n更像是追随一直吸引着我的东西。",
    },
    doodle: "boat",
    compact: true,
  },
  {
    id: "2023-2024",
    year: { en: "2023–2024", zh: "2023–2024" },
    phase: { en: "Learning Through Practice", zh: "在实践中学习" },
    title: {
      en: "Building a foundation through design research and product practice",
      zh: "在设计研究与产品实践中打下基础",
    },
    intro: {
      en: "After graduating in 2023, I received offers from several graduate programs. Instead of continuing directly, I chose to spend a year gaining hands-on experience in design research and product practice, then applied again in 2024.",
      zh: "2023 年毕业后，我收到了多所研究生项目的录取。我没有直接继续，而是选择用一年时间积累设计研究与产品实践经验，再在 2024 年重新申请。",
    },
    subsections: [
      {
        title: {
          en: "Design Research Assistant",
          zh: "设计研究助理",
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
            "Through research, workshops, and the development of structured design materials, I learned how human needs, emerging technologies, and complex interaction questions can be translated into clearer design directions.",
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
            "通过研究、工作坊与结构化设计材料的开发，我学会如何把人的需求、新兴技术与复杂交互问题，转化为更清晰的设计方向。",
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
                    { text: "第二版编写。" },
                  ],
                },
                "在智能家居与多模态交互章节中，我协助整理交互手势及其底层逻辑，并参与文字内容的构思与结构化。",
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
                  text: "At CS Energy Technology, I first worked on redesigning the user profile experience within the ",
                },
                {
                  text: "Charging Station Management System (CSMS)",
                  href: "https://www.csenergytech.co.th/#/softwareService",
                  preview: "cs-energy",
                  title: "CS Energy Technology",
                  source: "csenergytech.co.th",
                },
                {
                  text: ", rethinking the page structure and information framework rather than only adjusting the interface.",
                },
              ],
            },
            "I then contributed to improving the refund workflow across the mobile app and management platform, helping operations staff handle refund requests more clearly and efficiently.",
            "Later, I explored future-facing app features designed to create long-term value for both the platform and business partners hosting charging stations. This shifted my thinking from improving isolated functions to considering how product strategy can support a mutually beneficial relationship between users, operators, and the business.",
          ],
          zh: [
            {
              type: "rich",
              parts: [
                {
                  text: "在 CS Energy Technology，我首先参与了",
                },
                {
                  text: "Charging Station Management System (CSMS)",
                  href: "https://www.csenergytech.co.th/#/softwareService",
                  preview: "cs-energy",
                  title: "CS Energy Technology",
                  source: "csenergytech.co.th",
                },
                {
                  text: "中用户个人中心体验的重新设计，重点梳理页面结构与信息框架，而不是只调整界面表现。",
                },
              ],
            },
            "随后，我参与优化移动端与管理平台之间的退款流程，帮助运营人员更清晰、高效地处理退款请求。",
            "之后，我还探索面向未来的应用功能，希望为平台与运营充电站的商业合作伙伴创造长期价值。这段经历让我从优化孤立功能，转向思考产品策略如何支持用户、运营商与业务之间互利共赢的关系。",
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
      en: "Design became something I could investigate,\nstructure, and build through practice.",
      zh: "设计变成了我可以通过实践去探究、\n结构化，并亲手搭建的东西。",
    },
  },
  {
    id: "2024-now",
    year: { en: "2024–Now", zh: "2024–现在" },
    phase: { en: "Expanding Design", zh: "扩展设计" },
    title: {
      en: "Exploring what design can become",
      zh: "探索设计还可以成为什么",
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
          zh: "跨越媒介的探索",
        },
        body: {
          en: [
            "Graduate study gave me the space to explore design beyond conventional product interfaces.",
            "Through data visualization, creative coding, physical computing, VR and AR, interactive media, and human–AI interaction, I began working across digital, spatial, physical, and computational forms. These projects expanded how I understood design—not only as an interface, but as a way of shaping experiences between people, information, and technology.",
          ],
          zh: [
            "研究生阶段给了我探索的空间，让设计不再局限于传统产品界面。",
            "通过数据可视化、创意编程、实体计算、VR 与 AR、交互媒介以及人机智能交互，我开始跨越数字、空间、物理与计算等形态进行实践。这些项目扩展了我对设计的理解——它不只是界面，更是塑造人、信息与技术之间体验的方式。",
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
          zh: "形成研究视角",
        },
        body: {
          en: [
            "Working across these projects also changed how I thought about design. I became interested not only in how an experience works, but also in what it helps people understand, question, and reflect on.",
            "Design research showed me that making can be a way of investigating possibilities and generating knowledge—not only producing solutions.",
          ],
          zh: [
            "这些项目也改变了我对设计的思考。我开始关心的不只是体验如何运作，还有它如何帮助人理解、提问与反思。",
            "设计研究让我看到：制作可以是一种探索可能、生成知识的方式——而不只是产出解决方案。",
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
            "这些探索逐渐塑造了我的论文方向：研究情绪数据如何超越数字摘要，成为人们可以解读、反思并有意义地参与其中的对象。",
            "我的研究通过数字、增强现实与实体媒介探索情绪个人信息化，关注隐喻、多模态交互，以及不同表征如何塑造情绪意义的生成。",
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
              { text: "本研究由" },
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
      en: "I began to see design not only as a way of creating solutions,\nbut also as a way of asking questions and generating knowledge.",
      zh: "我开始把设计看作不只是创造解决方案的方式，\n也是提出问题并生成知识的方式。",
    },
    rich: true,
  },
  {
    id: "2025-now",
    year: { en: "2025–Now", zh: "2025–现在" },
    phase: { en: "Growing With Others", zh: "与他人一同成长" },
    title: {
      en: "Learning design through teaching others",
      zh: "在教学中学习设计",
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
        "Teaching creative technology changed the way I understood my own design process. Explaining ideas to others required me to make the reasoning behind my decisions more visible—to understand not only what I would do, but why.",
        "While supporting student projects in AR, projection mapping, physical computing, and interactive media, I learned that teaching design is not about giving students a single answer. It is about understanding how they think, asking questions that open new directions, and helping them develop their own ideas with greater clarity and confidence.",
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
        "教授创意科技，改变了我对自己设计过程的理解。向他人解释想法，要求我把决策背后的推理变得更可见——不只理解我会做什么，也理解为什么这样做。",
        "在陪伴学生推进 AR、投影映射、实体计算与交互媒体项目时，我意识到：教设计并不是给学生一个唯一答案，而是理解他们如何思考，提出能打开新方向的问题，并帮助他们更清晰、更有信心地发展自己的想法。",
        {
          type: "teach-projects",
          text: "我指导的项目包括设计学院建筑的 AR 导览，以及把身体运动转化为可玩、可互动体验的投影映射作品。",
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
          text: "与学生密切合作，也让我学会更仔细地倾听，根据不同思维方式调整反馈，并为实验留出空间。通过教学，设计变成一种共同提问、共同制作、并向彼此学习的过程。",
          image: {
            src: "/t-teaching.jpg",
            alt: "工作室中带地面投影的教学现场",
            rotate: -1.4,
            taped: true,
          },
        },
      ],
    },
    highlight: {
      en: "Teaching others taught me to make my own thinking visible—\nand to leave space for ideas beyond my own.",
      zh: "教别人，让我学会把自己的思考变得可见——\n也学会为超出自己的想法留出空间。",
    },
  },
  {
    id: "2026-now",
    year: { en: "2026–Now", zh: "2026–现在" },
    phase: { en: "Designing in the Age of AI", zh: "在 AI 时代设计" },
    title: {
      en: "Designing a product from zero to one",
      zh: "从 0 到 1 设计一款产品",
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
        "This experience is reshaping how I understand the role of a designer in the age of AI—not only designing AI-powered experiences, but also using AI to explore, prototype, build, and participate more directly in taking a product from zero to one.",
      ],
      zh: [
        "在早期 AI 创业公司工作，让我接触到另一种节奏与设计方式。我正在参与把一个 AI 驱动的时尚体验，从早期想法推进成一个连贯的产品。",
        "我的工作覆盖用户研究、产品策略、交互设计与快速原型——从 onboarding、个人风格探索，到衣橱管理、AI 风格报告、造型师推荐，以及对话式体验。",
        "通过 vibe coding，我开始更直接地从设计想法走向可运行的体验。交互原型成为测试流程、沟通想法，并持续通过反馈打磨产品的方式。",
        "这段经历正在重塑我对 AI 时代设计师角色的理解——不只是设计 AI 驱动的体验，也用 AI 去探索、原型、构建，并更直接地参与把产品从 0 做到 1。",
      ],
    },
    highlight: {
      en: "Designing the experience.\nBuilding the experience.\nLearning from the experience.",
      zh: "设计体验。\n构建体验。\n从体验中学习。",
    },
  },
  {
    id: "journey-next",
    transition: true,
    year: { en: "", zh: "" },
    phase: { en: "", zh: "" },
    prompt: {
      en: "Where will this journey take me next?",
      zh: "这段旅程接下来会带我去哪里？",
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
