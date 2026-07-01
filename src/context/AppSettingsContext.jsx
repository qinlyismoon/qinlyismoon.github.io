import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "phoebe-site-settings";

const defaultSettings = {
  language: "en",
  isDarkMode: false,
  isMuted: false,
};

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      document.documentElement.dataset.theme = defaultSettings.isDarkMode
        ? "dark"
        : "light";
      document.documentElement.lang = defaultSettings.language === "zh" ? "zh-Hans" : "en";
      return defaultSettings;
    }

    const parsed = JSON.parse(stored);
    const settings = {
      language: parsed.language === "zh" ? "zh" : "en",
      isDarkMode: Boolean(parsed.isDarkMode),
      isMuted: Boolean(parsed.isMuted),
    };
    document.documentElement.dataset.theme = settings.isDarkMode ? "dark" : "light";
    document.documentElement.lang = settings.language === "zh" ? "zh-Hans" : "en";
    return settings;
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.lang = "en";
    return defaultSettings;
  }
}

const AppSettingsContext = createContext(null);

export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    document.documentElement.dataset.theme = settings.isDarkMode ? "dark" : "light";
    document.documentElement.lang = settings.language === "zh" ? "zh-Hans" : "en";
  }, [settings]);

  const value = useMemo(
    () => ({
      language: settings.language,
      isDarkMode: settings.isDarkMode,
      isMuted: settings.isMuted,
      toggleLanguage: () =>
        setSettings((prev) => ({
          ...prev,
          language: prev.language === "en" ? "zh" : "en",
        })),
      toggleTheme: () =>
        setSettings((prev) => ({ ...prev, isDarkMode: !prev.isDarkMode })),
      toggleMute: () =>
        setSettings((prev) => ({ ...prev, isMuted: !prev.isMuted })),
    }),
    [settings]
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
