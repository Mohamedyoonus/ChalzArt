import { useState, useEffect, useCallback } from "react";
import {
  Box,
  IconButton,
  Dialog,
  Button,
  useMediaQuery,
  useTheme,
  Typography,
  Slide,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";
import promoImage from "../assets/promo.jpg";

/* Floating animation removed for mobile (later handled with condition) */
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 116, 61, 0.7); }
  70% { transform: scale(1.03); box-shadow: 0 0 0 12px rgba(168, 116, 61, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 116, 61, 0); }
`;

const FloatingAd = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [showAd, setShowAd] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Drag Fix
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  /** Compact size for mobile + desktop */
  const adSize = {
    width: isMobile ? 130 : 160,
    height: isMobile ? 90 : 110,
  };

  const [adPosition, setAdPosition] = useState({
    x: isMobile ? window.innerWidth - adSize.width - 20 : 20,
    y: window.innerHeight - adSize.height - 20,
  });

  /** Drag start (but don't activate drag yet) */
  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setHasMoved(false);
  };

  /** Drag movement */
  const handleMouseMove = useCallback(
    (e) => {
      if (!dragStart) return;

      const diffX = e.clientX - dragStart.x;
      const diffY = e.clientY - dragStart.y;

      // If movement is small → treat as a click
      if (Math.abs(diffX) < 4 && Math.abs(diffY) < 4) return;

      setHasMoved(true);
      setIsDragging(true);

      const newX = adPosition.x + diffX;
      const newY = adPosition.y + diffY;

      const maxX = window.innerWidth - adSize.width;
      const maxY = window.innerHeight - adSize.height;

      setAdPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });

      setDragStart({ x: e.clientX, y: e.clientY });
    },
    [dragStart, adPosition, adSize]
  );

  /** Drag end */
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  /** Listeners */
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  /** Fade animation */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!showAd) return null;

  return (
    <>
      {/* Floating Ad */}
      <Fade in={isVisible} timeout={700}>
        <Slide direction="up" in={isVisible} timeout={500}>
          <Box
            sx={{
              position: "fixed",
              top: adPosition.y,
              left: adPosition.x,
              width: adSize.width,
              backgroundColor: "#fff",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              zIndex: 999,
              p: 1,
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",

              // Floating animation disabled for mobile
              animation: !isMobile
                ? `${floatAnimation} 4s ease-in-out infinite`
                : "none",

              "&:hover": {
                transform: isDragging ? "none" : "scale(1.04)",
              },

              // Mobile-specific improvements
              ...(isMobile && {
                borderRadius: 2,
                p: 1,
                right: 20,
                bottom: 20,
              }),
            }}
            onMouseDown={handleMouseDown}
            onClick={() => {
              if (!hasMoved) setOpenModal(true);
            }}
          >
            {/* Close Button */}
            <IconButton
              size={isMobile ? "small" : "medium"}
              onClick={(e) => {
                e.stopPropagation();
                setShowAd(false);
              }}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(255,255,255,0.8)",
                width: isMobile ? 26 : 30,
                height: isMobile ? 26 : 30,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>

            {/* Image */}
            <img
              src={promoImage}
              alt="Special Offer"
              style={{
                width: "100%",
                height: isMobile ? 70 : 85,
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />

            <Typography
              variant="caption"
              sx={{
                display: "block",
                textAlign: "center",
                fontWeight: 600,
                color: "#A8743D",
                mt: 0.5,
                fontSize: isMobile ? "0.7rem" : "0.8rem",
              }}
            >
              Click for Special Offer!
            </Typography>
          </Box>
        </Slide>
      </Fade>

      {/* Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            maxWidth: isMobile ? "95vw" : "90vw",
            maxHeight: isMobile ? "85vh" : "90vh",
            borderRadius: isMobile ? 2 : 3,
            background: "transparent",
            overflow: "hidden !important",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Modal Close Button */}
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
              width: isMobile ? 32 : 40,
              height: isMobile ? 32 : 40,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Full Image */}
          <img
            src={promoImage}
            alt="Promo Full View"
            style={{
              width: "100%",
              height: "100%",
              maxHeight: isMobile ? "65vh" : "70vh",
              objectFit: "contain",
            }}
          />

          <Box
            sx={{
              p: isMobile ? 2 : 3,
              textAlign: "center",
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              position: "absolute",
              bottom: 0,
              width: "100%",
            }}
          >
            <Button
              variant="contained"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdMIwpn-dDLV7gFdx37V8jv59ChZkLil0ot1W0ikCRc19HxvQ/viewform?usp=header"
              target="_blank"
              rel="noopener"
              sx={{
                backgroundColor: "#A8743D",
                px: isMobile ? 2 : 3,
                py: isMobile ? 1 : 1.4,
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: isMobile ? "0.85rem" : "1rem",
                animation: `${pulse} 2.2s infinite`,
                "&:hover": {
                  backgroundColor: "#8B5D3D",
                },
              }}
            >
              Register Now
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default FloatingAd;
