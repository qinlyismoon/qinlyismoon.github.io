/**
 * ShelfLayer — the shelf plank plus its two residents: plant and clock.
 *
 * Owns shelf-level animation concerns (plant sway, clock updates) without
 * touching the desk or the wall.
 */
import {
  SCENE_CONTENT_SHIFT_X,
  SHELF_LEFT_W,
  SHELF_LEFT_X,
  SHELF_LEFT_Y,
} from "../../../../lib/deskLayout";
import { WORKSPACE_OBJECTS } from "../../../../lib/workspaceObjects";
import { resolveObjectChrome } from "../objectChrome";
import PlantObject from "../objects/PlantObject";
import ClockObject from "../objects/ClockObject";

function ContactShadow({ cx, cy, rx = 18, ry = 3.5, color, opacity = 1 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity={opacity} />;
}

const plantConfig = WORKSPACE_OBJECTS.find((object) => object.id === "plant");
const clockConfig = WORKSPACE_OBJECTS.find((object) => object.id === "clock");

export default function ShelfLayer({ c, isLampOn, interaction, chromeProps }) {
  return (
    <g className="desk-scene__layer desk-scene__layer--shelf">
      <g transform={`translate(${SCENE_CONTENT_SHIFT_X}, 0)`}>
        <g transform={`translate(${SHELF_LEFT_X}, ${SHELF_LEFT_Y})`} aria-hidden="true">
          <ContactShadow
            cx={SHELF_LEFT_W / 2}
            cy={2}
            rx={SHELF_LEFT_W / 2 - 8}
            ry={4}
            color={c.softShadow}
          />
          <rect x="0" y="0" width={SHELF_LEFT_W} height="10" rx="3" fill={c.shelf} />
          <rect
            x="0"
            y="0"
            width={SHELF_LEFT_W}
            height="3"
            rx="2"
            fill={c.woodLight}
            opacity="0.45"
          />
        </g>

        <g transform={plantConfig.transform}>
          <PlantObject
            c={c}
            isLampOn={isLampOn}
            isHovered={interaction.hoveredId === "plant"}
            interaction={interaction}
            {...resolveObjectChrome(plantConfig, chromeProps)}
          />
        </g>
        <g transform={clockConfig.transform}>
          <ClockObject
            c={c}
            isLampOn={isLampOn}
            isHovered={interaction.hoveredId === "clock"}
            interaction={interaction}
            {...resolveObjectChrome(clockConfig, chromeProps)}
          />
        </g>
      </g>
    </g>
  );
}
