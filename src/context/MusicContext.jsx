import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useYouTubeMusic } from "../hooks/useYouTubeMusic";
import { useAppSettings } from "./AppSettingsContext";

const MusicContext = createContext(null);

/**
 * App-level YouTube music — one player for Home / Desk / About.
 * Never autoplays; playback only via toggleMusic() from a user gesture.
 */
export function MusicProvider({ children }) {
  const { isMuted } = useAppSettings();
  const containerRef = useRef(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const setMusicPlaying = useCallback((playing) => {
    setIsMusicPlaying(Boolean(playing));
  }, []);

  const { toggleMusic, pausePlayer } = useYouTubeMusic({
    containerRef,
    isPlaying: isMusicPlaying,
    onPlayingChange: setMusicPlaying,
  });

  // Global mute only pauses music — never resumes / autoplays on unmute.
  useEffect(() => {
    if (!isMuted) return;
    pausePlayer();
    setIsMusicPlaying(false);
  }, [isMuted, pausePlayer]);

  const value = useMemo(
    () => ({
      isMusicPlaying,
      toggleMusic,
      pauseMusic: () => {
        pausePlayer();
        setIsMusicPlaying(false);
      },
      /**
       * Desk speaker / toolbar: while muted, only allow pausing — never start.
       */
      toggleMusicFromUser: () => {
        if (isMuted && !isMusicPlaying) return;
        toggleMusic();
      },
    }),
    [isMusicPlaying, isMuted, pausePlayer, toggleMusic]
  );

  return (
    <MusicContext.Provider value={value}>
      <div
        ref={containerRef}
        className="workspace-youtube-player"
        aria-hidden="true"
      />
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
}
