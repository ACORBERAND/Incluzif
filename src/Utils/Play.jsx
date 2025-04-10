import startProgressBar from "./startProgressBar";
export default function Play(
  tempo,
  scrollInterval,
  setScrollInterval,
  setIsPlaying
) {
    setIsPlaying(true);
    const panel = document.getElementById("panel");

  const msPerBeat = 60000 / tempo; // Durée d'un beat en ms
  const scrollAmountPerBeat = 50; // Pixels à défiler par beat

  if (scrollInterval) clearInterval(scrollInterval);

  const interval = setInterval(() => {
    panel.scrollLeft += scrollAmountPerBeat / (msPerBeat / 30);
    startProgressBar(); // <-- Mettre à jour la barre en même temps que ça scroll
  }, 30);

  setScrollInterval(interval);
}
