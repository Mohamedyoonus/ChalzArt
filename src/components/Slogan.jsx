import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const imageFadeIn = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

const dividerGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: "easeInOut" },
  },
};

const imageContainerStyle = {
  border: "2px solid #F2C57F",
  borderRadius: "16px",
  padding: "8px",
  background: "linear-gradient(145deg, rgba(242, 197, 127, 0.05), rgba(255, 255, 255, 0.02))",
  boxShadow: "0 4px 20px rgba(242, 197, 127, 0.15)",
};

const Slogan = () => {
  return (
    <Box
      sx={{
        background: "#ffffff", // ✅ White background
        py: { xs: 6, sm: 8 },
        pt: { xs: 0, sm: 0 , md: 0 },
        color: "#333333", // ✅ Default text color
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container maxWidth="lg">
        {/* Top Divider */}
        <motion.div
          variants={dividerGrow}
          initial="hidden"
          whileInView="visible"
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#B88746",
              my: 6,
              width: "70%",
              mx: "auto",
              opacity: 0.8,
            }}
          />
        </motion.div>

        {/* Section 1 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            mb: { xs: 2, md: 6 },
          }}
        >
          <motion.div
            variants={imageFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={imageContainerStyle}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <motion.img
              src="/assets/slogan1.jpg"
              alt="Slogan Image"
              style={{
                width: "100%",
                maxWidth: "320px",
                borderRadius: "12px",
                display: "block",
              }}
            />
          </motion.div>

          <Box
            sx={{
              maxWidth: "500px",
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 0 },
            }}
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                fontWeight={{ xs: 700, md: 200 }}
                color="#B88746"
                gutterBottom
                sx={{
                  letterSpacing: "1px",
                  fontSize: { xs: "1rem", md: "2.5rem" },
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                Honey Drizzle Serenity in Stillness
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                color="#333333"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                In this hyper-realistic artwork, golden honey gently cascades
                down a girl's face, symbolizing tranquility, warmth, and
                emotional healing. The soft texture and glistening flow evoke a
                sense of peace and inner calm, capturing a moment of mindful
                stillness. This piece invites viewers to slow down, breathe
                deeply, and reconnect with a serene state of being.
              </Typography>
            </motion.div>
          </Box>
        </Box>

        {/* Middle Divider */}
        <motion.div
          variants={dividerGrow}
          initial="hidden"
          whileInView="visible"
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#B88746",
              my: 6,
              width: "70%",
              mx: "auto",
              opacity: 0.8,
            }}
          />
        </motion.div>

        {/* Section 2 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column-reverse", md: "row" },
            gap: 4,
            mb: { xs: 4, md: 6 },
          }}
        >
          <Box
            sx={{
              maxWidth: "500px",
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 0 },
            }}
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                fontWeight={{ xs: 700, md: 200 }}
                color="#B88746"
                gutterBottom
                sx={{
                  letterSpacing: "1px",
                  fontSize: { xs: "1rem", md: "2.5rem" },
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                The Battle Within - Fight for Inner Peace
              </Typography>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                color="#333333"
                sx={{
                  fontSize: { xs: "16px", md: "18px" },
                  opacity: 0.9,
                  lineHeight: 1.6,
                }}
              >
                This realistic pencil drawing shows a man struggling with
                himself. The many hands pulling and pushing represent the
                stress, pain, and confusion he feels inside. It shows how hard
                it can be to find peace when your own mind feels like a
                battlefield. This artwork speaks about the silent fight many men
                go through every day.
              </Typography>
            </motion.div>
          </Box>

          <motion.div
            variants={imageFadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={imageContainerStyle}
            whileHover={{ y: -6, scale: 1.02 }}
          >
            <motion.img
              src="/assets/slogan2.jpg"
              alt="Slogan Image 2"
              style={{
                width: "100%",
                maxWidth: "280px",
                borderRadius: "12px",
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
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#B88746",
              my: 2,
              width: "70%",
              mx: "auto",
              opacity: 0.8,
            }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default Slogan;
