import { useMemo } from "react";
import { useAppSettings } from "../context/AppSettingsContext";
import { getTeachingCopy } from "../lib/teachingContent";
import {
  CourseEntry,
  PrincipleList,
  SectionHeader,
  TeachingThread,
} from "../components/teaching/TeachingParts";

/**
 * Teaching (v2.2.0) — a personal teaching portfolio in three sections:
 * Introduction → Teaching Philosophy → Teaching Experience. Each course
 * carries its own evidence (sessions, projects, prototypes), so practice
 * is never separated from the course it came from. Copy lives in
 * `src/lib/teachingContent.js` (EN + ZH); this page only arranges it.
 */
export default function TeachingPage() {
  const { language } = useAppSettings();
  const copy = useMemo(() => getTeachingCopy(language), [language]);
  const { sections, introduction, philosophy, experience } = copy;

  return (
    <article className="teaching-page" aria-labelledby="teaching-title">
      <section
        id="teaching-introduction"
        className="teaching-section teaching-section--intro"
      >
        <SectionHeader
          section={sections.introduction}
          title={introduction.title}
          as="h1"
          id="teaching-title"
        />
        <div className="teaching-prose">
          {introduction.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <TeachingThread note={introduction.threadNote} />

      <section
        id="teaching-philosophy"
        className="teaching-section"
        aria-labelledby="teaching-philosophy-title"
      >
        <SectionHeader
          section={sections.philosophy}
          title={philosophy.title}
          note={philosophy.subtitle}
          id="teaching-philosophy-title"
        />
        <div className="teaching-prose">
          {philosophy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <PrincipleList principles={philosophy.principles} />
      </section>

      <section
        id="teaching-experience"
        className="teaching-section"
        aria-labelledby="teaching-experience-title"
      >
        <SectionHeader
          section={sections.experience}
          title={experience.title}
          note={experience.note}
          id="teaching-experience-title"
        />
        <div className="teaching-courses">
          {experience.courses.map((course) => (
            <CourseEntry
              key={course.id}
              course={course}
              labels={experience.labels}
            />
          ))}
        </div>
      </section>

    </article>
  );
}
