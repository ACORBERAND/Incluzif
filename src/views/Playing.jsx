import Player from "../components/Player/Player.jsx";

export default function Playing() {
  const config = JSON.parse(localStorage.getItem("scoreInfos"));
  return (
    <>
      <section className="container score-container">
        <h1 className="gc-full tac">{config?.name}</h1>
        <p className="gc-full ">{config?.author}</p>
        <Player />
      </section>
    </>
  );
}
