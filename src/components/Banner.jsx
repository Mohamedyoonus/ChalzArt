import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import bannerImage from "../assets/banner.jpg";
import { keyframes } from "@mui/system";

// Animations
const colorfulBounce = keyframes`
  0% {
    transform: translateY(0);
    color: #FFD700;
    text-shadow: 0 0 10px #FFD700;
  }
  25% {
    transform: translateY(-10px);
    color: #FF69B4;
    text-shadow: 0 0 15px #FF69B4;
  }
  50% {
    transform: translateY(0);
    color: #87CEEB;
    text-shadow: 0 0 15px #87CEEB;
  }
  75% {
    transform: translateY(10px);
    color: #90EE90;
    text-shadow: 0 0 15px #90EE90;
  }
  100% {
    transform: translateY(0);
    color: #FFD700;
    text-shadow: 0 0 10px #FFD700;
  }
`;

const elegantPulse = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
    text-shadow: none;
  }
  50% {
    opacity: 1;
    transform: translateY(0);
    text-shadow: 0 0 10px #D4A373, 0 0 20px #fff;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    text-shadow: 0 0 8px #D4A373;
  }
`;

const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: "none",
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
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          zIndex: 0,
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

        <br />

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
      variant="outlined"
      sx={{
        fontSize: { xs: "0.8rem", sm: "1rem" },
        padding: { xs: "10px 20px", sm: "14px 36px" },
        fontWeight: "600",
        
        borderColor: "white",
        color: "#fff", // Set default text color to white
        borderRadius: "40px",
        boxShadow: "0px 8px 30px rgba(167, 109, 54, 0.6)",
        transition: "all 0.3s ease-in-out",
        position: "relative",
        overflow: "hidden",
        whiteSpace: "nowrap",
        flexShrink: 0,
        "&::after": {
          content: "''",
          position: "absolute",
          top: 0,
          filter: "blur(2px)",

          left: "50%",
          width: "0%",
          height: "100%",
          backgroundColor: "#D4A373",
          zIndex: -1,
          transition: "width 0.3s ease, left 0.3s ease",
        },
        "&:hover": {
          backgroundColor: "#D4A373",
          color: "#fff",
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
  ))}
</Box>

      </Box>
    </Box>
  );
};

export default Banner;
