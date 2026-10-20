import { useEffect, useMemo, useState } from "react";
import {
  SITE_LOCATION,
  fetchCurrentWeather,
  formatWeatherLabel,
} from "../lib/weather";

/**
 * Day/night follows the viewer's local time — the same clock the
 * ClockObject, sidebar, and tooltip read.
 *
 * Weather follows Phoebe's written current location (Columbus, OH),
 * never the visitor's geolocation — no permission prompt.
 */
function localHour() {
  return new Date().getHours();
}

function readDayPhase() {
  const hour = localHour();
  return hour >= 19 || hour < 7 ? "night" : "day";
}

const WEATHER_REFRESH_MS = 15 * 60_000;

const FALLBACK_WEATHER = {
  kind: "sunny",
  temperatureC: null,
};

export default function useDeskEnvironment(language = "en") {
  const [dayPhase, setDayPhase] = useState(readDayPhase);
  const [weather, setWeather] = useState(FALLBACK_WEATHER);

  useEffect(() => {
    const sync = () => setDayPhase(readDayPhase());
    sync();
    const intervalId = window.setInterval(sync, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const next = await fetchCurrentWeather({
          latitude: SITE_LOCATION.latitude,
          longitude: SITE_LOCATION.longitude,
        });
        if (!cancelled) {
          setWeather({
            kind: next.kind,
            temperatureC: next.temperatureC,
          });
        }
      } catch {
        // Keep the last successful reading (or sunny fallback).
      }
    }

    loadWeather();
    const intervalId = window.setInterval(loadWeather, WEATHER_REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, []);

  return useMemo(() => {
    const kind = weather.kind ?? "sunny";
    const label = formatWeatherLabel(language, {
      temperatureC: weather.temperatureC,
      kind,
    });
    return {
      dayPhase,
      isNight: dayPhase === "night",
      weather: {
        kind,
        temperatureC: weather.temperatureC,
        // Single source of truth for the desk weather label — SiteShell
        // overrides the pageContext static value with this at runtime.
        label,
      },
    };
  }, [dayPhase, language, weather.kind, weather.temperatureC]);
}
