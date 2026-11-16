/**
 * Real folder block — covers tucked inside; hover fans them out and
 * highlights the active cover so you know which project you’re on.
 */
import { useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

export default function VibeFolderTile({
  projects,
  label,
  allLabel,
  onOpenProject,
  onOpenAll,
}) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const count = projects.length;

  return (
    <article
      className={`bento-tile bento-tile--folder${expanded ? " is-expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setActiveId(null);
      }}
      onFocus={() => setExpanded(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setExpanded(false);
          setActiveId(null);
        }
      }}
    >
      <div className="vibe-folder">
        <div className="vibe-folder__stage">
          <div className="vibe-folder__back" aria-hidden="true" />
          <ul className="vibe-folder__covers">
            {projects.map((project, index) => {
              const isActive = activeId === project.id;
              return (
                <li
                  key={project.id}
                  className={`vibe-folder__cover${isActive ? " is-active" : ""}`}
                  style={{ "--cover-i": index, "--cover-n": count }}
                >
                  <button
                    type="button"
                    className="vibe-folder__cover-btn"
                    onClick={() => onOpenProject?.(project)}
                    onMouseEnter={() => setActiveId(project.id)}
                    onFocus={() => setActiveId(project.id)}
                    aria-label={
                      isZh ? `打开 ${project.title}` : `Open ${project.title}`
                    }
                  >
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <span className="vibe-folder__cover-title">
                      {project.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            className="vibe-folder__body"
            onClick={() => onOpenAll?.()}
            aria-label={allLabel}
          >
            <span className="vibe-folder__flap" aria-hidden="true">
              <span className="vibe-folder__tab" />
              <span className="vibe-folder__front" />
            </span>
          </button>
        </div>

        <div className="vibe-folder__footer">
          <p className="bento-tile__kicker">{label}</p>
          <button
            type="button"
            className="vibe-folder__all"
            onClick={() => onOpenAll?.()}
          >
            {allLabel}
          </button>
        </div>
      </div>
    </article>
  );
}
