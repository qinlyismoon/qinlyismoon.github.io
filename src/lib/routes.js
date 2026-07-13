/** Canonical URL path for the desk / workspace scene. */
export const DESK_PATH = "/desk";

/** Legacy desk path (bookmarks / older links). */
export const PHOEBES_DESK_PATH = "/phoebes-desk";

export const ABOUT_PATH = "/about";
export const HOME_PATH = "/";

const LEGACY_WORKSPACE_PATH = "/workspace";

export const NAV_ITEMS = [
  { id: "home", path: HOME_PATH },
  { id: "desk", path: DESK_PATH },
  { id: "about", path: ABOUT_PATH },
];

export function isDeskPath(pathname) {
  return (
    pathname === DESK_PATH ||
    pathname === PHOEBES_DESK_PATH ||
    pathname === LEGACY_WORKSPACE_PATH
  );
}

/** @deprecated Prefer isDeskPath */
export function isPhoebesDeskPath(pathname) {
  return isDeskPath(pathname);
}

export function isAboutPath(pathname) {
  return pathname === ABOUT_PATH;
}

export function isHomePath(pathname) {
  return pathname === HOME_PATH;
}

export function isLegacyDeskPath(pathname) {
  return pathname === PHOEBES_DESK_PATH || pathname === LEGACY_WORKSPACE_PATH;
}

export function viewIdFromPath(pathname) {
  if (isAboutPath(pathname)) return "about";
  if (isDeskPath(pathname)) return "desk";
  return "home";
}
