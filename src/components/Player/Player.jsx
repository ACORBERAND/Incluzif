import { useEffect, useRef } from "react";
import InitScore from "../../Utils/InitScore";
import "./score.css";
import startProgressBar from "../../Utils/startProgressBar";

export default function Player() {
  const container = useRef(null);
  const config = JSON.parse(localStorage.getItem("scoreInfos"));

  useEffect(() => {
    if (!container.current) return;
    InitScore(config, container);
    container.current.addEventListener("scroll",(e) => {
      startProgressBar()
    });
  }, []);

  return (
    <>
      <section className="player gc-full">
        <div id="notation" className="panel-body">
          <div ref={container} id="panel" className="panel" />
        </div>
        <div className="progress-bar-container">
          <div id="progressBar" className="progress-bar"></div>
        </div>
      </section>
    </>
  );
}
