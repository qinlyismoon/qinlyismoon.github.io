import { useMemo } from "react";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useMusic } from "../../context/MusicContext";
import { getThemeColors } from "../../lib/theme";
import {
  moonIconUrl,
  sunIconUrl,
  volumeMuteIconUrl,
  volumeUpIconUrl,
} from "../../lib/icons";

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif";

function ControlDivider({ isDarkMode, isLarge }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "1px",
        alignSelf: "stretch",
        background: isDarkMode
          ? "rgba(255,255,255,0.12)"
          : "rgba(255,255,255,0.22)",
        margin: isLarge ? "4px 8px" : "4px 6px",
        borderRadius: "999px",
      }}
    />
  );
}

function ControlButton({ isLarge, themeColors, onClick, ariaLabel, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        flex: 1,
        minWidth: 0,
        height: isLarge ? "42px" : "36px",
        borderRadius: "999px",
        border: "none",
        background: "transparent",
        color: themeColors.controlText,
        fontSize: isLarge ? "22px" : "18px",
        fontWeight: 500,
        opacity: 1,
        transition: "opacity 0.18s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        fontFamily: FONT_STACK,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = "0.65";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </button>
  );
}

export default function SettingsControlBar({
  isLarge = false,
  className,
  style,
}) {
  const {
    language,
    isDarkMode,
    isMuted,
    toggleLanguage,
    toggleTheme,
    toggleMute,
  } = useAppSettings();
  const { isMusicPlaying, pauseMusic } = useMusic();

  const themeColors = useMemo(
    () => getThemeColors(isDarkMode),
    [isDarkMode],
  );

  // Mute silences desk SFX and pauses music. Icon must follow isMuted — not
  // music paused — otherwise the UI looks muted while interactions still sound.
  const handleMuteClick = () => {
    if (!isMuted && isMusicPlaying) {
      pauseMusic();
    }
    toggleMute();
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        gap: 0,
        padding: isLarge ? "10px 12px" : "8px 10px",
        borderRadius: "999px",
        background: themeColors.controlBg,
        border: themeColors.controlBorder,
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: isDarkMode
          ? "0 10px 30px rgba(0,0,0,0.35)"
          : "0 10px 30px rgba(0,0,0,0.12)",
        ...style,
      }}
    >
      <ControlButton
        isLarge={isLarge}
        themeColors={themeColors}
        onClick={toggleLanguage}
      >
        {language === "en" ? "EN" : "中"}
      </ControlButton>

      <ControlDivider isDarkMode={isDarkMode} isLarge={isLarge} />

      <ControlButton
        isLarge={isLarge}
        themeColors={themeColors}
        onClick={toggleTheme}
        ariaLabel="Toggle theme"
      >
        <img
          src={isDarkMode ? moonIconUrl : sunIconUrl}
          alt=""
          aria-hidden="true"
          style={{
            width: isLarge ? "22px" : "18px",
            height: isLarge ? "22px" : "18px",
            objectFit: "contain",
            display: "block",
            filter: isDarkMode ? "brightness(0) invert(1)" : "none",
            opacity: 0.95,
          }}
        />
      </ControlButton>

      <ControlDivider isDarkMode={isDarkMode} isLarge={isLarge} />

      <ControlButton
        isLarge={isLarge}
        themeColors={themeColors}
        onClick={handleMuteClick}
        ariaLabel={isMuted ? "Unmute" : "Mute"}
      >
        <img
          src={isMuted ? volumeMuteIconUrl : volumeUpIconUrl}
          alt=""
          aria-hidden="true"
          style={{
            width: isLarge ? "24px" : "20px",
            height: isLarge ? "24px" : "20px",
            objectFit: "contain",
            display: "block",
            filter: isDarkMode ? "brightness(0) invert(1)" : "none",
            opacity: 0.95,
          }}
        />
      </ControlButton>
    </div>
  );
}
