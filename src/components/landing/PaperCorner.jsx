import { motion } from "framer-motion";
import { paperCornerHover } from "../../lib/animations";

const flapTheme = {
  light: {
    fill: "rgba(237, 237, 235, 0.92)",
    crease: "rgba(0, 0, 0, 0.1)",
  },
  dark: {
    fill: "rgba(56, 56, 58, 0.9)",
    crease: "rgba(0, 0, 0, 0.26)",
  },
};

export default function PaperCorner({
  ariaLabel,
  onPeel,
  isDarkMode,
  restCornerSize,
  isPeeling,
}) {
  return (
    <motion.div
      className="paper-corner"
      style={{
        width: restCornerSize,
        height: restCornerSize,
      }}
    >
      <motion.button
        type="button"
        className="paper-corner__flap"
        onClick={onPeel}
        aria-label={ariaLabel}
        disabled={isPeeling}
        whileHover={
          isPeeling
            ? undefined
            : {
                x: paperCornerHover.x,
                y: paperCornerHover.y,
                transition: paperCornerHover.transition,
              }
        }
        whileTap={isPeeling ? undefined : { scale: 0.998 }}
        style={{
          opacity: isPeeling ? 0 : 1,
          pointerEvents: isPeeling ? "none" : "auto",
        }}
      >
        <span
          className="paper-corner__fill"
          aria-hidden="true"
          style={{
            background: isDarkMode ? flapTheme.dark.fill : flapTheme.light.fill,
            "--paper-crease": isDarkMode ? flapTheme.dark.crease : flapTheme.light.crease,
          }}
        />
        <span className="paper-corner__crease" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}
