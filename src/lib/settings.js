/**
 * Site settings — one vocabulary shared by the pre-paint script in
 * index.html, AppSettingsContext, the Settings panel and the Desk.
 *
 * Mode decides light / dark (or follows the operating system). Accent is
 * the single active voice of the interface (open tab, hovered link, live
 * status); every option is a quiet natural pigment that belongs on a desk
 * — plant green, fountain-pen ink, terracotta, plum, pencil ochre — and
 * passes WCAG AA (≥ 4.5:1) on the page and surface in both modes.
 */

export const SETTINGS_STORAGE_KEY = "phoebe-site-settings";

export const THEME_MODES = ["light", "dark", "system"];

export const ACCENTS = [
  { id: "forest", light: "#526b61", dark: "#9aafa5" },
  { id: "ink", light: "#4c6178", dark: "#a3b4c7" },
  { id: "clay", light: "#94584a", dark: "#d4a698" },
  { id: "plum", light: "#6b5a75", dark: "#bcaac4" },
  { id: "ochre", light: "#80652e", dark: "#cdb27c" },
];

export const DEFAULT_SETTINGS = {
  language: "en",
  themeMode: "light",
  accent: "forest",
  isMuted: false,
};

/** Accepts the current shape and the v2.1.1 shape ({ isDarkMode }). */
export function normalizeSettings(raw) {
  if (!raw || typeof raw !== "object") return { ...DEFAULT_SETTINGS };
  const themeMode = THEME_MODES.includes(raw.themeMode)
    ? raw.themeMode
    : raw.isDarkMode
      ? "dark"
      : DEFAULT_SETTINGS.themeMode;
  return {
    language: raw.language === "zh" ? "zh" : "en",
    themeMode,
    accent: ACCENTS.some((accent) => accent.id === raw.accent)
      ? raw.accent
      : DEFAULT_SETTINGS.accent,
    isMuted: Boolean(raw.isMuted),
  };
}

export function systemPrefersDark() {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

export function resolveIsDark(themeMode) {
  if (themeMode === "dark") return true;
  if (themeMode === "system") return systemPrefersDark();
  return false;
}

const LABELS = {
  en: {
    settings: "Settings",
    mode: "Mode",
    modes: { light: "Light", dark: "Dark", system: "System" },
    sound: "Sound",
    soundOn: "On",
    soundOff: "Off",
    accent: "Accent",
    accents: {
      forest: "Forest",
      ink: "Ink",
      clay: "Clay",
      plum: "Plum",
      ochre: "Ochre",
    },
    close: "Close settings",
    language: "Switch to Chinese",
  },
  zh: {
    settings: "设置",
    mode: "模式",
    modes: { light: "浅色", dark: "深色", system: "跟随系统" },
    sound: "音效",
    soundOn: "开",
    soundOff: "关",
    accent: "主题色",
    accents: {
      forest: "森林",
      ink: "墨蓝",
      clay: "陶土",
      plum: "梅紫",
      ochre: "赭黄",
    },
    close: "关闭设置",
    language: "Switch to English",
  },
};

export function getSettingsLabels(language) {
  return LABELS[language] ?? LABELS.en;
}

/** Applies mode + accent to <html> — the only place the DOM is touched. */
export function applyDocumentSettings({ isDark, accent, language }) {
  const root = document.documentElement;
  root.dataset.theme = isDark ? "dark" : "light";
  root.dataset.accent = accent;
  root.style.colorScheme = isDark ? "dark" : "light";
  if (language) root.lang = language === "zh" ? "zh-Hans" : "en";
}
