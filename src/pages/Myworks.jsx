import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
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
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FilterListIcon from "@mui/icons-material/FilterList";

const themeColor = "#0f0f0f";
const highlightColor = "#D4AF37";

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
  "Shoe Paint ": {
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
  const [loading, setLoading] = useState(true);
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
    let newIndex;

    if (direction === "prev") {
      newIndex =
        (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    } else {
      newIndex = (currentImageIndex + 1) % currentGallery.length;
    }

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
        pt: { xs: 6, md: 10 },
        pb: 5,
        px: { xs: 2, md: 8 },
        bgcolor: themeColor,
        color: "white",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant={isMobile ? "h4" : "h3"}
          fontWeight="700"
          textAlign="center"
          mb={3}
          sx={{
            color: highlightColor,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "'Playfair Display', serif",
            textShadow: "0px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          Gallery
        </Typography>
      </motion.div>

      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          mb={5}
          sx={{
            flexWrap: "wrap",
            gap: 2,
            position: "sticky",
            top: { xs: 56, sm: 64 },
            zIndex: 10,
            py: 2,
            bgcolor: "rgba(15,15,15,0.9)",
            backdropFilter: "blur(8px)",
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
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.1)",
                    borderColor: highlightColor,
                  },
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
                    bgcolor: "#1e1e1e",
                    color: "white",
                    "& .MuiMenuItem-root": {
                      "&:hover": {
                        bgcolor: "rgba(212, 175, 55, 0.1)",
                      },
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
                          ? "rgba(212, 175, 55, 0.2)"
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
                transition={{ duration: 0.3 }}
              >
                <Chip
                  label={galleryName}
                  onClick={() => {
                    setSelectedGallery(galleryName);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  sx={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedGallery === galleryName
                        ? highlightColor
                        : "#1e1e1e",
                    color: selectedGallery === galleryName ? "#000" : "white",
                    fontWeight:
                      selectedGallery === galleryName ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: highlightColor,
                      color: "#000",
                    },
                    transition: "all 0.3s ease",
                    fontSize: isMobile ? "0.8rem" : "0.9rem",
                    px: 1,
                    height: "auto",
                    borderRadius: "12px",
                    padding: "6px 12px",
                    boxShadow:
                      selectedGallery === galleryName
                        ? "0 4px 10px rgba(0,0,0,0.3)"
                        : "none",
                  }}
                />
              </motion.div>
            ))
          )}
        </Box>

        {/* Gallery Sections */}
        <Box sx={{ mt: 4 }}>
          {Object.entries(displayGalleries).map(
            ([galleryName, galleryData]) => (
              <Box
                key={galleryName}
                mb={8}
                id={galleryName.replace(/\s+/g, "-").toLowerCase()}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <Typography
                    variant={isMobile ? "h6" : "h5"}
                    fontWeight="600"
                    textAlign="center"
                    mb={2}
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      fontFamily: "'Playfair Display', serif",
                      color: "#e0e0e0",
                    }}
                  >
                    {galleryName}
                  </Typography>
                  <Typography
                    variant="body1"
                    textAlign="center"
                    mb={4}
                    sx={{
                      maxWidth: "700px",
                      mx: "auto",
                      color: "#aaa",
                      fontFamily: "'Merriweather', serif",
                    }}
                  >
                    {galleryData.description}
                  </Typography>
                </motion.div>

                <Masonry
                  columns={{
                    xs: 2,
                    sm: 2,
                    md: 3,
                    lg: selectedGallery === "All" ? 4 : 4,
                  }}
                  spacing={2}
                >
                  {galleryData.images.map((image, index) => (
                    <motion.div
                      key={image.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card
                        sx={{
                          cursor: "pointer",
                          background: "#1e1e1e",
                          borderRadius: "12px",
                          boxShadow: "0px 6px 18px rgba(212, 175, 55, 0.15)",
                          overflow: "hidden",
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                            boxShadow: "0px 10px 20px rgba(212, 175, 55, 0.4)",
                          },
                        }}
                        onClick={() => handleOpen(image, galleryName, index)}
                      >
                        <LazyLoadImage
                          src={image.src}
                          alt={image.title}
                          effect="blur"
                          width="100%"
                          height="auto"
                          style={{
                            objectFit: "cover",
                            transition: "opacity 0.3s ease-in-out",
                            minHeight: "200px",
                            backgroundColor: "#1e1e1e",
                          }}
                          onLoad={() => setLoading(false)}
                        />
                        {loading && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "200px",
                            }}
                          >
                            <CircularProgress sx={{ color: highlightColor }} />
                          </Box>
                        )}
                      </Card>
                    </motion.div>
                  ))}
                </Masonry>
              </Box>
            ),
          )}
        </Box>

        {/* Fullscreen Modal */}
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{ backdrop: { timeout: 500 } }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                bgcolor: "rgba(0,0,0,0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: "blur(12px)",
                zIndex: 1300,
                overflow: "hidden",
              }}
            >
              {/* Navigation Arrows */}
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImages("prev");
                }}
                sx={{
                  position: "absolute",
                  left: { xs: 10, md: 40 },
                  color: "#D4AF37",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.25)",
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
                  color: "#D4AF37",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.25)",
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
                sx={{
                  position: "absolute",
                  top: 30,
                  right: 30,
                  color: "#D4AF37",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(212, 175, 55, 0.4)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(212, 175, 55, 0.25)",
                    transform: "rotate(90deg) scale(1.1)",
                  },
                  zIndex: 10,
                  p: 2,
                }}
                onClick={handleClose}
              >
                <CloseIcon fontSize="small" />
              </IconButton>

              {/* Image and Details */}
              {selectedImage && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    alignItems: "center",
                    maxWidth: "90vw",
                    maxHeight: "90vh",
                    gap: { xs: 2, md: 4 },
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "80vh",
                        objectFit: "contain",
                        borderRadius: "12px",
                        boxShadow:
                          "0px 20px 40px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.4)",
                        border: "2px solid rgba(212, 175, 55, 0.4)",
                      }}
                    />
                  </motion.div>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default MyWorks;
