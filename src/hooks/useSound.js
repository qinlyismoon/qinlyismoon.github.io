import { useCallback } from "react";

export function useSound(isMuted) {
  const playSound = useCallback(
    (audioRef) => {
      if (isMuted || !audioRef?.current) return;
      const audio = audioRef.current;

      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay-related rejections until the user interacts.
      });
    },
    [isMuted]
  );

  const playLoopingSound = useCallback(
    (audioRef) => {
      if (isMuted || !audioRef?.current) return;
      const audio = audioRef.current;

      audio.play().catch(() => {
        // Ignore autoplay-related rejections until the user interacts.
      });
    },
    [isMuted]
  );

  const pauseSound = useCallback((audioRef) => {
    if (!audioRef?.current) return;
    const audio = audioRef.current;

    audio.pause();
  }, []);

  return { playSound, playLoopingSound, pauseSound };
}
