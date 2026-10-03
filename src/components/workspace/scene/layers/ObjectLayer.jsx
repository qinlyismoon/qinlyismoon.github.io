/**
 * ObjectLayer — every interactive thing that sits in the room, each its
 * own component. The desk, shelf and wall stay untouched when an object
 * is added, removed or redesigned.
 */
import { SCENE_CONTENT_SHIFT_X } from "../../../../lib/deskLayout";
import { WORKSPACE_OBJECTS } from "../../../../lib/workspaceObjects";
import { resolveObjectChrome } from "../objectChrome";
import BooksObject from "../objects/BooksObject";
import SpeakerObject from "../objects/SpeakerObject";
import CameraObject from "../objects/CameraObject";
import LampObject from "../objects/LampObject";
import MonitorObject from "../objects/MonitorObject";
import DrinkObject from "../objects/DrinkObject";
import ArchiveObject from "../objects/ArchiveObject";

const OBJECT_COMPONENTS = {
  books: BooksObject,
  speaker: SpeakerObject,
  camera: CameraObject,
  lamp: LampObject,
  monitor: MonitorObject,
  mug: DrinkObject,
  board: (props) => <ArchiveObject {...props} variant="board" />,
  timeline: (props) => <ArchiveObject {...props} variant="timeline" />,
};

export default function ObjectLayer({ c, isLampOn, interaction, chromeProps }) {
  const renderObject = (object) => {
    const Shape = OBJECT_COMPONENTS[object.id];
    if (!Shape) return null;
    return (
      <g key={object.id} transform={object.transform}>
        <Shape
          c={c}
          isLampOn={isLampOn}
          isHovered={interaction.hoveredId === object.id}
          interaction={interaction}
          {...resolveObjectChrome(object, chromeProps)}
        />
      </g>
    );
  };

  // Speaker and camera hang on the wire grid in WallLayer, which is not
  // shifted. They must skip SCENE_CONTENT_SHIFT_X to stay aligned to the grid.
  const WALL_MOUNTED_IDS = new Set(["speaker", "camera", "board", "timeline"]);
  const wallObjects = WORKSPACE_OBJECTS.filter(
    (object) => object.layer === "objects" && WALL_MOUNTED_IDS.has(object.id),
  );
  const deskObjects = WORKSPACE_OBJECTS.filter(
    (object) => object.layer === "objects" && !WALL_MOUNTED_IDS.has(object.id),
  );

  return (
    <g className="desk-scene__layer desk-scene__layer--objects">
      {wallObjects.map(renderObject)}
      <g transform={`translate(${SCENE_CONTENT_SHIFT_X}, 0)`}>
        {deskObjects.map(renderObject)}
      </g>
    </g>
  );
}
