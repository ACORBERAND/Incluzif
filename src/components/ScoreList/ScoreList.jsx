import { Link } from "react-router-dom";
import { scores } from "./scores";
import "./scoreList.css";

export default function ScoreList() {
  return (
    <>
      <section className="container card-container">
        <h2 className="gc-full p-b-16">Bibliothèque</h2>
        {scores.map((config, index) => (
          <Link
            key={index}
            to="/playing"
            className="gc-full"
            onClick={() => {
              localStorage.setItem("scoreInfos", JSON.stringify(config));
            }}
          >
            <article className={`card bgc-card `}>
              <div className={`play-tag  ${config.styleClass}`}>
                <img
                  width={100}
                  height={100}
                  src="images/score_example.png"
                  alt="Illustration de partition coloré"
                />
              </div>
              <div className="score-info">
                <h2 className="p-b-8 gc-full regular">{config.name}</h2>
                <p className="p-b-16 gc-full">{config.author}</p>
                <p className={`tag m-b-16 gc-full`}>{config.style}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </>
  );
}
