import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Modal,
  Button,
  useTheme,
  useMediaQuery,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Container
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BrushIcon from '@mui/icons-material/Brush';

const portraitImages = [
  {
    id: 'video1',
    type: 'video',
    src: '/assets/mural/video.mp4',
  },
  ...Array.from({ length: 5 }, (_, index) => ({
    id: index + 1,
    type: 'image',
    src: `/assets/mural/img${index + 1}.jpg`,
  }))
];

const Mural = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  const handleShowMore = () => {
    navigate("/myworks#muralpaints");
  };

  const imagesToDisplay = isMobile
    ? portraitImages.slice(0, 4)
    : isTablet
    ? portraitImages.slice(0, 6)
    : portraitImages.slice(0, 8);

  return (
    <Box
      sx={{
        paddingTop: { xs: "60px", md: "100px" },
        paddingBottom: { xs: "40px", md: "80px" },
        background: "black radial-gradient(circle at center, #111 0%, #000 100%)",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "url('/assets/texture.png')",
          opacity: 0.03,
          pointerEvents: "none"
        }
      }}
    >
      <Container maxWidth="xl">
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
            Mural Paints
          </Typography>
        </motion.div>

        <Grid 
          container 
          spacing={4} 
          justifyContent="center"
          sx={{ mb: 6 }}
        >
          {imagesToDisplay.map((item) => (
            <Grid 
              item 
              key={item.id} 
              xs={6}
              sm={6}
              md={4}
              lg={3}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredCard(item.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Card
                  onClick={() => handleOpen(item)}
                  sx={{
                    width: { xs: 160, sm: 300, md: 320 },
                    height: { xs: 160, sm: 300, md: 300 },
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    cursor: "pointer",
                    position: "relative",
                    transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    border: "1px solid rgba(184, 135, 70, 0.3)"
                  }}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      alt="video"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)"
                      }}
                      muted
                      loop
                      autoPlay
                    />
                  ) : (
                    <CardMedia
                      component="img"
                      image={item.src}
                      alt={`portrait-${item.id}`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                        transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)"
                      }}
                    />
                  )}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      p: 3,
                      opacity: hoveredCard === item.id ? 1 : 0,
                      transition: "opacity 0.3s ease"
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ color: "white", fontWeight: 600, mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ color: "rgba(255,255,255,0.8)" }}
                    >
                      {item.description}
                    </Typography>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "#B88746",
                        "&:hover": {
                          backgroundColor: "rgba(184, 135, 70, 0.3)"
                        }
                      }}
                    >
                      <ZoomInIcon />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

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

      </Container>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <Modal open={open} onClose={handleClose}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2000,
                cursor: "pointer"
              }}
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  position: "relative"
                }}
              >
                {selectedImage && (
                  <>
                    {selectedImage.type === 'video' ? (
                      <video
                        src={selectedImage.src}
                        controls
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                          borderRadius: "12px",
                          objectFit: "contain",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
                        }}
                      />
                    ) : (
                      <img
                        src={selectedImage.src}
                        alt={selectedImage.title}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "80vh",
                          borderRadius: "12px",
                          objectFit: "contain",
                          boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
                        }}
                      />
                    )}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -60,
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        color: "white"
                      }}
                    >
                      <Typography variant="h6">{selectedImage.title}</Typography>
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {selectedImage.description}
                      </Typography>
                    </Box>
                  </>
                )}
              </motion.div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>

    </Box>
  );
};

export default Mural;
