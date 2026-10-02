import { useEffect, useMemo, useState } from "react";

/**
 * Day/night follows the viewer's local time — the same clock the
 * ClockObject, sidebar, and tooltip read. No fixed timezone.
 */
function localHour() {
  return new Date().getHours();
}

function readDayPhase() {
  const hour = localHour();
  return hour >= 19 || hour < 7 ? "night" : "day";
}

export default function useDeskEnvironment(language = "en") {
  const [dayPhase, setDayPhase] = useState(readDayPhase);

  useEffect(() => {
    const sync = () => setDayPhase(readDayPhase());
    sync();
    const intervalId = window.setInterval(sync, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return useMemo(
    () => ({
      dayPhase,
      isNight: dayPhase === "night",
      weather: {
        kind: "sunny",
        // Single source of truth for the desk weather label — SiteShell
        // overrides the pageContext static value with this at runtime.
        // Temperatures are always Celsius (design system rule).
        label: language === "zh" ? "22°C · 晴" : "22°C · Sunny",
      },
    }),
    [dayPhase, language],
  );
}
