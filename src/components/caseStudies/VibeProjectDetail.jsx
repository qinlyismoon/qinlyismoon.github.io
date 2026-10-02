// Native detail view for a vibe coding project.
// Rendered as a modal overlay; keeps the visitor in the portfolio context
// while offering a prominent link to the live site.
import { useEffect, useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

const LABELS = {
  en: {
    close: "Close project details",
    viewDetails: (title) => `View details for ${title}`,
    technologies: "Technologies",
    visitLive: "Visit live site",
    projectNotes: "Project notes",
    background: "Background",
    question: "The question",
    visual: "Visual language",
    interaction: "Interaction",
    process: "Process",
  },
  zh: {
    close: "关闭项目详情",
    viewDetails: (title) => `查看${title}的详情`,
    technologies: "技术",
    visitLive: "访问体验网站",
    projectNotes: "项目笔记",
    background: "背景",
    question: "核心问题",
    visual: "视觉语言",
    interaction: "交互方式",
    process: "构建过程",
  },
};

export default function VibeProjectDetail({ project, onClose }) {
  const { language } = useAppSettings();
  const labels = LABELS[language] ?? LABELS.en;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // All hooks stay above the conditional return so hook order never shifts.
  const [imageFailed, setImageFailed] = useState(false);

  if (!project) return null;
  const isZh = language === "zh";
  const detail = isZh && project.detailZh ? project.detailZh : project.detail ?? {};
  const tagline = isZh && project.taglineZh ? project.taglineZh : project.tagline;
  const showImage = project.thumbnail && !imageFailed;

  return (
    <div
      className="vibe-detail__overlay"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div
        className="vibe-detail"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="vibe-detail__close"
          onClick={onClose}
          aria-label={labels.close}
        >
          ×
        </button>
        {showImage ? (
          <div className="vibe-detail__hero">
            <img
              src={project.thumbnail}
              alt=""
              className="vibe-detail__image"
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : null}
        <div className="vibe-detail__body">
          <p className="vibe-detail__kicker">{project.subtitle}</p>
          <h2 className="vibe-detail__title">{project.title}</h2>
          <p className="vibe-detail__tagline">{tagline}</p>
          {project.tags?.length ? (
            <ul className="vibe-detail__tags" aria-label={labels.technologies}>
              {project.tags.map((tag) => (
                <li key={tag} className="vibe-detail__tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="vibe-detail__actions">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="vibe-detail__action vibe-detail__action--primary"
            >
              {labels.visitLive} ↗
            </a>
            {project.notesUrl ? (
              <a
                href={project.notesUrl}
                target="_blank"
                rel="noreferrer"
                className="vibe-detail__action"
              >
                {labels.projectNotes} ↗
              </a>
            ) : null}
          </div>
          <dl className="vibe-detail__sections">
            {detail.background ? (
              <div className="vibe-detail__section">
                <dt>{labels.background}</dt>
                <dd>{detail.background}</dd>
              </div>
            ) : null}
            {detail.question ? (
              <div className="vibe-detail__section">
                <dt>{labels.question}</dt>
                <dd className="vibe-detail__quote">{detail.question}</dd>
              </div>
            ) : null}
            {detail.visual ? (
              <div className="vibe-detail__section">
                <dt>{labels.visual}</dt>
                <dd>{detail.visual}</dd>
              </div>
            ) : null}
            {detail.interaction ? (
              <div className="vibe-detail__section">
                <dt>{labels.interaction}</dt>
                <dd>{detail.interaction}</dd>
              </div>
            ) : null}
            {detail.process ? (
              <div className="vibe-detail__section">
                <dt>{labels.process}</dt>
                <dd>{detail.process}</dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>
    </div>
  );
}
