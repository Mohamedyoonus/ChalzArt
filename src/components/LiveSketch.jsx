import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { keyframes } from "@mui/system";
import Masonry from "@mui/lab/Masonry";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";

const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const sketchImages = Array.from({ length: 11 }, (_, index) => ({
  id: index + 1,
  src: `/assets/livesketch/img${index + 1}.jpg`,
  title: `Live Sketch ${index + 1}`,
}));

const LiveSketch = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleShowMore = () => {
    navigate("/myworks#livesketches");
  };

  // Optionally limit images shown per device
  const displayedImages = isMobile
    ? sketchImages.slice(0, 5)
    : sketchImages.slice(0, 7);

  return (
    <Box
  sx={{
    px: { xs: 2, sm: 3, md: 5 },
    pb: 5,
    pt: { xs: 18, sm: 3, md:6 },
    mt: { xs: -8, sm: 0, md: -5},
    minHeight: "100vh",
    background:
      "black radial-gradient(circle at center, #111 0%, #000 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>

  
  
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          mb={3}
          sx={{
            color: "#B88746",
            letterSpacing: "1px",
            textAlign: "center",
            position: "relative",
            display: "inline-block",
            width: "100%",
            "&::after": {
              content: '""',
              position: "absolute",
              width: "80px",
              height: "4px",
              backgroundColor: "#A8743D",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
            },
          }}
        >
          Live Sketches
        </Typography>
      </motion.div>

      {/* Masonry Layout */}
      <Box mt={4}>
        <Masonry
          columns={{ xs: 2, sm: 2, md: 3, lg: 4 }}
          spacing={3}
          sx={{ mx: "auto", maxWidth: "1200px" }}
        >
          {/* Video */}
          <Box
            key="video"
            sx={{
              borderRadius: "16px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0px 4px 20px rgba(167, 109, 54, 0.7)",
              transition: "transform 0.3s",
              "&:hover": {
                transform: "scale(1.03)",
              },
            }}
          >
            <video
              src="/assets/livesketch/video.mp4"
              controls
              loop
              autoPlay
              muted
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>

          {displayedImages.map((image) => {
            const isExpanded = [4, 5, 6, 7].includes(image.id);
            const isReduced = image.id === 3 && isMobile;

            return (
              <Box
                key={image.id}
                onClick={() => handleOpen(image)}
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0px 4px 20px rgba(167, 109, 54, 0.7)",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                  },
                }}
              >
                <LazyLoadImage
                  src={image.src}
                  alt={image.title}
                  effect="blur"
                  style={{
                    width: isReduced ? "180px" : "250px", // Reduce img3 width on mobile
                    height: isExpanded ? "320px" : "250px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "16px",
                  }}
                  onError={(e) => (e.target.src = "/assets/placeholder.png")}
                />
              </Box>
            );
          })}
        </Masonry>
      </Box>

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"
        gap={{ xs: 1.5, sm: 2 }}
        mt={{ xs: 3, sm: 4 }}
        px={{ xs: 1.5, sm: 0 }} // padding to prevent edge collision on mobile
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleShowMore}
            variant="contained"
            size="medium"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#B88746",
              color: "white",
              px: { xs: 1.5, sm: 3 },
              py: { xs: 0.8, sm: 1.5 },
              fontWeight: "600",
              fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" },
              borderRadius: "50px",
              minWidth: { xs: "110px", sm: "140px" },
              whiteSpace: "nowrap",
              boxShadow: "0 8px 20px rgba(184, 135, 70, 0.4)",
              "&:hover": {
                backgroundColor: "#A8743D",
                boxShadow: "0 12px 24px rgba(184, 135, 70, 0.6)",
              },
            }}
          >
            View Full Gallery
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            component={Link}
            to="/customize"
            variant="outlined"
            size="medium"
            startIcon={<BrushIcon />}
            sx={{
              borderColor: "#B88746",
              color: "#B88746",
              px: { xs: 1.5, sm: 3 },
              py: { xs: 0.8, sm: 1.5 },
              fontWeight: "600",
              fontSize: { xs: "0.7rem", sm: "0.9rem", md: "1rem" },
              borderRadius: "50px",
              minWidth: { xs: "110px", sm: "140px" },
              whiteSpace: "nowrap",
              "&:hover": {
                backgroundColor: "rgba(184, 135, 70, 0.1)",
                borderColor: "#A8743D",
                color: "#A8743D",
              },
            }}
          >
            Customize Yours
          </Button>
        </motion.div>
      </Box>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "90vw",
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: "12px",
            boxShadow: 24,
            p: 2,
            animation: `${fadeIn} 0.3s ease-in-out`,
            outline: "none",
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "12px",
              }}
              onError={(e) => (e.target.src = "/assets/placeholder.png")}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default LiveSketch;
