import { motion } from "framer-motion";
import { paperCornerHover } from "../../lib/animations";

const flapBack = {
  light: "rgba(214, 214, 214, 0.82)",
  dark: "rgba(52, 52, 54, 0.85)",
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
          background: isDarkMode ? flapBack.dark : flapBack.light,
          opacity: isPeeling ? 0 : 1,
          pointerEvents: isPeeling ? "none" : "auto",
        }}
      >
        <span className="paper-corner__crease" aria-hidden="true" />
      </motion.button>
    </motion.div>
  );
}
