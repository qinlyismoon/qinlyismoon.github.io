/**
 * Teaching page copy (v2.2.0).
 *
 * Content accuracy rules — keep these four kinds of statement separate:
 *   1. Official course content  → course `focus`
 *   2. My actual responsibilities → course `role`
 *   3. Work from the course (sessions I led, projects I guided, my own
 *      technical exploration) → course `work`
 *   4. My reflections on teaching → `work[].reflection`
 * Role is always Graduate Teaching Associate — never instructor of record.
 * No invented outcomes, evaluations, testimonials or numbers. Images are
 * real documentation only: the studio photo and student AR projects come
 * from the About timeline, the session arc and recording still from the
 * Week 3 review session, and the card from the Notion
 * process log.
 *
 * Bilingual: TEACHING_COPY_ZH overrides the English copy field by field
 * (arrays merge by index), so images, links and anything not translated
 * fall back to English. Course titles, the card title and tags are proper
 * nouns / category labels and stay English in both languages. The Chinese
 * copy is a draft pending Phoebe's approval (localization rule).
 */

export const TEACHING_LINKS = {
  sensorPrototypes:
    "https://cooked-mind-ec6.notion.site/Sensor-Prototypes-for-DESIGN3106-Course-3407fb6b97a5805a97aaf445a9a51cca",
};

const TEACHING_COPY_EN = {
  sections: {
    introduction: { index: "01", label: "Introduction" },
    philosophy: { index: "02", label: "Teaching Philosophy" },
    experience: { index: "03", label: "Teaching Experience" },
  },

  introduction: {
    title: "Teaching",
    paragraphs: [
      "Since 2025 I have been a Graduate Teaching Associate at The Ohio State University, supporting courses in design foundations, experiential media, and visual communication.",
      "Teaching changed the way I understand my own design process. Explaining an idea to someone else means making its reasoning visible: what I would do, and why. Working with students taught me to listen closely, adapt feedback to different ways of thinking, and leave room for experimentation.",
    ],
    // Handwritten note on the thread between Introduction and Philosophy.
    threadNote: "make thinking visible",
  },

  philosophy: {
    title: "How I Approach Teaching",
    subtitle: "Learning how to think beyond the classroom.",
    paragraphs: [
      "I teach for the moment after a course ends, when students meet a problem no assignment prepared them for. What carries them through is a way of thinking: questioning what they see, reading the situation, and trusting their own judgment.",
    ],
    principles: [
      {
        index: "01",
        title: "Transferable Thinking",
        description:
          "Every method answers a question. Teaching the question lets students rebuild the method wherever they need it.",
      },
      {
        index: "02",
        title: "Individual Approaches",
        description:
          "A shared objective can be reached by many routes. Built on a student's own field and experience, a method stops being borrowed and becomes theirs.",
      },
      {
        index: "03",
        title: "Contextual Reasoning",
        description:
          "Audience, medium, and purpose change what good looks like. Learning to read them turns rules into judgment.",
      },
    ],
  },


  experience: {
    title: "Teaching Experience",
    note: "Courses I have supported as a Graduate Teaching Associate, and the work that came out of each.",
    labels: {
      role: "My role",
      reflection: "Reflection",
    },
    // Reverse chronological order. Each course carries its own evidence
    // (`work`), so practice never lives apart from the course it came from.
    courses: [
      {
        id: "course-design-3505",
        title: "Presentation as Thinking",
        number: "DESIGN 3505",
        term: "Spring 2026 / Autumn 2026",
        focus:
          "Visual communication, typography, hierarchy, and presentation design: developing ideas through visual thinking.",
        role: [
          "Critiqued and evaluated student work.",
          "Supported classroom discussions and activities.",
        ],
        work: [
          {
            title: "Review sessions",
            body: [
              "The course holds a review session every week, and I lead sessions throughout the term. Each one is built around a single question, carried from the week's readings into students' own fields. The arc stays the same; only the question changes.",
            ],
            arc: [
              {
                index: "01",
                label: "Ask",
                text: "One big-picture question",
                src: "/teaching/arc-1-question.jpg",
                alt: "Slide: How do designers communicate information?",
              },
              {
                index: "02",
                label: "Revisit",
                text: "Readings, videos, lecture",
                src: "/teaching/arc-2-revisit.jpg",
                alt: "Slide: Elements of Design: readings, videos, lecture",
              },
              {
                index: "03",
                label: "Apply",
                text: "Into each student's own field",
                src: "/teaching/arc-3-apply.jpg",
                alt: "Slide: Is this something that is discussed in your field? If yes, how? If no, why?",
              },
              {
                index: "04",
                label: "Synthesize",
                text: "Back to presentation as thinking",
                src: "/teaching/arc-4-synthesize.jpg",
                alt: "Slide: Intent reveals purpose, purpose provides story, story informs the design, design delivers the content",
              },
            ],
            arcCaption: "The arc, shown with slides from a session I led.",
            figure: {
              src: "/teaching/review-session.jpg",
              alt: "Recording still of Phoebe leading a review session over video, sharing the slide: How can we apply the five principles of flag design?",
              caption: "Leading a review session, at the Apply step.",
            },
            reflection:
              "Each session ends where students began: in their own fields. That is where an idea proves it can travel.",
          },
        ],
      },
      {
        id: "course-design-3106",
        title: "Introduction to Experiential Media Design",
        number: "DESIGN 3106",
        term: "Autumn 2025",
        focus:
          "Experiential media, interactive technologies, and the relationship between physical interaction and digital experience.",
        role: [
          "Supported classroom activities and student projects.",
        ],
        work: [
          {
            title: "Student projects",
            body: [
              "I guided projects including a projection-mapping experience that turns physical exercise into playful, interactive movement, and AR experiences set in the Department of Design's building.",
            ],
            gallery: [
              {
                src: "/t-teaching.jpg",
                alt: "A student steps through an interactive projection-mapped floor in the design studio",
              },
              {
                src: "/t-course1.png",
                alt: "Student AR project: a visual-novel ghost story set at Hayes Hall",
              },
              {
                src: "/t-course2.png",
                alt: "Student AR project: storyboard and screens for a Department of Design tour",
              },
            ],
            galleryCaption:
              "Projection mapping that turns movement into play (left); AR projects at Hayes Hall and for the Department of Design (right).",
          },
          {
            title: "Sensor prototypes",
            body: [
              "Alongside the projects, I explored which physical inputs could reliably trigger animation and video playback, and documented each prototype as I went.",
            ],
            card: {
              title: "Sensor Prototypes for DESIGN 3106",
              description:
                "A process log testing light, button, and distance inputs as triggers for animation and video playback.",
              tags: ["Physical Computing", "Arduino", "Prototyping"],
              // Lead image of the Notion process log.
              thumbnail: "/teaching/sensor-prototypes.jpg",
              href: TEACHING_LINKS.sensorPrototypes,
            },
            reflection:
              "Building and testing prototypes is how I come to understand a medium's possibilities, constraints, and behavior.",
          },
        ],
      },
      {
        id: "course-design-fundamentals",
        title: "Design Fundamentals",
        // Course number not confirmed — intentionally omitted.
        number: null,
        term: "Spring 2025",
        focus:
          "Foundational design principles, visual language, composition, and iterative process.",
        role: [
          "Gave individual critiques in studio.",
          "Encouraged students to articulate their decisions.",
        ],
      },
    ],
  },
};

// Chinese draft — pending Phoebe's approval.
const TEACHING_COPY_ZH = {
  sections: {
    introduction: { label: "介绍" },
    philosophy: { label: "教学理念" },
    experience: { label: "教学经历" },
  },

  introduction: {
    title: "教学",
    paragraphs: [
      "自 2025 年起，我在俄亥俄州立大学担任研究生助教（Graduate Teaching Associate），参与设计基础、体验媒体与视觉传达方向的课程。",
      "教学改变了我理解自己设计过程的方式。向别人解释一个想法，意味着把它背后的推理变得可见：我会怎么做，以及为什么。与学生一起工作，让我学会更仔细地倾听，根据不同的思维方式调整反馈，并为实验留出空间。",
    ],
    threadNote: "让思考被看见",
  },

  philosophy: {
    title: "我如何看待教学",
    subtitle: "学会在课堂之外思考。",
    paragraphs: [
      "我为课程结束之后的那一刻而教：当学生遇到一个任何作业都没有准备过的问题时，支撑他们的是一种思考方式——质疑所见、读懂情境，并相信自己的判断。",
    ],
    principles: [
      {
        title: "可迁移的思考",
        description:
          "每一种方法都在回答一个问题。教会那个问题，学生就能在任何需要的地方重新建立方法。",
      },
      {
        title: "个体化的路径",
        description:
          "同一个目标可以有许多条路。当方法建立在学生自己的领域与经验之上，它就不再是借来的，而成为他们自己的。",
      },
      {
        title: "情境中的判断",
        description:
          "受众、媒介与目的，会改变“好”的标准。学会读懂它们，规则才会变成判断。",
      },
    ],
  },

  experience: {
    title: "教学经历",
    note: "我作为研究生助教参与的课程，以及每门课中留下的工作。",
    labels: {
      role: "我的角色",
      reflection: "反思",
    },
    courses: [
      {
        term: "2026 春季 / 2026 秋季",
        focus:
          "视觉传达、字体排印、层级与演示设计：通过视觉思考来发展想法。",
        role: ["评阅并点评学生作业。", "支持课堂讨论与活动。"],
        work: [
          {
            title: "复习课",
            body: [
              "这门课每周都有一次复习课，我在学期中主讲其中的一部分。每节课围绕一个问题展开，把它从当周的阅读带进学生自己的领域。结构始终如一，变的只是问题。",
            ],
            arc: [
              { label: "提问", text: "一个宏观的问题" },
              { label: "回顾", text: "阅读、视频与讲座" },
              { label: "应用", text: "放进每位学生自己的领域" },
              { label: "整合", text: "回到“演示即思考”" },
            ],
            arcCaption: "这一结构，以我主讲的一节复习课的幻灯片呈现。",
            figure: {
              alt: "Phoebe 在线上主讲复习课的录屏截图，正在讲解幻灯片：如何应用旗帜设计的五项原则？",
              caption: "主讲复习课，正处于“应用”这一步。",
            },
            reflection:
              "每节课都结束在学生出发的地方：他们自己的领域。一个想法能否走得更远，要在那里得到检验。",
          },
        ],
      },
      {
        term: "2025 秋季",
        focus: "体验媒体、交互技术，以及身体交互与数字体验之间的关系。",
        role: ["支持课堂活动与学生项目。"],
        work: [
          {
            title: "学生项目",
            body: [
              "我指导的项目包括一个把身体运动转化为游戏式互动的投影映射作品，以及设定在设计学院大楼中的 AR 体验。",
            ],
            gallery: [
              { alt: "学生在设计工作室中踏过可互动的投影地面" },
              { alt: "学生 AR 项目：以 Hayes Hall 为背景的视觉小说式鬼故事" },
              { alt: "学生 AR 项目：设计学院导览的分镜与界面" },
            ],
            galleryCaption:
              "左：把运动变成游戏的投影映射；右：在 Hayes Hall 与为设计学院制作的 AR 项目。",
          },
          {
            title: "传感器原型",
            body: [
              "在项目之外，我探索了哪些物理输入能够稳定地触发动画与视频播放，并在过程中记录了每一个原型。",
            ],
            card: {
              description: "一份过程记录：测试光线、按钮与距离输入作为动画和视频播放的触发方式。",
            },
            reflection:
              "动手搭建并测试原型，是我理解一种媒介的可能性、限制与行为方式的途径。",
          },
        ],
      },
      {
        term: "2025 春季",
        focus: "基础设计原则、视觉语言、构图与迭代过程。",
        role: ["在工作室中进行一对一点评。", "鼓励学生清楚地说明自己的设计决定。"],
      },
    ],
  },
};

/** Field-by-field merge: objects merge by key, arrays by index. */
function mergeCopy(base, override) {
  if (override === undefined) return base;
  if (Array.isArray(base)) {
    return base.map((item, index) => mergeCopy(item, override?.[index]));
  }
  if (base && typeof base === "object") {
    const result = { ...base };
    Object.keys(override).forEach((key) => {
      result[key] = mergeCopy(base[key], override[key]);
    });
    return result;
  }
  return override;
}

const TEACHING_COPY = {
  en: TEACHING_COPY_EN,
  zh: mergeCopy(TEACHING_COPY_EN, TEACHING_COPY_ZH),
};

export function getTeachingCopy(language = "en") {
  return TEACHING_COPY[language] ?? TEACHING_COPY.en;
}
