import HoverLift from "../HoverLift";

function ArchiveLabel({ label, offset }) {
  if (!label || !offset) return null;
  const lines = label.split("\n");
  return (
    <text className="desk-scene__label" x={offset.x} y={offset.y}>
      {lines.map((line, index) => (
        <tspan key={line} x={offset.x} dy={index === 0 ? 0 : "1.25em"}>{line}</tspan>
      ))}
    </text>
  );
}

export default function ArchiveObject({ c, isHovered, variant, label, labelOffset }) {
  const isBoard = variant === "board";
  if (!isBoard) {
    return (
      <g className="desk-object desk-object--archive desk-object--timeline" data-hovered={isHovered || undefined}>
        <HoverLift id="timeline" active={isHovered}>
          <g className="desk-object__shape">
            <rect x="3" y="3" width="41" height="49" rx="5" fill={c.shadow} opacity="0.28" />
            <rect width="44" height="52" rx="6" fill={c.cream} />
            <circle cx="22" cy="5" r="3.2" fill={c.coral} opacity="0.65" />
            <path d="M8 35c7-15 13 5 20-10s10-3 11-7" fill="none" stroke={c.inkSoft} strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="8" cy="35" r="2.4" fill={c.coral} />
            <circle cx="22" cy="29" r="2.4" fill={c.teal} />
            <circle cx="38" cy="18" r="2.4" fill={c.plant} />
            <rect x="8" y="43" width="27" height="1.6" rx="0.8" fill={c.inkSoft} opacity="0.18" />
          </g>
        </HoverLift>
        <ArchiveLabel label={label} offset={labelOffset} />
      </g>
    );
  }
  return (
    <g className={`desk-object desk-object--archive desk-object--${variant}`} data-hovered={isHovered || undefined}>
      <HoverLift id={variant} active={isHovered}>
        <g className="desk-object__shape">
          <rect x="2" y="3" width="166" height="101" rx="7" fill={c.shadow} opacity="0.55" />
          <rect x="0" y="0" width="166" height="101" rx="7" fill={isBoard ? c.woodDark : c.cream} />
          <rect x="7" y="7" width="152" height="87" rx="3" fill={isBoard ? c.woodLight : c.white} />
          {isBoard ? (
            <g>
              <rect x="18" y="18" width="48" height="33" rx="2" fill={c.white} transform="rotate(-4 42 34)" />
              <rect x="76" y="15" width="31" height="39" rx="2" fill={c.yellow} transform="rotate(3 91 34)" />
              <rect x="116" y="21" width="28" height="26" rx="2" fill={c.coralLight} transform="rotate(-3 130 34)" />
              <rect x="28" y="63" width="38" height="20" rx="2" fill={c.tealLight} />
              <path d="M78 78c13-20 27-22 43-6 8 8 15 6 25-2" fill="none" stroke={c.inkSoft} strokeWidth="2" strokeLinecap="round" />
              <circle cx="42" cy="17" r="3" fill={c.coral} /><circle cx="91" cy="15" r="3" fill={c.teal} />
            </g>
          ) : (
            <g fill="none" stroke={c.inkSoft} strokeLinecap="round">
              <path d="M20 70C45 28 78 78 104 39s36-15 43-5" strokeWidth="2.5" />
              {[24,61,101,143].map((x, i) => <circle key={x} cx={x} cy={[64,50,43,31][i]} r="5" fill={[c.coral,c.teal,c.yellow,c.plant][i]} stroke="none" />)}
              <path d="M20 82h126" strokeWidth="1.5" opacity="0.35" />
            </g>
          )}
        </g>
      </HoverLift>
      <ArchiveLabel label={label} offset={labelOffset} />
    </g>
  );
}
