/**
 * Real folder block — covers tucked inside; hover the folder (not the
 * gray card) to fan them out and highlight the active cover.
 * Color dots only recolor paper — they never open the flap.
 * On touch: first tap expands the fan, second tap opens a project.
 */
import { useEffect, useRef, useState } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";

const FINE_HOVER_QUERY = "(hover: hover) and (pointer: fine)";

const FOLDER_COLORS = [
  {
    id: "mist",
    labelEn: "Mist",
    labelZh: "雾灰蓝",
    vars: {
      "--folder-back-top": "#d0d7de",
      "--folder-back-bottom": "#b3bec8",
      "--folder-tab-top": "#ccd3da",
      "--folder-tab-bottom": "#a9b5c0",
      "--folder-front-top": "#d5dce3",
      "--folder-front-mid": "#b5c0ca",
      "--folder-front-bottom": "#9aa7b3",
      "--folder-shade": "28, 34, 42",
      "--folder-swatch": "#b3bec8",
    },
  },
  {
    id: "manila",
    labelEn: "Manila",
    labelZh: "牛皮纸",
    vars: {
      "--folder-back-top": "#e8d9b0",
      "--folder-back-bottom": "#d7c08a",
      "--folder-tab-top": "#e6d4a6",
      "--folder-tab-bottom": "#d4b878",
      "--folder-front-top": "#ead9ae",
      "--folder-front-mid": "#d7bf86",
      "--folder-front-bottom": "#c8ac6e",
      "--folder-shade": "40, 32, 18",
      "--folder-swatch": "#d7c08a",
    },
  },
  {
    id: "sage",
    labelEn: "Sage",
    labelZh: "鼠尾草",
    vars: {
      "--folder-back-top": "#c9d5cb",
      "--folder-back-bottom": "#a8bbae",
      "--folder-tab-top": "#c4d0c6",
      "--folder-tab-bottom": "#9eb1a4",
      "--folder-front-top": "#ced9cf",
      "--folder-front-mid": "#a9bbae",
      "--folder-front-bottom": "#8fa697",
      "--folder-shade": "32, 42, 36",
      "--folder-swatch": "#a8bbae",
    },
  },
  {
    id: "clay",
    labelEn: "Clay",
    labelZh: "陶土",
    vars: {
      "--folder-back-top": "#e4cfc4",
      "--folder-back-bottom": "#d0b0a0",
      "--folder-tab-top": "#e0caba",
      "--folder-tab-bottom": "#c9a894",
      "--folder-front-top": "#e7d3c8",
      "--folder-front-mid": "#d2b3a3",
      "--folder-front-bottom": "#c09a86",
      "--folder-shade": "48, 32, 24",
      "--folder-swatch": "#d0b0a0",
    },
  },
];

const DEFAULT_COLOR = FOLDER_COLORS[0];

export default function VibeFolderTile({
  projects,
  label,
  allLabel,
  onOpenProject,
  onOpenAll,
}) {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  const rootRef = useRef(null);
  const [fineHover, setFineHover] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [colorId, setColorId] = useState(DEFAULT_COLOR.id);
  const count = projects.length;
  const color =
    FOLDER_COLORS.find((item) => item.id === colorId) ?? DEFAULT_COLOR;

  useEffect(() => {
    const media = window.matchMedia(FINE_HOVER_QUERY);
    const sync = () => setFineHover(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (!expanded || fineHover) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setExpanded(false);
        setActiveId(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [expanded, fineHover]);

  const openFan = () => setExpanded(true);
  const closeFan = () => {
    setExpanded(false);
    setActiveId(null);
  };

  /* Open only over the folder graphic — not gray padding / swatches / footer. */
  const handleFolderEnter = () => {
    if (fineHover) openFan();
  };

  const handleFolderLeave = () => {
    if (fineHover) closeFan();
  };

  const handleCoverClick = (project) => (event) => {
    if (!fineHover && !expanded) {
      event.preventDefault();
      openFan();
      setActiveId(project.id);
      return;
    }
    onOpenProject?.(project);
  };

  const handleBodyClick = () => {
    if (!fineHover && !expanded) {
      openFan();
      return;
    }
    onOpenAll?.();
  };

  return (
    <article
      ref={rootRef}
      className={`bento-tile bento-tile--folder${expanded ? " is-expanded" : ""}`}
    >
      <div className="vibe-folder" style={color.vars}>
        <div
          className="vibe-folder__swatches"
          role="radiogroup"
          aria-label={isZh ? "文件夹颜色" : "Folder color"}
        >
          {FOLDER_COLORS.map((option) => {
            const selected = option.id === color.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`vibe-folder__swatch${selected ? " is-selected" : ""}`}
                style={{ "--swatch": option.vars["--folder-swatch"] }}
                aria-label={isZh ? option.labelZh : option.labelEn}
                title={isZh ? option.labelZh : option.labelEn}
                onClick={(event) => {
                  event.stopPropagation();
                  setColorId(option.id);
                }}
              />
            );
          })}
        </div>

        <div className="vibe-folder__stage">
          {/* One shell: narrower base, then scaled up together.
              Hover hit-target = folder only (gray card stays closed). */}
          <div
            className="vibe-folder__shell"
            onMouseEnter={handleFolderEnter}
            onMouseLeave={handleFolderLeave}
            onFocus={handleFolderEnter}
            onBlur={(event) => {
              if (
                fineHover &&
                !event.currentTarget.contains(event.relatedTarget)
              ) {
                closeFan();
              }
            }}
          >
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
                      onClick={handleCoverClick(project)}
                      onMouseEnter={() => {
                        if (fineHover) setActiveId(project.id);
                      }}
                      onFocus={() => setActiveId(project.id)}
                      aria-label={
                        !fineHover && !expanded
                          ? isZh
                            ? `展开并查看 ${project.title}`
                            : `Expand to view ${project.title}`
                          : isZh
                            ? `打开 ${project.title}`
                            : `Open ${project.title}`
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
              onClick={handleBodyClick}
              aria-label={
                !fineHover && !expanded
                  ? isZh
                    ? "展开项目"
                    : "Expand projects"
                  : allLabel
              }
            >
              <span className="vibe-folder__flap" aria-hidden="true">
                <span className="vibe-folder__tab" />
                <span className="vibe-folder__front" />
              </span>
            </button>
          </div>
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
