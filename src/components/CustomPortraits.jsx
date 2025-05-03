import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Modal,
  Button,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";

const mediaItems = [
  {
    id: 1,
    type: "video",
    src: "/assets/portrait/video1.mp4",
    title: "Portrait Video",
  },
  ...Array.from({ length: 7 }, (_, index) => ({
    id: index + 2,
    type: "image",
    src: `/assets/portrait/img${index + 1}.jpg`,
  })),
];

const CustomPortrait = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isTablet = useMediaQuery("(min-width:600px)");

  const handleShowMore = () => navigate("/myworks#customportraits");

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  // Adjust items display based on screen size
  const getVisibleItems = () => {
    if (isDesktop) return { top: mediaItems.slice(0, 4), bottom: mediaItems.slice(4, 8) };
    if (isTablet) return { top: mediaItems.slice(0, 3), bottom: mediaItems.slice(3, 6) };
    return { top: mediaItems.slice(0, 2), bottom: mediaItems.slice(2, 4) };
  };

  const { top, bottom } = getVisibleItems();

  const renderCards = (items) =>
    items.map((item) => (
      <motion.div 
        key={item.id}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{ width: isDesktop ? "260px" : isTablet ? "30%" : "45%" }}
      >
        <Card
          onClick={() => handleOpen(item)}
          sx={{
            width: "100%",
            height: isDesktop ? "280px" : isTablet ? "220px" : "160px",
            cursor: "pointer",
            boxShadow: "0px 4px 12px rgba(167, 109, 54, 0.6)",
            borderRadius: "16px",
            overflow: "hidden",
            flexShrink: 0,
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0px 6px 20px rgba(167, 109, 54, 0.9)",
            },
            mx: "auto",
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
                "&:hover": {
                  transform: "scale(1.05)",
                }
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
                  transform: "scale(1.1)",
                }
              }}
            />
          )}
        </Card>
      </motion.div>
    ));

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        pb: 1,
        pt: 2,
        minHeight: "100vh",
        background:
          "black radial-gradient(circle at center, #111 0%, #000 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant={isDesktop ? "h4" : "h5"}
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
              width: "80px",
              height: "3px",
              backgroundColor: "#A8743D",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
            },
          }}
        >
         Custom Portraits
        </Typography>
      </motion.div>

      {/* Gallery */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3, md: 4 },
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        {/* Top Row */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 2, sm: 3 },
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          {renderCards(top)}
        </Box>

        {/* Bottom Row */}
        {bottom.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: { xs: 2, sm: 3 },
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            {renderCards(bottom)}
          </Box>
        )}
      </Box>

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={{ xs: 1.5, sm: 2 }}
        mt={{ xs: 2, sm: 4 }}
        mb={{ xs: 2, sm: 0 }}
        px={{ xs: 1.5, sm: 0 }}
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <motion.div 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          style={{ width: isDesktop ? "auto" : "100%" }}
        >
          <Button
            onClick={handleShowMore}
            variant="contained"
            size={isDesktop ? "medium" : "small"}
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#B88746",
              color: "white",
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontWeight: "600",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              borderRadius: "50px",
              width: { xs: "100%", sm: "auto" },
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
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          style={{ width: isDesktop ? "auto" : "100%" }}
        >
          <Button
            component={Link}
            to="/customize"
            variant="outlined"
            size={isDesktop ? "medium" : "small"}
            startIcon={<BrushIcon />}
            sx={{
              borderColor: "#B88746",
              color: "#B88746",
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.5 },
              fontWeight: "600",
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              borderRadius: "50px",
              width: { xs: "100%", sm: "auto" },
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

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            overflow: "hidden",
          }}
        >
          {selectedItem && (
            <>
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.src}
                  controls
                  autoPlay
                  style={{
                    width: "95vw",
                    maxHeight: "80vh",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  style={{
                    width: "95vw",
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

export default CustomPortrait;