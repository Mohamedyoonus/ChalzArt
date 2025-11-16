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

// FLOATING animation (now used on both desktop + mobile)
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

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [hasMoved, setHasMoved] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  /** Mobile size is slightly more compact */
  const adSize = {
    width: isMobile ? 130 : 160,
    height: isMobile ? 95 : 120,
  };

  /** Ad starts on the LEFT side */
  const [adPosition, setAdPosition] = useState({
    x: 20,
    y: window.innerHeight - adSize.height - 20,
  });

  /** Start drag */
  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setHasMoved(false);
  };

  /** Move dragging */
  const handleMouseMove = useCallback(
    (e) => {
      if (!dragStart) return;

      const diffX = e.clientX - dragStart.x;
      const diffY = e.clientY - dragStart.y;

      if (Math.abs(diffX) < 3 && Math.abs(diffY) < 3) return;

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

  /** Stop drag */
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  /** Add global listeners */
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove]);

  /** Fade-in animation */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!showAd) return null;

  return (
    <>
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

              // ⬇ Floating animation applied on ALL devices
              animation: `${floatAnimation} 4s ease-in-out infinite`,

              "&:hover": {
                transform: isDragging ? "none" : "scale(1.04)",
              },
            }}
            onMouseDown={handleMouseDown}
            onClick={() => {
              if (!hasMoved) setOpenModal(true);
            }}
          >
            {/* Close Button */}
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShowAd(false);
              }}
              sx={{
                position: "absolute",
                top: 4,
                right: 4,
                backgroundColor: "rgba(255,255,255,0.8)",
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
                height: isMobile ? 75 : 90,
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
            borderRadius: 2,
            background: "transparent",
          },
        }}
      >
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "white",
            }}
          >
            <CloseIcon />
          </IconButton>

          <img
            src={promoImage}
            style={{
              width: "100%",
              maxHeight: isMobile ? "65vh" : "70vh",
              objectFit: "contain",
            }}
          />

          <Box
            sx={{
              p: isMobile ? 2 : 3,
              textAlign: "center",
              background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
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
