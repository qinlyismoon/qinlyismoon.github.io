import "./emotion-garden.css";
import FlowerLab from "./FlowerLab";
import IterationLoop from "./IterationLoop";
import VersionTimeline from "./VersionTimeline";

// Case-study sections reference these by name: `interactive: "eg-flower"`.
export const EMOTION_GARDEN_WIDGETS = {
  "eg-flower": FlowerLab,
  "eg-loop": IterationLoop,
  "eg-versions": VersionTimeline,
};
