// Shared case-study detail video: plays when it scrolls into view and
// pauses when it leaves — one behavior for every clip on a detail page
// (Swim loops, Leaf Note demos, Oscar prototype, hero covers).
import { useRef } from "react";
import useInViewPlayback from "../../hooks/useInViewPlayback";

export default function CaseStudyVideo({
  src,
  className,
  title,
  poster,
  controls = true,
  loop = true,
  preload = "metadata",
  // Scored clips (e.g. Nutcracker under the Oscar prototype) try to
  // play with sound; browsers that block it fall back to muted.
  withSound = false,
}) {
  const ref = useRef(null);
  useInViewPlayback(ref, { withSound });

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      poster={poster}
      title={title}
      muted={!withSound}
      loop={loop}
      playsInline
      controls={controls}
      preload={preload}
    />
  );
}
