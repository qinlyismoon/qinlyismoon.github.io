import { useEffect, useState } from "react";

function EmbeddedSource({ source, title, onLoad }) {
  return (
    <iframe
      className="project-viewer__frame"
      src={source.url}
      title={title}
      loading="eager"
      onLoad={onLoad}
      referrerPolicy="strict-origin-when-cross-origin"
      allow="clipboard-read; clipboard-write; fullscreen"
    />
  );
}

export default function ProjectViewer({ source, labels }) {
  const [loadState, setLoadState] = useState("loading");

  useEffect(() => {
    setLoadState("loading");
    const timeout = window.setTimeout(() => setLoadState("delayed"), 7000);
    return () => window.clearTimeout(timeout);
  }, [source.url]);

  return (
    <section className="project-viewer" aria-labelledby="project-viewer-title">
      <header className="project-viewer__bar">
        <div>
          <p className="project-viewer__eyebrow">{labels.library}</p>
          <h1 id="project-viewer-title">{labels.title}</h1>
        </div>
        <a href={source.url} target="_blank" rel="noopener noreferrer">
          {labels.openSource}
          <span aria-hidden="true">↗</span>
        </a>
      </header>

      <div className="project-viewer__surface">
        {loadState === "loading" ? (
          <p className="project-viewer__loading" role="status">
            {labels.loading}
          </p>
        ) : null}
        {loadState === "delayed" ? (
          <div className="project-viewer__fallback" role="status">
            <p>{labels.embedUnavailable}</p>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {labels.continueToSource}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        ) : null}
        {source.type === "embed" && loadState !== "delayed" ? (
          <EmbeddedSource
            source={source}
            title={labels.frameTitle}
            onLoad={() => setLoadState("ready")}
          />
        ) : source.render ? (
          source.render()
        ) : null}
      </div>
    </section>
  );
}
