// Enhanced AdvancedLoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedLoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const loadingSteps = [
    { text: 'Initializing portfolio...', duration: 550, progress: 18 },
    { text: 'Loading artworks...', duration: 550, progress: 45 },
    { text: 'Preparing gallery...', duration: 650, progress: 72 },
    { text: 'Final touches...', duration: 600, progress: 90 },
    { text: 'Ready!', duration: 450, progress: 100 }
  ];

  useEffect(() => {
    const loadNextStep = (stepIndex) => {
      if (stepIndex >= loadingSteps.length) {
        setIsComplete(true);
        setTimeout(() => setFadeOut(true), 300);
        setTimeout(() => onLoadingComplete(), 900);
        return;
      }

      const step = loadingSteps[stepIndex];
      setProgress(step.progress);
      setCurrentStep(stepIndex);

      setTimeout(() => loadNextStep(stepIndex + 1), step.duration);
    };

    loadNextStep(0);

    const fallbackTimer = setTimeout(() => onLoadingComplete(), 5500);
    return () => clearTimeout(fallbackTimer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          px: { xs: 1.5, sm: 3 },
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', maxWidth: '260px', textAlign: 'center' }}
        >
          {/* Logo */}
          <motion.div
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Box
              component="img"
              src="/assets/chalzfavicon.svg"
              alt="Chalz Art Logo"
              sx={{ width: { xs: '75px', sm: '95px', md: '115px' }, mb: 2, mx: 'auto' }}
            />
          </motion.div>

          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontStyle: 'italic',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              mb: { xs: 3, sm: 3.5 },
            }}
          >
            Creative Artworks & Portraits
          </Typography>

          {/* Progress Bar */}
          <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 1.1, repeat: Infinity }}>
            <Box sx={{ width: '100%', mb: { xs: 1.5, sm: 2 }, position: 'relative' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: { xs: 6, sm: 7 },
                  borderRadius: 4,
                  backgroundColor: '#eee',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#B88746',
                    borderRadius: 4,
                  },
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: -20,
                  color: '#B88746',
                  fontWeight: 'bold',
                }}
              >
                {progress}%
              </Typography>
            </Box>
          </motion.div>

          {/* Loading Text */}
          <Box sx={{ height: 40, mb: 3, display: 'flex', alignItems: 'center' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <Typography variant="body1" sx={{ color: '#555', fontWeight: 500 }}>
                  {loadingSteps[currentStep]?.text}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              animate={
                isComplete
                  ? { scale: [1, 1.15, 1], opacity: [1, 0.85, 1] }
                  : {}
              }
              transition={
                isComplete
                  ? { repeat: Infinity, duration: 1.1, ease: 'easeInOut' }
                  : {}
              }
            >
              <CircularProgress
                size={isComplete ? 38 : 34}
                thickness={isComplete ? 3 : 4}
                variant={isComplete ? 'determinate' : 'indeterminate'}
                value={isComplete ? 100 : undefined}
                sx={{ color: '#B88746', transition: '0.3s ease' }}
              />
            </motion.div>
          </motion.div>

          <Typography variant="caption" sx={{ color: '#888', mt: 2 }}>
            Step {currentStep + 1} of {loadingSteps.length}
          </Typography>
        </motion.div>

        {/* Floating Decorative Background Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08, y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            fontSize: '8rem',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#B88746',
          }}
        >
          🎨
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default AdvancedLoadingScreen;