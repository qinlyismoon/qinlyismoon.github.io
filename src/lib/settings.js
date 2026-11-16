/**
 * Site settings — one vocabulary shared by the pre-paint script in
 * index.html, AppSettingsContext, the Settings panel and the Desk.
 *
 * Mode decides light / dark (or follows the operating system). Accent is
 * the single active voice of the interface (open tab, hovered link, live
 * status); every option is a quiet natural pigment that belongs on a desk
 * — plant green, fountain-pen ink, terracotta, plum, pencil ochre — and
 * passes WCAG AA (≥ 4.5:1) on the page and surface in both modes. Type
 * voice chooses Sans or Serif, never a free-form font picker.
 */

export const SETTINGS_STORAGE_KEY = "phoebe-site-settings";

export const THEME_MODES = ["light", "dark", "system"];

/** Type voices: two named presets, not a font picker. Each fills the
 *  ui / reading / display roles in styles.css.
 *  geometric (Sans) — Geist for UI, reading, and display
 *  serif            — Zalando Sans for UI chrome; STIX Two Text for reading + display
 *  A saved "editorial" (retired) falls back to the default. */
export const TYPE_VOICES = ["geometric", "serif"];

/** Faces each voice paints with (CSS font shorthands), loaded before a
 *  switch so the new voice never arrives in a fallback face first. */
const TYPE_VOICE_FONTS = {
  serif: [
    '400 1em "Zalando Sans"',
    '500 1em "Zalando Sans"',
    '600 1em "Zalando Sans"',
    '400 1em "STIX Two Text"',
    '500 1em "STIX Two Text"',
    '600 1em "STIX Two Text"',
  ],
  geometric: [
    '400 1em "Geist"',
    '500 1em "Geist"',
    '600 1em "Geist"',
    '400 1em "Geist Mono"',
  ],
};

/** Resolves once the voice's faces are ready, or after `timeout` ms so a
 *  slow network never holds the switch hostage. */
export function loadTypeVoiceFonts(typeVoice, timeout = 800) {
  const faces = TYPE_VOICE_FONTS[typeVoice] ?? [];
  if (!faces.length || !document.fonts?.load) return Promise.resolve();
  return Promise.race([
    Promise.all(faces.map((face) => document.fonts.load(face))).catch(() => {}),
    new Promise((resolve) => window.setTimeout(resolve, timeout)),
  ]);
}

/** Accent pigments + matching page grounds (subtle tint of the accent). */
export const ACCENTS = [
  {
    id: "forest",
    light: "#526b61",
    dark: "#9aafa5",
    // v3: Hudson-like cool gray ground (accents can retint later).
    pageBgLight: "#fafafa",
    pageBgDark: "#161816",
  },
  {
    id: "ink",
    light: "#4c6178",
    dark: "#a3b4c7",
    pageBgLight: "#fafafa",
    pageBgDark: "#15171a",
  },
  {
    id: "clay",
    light: "#94584a",
    dark: "#d4a698",
    pageBgLight: "#fafafa",
    pageBgDark: "#1a1716",
  },
  {
    id: "plum",
    light: "#6b5a75",
    dark: "#bcaac4",
    pageBgLight: "#fafafa",
    pageBgDark: "#18161a",
  },
  {
    id: "ochre",
    light: "#80652e",
    dark: "#cdb27c",
    pageBgLight: "#fafafa",
    pageBgDark: "#1a1814",
  },
];

export function getAccentPageBg(accentId, isDark) {
  const accent =
    ACCENTS.find((entry) => entry.id === accentId) ?? ACCENTS[0];
  return isDark ? accent.pageBgDark : accent.pageBgLight;
}

export const DEFAULT_SETTINGS = {
  language: "en",
  themeMode: "light",
  accent: "forest",
  typeVoice: "geometric",
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
    typeVoice: TYPE_VOICES.includes(raw.typeVoice)
      ? raw.typeVoice
      : DEFAULT_SETTINGS.typeVoice,
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
    type: "Type",
    typeVoices: {
      geometric: "Sans",
      serif: "Serif",
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
    type: "字体",
    typeVoices: {
      geometric: "无衬线",
      serif: "衬线",
    },
    close: "关闭设置",
    language: "Switch to English",
  },
};

export function getSettingsLabels(language) {
  return LABELS[language] ?? LABELS.en;
}

/** Applies mode + accent + type voice to <html> — the only place the DOM is touched. */
export function applyDocumentSettings({ isDark, accent, language, typeVoice }) {
  const root = document.documentElement;
  root.dataset.theme = isDark ? "dark" : "light";
  root.dataset.accent = accent;
  if (typeVoice) root.dataset.typeVoice = typeVoice;
  root.style.colorScheme = isDark ? "dark" : "light";
  // Page ground follows the accent so the whole site shifts with 主题色.
  root.style.setProperty("--color-background", getAccentPageBg(accent, isDark));
  if (language) root.lang = language === "zh" ? "zh-Hans" : "en";
}
