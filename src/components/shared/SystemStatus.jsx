import { useAppSettings } from "../../context/AppSettingsContext";
import { useMusic } from "../../context/MusicContext";

/**
 * System status — language, theme and sound as three quiet text states
 * in one row near the sidebar's bottom edge (see site-chrome.css). This
 * is the documentation-voice alternative to a toolbar: each item
 * reports the current state ("EN", "Light", "Sound") and clicking
 * toggles it. Typography carries the interface — no icons, no dividers,
 * no background. Hover follows the design-system link rule (accent
 * color plus a rightward nudge); each button keeps its accessible label
 * (the action) plus a native tooltip.
 */
export default function SystemStatus() {
  const { language, isDarkMode, isMuted, toggleLanguage, toggleTheme, toggleMute } =
    useAppSettings();
  const { isMusicPlaying, pauseMusic } = useMusic();

  // Mute silences desk SFX and pauses music.
  const handleMuteClick = () => {
    if (!isMuted && isMusicPlaying) {
      pauseMusic();
    }
    toggleMute();
  };

  const states = [
    {
      key: "language",
      label: language === "en" ? "EN" : "ZH",
      onClick: toggleLanguage,
      ariaLabel: language === "en" ? "Switch to Chinese" : "Switch to English",
    },
    {
      key: "theme",
      label: isDarkMode ? "Dark" : "Light",
      onClick: toggleTheme,
      ariaLabel: isDarkMode ? "Switch to light mode" : "Switch to dark mode",
    },
    {
      key: "sound",
      label: isMuted ? "Muted" : "Sound",
      onClick: handleMuteClick,
      ariaLabel: isMuted ? "Unmute" : "Mute",
    },
  ];

  return (
    <div className="system-status" role="group" aria-label="System status">
      {states.map(({ key, label, onClick, ariaLabel }) => (
        <button
          key={key}
          type="button"
          className="system-status__item"
          onClick={onClick}
          aria-label={ariaLabel}
          title={ariaLabel}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
