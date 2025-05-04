// Keep all existing imports
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Modal,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";

const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
`;

const ShoePaint = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const shoepaintImages = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    src: `/assets/shoepaint/img${index + 1}.jpg`,
    title: `ShoePaint Image ${index + 1}`,
  }));

  const visibleImages = isMobile ? shoepaintImages.slice(0, 4) : shoepaintImages;

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleShowMore = () => navigate("/myworks#shoepaintings");


  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        py: 5,
        pb: -2,
        pt: 0,
        mb: -2, 
        mt: -8,   
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
        style={{ width: "100%" }}
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
              transform: "translateX(-50%)",
            },
          }}
        >
          Shoe Paints
        </Typography>
      </motion.div>

      {/* Gallery */}
      <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
        {visibleImages.map((image) => (
          <Grid
            item
            key={image.id}
            xs={6} sm={4} md={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Card
              onClick={() => handleOpen(image)}
              sx={{
                width: { xs: 140, sm: 200, md: 250 },
                height: { xs: 140, sm: 200, md: 250 },
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0px 6px 15px rgba(167, 109, 54, 0.5)",
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={image.src}
                alt={image.title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

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
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            p: 2,
          }}
        >
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                borderRadius: "12px",
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ShoePaint;
