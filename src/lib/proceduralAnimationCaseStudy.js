/**
 * Procedural Animation — Engineering Motion with Houdini
 * Native case-study body (EN + ZH). Opens with what Houdini / node-based
 * work is; each study: why → techniques (list) → problems & fixes (list)
 * + screenshots → what clicked → video with sound.
 */

const BASE = "/research-craft/procedural";

export const PROCEDURAL_ANIMATION_DETAIL_SECTIONS = [
  {
    id: "houdini",
    label: "What Houdini is",
    paragraphs: [
      "Houdini builds scenes as a graph of nodes. Each node is a step—make a shape, copy it, read a value, move something over time. Change something early in the chain, and what depends on it updates with it.",
      "That’s the engineering part: you decide the dependencies. Height can drive a beam. Frame number can drive a train. A particle state can trigger another burst. You’re building a small system you can check and tweak, not only a one-off model.",
      "Four course pieces: shrine, water train, hotpot, snowman. For each—what I used, what broke, how I fixed it.",
    ],
    image: {
      src: `${BASE}/01-torii.jpg`,
      alt: "Houdini network and parameters for a procedural torii, with expressions linking transforms",
      caption:
        "Left: viewport. Middle: parameters. Right: node graph. Green fields are expressions—links between parts, not typed-in numbers.",
    },
  },
  {
    id: "study-01",
    label: "01 — Lake Biwa",
    paragraphs: [
      "During a gap year in Kansai I visited Shirahige Shrine on Lake Biwa, then watched the Biwako Fireworks Festival with friends. I wanted that night back as a scene: water torii, windmills, steps, fireworks.",
    ],
    items: [
      {
        title: "Techniques",
        list: [
          "Torii — Copy SOP and expressions so position and scale stay linked",
          "Windmills — rotation from $F; count and spacing from parameters",
          "Windmill details — attributes and groups for staggered decoration",
          "Steps — step count also drives how many lights appear and where",
          "Fireworks — Copy to Points so bloom time and position can change",
        ],
      },
      {
        title: "Problems & fixes",
        list: [
          "First torii: columns at hard-coded coordinates — changing a proportion meant recalculating by hand → rebuilt with position/length relationships + Copy so height, width, and spacing update the related parts together",
          "Windmill decoration: group attributes assigned wrong twice → read the docs on how groups get attributes, then fixed the setup",
        ],
        images: [
          {
            src: `${BASE}/01-torii.jpg`,
            alt: "Torii with transform expressions linked to other nodes",
            caption: "Torii — transforms driven by ch() links, not typed coordinates.",
          },
          {
            src: `${BASE}/01-windmill-2.jpg`,
            alt: "Windmill detail network using attributes and groups",
            caption: "Windmill details — attributes and groups for variation.",
          },
          {
            src: `${BASE}/01-steps.jpg`,
            alt: "Procedural steps and lights in Houdini",
            caption: "Steps — count linked to lights.",
          },
        ],
      },
      {
        title: "Takeaway",
        paragraphs: [
          "I started setting relationships first, then letting the structure follow—instead of placing each piece by hand. The clip is mostly to show the scene changing when I turn parameters, not a finished film.",
        ],
        video: {
          src: `${BASE}/01-lake.mp4`,
          aspect: "landscape",
          title: "Lake Biwa",
          caption: "Lake Biwa — turning parameters.",
          withSound: true,
        },
      },
    ],
  },
  {
    id: "study-02",
    label: "02 — Water train",
    paragraphs: [
      "Inspired by the water train in Spirited Away, and the music with it—arriving, lights, quiet movement over water.",
    ],
    items: [
      {
        title: "Techniques",
        list: [
          "Train — CHOP / time-based motion at the object level",
          "Lights — color from distance, also through CHOP",
          "Plants — bend and twist as CHOP signals for wind",
          "Fireflies — zero-gravity particles for flicker (count and lifespan capped) + separate CHOP channels for floating",
        ],
      },
      {
        title: "Problems & fixes",
        list: [
          "Train and lights started in one geo — CHOP at object level only reaches the object, so control broke → split into two objects",
          "Plant scale looked wrong after edits → copy the scale parameter across X/Y/Z so one value keeps proportion",
          "Every plant faced the same way → add an ID in Attribute Create, For-Each rotate by ID",
        ],
        images: [
          {
            src: `${BASE}/02-train-chop.jpg`,
            alt: "Train object with time expression and CHOP network beside station and light",
            caption: "Train — motion from time; station / train / light as separate objects.",
          },
          {
            src: `${BASE}/02-plant-attrib.jpg`,
            alt: "Attribute Create and For-Each for plant IDs and scale",
            caption: "Plants — ID + For-Each for facing; scale linked across axes.",
          },
          {
            src: `${BASE}/02-fireflies.jpg`,
            alt: "Firefly particle setup in the scene",
            caption: "Fireflies — particles for flicker, CHOP for float.",
          },
        ],
      },
      {
        title: "Takeaway",
        paragraphs: [
          "Object hierarchy decides what you can control. Variation comes from data on each copy—not from rotating plants one by one.",
        ],
        video: {
          src: `${BASE}/02-train.mp4`,
          aspect: "landscape",
          title: "Water train",
          caption: "Water train — motion from CHOPs.",
          withSound: true,
        },
      },
    ],
  },
  {
    id: "study-03",
    label: "03 — Hotpot",
    paragraphs: [
      "A hotpot scene to practice smoke, cloth, and fire—and to try putting liquid in the pot.",
    ],
    items: [
      {
        title: "Techniques",
        list: [
          "Smoke, cloth (Vellum), and fire simulations",
          "Particles for falling ingredients",
          "Tried particle/liquid broth with ripples when food hits",
        ],
      },
      {
        title: "Problems & fixes",
        list: [
          "Wanted the pot as a solid wall so liquid stayed inside — with that geometry the boundary never held → changed Static Object settings so ingredients blend into the broth (food sinking in), not full liquid interaction",
          "Still want a cleaner liquid-boundary approach later; complex shapes made this hard",
        ],
        images: [
          {
            src: `${BASE}/03-overview.jpg`,
            alt: "Hotpot scene overview in Houdini",
            caption: "Scene overview.",
          },
          {
            src: `${BASE}/03-fire.jpg`,
            alt: "Fire simulation nodes under the pot",
            caption: "Fire — pyro / DOP network next to the stove.",
          },
          {
            src: `${BASE}/03-pot.jpg`,
            alt: "Hotpot and broth setup",
            caption: "Pot — where the liquid-boundary attempt lived.",
          },
        ],
      },
      {
        title: "Takeaway",
        paragraphs: [
          "Particle setups have a lot of knobs that affect each other. I leaned on everyday physics—gravity, friction, wind—and tried combinations. There isn’t one right set of numbers; a few different paths can look fine.",
        ],
        video: {
          src: `${BASE}/03-hotpot.mp4`,
          aspect: "landscape",
          title: "Hotpot",
          caption: "Hotpot — smoke, cloth, fire, food.",
          withSound: true,
        },
      },
    ],
  },
  {
    id: "study-04",
    label: "04 — Snowman and fireworks",
    paragraphs: [
      "A snowman safe in the fridge hears fireworks outside. She knows the warm room may melt her, and still goes out. The question underneath: stay safe, or see something brief and beautiful?",
    ],
    items: [
      {
        title: "Techniques",
        list: [
          "Melting simulation + glue constraints — body breaks down, ornaments fall",
          "Particle fireworks + VEX conditions for secondary bursts",
          "Curtains in wind; outdoor water with mountain + time",
          "Fridge bottles and milk — random / proportional groups",
          "Fireplace smoke and fire; fur carpet; clock hands",
        ],
      },
      {
        title: "Problems & fixes",
        list: [
          "Constraint pendulum — wrong pivot; after enough frames the controller stopped → dropped constraints, used rotation for the swing instead",
        ],
        images: [
          {
            src: `${BASE}/04-melt.jpg`,
            alt: "Snowman melting simulation",
            caption: "Melting and ornaments.",
          },
          {
            src: `${BASE}/04-fireworks-vex.jpg`,
            alt: "Fireworks particle and VEX setup",
            caption: "Fireworks — particles and VEX triggers.",
          },
          {
            src: `${BASE}/04-pendulum-constraint.jpg`,
            alt: "RBD cone-twist constraint pendulum that failed",
            caption: "Pendulum — the constraint setup that didn’t hold.",
          },
          {
            src: `${BASE}/04-fridge-groups.jpg`,
            alt: "Fridge door items distributed with groups",
            caption: "Fridge door — groups and proportions.",
          },
        ],
      },
      {
        title: "Takeaway",
        paragraphs: [
          "Trying many tools shows breadth, but some parts (like fur) still need more depth. When a complicated setup fails, a simpler one that works is fine for that moment.",
        ],
        video: {
          src: `${BASE}/04-snowman.mp4`,
          aspect: "landscape",
          title: "Snowman and fireworks",
          caption: "Snowman and fireworks.",
          withSound: true,
        },
      },
    ],
  },
];

export const PROCEDURAL_ANIMATION_DETAIL_SECTIONS_ZH = [
  {
    id: "houdini",
    label: "Houdini 是什么",
    paragraphs: [
      "Houdini 用节点搭场景。每个节点是一步：做形状、复制、读数值、用时间带动。改前面的一步，后面靠它的部分会跟着变。",
      "工程感就在这里：你要定好依赖。高度可以带动横梁，帧数可以带动火车，粒子状态可以触发下一次爆炸。搭的是一个能检查、能改的小系统，不只是做完就定死的模型。",
      "四个课程作业：神社、水上火车、火锅、雪人。下面分别写用了什么、哪里卡住、怎么解。",
    ],
    image: {
      src: `${BASE}/01-torii.jpg`,
      alt: "鸟居的 Houdini 网络与参数，变换用表达式联动",
      caption: "左视口，中参数，右节点图。绿色栏是表达式——部件之间的关系，不是手填的死数字。",
    },
  },
  {
    id: "study-01",
    label: "01 — 琵琶湖",
    paragraphs: [
      "Gap year 在关西，去了白髭神社看琵琶湖上的鸟居，又和朋友看了琵琶湖烟花。想把那一晚做成场景：水上鸟居、风车、台阶、烟花。",
    ],
    items: [
      {
        title: "技术",
        list: [
          "鸟居 — Copy SOP 与表达式，位置和缩放保持联动",
          "风车 — $F 驱动旋转；数量与间距用参数",
          "风车细节 — 属性与组，做交错装饰",
          "台阶 — 台阶数量同时带动灯的数量和位置",
          "烟花 — Copy to Points，爆炸时间与位置可调",
        ],
      },
      {
        title: "问题与解决",
        list: [
          "第一版鸟居：柱子用硬编码坐标 — 改比例就要手算 → 改成位置／长度关系加 Copy，高度、宽度、间距一改，相关部分一起更新",
          "风车装饰：组属性分错两次 → 对照文档搞清组如何赋属性，再改对",
        ],
        images: [
          {
            src: `${BASE}/01-torii.jpg`,
            alt: "鸟居变换用表达式链接其他节点",
            caption: "鸟居 — 用 ch() 联动，而不是手填坐标。",
          },
          {
            src: `${BASE}/01-windmill-2.jpg`,
            alt: "风车细节的属性与组网络",
            caption: "风车细节 — 属性与组做变化。",
          },
          {
            src: `${BASE}/01-steps.jpg`,
            alt: "程序化台阶与灯",
            caption: "台阶 — 数量联动灯光。",
          },
        ],
      },
      {
        title: "启发",
        paragraphs: [
          "后来习惯先定关系，再让结构跟着长出来，而不是一个个手摆。片子主要是看拧参数时场景怎么变，不是成片。",
        ],
        video: {
          src: `${BASE}/01-lake.mp4`,
          aspect: "landscape",
          title: "琵琶湖",
          caption: "琵琶湖——拧参数。",
          withSound: true,
        },
      },
    ],
  },
  {
    id: "study-02",
    label: "02 — 水上火车",
    paragraphs: [
      "来自《千与千寻》的水上火车，还有那段配乐：到站、灯光、水面上安静的移动。",
    ],
    items: [
      {
        title: "技术",
        list: [
          "火车 — 物体级 CHOP／时间驱动运动",
          "灯光 — 颜色随距离，也走 CHOP",
          "植物 — 弯曲扭动用 CHOP 当风",
          "萤火虫 — 零重力粒子做闪烁（限制数量与寿命）+ 另用 CHOP 做浮动",
        ],
      },
      {
        title: "问题与解决",
        list: [
          "火车和灯起初在同一个 geo — 物体级 CHOP 只到 object，控不住 → 拆成两个物体",
          "改缩放后植物比例怪 → 把缩放参数拷到 XYZ，一个值保持比例",
          "所有植物朝向一样 → Attribute Create 加 ID，For-Each 按 ID 旋转",
        ],
        images: [
          {
            src: `${BASE}/02-train-chop.jpg`,
            alt: "火车物体时间表达式与旁侧 CHOP、站台和灯",
            caption: "火车 — 时间驱动；站台／火车／灯分开成物体。",
          },
          {
            src: `${BASE}/02-plant-attrib.jpg`,
            alt: "植物 ID 与缩放的 Attribute Create 与 For-Each",
            caption: "植物 — ID + For-Each 改朝向；缩放三轴联动。",
          },
          {
            src: `${BASE}/02-fireflies.jpg`,
            alt: "萤火虫粒子设置",
            caption: "萤火虫 — 粒子闪烁，CHOP 浮动。",
          },
        ],
      },
      {
        title: "启发",
        paragraphs: [
          "物体层级决定你能控到哪。变化来自每份拷贝上的数据，不是一只只去拧朝向。",
        ],
        video: {
          src: `${BASE}/02-train.mp4`,
          aspect: "landscape",
          title: "水上火车",
          caption: "水上火车——CHOP 带动。",
          withSound: true,
        },
      },
    ],
  },
  {
    id: "study-03",
    label: "03 — 火锅",
    paragraphs: [
      "火锅场景，练烟、布料和火，也试了在锅里放液体。",
    ],
    items: [
      {
        title: "技术",
        list: [
          "烟、布料（Vellum）、火的模拟",
          "粒子做落下的食材",
          "试过粒子／液体汤底，食材下去时有涟漪",
        ],
      },
      {
        title: "问题与解决",
        list: [
          "本想把锅当固体边界留住液体 — 这套几何下边界一直不稳 → 改 Static Object，让食材融入汤底（沉下去的感觉），不是完整液体交互",
          "流体边界以后还要再学；复杂形状在这里很难",
        ],
        images: [
          {
            src: `${BASE}/03-overview.jpg`,
            alt: "火锅场景总览",
            caption: "场景总览。",
          },
          {
            src: `${BASE}/03-fire.jpg`,
            alt: "锅下火的模拟节点",
            caption: "火 — pyro／DOP 网络。",
          },
          {
            src: `${BASE}/03-pot.jpg`,
            alt: "火锅与汤底设置",
            caption: "锅 — 液体边界尝试的地方。",
          },
        ],
      },
      {
        title: "启发",
        paragraphs: [
          "粒子参数多，还会互相影响。我靠日常物理感觉——重力、摩擦、风——去试。没有唯一正确的一组数；几条路都能看起来还行。",
        ],
        video: {
          src: `${BASE}/03-hotpot.mp4`,
          aspect: "landscape",
          title: "火锅",
          caption: "火锅——烟、布料、火、食材。",
          withSound: true,
        },
      },
    ],
  },
  {
    id: "study-04",
    label: "04 — 雪人与烟花",
    paragraphs: [
      "冰箱里安全的雪人听见外面烟花。她知道暖屋可能把她融化，还是走了出去。底下的问题是：要安全，还是去看一眼短暂的漂亮？",
    ],
    items: [
      {
        title: "技术",
        list: [
          "融化模拟 + 胶水约束 — 身体解体、装饰掉落",
          "粒子烟花 + VEX 条件触发二次爆炸",
          "窗帘随风；室外水面用 mountain + 时间",
          "冰箱门水瓶与牛奶 — 随机／比例分组",
          "壁炉烟与火；地毯 fur；钟表指针",
        ],
      },
      {
        title: "问题与解决",
        list: [
          "约束钟摆 — 轴心偏了；过若干帧控制器也不动 → 放弃约束，改用旋转做摆动",
        ],
        images: [
          {
            src: `${BASE}/04-melt.jpg`,
            alt: "雪人融化模拟",
            caption: "融化与装饰。",
          },
          {
            src: `${BASE}/04-fireworks-vex.jpg`,
            alt: "烟花粒子与 VEX",
            caption: "烟花 — 粒子与 VEX 触发。",
          },
          {
            src: `${BASE}/04-pendulum-constraint.jpg`,
            alt: "失败的约束钟摆设置",
            caption: "钟摆 — 没稳住的约束方案。",
          },
          {
            src: `${BASE}/04-fridge-groups.jpg`,
            alt: "冰箱门分组摆放",
            caption: "冰箱门 — 组与比例。",
          },
        ],
      },
      {
        title: "启发",
        paragraphs: [
          "功能铺得开，能见广度；有些部分（比如 fur）还要再挖深。复杂方案撑不住时，简单但能跑的做法，那一刻就够用。",
        ],
        video: {
          src: `${BASE}/04-snowman.mp4`,
          aspect: "landscape",
          title: "雪人与烟花",
          caption: "雪人与烟花。",
          withSound: true,
        },
      },
    ],
  },
];

