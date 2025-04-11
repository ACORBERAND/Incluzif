import { useState } from "react";
import Player from "../components/Player/Player.jsx";
import Play from "../Utils/Play.jsx";
import Pause from "../Utils/Pause.jsx";
import { Link } from "react-router-dom";

export default function Playing() {
  const config = JSON.parse(localStorage.getItem("scoreInfos"));

  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(80);
  const [scrollInterval, setScrollInterval] = useState(null);
  return (
    <>
      <section className="container score-container">
        <div className="gc-full head-content">
          <h1 className="tac">Ma partition</h1>
          <div className="info">
            <p>{config?.author}</p>
            <h2 className="tac">{config?.name}</h2>
          </div>
        </div>
        <Player />

        <div className="gc-full bottom-content">
          <Link to="/" className="return">
            Retour
          </Link>
          <div className="tools-container">
          <button className="secondary-button">Modifier le BPM</button>
            <button
              className="primary-button"
              onClick={() => {
                if (!isPlaying) {
                  Play(tempo, scrollInterval, setScrollInterval, setIsPlaying);
                } else {
                  Pause(scrollInterval, setScrollInterval, setIsPlaying);
                }
              }}
            >
              {isPlaying ? "Pause" : "Jouer la partition"}
            </button>
            <button className="secondary-button">Télécharger</button>
          </div>
        </div>
      </section>
    </>
  );
}
