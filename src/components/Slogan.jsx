import React from "react";
import { Box, Typography, Container, Divider } from "@mui/material";
import { motion } from "framer-motion";

const Slogan = () => {
  return (
    <Box
      sx={{
        background:
          "black radial-gradient(circle at center, #111 0%, #000 100%)",
        py: { xs: 6, sm: 8 },
        color: "#fff",
        overflow: "hidden",
        position: "relative",
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(to bottom right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
          zIndex: -1,
        },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#F2C57F",
              my: 6,
              width: "60%",
              mx: "auto",
              opacity: 0.3,
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
            mb: { xs: 4, md: 6 },
          }}
        >
          <motion.img
            src="/assets/slogan1.jpg"
            alt="Slogan Image"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              width: "80%",
              maxWidth: "350px",
              borderRadius: "12px",
              boxShadow: "0px 6px 12px rgba(212, 163, 115, 0.8)",
              height: "auto",
              maxHeight: "450px",
              transition: "transform 0.4s ease-in-out",
            }}
            whileHover={{ y: -8, scale: 1.02 }}
          />

          <Box
            sx={{
              maxWidth: "500px",
              textAlign: { xs: "center", md: "left" },
              px: { xs: 2, md: 0 },
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h1"
                fontWeight="700"
                color="#F2C57F"
                gutterBottom
                sx={{
                  letterSpacing: "1px",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                Honey Drizzle Serenity in Stillness{" "}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                color="#E0E0E0"
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

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#F2C57F",
              my: 6,
              width: "60%",
              mx: "auto",
              opacity: 0.3,
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h1"
                fontWeight="700"
                color="#F2C57F"
                gutterBottom
                sx={{
                  letterSpacing: "1px",
                  fontSize: { xs: "2rem", md: "2.5rem" },
                  textShadow: "2px 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                The Battle Within - Fight for Inner Peace
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="body1"
                color="#E0E0E0"
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
                go through every day
              </Typography>
            </motion.div>
          </Box>

          <motion.img
            src="/assets/slogan2.jpg"
            alt="Slogan Image 2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              width: "80%",
              maxWidth: "300px",
              borderRadius: "12px",
              boxShadow: "0px 6px 12px rgba(212, 163, 115, 0.8)",
              height: "auto",
              maxHeight: "400px",
              transition: "transform 0.4s ease-in-out",
            }}
            whileHover={{ y: -8, scale: 1.02 }}
          />
        </Box>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          style={{ originX: 0 }}
        >
          <Divider
            sx={{
              borderColor: "#F2C57F",
              my: 6,
              width: "60%",
              mx: "auto",
              opacity: 0.3,
            }}
          />
        </motion.div>
      </Container>
    </Box>
  );
};

export default Slogan;
