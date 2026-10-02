import { useAppSettings } from "../../context/AppSettingsContext";
import {
  useLocalClockTooltipLine,
  useLocalDateLine,
} from "../../lib/useLocalTime";

export default function WorkspaceClockTooltip() {
  const { language } = useAppSettings();
  const dateLine = useLocalDateLine(language);
  const timeLine = useLocalClockTooltipLine(language);

  return (
    <div className="workspace-tooltip">
      <div className="workspace-tooltip__body">
        <p className="workspace-tooltip__line">{dateLine}</p>
        <p className="workspace-tooltip__line workspace-tooltip__line--time">{timeLine}</p>
      </div>
    </div>
  );
}
