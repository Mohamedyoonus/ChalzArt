import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Modal,
  IconButton,
  Fade,
  Backdrop,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Menu,
  MenuItem,
  Container,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import FilterListIcon from "@mui/icons-material/FilterList";

const highlightColor = "#B88746";

const galleries = {
  "Custom Portraits": {
    images: Array.from({ length: 9 }, (_, i) => ({
      src: `/assets/portrait/img${i + 1}.jpg`,
    })),
  },
  "Live Sketches": {
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/assets/livesketch/img${i + 3}.jpg`,
    })),
  },
  "T-Shirt Designs": {
    images: Array.from({ length: 4 }, (_, i) => ({
      src: `/assets/Tshirt/img${i + 1}.jpg`,
    })),
  },
  "Oil Paint": {
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/assets/oil/img${i + 1}.jpg`,
    })),
  },
  "Mural Paint": {
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/assets/mural/img${i + 1}.jpg`,
    })),
  },
  "Shoe Paint": {
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `/assets/shoepaint/img${i + 1}.jpg`,
    })),
  },
};

const MyWorks = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location]);

  const handleOpen = (image, galleryName, index) => {
    setSelectedImage({ ...image, galleryName });
    setCurrentImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const navigateImages = (direction) => {
    const currentGallery = galleries[selectedImage.galleryName].images;
    const newIndex =
      direction === "prev"
        ? (currentImageIndex - 1 + currentGallery.length) %
          currentGallery.length
        : (currentImageIndex + 1) % currentGallery.length;

    setSelectedImage({
      ...currentGallery[newIndex],
      galleryName: selectedImage.galleryName,
    });
    setCurrentImageIndex(newIndex);
  };

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };
  const handleFilterSelect = (galleryName) => {
    setSelectedGallery(galleryName);
    setAnchorEl(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const galleryNames = Object.keys(galleries);
  const displayGalleries =
    selectedGallery === "All"
      ? galleries
      : { [selectedGallery]: galleries[selectedGallery] };

  return (
    <Box
      sx={{
        pt: { xs: 2, md: 3 },
        pb: 6,
        px: { xs: 2, md: 6 },
        bgcolor: "#fff",
        color: "#222",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg">
        {/* Sticky Category Bar */}
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
          sx={{
            flexWrap: "wrap",
            gap: 1.5,
            position: "sticky",
            top: { xs: 56, md: 70 },
            zIndex: 10,
            py: 1.5,
            bgcolor: "rgba(255,255,255,0.95)",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          {isMobile ? (
            <>
              <Button
                variant="outlined"
                onClick={handleFilterClick}
                startIcon={<FilterListIcon />}
                sx={{
                  color: highlightColor,
                  borderColor: highlightColor,
                  "&:hover": { backgroundColor: "rgba(212,175,55,0.1)" },
                }}
              >
                {selectedGallery === "All" ? "All Categories" : selectedGallery}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
                PaperProps={{
                  sx: {
                    bgcolor: "white",
                    color: "black",
                    "& .MuiMenuItem-root:hover": {
                      bgcolor: "rgba(212,175,55,0.1)",
                    },
                  },
                }}
              >
                {["All", ...galleryNames].map((galleryName) => (
                  <MenuItem
                    key={galleryName}
                    onClick={() => handleFilterSelect(galleryName)}
                    selected={selectedGallery === galleryName}
                    sx={{
                      bgcolor:
                        selectedGallery === galleryName
                          ? "rgba(212,175,55,0.15)"
                          : "transparent",
                      fontWeight:
                        selectedGallery === galleryName ? "bold" : "normal",
                    }}
                  >
                    {galleryName}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            ["All", ...galleryNames].map((galleryName) => (
              <motion.div
                key={galleryName}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Chip
                  label={galleryName}
                  onClick={() => handleFilterSelect(galleryName)}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedGallery === galleryName
                        ? highlightColor
                        : "transparent",
                    border: `1px solid ${highlightColor}`,
                    color:
                      selectedGallery === galleryName ? "#000" : highlightColor,
                    fontWeight:
                      selectedGallery === galleryName ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: highlightColor,
                      color: "#000",
                    },
                    fontSize: "0.9rem",
                    px: 1,
                    height: "auto",
                    borderRadius: "10px",
                    padding: "6px 12px",
                    boxShadow:
                      selectedGallery === galleryName
                        ? "0 3px 10px rgba(0,0,0,0.1)"
                        : "none",
                  }}
                />
              </motion.div>
            ))
          )}
        </Box>

        {/* Gallery Grid */}
        <Box sx={{ mt: 3 }}>
          {Object.entries(displayGalleries).map(
            ([galleryName, galleryData]) => (
              <Masonry
                key={galleryName}
                columns={{ xs: 2, sm: 2, md: 3, lg: 4 }}
                spacing={2}
              >
                {galleryData.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <Card
                      sx={{
                        cursor: "pointer",
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
                        overflow: "hidden",
                        transition: "all 0.4s ease",
                        "&:hover": {
                          boxShadow: "0px 10px 25px rgba(0,0,0,0.15)",
                        },
                      }}
                      onClick={() => handleOpen(image, galleryName, index)}
                    >
                      <motion.img
                        src={image.src}
                        alt=""
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                          minHeight: "200px",
                          display: "block",
                        }}
                      />
                    </Card>
                  </motion.div>
                ))}
              </Masonry>
            )
          )}
        </Box>

        {/* Fullscreen Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 400 } }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0,0,0,0.9)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1300,
                overflow: "hidden",
              }}
            >
              {/* Arrows */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("prev");
                }}
                sx={{
                  position: "absolute",
                  left: { xs: 10, md: 40 },
                  color: highlightColor,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.2)",
                    transform: "scale(1.1)",
                  },
                  zIndex: 10,
                  p: 2,
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("next");
                }}
                sx={{
                  position: "absolute",
                  right: { xs: 10, md: 40 },
                  color: highlightColor,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.2)",
                    transform: "scale(1.1)",
                  },
                  zIndex: 10,
                  p: 2,
                }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>

              {/* Close Button */}
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: 30,
                  right: 30,
                  color: highlightColor,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(212,175,55,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(212,175,55,0.25)",
                    transform: "rotate(90deg) scale(1.1)",
                  },
                  zIndex: 10,
                  p: 2,
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {/* Image */}
              <AnimatePresence mode="wait">
                {selectedImage && (
                  <motion.img
                    key={selectedImage.src}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    src={selectedImage.src}
                    alt=""
                    style={{
                      maxWidth: "95%",
                      maxHeight: "90vh",
                      objectFit: "contain",
                      borderRadius: "12px",
                      boxShadow:
                        "0px 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212,175,55,0.4)",
                      border: "2px solid rgba(212,175,55,0.4)",
                    }}
                  />
                )}
              </AnimatePresence>
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default MyWorks;
