import { useState, useEffect, useRef } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import CustomPortraits from "../components/CustomPortraits";
import LiveSketch from "../components/LiveSketch";
import Mural from "../components/Mural";
import ShoePaint from "../components/ShoePaint";
import Tshirt from "../components/Tshirt";
import Slogan from "../components/Slogan";
import OilPaint from "../components/OilPaint";
import FloatingAd from "../components/FloatingAd";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sectionsRef = useRef([]);

  // Add all section refs to the array
  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const handleMouseMove = (e) => {
    // This will be handled by the FloatingAd component
  };

  const handleMouseUp = () => {
    // This will be handled by the FloatingAd component
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <motion.div ref={addToRefs} custom={0}>
        <Banner />
      </motion.div>
      <motion.div ref={addToRefs} custom={1}>
        <Slogan />
      </motion.div>
      <motion.div ref={addToRefs} custom={2}>
        <CustomPortraits />
      </motion.div>
      <motion.div ref={addToRefs} custom={3}>
        <LiveSketch />
      </motion.div>
      <motion.div ref={addToRefs} custom={4}>
        <Mural />
      </motion.div>
      <motion.div ref={addToRefs} custom={4}>
        <OilPaint />
      </motion.div>
      <motion.div ref={addToRefs} custom={5}>
        <ShoePaint />
      </motion.div>
      <motion.div ref={addToRefs} custom={6}>
        <Tshirt />
      </motion.div>

      {/* Floating Advertisement */}
      <FloatingAd />
    </motion.div>
  );
};

export default Home;