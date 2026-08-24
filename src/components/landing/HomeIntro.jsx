import AboutChineseName from "../about/AboutChineseName";

export default function HomeIntro({ copy }) {
  return (
    <div className="home-intro">
      <h1 className="home-intro__greeting">{copy.greeting}</h1>
      <AboutChineseName
        akaLabel={copy.akaLabel}
        chineseName={copy.chineseName}
        cardAriaLabel={copy.nameCardAria}
      />
      <p className="home-intro__exploring">{copy.exploring}</p>
      <div className="home-intro__columns">
        <section className="home-intro__col" aria-labelledby="home-what-i-do">
          <h2 id="home-what-i-do" className="home-intro__label">
            {copy.whatIDoLabel}
          </h2>
          <p className="home-intro__bio">{copy.bio}</p>
        </section>
        <section className="home-intro__col" aria-labelledby="home-who-i-am">
          <h2 id="home-who-i-am" className="home-intro__label">
            {copy.whoIAmLabel}
          </h2>
          <p className="home-intro__personality">{copy.personality}</p>
        </section>
      </div>
    </div>
  );
}
