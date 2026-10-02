import { useEffect, useState } from "react";

function getLocalHandAngles(date = new Date()) {
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const second = (seconds + milliseconds / 1000) * 6;
  const minute = (minutes + seconds / 60) * 6;
  const hour = (hours + minutes / 60) * 30;

  return { second, minute, hour };
}

export function useLocalHandAngles() {
  const [angles, setAngles] = useState(getLocalHandAngles);

  useEffect(() => {
    let frameId = 0;
    const tick = () => {
      setAngles(getLocalHandAngles());
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return angles;
}

function localLocale(language) {
  return language === "zh" ? "zh-CN" : "en-US";
}

export function formatLocalTimeZoneAbbr() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZoneName: "short",
  }).formatToParts(new Date());
  return parts.find((part) => part.type === "timeZoneName")?.value ?? "";
}

export function formatLocalDateLine(language = "en") {
  const date = new Intl.DateTimeFormat(localLocale(language), {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
  return language === "zh" ? `今天是${date}。` : `Today is ${date}.`;
}

export function formatLocalClockTooltipLine(language = "en") {
  const locale = localLocale(language);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: "2-digit",
    hour12: language !== "zh",
  }).format(new Date());
  const abbr = formatLocalTimeZoneAbbr();
  return language === "zh"
    ? `现在是本地时间 ${time}（${abbr}）。`
    : `It's ${time} local time (${abbr}).`;
}

export function formatLocalTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date());
}

export function useLocalTimeLabel() {
  const [time, setTime] = useState(formatLocalTime);
  useEffect(() => {
    const tick = () => setTime(formatLocalTime());
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, []);
  return time;
}

export function useLocalDateLine(language = "en") {
  const [line, setLine] = useState(() => formatLocalDateLine(language));
  useEffect(() => {
    const tick = () => setLine(formatLocalDateLine(language));
    tick();
    const intervalId = window.setInterval(tick, 60_000);
    return () => window.clearInterval(intervalId);
  }, [language]);
  return line;
}

export function useLocalClockTooltipLine(language = "en") {
  const [line, setLine] = useState(() => formatLocalClockTooltipLine(language));
  useEffect(() => {
    const tick = () => setLine(formatLocalClockTooltipLine(language));
    tick();
    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [language]);
  return line;
}
