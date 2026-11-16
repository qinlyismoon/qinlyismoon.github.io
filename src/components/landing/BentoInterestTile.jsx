import { useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

/**
 * One interest / “cute” bento tile — image-forward, short label, opens a
 * project detail when clicked. Same hover contract as SelectedWorkCard.
 */
export default function BentoInterestTile({ project, onOpen, onHover }) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const [imageFailed, setImageFailed] = useState(false);
  const tagline =
    (isZh && project.taglineZh ? project.taglineZh : project.tagline) ||
    (isZh && project.descriptionZh
      ? project.descriptionZh
      : project.description);
  const showImage = project.thumbnail && !imageFailed;

  return (
    <article className="bento-tile bento-tile--interest">
      <button
        type="button"
        className="bento-tile__button"
        onClick={() => onOpen?.(project)}
        onMouseEnter={() => onHover?.(project)}
        onMouseLeave={() => onHover?.(null)}
        onFocus={() => onHover?.(project)}
        onBlur={() => onHover?.(null)}
        aria-label={`Open ${project.title}`}
      >
        <div className="bento-tile__media" aria-hidden="true">
          {showImage ? (
            <img
              src={project.thumbnail}
              alt=""
              className="bento-tile__image"
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="bento-tile__placeholder" />
          )}
        </div>
        <div className="bento-tile__body">
          <p className="bento-tile__kicker">{project.subtitle}</p>
          <h3 className="bento-tile__title">{project.title}</h3>
          {tagline ? <p className="bento-tile__note">{tagline}</p> : null}
        </div>
      </button>
    </article>
  );
}
