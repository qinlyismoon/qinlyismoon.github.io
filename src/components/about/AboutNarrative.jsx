import DesignPrinciplesLoop from "./DesignPrinciplesLoop";
import headshot from "../../assets/about/professional-headshot.jpg";

export default function AboutNarrative({ copy, language }) {
  return (
    <div className="log-narrative">
      <section className="log-intro" aria-label="About Phoebe">
        <p>{copy.bio}</p>
        <p>{copy.personality}</p>
      </section>
      <figure className="log-headshot"><img src={headshot} alt={copy.headshotAlt} /></figure>
      <section className="log-philosophy" aria-labelledby="log-philosophy-title">
        <h2 id="log-philosophy-title">{copy.philosophyTitle}</h2>
        <p>{copy.philosophyBody}</p>
      </section>
      <section className="log-process" aria-labelledby="log-process-title">
        <h2 id="log-process-title">{copy.processTitle}</h2>
        <p>{copy.processBody}</p>
        <DesignPrinciplesLoop principles={copy.processSteps} />
      </section>
    </div>
  );
}
