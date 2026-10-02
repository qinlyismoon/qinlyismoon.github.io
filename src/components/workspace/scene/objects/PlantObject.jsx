/**
 * PlantObject — the trailing plant on the shelf, with watering growth.
 */
import { useRef } from "react";
import { PlantShape } from "../../PlantShape";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

export default function PlantObject({
  c,
  isLampOn,
  isHovered,
  interaction,
  label,
  labelOffset,
  tooltip,
  tooltipOffset,
  tooltipAlign,
}) {
  const objectRef = useRef(null);
  return (
    <g
      ref={objectRef}
      className="desk-object desk-object--plant"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="plant" active={isHovered}>
        <g className="desk-object__shape">
          <PlantShape
            c={c}
            isHovered={isHovered}
            isLampOn={isLampOn}
            compact={interaction.compactScene}
            isWatering={interaction.plantWatering}
            waterToken={interaction.plantWaterToken}
            isSwaying={interaction.plantSwaying}
            swayToken={interaction.plantSwayToken}
            growthStage={interaction.plantGrowthStage}
          />
        </g>
      </HoverLift>
      {label && labelOffset && (
        <text className="desk-scene__label" x={labelOffset.x} y={labelOffset.y}>
          {label}
        </text>
      )}
      <ObjectTooltipHost
        objectRef={objectRef}
        offset={tooltipOffset}
        align={tooltipAlign}
        visible={isHovered}
      >
        {tooltip}
      </ObjectTooltipHost>
    </g>
  );
}
