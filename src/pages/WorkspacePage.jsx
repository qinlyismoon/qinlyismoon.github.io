import { useMemo, useState } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { usePageTransition } from "../context/PageTransitionContext";
import { getWorkspaceCopy } from "../lib/copy";
import { getDeskPalette } from "../lib/deskPalette";
import AppLayout from "../components/shared/AppLayout";
import ViewportPortal from "../components/shared/ViewportPortal";
import InteractiveWorkspace from "../components/workspace/InteractiveWorkspace";
import WorkspaceCloseButton from "../components/workspace/WorkspaceCloseButton";

export default function WorkspacePage() {
  const { language, isDarkMode } = useAppSettings();
  const { goToLanding, isWorkspaceActive } = usePageTransition();
  const [isLampOn, setIsLampOn] = useState(false);

  const copy = useMemo(() => getWorkspaceCopy(language), [language]);
  const deskPalette = useMemo(() => getDeskPalette(isDarkMode), [isDarkMode]);
  const pageBg = isDarkMode ? deskPalette.bgNight : deskPalette.bg;

  return (
    <AppLayout
      className="workspace-page"
      style={{
        background: pageBg,
        transition: "background 0.5s ease",
      }}
    >
      {isWorkspaceActive && (
        <ViewportPortal>
          <WorkspaceCloseButton
            onClose={goToLanding}
            ariaLabel={copy.closeLabel}
            isDarkMode={isDarkMode}
          />
        </ViewportPortal>
      )}

      <div className="workspace-page__content">
        <InteractiveWorkspace
          copy={copy}
          isDarkMode={isDarkMode}
          isLampOn={isLampOn}
          onLampToggle={() => setIsLampOn((value) => !value)}
        />
      </div>
    </AppLayout>
  );
}
