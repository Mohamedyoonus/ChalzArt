import { useState, useEffect, useRef } from "react";
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
import Banner from "../components/Banner";
import CustomPortraits from "../components/CustomPortraits";
import LiveSketch from "../components/LiveSketch";
import Mural from "../components/Mural";
import ShoePaint from "../components/ShoePaint";
import Tshirt from "../components/Tshirt";
import Slogan from "../components/Slogan";
import promoImage from "../assets/promo.jpg";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import OilPaint from "../components/OilPaint";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 116, 61, 0.7); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(168, 116, 61, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(168, 116, 61, 0); }
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showAd, setShowAd] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [adPosition, setAdPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionsRef = useRef([]);

  // Add all section refs to the array
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  // Initial ad position setup
  useEffect(() => {
    const padding = 20;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const adWidth = isMobile ? 120 : 200;
    const adHeight = isMobile ? 90 : 120;

    setAdPosition({
      x: width - adWidth - padding,
      y: height - adHeight - padding,
    });

    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - adPosition.x, y: e.clientY - adPosition.y });
    e.currentTarget.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    const maxX = window.innerWidth - (isMobile ? 120 : 200);
    const maxY = window.innerHeight - (isMobile ? 90 : 120);

    setAdPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div ref={addToRefs} custom={0}>
        <Banner />
      </motion.div>
      <motion.div ref={addToRefs} custom={1}>
        <Slogan />
      </motion.div>
      <motion.div ref={addToRefs} custom={2}>
        <CustomPortraits />
      </motion.div>
      <motion.div ref={addToRefs} custom={3}>
        <LiveSketch />
      </motion.div>
      <motion.div ref={addToRefs} custom={4}>
        <Mural />
      </motion.div>
      <motion.div ref={addToRefs} custom={4}>
        <OilPaint />
      </motion.div>
      <motion.div ref={addToRefs} custom={5}>
        <ShoePaint />
      </motion.div>
      <motion.div ref={addToRefs} custom={6}>
        <Tshirt />
      </motion.div>

      {/* Floating Advertisement */}
      {showAd && (
        <Fade in={isVisible} timeout={800}>
          <Slide direction="up" in={isVisible} timeout={500}>
            <Box
              sx={{
                position: "fixed",
                top: adPosition.y,
                left: adPosition.x,
                width: { xs: 120, sm: 200 },
                backgroundColor: "#fff",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                zIndex: 999,
                p: 1,
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                transition: isDragging
                  ? "none"
                  : "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: isDragging ? "none" : "scale(1.05)",
                  boxShadow: "0 12px 36px rgba(0,0,0,0.3)",
                },
                animation: `${floatAnimation} 4s ease-in-out infinite`,
              }}
              onClick={() => !isDragging && setOpenModal(true)}
              onMouseDown={handleMouseDown}
            >
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
                  color: "#555",
                  backgroundColor: "rgba(255,255,255,0.7)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
              <img
                src={promoImage}
                alt="Special Offer"
                style={{
                  width: "100%",
                  height: isMobile ? 70 : 100,
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
                  marginTop: 0.5,
                  fontSize: isMobile ? "0.6rem" : "0.75rem",
                }}
              >
                Click for Special Offer!
              </Typography>
            </Box>
          </Slide>
        </Fade>
      )}

      {/* Full Image Modal */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth={false}
        fullWidth
        PaperProps={{
          sx: {
            maxWidth: "90vw",
            maxHeight: "90vh",
            borderRadius: 3,
            overflow: "hidden",
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          <IconButton
            onClick={() => setOpenModal(false)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={promoImage}
            alt="Promo Full View"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              maxHeight: "90vh",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
              p: 3,
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdMIwpn-dDLV7gFdx37V8jv59ChZkLil0ot1W0ikCRc19HxvQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: "#A8743D",
                color: "white",
                px: { xs: 0.5, sm: 2 },
                py: { xs: 1, sm: 1.5 },
                fontWeight: "bold",
                fontSize: { xs: "0.875rem", sm: "1rem"},
                borderRadius: 2,
                minWidth: 200,
                animation: `${pulse} 2s infinite`,
                "&:hover": {
                  backgroundColor: "#8B5D3D",
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                },
              }}
            >
              Register Now
            </Button>
          </Box>
        </Box>
      </Dialog>
    </motion.div>
  );
};

export default Home;