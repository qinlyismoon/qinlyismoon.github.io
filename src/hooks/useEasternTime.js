import { useEffect, useState } from "react";

const EASTERN_TZ = "America/New_York";

function getEasternDate() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: EASTERN_TZ }),
  );
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

export function useEasternHandAngles() {
  const [angles, setAngles] = useState(getEasternHandAngles);

  useEffect(() => {
    let frameId = 0;

    const tick = () => {
      setAngles(getEasternHandAngles());
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return angles;
}
