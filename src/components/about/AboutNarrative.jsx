import DesignPrinciplesLoop from "./DesignPrinciplesLoop";
import headshot from "../../assets/about/professional-headshot.jpg";

/**
 * About — one continuous essay on how I think.
 *
 * Observation → reflection → why → design thinking → working approach →
 * diagram → reflection on the diagram → closing. No section headlines:
 * each paragraph leads into the next, the portrait is a pause after the
 * "why", and the process diagram sits inside the argument as a visual
 * summary of the paragraphs before it, followed by a short reflection on
 * what it means. All paragraphs use the shared reading-body voice.
 */
export default function AboutNarrative({ copy }) {
  const essay = copy.essay;
  return (
    <article className="log-narrative log-essay" aria-label="About Phoebe">
      {essay.opening.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <figure className="log-headshot">
        <img src={headshot} alt={copy.headshotAlt} />
      </figure>

      {essay.thinking.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <figure className="log-essay__diagram" aria-label={copy.processSteps.join(" → ")}>
        <DesignPrinciplesLoop principles={copy.processSteps} />
      </figure>

      {essay.afterDiagram.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}

      <p className="log-essay__closing">{essay.closing}</p>
    </article>
  );
}
