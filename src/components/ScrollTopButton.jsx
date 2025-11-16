import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "22px",
        right: "22px",
        zIndex: 9999,
        cursor: "pointer",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        background: "#C4832B", // image color
        // boxShadow:
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        transition: "all 0.35s ease",
        transform: isVisible ? "scale(1)" : "scale(0)",
        opacity: isVisible ? 1 : 0,

        // Smooth floating animation
        animation: isVisible ? "floatUpDown 2s ease-in-out infinite" : "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.15)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.3), 0 0 18px rgba(196,131,43,0.9)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.25), 0 0 12px rgba(196,131,43,0.65)";
      }}
    >
      <KeyboardArrowUpIcon style={{ fontSize: "32px" }} />

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes floatUpDown {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default ScrollTopButton;
