import { useAppSettings } from "../../context/AppSettingsContext";
import {
  useEasternClockTooltipLine,
  useEasternDateLine,
} from "../../hooks/useEasternTime";

export default function WorkspaceClockTooltip() {
  const { language } = useAppSettings();
  const dateLine = useEasternDateLine(language);
  const timeLine = useEasternClockTooltipLine(language);

  return (
    <div className="workspace-tooltip">
      <div className="workspace-tooltip__body">
        <p className="workspace-tooltip__line">{dateLine}</p>
        <p className="workspace-tooltip__line workspace-tooltip__line--time">{timeLine}</p>
      </div>
    </div>
  );
}
