/**
 * A quiet editorial quote for journey stages.
 *
 * One voice for every quote — stage highlights and the transition
 * prompt alike: the serif reading face with a single accent rule (the
 * `.journey-reflection` rules in journey-version-tags.css). A
 * margin-note card variant was tried and reverted 2026-10-01.
 */
export default function JourneyReflection({ text, className = "" }) {
  if (!text) return null;

  const lines = String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <figure
      className={["journey-reflection", className].filter(Boolean).join(" ")}
    >
      <blockquote className="journey-reflection__quote">
        {lines.map((line, index) => (
          <span key={`${line}-${index}`} className="journey-reflection__line">
            {line}
            {index < lines.length - 1 ? <br /> : null}
          </span>
        ))}
      </blockquote>
    </figure>
  );
}
