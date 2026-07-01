import { useAppSettings } from "../../context/AppSettingsContext";
import { getMugTooltipCopy } from "../../lib/copy";

export default function WorkspaceMugTooltip() {
  const { language } = useAppSettings();
  const lines = getMugTooltipCopy(language);

  return (
    <div className="workspace-tooltip">
      <div className="workspace-tooltip__body">
        <p className="workspace-tooltip__line">{lines[0]}</p>
        <p className="workspace-tooltip__line">{lines[1]}</p>
      </div>
    </div>
  );
}
