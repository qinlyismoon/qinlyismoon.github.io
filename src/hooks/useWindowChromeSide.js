import { useSyncExternalStore } from "react";
import { getWindowChromeSide } from "../lib/platform";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return getWindowChromeSide();
}

function getServerSnapshot() {
  return "right";
}

/** "left" on macOS / Apple, "right" on Windows and others. */
export default function useWindowChromeSide() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
