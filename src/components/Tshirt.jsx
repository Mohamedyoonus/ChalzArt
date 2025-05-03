import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Modal,
  Button
} from "@mui/material";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";

const mediaItems = [
  {
    id: 1,
    type: "video",
    src: "/assets/Tshirt/video2.mp4",
    title: "T-Shirt Video"
  },
  ...Array.from({ length: 3 }, (_, index) => ({
    id: index + 2,
    type: "image",
    src: `/assets/Tshirt/img${index + 1}.jpg`,
    title: `T-Shirt ${index + 1}`
  }))
];

const Tshirt = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleShowMore = () => {
    navigate("/myworks#tshirtdesigns");
  };

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
        paddingX: { xs: "16px", sm: "24px", md: "40px" },
        paddingBottom: "40px",
        background: "black radial-gradient(circle at center, #111 0%, #000 100%)",
        minHeight: "100vh",
        overflowX: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "10px"
      }}
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h4"
          fontWeight="700"
          mb={6}
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
              transform: "translateX(-50%)"
            }
          }}
        >
          Tshirt Designs
        </Typography>
      </motion.div>

      {/* Responsive Gallery */}
      <Box
        sx={{
          display: { xs: "grid", sm: "flex" },
          gridTemplateColumns: { xs: "1fr 1fr", sm: "none" },
          gap: 3,
          py: 2,
          overflowX: { sm: "auto" },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
          justifyContent: "center",
          flexDirection: { sm: "row" },
          alignItems: "center"
        }}
      >
        {mediaItems.map((item) => (
          <Card
            key={item.id}
            onClick={() => handleOpen(item)}
            sx={{
              width: { xs: "100%", sm: "260px" },
              maxWidth: "100%",
              height: { xs: "180px", sm: "280px" },
              cursor: "pointer",
              boxShadow: "0px 6px 15px rgba(167, 109, 54, 0.8)",
              borderRadius: "20px",
              overflow: "hidden",
              flexShrink: 0,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 25px rgba(167, 109, 54, 1)"
              }
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
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <CardMedia
                component="img"
                image={item.src}
                alt={item.title}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </Card>
        ))}
      </Box>

      {/* Buttons */}
      <Box
  display="flex"
  justifyContent="center"
  gap={2}
  mt={2}
  sx={{
    flexDirection: { xs: "row", sm: "row" },
    flexWrap: { xs: "wrap", sm: "nowrap" },
    alignItems: "center"
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
        padding: { xs: "8px 16px", sm: "12px 24px", md: "14px 32px" },
        fontWeight: "600",
        fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" },
        borderRadius: "50px",
        boxShadow: "0 8px 20px rgba(184, 135, 70, 0.4)",
        minWidth: { xs: "130px", sm: "180px", md: "240px" },
        "&:hover": {
          backgroundColor: "#A8743D",
          boxShadow: "0 12px 24px rgba(184, 135, 70, 0.6)"
        }
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
        padding: { xs: "8px 16px", sm: "12px 24px", md: "14px 32px" },
        fontWeight: "600",
        fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" },
        borderRadius: "50px",
        minWidth: { xs: "130px", sm: "180px", md: "240px" },
        "&:hover": {
          backgroundColor: "rgba(184, 135, 70, 0.1)",
          borderColor: "#A8743D",
          color: "#A8743D"
        }
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
          justifyContent: "center"
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
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)"
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
                    width: "80vw",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: "8px"
                  }}
                />
              ) : (
                <img
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  style={{
                    width: "80vw",
                    maxHeight: "90vh",
                    objectFit: "contain",
                    borderRadius: "8px"
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
