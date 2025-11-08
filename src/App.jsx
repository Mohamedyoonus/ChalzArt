import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HeadProvider, Title, Meta, Link } from "react-head";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myworks from "./pages/Myworks";
import Customize from "./pages/Customize";
import Classes from "./pages/Classes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <HeadProvider>
      <Router>
        {/* Global site-wide meta tags */}
        <Title>Chalz Art | Custom Portraits, Shoe Paints & Live Sketches</Title>
        <Meta
          name="description"
          content="Chalz Art offers custom portraits, hand-painted shoes, and live sketch artworks. Explore unique art designs and book your custom creation today!"
        />
        <Meta
          name="keywords"
          content="chalz art, custom portrait, shoe paint, live sketch, t-shirt art, artist in Tamil Nadu"
        />
        <Link rel="canonical" href="https://www.chalzart.in" />

        <Navbar />

        <Routes>
          {/* 🏠 Home Page */}
          <Route
            path="/"
            element={
              <>
                <Title>Home | Chalz Art - Custom Portraits & Hand-Painted Shoes</Title>
                <Meta
                  name="description"
                  content="Discover Chalz Art's collection of custom portraits, hand-painted shoes, and T-shirt designs. Art made personal."
                />
                <Home />
              </>
            }
          />

          {/* 👩‍🎨 About Page */}
          <Route
            path="/about"
            element={
              <>
                <Title>About | Chalz Art - Artist Profile & Vision</Title>
                <Meta
                  name="description"
                  content="Learn about Chalz Art, the creative vision behind custom portraits, shoe paints, and live sketches in Tamil Nadu."
                />
                <About />
              </>
            }
          />

          {/* 🎨 My Works Page */}
          <Route
            path="/myworks"
            element={
              <>
                <Title>Gallery | Chalz Art - Shoe Paints & Portrait Collection</Title>
                <Meta
                  name="description"
                  content="Explore Chalz Art's portfolio of custom art — portraits, shoe paintings, T-shirt designs, and live sketches."
                />
                <Myworks />
              </>
            }
          />

          {/* ✍️ Customize Page */}
          <Route
            path="/customize"
            element={
              <>
                <Title>Customize | Chalz Art - Personalize Your Artwork</Title>
                <Meta
                  name="description"
                  content="Customize your artwork — portraits, shoes, or T-shirts — at Chalz Art. Choose your theme and design."
                />
                <Customize />
              </>
            }
          />

          {/* 🎓 Classes Page */}
          <Route
            path="/classes"
            element={
              <>
                <Title>Art Classes | Chalz Art - Learn and Create</Title>
                <Meta
                  name="description"
                  content="Join Chalz Art's art classes to learn portrait sketching, painting, and creative design techniques."
                />
                <Classes />
              </>
            }
          />

          {/* 📞 Contact Page */}
          <Route
            path="/contact"
            element={
              <>
                <Title>Contact | Chalz Art - Get in Touch</Title>
                <Meta
                  name="description"
                  content="Contact Chalz Art for booking custom art, inquiries, or collaborations. Reach out today!"
                />
                <Contact />
              </>
            }
          />
        </Routes>

        <Footer />
      </Router>
    </HeadProvider>
  );
}

export default App;
