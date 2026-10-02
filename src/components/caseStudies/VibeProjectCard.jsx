// Card for a vibe coding project on the Case Studies page.
// Clicking the card opens the native project detail view.
import { useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

export default function VibeProjectCard({ project, onOpen, onHover }) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const description =
    isZh && project.descriptionZh ? project.descriptionZh : project.description;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = project.thumbnail && !imageFailed;

  return (
    <article className="vibe-card">
      <button
        type="button"
        className="vibe-card__button"
        onClick={() => onOpen(project)}
        onMouseEnter={() => onHover?.(project)}
        onMouseLeave={() => onHover?.(null)}
        onFocus={() => onHover?.(project)}
        onBlur={() => onHover?.(null)}
        aria-label={`View details for ${project.title}`}
      >
        <div className="vibe-card__thumbnail" aria-hidden="true">
          {showImage ? (
            <img
              src={project.thumbnail}
              alt=""
              className="vibe-card__image"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="vibe-card__placeholder">
              <span className="vibe-card__placeholder-mark">
                {project.subtitle}
              </span>
            </div>
          )}
        </div>
        <div className="vibe-card__body">
          <h3 className="vibe-card__title">{project.title}</h3>
          <p className="vibe-card__description">{description}</p>
          {project.tags?.length ? (
            <ul className="vibe-card__tags" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="vibe-card__tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </button>
    </article>
  );
}
