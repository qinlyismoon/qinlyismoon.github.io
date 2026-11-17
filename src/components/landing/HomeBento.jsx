import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSettings } from "../../context/AppSettingsContext";
import { usePageTransition } from "../../context/PageTransitionContext";
import AboutChineseName from "../about/AboutChineseName";
import BentoSquareTile from "./BentoSquareTile";
import HomeAboutTile from "./HomeAboutTile";
import HomeRotatingLine from "./HomeRotatingLine";
import HomeStatusTiles from "./HomeStatusTiles";
import VibeFolderTile from "./VibeFolderTile";
import HobbyListTile from "./HobbyListTile";
import TeachingTile from "./TeachingTile";
import SelectedWorkRail from "./SelectedWorkRail";
import { getHomeCopy } from "../../lib/copy";
import { getHomeBentoCopy } from "../../lib/homeBento";
import { PORTFOLIO_LINKS } from "../../lib/links";
import {
  HOME_VIBE_FOLDER_IDS,
  HOME_SELECTED_PROJECTS,
  getProjectById,
} from "../../lib/caseStudies";
import { ABOUT_PATH, LIBRARY_PATH } from "../../lib/routes";
import PageCopyright from "../shared/PageCopyright";

export default function HomeBento() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getHomeCopy(language), [language]);
  const bento = useMemo(() => getHomeBentoCopy(language), [language]);
  const navigate = useNavigate();
  const { navigateToDesk, navigateToLibrary, navigateToTeaching } =
    usePageTransition();

  const furin = useMemo(() => getProjectById("onomichi-furin"), []);
  // Vibe folder uses static thumbs; the front Furin square keeps the gif.
  const vibeProjects = useMemo(
    () => HOME_VIBE_FOLDER_IDS.map(getProjectById).filter(Boolean),
    [],
  );

  const handleOpen = (project) => {
    // Furin + Emotion Garden: jump straight into the live prototype.
    if (
      project?.liveUrl &&
      (project.id === "onomichi-furin" || project.id === "emotion-garden")
    ) {
      window.open(project.liveUrl, "_blank", "noopener,noreferrer");
      return;
    }
    navigate(`/${project.id}`, { state: { from: "home" } });
  };

  const openFurinLive = () => {
    if (!furin?.liveUrl) return;
    window.open(furin.liveUrl, "_blank", "noopener,noreferrer");
  };

  const openVibeCatalogue = () => {
    navigateToLibrary({ silent: true });
    window.setTimeout(() => {
      document.getElementById("vibe-coding")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 420);
  };

  return (
    <div className="home-bento">
      <header className="home-bento__masthead">
        <div className="home-bento__brand">
          <div className="home-bento__name-row">
            <h1 className="home-bento__name">
              {copy.name}
              <span className="home-bento__name-en"> ({copy.nameEn})</span>
            </h1>
            <AboutChineseName
              akaLabel={copy.akaLabel}
              chineseName={copy.chineseName}
              cardAriaLabel={copy.nameCardAria}
            />
          </div>
        </div>

        <div className="home-bento__identity">
          <p className="home-bento__role">{bento.roleLine}</p>
          <HomeRotatingLine lines={bento.rotatingLines} />
        </div>

        <nav
          className="home-bento__links home-bento__links--masthead"
          aria-label={language === "zh" ? "联系方式" : "Contact"}
        >
          <a href={PORTFOLIO_LINKS.email}>{copy.email}</a>
          <a href={PORTFOLIO_LINKS.github} target="_blank" rel="noreferrer">
            GitHub <span className="external-arrow" aria-hidden="true">↗︎</span>
          </a>
          <a href={PORTFOLIO_LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <span className="external-arrow" aria-hidden="true">↗︎</span>
          </a>
        </nav>
      </header>

      <section className="bento-grid" aria-label="Home">
        <div className="home-about-row">
          <HomeAboutTile
            copy={bento}
            onMore={() => navigate(ABOUT_PATH, { state: { from: "home" } })}
          />
          <div className="home-about-row__side">
            <BentoSquareTile
              label={bento.furinLabel}
              title={bento.furinCta}
              image="/onomichi-furin-thumb.gif"
              onClick={openFurinLive}
              external
              desaturate
              className="bento-tile--compact bento-tile--furin-cta"
            />
            <BentoSquareTile
              label={bento.deskLabel}
              title={bento.deskTitle}
              image="/desk-preview.png"
              onClick={() => navigateToDesk({ silent: true })}
              className="bento-tile--compact bento-tile--desk-curtain"
              showCurtain
            />
          </div>
        </div>

        <SelectedWorkRail
          projects={HOME_SELECTED_PROJECTS}
          onOpen={handleOpen}
          bridge={bento.workBridge}
          frameLabel={bento.selectedWorkLabel}
        />

        <div className="home-bento__chapter">
          <p className="home-bento__bridge">{bento.vibeBridge}</p>
          <div className="home-bento__split">
            <VibeFolderTile
              projects={vibeProjects}
              label={bento.vibeFolderLabel}
              allLabel={bento.vibeFolderAll}
              onOpenProject={handleOpen}
              onOpenAll={openVibeCatalogue}
            />
            <HobbyListTile
              label={bento.hobbiesLabel}
              items={bento.hobbies}
            />
          </div>
        </div>

        <div className="home-bento__chapter">
          <p className="home-bento__bridge">{bento.teachingBridge}</p>
          <TeachingTile
            label={bento.teachingLabel}
            note={bento.teachingNote}
            moreLabel={bento.teachingMore}
            onClick={() => navigateToTeaching({ silent: true })}
          />
        </div>

        <div className="home-bento__chapter">
          <p className="home-bento__bridge">{bento.statusBridge}</p>
          <HomeStatusTiles language={language} copy={bento} />
        </div>
      </section>

      <PageCopyright />

      <a className="visually-hidden" href={LIBRARY_PATH}>
        {bento.allProjects}
      </a>
    </div>
  );
}
