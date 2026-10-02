/**
 * objectChrome — resolves per-object label, aria-label and tooltip content.
 *
 * Kept in one place so the Object, Shelf and Interaction layers all agree
 * on what each object says. The interaction state (lamp on/off, music
 * playing, plant growth, language) flows in; resolved chrome flows out.
 */
import WorkspaceMugTooltip from "../WorkspaceMugTooltip";
import WorkspaceClockTooltip from "../WorkspaceClockTooltip";
import WorkspacePlantTooltip from "../WorkspacePlantTooltip";

export function resolveObjectChrome(
  object,
  { copy, language, isLampOn, isMusicPlaying, plantIsMaxed }
) {
  const chrome = {
    label: undefined,
    ariaLabel: undefined,
    tooltip: undefined,
    labelOffset: object.labelOffset,
    tooltipOffset: object.tooltipOffset,
    tooltipAlign: object.tooltipAlign,
  };

  if (object.id === "speaker") {
    chrome.label = isMusicPlaying ? copy.objects.musicPause : copy.objects.musicPlay;
    chrome.ariaLabel = chrome.label;
  } else if (object.id === "lamp") {
    chrome.label = isLampOn ? copy.objects.lampTurnOff : copy.objects.lampTurnOn;
    chrome.ariaLabel = chrome.label;
  } else {
    if (object.labelKey && !object.hideLabel) {
      chrome.label = copy.objects[object.labelKey];
    }
    if (object.ariaLabelKey) {
      chrome.ariaLabel =
        object.id === "plant" && plantIsMaxed
          ? copy.objects.plantAriaMaxed
          : copy.objects[object.ariaLabelKey];
    }
  }

  if (object.id === "mug") {
    chrome.tooltip = <WorkspaceMugTooltip key={language} />;
  } else if (object.id === "clock") {
    chrome.tooltip = <WorkspaceClockTooltip key={language} />;
  } else if (object.id === "plant") {
    chrome.tooltip = (
      <WorkspacePlantTooltip key={language} isMaxed={plantIsMaxed} />
    );
  }

  return chrome;
}
