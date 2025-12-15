import React, { useState, useCallback, useMemo, lazy, Suspense, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  useTheme,
  useMediaQuery,
  Fade,
  Slide,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningIcon from "@mui/icons-material/Warning";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import CloseIcon from "@mui/icons-material/Close";
import { keyframes } from "@mui/system";

// Lazy load toast container
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({ default: module.ToastContainer }))
);
const toast = lazy(() =>
  import("react-toastify").then((module) => ({ default: module.toast }))
);

// Animations
const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Customize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });
  
  const [artOptions, setArtOptions] = useState({
    type: "none",
    size: "none", 
    material: "none",
  });
  
  const [liveSketch, setLiveSketch] = useState({
    place: "",
    date: "",
    duration: "",
    customDuration: "",
  });
  
  const [mural, setMural] = useState({
    wallSize: "",
    surfaceType: "",
    paintingType: "design",
  });
  
  const [tshirt, setTshirt] = useState({
    size: "",
    color: "",
    design: "",
    description: "",
  });
  
  const [shoe, setShoe] = useState({
    type: "",
    size: "",
    design: "",
    description: "",
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState("art");

  // Smooth scroll effect
  useEffect(() => {
    if (expandedAccordion) {
      const element = document.getElementById(expandedAccordion);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    }
  }, [expandedAccordion]);

  // Handlers
  const handlePersonalInfoChange = useCallback((field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  // Fast selection handler - no delay
  const handleArtOptionChange = useCallback((field, value) => {
    const newValue = value === artOptions[field] ? "none" : value;
    
    setArtOptions(prev => ({ ...prev, [field]: newValue }));
    
    if (field === "size" && value !== "custom") {
      setCustomSize("");
    }
  }, [artOptions]);

  const handleLiveSketchChange = useCallback((field, value) => {
    const newValue = field === "duration" && value === liveSketch.duration ? "none" : value;
    setLiveSketch(prev => ({ 
      ...prev, 
      [field]: newValue,
      ...(field === "duration" && value !== "custom" ? { customDuration: "" } : {})
    }));
  }, [liveSketch.duration]);

  const handleMuralChange = useCallback((field, value) => {
    const newValue = field === "surfaceType" && value === mural.surfaceType ? "none" : value;
    setMural(prev => ({ 
      ...prev, 
      [field]: newValue,
      ...(field === "surfaceType" && value !== "custom" ? { customLocation: "" } : {})
    }));
  }, [mural.surfaceType]);

  const handleAccordionChange = useCallback((panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  }, []);

  const showError = useCallback((message) => {
    setErrorMessage(message);
    setShowErrorDialog(true);
  }, []);

  const validateArtOptions = useCallback(() => {
    if (artOptions.type !== "none") {
      if (artOptions.size === "none") {
        showError("Please select a size for your artwork");
        return false;
      }
      
      if (artOptions.material === "none") {
        showError("Please select a material for your artwork");
        return false;
      }
      
      if (artOptions.size === "custom" && !customSize.trim()) {
        showError("Please enter your custom size dimensions");
        return false;
      }
    }
    
    return true;
  }, [artOptions, customSize, showError]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      // Basic validation
      if (!personalInfo.name.trim()) {
        showError("Please enter your name");
        return;
      }

      if (!personalInfo.phone.trim()) {
        showError("Please enter your phone number");
        return;
      }

      // Validate art options
      if (!validateArtOptions()) return;

      // Create message
      const createSection = (title, fields) => {
        const filledFields = Object.entries(fields)
          .filter(([_, value]) => value && value.trim() !== "" && value !== "none")
          .map(([key, value]) => `• ${key}: ${value.trim()}`);
        if (filledFields.length === 0) return "";
        return `\n\n${title}\n${filledFields.join("\n")}`;
      };

      let message = `Hi, here are my custom artwork details:`;
      
      message += createSection("Personal Information:", {
        Name: personalInfo.name,
        Phone: personalInfo.phone,
        ...(personalInfo.address.trim() && { Address: personalInfo.address }),
      });

      // Include art options only if selected
      if (artOptions.type !== "none") {
        const sizeValue = artOptions.size === "custom" ? customSize : artOptions.size;
        
        message += createSection("Art Details:", {
          "Art Type": artOptions.type,
          "Size": sizeValue,
          "Material": artOptions.material,
        });
      }

      // Live Sketch with duration
      const durationValue = liveSketch.duration === "custom" && liveSketch.customDuration.trim() ? 
        liveSketch.customDuration : liveSketch.duration;
      
      if (liveSketch.place.trim() || liveSketch.date.trim() || durationValue !== "none") {
        message += createSection("Live Sketch Event:", {
          Place: liveSketch.place,
          Date: liveSketch.date,
          ...(durationValue !== "none" && { Duration: durationValue }),
        });
      }

      // Mural
      if (mural.wallSize.trim() || mural.surfaceType !== "none") {
        message += createSection("Mural Painting:", {
          "Wall Size": mural.wallSize,
          ...(mural.surfaceType !== "none" && { "Surface Type": mural.surfaceType }),
          "Painting Type": mural.paintingType === "design" ? "Design Painting" : "Mural Art",
        });
      }

      // Optional sections
      if (Object.values(tshirt).some(val => val.trim())) {
        message += createSection("T-Shirt Design:", tshirt);
      }
      
      if (Object.values(shoe).some(val => val.trim())) {
        message += createSection("Shoe Customization:", shoe);
      }

      message += `\n\nThank you!`;

      const whatsappURL = `https://wa.me/9176425811?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappURL, "_blank");
      setSubmitted(true);
      
      // Show success toast
      import("react-toastify").then(module => {
        module.toast.success("Opening WhatsApp...", {
          position: "top-right",
          autoClose: 3000,
        });
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
      }, 3000);
      
    } catch (error) {
      setIsSubmitting(false);
      showError("An error occurred. Please try again.");
    }
  }, [personalInfo, artOptions, liveSketch, mural, tshirt, shoe, customSize, validateArtOptions, showError]);

  // Art Options Configuration
  const artOptionsConfig = useMemo(() => [
    {
      id: "type",
      label: "🎨 Art Type",
      field: "type",
      options: [
        { value: "Realistic Pencil Sketch", label: "Realistic", icon: "✏️", description: "Detailed sketch" },
        { value: "Cartoon Sketch", label: "Cartoon", icon: "🎨", description: "Fun style" },
        { value: "Acrylic Painting", label: "Acrylic", icon: "🖌️", description: "Vibrant colors" },
        { value: "Oil Painting", label: "Oil", icon: "🎨", description: "Classic paint" },
        { value: "Watercolor", label: "Watercolor", icon: "💧", description: "Soft effect" },
      ],
    },
    {
      id: "size",
      label: "📏 Size",
      field: "size",
      options: [
        { value: "A4", label: "A4", icon: "📄", description: "21x29.7cm" },
        { value: "A3", label: "A3", icon: "🖼️", description: "29.7x42cm" },
        { value: "A2", label: "A2", icon: "📋", description: "42x59.4cm" },
        { value: "custom", label: "Custom", icon: "⚙️", description: "Your size" },
      ],
      disabled: artOptions.type === "none"
    },
    {
      id: "material",
      label: "🖌️ Material",
      field: "material",
      options: [
        { value: "Paper", label: "Paper", icon: "📜", description: "Art paper" },
        { value: "Canvas", label: "Canvas", icon: "🖌️", description: "Canvas board" },
      ],
      disabled: artOptions.type === "none"
    },
  ], [artOptions.type]);

  // Live Sketch Duration Options
  const durationOptions = [
    { value: "3hr", label: "3 Hours", description: "Quick sketch session" },
    { value: "6hr", label: "6 Hours", description: "Half day session" },
    { value: "one_day", label: "1 Day", description: "Full day session" },
    { value: "custom", label: "Custom", description: "Specify duration" },
  ];

  // Mural Surface/Location Options
  const surfaceOptions = [
    { value: "room_wall", label: "Room Wall", description: "Paint on room wall" },
    { value: "restaurant", label: "Restaurant", description: "Paint on restaurant wall" },
    { value: "cafe", label: "Cafe", description: "Paint on cafe wall" },
    { value: "street_wall", label: "Street Wall", description: "Paint on street wall" },
    { value: "custom", label: "Other", description: "Other location" },
  ];

  // Check if art type is selected
  const isArtTypeSelected = useMemo(() => artOptions.type !== "none", [artOptions.type]);

  // Handle WhatsApp catalog click - opens directly in new tab
  const handleWhatsAppCatalogClick = () => {
    window.open("https://wa.me/c/919176425811", "_blank");
  };

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2, md: 3, lg: 4 },
        maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "1200px" },
        margin: "0 auto",
        minHeight: "100vh",
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
        animation: `${fadeIn} 0.5s ease-out`,
      }}
    >
      {/* Header */}
      <Slide direction="down" in timeout={300}>
        <Box sx={{ 
          mb: { xs: 2, sm: 3, md: 4 },
          textAlign: "center"
        }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              fontWeight: 600,
              color: "#B88746",
              fontFamily: "'Playfair Display', serif",
              mb: 1,
              fontSize: {
                xs: "1.25rem",
                sm: "1.5rem",
                md: "1.75rem",
                lg: "2rem"
              }
            }}
          >
            Custom Art Request
          </Typography>

          {/* View Samples Button - Opens WhatsApp catalog directly */}
          <Button
            variant="outlined"
            startIcon={<ViewCarouselIcon />}
            onClick={handleWhatsAppCatalogClick}
            size={isMobile ? "small" : "medium"}
            sx={{
              borderRadius: "25px",
              color: "#B88746",
              borderColor: "#B88746",
              '&:hover': {
                backgroundColor: "rgba(184, 135, 70, 0.1)",
                borderColor: "#B88746",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(184, 135, 70, 0.2)",
              },
              transition: "all 0.3s ease",
              px: { xs: 2, sm: 3 },
              py: 0.75,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            View Samples
          </Button>
        </Box>
      </Slide>

      {/* Success Alert */}
      <Fade in={submitted} timeout={300}>
        <Box sx={{ mb: 2 }}>
          <Alert 
            severity="success" 
            sx={{ 
              borderRadius: 2,
              animation: `${fadeIn} 0.5s ease`,
            }}
          >
            Opening WhatsApp with your details...
          </Alert>
        </Box>
      </Fade>

      {/* Error Dialog */}
      <Dialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        maxWidth="xs"
        fullWidth
        TransitionComponent={Fade}
      >
        <DialogTitle sx={{ 
          color: "#d32f2f", 
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WarningIcon />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Please Complete Selection
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setShowErrorDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ py: 2 }}>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions sx={{ py: 2, px: 3 }}>
          <Button 
            onClick={() => setShowErrorDialog(false)}
            variant="contained"
            sx={{ 
              backgroundColor: "#B88746",
              '&:hover': {
                backgroundColor: "#A8743D",
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Personal Information */}
      <Zoom in timeout={400}>
        <Paper 
          id="personal-info"
          elevation={0}
          sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            mb: { xs: 2, sm: 3, md: 4 },
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
            backgroundColor: "white",
            transition: "all 0.3s ease",
            '&:hover': {
              boxShadow: 2,
            }
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ 
            color: "#B88746", 
            mb: 3,
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}>
            👤 Personal Information
          </Typography>
          <Grid container spacing={2}>
            {[
              { field: "name", label: "Full Name *", placeholder: "Enter your full name", xs: 12, sm: 12, md: 6 },
              { field: "phone", label: "Phone Number *", placeholder: "Enter your phone number", xs: 12, sm: 12, md: 6 },
              { field: "address", label: "Address (Optional)", placeholder: "Enter your address", xs: 12 },
            ].map((item) => (
              <Grid item xs={item.xs} sm={item.sm} md={item.md} key={item.field}>
                <TextField
                  label={item.label}
                  value={personalInfo[item.field]}
                  onChange={(e) => handlePersonalInfoChange(item.field, e.target.value)}
                  size="medium"
                  fullWidth
                  placeholder={item.placeholder}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      transition: "all 0.3s ease",
                      '&:hover': {
                        borderColor: "#B88746",
                      },
                      '&.Mui-focused': {
                        borderColor: "#B88746",
                        boxShadow: "0 0 0 2px rgba(184, 135, 70, 0.2)",
                      }
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Zoom>

      {/* Art Options - Fast selection with no animations on click */}
      <Fade in timeout={500}>
        <Accordion 
          id="art"
          expanded={expandedAccordion === "art"}
          onChange={handleAccordionChange("art")}
          sx={{ 
            mb: { xs: 2, sm: 3 },
            borderRadius: 3,
            border: 1,
            borderColor: "divider",
            backgroundColor: "white",
            '&:before': { display: 'none' },
            transition: "all 0.3s ease",
            '&:hover': {
              boxShadow: 2,
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: { xs: '56px', sm: '64px' },
              px: { xs: 2, sm: 3 },
              '& .MuiAccordionSummary-content': {
                my: 1,
                alignItems: "center",
                gap: 2
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Typography sx={{ 
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                color: "#B88746",
              }}>
                🎨 Art Customization
              </Typography>
             
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ 
            py: { xs: 2, sm: 3 }, 
            px: { xs: 2, sm: 3, md: 4 },
          }}>
            
            {/* Desktop/Tablet View */}
            {!isMobile ? (
              <Box>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { sm: '1fr', md: 'repeat(3, 1fr)' },
                  gap: { sm: 3, md: 4 },
                }}>
                  {artOptionsConfig.map((section) => (
                    <Box key={section.id}>
                      <Typography variant="subtitle1" sx={{ 
                        color: section.disabled ? "text.disabled" : "#B88746",
                        fontWeight: 600,
                        mb: 2,
                        fontSize: { sm: '0.9rem', md: '1rem' }
                      }}>
                        {section.label}
                      </Typography>
                      
                      <Box>
                        {section.options.map((option) => (
                          <Box 
                            key={option.value}
                            onClick={() => {
                              if (!section.disabled) {
                                handleArtOptionChange(section.field, option.value);
                              }
                            }}
                            sx={{
                              p: 2,
                              mb: 1.5,
                              border: artOptions[section.field] === option.value ? '2px solid #B88746' : '1px solid',
                              borderColor: artOptions[section.field] === option.value ? '#B88746' : 'divider',
                              borderRadius: 2,
                              cursor: section.disabled ? 'not-allowed' : 'pointer',
                              backgroundColor: artOptions[section.field] === option.value ? 'rgba(184, 135, 70, 0.08)' : 'transparent',
                              transition: 'all 0.1s ease', // Faster transition
                              opacity: section.disabled ? 0.6 : 1,
                              '&:hover': !section.disabled ? {
                                borderColor: '#B88746',
                                backgroundColor: 'rgba(184, 135, 70, 0.04)',
                              } : {},
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Radio
                                size="small"
                                checked={artOptions[section.field] === option.value}
                                disabled={section.disabled}
                                sx={{
                                  color: 'divider',
                                  '&.Mui-checked': {
                                    color: '#B88746',
                                  },
                                  transition: 'none', // No transition for radio
                                }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                  <Typography sx={{ fontSize: '1.2rem' }}>{option.icon}</Typography>
                                  <Typography sx={{ 
                                    fontSize: '0.95rem',
                                    fontWeight: artOptions[section.field] === option.value ? 600 : 400,
                                    color: artOptions[section.field] === option.value ? '#B88746' : 'text.primary',
                                  }}>
                                    {option.label}
                                  </Typography>
                                </Box>
                                <Typography sx={{ 
                                  fontSize: '0.8rem',
                                  color: artOptions[section.field] === option.value ? '#A8743D' : 'text.secondary',
                                  mt: 0.5,
                                  ml: 4
                                }}>
                                  {option.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      
                      {section.field === "size" && artOptions.size === "custom" && (
                        <Box sx={{ 
                          mt: 3,
                          p: 2.5,
                          backgroundColor: 'rgba(184, 135, 70, 0.05)',
                          borderRadius: 2,
                          border: '2px solid #B88746'
                        }}>
                          <Typography variant="subtitle2" sx={{ 
                            color: "#B88746", 
                            fontWeight: 600,
                            mb: 1.5,
                          }}>
                            📐 Custom Size Dimensions
                          </Typography>
                          <TextField
                            value={customSize}
                            onChange={(e) => setCustomSize(e.target.value)}
                            size="medium"
                            fullWidth
                            placeholder="Example: 24x36 inches or 50x70 cm"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 1.5,
                              }
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              /* Mobile View */
              <Box>
                {/* Column Headers */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 1,
                  mb: 2.5,
                  textAlign: 'center'
                }}>
                  <Typography variant="subtitle2" sx={{ 
                    color: "#B88746",
                    fontWeight: 600,
                  }}>
                    Art Type
                  </Typography>
                  <Typography variant="subtitle2" sx={{ 
                    color: artOptions.type === "none" ? "text.disabled" : "#B88746",
                    fontWeight: 600,
                  }}>
                    Size
                  </Typography>
                  <Typography variant="subtitle2" sx={{ 
                    color: artOptions.type === "none" ? "text.disabled" : "#B88746",
                    fontWeight: 600,
                  }}>
                    Material
                  </Typography>
                </Box>

                {/* Options Grid */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 1.5,
                }}>
                  {artOptionsConfig.map((section, colIndex) => (
                    <Box key={section.id} sx={{ opacity: section.disabled ? 0.6 : 1 }}>
                      {section.options.map((option) => (
                        <Box 
                          key={option.value}
                          onClick={() => {
                            if (!section.disabled) {
                              handleArtOptionChange(section.field, option.value);
                            }
                          }}
                          sx={{
                            p: 1.5,
                            mb: 1.5,
                            border: artOptions[section.field] === option.value ? '2px solid #B88746' : '1px solid',
                            borderColor: artOptions[section.field] === option.value ? '#B88746' : 'divider',
                            borderRadius: 2,
                            cursor: section.disabled ? 'not-allowed' : 'pointer',
                            backgroundColor: artOptions[section.field] === option.value ? 'rgba(184, 135, 70, 0.08)' : 'transparent',
                            transition: 'all 0.1s ease', // Faster transition
                            '&:hover': !section.disabled ? {
                              borderColor: '#B88746',
                              backgroundColor: 'rgba(184, 135, 70, 0.04)',
                            } : {},
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Radio
                              size="small"
                              checked={artOptions[section.field] === option.value}
                              disabled={section.disabled}
                              sx={{
                                color: 'divider',
                                '&.Mui-checked': {
                                  color: '#B88746',
                                },
                                p: 0,
                                transition: 'none', // No transition
                              }}
                            />
                            <Box sx={{ flex: 1 }}>
                              <Typography sx={{ 
                                fontSize: '0.8rem',
                                fontWeight: artOptions[section.field] === option.value ? 600 : 400,
                                color: artOptions[section.field] === option.value ? '#B88746' : 'text.primary',
                                lineHeight: 1.2
                              }}>
                                {option.label}
                              </Typography>
                              <Typography sx={{ 
                                fontSize: '0.7rem',
                                color: artOptions[section.field] === option.value ? '#A8743D' : 'text.secondary',
                                mt: 0.5
                              }}>
                                {option.description}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>
                  ))}
                </Box>

                {/* Custom Size Input for Mobile */}
                {artOptions.size === "custom" && (
                  <Box sx={{ 
                    mt: 3, 
                    p: 2, 
                    backgroundColor: 'rgba(184, 135, 70, 0.05)', 
                    borderRadius: 2, 
                    border: '2px solid #B88746' 
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: "#B88746", 
                      fontWeight: 600,
                      mb: 1.5,
                    }}>
                      📐 Enter Custom Size
                    </Typography>
                    <TextField
                      value={customSize}
                      onChange={(e) => setCustomSize(e.target.value)}
                      size="small"
                      fullWidth
                      placeholder="e.g., 24x36 inches or 50x70 cm"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Live Sketch Section */}
      <Fade in timeout={600}>
        <Accordion 
          id="live"
          expanded={expandedAccordion === "live"}
          onChange={handleAccordionChange("live")}
          sx={{ 
            mb: 2,
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            backgroundColor: "white",
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: '56px',
              px: 2,
              '& .MuiAccordionSummary-content': { my: 1 },
            }}
          >
            <Typography sx={{ 
              fontWeight: 600,
              color: "#B88746",
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}>
              📅 Live Sketch Event
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Place / Venue"
                  value={liveSketch.place}
                  onChange={(e) => handleLiveSketchChange("place", e.target.value)}
                  size="medium"
                  fullWidth
                  placeholder="Event location"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  value={liveSketch.date}
                  type="date"
                  onChange={(e) => handleLiveSketchChange("date", e.target.value)}
                  size="medium"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ 
                  color: "#B88746",
                  fontWeight: 600,
                  mb: 2,
                }}>
                  ⏱️ Sketch Duration
                </Typography>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
                  gap: 2,
                  mb: 2
                }}>
                  {durationOptions.map((option) => (
                    <Box 
                      key={option.value}
                      onClick={() => handleLiveSketchChange("duration", option.value)}
                      sx={{
                        p: 2,
                        border: liveSketch.duration === option.value ? '2px solid #B88746' : '1px solid',
                        borderColor: liveSketch.duration === option.value ? '#B88746' : 'divider',
                        borderRadius: 2,
                        cursor: 'pointer',
                        backgroundColor: liveSketch.duration === option.value ? 'rgba(184, 135, 70, 0.08)' : 'transparent',
                        transition: 'all 0.1s ease', // Faster transition
                        '&:hover': {
                          borderColor: '#B88746',
                          backgroundColor: 'rgba(184, 135, 70, 0.04)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Radio
                          size="small"
                          checked={liveSketch.duration === option.value}
                          sx={{
                            color: 'divider',
                            '&.Mui-checked': {
                              color: '#B88746',
                            },
                            transition: 'none', // No transition
                          }}
                        />
                        <Box>
                          <Typography sx={{ 
                            fontWeight: liveSketch.duration === option.value ? 600 : 400,
                            color: liveSketch.duration === option.value ? '#B88746' : 'text.primary',
                          }}>
                            {option.label}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.8rem',
                            color: liveSketch.duration === option.value ? '#A8743D' : 'text.secondary',
                            mt: 0.5
                          }}>
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                {/* Custom Duration Input */}
                {liveSketch.duration === "custom" && (
                  <Box sx={{ 
                    mt: 2,
                    p: 2.5,
                    backgroundColor: 'rgba(184, 135, 70, 0.05)',
                    borderRadius: 2,
                    border: '2px solid #B88746'
                  }}>
                    <TextField
                      label="Specify Custom Duration"
                      value={liveSketch.customDuration}
                      onChange={(e) => setLiveSketch(prev => ({ ...prev, customDuration: e.target.value }))}
                      size="medium"
                      fullWidth
                      placeholder="e.g., 2 days, 8 hours, etc."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 1.5,
                        }
                      }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Mural Section */}
      <Fade in timeout={700}>
        <Accordion 
          id="mural"
          expanded={expandedAccordion === "mural"}
          onChange={handleAccordionChange("mural")}
          sx={{ 
            mb: 2,
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            backgroundColor: "white",
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: '56px',
              px: 2,
              '& .MuiAccordionSummary-content': { my: 1 },
            }}
          >
            <Typography sx={{ 
              fontWeight: 600,
              color: "#B88746",
              fontSize: { xs: '0.95rem', sm: '1rem' }
            }}>
              🎨 Mural / Wall Painting 
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Wall Size"
                  value={mural.wallSize}
                  onChange={(e) => setMural(prev => ({ ...prev, wallSize: e.target.value }))}
                  size="medium"
                  fullWidth
                  placeholder="e.g., 10x15 ft, 20x30 ft"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" sx={{ 
                  color: "#B88746",
                  fontWeight: 600,
                  mb: 1.5,
                }}>
                  🎯 Painting Type
                </Typography>
                <RadioGroup
                  value={mural.paintingType}
                  onChange={(e) => setMural(prev => ({ ...prev, paintingType: e.target.value }))}
                  sx={{ gap: 1.5 }}
                >
                  <FormControlLabel 
                    value="design" 
                    control={
                      <Radio 
                        size="small" 
                        sx={{ 
                          color: '#B88746',
                          '&.Mui-checked': {
                            color: '#B88746',
                          },
                          transition: 'none', // No transition
                        }} 
                      />
                    } 
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: mural.paintingType === "design" ? 600 : 400 }}>
                          Design Painting
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                          Creative patterns & designs
                        </Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel 
                    value="mural" 
                    control={
                      <Radio 
                        size="small" 
                        sx={{ 
                          color: '#B88746',
                          '&.Mui-checked': {
                            color: '#B88746',
                          },
                          transition: 'none', // No transition
                        }} 
                      />
                    } 
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: mural.paintingType === "mural" ? 600 : 400 }}>
                          Mural Art
                        </Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                          Large scene/portrait paintings
                        </Typography>
                      </Box>
                    }
                  />
                </RadioGroup>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ 
                  color: "#B88746",
                  fontWeight: 600,
                  mb: 2,
                }}>
                  🏢 Surface / Location
                </Typography>
                
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(5, 1fr)' },
                  gap: 2,
                  mb: 2
                }}>
                  {surfaceOptions.map((option) => (
                    <Box 
                      key={option.value}
                      onClick={() => handleMuralChange("surfaceType", option.value)}
                      sx={{
                        p: 2,
                        border: mural.surfaceType === option.value ? '2px solid #B88746' : '1px solid',
                        borderColor: mural.surfaceType === option.value ? '#B88746' : 'divider',
                        borderRadius: 2,
                        cursor: 'pointer',
                        backgroundColor: mural.surfaceType === option.value ? 'rgba(184, 135, 70, 0.08)' : 'transparent',
                        transition: 'all 0.1s ease', // Faster transition
                        '&:hover': {
                          borderColor: '#B88746',
                          backgroundColor: 'rgba(184, 135, 70, 0.04)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Radio
                          size="small"
                          checked={mural.surfaceType === option.value}
                          sx={{
                            color: 'divider',
                            '&.Mui-checked': {
                              color: '#B88746',
                            },
                            transition: 'none', // No transition
                          }}
                        />
                        <Box>
                          <Typography sx={{ 
                            fontWeight: mural.surfaceType === option.value ? 600 : 400,
                            color: mural.surfaceType === option.value ? '#B88746' : 'text.primary',
                          }}>
                            {option.label}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.8rem',
                            color: mural.surfaceType === option.value ? '#A8743D' : 'text.secondary',
                            mt: 0.5
                          }}>
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Other Optional Sections */}
      {[
        { key: "tshirt", title: "👕 T-Shirt Design", data: tshirt, setter: setTshirt },
        { key: "shoe", title: "👟 Shoe Painting", data: shoe, setter: setShoe }
      ].map((section, idx) => (
        <Fade in timeout={800 + idx * 100} key={section.key}>
          <Accordion 
            id={section.key}
            expanded={expandedAccordion === section.key}
            onChange={handleAccordionChange(section.key)}
            sx={{ 
              mb: 2,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              backgroundColor: "white",
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
              sx={{
                minHeight: '56px',
                px: 2,
                '& .MuiAccordionSummary-content': { my: 1 },
              }}
            >
              <Typography sx={{ 
                fontWeight: 600,
                color: "#B88746",
                fontSize: { xs: '0.95rem', sm: '1rem' }
              }}>
                {section.title} 
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 2, px: { xs: 2, sm: 3 } }}>
              <Grid container spacing={2}>
                {[
                  { field: "size", label: "Size" },
                  { field: "color", label: "Color" },
                  { field: "design", label: "Design Idea" },
                  { field: "description", label: "Additional Details" },
                ].map((field) => (
                  <Grid item xs={12} sm={field.field === "description" ? 12 : 6} key={field.field}>
                    <TextField
                      label={field.label}
                      value={section.data[field.field]}
                      onChange={(e) => {
                        section.setter(prev => ({ ...prev, [field.field]: e.target.value }));
                      }}
                      multiline={field.field === "description"}
                      rows={field.field === "description" ? 3 : 1}
                      size="medium"
                      fullWidth
                      placeholder={field.field === "description" ? "Describe your design requirements..." : ""}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Fade>
      ))}

      {/* Submit Button */}
      <Zoom in timeout={1000}>
        <Box sx={{ 
          mt: { xs: 3, sm: 4, md: 5 },
          mb: { xs: 2, sm: 3 },
          textAlign: "center"
        }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#B88746",
              color: "white",
              py: { xs: 1, sm: 1.25, md: 1.5 },
              px: { xs: 4, sm: 6, md: 8 },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              borderRadius: 3,
              minWidth: { xs: '200px', sm: '240px', md: '280px' },
              fontWeight: 600,
              boxShadow: '0 6px 20px rgba(184, 135, 70, 0.3)',
              '&:hover': {
                backgroundColor: "#A8743D",
                transform: "translateY(-3px)",
                boxShadow: '0 10px 25px rgba(184, 135, 70, 0.4)',
              },
              '&:active': {
                animation: `${bounceShrink} 0.3s ease`,
              },
              '&:disabled': {
                backgroundColor: '#cccccc',
                color: '#666666',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {isSubmitting ? 'Processing...' : 'Submit via WhatsApp'}
          </Button>
          
          <Typography variant="body2" color="text.secondary" sx={{ 
            mt: 2,
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}>
            * Name & Phone are required.
          </Typography>
        </Box>
      </Zoom>

      {/* Toast Container */}
      <Suspense fallback={null}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ fontSize: '14px' }}
        />
      </Suspense>
    </Box>
  );
};

export default React.memo(Customize);