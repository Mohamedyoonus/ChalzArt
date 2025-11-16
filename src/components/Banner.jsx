import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import { useEffect, useRef } from "react";
import bannerImage from "../assets/banner.jpg";

// === Text Animations ===
const colorfulBounce = keyframes`
  0%,100% { transform: translateY(0); color: #FFD700; text-shadow: 0 0 10px #FFD700; }
  25% { transform: translateY(-10px); color: #FF69B4; text-shadow: 0 0 15px #FF69B4; }
  50% { transform: translateY(0); color: #87CEEB; text-shadow: 0 0 15px #87CEEB; }
  75% { transform: translateY(10px); color: #90EE90; text-shadow: 0 0 15px #90EE90; }
`;

const elegantPulse = keyframes`
  0% { opacity: 0; transform: translateY(20px) scale(0.95); text-shadow: none; }
  40% { opacity: 1; transform: translateY(0) scale(1.05); text-shadow: 0 0 8px #D4A373, 0 0 12px #ffdebd, 0 0 18px #fff5e1; }
  70% { transform: scale(0.98); text-shadow: 0 0 10px #D4A373, 0 0 14px #ffdebd, 0 0 20px #fff5e1; }
  100% { transform: scale(1); text-shadow: 0 0 6px #D4A373, 0 0 10px #ffdebd; opacity: 1; }
`;

const bounceShrink = keyframes`
  0%,100% { transform: scale(1); }
  50% { transform: scale(0.95); }
`;

// === Fire Spark Effect ===
const FireSparkEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let sparks = [];
    let animationFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createSpark = () => {
      const x = canvas.width / 2 + (Math.random() - 0.5) * 300;
      const y = canvas.height / 2 + (Math.random() - 0.3) * 80;
      const size = Math.random() * 2 + 1;
      const speedX = (Math.random() - 0.5) * 2;
      const speedY = Math.random() * -2 - 1;
      const life = Math.random() * 50 + 30;
      const hue = 30 + Math.random() * 20; // golden-orange range
      sparks.push({ x, y, size, speedX, speedY, life, hue });
    };

    const drawSparks = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparks.forEach((s, i) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 100%, 60%, ${s.life / 80})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsl(${s.hue}, 100%, 70%)`;
        ctx.fill();
        s.x += s.speedX;
        s.y += s.speedY;
        s.life -= 1;
        if (s.life <= 0) sparks.splice(i, 1);
      });
    };

    const animate = () => {
      if (Math.random() < 0.5) createSpark();
      drawSparks();
      animationFrame = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
};

// === Main Banner ===
const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(0,0,0,0.3))",
          zIndex: 1,
        },
      }}
    >
      <FireSparkEffect />

      <Box sx={{ position: "relative", zIndex: 3, px: 3, maxWidth: "900px" }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: { xs: 1, md: 4 },
            textTransform: "uppercase",
            fontFamily: "'Lora', serif",
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
          }}
        >
          {["C", "h", "a", "l", "z", "a", "r", "t"].map((char, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                display: "inline-block",
                animation: `${colorfulBounce} 2.5s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
              }}
            >
              {char}
            </Box>
          ))}
        </Typography>

        {/* Tagline */}
        <Typography
          variant="h4"
          sx={{
            mt: 2,
            fontWeight: 400,
            letterSpacing: 2,
            fontFamily: "'Lora', serif",
            color: "#fff",
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" },
            animation: `${elegantPulse} 3.5s ease-in-out forwards`,
          }}
        >
          Art Meets Heart
        </Typography>

        {/* Buttons */}
        <Box
          sx={{
            mt: 5,
            display: "flex",
            flexDirection: "row",
            gap: { xs: 1.5, sm: 3 },
            justifyContent: "center",
            flexWrap: { xs: "nowrap", sm: "wrap" },
            overflowX: { xs: "auto", sm: "visible" },
            px: { xs: 1, sm: 0 },
          }}
        >
          {[
            { label: "Discover More", to: "/myworks" },
            { label: "Customize Your Art", to: "/customize" },
          ].map(({ label, to }) => (
            <Button
              key={label}
              component={Link}
              to={to}
              variant="contained"
              sx={{
                backgroundColor: "#A8743D",
                color: "white",
                padding: { xs: "8px 16px", sm: "12px 32px" },
                fontWeight: "600",
                fontSize: { xs: "0.75rem", sm: "1rem" },
                borderRadius: "30px",
                boxShadow: "none",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease-in-out",
                minWidth: { xs: "140px", sm: "200px" },
                whiteSpace: "nowrap",
                flexShrink: 0,

                "&:hover": {
                  backgroundColor: "white",
                  color: "#A8743D",
                  transform: "scale(1.05)",
                  boxShadow: "0px 12px 40px rgba(167, 109, 54, 0.8)",
                },

                "&:active": {
                  animation: `bounceShrink 0.3s ease-in-out`,
                },

                "&::after": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  width: "0%",
                  height: "100%",
                  backgroundColor: "white",
                  transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
                  zIndex: 0,
                },
                "&:hover::after": {
                  width: "100%",
                  left: 0,
                },
              }}
            >
              <Box component="span" sx={{ position: "relative", zIndex: 1 }}>
                {label}
              </Box>
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
