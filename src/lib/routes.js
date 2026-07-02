/** URL path for Phoebe's Desk (workspace scene). */
export const PHOEBES_DESK_PATH = "/phoebes-desk";

const LEGACY_WORKSPACE_PATH = "/workspace";

export function isPhoebesDeskPath(pathname) {
  return pathname === PHOEBES_DESK_PATH || pathname === LEGACY_WORKSPACE_PATH;
}
