import { useEffect } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { getAboutPageCopy } from "../../lib/aboutContent";
import AboutHeroCollage from "../about/AboutHeroCollage";
import JourneyTimeline from "../about/JourneyTimeline";

const LABELS = {
  en: {
    boardTitle: "Things that keep me curious",
    boardBody: "A movable board of places, habits, and small observations that shape how I see and make.",
    timelineTitle: "Design journey",
    timelineBody: "A record of the choices, practice, and questions that shaped how I work today.",
    close: "Close window",
  },
  zh: {
    boardTitle: "那些让我持续好奇的事物",
    boardBody: "一个可以移动的剪贴板，记录着持续影响我如何观看与创造的地点、习惯与微小观察。",
    timelineTitle: "设计旅程",
    timelineBody: "记录那些塑造了我今天工作方式的选择、实践与问题。",
    close: "关闭窗口",
  },
};

export default function DeskArchiveDetail({ panel, onClose }) {
  const { language, isDarkMode } = useAppSettings();
  const copy = getAboutPageCopy(language);
  const labels = LABELS[language] ?? LABELS.en;

  useEffect(() => {
    if (!panel) return undefined;
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.dataset.projectDetail = "open";
    return () => {
      window.removeEventListener("keydown", onKey);
      delete document.body.dataset.projectDetail;
    };
  }, [panel, onClose]);

  if (!panel) return null;
  const isBoard = panel === "board";
  return (
    <div className="vibe-detail__overlay desk-archive__overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div
        className={`vibe-detail desk-archive${isDarkMode ? " about-page--dark" : ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="vibe-detail__close" onClick={onClose} aria-label={labels.close}>×</button>
        <header className="desk-archive__header">
          <p className="vibe-detail__kicker">Phoebe’s Desk</p>
          <h2 className="vibe-detail__title">{isBoard ? labels.boardTitle : labels.timelineTitle}</h2>
          <p className="vibe-detail__tagline">{isBoard ? labels.boardBody : labels.timelineBody}</p>
        </header>
        <div className={`desk-archive__content desk-archive__content--${panel}`}>
          {isBoard ? (
            <AboutHeroCollage copy={copy.hero} language={language} />
          ) : (
            <JourneyTimeline copy={copy.journey} language={language} />
          )}
        </div>
      </div>
    </div>
  );
}
