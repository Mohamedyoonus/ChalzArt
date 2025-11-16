// components/AdvancedLoadingScreen.jsx
import React, { useState, useEffect } from 'react';
import { Box, LinearProgress, Typography, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const AdvancedLoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { text: 'Initializing portfolio...', duration: 300, progress: 20 },
    { text: 'Loading artworks...', duration: 300, progress: 45 },
    { text: 'Preparing gallery...', duration: 600, progress: 70 },
    { text: 'Final touches...', duration: 600, progress: 90 },
    { text: 'Ready!', duration: 300, progress: 100 }
  ];

  useEffect(() => {
    const loadNextStep = (stepIndex) => {
      if (stepIndex >= loadingSteps.length) {
        setIsComplete(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
        return;
      }

      const step = loadingSteps[stepIndex];
      setProgress(step.progress);
      setCurrentStep(stepIndex);

      setTimeout(() => {
        loadNextStep(stepIndex + 1);
      }, step.duration);
    };

    loadNextStep(0);

    const fallbackTimer = setTimeout(() => {
      setIsComplete(true);
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: "100vw", height: "100vh" }}
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
          px: { xs: 1.5, sm: 3 },   // smaller padding on mobile
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            width: '100%',
            maxWidth: '230px', // 📱 Smaller on mobile
            textAlign: 'center'
          }}
        >
          {/* Logo Section */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Box
              component="img"
              src="/assets/chalzfavicon.svg"
              alt="Chalz Art Logo"
              sx={{
                width: { xs: '70px', sm: '90px', md: '110px' },
                height: 'auto',
                mx: 'auto',
                mb: 2
              }}
            />
          </motion.div>

          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontStyle: 'italic',
              fontSize: { xs: '0.85rem', sm: '0.9rem' },
              mb: { xs: 2.5, sm: 3 },
            }}
          >
            Creative Artworks & Portraits
          </Typography>

          {/* Progress Bar */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Box sx={{ width: '100%', mb: { xs: 1.5, sm: 2 }, position: 'relative' }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: { xs: 5, sm: 6 },
                  borderRadius: 3,
                  backgroundColor: '#eee',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#B88746',
                    borderRadius: 3,
                    transition: 'transform 0.4s ease',
                  },
                }}
              />

              <Typography
                variant="caption"
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: -18,
                  color: '#B88746',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.7rem', sm: '0.75rem' }
                }}
              >
                {progress}%
              </Typography>
            </Box>
          </motion.div>

          {/* Loading Text */}
          <Box
            sx={{
              height: { xs: 36, sm: 40 },
              mb: { xs: 2, sm: 3 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: '#555',
                    fontWeight: 500,
                    fontSize: { xs: '0.78rem', sm: '0.9rem' },
                    textAlign: 'center',
                  }}
                >
                  {loadingSteps[currentStep]?.text}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* Spinner */}
         <motion.div
  animate={{
    rotate: 360,
    scale: isComplete ? 0.9 : 1,
  }}
  transition={{
    rotate: { 
      duration: 1.6, 
      repeat: Infinity, 
      ease: "linear",
      repeatType: "loop"
    },
    scale: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }}
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }}
>
  <motion.div
    animate={
      isComplete ? {
        scale: [1, 1.1, 1],
        opacity: [1, 0.8, 1]
      } : {}
    }
    transition={
      isComplete ? {
        scale: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        },
        opacity: {
          duration: 1.2,
          repeat: Infinity, 
          ease: "easeInOut"
        }
      } : {}
    }
  >
    <CircularProgress
      size={isComplete ? 34 : 32}
      thickness={isComplete ? 3 : 4}
      variant={isComplete ? "determinate" : "indeterminate"}
      value={isComplete ? 100 : undefined}
      sx={{ 
        color: "#B88746", 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '& .MuiCircularProgress-circle': {
          transition: 'stroke-dashoffset 0.3s ease'
        }
      }}
    />
  </motion.div>
</motion.div>

          {/* Step Indicator */}
          <Typography
            variant="caption"
            sx={{
              color: '#888',
              mt: 2,
              fontSize: { xs: '0.6rem', sm: '0.7rem' },
              display: 'block'
            }}
          >
            Step {currentStep + 1} of {loadingSteps.length}
          </Typography>
        </motion.div>

        {/* Background Decorative Icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07, scale: [1, 1.1, 1] }}
          transition={{ delay: 0.8, duration: 3, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '7rem',
            color: '#B88746',
            zIndex: -1,
            userSelect: 'none'
          }}
        >
          🎨
        </motion.div>
      </Box>
    </motion.div>
  );
};

export default AdvancedLoadingScreen;
