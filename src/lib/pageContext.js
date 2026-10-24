/**
 * Sidebar information architecture — one controlled vocabulary across the
 * whole site. Labels may only come from these families:
 *   Current ... / Last ... / Project ... / Open ...
 * Labels describe status, not metadata: who I am, where I am, what I'm
 * currently doing — the sidebar is a persistent status panel, the page
 * tells the story. Avoid mixing in other systems (Based in, Version,
 * Focus, Info, Library, Links). Exception: on document pages the metadata
 * region can become a section directory, headed by a page-appropriate
 * title (e.g. `Project Collection`).
 * The sidebar is a persistent status panel: who I am, where I am,
 * what I'm currently doing. Only the content changes per page — never the
 * layout, spacing, or type system.
 */
const PAGE_CONTEXT = {
  en: {
    identity: { name: "Phoebe Qin", roles: ["Design Engineer & Product Designer"] },
    contactLabels: { email: "Email", github: "GitHub", linkedin: "LinkedIn" },
    home: {
      metadata: [
        {
          section: "personal",
          label: "Current location",
          value: "Columbus, Ohio",
        },
        {
          section: "personal",
          key: "availability",
          label: "Current availability",
          value: "Open to opportunities",
          status: true,
        },
      ],
    },
    desk: {
      metadata: [
        {
          section: "context",
          key: "localTime",
          label: "Current time",
          dynamic: "localTime",
        },
        // Note: on the desk page SiteShell overrides this static value at
        // runtime with useDeskEnvironment().weather.label — edit the hook,
        // not this line, to change what the sidebar shows.
        {
          section: "context",
          key: "weather",
          label: "Current weather",
          value: "22°C · Sunny",
        },
        {
          section: "context",
          key: "currentStatus",
          label: "Current status",
          value: "Lamp off",
        },
      ],
    },
    versionHistory: {
      metadata: [
        {
          section: "context",
          label: "Current chapter",
          value: "Designing in the Age of AI",
        },
        { section: "context", label: "Current version", value: "v2.4.3" },
      ],
    },
    teaching: {
      // Section B holds the page directory; Section C holds the personal
      // role. Links smooth-scroll to each section.
      metadata: [
        {
          section: "personal",
          label: "Current role",
          value: "Graduate Teaching Associate",
        },
        {
          section: "context",
          label: "Teaching Portfolio",
          links: [
            { label: "Introduction", target: "teaching-introduction" },
            { label: "Teaching Philosophy", target: "teaching-philosophy" },
            { label: "Teaching Experience", target: "teaching-experience" },
          ],
        },
      ],
    },
    caseStudies: {
      // Default (non-hover) Section B: a small directory of the page's
      // sections. Hovering a project card replaces only that section with
      // the project context (see LibraryPage); the personal section below
      // stays mounted and gains the project's role / timeline there.
      metadata: [
        {
          section: "context",
          label: "Project Collection",
          links: [
            { label: "Selected Work", target: "selected-work" },
            { label: "Vibe Coding", target: "vibe-coding" },
          ],
        },
        {
          section: "personal",
          label: "Current location",
          value: "Columbus, Ohio",
        },
        {
          section: "personal",
          key: "availability",
          label: "Current availability",
          value: "Open to opportunities",
          status: true,
        },
      ],
    },
  },
  zh: {
    identity: { name: "Phoebe Qin", roles: ["设计工程师 & 产品设计师"] },
    contactLabels: { email: "邮箱", github: "GitHub", linkedin: "LinkedIn" },
    home: {
      metadata: [
        {
          section: "personal",
          label: "当前位置",
          value: "俄亥俄州哥伦布市",
        },
        {
          section: "personal",
          key: "availability",
          label: "当前求职状态",
          value: "正在寻找新的机会",
          status: true,
        },
      ],
    },
    desk: {
      metadata: [
        {
          section: "context",
          key: "localTime",
          label: "当前时间",
          dynamic: "localTime",
        },
        // Note: on the desk page SiteShell overrides this static value at
        // runtime with useDeskEnvironment().weather.label — edit the hook,
        // not this line, to change what the sidebar shows.
        {
          section: "context",
          key: "weather",
          label: "当前天气",
          value: "22°C · 晴",
        },
        {
          section: "context",
          key: "currentStatus",
          label: "当前状态",
          value: "台灯关闭",
        },
      ],
    },
    versionHistory: {
      // Chinese status labels pending the user's approval — fall back to
      // English rather than inventing translations.
      metadata: [
        {
          section: "context",
          label: "Current chapter",
          value: "Designing in the Age of AI",
        },
        { section: "context", label: "当前版本", value: "v2.4.3" },
      ],
    },
    teaching: {
      // Chinese labels are a draft pending the user's approval.
      metadata: [
        {
          section: "personal",
          label: "当前角色",
          value: "研究生助教",
        },
        {
          section: "context",
          label: "教学档案",
          links: [
            { label: "介绍", target: "teaching-introduction" },
            { label: "教学理念", target: "teaching-philosophy" },
            { label: "教学经历", target: "teaching-experience" },
          ],
        },
      ],
    },
    caseStudies: {
      metadata: [
        {
          section: "context",
          label: "作品集",
          links: [
            { label: "精选作品", target: "selected-work" },
            { label: "Vibe Coding", target: "vibe-coding" },
          ],
        },
        {
          section: "personal",
          label: "当前位置",
          value: "俄亥俄州哥伦布市",
        },
        {
          section: "personal",
          key: "availability",
          label: "当前求职状态",
          value: "正在寻找新的机会",
          status: true,
        },
      ],
    },
  },
};

export function getPageContext(language, page) {
  const copy = PAGE_CONTEXT[language] ?? PAGE_CONTEXT.en;
  return {
    identity: copy.identity,
    contactLabels: copy.contactLabels,
    ...copy[page],
  };
}
