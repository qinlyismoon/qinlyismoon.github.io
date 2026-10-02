/**
 * BooksObject — the thesis stack on the desk.
 *
 * Visible layer only: shape + hover lift + label. Hit-testing lives in
 * the Interaction layer.
 */
import { useRef } from "react";
import { BOOKS_MAX_H } from "../../../../lib/deskLayout";
import HoverLift from "../HoverLift";
import { ObjectTooltipHost } from "../ObjectTooltip";

const BOOKS_CONTACT_Y = BOOKS_MAX_H;

const BOOK_SPECS = [
  { x: 0, y: 28, w: 15, h: 50, fill: "coralDeep", spine: "coralLight", accent: "coral" },
  { x: 12, y: 20, w: 18, h: 58, fill: "tealDeep", spine: "tealLight", accent: "teal" },
  { x: 27, y: 12, w: 17, h: 66, fill: "teal", spine: "tealLight", accent: "white" },
  { x: 40, y: 22, w: 20, h: 56, fill: "coral", spine: "coralLight", accent: "cream" },
  { x: 55, y: 8, w: 17, h: 70, fill: "cream", spine: "white", accent: "coral" },
  { x: 67, y: 18, w: 16, h: 60, fill: "tealDeep", spine: "tealLight", accent: "teal" },
];

function SoftContactShadow({ cx, cy, rx, ry = 2.8, color }) {
  return (
    <g className="soft-contact-shadow" aria-hidden="true">
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={color} opacity="0.28" />
      <ellipse cx={cx} cy={cy} rx={rx * 0.72} ry={ry * 0.72} fill={color} opacity="0.22" />
    </g>
  );
}

function BooksRowShadow({ shelfY, color }) {
  const left = BOOK_SPECS[0].x;
  const right = BOOK_SPECS[BOOK_SPECS.length - 1].x + BOOK_SPECS[BOOK_SPECS.length - 1].w;
  const width = right - left;
  const cx = (left + right) / 2;
  const cy = shelfY + 2.5;

  return <SoftContactShadow cx={cx} cy={cy} rx={width / 2 + 5} ry={3.6} color={color} />;
}

function BookVolume({ book, c }) {
  return (
    <g>
      <rect x={book.x} y={book.y} width={book.w} height={book.h} rx="2.5" fill={c[book.fill]} />
      <rect
        x={book.x + 2}
        y={book.y + 3}
        width="3"
        height={book.h - 6}
        rx="1"
        fill={c[book.spine]}
        opacity="0.55"
      />
      <rect
        x={book.x + 5}
        y={book.y + 10}
        width={Math.max(book.w - 8, 6)}
        height="2"
        rx="1"
        fill={c[book.accent]}
        opacity="0.35"
      />
      {book.fill === "cream" && (
        <rect
          x={book.x + 5}
          y={book.y + 20}
          width={Math.max(book.w - 8, 6)}
          height="1.5"
          rx="0.75"
          fill={c.inkSoft}
          opacity="0.22"
        />
      )}
    </g>
  );
}

function BooksShape({ c, isLampOn }) {
  const shadowColor = isLampOn ? c.shadow : c.softShadow;

  return (
    <g>
      <BooksRowShadow shelfY={BOOKS_CONTACT_Y} color={shadowColor} />
      {BOOK_SPECS.map((book, index) => (
        <BookVolume key={index} book={book} c={c} />
      ))}
    </g>
  );
}

export default function BooksObject({
  c,
  isLampOn,
  isHovered,
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
      className="desk-object desk-object--books"
      data-hovered={isHovered || undefined}
    >
      <HoverLift id="books" active={isHovered}>
        <g className="desk-object__shape">
          <BooksShape c={c} isLampOn={isLampOn} />
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
