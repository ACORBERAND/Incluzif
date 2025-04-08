// Depedencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components or views
import Index from "./views/Index.jsx";
import Playing from "./views/Playing.jsx";

// CSS
import "./App.css";

function App() {
  const [scoreInfos, setScoreInfos] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index setScoreInfos={setScoreInfos} />} />
        <Route path="/playing" element={<Playing scoreInfos={scoreInfos} />} />
      </Routes>
    </Router>
  );
}

export default App;
