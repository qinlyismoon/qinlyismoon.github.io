/** Canonical URL path for the desk / workspace scene. */
export const DESK_PATH = "/desk";

/** Legacy desk path (bookmarks / older links). */
export const PHOEBES_DESK_PATH = "/phoebes-desk";

export const ABOUT_PATH = "/about";
export const TEACHING_PATH = "/teaching";
export const LIBRARY_PATH = "/library";
export const HOME_PATH = "/";

const LEGACY_WORKSPACE_PATH = "/workspace";

export const NAV_ITEMS = [
  { id: "home", path: HOME_PATH },
  { id: "about", path: ABOUT_PATH },
  { id: "teaching", path: TEACHING_PATH },
  { id: "desk", path: DESK_PATH },
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

export function isTeachingPath(pathname) {
  return pathname === TEACHING_PATH;
}

/** Top-level paths that are never a project id. */
const RESERVED_SEGMENTS = new Set([
  "about",
  "teaching",
  "desk",
  "phoebes-desk",
  "workspace",
  "library",
]);

/**
 * Shareable project route: /<project-id> (one case study), hanging
 * directly off Home — the page the projects live on — so closing a
 * detail returns there. The legacy /library/<project-id> shape still
 * resolves for links shared before the move.
 */
export function projectIdFromPath(pathname) {
  const legacy = pathname.match(/^\/library\/([^/]+)\/?$/);
  if (legacy) return decodeURIComponent(legacy[1]);
  const match = pathname.match(/^\/([^/]+)\/?$/);
  if (!match) return null;
  const id = decodeURIComponent(match[1]);
  return RESERVED_SEGMENTS.has(id) ? null : id;
}

export function isLibraryPath(pathname) {
  return pathname === LIBRARY_PATH;
}

export function isHomePath(pathname) {
  return pathname === HOME_PATH;
}

export function isLegacyDeskPath(pathname) {
  return pathname === PHOEBES_DESK_PATH || pathname === LEGACY_WORKSPACE_PATH;
}

export function viewIdFromPath(pathname) {
  if (isAboutPath(pathname)) return "about";
  if (isTeachingPath(pathname)) return "teaching";
  if (isLibraryPath(pathname)) return "caseStudies";
  if (projectIdFromPath(pathname)) return "caseStudies";
  if (isDeskPath(pathname)) return "desk";
  return "home";
}
