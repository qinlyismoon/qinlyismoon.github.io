import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  SETTINGS_STORAGE_KEY,
  DEFAULT_SETTINGS,
  applyDocumentSettings,
  normalizeSettings,
  resolveIsDark,
} from "../lib/settings";

function loadSettings() {
  let settings = { ...DEFAULT_SETTINGS };
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) settings = normalizeSettings(JSON.parse(stored));
  } catch {
    // Storage unavailable — fall back to defaults.
  }
  applyDocumentSettings({
    isDark: resolveIsDark(settings.themeMode),
    accent: settings.accent,
    language: settings.language,
  });
  return settings;
}

/**
 * Runs a visual settings change (mode, accent) as one calm crossfade of
 * complete page snapshots — the same clock for every surface. Falls back
 * to a root fade without the View Transitions API and to an instant swap
 * under reduced motion.
 */
function runThemeTransition(apply) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const root = document.documentElement;

  if (reduceMotion) {
    apply();
    return;
  }

  if (typeof document.startViewTransition === "function") {
    root.classList.add("theme-transitioning");
    const transition = document.startViewTransition(apply);
    transition.finished.finally(() => root.classList.remove("theme-transitioning"));
    return;
  }

  if (root.classList.contains("theme-transitioning")) {
    apply();
    return;
  }
  root.classList.add("theme-transitioning", "theme-fallback-out");
  window.setTimeout(() => {
    apply();
    root.classList.remove("theme-fallback-out");
    root.classList.add("theme-fallback-in");
    window.setTimeout(() => {
      root.classList.remove("theme-fallback-in", "theme-transitioning");
    }, 230);
  }, 150);
}

const AppSettingsContext = createContext(null);

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);
  const [systemDark, setSystemDark] = useState(() => resolveIsDark("system"));
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  // "System" mode follows the operating system live.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setSystemDark(media.matches);
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  const isDarkMode =
    settings.themeMode === "system" ? systemDark : settings.themeMode === "dark";

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Storage unavailable — settings last for this visit only.
    }
    applyDocumentSettings({
      isDark: isDarkMode,
      accent: settings.accent,
      language: settings.language,
    });
  }, [settings, isDarkMode]);

  const commitVisual = useCallback((patch) => {
    const next = { ...settingsRef.current, ...patch };
    const nextIsDark = resolveIsDark(next.themeMode);
    runThemeTransition(() => {
      applyDocumentSettings({ isDark: nextIsDark, accent: next.accent });
      flushSync(() => setSettings((prev) => ({ ...prev, ...patch })));
    });
  }, []);

  const setThemeMode = useCallback(
    (themeMode) => {
      if (themeMode === settingsRef.current.themeMode) return;
      commitVisual({ themeMode });
    },
    [commitVisual],
  );

  // Accent is a paint change, not a scene change: no page crossfade (it
  // made photos blink). Accent-painted colors ease in place on the 200ms
  // system clock while `.accent-shifting` is on <html>.
  const accentTimerRef = useRef(0);
  const setAccent = useCallback((accent) => {
    if (accent === settingsRef.current.accent) return;
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      root.classList.add("accent-shifting");
      window.clearTimeout(accentTimerRef.current);
      accentTimerRef.current = window.setTimeout(
        () => root.classList.remove("accent-shifting"),
        260,
      );
    }
    root.dataset.accent = accent;
    setSettings((prev) => ({ ...prev, accent }));
  }, []);

  const value = useMemo(
    () => ({
      language: settings.language,
      themeMode: settings.themeMode,
      accent: settings.accent,
      isDarkMode,
      isMuted: settings.isMuted,
      toggleLanguage: () =>
        setSettings((prev) => ({
          ...prev,
          language: prev.language === "en" ? "zh" : "en",
        })),
      setThemeMode,
      setAccent,
      // Kept for callers that only flip light/dark.
      toggleTheme: () => setThemeMode(isDarkMode ? "light" : "dark"),
      setMuted: (isMuted) => setSettings((prev) => ({ ...prev, isMuted })),
      toggleMute: () => setSettings((prev) => ({ ...prev, isMuted: !prev.isMuted })),
    }),
    [settings, isDarkMode, setThemeMode, setAccent],
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}

export function useAppSettings() {
  const context = useContext(AppSettingsContext);
  if (!context) {
    throw new Error("useAppSettings must be used within AppSettingsProvider");
  }
  return context;
}
