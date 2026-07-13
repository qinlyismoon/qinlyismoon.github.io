import { ABOUT_IMAGES, pickLang } from "../../lib/aboutContent";
import DesignPrinciplesLoop from "./DesignPrinciplesLoop";

const PORTRAIT = {
  src: "portrait",
  alt: { en: "Personal portrait of Phoebe", zh: "珑月的个人肖像" },
  rotation: -1.5,
};

const COLLAGE_NOTES = [
  {
    key: "ideas",
    className: "about-collage__note-ideas about-sticky--yellow about-sticky--secondary",
    rotate: -4.2,
    attach: "pin",
    attachClass: "about-sticky__attach--ideas",
  },
  {
    key: "curious",
    className: "about-collage__note-curious about-sticky--sage about-sticky--supporting",
    rotate: 3.8,
    attach: "tape",
    attachClass: "about-sticky__attach--curious",
  },
  {
    key: "askingWhy",
    className: "about-collage__note-asking about-sticky--yellow about-sticky--supporting",
    rotate: -3.4,
    attach: "pin",
    attachClass: "about-sticky__attach--asking",
  },
  {
    key: "systems",
    className:
      "about-collage__note-systems about-sticky--sage about-sticky--supporting about-sticky--front",
    rotate: 2.2,
    attach: "tape",
    attachClass: "about-sticky__attach--systems",
  },
  {
    key: "making",
    className:
      "about-collage__note-making about-sticky--yellow about-sticky--supporting about-sticky--front",
    rotate: -4.6,
  },
  {
    key: "observe",
    className:
      "about-collage__note-observe about-sticky--blue about-sticky--supporting about-sticky--front",
    rotate: 3.1,
  },
];

function StickyNote({
  children,
  className = "",
  rotate = 0,
  attach,
  attachClass = "",
}) {
  return (
    <div
      className={`about-sticky ${className}`.trim()}
      style={{ "--about-rotate": `${rotate}deg` }}
    >
      {attach === "pin" ? (
        <span
          className={`about-sticky__pin ${attachClass}`.trim()}
          aria-hidden="true"
        />
      ) : null}
      {attach === "tape" ? (
        <span
          className={`about-sticky__tape ${attachClass}`.trim()}
          aria-hidden="true"
        />
      ) : null}
      {children}
    </div>
  );
}

export default function AboutHeroCollage({ copy, language = "en" }) {
  const portraitAlt = pickLang(PORTRAIT.alt, language);
  const notes = copy.notes;

  return (
    <section className="about-hero" aria-label="Personal collage">
      <div className="about-hero__text">
        <p className="about-hero__greeting">{copy.greeting}</p>
        <p className="about-hero__lines">
          <span>{copy.line1}</span>
          <span>{copy.line2}</span>
        </p>
        <p className="about-hero__bio">{copy.bio}</p>
        <DesignPrinciplesLoop principles={copy.principles} />
      </div>

      <div className="about-collage about-collage--scene">
        <div className="about-collage__board">
          {/* Landscape base — clipped to the board */}
          <div className="about-collage__landscape" aria-hidden="true">
            <div className="about-collage__prop about-collage__mountain">
              <img src={ABOUT_IMAGES.mountain} alt="" draggable={false} />
            </div>
          </div>

          {/* Atmosphere — in front of mountains, can overflow the frame */}
          <div className="about-collage__atmosphere" aria-hidden="true">
            <div
              className="about-collage__prop about-collage__fireworks"
              style={{ "--about-rotate": "-6deg" }}
            >
              <img src={ABOUT_IMAGES.fireworks} alt="" draggable={false} />
            </div>
          </div>

          <div className="about-collage__background">
            {/* Supporting scrapbook objects */}
            <div
              className="about-collage__prop about-collage__ticket"
              style={{ "--about-rotate": "-10deg" }}
            >
              <img
                src={ABOUT_IMAGES.ticket}
                alt={pickLang(
                  { en: "Travel ticket scrap", zh: "旅行票根" },
                  language,
                )}
                draggable={false}
              />
            </div>

            <div
              className="about-collage__prop about-collage__film"
              style={{ "--about-rotate": "9deg" }}
              aria-hidden="true"
            >
              <img src={ABOUT_IMAGES.film} alt="" draggable={false} />
            </div>

            <div
              className="about-collage__prop about-collage__bar"
              style={{ "--about-rotate": "20deg" }}
              aria-hidden="true"
            >
              <img src={ABOUT_IMAGES.bar} alt="" draggable={false} />
            </div>

            {/* Portrait — primary focus */}
            <div
              className="about-portrait about-collage__item about-collage__lift about-collage__portrait"
              style={{ "--about-rotate": `${PORTRAIT.rotation}deg` }}
            >
              <img src={ABOUT_IMAGES.portrait} alt={portraitAlt} />
            </div>

            {/* Personality notes */}
            {COLLAGE_NOTES.map((note) => (
              <StickyNote
                key={note.key}
                className={`about-collage__note ${note.className}`}
                rotate={note.rotate}
                attach={note.attach}
                attachClass={note.attachClass}
              >
                {notes[note.key]}
              </StickyNote>
            ))}
          </div>

          {/* Overflowing foreground props */}
          <div className="about-collage__foreground" aria-hidden="true">
            <div
              className="about-collage__prop about-collage__snowboard"
              style={{ "--about-rotate": "32deg" }}
            >
              <img src={ABOUT_IMAGES.snowboard} alt="" draggable={false} />
            </div>
          </div>

          {/* Keep key notes above the overflowing snowboard */}
          <div className="about-collage__overlay">
            <StickyNote
              className="about-collage__note about-collage__note-exploring about-sticky--blue about-sticky--secondary"
              rotate={3.6}
              attach="tape"
              attachClass="about-sticky__attach--exploring"
            >
              {copy.exploring}
            </StickyNote>
          </div>
        </div>
      </div>
    </section>
  );
}
