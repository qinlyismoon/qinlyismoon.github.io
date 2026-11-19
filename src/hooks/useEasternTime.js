import { useEffect, useState } from "react";

const EASTERN_TZ = "America/New_York";
export const CHONGQING_TZ = "Asia/Shanghai";

function getZonedDate(timeZone = EASTERN_TZ) {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone }),
  );
}

/** Local wall-clock hour 0–23 in that timezone. */
export function getZonedHour(timeZone = EASTERN_TZ) {
  return getZonedDate(timeZone).getHours();
}

/**
 * Four quiet day-parts from local hour — used by home clock tiles.
 * morning 05–10 · day 11–16 · evening 17–19 · night otherwise
 */
export function dayPhaseFromHour(hour) {
  const h = Number(hour);
  if (!Number.isFinite(h)) return "day";
  if (h >= 5 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "day";
  if (h >= 17 && h < 20) return "evening";
  return "night";
}

export function dayPhaseLabel(language = "en", phase = "day") {
  const labels =
    language === "zh"
      ? {
          morning: "清晨",
          day: "白天",
          evening: "傍晚",
          night: "夜晚",
        }
      : {
          morning: "Morning",
          day: "Day",
          evening: "Evening",
          night: "Night",
        };
  return labels[phase] ?? labels.day;
}

export function getZonedDayPhase(timeZone = EASTERN_TZ) {
  return dayPhaseFromHour(getZonedHour(timeZone));
}

function getEasternDate() {
  return getZonedDate(EASTERN_TZ);
}

export function getHandAnglesForTimeZone(timeZone = EASTERN_TZ) {
  const date = getZonedDate(timeZone);
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const second = (seconds + milliseconds / 1000) * 6;
  const minute = (minutes + seconds / 60) * 6;
  const hour = (hours + minutes / 60) * 30;

  return { second, minute, hour };
}

export function getEasternHandAngles(date = getEasternDate()) {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const second = (seconds + milliseconds / 1000) * 6;
  const minute = (minutes + seconds / 60) * 6;
  const hour = (hours + minutes / 60) * 30;

  return { second, minute, hour };
}

export function formatEasternTimeZoneAbbr() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    timeZoneName: "short",
  }).formatToParts(new Date());

  return parts.find((part) => part.type === "timeZoneName")?.value ?? "ET";
}

export function useEasternTimeZoneAbbr() {
  const [abbr, setAbbr] = useState(formatEasternTimeZoneAbbr);

  useEffect(() => {
    const tick = () => setAbbr(formatEasternTimeZoneAbbr());
    tick();
    const intervalId = window.setInterval(tick, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return abbr;
}

function easternLocale(language) {
  return language === "zh" ? "zh-CN" : "en-US";
}

export function formatEasternDate(language = "en") {
  return new Intl.DateTimeFormat(easternLocale(language), {
    timeZone: EASTERN_TZ,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export function formatEasternDateLine(language = "en") {
  const date = formatEasternDate(language);
  return language === "zh" ? `今天是${date}。` : `Today is ${date}.`;
}

export function formatEasternClockTooltipLine(language = "en") {
  const locale = easternLocale(language);
  const time = new Intl.DateTimeFormat(locale, {
    timeZone: EASTERN_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: language !== "zh",
  }).format(new Date());
  const abbr = formatEasternTimeZoneAbbr();

  return language === "zh"
    ? `现在是美东时间 ${time}（${abbr}）。`
    : `It's ${time} in US Eastern Time (${abbr}).`;
}

export function formatEasternTime() {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

/** Live home-status clock — includes seconds for a system feel. */
export function formatEasternLiveClock(language = "en") {
  return new Intl.DateTimeFormat(easternLocale(language), {
    timeZone: EASTERN_TZ,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: language !== "zh",
  }).format(new Date());
}

export function formatEasternShortDate(language = "en") {
  const now = new Date();
  const weekday = new Intl.DateTimeFormat(easternLocale(language), {
    timeZone: EASTERN_TZ,
    weekday: "short",
  })
    .format(now)
    .toUpperCase();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: EASTERN_TZ,
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const month = parts.find((part) => part.type === "month")?.value ?? "—";
  const day = parts.find((part) => part.type === "day")?.value ?? "—";
  return { weekday, dateLine: `${month}/${day}` };
}

export function useEasternTimeLabel() {
  const [time, setTime] = useState(formatEasternTime);

  useEffect(() => {
    const tick = () => setTime(formatEasternTime());
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  return time;
}

export function useEasternLiveClock(language = "en") {
  const [time, setTime] = useState(() => formatEasternLiveClock(language));
  const [dateParts, setDateParts] = useState(() =>
    formatEasternShortDate(language),
  );

  useEffect(() => {
    const tick = () => {
      setTime(formatEasternLiveClock(language));
      setDateParts(formatEasternShortDate(language));
    };
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [language]);

  return { time, ...dateParts };
}

export function useEasternDateLine(language = "en") {
  const [line, setLine] = useState(() => formatEasternDateLine(language));

  useEffect(() => {
    const tick = () => setLine(formatEasternDateLine(language));
    tick();
    const intervalId = window.setInterval(tick, 60_000);
    return () => window.clearInterval(intervalId);
  }, [language]);

  return line;
}

export function useEasternClockTooltipLine(language = "en") {
  const [line, setLine] = useState(() => formatEasternClockTooltipLine(language));

  useEffect(() => {
    const tick = () => setLine(formatEasternClockTooltipLine(language));
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [language]);

  return line;
}

export function useHandAngles(timeZone = EASTERN_TZ) {
  const [angles, setAngles] = useState(() => getHandAnglesForTimeZone(timeZone));

  useEffect(() => {
    let frameId = 0;

    const tick = () => {
      setAngles(getHandAnglesForTimeZone(timeZone));
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [timeZone]);

  return angles;
}

export function useEasternHandAngles() {
  return useHandAngles(EASTERN_TZ);
}

export function formatZonedLiveClock(language = "en", timeZone = EASTERN_TZ) {
  return new Intl.DateTimeFormat(easternLocale(language), {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: language !== "zh",
  }).format(new Date());
}

/** Quiet clock-tile date — weekday + month/day in that timezone. */
export function formatZonedDateLabel(language = "en", timeZone = EASTERN_TZ) {
  const locale = easternLocale(language);
  if (language === "zh") {
    return new Intl.DateTimeFormat(locale, {
      timeZone,
      month: "numeric",
      day: "numeric",
      weekday: "short",
    }).format(new Date());
  }
  const weekday = new Intl.DateTimeFormat(locale, {
    timeZone,
    weekday: "short",
  }).format(new Date());
  const monthDay = new Intl.DateTimeFormat(locale, {
    timeZone,
    month: "short",
    day: "numeric",
  }).format(new Date());
  return `${weekday} · ${monthDay}`;
}

export function useZonedLiveClock(language = "en", timeZone = EASTERN_TZ) {
  const [time, setTime] = useState(() =>
    formatZonedLiveClock(language, timeZone),
  );
  const [date, setDate] = useState(() =>
    formatZonedDateLabel(language, timeZone),
  );
  const [phase, setPhase] = useState(() => getZonedDayPhase(timeZone));

  useEffect(() => {
    const tick = () => {
      setTime(formatZonedLiveClock(language, timeZone));
      setDate(formatZonedDateLabel(language, timeZone));
      setPhase(getZonedDayPhase(timeZone));
    };
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [language, timeZone]);

  return { time, date, phase, phaseLabel: dayPhaseLabel(language, phase) };
}
