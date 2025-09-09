import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Myworks from "./pages/Myworks";
import Customize from "./pages/Customize";
import Classes from "./pages/Classes";    

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myworks" element={<Myworks />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/classes" element={<Classes />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
