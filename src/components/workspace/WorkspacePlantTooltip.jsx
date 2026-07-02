import { useAppSettings } from "../../context/AppSettingsContext";
import { getPlantTooltipCopy } from "../../lib/copy";

export default function WorkspacePlantTooltip({ isMaxed = false }) {
  const { language } = useAppSettings();
  const lines = getPlantTooltipCopy(language, { isMaxed });

  return (
    <div className="workspace-tooltip workspace-tooltip--plant">
      <div className="workspace-tooltip__body">
        {lines.map((line) => (
          <p key={line} className="workspace-tooltip__line">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
