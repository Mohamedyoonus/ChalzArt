import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HeadProvider, Title, Meta, Link } from "react-head";
import { useEffect } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myworks from "./pages/Myworks";
import Customize from "./pages/Customize";
import Classes from "./pages/Classes";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// 🧭 Scroll to top on route change (SEO + UX)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

// 🌐 Centralized SEO meta data for each route
const seoData = {
  "/": {
    title: "Home | Chalz Art - Custom Portraits & Hand-Painted Shoes",
    description:
      "Discover Chalz Art's creative world — custom portraits, hand-painted shoes, T-shirt designs, and live sketches. Art made personal.",
    keywords:
      "chalz art, custom portrait, hand painted shoes, t-shirt art, live sketch, artist in Tamil Nadu",
    canonical: "https://www.chalzart.in/",
  },
  "/about": {
    title: "About | Chalz Art - Artist Profile & Vision",
    description:
      "Learn about Chalz Art — the artist behind custom portraits, shoe paints, and live sketches, spreading creativity across Tamil Nadu.",
    keywords: "chalz art about, artist bio, creative journey, art portfolio, art vision",
    canonical: "https://www.chalzart.in/about",
  },
  "/myworks": {
    title: "Gallery | Chalz Art - Shoe Paints, Portraits & T-Shirt Designs",
    description:
      "Browse Chalz Art’s art gallery featuring shoe paintings, custom portraits, T-shirt art, and live sketches. Creativity in every stroke.",
    keywords:
      "chalz art gallery, art collection, shoe paint gallery, custom portrait samples, art showcase",
    canonical: "https://www.chalzart.in/myworks",
  },
  "/customize": {
    title: "Customize | Chalz Art - Personalize Your Artwork",
    description:
      "Customize your dream artwork — portraits, shoes, or T-shirts — with Chalz Art. Choose your style and theme for a one-of-a-kind creation.",
    keywords:
      "custom artwork, personalize art, shoe design, t-shirt painting, portrait customization",
    canonical: "https://www.chalzart.in/customize",
  },
  "/classes": {
    title: "Art Classes | Chalz Art - Learn to Create",
    description:
      "Join Chalz Art’s art classes to master sketching, painting, and creative design. Learn with hands-on art sessions and mentorship.",
    keywords:
      "art classes, drawing lessons, painting workshops, art learning, sketching training",
    canonical: "https://www.chalzart.in/classes",
  },
  "/contact": {
    title: "Contact | Chalz Art - Get in Touch",
    description:
      "Get in touch with Chalz Art for custom artwork, commissions, or art classes. Let’s bring your creative ideas to life!",
    keywords:
      "contact chalz art, book custom portrait, commission art, art classes inquiry, artist contact",
    canonical: "https://www.chalzart.in/contact",
  },
};

// 🧠 Dynamic SEO component
const SEO = ({ path }) => {
  const data = seoData[path] || seoData["/"];
  return (
    <>
      <Title>{data.title}</Title>
      <Meta name="description" content={data.description} />
      <Meta name="keywords" content={data.keywords} />
      <Link rel="canonical" href={data.canonical} />
      <Meta property="og:title" content={data.title} />
      <Meta property="og:description" content={data.description} />
      <Meta property="og:url" content={data.canonical} />
      <Meta property="og:type" content="website" />
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={data.title} />
      <Meta name="twitter:description" content={data.description} />
    </>
  );
};

function App() {
  return (
    <HeadProvider>
      <Router>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<><SEO path="/" /><Home /></>} />
          <Route path="/about" element={<><SEO path="/about" /><About /></>} />
          <Route path="/myworks" element={<><SEO path="/myworks" /><Myworks /></>} />
          <Route path="/customize" element={<><SEO path="/customize" /><Customize /></>} />
          <Route path="/classes" element={<><SEO path="/classes" /><Classes /></>} />
          <Route path="/contact" element={<><SEO path="/contact" /><Contact /></>} />
        </Routes>

        <Footer />
      </Router>
    </HeadProvider>
  );
}

export default App;
