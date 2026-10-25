import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
import { useSidebarOverride } from "../context/SidebarOverrideContext";
import HomeLayout from "../components/layouts/HomeLayout";
import VibeProjectCard from "../components/caseStudies/VibeProjectCard";
import SelectedWorkCard from "../components/caseStudies/SelectedWorkCard";
import {
  VIBE_PROJECTS,
  SELECTED_PROJECTS,
  RESEARCH_CRAFT_PROJECTS,
} from "../lib/caseStudies";
import { HOME_PATH, projectIdFromPath } from "../lib/routes";
import { PORTFOLIO_LINKS } from "../lib/links";

const VibeProjectDetail = lazy(() =>
  import("../components/caseStudies/VibeProjectDetail"),
);

// Projects with a native case-study detail at /<id>: vibe, selected with
// native detail, and Research & Craft.
// Order matches the page sections so “Next project” walks Selected →
// Research & Craft → Vibe Coding.
const DETAIL_PROJECTS = [
  ...SELECTED_PROJECTS.filter(
    (project) => project.detail || project.detailSections,
  ),
  ...RESEARCH_CRAFT_PROJECTS,
  ...VIBE_PROJECTS,
];

// Every project that can drive the sidebar on hover. Their role and
// timeline values are passed as `reserve` candidates so the sidebar slot is
// always sized to the longest one (no jump when moving between cards).
const HOVER_PROJECTS = [
  ...SELECTED_PROJECTS,
  ...RESEARCH_CRAFT_PROJECTS,
  ...VIBE_PROJECTS,
];

/** The sidebar's timeline text for a project: year · duration, from the
 *  same `duration` field the detail footer calls out — one source, so
 *  hover, the open detail, and the footer can never disagree. */
function projectTimelineValue(project, isZh) {
  const duration =
    isZh && project.durationZh ? project.durationZh : project.duration;
  return [project.timeline, duration].filter(Boolean).join(" · ");
}

/** Role / timeline items a project lends the sidebar's personal
 *  section — identical for hover and for the open detail, reserves
 *  included, so opening a project never resizes or swaps the block. */
function projectSidebarItems(project, isZh) {
  const items = [];
  const role = isZh ? project.roleZh : project.role;
  if (role) {
    items.push({
      section: "personal",
      label: isZh ? "项目角色" : "Project role",
      value: role,
      reserve: HOVER_PROJECTS.map((p) => (isZh ? p.roleZh : p.role)),
    });
  }
  if (project.timeline) {
    items.push({
      section: "personal",
      label: isZh ? "时间线" : "Timeline",
      value: projectTimelineValue(project, isZh),
      reserve: HOVER_PROJECTS.map((p) => projectTimelineValue(p, isZh)),
    });
  }
  return items;
}

const LABELS = {
  en: {
    viewAll: "View all work",
    selectedWork: "Selected Work",
    selectedWorkNote:
      "Case studies in making complex systems understandable, from research and product strategy to working code.",
    researchCraft: "Research & Craft",
    researchCraftNote:
      "Two kinds of work side by side: co-design with people, and procedural motion in Houdini.",
    vibeCoding: "Vibe Coding",
    vibeCodingNote:
      "Interactive experiments designed and built with AI coding agents — best experienced live.",
  },
  zh: {
    viewAll: "查看全部作品",
    selectedWork: "精选作品",
    selectedWorkNote:
      "让复杂系统变得可理解的案例——从研究、产品策略到可运行的代码。",
    researchCraft: "研究与制作",
    researchCraftNote:
      "两种并列的工作：和人一起共创，以及在 Houdini 里做程序化运动。",
    vibeCoding: "Vibe Coding",
    vibeCodingNote:
      "与 AI 编程助手共同设计并构建的互动实验——建议亲自体验。",
  },
};

export default function LibraryPage({ embedded = false }) {
  const { language } = useAppSettings();
  const labels = LABELS[language] ?? LABELS.en;
  const { setMetadataOverride } = useSidebarOverride();
  const hoverLeaveTimerRef = useRef(null);
  const contentRef = useRef(null);
  const savedScrollRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(
    () => () => window.clearTimeout(hoverLeaveTimerRef.current),
    [],
  );

  // A project detail is a real route (/<id>) so one case study can be
  // shared by link. The id comes from the URL, never local state.
  const routeProjectId = projectIdFromPath(location.pathname);
  const routeProject = useMemo(
    () =>
      routeProjectId
        ? DETAIL_PROJECTS.find((project) => project.id === routeProjectId) ??
          null
        : null,
    [routeProjectId],
  );

  // The project the overlay shows while it is closing: the route has
  // already returned Home (so the destination settles, scroll and
  // all, under the backdrop), but the overlay keeps this snapshot
  // until its fade-out finishes and it unmounts.
  const [closingProject, setClosingProject] = useState(null);
  const displayedProject = routeProject ?? closingProject;

  const getScroller = () => contentRef.current?.closest(".home-layout");

  // A project route (/<id>) opens the detail as the original
  // full-screen overlay; the URL is what makes it shareable, the
  // presentation stays the modal. Entering titles the document after
  // the project and lets the sidebar carry its role / timeline.
  useEffect(() => {
    if (!routeProject || embedded) return undefined;
    const previousTitle = document.title;
    document.title = `${routeProject.title} — Longyue Qin`;
    if (!embedded) {
      const items = projectSidebarItems(routeProject, language === "zh");
      if (items.length) {
        setMetadataOverride({ id: routeProject.id, items });
      }
    }
    return () => {
      document.title = previousTitle;
      if (!embedded) setMetadataOverride(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeProject?.id]);

  // Coming back (close or browser Back): restore this instance's
  // scroll position saved when the card was opened — Home's embedded
  // instance restores the Home scroll, the Library instance its own.
  useEffect(() => {
    if (routeProject || savedScrollRef.current === null) return;
    const y = savedScrollRef.current;
    savedScrollRef.current = null;
    // The grid remounts on return; give its layout a beat to settle
    // before restoring, or the browser clamps the offset back to 0.
    const timer = window.setTimeout(
      () => getScroller()?.scrollTo({ top: y }),
      60,
    );
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeProject]);

  // Hovering (or keyboard-focusing) a card adds only that project's role
  // and timeline to the sidebar's personal section (Section C). There is
  // no "currently viewing" project entry: the context section (Section B)
  // keeps showing the page directory, on hover and on click alike.
  const handleCardHover = (project) => {
    window.clearTimeout(hoverLeaveTimerRef.current);

    if (!project) {
      // While a detail is open the overlay covers the card, which reads
      // as a leave — never clear the open project's sidebar block for it.
      if (routeProject) return;
      // Moving from one card to the next fires leave before enter. Defer the
      // restore briefly so the next card can cancel it; this keeps the
      // role / timeline fields mounted and updates only their values.
      hoverLeaveTimerRef.current = window.setTimeout(() => {
        setMetadataOverride(null);
      }, 80);
      return;
    }
    const items = projectSidebarItems(project, language === "zh");
    setMetadataOverride(items.length ? { id: project.id, items } : null);
  };

  const handleCardOpen = (project) => {
    // Keep the hovered project's sidebar block exactly as it is — the
    // entering effect re-asserts the identical items for the open
    // detail. Clearing it here first made the block blink on open.
    window.clearTimeout(hoverLeaveTimerRef.current);
    const scroller = getScroller();
    if (scroller) savedScrollRef.current = scroller.scrollTop;
    navigate(`/${project.id}`);
  };

  // Details hang off Home, the page the projects live on: closing one
  // returns there, never to a separate collection stop in between.
  // The return starts the moment closing does — Home lands under the
  // backdrop while the overlay is still fading (see closingProject),
  // so the fade reveals the destination, never the grid behind.
  const handleDetailCloseStart = () => {
    if (routeProject) setClosingProject(routeProject);
    navigate(HOME_PATH);
  };
  const handleDetailClosed = () => setClosingProject(null);

  const nextProject = displayedProject
    ? DETAIL_PROJECTS[
        (DETAIL_PROJECTS.findIndex((p) => p.id === displayedProject.id) +
          1) %
          DETAIL_PROJECTS.length
      ]
    : null;

  const content = (
    <div ref={contentRef} className={embedded ? "home-work" : ""}>
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
              onOpen={handleCardOpen}
              onHover={handleCardHover}
            />
          ))}
        </div>
      </section>

      <section
        id="research-craft"
        className="case-studies__section"
        aria-label={labels.researchCraft}
      >
        <h2 className="case-studies__section-title">{labels.researchCraft}</h2>
        <p className="case-studies__section-note">{labels.researchCraftNote}</p>
        <div className="vibe-grid">
          {RESEARCH_CRAFT_PROJECTS.map((project) => (
            <SelectedWorkCard
              key={project.id}
              project={project}
              onOpen={handleCardOpen}
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

    </div>
  );

  if (embedded) return content;

  return (
    <HomeLayout className="home-layout--library">
      {content}
      {displayedProject ? (
        <Suspense fallback={null}>
          <VibeProjectDetail
            project={displayedProject}
            onCloseStart={handleDetailCloseStart}
            onClosed={handleDetailClosed}
            nextProject={nextProject}
            onOpenNext={handleCardOpen}
          />
        </Suspense>
      ) : null}
    </HomeLayout>
  );
}
