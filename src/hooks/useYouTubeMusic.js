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

/**
 * Desk speaker YouTube audio. Never autoplays — playback only via toggleMusic().
 * Resume from pause does not seek; only the first start (and loop-after-end) seeks.
 */
export function useYouTubeMusic({ containerRef, isPlaying, onPlayingChange }) {
  const playerRef = useRef(null);
  const readyRef = useRef(false);
  /** User-intent flag: only true after an explicit play click (or while looping after that). */
  const wantPlayingRef = useRef(false);
  /** True after the user has started playback at least once this session. */
  const hasStartedRef = useRef(false);
  const onPlayingChangeRef = useRef(onPlayingChange);

  useEffect(() => {
    onPlayingChangeRef.current = onPlayingChange;
  }, [onPlayingChange]);

  useEffect(() => {
    wantPlayingRef.current = Boolean(isPlaying);
  }, [isPlaying]);

  const pausePlayer = useCallback(() => {
    const player = playerRef.current;
    if (!readyRef.current || !player?.pauseVideo) return;
    wantPlayingRef.current = false;
    try {
      player.pauseVideo();
    } catch {
      // Ignore if player is mid-teardown.
    }
  }, []);

  const toggleMusic = useCallback(() => {
    const player = playerRef.current;
    if (!readyRef.current || !player?.playVideo) return;

    if (wantPlayingRef.current) {
      wantPlayingRef.current = false;
      try {
        player.pauseVideo();
      } catch {
        // Ignore.
      }
      onPlayingChangeRef.current?.(false);
      return;
    }

    wantPlayingRef.current = true;
    try {
      // Only seek on the very first start so pause/resume keeps position.
      if (!hasStartedRef.current) {
        player.seekTo(DESK_MUSIC_START_SECONDS, true);
        hasStartedRef.current = true;
      }
      player.playVideo();
    } catch {
      wantPlayingRef.current = false;
      onPlayingChangeRef.current?.(false);
      return;
    }
    onPlayingChangeRef.current?.(true);
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
            if (cancelled) return;
            readyRef.current = true;
            // Always land paused — never start from ready / seek / cue.
            wantPlayingRef.current = false;
            hasStartedRef.current = false;
            try {
              event.target.cueVideoById?.({
                videoId: DESK_MUSIC_VIDEO_ID,
                startSeconds: DESK_MUSIC_START_SECONDS,
              });
              event.target.setVolume?.(46);
              event.target.pauseVideo();
            } catch {
              // Ignore.
            }
            onPlayingChangeRef.current?.(false);
          },
          onStateChange: (event) => {
            if (cancelled || !YT) return;

            const state = event.data;

            // Loop only when the user already started playback.
            if (state === YT.PlayerState.ENDED) {
              if (wantPlayingRef.current) {
                try {
                  event.target.seekTo(DESK_MUSIC_START_SECONDS, true);
                  event.target.playVideo();
                } catch {
                  wantPlayingRef.current = false;
                  onPlayingChangeRef.current?.(false);
                }
              } else {
                onPlayingChangeRef.current?.(false);
              }
              return;
            }

            // Mirror player → React. Never call playVideo here.
            if (state === YT.PlayerState.PLAYING) {
              // Guard against unexpected autoplay: stop unless user asked.
              if (!wantPlayingRef.current) {
                try {
                  event.target.pauseVideo();
                } catch {
                  // Ignore.
                }
                onPlayingChangeRef.current?.(false);
                return;
              }
              onPlayingChangeRef.current?.(true);
              return;
            }

            if (
              state === YT.PlayerState.PAUSED ||
              state === YT.PlayerState.CUED
            ) {
              if (!wantPlayingRef.current) {
                onPlayingChangeRef.current?.(false);
              }
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      readyRef.current = false;
      wantPlayingRef.current = false;
      hasStartedRef.current = false;
      try {
        playerRef.current?.destroy?.();
      } catch {
        // Ignore.
      }
      playerRef.current = null;
    };
  }, [containerRef]);

  return { toggleMusic, pausePlayer };
}
