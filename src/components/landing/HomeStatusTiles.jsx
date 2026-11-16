/**
 * Glance widgets — Columbus weather + two analog clocks
 * (Columbus / hometown Chongqing) in one quiet row.
 * Corner land marks: Ohio for Columbus, Chongqing for home.
 */
import useDeskEnvironment from "../../hooks/useDeskEnvironment";
import {
  CHONGQING_TZ,
  useHandAngles,
  useZonedLiveClock,
} from "../../hooks/useEasternTime";
import {
  SITE_LOCATION,
  formatTempC,
  weatherConditionLabel,
} from "../../lib/weather";
import { CHONGQING_LAND, OHIO_LAND } from "../../lib/landMarks";

const COLUMBUS_TZ = "America/New_York";

function LandMark({ place }) {
  const mark = place === "chongqing" ? CHONGQING_LAND : OHIO_LAND;
  return (
    <svg
      className={`home-status__land${
        place === "chongqing" ? " home-status__land--chongqing" : ""
      }`}
      viewBox={mark.viewBox}
      aria-hidden="true"
    >
      <path fill="currentColor" d={mark.path} />
    </svg>
  );
}

function WeatherGlyph({ kind }) {
  if (kind === "rainy") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M14 22c0-5.5 4.5-10 10-10 4.2 0 7.8 2.6 9.2 6.3A7 7 0 0 1 40 25a7 7 0 0 1-7 7H16a6 6 0 0 1-2-11.7Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M18 36l-2 5M24 35l-2 5M30 36l-2 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </svg>
    );
  }
  if (kind === "snowy") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M24 10v28M14 15l20 18M34 15 14 33M12 24h24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </svg>
    );
  }
  if (kind === "cloudy") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M14 28c0-5.5 4.5-10 10-10 4.2 0 7.8 2.6 9.2 6.3A7 7 0 0 1 40 31a7 7 0 0 1-7 7H16a6 6 0 0 1-2-11.7Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="8" fill="currentColor" opacity="0.9" />
      <path
        d="M24 8v4M24 36v4M8 24h4M36 24h4M12.5 12.5l2.8 2.8M32.7 32.7l2.8 2.8M12.5 35.5l2.8-2.8M32.7 15.3l2.8-2.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function AnalogClock({ timeZone }) {
  const { hour, minute, second } = useHandAngles(timeZone);

  return (
    <div className="home-status__analog" aria-hidden="true">
      <svg viewBox="0 0 120 120" className="home-status__analog-face">
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.12"
          strokeWidth="1.5"
        />
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          const x1 = 60 + Math.sin(angle) * 42;
          const y1 = 60 - Math.cos(angle) * 42;
          const x2 = 60 + Math.sin(angle) * 48;
          const y2 = 60 - Math.cos(angle) * 48;
          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        <line
          x1="60"
          y1="60"
          x2={60 + Math.sin((hour * Math.PI) / 180) * 28}
          y2={60 - Math.cos((hour * Math.PI) / 180) * 28}
          className="home-status__hour"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="60"
          x2={60 + Math.sin((minute * Math.PI) / 180) * 40}
          y2={60 - Math.cos((minute * Math.PI) / 180) * 40}
          className="home-status__minute"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <line
          x1="60"
          y1="60"
          x2={60 + Math.sin((second * Math.PI) / 180) * 44}
          y2={60 - Math.cos((second * Math.PI) / 180) * 44}
          className="home-status__second"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="60" cy="60" r="3" className="home-status__hub" />
      </svg>
    </div>
  );
}

function ClockTile({ timeZone, place, land, language }) {
  const { time, date } = useZonedLiveClock(language, timeZone);
  return (
    <article className="home-status__tile home-status__tile--clock">
      <LandMark place={land} />
      <p className="home-status__place">{place}</p>
      <div className="home-status__clock-face">
        <AnalogClock timeZone={timeZone} />
      </div>
      <p className="home-status__date">{date}</p>
      <span className="visually-hidden">{time}</span>
    </article>
  );
}

export default function HomeStatusTiles({ language, copy }) {
  const environment = useDeskEnvironment(language);
  const weather = environment.weather;
  const columbusLabel =
    language === "zh" ? SITE_LOCATION.labelZh : SITE_LOCATION.labelEn;
  const chongqingLabel = copy.chongqingLabel;
  const temp = formatTempC(weather.temperatureC);
  const condition = weatherConditionLabel(language, weather.kind);
  const hasRange =
    Number.isFinite(weather.highC) && Number.isFinite(weather.lowC);
  const highShort = hasRange ? `${Math.round(weather.highC)}°` : null;
  const lowShort = hasRange ? `${Math.round(weather.lowC)}°` : null;

  return (
    <section className="home-status" aria-label={copy.statusLabel}>
      <article
        className={`home-status__tile home-status__tile--weather home-status__tile--${weather.kind}`}
      >
        <LandMark place="ohio" />
        <p className="home-status__place">{columbusLabel}</p>
        <p className="home-status__temp">{temp}</p>
        <div className="home-status__weather-foot">
          <div>
            <p className="home-status__condition">{condition}</p>
            {hasRange ? (
              <p className="home-status__range">
                {copy.highShort}:{highShort} {copy.lowShort}:{lowShort}
              </p>
            ) : null}
          </div>
          <div className="home-status__glyph" aria-hidden="true">
            <WeatherGlyph kind={weather.kind} />
          </div>
        </div>
      </article>

      <ClockTile
        timeZone={COLUMBUS_TZ}
        place={columbusLabel}
        land="ohio"
        language={language}
      />
      <ClockTile
        timeZone={CHONGQING_TZ}
        place={chongqingLabel}
        land="chongqing"
        language={language}
      />
    </section>
  );
}
