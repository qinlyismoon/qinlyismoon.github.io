import { useEffect } from "react";

/**
 * Case-study detail video playback: play while in view, pause when
 * scrolled away. Prefers-reduced-motion: never auto-starts; the
 * reader uses controls.
 *
 * withSound: try unmuted first (for scored clips like Oscar’s
 * Nutcracker bed); if the browser blocks it, fall back to muted
 * so the picture still moves — the reader can unmute via controls.
 */
export default function useInViewPlayback(
  videoRef,
  { threshold = 0.4, withSound = false } = {},
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const playInView = () => {
      if (withSound) {
        video.muted = false;
        return video.play().catch(() => {
          video.muted = true;
          return video.play().catch(() => {});
        });
      }
      video.muted = true;
      return video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          playInView();
        } else {
          video.pause();
        }
      },
      { threshold },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, threshold, withSound]);
}
