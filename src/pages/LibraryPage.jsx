import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSettings } from "../context/AppSettingsContext";
import { useSidebarOverride } from "../context/SidebarOverrideContext";
import HomeLayout from "../components/layouts/HomeLayout";
import ProjectShelf from "../components/caseStudies/ProjectShelf";
import {
  VIBE_PROJECTS,
  SELECTED_PROJECTS,
  RESEARCH_PROJECTS,
  THREE_D_PROJECTS,
  HOME_SELECTED_PROJECTS,
  HOME_VIBE_FOLDER_IDS,
  getProjectById,
} from "../lib/caseStudies";

/** Playground catalogue — same order as the home folder. */
const PLAYGROUND_SECTION_PROJECTS = HOME_VIBE_FOLDER_IDS.map(
  getProjectById,
).filter(Boolean);
import { HOME_PATH, LIBRARY_PATH, projectIdFromPath } from "../lib/routes";
import PageCopyright from "../components/shared/PageCopyright";

const VibeProjectDetail = lazy(() =>
  import("../components/caseStudies/VibeProjectDetail"),
);

// Projects with a native case-study detail at /<id>.
// Order matches the page sections: Selected → Playground → 3D → Research.
const DETAIL_PROJECTS = [
  ...SELECTED_PROJECTS.filter(
    (project) =>
      (project.detail || project.detailSections || project.caseStudy) &&
      project.id !== "emotion-garden",
  ),
  ...HOME_VIBE_FOLDER_IDS.map(getProjectById).filter(Boolean),
  ...THREE_D_PROJECTS,
  ...RESEARCH_PROJECTS,
];

/** Home Selected Work rail — includes Oscar AR; Projects digital section does not. */
const HOME_SELECTED_SEQUENCE = HOME_SELECTED_PROJECTS;

const HOME_PLAYGROUND_SEQUENCE = HOME_VIBE_FOLDER_IDS.map(getProjectById).filter(
  Boolean,
);

function detailSequenceFor(from, projectId) {
  if (from === "home") {
    if (HOME_SELECTED_SEQUENCE.some((project) => project.id === projectId)) {
      return HOME_SELECTED_SEQUENCE;
    }
    if (HOME_PLAYGROUND_SEQUENCE.some((project) => project.id === projectId)) {
      return HOME_PLAYGROUND_SEQUENCE;
    }
  }
  return DETAIL_PROJECTS;
}

/** Prefer router state; fall back to the underlay page (home vs projects). */
function entryFromLocation(location, embedded) {
  const fromState = location.state?.from;
  if (fromState === "home" || fromState === "library") return fromState;
  if (typeof document !== "undefined" && document.body.dataset.page === "home") {
    return "home";
  }
  return embedded ? "home" : "library";
}

// Every project that can drive the sidebar on hover. Their role and
// timeline values are passed as `reserve` candidates so the sidebar slot is
// always sized to the longest one (no jump when moving between cards).
const HOVER_PROJECTS = [
  ...SELECTED_PROJECTS,
  ...VIBE_PROJECTS,
  ...THREE_D_PROJECTS,
  ...RESEARCH_PROJECTS,
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
    pageTitle: "Projects",
    pageNote:
      "Some of this was built inside a real product team, some I carried from first sketch to working code on my own, and some is me picking up a new medium to see how far it goes. Each card opens into how I got there—and each time I thought it through, I grew.",
    caseStudies: "Digital product design",
    caseStudiesNote:
      "Internship and 0→1 product work—flows you can poke at.",
    research: "Design research",
    researchNote: "Co-design with people—workshops that leave a film, a town, a question.",
    threeD: "3D",
    threeDNote: "AR built onto the printed page, and Houdini motion studies.",
    playground: "Playground",
    playgroundNote:
      "Quick experiments with AI coding tools—start curious, end with something you can play with.",
  },
  zh: {
    pageTitle: "作品",
    pageNote:
      "有些是在真实的产品团队里做出来的，有些是我一个人从草图做到能跑的代码，还有一些，是我拿起一种新媒介，试试它能走多远。每张卡片点开，都是我一路怎么想过来的——每一次思考，都有成长。",
    caseStudies: "数字产品设计",
    caseStudiesNote: "实习与 0→1 产品：能上手戳的流程。",
    research: "设计研究",
    researchNote: "和人一起共创——工作坊留下的短片、小镇，和一个问题。",
    threeD: "3D",
    threeDNote: "落在纸页上的 AR，以及 Houdini 里的程序化运动。",
    playground: "Playground",
    playgroundNote: "和 AI 编程工具一起快速试——先好奇，再做出能玩的东西。",
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

  const handleCardOpen = (project, options = {}) => {
    // Keep the hovered project's sidebar block exactly as it is — the
    // entering effect re-asserts the identical items for the open
    // detail. Clearing it here first made the block blink on open.
    window.clearTimeout(hoverLeaveTimerRef.current);
    const scroller = getScroller();
    if (scroller) savedScrollRef.current = scroller.scrollTop;
    // Preserve entry origin across prev/next so Home Selected stays a
    // Home walk, and Projects keeps the catalogue order.
    const from = options.from ?? entryFromLocation(location, embedded);
    navigate(`/${project.id}`, {
      state: { from },
    });
  };

  // Close returns to wherever the card was opened — Home's featured
  // strip, or the full Projects catalogue. Destination lands under the
  // backdrop while the overlay is still fading (see closingProject).
  const handleDetailCloseStart = () => {
    if (routeProject) setClosingProject(routeProject);
    const from = entryFromLocation(location, embedded);
    navigate(from === "library" ? LIBRARY_PATH : HOME_PATH);
  };
  const handleDetailClosed = () => setClosingProject(null);

  const detailEntryFrom = entryFromLocation(location, embedded);
  const detailSequence = displayedProject
    ? detailSequenceFor(detailEntryFrom, displayedProject.id)
    : DETAIL_PROJECTS;
  const detailIndex = displayedProject
    ? detailSequence.findIndex((p) => p.id === displayedProject.id)
    : -1;
  const nextProject =
    detailIndex >= 0
      ? detailSequence[(detailIndex + 1) % detailSequence.length]
      : null;
  const prevProject =
    detailIndex >= 0
      ? detailSequence[
          (detailIndex - 1 + detailSequence.length) % detailSequence.length
        ]
      : null;

  const content = (
    <div ref={contentRef} className={embedded ? "home-work" : "projects-page"}>
      {!embedded ? (
        <header className="projects-page__header">
          <h1 className="projects-page__title">{labels.pageTitle}</h1>
          <p className="projects-page__note">{labels.pageNote}</p>
        </header>
      ) : null}
      {/* The library: one shelf per section, one book per project. */}
      <ProjectShelf
        id="case-studies"
        title={labels.caseStudies}
        note={labels.caseStudiesNote}
        projects={SELECTED_PROJECTS.filter(
          (project) => project.id !== "emotion-garden",
        )}
        onOpen={handleCardOpen}
        onHover={handleCardHover}
      />
      <ProjectShelf
        id="playground"
        title={labels.playground}
        note={labels.playgroundNote}
        projects={PLAYGROUND_SECTION_PROJECTS}
        onOpen={handleCardOpen}
        onHover={handleCardHover}
      />
      <ProjectShelf
        id="three-d"
        title={labels.threeD}
        note={labels.threeDNote}
        projects={THREE_D_PROJECTS}
        onOpen={handleCardOpen}
        onHover={handleCardHover}
      />
      <ProjectShelf
        id="research"
        title={labels.research}
        note={labels.researchNote}
        projects={RESEARCH_PROJECTS}
        onOpen={handleCardOpen}
        onHover={handleCardHover}
      />

      {!embedded ? <PageCopyright /> : null}
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
            prevProject={prevProject}
            onOpenNext={(project) =>
              handleCardOpen(project, { from: detailEntryFrom })
            }
            onOpenPrev={(project) =>
              handleCardOpen(project, { from: detailEntryFrom })
            }
          />
        </Suspense>
      ) : null}
    </HomeLayout>
  );
}
