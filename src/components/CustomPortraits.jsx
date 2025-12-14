// UltraEnhancedCustomPortrait.jsx
// Single-file, MUI + Framer Motion premium gallery component
// Features: cinematic entry, parallax, magnetic hover, progressive image loading,
// keyboard + swipe navigation in modal, accessible markup, golden highlights,
// glassmorphism info panel, "View Full Gallery" and "Customize" CTAs.

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Modal,
  Button,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BrushIcon from "@mui/icons-material/Brush";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// --- Media items (demo) ---
const mediaItems = [
  { id: 1, type: "video", src: "/assets/portrait/video1.mp4", title: "Cinematic Portrait" },
  ...Array.from({ length: 7 }, (_, i) => ({
    id: i + 2,
    type: "image",
    src: `/assets/portrait/img${i + 1}.jpg`,
    title: `Portrait ${i + 1}`,
  })),
];

// --- Helper: preload low-res placeholder (simple progressive technique) ---
const useProgressiveImage = (src) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    return () => (img.onload = null);
  }, [src]);
  return loaded;
};

const UltraEnhancedCustomPortrait = ({ className }) => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const isTablet = useMediaQuery("(min-width:600px)");

  // modal state
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const modalRef = useRef(null);

  // subtle parallax based on mouse
  const containerRef = useRef(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isDesktop) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setPointer({ x, y });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isDesktop]);

  // responsive visible items logic
  const getVisibleItems = useCallback(() => {
    if (isDesktop) return { top: mediaItems.slice(0, 4), bottom: mediaItems.slice(4, 8) };
    if (isTablet) return { top: mediaItems.slice(0, 3), bottom: mediaItems.slice(3, 6) };
    return { top: mediaItems.slice(0, 2), bottom: mediaItems.slice(2, 4) };
  }, [isDesktop, isTablet]);

  const { top, bottom } = getVisibleItems();

  // keyboard navigation for modal
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, selectedIndex]);

  // open handlers
  const handleOpen = (index) => {
    setSelectedIndex(index);
    setOpen(true);
    // lock scroll
    document.body.style.overflow = "hidden";
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setSelectedIndex(0), 300);
    document.body.style.overflow = "auto";
  };

  const goNext = () => setSelectedIndex((s) => (s + 1) % mediaItems.length);
  const goPrev = () => setSelectedIndex((s) => (s - 1 + mediaItems.length) % mediaItems.length);

  // magnetic hover effect (card follows cursor slightly)
  const createMagnetic = (e, strength = 18) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px) rotate(${x * 3}deg)`;
  };
  const resetMagnetic = (e) => {
    const el = e.currentTarget;
    el.style.transform = "translate(0px, 0px) rotate(0deg)";
  };

  // render card
  const renderCard = (item, index) => {
    const loaded = useProgressiveImage(item.src);
    const sizeWidth = isDesktop ? 260 : isTablet ? "30%" : "45%";
    const height = isDesktop ? 280 : isTablet ? 220 : 160;

    return (
      <motion.div
        key={item.id}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        style={{ width: isDesktop ? 260 : isTablet ? "30%" : "45%", display: "flex", justifyContent: "center" }}
      >
        <Card
          onClick={() => handleOpen(mediaItems.findIndex((m) => m.id === item.id))}
          onMouseMove={createMagnetic}
          onMouseLeave={resetMagnetic}
          sx={{
            width: "100%",
            height,
            cursor: "pointer",
            borderRadius: "14px",
            overflow: "hidden",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 30px rgba(10,10,10,0.12)",
            transition: "transform 0.32s ease, box-shadow 0.32s ease",
            '&:hover': { boxShadow: '0 20px 40px rgba(10,10,10,0.16)' },
            background: "linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.35))",
            backdropFilter: 'blur(6px) saturate(120%)',
          }}
        >
          {/* golden rim */}
          <Box
            component="span"
            sx={{
              position: "absolute",
              inset: 2,
              borderRadius: "12px",
              padding: 1,
              pointerEvents: "none",
              boxShadow: 'inset 0 0 0 1px rgba(184,135,70,0.12)',
            }}
          />

          {item.type === "video" ? (
            <CardMedia
              component="video"
              src={item.src}
              title={item.title}
              controls={false}
              muted
              loop
              playsInline
              autoPlay
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transformOrigin: "center",
                transition: "transform 0.6s ease",
              }}
            />
          ) : (
            <CardMedia
              component="img"
              image={item.src}
              alt={item.title}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transformOrigin: "center",
                transition: "transform 0.6s ease, filter 0.6s ease",
                filter: loaded ? "none" : "blur(8px) grayscale(20%)",
              }}
            />
          )}

          {/* subtle caption overlay */}
          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              left: 8,
              right: 8,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Typography sx={{ color: "rgba(255,255,255,0.9)", fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }} variant="caption">
              {item.title}
            </Typography>

            <Box sx={{ pointerEvents: 'none' }}>
              <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.84)', fontWeight: 500 }}>
                ✦ Premium
              </Typography>
            </Box>
          </Box>
        </Card>
      </motion.div>
    );
  };

  // Modal content renderer
  const Selected = mediaItems[selectedIndex] || {}; 

  return (
    <Box
      ref={containerRef}
      sx={{
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, sm: 6 },
        background: 'radial-gradient(1200px 500px at 10% 10%, rgba(184,135,70,0.06), transparent 8%), radial-gradient(900px 400px at 90% 90%, rgba(52,64,84,0.02), transparent 10%), #fff',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      {/* Header / Title */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography
          variant={isDesktop ? "h3" : "h4"}
          sx={{
            fontFamily: "'Cinzel', serif",
            color: '#B88746',
            letterSpacing: '1.6px',
            textTransform: 'uppercase',
            fontWeight: 800,
            textAlign: 'center',
            mb: { xs: 2, sm: 3 },
            position: 'relative',
            '&::after': { content: '""', position: 'absolute', width: 64, height: 2, backgroundColor: '#A8743D', bottom: -12, left: '50%', transform: 'translateX(-50%)' }
          }}
        >
          Portraits
        </Typography>
      </motion.div>

      {/* Intro panel (glass) */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08, duration: 0.7 }}>
        <Box sx={{
          width: { xs: '100%', sm: '720px' },
          borderRadius: 3,
          px: { xs: 2, sm: 3 },
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.55), rgba(255,255,255,0.35))',
          boxShadow: '0 6px 22px rgba(10,10,10,0.06)',
          backdropFilter: 'blur(8px) saturate(140%)',
        }}>
          <Box>
            <Typography variant="body2" sx={{ color: '#333', fontWeight: 700 }}>
              Bespoke Portraits — Handcrafted with Golden Touch
            </Typography>
            <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
              Select a piece to view details. Customize or order directly from the studio.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={() => navigate('/myworks#custom-portraits')}
              variant="contained"
              size="small"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#B88746',
                color: '#fff',
                boxShadow: '0 8px 18px rgba(184,135,70,0.16)',
                '&:hover': { backgroundColor: '#A8743D' }
              }}
            >
              View Full Gallery
            </Button>

            <Button component={Link} to="/customize" variant="outlined" size="small" startIcon={<BrushIcon />} sx={{ borderColor: '#B88746', color: '#B88746', '&:hover': { borderColor: '#A8743D', color: '#A8743D' } }}>
              Customize
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Gallery Rows */}
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.6 }}>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, justifyContent: 'center', flexWrap: 'wrap' }}>
            {top.map((it) => renderCard(it))}
          </Box>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }}>
          <Box sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, justifyContent: 'center', flexWrap: 'wrap' }}>
            {bottom.map((it) => renderCard(it))}
          </Box>
        </motion.div>
      </Box>

      {/* Footer CTAs small */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button onClick={() => navigate('/myworks#custom-portraits')} variant="contained" size="small" sx={{ backgroundColor: '#B88746', '&:hover': { backgroundColor: '#A8743D' } }}>
          Explore More
        </Button>

        <Button component={Link} to="/contact" variant="outlined" size="small" sx={{ borderColor: '#B88746', color: '#B88746' }}>
          Contact Studio
        </Button>
      </Box>

      {/* Modal (full-screen cinematic) */}
      <AnimatePresence>
        {open && (
          <Modal open={open} onClose={handleClose} closeAfterTransition>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{ outline: 'none' }}
            >
              <Box sx={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1400 }}>
                {/* Backdrop */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.92 }} exit={{ opacity: 0 }} style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 30%, rgba(184,135,70,0.06), transparent 8%), rgba(0,0,0,0.78)' }} />

                {/* Content container */}
                <motion.div initial={{ scale: 0.98, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }} transition={{ duration: 0.36 }} style={{ position: 'relative', width: '92vw', maxWidth: 1100, height: '82vh', display: 'flex', flexDirection: 'column', borderRadius: 14, overflow: 'hidden' }}>

                  {/* Top controls */}
                  <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1, zIndex: 1600 }}>
                    <Tooltip title="Close (Esc)">
                      <IconButton onClick={handleClose} sx={{ background: 'rgba(255,255,255,0.06)', color: '#fff' }}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Main media area */}
                  <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {/* Prev/Next nav */}
                    <IconButton onClick={goPrev} sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 1500, background: 'rgba(0,0,0,0.28)', color: '#fff' }}>
                      <ArrowBackIosNewIcon />
                    </IconButton>

                    <IconButton onClick={goNext} sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', zIndex: 1500, background: 'rgba(0,0,0,0.28)', color: '#fff' }}>
                      <ArrowForwardIosIcon />
                    </IconButton>

                    {/* Selected media */}
                    <motion.div key={Selected.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.36 }} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {Selected.type === 'video' ? (
                        <video src={Selected.src} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }} />
                      ) : (
                        <img src={Selected.src} alt={Selected.title} style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 10 }} />
                      )}
                    </motion.div>
                  </Box>

                  {/* Footer info + thumbnails */}
                  <Box sx={{ height: 110, px: 2, py: 1.25, display: 'flex', alignItems: 'center', gap: 2, background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0.02))' }}>
                    {/* Info */}
                    <Box sx={{ minWidth: 260, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                      <Typography sx={{ color: '#fff', fontWeight: 800 }}>{Selected.title}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>Premium portrait — handcrafted — 1:1 commission available</Typography>
                      <Box sx={{ mt: 0.5, display: 'flex', gap: 1 }}>
                        <Button component={Link} to="/customize" size="small" variant="contained" sx={{ backgroundColor: '#B88746', '&:hover': { backgroundColor: '#A8743D' } }}>Order / Customize</Button>
                        <Button size="small" variant="outlined" href={Selected.src} target="_blank" rel="noreferrer" sx={{ color: '#fff', borderColor: 'rgba(255,255,255,0.14)' }}>Open</Button>
                      </Box>
                    </Box>

                    {/* thumbnails strip */}
                    <Box sx={{ flex: 1, overflowX: 'auto', display: 'flex', gap: 1, alignItems: 'center', pr: 1 }}>
                      {mediaItems.map((m, i) => (
                        <Box key={m.id} onClick={() => setSelectedIndex(i)} sx={{ cursor: 'pointer', minWidth: 96, borderRadius: 1, overflow: 'hidden', boxShadow: selectedIndex === i ? '0 6px 18px rgba(184,135,70,0.18)' : 'none', border: selectedIndex === i ? '2px solid rgba(184,135,70,0.22)' : '2px solid transparent' }}>
                          {m.type === 'video' ? (
                            <video src={m.src} style={{ width: 96, height: 64, objectFit: 'cover', display: 'block' }} muted />
                          ) : (
                            <img src={m.src} alt={m.title} style={{ width: 96, height: 64, objectFit: 'cover', display: 'block' }} />
                          )}
                        </Box>
                      ))}
                    </Box>

                    {/* step indicator */}
                    <Box sx={{ width: 120, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700 }}>{selectedIndex + 1}/{mediaItems.length}</Typography>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{Selected.title}</Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default UltraEnhancedCustomPortrait;
