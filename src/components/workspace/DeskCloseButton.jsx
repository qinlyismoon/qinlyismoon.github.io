import { usePageTransition } from "../../context/PageTransitionContext";
import { useAppSettings } from "../../context/AppSettingsContext";
import useWindowChromeSide from "../../hooks/useWindowChromeSide";
import { getWorkspaceCopy } from "../../lib/copy";

/** Fixed close control so Desk / About can return Home without the dock. */
export default function DeskCloseButton({ label } = {}) {
  const { navigateToHome } = usePageTransition();
  const { language } = useAppSettings();
  const chromeSide = useWindowChromeSide();
  const copy = getWorkspaceCopy(language);
  const ariaLabel = label ?? copy.closeLabel;

  return (
    <button
      type="button"
      className={`desk-close desk-close--${chromeSide}`}
      aria-label={ariaLabel}
      onClick={() => navigateToHome({ silent: true })}
    >
      <span aria-hidden="true">×</span>
    </button>
  );
}
