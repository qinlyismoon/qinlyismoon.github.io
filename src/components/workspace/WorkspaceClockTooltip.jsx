import { useEasternTimeLabel, useEasternTimeZoneAbbr } from "../../hooks/useEasternTime";

export default function WorkspaceClockTooltip() {
  const timezoneAbbr = useEasternTimeZoneAbbr();
  const time = useEasternTimeLabel();

  return (
    <div className="workspace-tooltip">
      <div className="workspace-tooltip__body">
        <p className="workspace-tooltip__line">{timezoneAbbr}</p>
        <p className="workspace-tooltip__line workspace-tooltip__line--time">{time}</p>
      </div>
    </div>
  );
}
