import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import avatarImg from "../assets/profile-photo.jpg";
import folderImg from "../assets/folder.png";
import emailIcon from "../assets/email.png";
import linkedinIcon from "../assets/linkedin.png";
import instagramIcon from "../assets/instagram.png";
import { useAppSettings } from "../context/AppSettingsContext";
import { useSound } from "../hooks/useSound";
import { getHomeCopy } from "../lib/copy";
import { getThemeColors } from "../lib/theme";
import SettingsControlBar from "./shared/SettingsControlBar";

export default function FolderAvatar() {
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(null);
  const closeSoundRef = useRef(null);
  const minimizeSoundRef = useRef(null);
  const typingSoundRef = useRef(null);
  const folderWrapRef = useRef(null);
  const windowRef = useRef(null);
  const [showWindow, setShowWindow] = useState(false);
  const [isTrafficHover, setIsTrafficHover] = useState(false);
  const [windowExitMode, setWindowExitMode] = useState("close");
  const [minimizeExit, setMinimizeExit] = useState({ x: 0, y: 0, scale: 0.2 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
  const { language, isDarkMode, isMuted } = useAppSettings();
  const { playSound, playLoopingSound, pauseSound } = useSound(isMuted);

  const typingHoverCountRef = useRef(0);

  const stopTypingSound = useCallback(() => {
    typingHoverCountRef.current = 0;
    pauseSound(typingSoundRef);
  }, [pauseSound]);

  const handleFolderClick = () => {
    stopTypingSound();
    playSound(clickSoundRef);
    setIsTrafficHover(false);
    setWindowExitMode("close");
    setMinimizeExit({ x: 0, y: 0, scale: 0.18 });
    setIsZoomed(false);
    setWindowPosition({ x: 0, y: 0 });
    setShowWindow(true);
  };

  const handleCloseWindow = () => {
    playSound(closeSoundRef);
    stopTypingSound();
    setIsTrafficHover(false);
    setWindowExitMode("close");
    setShowWindow(false);
  };

  const handleMinimizeWindow = () => {
    playSound(minimizeSoundRef);
    const folderRect = folderWrapRef.current?.getBoundingClientRect();
    const windowRect = windowRef.current?.getBoundingClientRect();

    if (folderRect && windowRect) {
      const folderCenterX = folderRect.left + folderRect.width / 2;
      const folderCenterY = folderRect.top + folderRect.height / 2;
      const windowCenterX = windowRect.left + windowRect.width / 2;
      const windowCenterY = windowRect.top + windowRect.height / 2;

      setMinimizeExit({
        x: folderCenterX - windowCenterX,
        y: folderCenterY - windowCenterY,
        scale: 0.18,
      });
    } else {
      setMinimizeExit({ x: 0, y: 180, scale: 0.18 });
    }

    stopTypingSound();
    setIsTrafficHover(false);
    setWindowExitMode("minimize");
    setShowWindow(false);
  };

  const handleZoomWindow = () => {
    setIsZoomed((prev) => !prev);
  };

  useEffect(() => {
    if (isZoomed) {
      setWindowPosition({ x: 0, y: 0 });
    }
  }, [isZoomed]);

  useEffect(() => {
    if (!showWindow) {
      stopTypingSound();
    }
  }, [showWindow, stopTypingSound]);

  useEffect(() => {
    if (isMuted) {
      stopTypingSound();
      pauseSound(hoverSoundRef);
      pauseSound(clickSoundRef);
      pauseSound(closeSoundRef);
      pauseSound(minimizeSoundRef);
    }
  }, [isMuted, stopTypingSound, pauseSound]);

  const copy = useMemo(() => getHomeCopy(language), [language]);
  const themeColors = useMemo(() => getThemeColors(isDarkMode), [isDarkMode]);

  const handleWindowPointerDown = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="page"
      style={{
        background: themeColors.pageBg,
        transition: "background 0.35s ease",
      }}
    >
      <motion.div
        ref={folderWrapRef}
        initial={false}
        whileHover="hover"
        className="folder-wrap"
        onHoverStart={() => playSound(hoverSoundRef)}
        onClick={handleFolderClick}
      >
        <audio ref={hoverSoundRef} preload="auto" src="/hover-pop.mp3" />
        <audio ref={clickSoundRef} preload="auto" src="/folder-click.mp3" />
        <audio ref={closeSoundRef} preload="auto" src="/window-close.mp3" />
        <audio ref={minimizeSoundRef} preload="auto" src="/window-minimize.mp3" />
        <audio ref={typingSoundRef} preload="auto" src="/typing-loop.mp3" loop />

        <motion.div
          className="ground-shadow"
          initial={{ opacity: isDarkMode ? 0 : 0.18, scale: 0.88 }}
          variants={{
            hover: { opacity: isDarkMode ? 0 : 0.28, scale: 1.02 },
          }}
          transition={{ duration: 0.45 }}
          style={{
            filter: undefined,
            mixBlendMode: undefined,
          }}
        />

        <motion.div
          className="avatar-shell"
          initial={{ y: 80, scale: 0.5, opacity: 0.9 }}
          variants={{
            hover: { y: -78, scale: 1, opacity: 0.95 },
          }}
          transition={{ duration: 1.2, ease: [0.2, 0.9, 0.2, 1] }}
        >
          <img src={avatarImg} alt="Avatar" className="avatar" />
        </motion.div>

        <motion.div
          className="folder-back"
          variants={{ hover: { y: -2 } }}
          transition={{ duration: 0.45 }}
          style={{
            filter: undefined,
          }}
        >
          <motion.img
            src={folderImg}
            alt="Folder"
            className="folder-img"
            variants={{ hover: { y: -2, scale: 1.03 } }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      </motion.div>

      <AnimatePresence
        onExitComplete={() => {
          if (!showWindow) {
            stopTypingSound();
            setIsTrafficHover(false);
            setIsZoomed(false);
            setWindowPosition({ x: 0, y: 0 });
            setWindowExitMode("close");
            setMinimizeExit({ x: 0, y: 0, scale: 0.18 });
          }
        }}
      >
        {showWindow && (
          <motion.div
          key={isZoomed ? "folder-window-zoomed" : "folder-window-windowed"}
          ref={windowRef}
          drag={!isZoomed}
          dragMomentum={false}
          dragElastic={0.08}
          onPointerDown={handleWindowPointerDown}
          onDragEnd={(_, info) => {
            if (!isZoomed) {
              setWindowPosition((prev) => ({
                x: prev.x + info.offset.x,
                y: prev.y + info.offset.y,
              }));
            }
          }}
          initial={{ opacity: 0, scale: 0.92, x: 0, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: isZoomed ? 0 : windowPosition.x,
            y: isZoomed ? 0 : windowPosition.y,
          }}
          exit={
            windowExitMode === "minimize"
              ? {
                  opacity: 0.12,
                  scale: minimizeExit.scale,
                  x: minimizeExit.x,
                  y: minimizeExit.y,
                }
              : { opacity: 0, scale: 0.96, y: 12 }
          }
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            top: isZoomed ? 0 : "clamp(24px, 10vh, 96px)",
            left: isZoomed ? 0 : "clamp(24px, 8vw, 96px)",
            right: isZoomed ? 0 : "auto",
            bottom: isZoomed ? 0 : "auto",
            width: isZoomed ? "100vw" : "min(680px, calc(100vw - 48px))",
            height: isZoomed ? "100vh" : "min(520px, calc(100vh - 48px))",
            backgroundColor: themeColors.windowBg,
            backgroundImage: themeColors.windowTexture,
            backgroundBlendMode: "normal",
            borderRadius: isZoomed ? "20px" : "20px",
            boxShadow: themeColors.shadow,
            border: isZoomed ? "none" : themeColors.windowBorder,
            zIndex: 50,
            overflow: "hidden",
            backgroundRepeat: "repeat, repeat, no-repeat",
            backgroundSize: "180px 180px, 220px 220px, 100% 100%",
            pointerEvents: "auto",
            boxSizing: "border-box",
            transition: "top 0.45s ease, left 0.45s ease, width 0.45s ease, height 0.45s ease, border-radius 0.45s ease",
          }}
        >
          {/* Top bar */}
          <div
            onDoubleClick={handleZoomWindow}
            style={{
              height: "40px",
              display: "flex",
              alignItems: "center",
              padding: "0 12px",
              background: themeColors.topBarBg,
              borderBottom: isDarkMode
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.06)",
              cursor: "grab",
            }}
          >
            <div
              style={{ display: "flex", gap: "8px" }}
              onMouseEnter={() => {
                setIsTrafficHover(true);
              }}
              onMouseLeave={() => {
                setIsTrafficHover(false);
              }}
            >
              <button
                type="button"
                aria-label="Close window"
                onClick={handleCloseWindow}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#ff5f57",
                  border: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    lineHeight: 1,
                    color: "rgba(60, 0, 0, 0.75)",
                    opacity: isTrafficHover ? 1 : 0,
                    transition: "opacity 0.15s ease",
                    transform: "translateY(0.5px)",
                  }}
                >
                  ×
                </span>
              </button>
              <button
                type="button"
                aria-label="Minimize window"
                onClick={handleMinimizeWindow}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#febc2e",
                  border: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "rgba(90, 55, 0, 0.78)",
                    opacity: isTrafficHover ? 1 : 0,
                    transition: "opacity 0.15s ease",
                    transform: "translateY(-1px)",
                  }}
                >
                  –
                </span>
              </button>
              <button
                type="button"
                aria-label="Zoom window"
                onClick={handleZoomWindow}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#28c840",
                  border: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  aria-hidden="true"
                  style={{
                    opacity: isTrafficHover ? 1 : 0,
                    transition: "opacity 0.15s ease",
                    transform: "translateY(-0.5px)",
                  }}
                >
                  {isZoomed ? (
                    <>
                      {/* inward triangles (restore) */}
                      <polygon points="0.0,3.7 3.7,3.7 3.7,0.0" fill="rgba(0, 70, 12, 0.8)" />
                      <polygon points="8.0,4.3 4.3,4.3 4.3,8.0" fill="rgba(0, 70, 12, 0.8)" />
                    </>
                  ) : (
                    <>
                      {/* outward triangles (maximize) */}
                      <polygon points="0.8,0.8 5.6,0.8 0.8,5.6" fill="rgba(0, 70, 12, 0.8)" />
                      <polygon points="7.2,7.2 2.4,7.2 7.2,2.4" fill="rgba(0, 70, 12, 0.8)" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Content area */}
          <div
            style={{
              height: "calc(100% - 40px)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: isZoomed ? "72px" : "44px",
              padding: isZoomed ? "160px 64px 90px" : "110px 40px 84px",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Helvetica, Arial, sans-serif",
              color: themeColors.text,
              overflowY: "auto",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{ maxWidth: isZoomed ? "1500px" : "100%" }}
              onMouseEnter={() => {
                typingHoverCountRef.current += 1;
                if (typingHoverCountRef.current === 1) {
                  playLoopingSound(typingSoundRef);
                }
              }}
              onMouseLeave={() => {
                typingHoverCountRef.current = Math.max(0, typingHoverCountRef.current - 1);
                if (typingHoverCountRef.current === 0) {
                  pauseSound(typingSoundRef);
                }
              }}
            >
              <div
                style={{
                  fontSize: isZoomed ? "clamp(54px, 8vw, 120px)" : "clamp(34px, 6vw, 64px)",
                  lineHeight: 0.95,
                  fontWeight: 500,
                  letterSpacing: "-0.05em",
                  marginBottom: isZoomed ? "18px" : "12px",
                }}
              >
                {copy.titleTop}
                <br />
                {copy.titleBottom}
                <span
                  style={{
                    display: "inline-flex",
                    marginLeft: "0.12em",
                  }}
                >
                  {[0, 1, 2].map((dot) => (
                    <motion.span
                      key={dot}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: dot * 0.18,
                      }}
                      style={{ display: "inline-block", width: "0.24em" }}
                    >
                      .
                    </motion.span>
                  ))}
                </span>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: isZoomed ? "8px" : "4px",
                alignItems: "end",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "flex-start",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => window.open("https://cooked-mind-ec6.notion.site/Phoebe-s-Design-Work-32c7fb6b97a580c3abd8cc8abe47a2da?source=copy_link", "_blank", "noopener,noreferrer")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.mutedText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text;
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      fontSize: isZoomed ? "24px" : "18px",
                      lineHeight: 1.2,
                      color: themeColors.text,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      cursor: "pointer",
                      transition: "color 0.18s ease",
                    }}
                  >
                    {copy.design}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open("https://cooked-mind-ec6.notion.site/Phoebe-s-Research-projects-32c7fb6b97a580e88088e0da2abf1883?source=copy_link", "_blank", "noopener,noreferrer")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.mutedText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text;
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      fontSize: isZoomed ? "24px" : "18px",
                      lineHeight: 1.2,
                      color: themeColors.text,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      cursor: "pointer",
                      transition: "color 0.18s ease",
                    }}
                  >
                    {copy.ux}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open("https://www.notion.so/notion3", "_blank", "noopener,noreferrer")}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.mutedText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text;
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      padding: 0,
                      font: "inherit",
                      fontSize: isZoomed ? "24px" : "18px",
                      lineHeight: 1.2,
                      color: themeColors.text,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      cursor: "pointer",
                      transition: "color 0.18s ease",
                    }}
                  >
                    {copy.ai}
                  </button>
                  <Link
                    to="/about"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = themeColors.mutedText;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = themeColors.text;
                    }}
                    style={{
                      fontSize: isZoomed ? "24px" : "18px",
                      lineHeight: 1.2,
                      color: themeColors.text,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      cursor: "pointer",
                      transition: "color 0.18s ease",
                    }}
                  >
                    {copy.about}
                  </Link>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: isZoomed ? "18px" : "14px",
                      marginTop: isZoomed ? "18px" : "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    {[
                      {
                        label: "Email",
                        icon: emailIcon,
                        href: "mailto:phoebeqincreative@gmail.com",
                      },
                      {
                        label: "LinkedIn",
                        icon: linkedinIcon,
                        href: "https://www.linkedin.com/in/longyue-qin-9b0275266/",
                      },
                      {
                        label: "Instagram",
                        icon: instagramIcon,
                        href: "https://www.instagram.com/qinlyismoon/",
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        aria-label={item.label}
                        onClick={() => window.open(item.href, "_blank", "noopener,noreferrer")}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "0.45";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          opacity: 1,
                          transition: "opacity 0.18s ease",
                        }}
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          style={{
                            width: isZoomed ? "46px" : "38px",
                            height: isZoomed ? "46px" : "38px",
                            objectFit: "contain",
                            display: "block",
                            filter: isDarkMode ? "brightness(0) invert(1)" : "none",
                            transition: "filter 0.18s ease, opacity 0.18s ease",
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SettingsControlBar
            isLarge={isZoomed}
            style={{
              position: "absolute",
              left: "50%",
              bottom: isZoomed ? "60px" : "20px",
              transform: "translateX(-50%)",
              width: isZoomed ? "300px" : "236px",
              maxWidth: "calc(100% - 32px)",
              zIndex: 80,
            }}
          />
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
