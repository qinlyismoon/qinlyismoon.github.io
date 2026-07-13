export function getThemeColors(isDarkMode) {
  return isDarkMode
    ? {
        pageBg: "#111111",
        windowBg: "#1c1c1e",
        windowTexture:
          "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.045) 0, rgba(255,255,255,0.045) 1px, transparent 1.6px), radial-gradient(circle at 72% 64%, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1.7px), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 22%, rgba(0,0,0,0.02) 100%)",
        topBarBg: "#2c2c2e",
        windowBorder: "1px solid rgba(255,255,255,0.08)",
        text: "#f5f5f7",
        mutedText: "rgba(245,245,247,0.45)",
        shadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
        controlBg: "rgba(255,255,255,0.08)",
        controlBorder: "1px solid rgba(255,255,255,0.10)",
        controlText: "#f5f5f7",
        // Top nav — softer than the bottom control bar
        navBarBg: "rgba(255,255,255,0.06)",
        navBarBorder: "1px solid rgba(255,255,255,0.08)",
        navInactiveText: "rgba(245,245,247,0.55)",
        navActiveText: "#f5f5f7",
        navHoverBg: "rgba(255,255,255,0.08)",
        navActiveBg: "rgba(255,255,255,0.14)",
        navActiveHoverBg: "rgba(255,255,255,0.18)",
      }
    : {
        pageBg: "#ffffff",
        windowBg: "#ffffff",
        windowTexture:
          "radial-gradient(circle at 20% 24%, rgba(0,0,0,0.032) 0, rgba(0,0,0,0.032) 1px, transparent 1.7px), radial-gradient(circle at 76% 68%, rgba(0,0,0,0.022) 0, rgba(0,0,0,0.022) 1px, transparent 1.8px), linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,248,248,0.96) 100%)",
        topBarBg: "#f5f5f7",
        windowBorder: "1px solid rgba(0,0,0,0.06)",
        text: "#111111",
        mutedText: "rgba(17,17,17,0.45)",
        shadow: "0 24px 60px rgba(0, 0, 0, 0.16)",
        controlBg: "rgba(60,60,67,0.18)",
        controlBorder: "1px solid rgba(255,255,255,0.18)",
        controlText: "#111111",
        // Top nav — softer than the bottom control bar
        navBarBg: "rgba(60,60,67,0.05)",
        navBarBorder: "1px solid rgba(255,255,255,0.28)",
        navInactiveText: "rgba(17,17,17,0.48)",
        navActiveText: "#111111",
        navHoverBg: "rgba(60,60,67,0.08)",
        navActiveBg: "rgba(60,60,67,0.12)",
        navActiveHoverBg: "rgba(60,60,67,0.09)",
      };
}
