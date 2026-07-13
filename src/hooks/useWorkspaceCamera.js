import { useEffect, useState } from "react";
import { getWorkspaceCamera } from "../lib/animations";

/**
 * Responsive desk camera — shared scale from viewport width AND height.
 * Large desktops keep the medium-shot framing; laptops ease toward a wider shot.
 */
export function useWorkspaceCamera() {
  const [camera, setCamera] = useState(() =>
    typeof window !== "undefined"
      ? getWorkspaceCamera(window.innerWidth, window.innerHeight)
      : getWorkspaceCamera(),
  );

  useEffect(() => {
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCamera(getWorkspaceCamera(window.innerWidth, window.innerHeight));
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, []);

  return camera;
}
