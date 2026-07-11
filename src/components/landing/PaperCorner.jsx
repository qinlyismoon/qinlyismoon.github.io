import { motion } from "framer-motion";
import { paperCornerHover } from "../../lib/animations";

const flapTheme = {
  light: {
    fill: "rgba(237, 237, 235, 0.92)",
  },
  dark: {
    fill: "rgba(56, 56, 58, 0.9)",
  },
};

export default function PaperCorner({
  ariaLabel,
  onPeel,
  isDarkMode,
  restCornerSize,
  isPeeling,
}) {
  const hoverSize = restCornerSize + paperCornerHover.growPx;

  return (
    <motion.div
      className="paper-corner"
      initial={false}
      animate={{
        width: restCornerSize,
        height: restCornerSize,
      }}
      whileHover={
        isPeeling
          ? undefined
          : {
              width: hoverSize,
              height: hoverSize,
              transition: paperCornerHover.transition,
            }
      }
      style={{
        opacity: isPeeling ? 0 : 1,
        pointerEvents: isPeeling ? "none" : "auto",
      }}
    >
      <motion.button
        type="button"
        className="paper-corner__flap"
        onClick={onPeel}
        aria-label={ariaLabel}
        disabled={isPeeling}
        whileTap={isPeeling ? undefined : { scale: 0.995 }}
      >
        <span
          className="paper-corner__fill"
          aria-hidden="true"
          style={{
            background: isDarkMode ? flapTheme.dark.fill : flapTheme.light.fill,
          }}
        />
      </motion.button>
    </motion.div>
  );
}
