import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import PaperCorner from "../landing/PaperCorner";
import {
  getRestCornerSize,
  landingClipPath,
  PAPER_PEEL_OPEN_SIZE,
  PAPER_PEEL_TRANSITION,
} from "../../lib/animations";

export default function PaperPeelStage({
  viewState,
  landing,
  workspace,
  onOpenComplete,
  onCloseComplete,
  onPeel,
  cornerAriaLabel,
  isDarkMode,
}) {
  const [restCornerSize] = useState(() => getRestCornerSize());
  const [closingReady, setClosingReady] = useState(false);
  const peelSize = useMotionValue(
    viewState === "workspace" ? PAPER_PEEL_OPEN_SIZE : restCornerSize,
  );
  const viewStateRef = useRef(viewState);
  viewStateRef.current = viewState;

  const landingMaskClip = useTransform(peelSize, (size) => landingClipPath(size));

  useEffect(() => {
    if (viewState !== "closing") {
      setClosingReady(false);
      return undefined;
    }

    setClosingReady(false);
    peelSize.set(PAPER_PEEL_OPEN_SIZE);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setClosingReady(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [viewState, peelSize]);

  useEffect(() => {
    if (viewState === "opening") {
      peelSize.set(restCornerSize);
      const controls = animate(peelSize, PAPER_PEEL_OPEN_SIZE, PAPER_PEEL_TRANSITION);
      return () => controls.stop();
    }

    if (viewState === "closing" && closingReady) {
      const controls = animate(peelSize, restCornerSize, PAPER_PEEL_TRANSITION);
      return () => controls.stop();
    }

    if (viewState === "landing") {
      peelSize.set(restCornerSize);
    }

    if (viewState === "workspace") {
      peelSize.set(PAPER_PEEL_OPEN_SIZE);
    }

    return undefined;
  }, [viewState, closingReady, peelSize, restCornerSize]);

  const handlePeelAnimationComplete = () => {
    const current = viewStateRef.current;

    if (current === "opening") {
      onOpenComplete();
    }

    if (current === "closing") {
      onCloseComplete();
    }
  };

  useEffect(() => {
    if (viewState !== "opening" && viewState !== "closing") return undefined;

    const timeout = window.setTimeout(() => {
      handlePeelAnimationComplete();
    }, PAPER_PEEL_TRANSITION.duration * 1000 + 80);

    return () => window.clearTimeout(timeout);
  }, [viewState, closingReady]);

  const showOver = viewState !== "workspace";
  const showCorner = viewState === "landing" || viewState === "opening";

  return (
    <div className="paper-stage">
      <div
        className={`paper-layer paper-layer--under${
          viewState === "workspace" ? " paper-layer--active" : ""
        }`}
      >
        {workspace}
      </div>

      {showOver && (
        <div className="paper-layer paper-layer--over">
          <motion.div
            className="paper-landing-mask"
            style={{ clipPath: landingMaskClip }}
          >
            {landing}
          </motion.div>

          {showCorner && (
            <PaperCorner
              ariaLabel={cornerAriaLabel}
              onPeel={onPeel}
              isDarkMode={isDarkMode}
              restCornerSize={restCornerSize}
              isPeeling={viewState === "opening"}
            />
          )}
        </div>
      )}
    </div>
  );
}
