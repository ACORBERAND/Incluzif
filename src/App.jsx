// Depedencies
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components or views
import Index from "./views/Index.jsx";
import Playing from "./views/Playing.jsx";

// CSS
import "./App.css";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/playing" element={<Playing />} />
      </Routes>
    </Router>
  );
}

export default App;
