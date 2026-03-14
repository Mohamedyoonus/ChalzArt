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

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const paragraphs = [
    `Charles Simon is a professional artist working mainly in realistic pencil drawing and oil painting. The focus is on creating strong, real-looking artworks that hold value over time.`,
    `Along with original paintings and custom commissions, Chalz Art also offers drawing and painting classes to help others build real skills and confidence.`,
   ,
  ];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fefefe",
        backgroundImage: `
          radial-gradient(circle at 15% 50%, rgba(184, 135, 70, 0.05) 0%, transparent 55%),
          radial-gradient(circle at 85% 30%, rgba(168, 116, 61, 0.03) 0%, transparent 55%)
        `,
        overflow: "hidden",
        py: { xs: 4, sm: 6, md: 8 },
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Floating decorative elements */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <Box
          component={motion.div}
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          sx={{
            position: "absolute",
            top: "10%",
            left: "8%",
            width: "60px",
            height: "3px",
            background: "linear-gradient(90deg, transparent, #B88746, transparent)",
            transform: "rotate(-15deg)",
            opacity: 0.2,
          }}
        />
        <Box
          component={motion.div}
          variants={floatAnimation}
          initial="initial"
          animate="animate"
          transition={{ delay: 2 }}
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "12%",
            width: "40px",
            height: "2px",
            background: "linear-gradient(90deg, transparent, #A8743D, transparent)",
            transform: "rotate(25deg)",
            opacity: 0.15,
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="center"
          sx={{
            flexDirection: { xs: "column-reverse", md: "row" },
          }}
        >
          {/* Text Section - Comes first on mobile, second on desktop */}
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ 
              maxWidth: 700, 
              mx: "auto",
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, sm: 4 }
            }}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#1a1a1a",
                    fontWeight: 300,
                    mb: 4,
                    fontSize: {
                      xs: "2rem",
                      sm: "2.5rem",
                      md: "3rem",
                    },
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      left: { xs: "50%", md: 0 },
                      transform: { xs: "translateX(-50%)", md: "none" },
                      bottom: -12,
                      width: "100px",
                      height: "2px",
                      backgroundColor: "#B88746",
                      opacity: 0.6,
                    },
                  }}
                >
                  About The Artist
                </Typography>
              </motion.div>

              {paragraphs.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Typography
                    variant="body1"
                    paragraph
                    sx={{
                      fontSize: {
                        xs: "1rem",
                        sm: "1.1rem",
                        md: "1.2rem",
                      },
                      lineHeight: 1.8,
                      color: "#444",
                      fontFamily: "'Merriweather', serif",
                      fontWeight: 300,
                      mb: 3,
                      textAlign: { xs: "center", md: "left" },
                    }}
                  >
                    {text}
                  </Typography>
                </motion.div>
              ))}
            </Box>
          </Grid>

          {/* Image Section - Comes second on mobile, first on desktop */}
          <Grid item xs={12} md={6} lg={6}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={!isMobile ? { scale: 1.02 } : {}}
            >
              <Box
                sx={{
                  position: "relative",
                  perspective: "1000px",
                  maxWidth: 500,
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Floating container */}
                <Box
                  component={motion.div}
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  sx={{
                    position: "relative",
                    width: { xs: "280px", sm: "350px", md: "400px" },
                    height: { xs: "280px", sm: "350px", md: "400px" },
                  }}
                >
                  {/* Main Image with floating effect */}
                  <Card
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      boxShadow: `
                        0 25px 50px -12px rgba(0,0,0,0.25),
                        0 15px 30px rgba(184, 135, 70, 0.3)
                      `,
                      border: "4px solid white",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(45deg, rgba(184,135,70,0.1) 0%, rgba(168,116,61,0.05) 100%)",
                        zIndex: 1,
                        pointerEvents: "none",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image="/assets/about.jpg"
                      alt="Charles Simon - Professional Artist"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "transform 0.8s ease",
                        "&:hover": {
                          transform: !isMobile ? "scale(1.05)" : "none",
                        },
                      }}
                    />
                  </Card>

                  {/* Outer decorative ring */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-20px",
                      left: "-20px",
                      right: "-20px",
                      bottom: "-20px",
                      border: "2px solid rgba(184, 135, 70, 0.2)",
                      borderRadius: "50%",
                      zIndex: -1,
                      animation: "rotate 20s linear infinite",
                      "@keyframes rotate": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  />

                  {/* Inner decorative ring */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-30px",
                      left: "-30px",
                      right: "-30px",
                      bottom: "-30px",
                      border: "1px solid rgba(168, 116, 61, 0.1)",
                      borderRadius: "50%",
                      zIndex: -2,
                      animation: "rotateReverse 25s linear infinite",
                      "@keyframes rotateReverse": {
                        "0%": { transform: "rotate(360deg)" },
                        "100%": { transform: "rotate(0deg)" },
                      },
                    }}
                  />

                  {/* Floating dots around the image */}
                  {[...Array(8)].map((_, index) => (
                    <Box
                      key={index}
                      component={motion.div}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      sx={{
                        position: "absolute",
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#B88746",
                        borderRadius: "50%",
                        top: `${Math.sin((index * Math.PI) / 4) * 220}px`,
                        left: `${Math.cos((index * Math.PI) / 4) * 220}px`,
                        transform: "translate(-50%, -50%)",
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;