import { useEffect, useState } from "react";

/** Shorter plant vines and tighter shelf accents on narrow viewports. */
export function useCompactScene() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return compact;
}
