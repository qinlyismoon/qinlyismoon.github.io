import { useCallback, useEffect, useRef } from "react";
import { DESK_MUSIC_START_SECONDS, DESK_MUSIC_VIDEO_ID } from "../lib/music";

let apiReadyPromise = null;

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (window.YT?.Player) {
    return Promise.resolve(window.YT);
  }

  if (!apiReadyPromise) {
    apiReadyPromise = new Promise((resolve) => {
      const previousReady = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = () => {
        previousReady?.();
        resolve(window.YT);
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        tag.async = true;
        document.head.appendChild(tag);
      }
    });
  }

  return apiReadyPromise;
}

export function useYouTubeMusic({ containerRef, isPlaying, isMuted }) {
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
    isMutedRef.current = isMuted;
  }, [isPlaying, isMuted]);

  const syncPlayback = useCallback(() => {
    const player = playerRef.current;
    if (!readyRef.current || !player?.playVideo) return;

    if (isPlayingRef.current && !isMutedRef.current) {
      player.playVideo();
      return;
    }

    player.pauseVideo();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const mountNode = containerRef.current;
    if (!mountNode) return undefined;

    loadYouTubeIframeApi().then((YT) => {
      if (cancelled || !YT || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        videoId: DESK_MUSIC_VIDEO_ID,
        width: "1",
        height: "1",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          start: DESK_MUSIC_START_SECONDS,
        },
        events: {
          onReady: (event) => {
            readyRef.current = true;
            event.target.seekTo(DESK_MUSIC_START_SECONDS, true);
            // Slightly lower than YouTube default; no user volume controls in UI.
            event.target.setVolume?.(46);
            syncPlayback();
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.ENDED) {
              event.target.seekTo(DESK_MUSIC_START_SECONDS, true);
              if (isPlayingRef.current && !isMutedRef.current) {
                event.target.playVideo();
              }
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      readyRef.current = false;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [containerRef, syncPlayback]);

  useEffect(() => {
    syncPlayback();
  }, [isPlaying, isMuted, syncPlayback]);
}
