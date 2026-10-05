import { useEffect, useRef, useState } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { useSidebarOverride } from "../context/SidebarOverrideContext";
import HomeLayout from "../components/layouts/HomeLayout";
import VibeProjectCard from "../components/caseStudies/VibeProjectCard";
import SelectedWorkCard from "../components/caseStudies/SelectedWorkCard";
import VibeProjectDetail from "../components/caseStudies/VibeProjectDetail";
import { VIBE_PROJECTS, SELECTED_PROJECTS } from "../lib/caseStudies";
import { PORTFOLIO_LINKS } from "../lib/links";

const LABELS = {
  en: {
    viewAll: "View all work",
    selectedWork: "Selected Work",
    selectedWorkNote:
      "Case studies in making complex systems understandable, from research and product strategy to working code.",
    vibeCoding: "Vibe Coding",
    vibeCodingNote:
      "Interactive experiments designed and built with AI coding agents — best experienced live.",
  },
  zh: {
    viewAll: "查看全部作品",
    selectedWork: "精选作品",
    selectedWorkNote:
      "让复杂系统变得可理解的案例——从研究、产品策略到可运行的代码。",
    vibeCoding: "Vibe Coding",
    vibeCodingNote:
      "与 AI 编程助手共同设计并构建的互动实验——建议亲自体验。",
  },
};

export default function LibraryPage({ embedded = false }) {
  const { language } = useAppSettings();
  const labels = LABELS[language] ?? LABELS.en;
  const [activeProject, setActiveProject] = useState(null);
  const { setMetadataOverride } = useSidebarOverride();
  const hoverLeaveTimerRef = useRef(null);

  useEffect(
    () => () => window.clearTimeout(hoverLeaveTimerRef.current),
    [],
  );

  // Project details are a focused reading surface. Publish that state to the
  // shared chrome layer so the persistent navigation is removed while the
  // modal is open, then restored on close/unmount.
  useEffect(() => {
    if (!activeProject) {
      delete document.body.dataset.projectDetail;
      return undefined;
    }

    document.body.dataset.projectDetail = "open";
    return () => {
      delete document.body.dataset.projectDetail;
    };
  }, [activeProject]);

  // Hovering (or keyboard-focusing) a card swaps the sidebar's metadata
  // items to that project's role and timeline, replacing the default
  // section directory. Labels come from the controlled pageContext
  // vocabulary; only the values change. Missing values are skipped.
  const handleCardHover = (project) => {
    window.clearTimeout(hoverLeaveTimerRef.current);

    if (!project) {
      // Moving from one card to the next fires leave before enter. Defer the
      // directory restore briefly so the next card can cancel it; this keeps
      // Project role / Timeline mounted and updates only their values.
      hoverLeaveTimerRef.current = window.setTimeout(() => {
        setMetadataOverride(null);
      }, 80);
      return;
    }
    const isZh = language === "zh";
    const items = [];
    const role = isZh ? project.roleZh : project.role;
    if (role) {
      items.push({
        label: isZh ? "项目角色" : "Project role",
        value: role,
      });
    }
    if (project.timeline) {
      items.push({
        label: isZh ? "时间线" : "Timeline",
        value: project.timeline,
      });
    }
    setMetadataOverride(items.length ? { id: project.id, items } : null);
  };

  const handleCardOpen = (project) => {
    setMetadataOverride(null);
    setActiveProject(project);
  };

  const content = (
    <div className={embedded ? "home-work" : ""}>
      <section
        id="selected-work"
        className="case-studies__section"
        aria-label={labels.selectedWork}
      >
        <div className="case-studies__section-header">
          <h2 className="case-studies__section-title">{labels.selectedWork}</h2>
          <a
            href={PORTFOLIO_LINKS.design}
            target="_blank"
            rel="noreferrer"
            className="case-studies__view-all"
          >
            {labels.viewAll} <span className="external-arrow" aria-hidden="true">↗︎</span>
          </a>
        </div>
        <p className="case-studies__section-note">{labels.selectedWorkNote}</p>
        <div className="vibe-grid">
          {SELECTED_PROJECTS.map((project) => (
            <SelectedWorkCard
              key={project.id}
              project={project}
              onHover={handleCardHover}
            />
          ))}
        </div>
      </section>

      <section
        id="vibe-coding"
        className="case-studies__section"
        aria-label={labels.vibeCoding}
      >
        <h2 className="case-studies__section-title">{labels.vibeCoding}</h2>
        <p className="case-studies__section-note">{labels.vibeCodingNote}</p>
        <div className="vibe-grid">
          {VIBE_PROJECTS.map((project) => (
            <VibeProjectCard
              key={project.id}
              project={project}
              onOpen={handleCardOpen}
              onHover={handleCardHover}
            />
          ))}
        </div>
      </section>

      {activeProject ? (
        <VibeProjectDetail
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      ) : null}
    </div>
  );

  return embedded ? content : <HomeLayout className="home-layout--library">{content}</HomeLayout>;
}
