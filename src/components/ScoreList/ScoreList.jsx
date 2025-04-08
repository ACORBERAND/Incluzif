import { Link } from "react-router-dom";
import { scores } from "./scores";
import "./scoreList.css";

export default function ScoreList({ setScoreInfos }) {
  return (
    <>
      <section className="container card-container">
        <h2 className="gc-full p-b-16">Bibliothèque</h2>
        {scores.map((config, index) => (
          <article
            key={index}
            className={`card bgc-card gc-full  ${
              index % 2 === 0 ? "gc-md-1-7" : "gc-md-7-13"
            }`}
          >
            <div className={`play-tag  ${config.styleClass}`}>
              <img
                width={80}
                height={80}
                src="/images/play_button_white.png"
                alt="play button"
              />
            </div>
            <div className="score-info">
              <h3 className="p-b-4 gc-full">{config.name}</h3>
              <p className="p-b-8 gc-full">{config.author}</p>
              <p className={`tag m-b-16 gc-full ${config.styleClass}`}>
                {config.style}
              </p>
              <div className="button-container gc-full">
                <Link
                  to="/playing"
                  className="primary-button"
                  onClick={() => {
                    localStorage.setItem("scoreInfos", JSON.stringify(config));
                  }}
                >
                  Jouer
                </Link>
                <a href="#" className="primary-button">
                  Télécharger
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
