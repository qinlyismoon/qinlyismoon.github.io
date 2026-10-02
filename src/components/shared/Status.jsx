import { useId } from "react";
import { useEasternTimeLabel } from "../../hooks/useEasternTime";

export default function Status({
  title = "Status",
  basedIn,
  weather,
  availability,
  disciplines = [],
  role,
  className = "",
}) {
  const localTime = useEasternTimeLabel();
  const headingId = useId();

  return (
    <section className={`status-card ${className}`.trim()} aria-labelledby={headingId}>
      <h2 id={headingId} className="index-section__heading">
        {title}
      </h2>

      <dl className="status-card__metadata">
        {basedIn ? (
          <div className="metadata-block">
            <dt>Based in</dt>
            <dd>{basedIn}</dd>
          </div>
        ) : null}
        <div className="metadata-block">
          <dt>Local time</dt>
          <dd>{localTime}</dd>
        </div>
        {weather ? (
          <div className="metadata-block">
            <dt>Weather</dt>
            <dd>{weather}</dd>
          </div>
        ) : null}
      </dl>

      {role ? <p className="status-card__role">{role}</p> : null}

      {availability ? (
        <div className="status-card__availability">
          <p>
            <span className="status-card__dot" aria-hidden="true" />
            {availability}
          </p>
          {disciplines.length ? (
            <ul aria-label="Areas of interest">
              {disciplines.map((discipline) => (
                <li key={discipline}>{discipline}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
