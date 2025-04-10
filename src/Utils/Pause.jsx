export default function Pause(scrollInterval, setScrollInterval, setIsPlaying) {
  setIsPlaying(false);
  if (scrollInterval) {
    clearInterval(scrollInterval);
    setScrollInterval(null);
  }
}
