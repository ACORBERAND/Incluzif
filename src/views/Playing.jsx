import Player from "../components/Player/Player.jsx";

export default function Playing() {
  const config = JSON.parse(localStorage.getItem("scoreInfos"));
  return (
    <>
      <section className="container score-container">
        <div className="gc-full">
          <h1 className="tac">{config?.name}</h1>
          <p className="">{config?.author}</p>
        </div>
        <Player />
        <div className="gc-full">
          <button className="primary-button">Jouer la partition</button>
        </div>
      </section>
    </>
  );
}
