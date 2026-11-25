import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Attack_detector from "./Pages/Attack_detector";
import Navbar from "./Componets/Navbar";
import Footer from "./Componets/Footer";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detect" element={<Attack_detector />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
