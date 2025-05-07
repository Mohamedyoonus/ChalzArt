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
import { Link, useNavigate } from "react-router-dom";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";
import CloseIcon from "@mui/icons-material/Close";

const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
`;

const OilPaint = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const shoepaintImages = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    src: `/assets/oil/img${index + 1}.jpg`,
    title: `OilPaint Image ${index + 1}`,
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

  const handleShowMore = () => navigate("/myworks#oilpaintings");

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3, md: 5 },
        py: 5,
        pb: -2,
        pt:  { xs: 5, sm: 3, md: 6 },
        mb: -2,
        mt: -8,
        minHeight: "55vh",
        background:
          "white",
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
          fontWeight="900" // Maximum boldness
          mb={{ xs: 4, sm: 6 }}
          sx={{
            fontFamily: "'Cinzel', serif"
                  ,
                  color: "#B88746", // A softer, rich bronze
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  textAlign: "center",
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "60px",
                    height: "2px",
                    backgroundColor: "#A8743D",
                    bottom: -10,
                    left: "50%",
                    transform: "translateX(-50%)",
                  },
                }}
        >
          Oil Paints
        </Typography>
      </motion.div>

      {/* Gallery */}
      <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
        {visibleImages.map((image) => (
          <Grid
            item
            key={image.id}
            xs={6}
            sm={4}
            md={4}
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

      {/* Buttons */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        flexWrap="nowrap"
        gap={{ xs: 1.5, sm: 2 }}
        mt={{ xs: 3, sm: 4 }}
        px={{ xs: 1.5, sm: 0 }}
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
          zIndex: 1300,
        }}
      >
        <Box
          sx={{
            position: "relative",
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            p: 2,
            maxWidth: "95vw",
            maxHeight: "95vh",
            borderRadius: "12px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.8)",
          }}
        >
          {/* Close Button */}
          <Box
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              backgroundColor: "#B88746",
              color: "#fff",
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "1.2rem",
              cursor: "pointer",
              zIndex: 1400,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.5)",
              "&:hover": {
                backgroundColor: "#A8743D",
              },
            }}
          >
            <CloseIcon />
          </Box>

          {/* Modal Image */}
          {selectedImage && (
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              style={{
                maxWidth: "100%",
                maxHeight: "85vh",
                borderRadius: "10px",
                objectFit: "contain",
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default OilPaint;
