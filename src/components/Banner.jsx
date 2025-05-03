import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import bannerImage from "../assets/banner.jpg";
import { keyframes } from "@mui/system";

// Animations
const scrollAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
`;

const glowingText = keyframes`
  0%, 200% {
    text-shadow: 0 0 8px #fff, 0 0 20px #D4A373, 0 0 30px #D4A373;
  }
  50% {
    text-shadow: 0 0 12px #fff, 0 0 25px #D4A373, 0 0 40px #D4A373;
  }
`;

const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const wave = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

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
      <Box sx={{ position: "relative", zIndex: 2, px: 3, maxWidth: "900px" }}>
        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            letterSpacing: { xs: 1, md: 4 },
            textTransform: "uppercase",
            fontFamily: "'Lora', serif",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            gap: 0.5,
            textShadow: "0 0 15px rgba(0, 0, 0, 0.8)",
            animation: `${scrollAnimation} 1.6s ease`,
          }}
        >
          {["C", "h", "a", "l", "z", "a", "r", "t"].map((char, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                display: "inline-block",
                animation: `${wave} 2s ease-in-out infinite`,
                animationDelay: `${index * 0.15}s`,
                textShadow: "0 0 10px #D4A373, 0 0 20px #D4A373",
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
            textShadow: "0 0 10px rgba(0, 0, 0, 0.7)",
            animation: `${glowingText} 4s ease-in-out infinite`,
            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.5rem" },
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
            flexWrap: "wrap",
          }}
        >
          {[{ label: "Discover More", to: "/myworks" }, { label: "Custom Your Art", to: "/customize" }].map(
            ({ label, to }) => (
              <Button
                key={label}
                component={Link}
                to={to}
                variant="contained"
                sx={{
                  fontSize: { xs: "0.8rem", sm: "1rem" },
                  padding: { xs: "10px 20px", sm: "14px 36px" },
                  fontWeight: "600",
                  backgroundColor: "#A8743D",
                  color: "#fff",
                  borderRadius: "40px",
                  boxShadow: "0px 8px 30px rgba(167, 109, 54, 0.6)",
                  transition: "all 0.3s ease-in-out",
                  position: "relative",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    width: "0%",
                    height: "100%",
                    backgroundColor: "#fff",
                    zIndex: -1,
                    transition: "width 0.3s ease, left 0.3s ease",
                  },
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#A8743D",
                    transform: "scale(1.05)",
                  },
                  "&:hover::after": {
                    width: "100%",
                    left: 0,
                  },
                  "&:active": {
                    animation: `${bounceShrink} 0.3s ease-in-out`,
                  },
                }}
              >
                {label}
              </Button>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Banner;
