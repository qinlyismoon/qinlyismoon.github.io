export function getThemeColors(isDarkMode) {
  return isDarkMode
    ? {
        pageBg: "#171717",
        windowBg: "#202020",
        windowTexture:
          "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.045) 0, rgba(255,255,255,0.045) 1px, transparent 1.6px), radial-gradient(circle at 72% 64%, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1.7px), linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 22%, rgba(0,0,0,0.02) 100%)",
        topBarBg: "#2c2c2e",
        windowBorder: "1px solid rgba(255,255,255,0.08)",
        text: "#f2f2f0",
        mutedText: "#a3a3a0",
        shadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
        controlBg: "rgba(255,255,255,0.08)",
        controlBorder: "1px solid rgba(255,255,255,0.10)",
        controlText: "#f2f2f0",
        // Top nav — softer than the bottom control bar
        navBarBg: "rgba(255,255,255,0.06)",
        navBarBorder: "1px solid rgba(255,255,255,0.08)",
        navInactiveText: "#a3a3a0",
        navActiveText: "#f2f2f0",
        navHoverBg: "rgba(255,255,255,0.08)",
        navActiveBg: "rgba(255,255,255,0.14)",
        navActiveHoverBg: "rgba(255,255,255,0.18)",
      }
    : {
        pageBg: "#f7f7f5",
        windowBg: "#ffffff",
        windowTexture:
          "radial-gradient(circle at 20% 24%, rgba(0,0,0,0.032) 0, rgba(0,0,0,0.032) 1px, transparent 1.7px), radial-gradient(circle at 76% 68%, rgba(0,0,0,0.022) 0, rgba(0,0,0,0.022) 1px, transparent 1.8px), linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(248,248,248,0.96) 100%)",
        topBarBg: "#f5f5f7",
        windowBorder: "1px solid rgba(0,0,0,0.06)",
        text: "#20201f",
        mutedText: "#6f6f6b",
        shadow: "0 24px 60px rgba(0, 0, 0, 0.16)",
        controlBg: "rgba(60,60,67,0.18)",
        controlBorder: "1px solid rgba(255,255,255,0.18)",
        controlText: "#20201f",
        // Top nav — soft edge (avoid bright white hairlines on light surfaces)
        navBarBg: "rgba(60,60,67,0.05)",
        navBarBorder: "1px solid rgba(60,60,67,0.12)",
        navInactiveText: "#6f6f6b",
        navActiveText: "#20201f",
        navHoverBg: "rgba(60,60,67,0.08)",
        navActiveBg: "rgba(60,60,67,0.12)",
        navActiveHoverBg: "rgba(60,60,67,0.09)",
      };
}
