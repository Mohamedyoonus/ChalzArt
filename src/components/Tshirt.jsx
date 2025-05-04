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

// Media data
const mediaItems = [
  {
    id: 1,
    type: "video",
    src: "/assets/Tshirt/video2.mp4",
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

  const getVisibleItems = () => {
    if (isDesktop) return { top: mediaItems.slice(0, 4) };
    if (isTablet) return { top: mediaItems.slice(0, 3), bottom: mediaItems.slice(3, 6) };
    return { top: mediaItems.slice(0, 2), bottom: mediaItems.slice(2, 4) };
  };

  const { top, bottom } = getVisibleItems();

  const renderCards = (items) =>
    items?.map((item) => (
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
            mx: "auto",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              transform: "scale(1.03)",
              boxShadow: "0px 6px 20px rgba(167, 109, 54, 0.9)",
            },
          }}
        >
          {item.type === "video" ? (
            <CardMedia
              component="video"
              src={item.src}
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
                  transform: "scale(1.1)",
                },
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
        pt: { xs: 4, sm: 6, md: 8 },
        pb: { xs: -2, sm: 3, md: -1 },
        mb: { xs: 0, sm: 3, md: 0 },
        minHeight: "60vh",
        background: "black radial-gradient(circle at center, #111 0%, #000 100%)",
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
          Tshirt Designs
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
        {bottom && bottom.length > 0 && (
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
            outline: "none",
          }}
        >
          {selectedItem?.type === "video" ? (
            <video
              src={selectedItem.src}
              controls
              autoPlay
              loop
              muted
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: "12px",
              }}
            />
          ) : (
            <img
              src={selectedItem?.src}
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                borderRadius: "12px",
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Tshirt;
