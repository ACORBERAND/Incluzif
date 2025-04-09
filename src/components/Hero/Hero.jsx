import "./hero.css";
export default function Hero() {
  return (
    <>
      <section className="hero container">
        <h1 className="gc-full logo">
          INCLU'ZIK
          <div className="img-container logo-img">
            <img
              src="/images/music_note_hero.png"
              alt="Icône de note de musique"
              width={66}
              height={66}
            />
          </div>
        </h1>
        <div className="gc-full">
          <p className="presentation">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus officia labore iure iste fugiat? Excepturi, quam!
            Eligendi, ea quos. Libero corrupti deleniti vitae distinctio
            exercitationem provident dolorum illum, harum sunt!
          </p>
        </div>
      </section>
    </>
  );
}
