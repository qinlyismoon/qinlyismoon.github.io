import portraitAvatar from "../../assets/about/portrait.jpg";

const DEFAULT_AVATAR = portraitAvatar;

export default function JourneyReflection({
  text,
  avatar = DEFAULT_AVATAR,
  className = "",
}) {
  if (!text) return null;

  const lines = String(text)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <figure
      className={["journey-reflection", className].filter(Boolean).join(" ")}
    >
      <span className="journey-reflection__rule" aria-hidden="true" />
      <div className="journey-reflection__body">
        <img
          className="journey-reflection__avatar"
          src={avatar}
          alt=""
          width={48}
          height={48}
          loading="lazy"
          decoding="async"
        />
        <blockquote className="journey-reflection__quote">
          {lines.map((line, index) => (
            <span key={`${line}-${index}`} className="journey-reflection__line">
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </blockquote>
      </div>
    </figure>
  );
}
