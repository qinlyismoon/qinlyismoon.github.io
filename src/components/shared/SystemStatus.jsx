import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useAppSettings } from "../../context/AppSettingsContext";
import { useMusic } from "../../context/MusicContext";
import { ACCENTS, THEME_MODES, getSettingsLabels } from "../../lib/settings";
import InlineChoice from "./InlineChoice";

/**
 * System status — the quiet text row near the sidebar's bottom edge (and
 * in the mobile header): `EN · Settings`.
 *
 * Language stays one tap because it changes what you read. Everything that
 * changes how the site looks or sounds — mode, sound, accent — lives behind
 * `Settings` in one paper panel (1px divider border, 8px card radius, no
 * shadow). Items are separated by middle dots on every viewport. Each
 * choice inside the panel uses InlineChoice, the same primitive as the
 * Desk style picker.
 */
export default function SystemStatus() {
  const {
    language,
    themeMode,
    accent,
    isDarkMode,
    isMuted,
    toggleLanguage,
    setThemeMode,
    setAccent,
    setMuted,
  } = useAppSettings();
  const { isMusicPlaying, pauseMusic } = useMusic();
  const labels = getSettingsLabels(language);
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  // The accent name rolls like the site's other live values: choosing a
  // pigment further along the row brings the new name up from below; going
  // back brings it down from above.
  const accentIndex = ACCENTS.findIndex((item) => item.id === accent);
  const prevAccentIndexRef = useRef(accentIndex);
  const direction = accentIndex >= prevAccentIndexRef.current ? 1 : -1;
  useEffect(() => {
    prevAccentIndexRef.current = accentIndex;
  }, [accentIndex]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Sound off silences desk SFX and pauses music.
  const handleSound = (id) => {
    const nextMuted = id === "off";
    if (nextMuted && isMusicPlaying) pauseMusic();
    setMuted(nextMuted);
  };

  return (
    <div
      ref={rootRef}
      className={`system-status${open ? " is-open" : ""}`}
      role="group"
      aria-label="System status"
    >
      <button
        type="button"
        className="system-status__item"
        onClick={toggleLanguage}
        aria-label={labels.language}
        title={labels.language}
      >
        {language === "en" ? "EN" : "ZH"}
      </button>
      <span className="system-status__separator" aria-hidden="true">·</span>
      <button
        ref={triggerRef}
        type="button"
        className="system-status__item"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        {labels.settings}
      </button>

      <div
        id={panelId}
        className="settings-panel"
        role="dialog"
        aria-label={labels.settings}
        hidden={!open}
      >
        <div className="settings-panel__group">
          <p className="settings-panel__label">{labels.mode}</p>
          <InlineChoice
            ariaLabel={labels.mode}
            value={themeMode}
            onChange={setThemeMode}
            options={THEME_MODES.map((id) => ({ id, label: labels.modes[id] }))}
          />
        </div>
        <div className="settings-panel__group">
          <p className="settings-panel__label">{labels.sound}</p>
          <InlineChoice
            ariaLabel={labels.sound}
            value={isMuted ? "off" : "on"}
            onChange={handleSound}
            options={[
              { id: "on", label: labels.soundOn },
              { id: "off", label: labels.soundOff },
            ]}
          />
        </div>
        <div className="settings-panel__group">
          <p className="settings-panel__label">
            {labels.accent}
            <span className="settings-panel__separator" aria-hidden="true">·</span>
            <span className="settings-panel__roll">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.span
                  key={accent}
                  className="settings-panel__value"
                  custom={direction}
                  variants={{
                    enter: (d) => ({ y: reduceMotion ? 0 : d * 10, opacity: 0 }),
                    center: { y: 0, opacity: 1 },
                    exit: (d) => ({ y: reduceMotion ? 0 : d * -10, opacity: 0 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  {labels.accents[accent]}
                </motion.span>
              </AnimatePresence>
            </span>
          </p>
          <InlineChoice
            ariaLabel={labels.accent}
            value={accent}
            onChange={setAccent}
            hideLabels
            options={ACCENTS.map((item) => ({
              id: item.id,
              label: labels.accents[item.id],
              swatch: isDarkMode ? item.dark : item.light,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
