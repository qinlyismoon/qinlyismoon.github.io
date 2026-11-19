import { useAppSettings } from "../../../context/AppSettingsContext";
import CaseStudyVideo from "../CaseStudyVideo";

// One continuous handoff, both phones side by side: the side that is
// acting is lit, the other is dimmed. The live prototype is one click
// away for anyone who wants to try it themselves.
const PROTOTYPE_URL = "https://qinlyismoon.github.io/leaf-note/?user=maya&reset=1";

export default function HandoffFilm() {
  const { language } = useAppSettings();
  const isZh = language === "zh";
  return (
    <figure className="ln-film">
      <CaseStudyVideo
        className="ln-film__video"
        src="/work/leaf-note/handoff-loop.mp4"
        poster="/work/leaf-note/handoff-loop-poster.jpg"
        title={isZh ? "一次完整的交接：Maya 与 Jordan" : "One full handoff: Maya and Jordan"}
      />
      <figcaption className="ln-film__bar">
        <span>
          {isZh
            ? "亮着的一边是正在操作的人。"
            : "The lit side is the person acting."}
        </span>
        <a
          className="ln-film__try"
          href={PROTOTYPE_URL}
          target="_blank"
          rel="noreferrer"
        >
          {isZh ? "自己试一试原型" : "Try the prototype"}
          <span aria-hidden="true"> ↗</span>
        </a>
      </figcaption>
    </figure>
  );
}
