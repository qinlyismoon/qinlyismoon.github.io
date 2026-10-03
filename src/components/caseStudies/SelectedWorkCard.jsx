// Card for a selected work on the Case Studies page.
// Same visual card system as the vibe cards; the whole card is an external
// link to the Notion case study, so the title carries the external-link
// arrow. The thumbnail falls back to a text-only card if the image is
// missing.
import { useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

export default function SelectedWorkCard({ project, onHover }) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const description =
    isZh && project.descriptionZh ? project.descriptionZh : project.description;
  // Tags never translate: they are English category labels in every
  // language, so they are read directly with no Zh variant.
  const tags = project.tags;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = project.thumbnail && !imageFailed;

  return (
    <article className="vibe-card">
      <a
        className="vibe-card__link"
        href={project.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => onHover?.(project)}
        onMouseLeave={() => onHover?.(null)}
        onFocus={() => onHover?.(project)}
        onBlur={() => onHover?.(null)}
        aria-label={`Read the ${project.title} case study on Notion`}
      >
        {showImage ? (
          <div className="vibe-card__thumbnail" aria-hidden="true">
            <img
              src={project.thumbnail}
              alt=""
              className="vibe-card__image"
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          </div>
        ) : null}
        <div className="vibe-card__body">
          <h3 className="vibe-card__title">
            {project.title}
            <span className="vibe-card__external" aria-hidden="true">
              ↗︎
            </span>
          </h3>
          <p className="vibe-card__description">{description}</p>
          {tags?.length ? (
            <ul className="vibe-card__tags" aria-label="Tags">
              {tags.map((tag) => (
                <li key={tag} className="vibe-card__tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </a>
    </article>
  );
}
