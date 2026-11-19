/**
 * Two city cards — Columbus (where I am) and Chongqing (where I'm from).
 * Each stands on its own: local time, local date, local weather. No offset
 * relative to the other city.
 *
 * Board language: the same warm-gray tile as every other block; colour only
 * where it means something — the clock face darkens at local night, and the
 * weather glyph carries a soft hue.
 */
import { useEffect, useState } from "react";
import useDeskEnvironment from "../../hooks/useDeskEnvironment";
import {
  CHONGQING_TZ,
  useHandAngles,
  useZonedLiveClock,
} from "../../hooks/useEasternTime";
import {
  SITE_LOCATION,
  fetchCurrentWeather,
  formatTempC,
  weatherConditionLabel,
} from "../../lib/weather";
import { CHONGQING_LAND, OHIO_LAND } from "../../lib/landMarks";

const COLUMBUS_TZ = "America/New_York";
const CHONGQING_COORDS = { latitude: 29.563, longitude: 106.5516 };
const WEATHER_REFRESH_MS = 15 * 60_000;

/** Weather for one city (Columbus reuses the desk's shared reading). */
function useCityWeather(coords, skip) {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    if (skip) return undefined;
    let cancelled = false;
    const load = async () => {
      try {
        const next = await fetchCurrentWeather(coords);
        if (!cancelled) setWeather(next);
      } catch {
        // Keep the last reading; the card shows time without weather.
      }
    };
    load();
    const id = window.setInterval(load, WEATHER_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [coords, skip]);
  return weather;
}

/** "12:19 PM" / "12:19" — no seconds; the second hand already moves. */
function useShortTime(language, timeZone) {
  const format = () =>
    new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
      timeZone,
      // 24-hour in Chinese gets two digits, so 01:21 never reads as 1 PM.
      hour: language === "zh" ? "2-digit" : "numeric",
      minute: "2-digit",
      hour12: language !== "zh",
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, timeZone]);
  return time;
}

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

const CLEAR_NIGHT = { en: "Clear", zh: "晴" };

function CityCard({ place, land, timeZone, weather, language, copy }) {
  const { date, phase, phaseLabel } = useZonedLiveClock(language, timeZone);
  const time = useShortTime(language, timeZone);
  const night = phase === "night";
  const hasWeather = weather && Number.isFinite(weather.temperatureC);
  const kind = hasWeather ? weather.kind : "none";
  // A clear sky at night is "clear", lit by the moon — not "sunny".
  const clearNight = night && kind === "sunny";
  const condition = hasWeather
    ? clearNight
      ? CLEAR_NIGHT[language] ?? CLEAR_NIGHT.en
      : weatherConditionLabel(language, kind)
    : null;
  const hasRange =
    hasWeather && Number.isFinite(weather.highC) && Number.isFinite(weather.lowC);
  const range = hasRange
    ? `${copy.highShort} ${Math.round(weather.highC)}° · ${copy.lowShort} ${Math.round(weather.lowC)}°`
    : null;

  return (
    <article
      className={`bento-tile home-status__tile home-status__tile--${
        clearNight ? "clear-night" : kind
      }${night ? " is-night" : ""}`}
    >
      {/* The tile's wash is the weather; the clock face is day or night. */}
      <span className="home-status__sky" aria-hidden="true" />

      <div className="home-status__head">
        <p className="bento-tile__kicker home-status__place">{place}</p>
        <LandMark place={land} />
      </div>

      <div className="home-status__now">
        <div className={`home-status__clock${night ? " is-night" : ""}`}>
          <AnalogClock timeZone={timeZone} />
        </div>
        {/* One hero per card: the clock is the graphic, the temperature is
            the number. Time drops to a caption — the hands already say it. */}
        <div className="home-status__read">
          {hasWeather ? (
            <>
              <p className="home-status__temp">
                {formatTempC(weather.temperatureC)}
              </p>
              <p className="home-status__condition">
                {condition}
                {range ? ` · ${range}` : ""}
              </p>
            </>
          ) : null}
          <p className="home-status__date">
            {time} · {date}
          </p>
        </div>
      </div>

      <span className="visually-hidden">{`${place}: ${time}, ${date}, ${phaseLabel}${
        hasWeather ? `, ${formatTempC(weather.temperatureC)} ${condition}` : ""
      }`}</span>
    </article>
  );
}

export default function HomeStatusTiles({ language, copy }) {
  const columbus = useDeskEnvironment(language).weather;
  const chongqing = useCityWeather(CHONGQING_COORDS, false);
  const columbusLabel =
    language === "zh" ? SITE_LOCATION.labelZh : SITE_LOCATION.labelEn;

  return (
    <section className="home-status" aria-label={copy.statusLabel}>
      <CityCard
        place={columbusLabel}
        land="ohio"
        timeZone={COLUMBUS_TZ}
        weather={columbus}
        language={language}
        copy={copy}
      />
      <CityCard
        place={copy.chongqingLabel}
        land="chongqing"
        timeZone={CHONGQING_TZ}
        weather={chongqing}
        language={language}
        copy={copy}
      />
    </section>
  );
}
