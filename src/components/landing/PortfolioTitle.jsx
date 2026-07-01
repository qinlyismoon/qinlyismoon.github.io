import { motion } from "framer-motion";

export default function PortfolioTitle({
  titleTop,
  titleBottom,
  onTitleMouseEnter,
  onTitleMouseLeave,
}) {
  return (
    <div
      className="portfolio-title"
      onMouseEnter={onTitleMouseEnter}
      onMouseLeave={onTitleMouseLeave}
    >
      <h1 className="portfolio-title__heading">
        {titleTop}
        <br />
        {titleBottom}
        <span className="portfolio-title__dots" aria-hidden="true">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="portfolio-title__dot"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: dot * 0.18,
              }}
            >
              .
            </motion.span>
          ))}
        </span>
      </h1>
    </div>
  );
}
