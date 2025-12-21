import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageFadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const dividerGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

const imageContainerStyle = {
  border: "1.5px solid #E6C07B",
  borderRadius: "18px",
  padding: "10px",
  background:
    "linear-gradient(145deg, rgba(184,135,70,0.08), rgba(255,255,255,0.8))",
  boxShadow: "0 10px 30px rgba(184,135,70,0.18)",
};

const Slogan = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, #ffffff 0%, #faf7f2 50%, #ffffff 100%)",
        py: { xs: 5, sm: 8 },
        color: "#333",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        {/* Top Divider */}
        <motion.div
          variants={dividerGrow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#B88746",
              my: { xs: 3, sm: 5 },
              width: "60%",
              mx: "auto",
              opacity: 0.7,
            }}
          />
        </motion.div>

        {/* ===== Section 1 ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            mb: { xs: 4, md: 8 },
          }}
        >
          <motion.div
            variants={imageFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={imageContainerStyle}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <motion.img
              src="/assets/slogan1.jpg"
              alt="Honey Drizzle Artwork"
              style={{
                width: "100%",
                maxWidth: "340px",
                borderRadius: "14px",
                display: "block",
              }}
            />
          </motion.div>

          <Box
            sx={{
              maxWidth: 520,
              textAlign: { xs: "center", md: "left" },
              px: { xs: 1.5, md: 0 },
            }}
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  color: "#B88746",
                  mb: 1.5,
                  fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.4rem" },
                  letterSpacing: "0.5px",
                }}
              >
                Honey Drizzle – Serenity in Stillness
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                  lineHeight: 1.7,
                  color: "#444",
                }}
              >
                In this hyper-realistic artwork, golden honey gently cascades down
                a girl's face, symbolizing tranquility, warmth, and emotional
                healing. The glistening flow invites viewers to pause, breathe,
                and reconnect with a moment of mindful stillness.
              </Typography>
            </motion.div>
          </Box>
        </Box>

        {/* Middle Divider */}
        <motion.div
          variants={dividerGrow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#B88746",
              my: { xs: 3, sm: 5 },
              width: "60%",
              mx: "auto",
              opacity: 0.7,
            }}
          />
        </motion.div>

        {/* ===== Section 2 ===== */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 3, md: 6 },
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              maxWidth: 520,
              textAlign: { xs: "center", md: "left" },
              px: { xs: 1.5, md: 0 },
            }}
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  color: "#B88746",
                  mb: 1.5,
                  fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.4rem" },
                  letterSpacing: "0.5px",
                }}
              >
                The Battle Within – Fight for Inner Peace
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "0.95rem", sm: "1.05rem", md: "1.1rem" },
                  lineHeight: 1.7,
                  color: "#444",
                }}
              >
                This realistic pencil artwork portrays the silent struggle of a
                man against his inner chaos. The grasping hands symbolize
                pressure, conflict, and emotional weight — reflecting the unseen
                battles many face while seeking peace within.
              </Typography>
            </motion.div>
          </Box>

          <motion.div
            variants={imageFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={imageContainerStyle}
            whileHover={{ y: -8, scale: 1.03 }}
          >
            <motion.img
              src="/assets/slogan2.jpg"
              alt="Inner Peace Artwork"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "14px",
                display: "block",
              }}
            />
          </motion.div>
        </Box>

        {/* Bottom Divider */}
        <motion.div
          variants={dividerGrow}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#B88746",
              my: { xs: 2, sm: 4 },
              width: "60%",
              mx: "auto",
              opacity: 0.7,
            }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default Slogan;
