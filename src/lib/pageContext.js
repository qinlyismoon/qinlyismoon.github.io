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
        { label: "Current location", value: "Columbus, Ohio" },
        {
          key: "availability",
          label: "Current availability",
          value: "Open to opportunities",
          status: true,
        },
      ],
    },
    desk: {
      metadata: [
        { key: "localTime", label: "Current time", dynamic: "localTime" },
        // Note: on the desk page SiteShell overrides this static value at
        // runtime with useDeskEnvironment().weather.label — edit the hook,
        // not this line, to change what the sidebar shows.
        { key: "weather", label: "Current weather", value: "22°C · Sunny" },
        { key: "currentStatus", label: "Current status", value: "Lamp off" },
      ],
    },
    versionHistory: {
      metadata: [
        { label: "Current chapter", value: "Designing in the Age of AI" },
        { label: "Version", value: "v2.1.0" },
      ],
    },
    caseStudies: {
      // Default (non-hover) state: a small directory of the page's
      // sections. Each link smooth-scrolls to its section. Hovering a
      // project card temporarily replaces this with that project's
      // role and timeline (see LibraryPage).
      metadata: [
        {
          label: "Project Collection",
          links: [
            { label: "Selected Work", target: "selected-work" },
            { label: "Vibe Coding", target: "vibe-coding" },
          ],
        },
      ],
    },
  },
  zh: {
    identity: { name: "Phoebe Qin", roles: ["设计工程师 & 产品设计师"] },
    contactLabels: { email: "邮箱", github: "GitHub", linkedin: "LinkedIn" },
    home: {
      metadata: [
        { label: "当前位置", value: "俄亥俄州哥伦布市" },
        {
          key: "availability",
          label: "当前求职状态",
          value: "正在寻找新的机会",
          status: true,
        },
      ],
    },
    desk: {
      metadata: [
        { key: "localTime", label: "当前时间", dynamic: "localTime" },
        // Note: on the desk page SiteShell overrides this static value at
        // runtime with useDeskEnvironment().weather.label — edit the hook,
        // not this line, to change what the sidebar shows.
        { key: "weather", label: "当前天气", value: "22°C · 晴" },
        { key: "currentStatus", label: "当前状态", value: "台灯关闭" },
      ],
    },
    versionHistory: {
      // Chinese status labels pending the user's approval — fall back to
      // English rather than inventing translations.
      metadata: [
        { label: "Current chapter", value: "Designing in the Age of AI" },
        { label: "版本", value: "v2.1.0" },
      ],
    },
    caseStudies: {
      metadata: [
        {
          label: "作品集",
          links: [
            { label: "精选作品", target: "selected-work" },
            { label: "Vibe Coding", target: "vibe-coding" },
          ],
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
