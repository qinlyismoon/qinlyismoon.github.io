import { createContext, useContext } from "react";

/**
 * Lets page content temporarily override the sidebar's Page Metadata
 * region — e.g. hovering a Case Studies card swaps the two metadata
 * items to that project's role and timeline, with a vertical slide.
 * The override is { id, items: [{ label, value }] } or null.
 * SiteShell owns the state; pages only set/clear it.
 */
export const SidebarOverrideContext = createContext({
  metadataOverride: null,
  setMetadataOverride: () => {},
});

export function useSidebarOverride() {
  return useContext(SidebarOverrideContext);
}
