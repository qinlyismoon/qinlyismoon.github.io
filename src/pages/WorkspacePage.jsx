import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getWorkspaceCopy } from "../lib/copy";
import InteractiveWorkspace from "../components/workspace/InteractiveWorkspace";

export default function WorkspacePage({
  environment,
  isLampOn,
  onLampToggle,
  isNight,
  isActive,
}) {
  const { language } = useAppSettings();

  const copy = useMemo(() => getWorkspaceCopy(language), [language]);

  return (
    <div className="workspace-page__content">
      <InteractiveWorkspace
        copy={copy}
        isNight={isNight}
        isLampOn={isLampOn}
        environment={environment}
        onLampToggle={onLampToggle}
        isActive={isActive}
      />
    </div>
  );
}
