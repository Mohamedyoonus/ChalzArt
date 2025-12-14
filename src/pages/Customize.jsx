import React, { useState, useCallback, useMemo, lazy, Suspense } from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
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

const Customize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customSize, setCustomSize] = useState("");
  const [showSamplesModal, setShowSamplesModal] = useState(false);

  // State
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
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
    location: "",
    customLocation: "",
    paintingType: "design", // design or mural
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

  // Handlers
  const handlePersonalInfoChange = useCallback((field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleArtOptionChange = useCallback((field, value) => {
    const newValue = value === artOptions[field] ? "none" : value;
    
    setArtOptions(prev => ({ ...prev, [field]: newValue }));
    
    if (field === "size" && value !== "custom") {
      setCustomSize("");
    }
  }, [artOptions]);

  const handleLiveSketchChange = useCallback((field, value) => {
    setLiveSketch(prev => ({ ...prev, [field]: value }));
    if (field !== "duration" || value !== "custom") {
      setLiveSketch(prev => ({ ...prev, customDuration: "" }));
    }
  }, []);

  const handleMuralChange = useCallback((field, value) => {
    setMural(prev => ({ ...prev, [field]: value }));
    if (field !== "surfaceType" || value !== "custom") {
      setMural(prev => ({ ...prev, customLocation: "" }));
    }
  }, []);

  const handleAccordionChange = useCallback((panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  }, []);

  const showError = useCallback((message) => {
    setErrorMessage(message);
    setShowErrorDialog(true);
  }, []);

  const validateArtOptions = useCallback(() => {
    // ONLY validate art options (not personal info)
    if (artOptions.type !== "none") {
      if (artOptions.size === "none") {
        showError("Please select a size for your artwork");
        return false;
      }
      
      if (artOptions.material === "none") {
        showError("Please select a material for your artwork");
        return false;
      }
      
      // Validate custom size
      if (artOptions.size === "custom" && !customSize.trim()) {
        showError("Please enter your custom size dimensions");
        return false;
      }
    }
    
    return true;
  }, [artOptions, customSize, showError]);

  const handleSubmit = useCallback(async () => {
    // First validate personal info (basic)
    if (!personalInfo.name.trim()) {
      showError("Please enter your name");
      return;
    }

    if (!personalInfo.phone.trim()) {
      showError("Please enter your phone number");
      return;
    }

    // Then validate art options (only if art type is selected)
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
      Email: personalInfo.email,
      Phone: personalInfo.phone,
      Address: personalInfo.address,
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
    const durationValue = liveSketch.duration === "custom" ? 
      liveSketch.customDuration : liveSketch.duration;
    
    message += createSection("Live Sketch Event:", {
      Place: liveSketch.place,
      Date: liveSketch.date,
      Duration: durationValue,
    });

    // Mural with location
    const locationValue = mural.surfaceType === "custom" ? 
      mural.customLocation : mural.location;
    
    message += createSection("Mural Painting:", {
      "Wall Size": mural.wallSize,
      "Surface Type": locationValue,
      "Painting Type": mural.paintingType === "design" ? "Design Painting" : "Mural Art",
    });

    message += createSection("T-Shirt Design:", tshirt);
    message += createSection("Shoe Customization:", shoe);

    message += `\n\nThank you!`;

    const whatsappURL = `https://wa.me/9176425811?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappURL, "_blank");
    setSubmitted(true);
    toast.success("Opening WhatsApp...");
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
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

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 1.5, md: 2 },
        maxWidth: "1200px",
        margin: "0 auto",
        minHeight: "100vh",
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      }}
    >
      {/* Header with View Samples Button */}
      <Slide direction="down" in timeout={500}>
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
              fontWeight: 500,
              color: "#B88746",
              fontFamily: "'Playfair Display', serif",
              mb: 1,
            }}
          >
            Custom Art Request
          </Typography>

          {/* View Samples Button */}
          <Box textAlign="center" sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ViewCarouselIcon />}
              onClick={() => setShowSamplesModal(true)}
              size={isMobile ? "small" : "medium"}
              sx={{
                borderRadius: "20px",
                fontSize: { xs: "0.75rem", md: "0.9rem" },
                px: { xs: 2, md: 3 },
                py: { xs: 0.5, md: 0.75 },
                color: "#B88746",       
                borderColor: "#B88746", 
                '&:hover': {
                  backgroundColor: "#B88746", 
                  color: "#fff",              
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s',
              }}
            >
              View Art Samples
            </Button>
          </Box>
        </Box>
      </Slide>

      {/* Success Alert */}
      <Fade in timeout={500}>
        <Box sx={{ mb: 1.5 }}>
          {submitted && (
            <Alert severity="success" sx={{ borderRadius: 1, fontSize: { xs: '0.8rem', md: '0.9rem' }, py: 0.5 }}>
              Opening WhatsApp...
            </Alert>
          )}
        </Box>
      </Fade>

      {/* Error Dialog */}
      <Dialog
        open={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle id="error-dialog-title" sx={{ color: "#d32f2f", fontSize: '0.9rem', py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon />
            <span>Please Complete Selection</span>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ py: 1 }}>
          <Typography fontSize="0.8rem">{errorMessage}</Typography>
        </DialogContent>
        <DialogActions sx={{ py: 1 }}>
          <Button 
            onClick={() => setShowErrorDialog(false)}
            sx={{ color: "#B88746", fontSize: '0.8rem' }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Samples Modal */}
      <Dialog
        open={showSamplesModal}
        onClose={() => setShowSamplesModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ 
          color: "#B88746", 
          fontSize: '1.1rem',
          fontWeight: 600,
          borderBottom: '1px solid #e0e0e0',
          py: 2
        }}>
          🎨 Artwork Samples Gallery
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 1 }}>✏️</Typography>
                <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600 }}>
                  Realistic Sketches
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                  Detailed portrait & nature sketches
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 1 }}>🎨</Typography>
                <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600 }}>
                  Cartoon Art
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                  Fun & creative cartoon characters
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 1 }}>🖌️</Typography>
                <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600 }}>
                  Acrylic Paintings
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                  Vibrant color paintings
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 1 }}>🏙️</Typography>
                <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600 }}>
                  Mural Art
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                  Large wall paintings
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 1 }}>👕</Typography>
                <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600 }}>
                  T-Shirt Designs
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                  Custom apparel designs
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ 
                p: 2, 
                border: '1px solid #e0e0e0', 
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <Typography sx={{ fontSize: '3rem', mb: 1 }}>👟</Typography>
                <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600 }}>
                  Shoe Paintings
                </Typography>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 0.5 }}>
                  Custom shoe designs
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
              View more samples on our WhatsApp catalog
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                variant="contained"
                component="a"
                href="https://wa.me/c/919176425811"
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  backgroundColor: "#25D366",
                  color: "white",
                  '&:hover': {
                    backgroundColor: "#128C7E",
                  },
                  fontSize: '0.75rem',
                  px: 2
                }}
              >
                Open WhatsApp Catalog
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
          <Button 
            onClick={() => setShowSamplesModal(false)}
            sx={{ color: "#B88746" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Personal Information */}
      <Zoom in timeout={600}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 1.5, md: 2 }, 
            mb: { xs: 2, md: 3 },
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
          }}
        >
          <Typography variant="subtitle1" gutterBottom sx={{ 
            color: "#B88746", 
            fontSize: { xs: '0.9rem', md: '1rem' }, 
            mb: 1.5,
            fontWeight: 600,
          }}>
            👤 Personal Information
          </Typography>
          <Grid container spacing={1.5}>
            {[
              { field: "name", label: "Name *", placeholder: "Your full name" },
              { field: "email", label: "Email", placeholder: "Your email (optional)" },
              { field: "phone", label: "Phone *", placeholder: "Your phone number" },
              { field: "address", label: "Address", placeholder: "Your address (optional)" },
            ].map((item) => (
              <Grid item xs={12} sm={6} key={item.field}>
                <TextField
                  label={item.label}
                  value={personalInfo[item.field]}
                  onChange={(e) => handlePersonalInfoChange(item.field, e.target.value)}
                  size="small"
                  fullWidth
                  placeholder={item.placeholder}
                  sx={{
                    '& .MuiInputBase-root': {
                      fontSize: { xs: '0.8rem', md: '0.9rem' },
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Zoom>

      {/* Art Options - Clean Professional Layout */}
      <Fade in timeout={700}>
        <Accordion 
          expanded={expandedAccordion === "art"}
          onChange={handleAccordionChange("art")}
          sx={{ 
            mb: { xs: 2, md: 3 },
            borderRadius: '12px',
            '&:before': { display: 'none' },
            border: '1px solid #e0e0e0',
            backgroundColor: '#fafafa',
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: { xs: '40px', md: '48px' },
              py: 0,
              px: { xs: 1.5, md: 2 },
              '& .MuiAccordionSummary-content': { my: 0.5 },
              backgroundColor: expandedAccordion === "art" ? '#f8f5f0' : '#fafafa',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography sx={{ 
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                color: "#B88746",
              }}>
                🎨 Art Customization
              </Typography>
              {isArtTypeSelected && (
                <Chip 
                  label="✓ Type Selected" 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#E8F5E9', 
                    color: '#2E7D32', 
                    fontSize: '0.6rem',
                    height: '18px'
                  }} 
                />
              )}
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ 
            py: { xs: 2, md: 3 }, 
            px: { xs: 1.5, md: 3 },
          }}>
            
            {/* Mobile View - Clean 3 Column Layout */}
            {isMobile ? (
              <Box>
                {/* Column Headers */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 1,
                  mb: 2,
                  textAlign: 'center'
                }}>
                  <Typography variant="subtitle2" sx={{ 
                    color: "#B88746",
                    fontWeight: 600,
                    fontSize: '0.8rem',
                  }}>
                    Art Type
                  </Typography>
                  <Typography variant="subtitle2" sx={{ 
                    color: artOptions.type === "none" ? "#999" : "#B88746",
                    fontWeight: 600,
                    fontSize: '0.8rem',
                  }}>
                    Size
                  </Typography>
                  <Typography variant="subtitle2" sx={{ 
                    color: artOptions.type === "none" ? "#999" : "#B88746",
                    fontWeight: 600,
                    fontSize: '0.8rem',
                  }}>
                    Material
                  </Typography>
                </Box>

                {/* Options Grid */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 1,
                }}>
                  {/* Column 1: Art Type */}
                  <Box>
                    {artOptionsConfig[0].options.map((option) => (
                      <Box 
                        key={option.value}
                        onClick={() => handleArtOptionChange("type", option.value)}
                        sx={{
                          p: 1,
                          mb: 0.75,
                          border: artOptions.type === option.value ? '2px solid #B88746' : '1px solid #ddd',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          backgroundColor: artOptions.type === option.value ? '#FFF9F0' : 'white',
                          transition: 'all 0.2s',
                          '&:hover': {
                            borderColor: '#B88746',
                            backgroundColor: '#FFF9F0',
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Radio
                            size="small"
                            checked={artOptions.type === option.value}
                            sx={{
                              color: '#B88746',
                              '&.Mui-checked': {
                                color: '#B88746',
                              },
                              p: 0
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ 
                              fontSize: '0.75rem',
                              fontWeight: artOptions.type === option.value ? 600 : 400,
                              color: artOptions.type === option.value ? '#B88746' : '#333',
                              lineHeight: 1.2
                            }}>
                              {option.label}
                            </Typography>
                            <Typography sx={{ 
                              fontSize: '0.6rem',
                              color: artOptions.type === option.value ? '#A8743D' : '#666',
                              mt: 0.25
                            }}>
                              {option.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* Column 2: Size */}
                  <Box sx={{ opacity: artOptions.type === "none" ? 0.5 : 1 }}>
                    {artOptionsConfig[1].options.map((option) => (
                      <Box 
                        key={option.value}
                        onClick={() => {
                          if (artOptions.type !== "none") {
                            handleArtOptionChange("size", option.value);
                          }
                        }}
                        sx={{
                          p: 1,
                          mb: 0.75,
                          border: artOptions.size === option.value ? '2px solid #B88746' : '1px solid #ddd',
                          borderRadius: '6px',
                          cursor: artOptions.type === "none" ? 'not-allowed' : 'pointer',
                          backgroundColor: artOptions.size === option.value ? '#FFF9F0' : 'white',
                          transition: 'all 0.2s',
                          '&:hover': artOptions.type !== "none" ? {
                            borderColor: '#B88746',
                            backgroundColor: '#FFF9F0',
                          } : {},
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Radio
                            size="small"
                            checked={artOptions.size === option.value}
                            disabled={artOptions.type === "none"}
                            sx={{
                              color: '#B88746',
                              '&.Mui-checked': {
                                color: '#B88746',
                              },
                              p: 0
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ 
                              fontSize: '0.75rem',
                              fontWeight: artOptions.size === option.value ? 600 : 400,
                              color: artOptions.size === option.value ? '#B88746' : '#333',
                              lineHeight: 1.2
                            }}>
                              {option.label}
                            </Typography>
                            <Typography sx={{ 
                              fontSize: '0.6rem',
                              color: artOptions.size === option.value ? '#A8743D' : '#666',
                              mt: 0.25
                            }}>
                              {option.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>

                  {/* Column 3: Material */}
                  <Box sx={{ opacity: artOptions.type === "none" ? 0.5 : 1 }}>
                    {artOptionsConfig[2].options.map((option) => (
                      <Box 
                        key={option.value}
                        onClick={() => {
                          if (artOptions.type !== "none") {
                            handleArtOptionChange("material", option.value);
                          }
                        }}
                        sx={{
                          p: 1,
                          mb: 0.75,
                          border: artOptions.material === option.value ? '2px solid #B88746' : '1px solid #ddd',
                          borderRadius: '6px',
                          cursor: artOptions.type === "none" ? 'not-allowed' : 'pointer',
                          backgroundColor: artOptions.material === option.value ? '#FFF9F0' : 'white',
                          transition: 'all 0.2s',
                          '&:hover': artOptions.type !== "none" ? {
                            borderColor: '#B88746',
                            backgroundColor: '#FFF9F0',
                          } : {},
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                          <Radio
                            size="small"
                            checked={artOptions.material === option.value}
                            disabled={artOptions.type === "none"}
                            sx={{
                              color: '#B88746',
                              '&.Mui-checked': {
                                color: '#B88746',
                              },
                              p: 0
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ 
                              fontSize: '0.75rem',
                              fontWeight: artOptions.material === option.value ? 600 : 400,
                              color: artOptions.material === option.value ? '#B88746' : '#333',
                              lineHeight: 1.2
                            }}>
                              {option.label}
                            </Typography>
                            <Typography sx={{ 
                              fontSize: '0.6rem',
                              color: artOptions.material === option.value ? '#A8743D' : '#666',
                              mt: 0.25
                            }}>
                              {option.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Custom Size Input */}
                {artOptions.size === "custom" && (
                  <Box sx={{ 
                    mt: 2, 
                    p: 1.5, 
                    backgroundColor: 'white', 
                    borderRadius: '8px', 
                    border: '1px solid #B88746' 
                  }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: "#B88746", 
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      mb: 1,
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
                        '& .MuiInputBase-root': {
                          fontSize: '0.8rem',
                        }
                      }}
                    />
                  </Box>
                )}
              </Box>
            ) : (
              /* Desktop View */
              <Box>
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 3,
                  mb: 3
                }}>
                  {artOptionsConfig.map((section) => (
                    <Box key={section.id}>
                      <Typography variant="subtitle1" sx={{ 
                        color: section.disabled ? "#999" : "#B88746",
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        mb: 1
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
                              p: 1.5,
                              mb: 1,
                              border: artOptions[section.field] === option.value ? '2px solid #B88746' : '1px solid #ddd',
                              borderRadius: '8px',
                              cursor: section.disabled ? 'not-allowed' : 'pointer',
                              backgroundColor: artOptions[section.field] === option.value ? '#FFF9F0' : 'white',
                              transition: 'all 0.2s',
                              opacity: section.disabled ? 0.6 : 1,
                              '&:hover': !section.disabled ? {
                                borderColor: '#B88746',
                                backgroundColor: '#FFF9F0',
                              } : {},
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Radio
                                size="small"
                                checked={artOptions[section.field] === option.value}
                                disabled={section.disabled}
                                sx={{
                                  color: '#B88746',
                                  '&.Mui-checked': {
                                    color: '#B88746',
                                  }
                                }}
                              />
                              <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                  <Typography sx={{ fontSize: '1.1rem' }}>{option.icon}</Typography>
                                  <Typography sx={{ 
                                    fontSize: '0.9rem',
                                    fontWeight: artOptions[section.field] === option.value ? 600 : 400,
                                    color: artOptions[section.field] === option.value ? '#B88746' : '#333',
                                  }}>
                                    {option.label}
                                  </Typography>
                                </Box>
                                <Typography sx={{ 
                                  fontSize: '0.75rem',
                                  color: artOptions[section.field] === option.value ? '#A8743D' : '#666',
                                  mt: 0.5,
                                  ml: 2.5
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
                          mt: 2,
                          p: 2,
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: '2px solid #B88746'
                        }}>
                          <Typography variant="subtitle2" sx={{ 
                            color: "#B88746", 
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            mb: 1,
                          }}>
                            📐 Custom Size Dimensions
                          </Typography>
                          <TextField
                            value={customSize}
                            onChange={(e) => setCustomSize(e.target.value)}
                            size="small"
                            fullWidth
                            placeholder="Example: 24x36 inches or 50x70 cm"
                          />
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Enhanced Live Sketch Section */}
      <Fade in timeout={800}>
        <Accordion 
          expanded={expandedAccordion === "live"}
          onChange={handleAccordionChange("live")}
          sx={{ 
            mb: 1.5,
            borderRadius: '8px',
            '&:before': { display: 'none' },
            border: '1px solid #e0e0e0',
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: '36px',
              py: 0,
              px: 1.5,
              '& .MuiAccordionSummary-content': { my: 0.5 },
            }}
          >
            <Typography sx={{ 
              fontSize: '0.85rem',
              fontWeight: 600,
              color: "#B88746",
            }}>
              📅 Live Sketch Event (Optional)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 2, px: 1.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Place / Venue"
                  value={liveSketch.place}
                  onChange={(e) => handleLiveSketchChange("place", e.target.value)}
                  size="small"
                  fullWidth
                  placeholder="Event location"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  value={liveSketch.date}
                  type="date"
                  onChange={(e) => handleLiveSketchChange("date", e.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ 
                  color: "#B88746",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  mb: 1
                }}>
                  ⏱️ Sketch Duration
                </Typography>
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(4, 1fr)' },
                  gap: 1,
                  mb: 2
                }}>
                  {durationOptions.map((option) => (
                    <Box 
                      key={option.value}
                      onClick={() => handleLiveSketchChange("duration", option.value)}
                      sx={{
                        p: 1.5,
                        border: liveSketch.duration === option.value ? '2px solid #B88746' : '1px solid #ddd',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        backgroundColor: liveSketch.duration === option.value ? '#FFF9F0' : 'white',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: '#B88746',
                          backgroundColor: '#FFF9F0',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Radio
                          size="small"
                          checked={liveSketch.duration === option.value}
                          sx={{
                            color: '#B88746',
                            '&.Mui-checked': {
                              color: '#B88746',
                            }
                          }}
                        />
                        <Box>
                          <Typography sx={{ 
                            fontSize: '0.85rem',
                            fontWeight: liveSketch.duration === option.value ? 600 : 400,
                            color: liveSketch.duration === option.value ? '#B88746' : '#333',
                          }}>
                            {option.label}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.7rem',
                            color: liveSketch.duration === option.value ? '#A8743D' : '#666',
                            mt: 0.25
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
                    mt: 1,
                    p: 1.5,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #B88746'
                  }}>
                    <TextField
                      label="Specify Custom Duration"
                      value={liveSketch.customDuration}
                      onChange={(e) => setLiveSketch(prev => ({ ...prev, customDuration: e.target.value }))}
                      size="small"
                      fullWidth
                      placeholder="e.g., 2 days, 8 hours, etc."
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Enhanced Mural Section */}
      <Fade in timeout={900}>
        <Accordion 
          expanded={expandedAccordion === "mural"}
          onChange={handleAccordionChange("mural")}
          sx={{ 
            mb: 1.5,
            borderRadius: '8px',
            '&:before': { display: 'none' },
            border: '1px solid #e0e0e0',
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: '36px',
              py: 0,
              px: 1.5,
              '& .MuiAccordionSummary-content': { my: 0.5 },
            }}
          >
            <Typography sx={{ 
              fontSize: '0.85rem',
              fontWeight: 600,
              color: "#B88746",
            }}>
              🎨 Mural / Wall Painting (Optional)
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ py: 2, px: 1.5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Wall Size"
                  value={mural.wallSize}
                  onChange={(e) => setMural(prev => ({ ...prev, wallSize: e.target.value }))}
                  size="small"
                  fullWidth
                  placeholder="e.g., 10x15 ft, 20x30 ft"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ 
                  color: "#B88746",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  mb: 1
                }}>
                  🎯 Painting Type
                </Typography>
                <FormControl component="fieldset" size="small">
                  <RadioGroup
                    row
                    value={mural.paintingType}
                    onChange={(e) => setMural(prev => ({ ...prev, paintingType: e.target.value }))}
                  >
                    <FormControlLabel 
                      value="design" 
                      control={<Radio size="small" sx={{ color: '#B88746' }} />} 
                      label={
                        <Box>
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: mural.paintingType === "design" ? 600 : 400 }}>
                            Design Painting
                          </Typography>
                          <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                            Creative patterns & designs
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel 
                      value="mural" 
                      control={<Radio size="small" sx={{ color: '#B88746' }} />} 
                      label={
                        <Box>
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: mural.paintingType === "mural" ? 600 : 400 }}>
                            Mural Art
                          </Typography>
                          <Typography sx={{ fontSize: '0.7rem', color: '#666' }}>
                            Large scene/portrait paintings
                          </Typography>
                        </Box>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle2" sx={{ 
                  color: "#B88746",
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  mb: 1
                }}>
                  🏢 Surface / Location
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: '#666', 
                  fontSize: '0.7rem',
                  display: 'block',
                  mb: 1.5
                }}>
                  Note: Only Design Painting and Mural Art accepted
                </Typography>
                
                <Box sx={{ 
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(5, 1fr)' },
                  gap: 1,
                  mb: 2
                }}>
                  {surfaceOptions.map((option) => (
                    <Box 
                      key={option.value}
                      onClick={() => handleMuralChange("surfaceType", option.value)}
                      sx={{
                        p: 1.5,
                        border: mural.surfaceType === option.value ? '2px solid #B88746' : '1px solid #ddd',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        backgroundColor: mural.surfaceType === option.value ? '#FFF9F0' : 'white',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: '#B88746',
                          backgroundColor: '#FFF9F0',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Radio
                          size="small"
                          checked={mural.surfaceType === option.value}
                          sx={{
                            color: '#B88746',
                            '&.Mui-checked': {
                              color: '#B88746',
                            }
                          }}
                        />
                        <Box>
                          <Typography sx={{ 
                            fontSize: '0.85rem',
                            fontWeight: mural.surfaceType === option.value ? 600 : 400,
                            color: mural.surfaceType === option.value ? '#B88746' : '#333',
                          }}>
                            {option.label}
                          </Typography>
                          <Typography sx={{ 
                            fontSize: '0.7rem',
                            color: mural.surfaceType === option.value ? '#A8743D' : '#666',
                            mt: 0.25
                          }}>
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                
                {/* Custom Location Input */}
                {mural.surfaceType === "custom" && (
                  <Box sx={{ 
                    mt: 1,
                    p: 1.5,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #B88746'
                  }}>
                    <TextField
                      label="Specify Other Location"
                      value={mural.customLocation}
                      onChange={(e) => setMural(prev => ({ ...prev, customLocation: e.target.value }))}
                      size="small"
                      fullWidth
                      placeholder="e.g., Office wall, School wall, etc."
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Other Optional Sections */}
      {[tshirt, shoe].map((sectionData, idx) => (
        <Fade in timeout={1000 + idx * 100} key={idx}>
          <Accordion 
            expanded={expandedAccordion === (idx === 0 ? "tshirt" : "shoe")}
            onChange={handleAccordionChange(idx === 0 ? "tshirt" : "shoe")}
            sx={{ 
              mb: 1.5,
              borderRadius: '8px',
              '&:before': { display: 'none' },
              border: '1px solid #e0e0e0',
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
              sx={{
                minHeight: '36px',
                py: 0,
                px: 1.5,
                '& .MuiAccordionSummary-content': { my: 0.5 },
              }}
            >
              <Typography sx={{ 
                fontSize: '0.85rem',
                fontWeight: 600,
                color: "#B88746",
              }}>
                {idx === 0 ? "👕 T-Shirt Design (Optional)" : "👟 Shoe Painting (Optional)"}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 1, px: 1.5 }}>
              <Grid container spacing={1}>
                {["size", "color", "design", "description"].map((field) => (
                  <Grid item xs={12} sm={field === "description" ? 12 : 6} key={field}>
                    <TextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={sectionData[field]}
                      onChange={(e) => {
                        if (idx === 0) {
                          setTshirt(prev => ({ ...prev, [field]: e.target.value }));
                        } else {
                          setShoe(prev => ({ ...prev, [field]: e.target.value }));
                        }
                      }}
                      multiline={field === "description"}
                      rows={field === "description" ? 2 : 1}
                      size="small"
                      fullWidth
                      placeholder={field === "description" ? "Design details..." : ""}
                    />
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Fade>
      ))}

      {/* Submit Button */}
      <Zoom in timeout={1200}>
        <Box textAlign="center" sx={{ mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
          <Button
            variant="contained"
            size={isMobile ? "small" : "medium"}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#A8743D",
              color: "white",
              py: { xs: 0.75, md: 1 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '0.85rem', md: '1rem' },
              borderRadius: "25px",
              minWidth: { xs: '160px', md: '200px' },
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(168, 116, 61, 0.2)',
              '&:hover': {
                backgroundColor: "#B88746",
                transform: "translateY(-2px)",
                boxShadow: '0 6px 16px rgba(168, 116, 61, 0.3)',
              },
              '&:active': {
                animation: `${bounceShrink} 0.3s ease-in-out`,
              },
              transition: 'all 0.3s',
            }}
          >
            Submit via WhatsApp
          </Button>
          
          <Typography variant="caption" color="#666" sx={{ 
            fontSize: { xs: '0.7rem', md: '0.75rem' },
            display: 'block',
            mt: 1
          }}>
            * Name & Phone are required. All other fields are optional.
          </Typography>
        </Box>
      </Zoom>

      {/* Toast Container */}
      <Suspense fallback={null}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ fontSize: '12px' }}
        />
      </Suspense>
    </Box>
  );
};

export default React.memo(Customize);