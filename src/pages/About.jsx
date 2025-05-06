import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { motion } from "framer-motion";

// Animation for text fade-in
const textFadeVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const paragraphs = [
    `Hi, I'm Charles Simon a passionate artist and founder of Chalz Art. I specialize in realistic pencil portraits, live speed sketches, watercolor paintings, and custom artworks for any occasion. With years of experience and a deep love for art, I bring life to every drawing with fine details and personal touch. I also offer online and offline drawing classes for beginners and aspiring artists.`,

    `Whether you're looking for a unique gift or want to learn art, I'm here to help you make it special.`,

    `Thank you for visiting and supporting handmade art!`,
  ];

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 5 },
        pb: { xs: 0, sm: 0, md: -3 },
        px: { xs: 2, sm: 3 },
        minHeight: "100vh",
        backgroundColor: "white",
        backgroundImage:
          "white",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-20%",
          width: "80vh",
          height: "80vh",
          background:
            "white",
          borderRadius: "50%",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={6}
          alignItems="center"
          justifyContent="space-between"
          sx={{ flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Image Section */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Box
                sx={{
                  position: "relative",
                  mx: "auto",
                  perspective: "1000px",
                  maxWidth: 450,
                  height: "100%",
                }}
              >
                <motion.div
                  whileHover={
                    isMobile
                      ? {}
                      : {
                          rotateY: 0,
                          scale: 1.03,
                          transition: { duration: 0.4 },
                        }
                  }
                  initial={{ rotateY: isMobile ? 0 : 5 }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      maxHeight: { xs: 300, md: 500 },
                      boxShadow: "0 25px 50px -12px rgba(184, 135, 70, 0.25)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "#111",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="/assets/about.jpg"
                      alt="Artist Portrait"
                      sx={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        filter: "brightness(0.9) contrast(1.05)",
                      }}
                    />
                  </Card>
                </motion.div>

                {/* Decorative border frame */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    left: -20,
                    width: "100%",
                    height: "100%",
                    border: "2px solid rgba(184, 135, 70, 0.4)",
                    borderRadius: "8px",
                    zIndex: -1,
                    display: { xs: "none", md: "block" },
                  }}
                />
              </Box>
            </motion.div>
          </Grid>

          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                maxWidth: 700,
                mx: { xs: "auto", md: 0 },
                textAlign: { xs: "center", md: "left" },
                pl: { md: 4 },
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: "#B88746",
                    fontWeight: 300,
                    letterSpacing: "1px",
                    mb: 4,
                    position: "relative",
                    display: "inline-block",
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3rem",
                    },
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: "60%",
                      height: "2px",
                      bottom: -8,
                      left: { xs: "20%", md: 0 },
                      backgroundColor: "#A8743D",
                    },
                  }}
                >
                  About The Artist
                </Typography>
              </motion.div>

              {paragraphs.map((text, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  variants={textFadeVariant}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: {
                        xs: "0.95rem",
                        sm: "1rem",
                        md: "1.1rem",
                      },
                      lineHeight: 1.8,
                      color: "black",
                      fontFamily: "'Merriweather', serif",
                      fontWeight: 300,
                      letterSpacing: "0.3px",
                      textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                    }}
                  >
                    {text}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
