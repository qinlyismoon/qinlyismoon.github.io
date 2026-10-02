/**
 * SpeakerObject — the hanging speaker, with music-note particles while playing.
 */
import { useRef } from "react";
import { motion } from "framer-motion";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

function SoftContactShadow({ cx, cy, rx, ry = 2.8, color }) {
  return (
    <g className="soft-contact-shadow" aria-hidden="true">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity="0.28" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.72} fill={color} opacity="0.22" />
    </g>
  );
}

function MusicNotes({ c }) {
  const noteColor = c.ink ?? "#4A4038";

  const note = (scale = 1) => (
    <g transform={`scale(${scale})`} opacity="0.9">
      <path
        d="M6 2 C6 1 6.7 0.4 7.6 0.6 L13.2 1.8 C14.1 2 14.6 2.7 14.4 3.6 L13.6 7.6 C13.4 8.6 12.5 9.3 11.5 9.2 L8.7 8.8 L8.7 14.5 C8.7 16.5 6.9 18 4.7 18 C2.8 18 1.3 16.9 1.1 15.3 C0.8 13.4 2.4 11.8 4.7 11.8 C5.6 11.8 6.4 12.1 7 12.5 L7 2 Z"
        fill={noteColor}
      />
    </g>
  );

  const configs = [
    { x: 30, y: 0, driftX: [-3, 8, 20], driftY: [6, -18, -48], delay: 0, scale: 0.9 },
    { x: 50, y: 8, driftX: [3, -10, -22], driftY: [8, -22, -52], delay: 1.1, scale: 0.84 },
  ];

  return (
    <g className="speaker-music-notes" pointerEvents="none">
      {configs.map((cfg, index) => (
        <motion.g
          key={index}
          initial={{ opacity: 0, y: cfg.driftY[0], x: cfg.driftX[0] }}
          animate={{
            opacity: [0, 0.5, 0],
            y: cfg.driftY,
            x: cfg.driftX,
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: cfg.delay,
            ease: "easeOut",
          }}
        >
          <g transform={`translate(${cfg.x}, ${cfg.y})`}>{note(cfg.scale)}</g>
        </motion.g>
      ))}
    </g>
  );
}

function SpeakerShape({ c, isLampOn, isMusicPlaying = false }) {
  const shadowColor = isLampOn ? c.shadow : c.softShadow;
  const body = c.speakerBody ?? c.gray;
  const face = c.speakerFace ?? c.grayLight;
  const cone = c.speakerCone ?? c.inkSoft;

  return (
    <g>
      <SoftContactShadow cx={30} cy={85} rx={24} ry={2.4} color={shadowColor} />
      <rect x="0" y="0" width="56" height="84" rx="9" fill={body} />
      <rect x="4" y="4" width="48" height="76" rx="7" fill={face} opacity={0.55} />
      <circle cx="28" cy="26" r="11" fill={cone} opacity="0.58" />
      <circle cx="28" cy="26" r="4.5" fill={cone} opacity="0.72" />
      <circle cx="28" cy="58" r="15" fill={cone} opacity="0.58" />
      <circle cx="28" cy="58" r="6" fill={cone} opacity="0.74" />
      <circle cx="28" cy="78" r="2" fill={c.plant} opacity="0.7" />
      {isMusicPlaying && <MusicNotes c={c} />}
    </g>
  );
}

export default function SpeakerObject({
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
      className="desk-object desk-object--speaker"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="speaker" active={isHovered}>
        <g className="desk-object__shape">
          <SpeakerShape
            c={c}
            isLampOn={isLampOn}
            isMusicPlaying={interaction.isMusicPlaying}
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
