import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Card, CardMedia, Typography, Modal, Button, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";

const mediaItems = [
  {
    id: 1,
    type: "video",
    src: "/assets/Tshirt/video2.mp4",
    title: "T-Shirt Video",
  },
  ...Array.from({ length: 3 }, (_, index) => ({
    id: index + 2,
    type: "image",
    src: `/assets/Tshirt/img${index + 1}.jpg`,
  })),
];

const Tshirt = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(max-width:900px)");

  const handleShowMore = () => navigate("/myworks#tshirtdesigns");

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        pb: { xs: 3, sm: 5 },
        py: { xs: 2, sm: 4 },
        minHeight: "100vh",
        background: "black radial-gradient(circle at center, #111 0%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title - Enhanced for mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          fontWeight="700"
          mb={{ xs: 4, sm: 6 }}
          sx={{
            color: "#B88746",
            letterSpacing: "1px",
            textAlign: "center",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              width: isMobile ? "60px" : "80px",
              height: isMobile ? "3px" : "4px",
              backgroundColor: "#A8743D",
              bottom: -8,
              left: "50%",
              transform: "translateX(-50%)",
            },
          }}
        >
          T-Shirt Designs
        </Typography>
      </motion.div>

      {/* Gallery - Enhanced grid for mobile */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(auto-fit, minmax(240px, 1fr))",
          },
          gap: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 1, sm: 0 },
          justifyContent: "center",
        }}
      >
        {mediaItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: isMobile ? 1 : 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              onClick={() => handleOpen(item)}
              sx={{
                width: "100%",
                maxWidth: "260px",
                height: { xs: "160px", sm: "240px", md: "280px" },
                cursor: "pointer",
                boxShadow: "0px 4px 12px rgba(167, 109, 54, 0.6)",
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: isMobile ? "none" : "scale(1.03)",
                  boxShadow: "0px 6px 20px rgba(167, 109, 54, 0.9)",
                },
              }}
            >
              {item.type === "video" ? (
                <CardMedia
                  component="video"
                  src={item.src}
                  title={item.title}
                  controls
                  loop
                  autoPlay
                  muted
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <CardMedia
                  component="img"
                  image={item.src}
                  alt={item.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                    "&:hover": {
                      transform: isMobile ? "none" : "scale(1.1)",
                    },
                  }}
                />
              )}
            </Card>
          </motion.div>
        ))}
      </Box>

      {/* Buttons - Stacked on mobile */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 1.5, sm: 2 }}
        mt={{ xs: 3, sm: 4 }}
        px={{ xs: 1, sm: 0 }}
        sx={{
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <motion.div
          whileHover={{ scale: isMobile ? 1.03 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          <Button
            onClick={handleShowMore}
            variant="contained"
            size={isMobile ? "small" : "medium"}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#B88746",
              color: "white",
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontWeight: "600",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              borderRadius: "50px",
              width: isMobile ? "100%" : "auto",
              minWidth: { xs: "100%", sm: "140px" },
              whiteSpace: "nowrap",
              boxShadow: "0 4px 12px rgba(184, 135, 70, 0.4)",
              "&:hover": {
                backgroundColor: "#A8743D",
                boxShadow: "0 8px 20px rgba(184, 135, 70, 0.6)",
              },
            }}
          >
            View Full Gallery
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: isMobile ? 1.03 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ width: isMobile ? "100%" : "auto" }}
        >
          <Button
            component={Link}
            to="/customize"
            variant="outlined"
            size={isMobile ? "small" : "medium"}
            startIcon={<BrushIcon />}
            sx={{
              borderColor: "#B88746",
              color: "#B88746",
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontWeight: "600",
              fontSize: { xs: "0.8rem", sm: "0.9rem" },
              borderRadius: "50px",
              width: isMobile ? "100%" : "auto",
              minWidth: { xs: "100%", sm: "140px" },
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

      {/* Modal - Enhanced for mobile */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          touchAction: "manipulation", // Better touch handling
        }}
      >
        <Box
          onClick={handleClose}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.97)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "auto",
            p: 1,
          }}
        >
          {selectedItem && (
            <>
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  playsInline // Better mobile video handling
                  style={{
                    width: "100%",
                    maxWidth: "900px",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  style={{
                    width: "100%",
                    maxWidth: "900px",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Tshirt;