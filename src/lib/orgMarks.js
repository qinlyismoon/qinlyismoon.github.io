/**
 * Shared org marks for inline institution links (About, case studies).
 * Small square marks read as “this jumps to an organization.”
 */
import { PORTFOLIO_LINKS } from "./links";

export const ORG_MARKS = {
  osu: {
    id: "osu",
    href: PORTFOLIO_LINKS.osuDesign,
    icon: "/experience/osu.svg?v=mark-2",
    labelEn: "The Ohio State University",
    labelZh: "俄亥俄州立大学",
  },
  faishion: {
    id: "faishion",
    href: PORTFOLIO_LINKS.faishion,
    icon: "/experience/faishion-mark.svg?v=mark-4",
    labelEn: "fAIshion",
    labelZh: "fAIshion",
  },
};

export function orgMarkByHref(href) {
  return Object.values(ORG_MARKS).find((org) => org.href === href) ?? null;
}
