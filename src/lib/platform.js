/**
 * OS window-chrome side — Mac puts close on the left; Windows/Linux keep it right.
 */

export function prefersMacWindowChrome() {
  if (typeof navigator === "undefined") return false;

  const platform = navigator.userAgentData?.platform || navigator.platform || "";
  if (/mac/i.test(platform)) return true;

  const ua = navigator.userAgent || "";
  // Desktop Safari / Chrome on macOS. iPadOS 13+ also reports Mac — treat as Apple.
  if (/Mac OS X|Macintosh/i.test(ua) && !/Android/i.test(ua)) return true;

  return false;
}

/** Where close / expand chrome should sit: "left" (Mac) or "right" (Windows). */
export function getWindowChromeSide() {
  return prefersMacWindowChrome() ? "left" : "right";
}
