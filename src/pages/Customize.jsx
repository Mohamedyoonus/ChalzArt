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
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircleIcon from "@mui/icons-material/Circle";
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

// Art Option Button - Enhanced for desktop
const ArtOptionButton = React.memo(({ 
  label, 
  isSelected, 
  onClick,
  icon,
  description 
}) => (
  <Button
    variant={isSelected ? "contained" : "outlined"}
    onClick={onClick}
    size="small"
    sx={{
      minWidth: 'auto',
      minHeight: { xs: '32px', md: '40px' },
      py: { xs: 0.5, md: 1 },
      px: { xs: 1, md: 1.5 },
      m: 0.25,
      borderRadius: '8px',
      fontSize: { xs: '0.75rem', md: '0.85rem' },
      fontWeight: 500,
      borderColor: isSelected ? '#B88746' : '#ddd',
      backgroundColor: isSelected ? '#B88746' : 'transparent',
      color: isSelected ? 'white' : '#666',
      transition: 'all 0.15s',
      '&:hover': {
        borderColor: '#B88746',
        backgroundColor: isSelected ? '#A8743D' : '#FFF9F0',
        transform: 'translateY(-1px)',
      },
      display: 'flex',
      alignItems: 'center',
      gap: 0.5,
      flex: '1 0 auto',
      textTransform: 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      width: { xs: 'calc(33.333% - 8px)', md: 'calc(25% - 8px)' },
    }}
  >
    <Box sx={{ fontSize: { xs: '1rem', md: '1.2rem' } }}>{icon}</Box>
    <Box sx={{ 
      fontSize: { xs: '0.75rem', md: '0.85rem' },
      fontWeight: 600,
      textAlign: 'center',
      lineHeight: 1.2
    }}>
      {label}
    </Box>
    {description && (
      <Typography variant="caption" sx={{ 
        fontSize: '0.65rem',
        color: isSelected ? 'rgba(255,255,255,0.9)' : '#999',
        display: { xs: 'none', md: 'block' },
        textAlign: 'center',
        lineHeight: 1,
        mt: 0.25
      }}>
        {description}
      </Typography>
    )}
  </Button>
));

const Customize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customSize, setCustomSize] = useState("");

  // State
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });
  
  const [artOptions, setArtOptions] = useState({
    type: "none",
    size: "none", 
    material: "none",
  });
  
  const [liveSketch, setLiveSketch] = useState({
    place: "",
    date: "",
    time: "",
  });
  const [mural, setMural] = useState({
    wallSize: "",
    surface: "",
    location: "",
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
  }, []);

  const handleAccordionChange = useCallback((panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  }, []);

  const showError = useCallback((message) => {
    setErrorMessage(message);
    setShowErrorDialog(true);
  }, []);

  const handleSubmit = useCallback(async () => {
    let valid = true;
    const errorObj = {
      name: false,
      email: false,
      phone: false,
      address: false,
    };

    // Only validate personal info - art options are optional
    if (!personalInfo.name.trim()) {
      errorObj.name = true;
      valid = false;
      showError("Please enter your name");
      return;
    }

    if (!personalInfo.phone.trim()) {
      errorObj.phone = true;
      valid = false;
      showError("Please enter your phone number");
      return;
    }

    // If custom size is selected but empty
    if (artOptions.size === "custom" && !customSize.trim()) {
      valid = false;
      showError("Please enter your custom size dimensions");
      return;
    }

    setErrors(errorObj);

    if (!valid) return;

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
    const sizeValue = artOptions.size === "custom" ? customSize : artOptions.size;
    
    const artDetails = {};
    if (artOptions.type !== "none") artDetails["Art Type"] = artOptions.type;
    if (artOptions.size !== "none") artDetails["Size"] = sizeValue;
    if (artOptions.material !== "none") artDetails["Material"] = artOptions.material;
    
    if (Object.keys(artDetails).length > 0) {
      message += createSection("Art Details:", artDetails);
    }

    message += createSection("Live Sketch Event:", liveSketch);
    message += createSection("Mural Painting:", mural);
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
  }, [personalInfo, artOptions, liveSketch, mural, tshirt, shoe, customSize, showError]);

  // Art Options Configuration - Enhanced for desktop
  const artOptionsConfig = useMemo(() => [
    {
      id: "type",
      label: "🎨 Art Type",
      field: "type",
      options: [
        { value: "Realistic Pencil Sketch", label: "Realistic", icon: "✏️", description: "Detailed sketch" },
        { value: "Cartoon Sketch", label: "Cartoon", icon: "🎨", description: "Fun style" },
        { value: "Regular Sketch", label: "Regular", icon: "✏️", description: "Basic sketch" },
        { value: "Acrylic Painting", label: "Acrylic", icon: "🖌️", description: "Vibrant colors" },
        { value: "Oil Painting", label: "Oil", icon: "🎨", description: "Classic paint" },
        { value: "Watercolor", label: "Watercolor", icon: "💧", description: "Soft effect" },
        { value: "Art Prints", label: "Prints", icon: "🖼️", description: "Digital prints" },
      ]
    },
    {
      id: "size",
      label: "📏 Size",
      field: "size",
      options: [
        { value: "A4", label: "A4", icon: "📄", description: "21x29.7cm" },
        { value: "A3", label: "A3", icon: "🖼️", description: "29.7x42cm" },
        { value: "A2", label: "A2", icon: "📋", description: "42x59.4cm" },
        { value: "A1", label: "A1", icon: "📐", description: "59.4x84cm" },
        { value: "custom", label: "Custom", icon: "⚙️", description: "Your size" },
      ]
    },
    {
      id: "material",
      label: "🖌️ Material",
      field: "material",
      options: [
        { value: "Paper", label: "Paper", icon: "📜", description: "Art paper" },
        { value: "Canvas", label: "Canvas", icon: "🖌️", description: "Canvas board" },
      ]
    },
  ], []);

  // Other sections
  const sections = useMemo(() => [
    {
      id: "live",
      label: "📅 Live Sketch",
      content: (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Place"
              value={liveSketch.place}
              onChange={(e) => handleLiveSketchChange("place", e.target.value)}
              size="small"
              fullWidth
              placeholder="Venue"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Time</InputLabel>
              <Select
                value={liveSketch.time}
                onChange={(e) => handleLiveSketchChange("time", e.target.value)}
                label="Time"
              >
                <MenuItem value=""><em>Select Time</em></MenuItem>
                {["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((time) => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      ),
    },
    {
      id: "mural",
      label: "🎨 Mural Paint",
      content: (
        <Grid container spacing={1}>
          {["wallSize", "surface", "location"].map((field) => (
            <Grid item xs={12} sm={4} key={field}>
              <TextField
                label={field === "wallSize" ? "Wall Size" : field === "surface" ? "Surface" : "Location"}
                value={mural[field]}
                onChange={(e) => setMural(prev => ({ ...prev, [field]: e.target.value }))}
                size="small"
                fullWidth
                placeholder={field === "wallSize" ? "e.g., 10x15 ft" : field === "surface" ? "e.g., Concrete" : "e.g., Office"}
              />
            </Grid>
          ))}
        </Grid>
      ),
    },
    {
      id: "tshirt",
      label: "👕 T-Shirt",
      content: (
        <Grid container spacing={1}>
          {["size", "color", "design", "description"].map((field) => (
            <Grid item xs={12} sm={field === "description" ? 12 : 6} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={tshirt[field]}
                onChange={(e) => setTshirt(prev => ({ ...prev, [field]: e.target.value }))}
                multiline={field === "description"}
                rows={field === "description" ? 2 : 1}
                size="small"
                fullWidth
                placeholder={field === "description" ? "Design details..." : ""}
              />
            </Grid>
          ))}
        </Grid>
      ),
    },
    {
      id: "shoe",
      label: "👟 Shoe Paint",
      content: (
        <Grid container spacing={1}>
          {["type", "size", "design", "description"].map((field) => (
            <Grid item xs={12} sm={field === "description" ? 12 : 6} key={field}>
              <TextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={shoe[field]}
                onChange={(e) => setShoe(prev => ({ ...prev, [field]: e.target.value }))}
                multiline={field === "description"}
                rows={field === "description" ? 2 : 1}
                size="small"
                fullWidth
                placeholder={field === "description" ? "Design details..." : ""}
              />
            </Grid>
          ))}
        </Grid>
      ),
    },
  ], [liveSketch, mural, tshirt, shoe, handleLiveSketchChange]);

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
      {/* Header - Enhanced for desktop */}
      <Slide direction="down" in timeout={500}>
        <Box sx={{ mb: { xs: 2, md: 3 } }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
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

          <Box textAlign="center" sx={{ mb: 1 }}>
            <Button
              variant="outlined"
              component="a"
              href="https://wa.me/c/919176425811"
              target="_blank"  
              rel="noopener noreferrer"
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
              View Samples
            </Button>
          </Box>
        </Box>
      </Slide>

      {/* Success Alert */}
      <Fade in={submitted} timeout={500}>
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
          ⚠️ Required
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
            fontWeight: 600
          }}>
            👤 Personal Information *
          </Typography>
          <Grid container spacing={1.5}>
            {["name", "email", "phone", "address"].map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  label={field.charAt(0).toUpperCase() + field.slice(1) + (field === "name" || field === "phone" ? "*" : "")}
                  value={personalInfo[field]}
                  onChange={(e) => handlePersonalInfoChange(field, e.target.value)}
                  error={errors[field]}
                  size="small"
                  fullWidth
                  placeholder={field === "address" ? "Address (optional)" : ""}
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

      {/* Art Options - Enhanced for desktop */}
      <Fade in timeout={700}>
        <Accordion 
          expanded={expandedAccordion === "art"}
          onChange={handleAccordionChange("art")}
          sx={{ 
            mb: { xs: 2, md: 3 },
            borderRadius: '12px',
            '&:before': { display: 'none' },
            boxShadow: isDesktop ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
            sx={{
              minHeight: { xs: '40px', md: '48px' },
              py: 0,
              px: { xs: 1.5, md: 2 },
              '& .MuiAccordionSummary-content': { my: 0.5 },
              backgroundColor: expandedAccordion === "art" ? '#f8f5f0' : 'transparent',
              borderRadius: '12px 12px 0 0',
            }}
          >
            <Typography sx={{ 
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 600,
              color: "#B88746",
            }}>
              🎨 Art Customization
            </Typography>
           
          </AccordionSummary>
          <AccordionDetails sx={{ 
            py: { xs: 1, md: 2 }, 
            px: { xs: 1.5, md: 2 },
            backgroundColor: '#fafafa',
          }}>
            {/* Three columns in same row - Enhanced spacing for desktop */}
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 1.5, md: 3 },
              mb: 2
            }}>
              {artOptionsConfig.map((section) => (
                <Box 
                  key={section.id}
                  sx={{ 
                    flex: 1,
                    minWidth: 0,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ 
                    color: "#B88746",
                    fontWeight: 600,
                    fontSize: { xs: '0.8rem', md: '0.9rem' },
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5
                  }}>
                    <span>{section.label}</span>
                  </Typography>
                  
                  {/* Options grid - Better layout for desktop */}
                  <Box sx={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 0.5,
                    mb: 1,
                  }}>
                    {section.options.map((option) => (
                      <ArtOptionButton
                        key={option.value}
                        label={option.label}
                        icon={option.icon}
                        description={option.description}
                        isSelected={artOptions[section.field] === option.value}
                        onClick={() => handleArtOptionChange(section.field, option.value)}
                      />
                    ))}
                  </Box>
                  
                  {/* Custom size input field - Enhanced for desktop */}
                  {section.field === "size" && artOptions.size === "custom" && (
                    <Box sx={{ 
                      mt: 1.5,
                      p: { xs: 1, md: 1.5 },
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}>
                      <TextField
                        label="Enter Custom Size"
                        value={customSize}
                        onChange={(e) => setCustomSize(e.target.value)}
                        size="small"
                        fullWidth
                        placeholder="e.g., 24x36 inches, 50x70 cm"
                        sx={{
                          '& .MuiInputBase-root': {
                            fontSize: { xs: '0.8rem', md: '0.9rem' },
                          }
                        }}
                        helperText="Enter dimensions in inches or centimeters"
                        FormHelperTextProps={{
                          sx: { fontSize: '0.7rem' }
                        }}
                      />
                    </Box>
                  )}
                  
                  {/* Selection indicator */}
                  <Box sx={{ 
                    mt: 1, 
                    minHeight: '24px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {artOptions[section.field] !== "none" ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: { xs: 12, md: 14 } }} />
                        <Typography variant="caption" sx={{ 
                          color: '#4CAF50', 
                          fontWeight: 500,
                          fontSize: { xs: '0.7rem', md: '0.75rem' },
                        }}>
                          {section.field === "size" && artOptions.size === "custom" ? 
                           (customSize || "Enter custom size") : 
                           artOptions[section.field]}
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="caption" sx={{ 
                        color: '#999', 
                        fontSize: { xs: '0.7rem', md: '0.75rem' },
                        fontStyle: 'italic'
                      }}>
                        Optional - Select if needed
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
            
            {/* Selection summary - Enhanced for desktop */}
            {(artOptions.type !== "none" || artOptions.size !== "none" || artOptions.material !== "none") && (
              <Box sx={{ 
                mt: 2,
                pt: 1.5,
                borderTop: '1px solid #e0e0e0',
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 0.5 }}>
                  <CheckCircleIcon sx={{ color: '#B88746', fontSize: { xs: 14, md: 16 } }} />
                  <Typography variant="subtitle2" sx={{ color: "#B88746", fontWeight: 600, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                    Your Art Selection
                  </Typography>
                </Box>
                
                <Grid container spacing={1}>
                  {artOptions.type !== "none" && (
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ 
                        p: { xs: 1, md: 1.5 }, 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                      }}>
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          fontSize: { xs: '0.7rem', md: '0.75rem' }, 
                          display: 'block', 
                          mb: 0.5 
                        }}>
                          Type
                        </Typography>
                        <Typography sx={{ 
                          fontWeight: 600, 
                          color: '#B88746', 
                          fontSize: { xs: '0.8rem', md: '0.9rem' }
                        }}>
                          {artOptions.type}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  {artOptions.size !== "none" && (
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ 
                        p: { xs: 1, md: 1.5 }, 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                      }}>
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          fontSize: { xs: '0.7rem', md: '0.75rem' }, 
                          display: 'block', 
                          mb: 0.5 
                        }}>
                          Size
                        </Typography>
                        <Typography sx={{ 
                          fontWeight: 600, 
                          color: '#B88746', 
                          fontSize: { xs: '0.8rem', md: '0.9rem' }
                        }}>
                          {artOptions.size === "custom" ? customSize : artOptions.size}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                  {artOptions.material !== "none" && (
                    <Grid item xs={12} sm={4}>
                      <Box sx={{ 
                        p: { xs: 1, md: 1.5 }, 
                        backgroundColor: 'white', 
                        borderRadius: '8px',
                        border: '1px solid #e0e0e0'
                      }}>
                        <Typography variant="caption" color="text.secondary" sx={{ 
                          fontSize: { xs: '0.7rem', md: '0.75rem' }, 
                          display: 'block', 
                          mb: 0.5 
                        }}>
                          Material
                        </Typography>
                        <Typography sx={{ 
                          fontWeight: 600, 
                          color: '#B88746', 
                          fontSize: { xs: '0.8rem', md: '0.9rem' }
                        }}>
                          {artOptions.material}
                        </Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Fade>

      {/* Other Sections */}
      {sections.map((section, idx) => (
        <Fade in timeout={800 + idx * 100} key={section.id}>
          <Accordion 
            expanded={expandedAccordion === section.id}
            onChange={handleAccordionChange(section.id)}
            sx={{ 
              mb: 1.5,
              borderRadius: '12px',
              '&:before': { display: 'none' },
              boxShadow: isDesktop ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
              sx={{
                minHeight: '40px',
                py: 0,
                px: { xs: 1.5, md: 2 },
                '& .MuiAccordionSummary-content': { my: 0.5 },
              }}
            >
              <Typography sx={{ 
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 600,
                color: "#B88746",
              }}>
                {section.label}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ py: 1, px: { xs: 1.5, md: 2 } }}>
              {section.content}
            </AccordionDetails>
          </Accordion>
        </Fade>
      ))}

      {/* Submit Button - Enhanced for desktop */}
      <Zoom in timeout={1000}>
        <Box textAlign="center" sx={{ mt: { xs: 2, md: 3 }, mb: { xs: 2, md: 3 } }}>
          <Button
            variant="contained"
            size={isMobile ? "small" : "medium"}
            onClick={handleSubmit}
            disabled={
              !personalInfo.name || 
              !personalInfo.phone || 
              (artOptions.size === "custom" && !customSize.trim())
            }
            sx={{
              backgroundColor: (
                !personalInfo.name || 
                !personalInfo.phone || 
                (artOptions.size === "custom" && !customSize.trim())
              ) ? "#ddd" : "#A8743D",
              color: "white",
              py: { xs: 0.75, md: 1 },
              px: { xs: 3, md: 4 },
              fontSize: { xs: '0.85rem', md: '1rem' },
              borderRadius: "25px",
              minWidth: { xs: '160px', md: '200px' },
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(168, 116, 61, 0.2)',
              '&:hover:not(:disabled)': {
                backgroundColor: "#B88746",
                transform: "translateY(-2px)",
                boxShadow: '0 6px 16px rgba(168, 116, 61, 0.3)',
              },
              '&:active:not(:disabled)': {
                animation: `${bounceShrink} 0.3s ease-in-out`,
              },
              transition: 'all 0.3s',
            }}
          >
            {!personalInfo.name || !personalInfo.phone ? "Fill Personal Info" : 
             (artOptions.size === "custom" && !customSize.trim()) ? "Enter Custom Size" :
             "Submit via WhatsApp"}
          </Button>
          
          {/* Status messages */}
          <Box sx={{ mt: 1 }}>
            {(!personalInfo.name || !personalInfo.phone) && (
              <Typography variant="caption" color="#ff4444" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                Fill Name & Phone *
              </Typography>
            )}
            {personalInfo.name && personalInfo.phone && (artOptions.size === "custom" && !customSize.trim()) && (
              <Typography variant="caption" color="#ff4444" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                Enter custom size dimensions *
              </Typography>
            )}
            {personalInfo.name && personalInfo.phone && !(artOptions.size === "custom" && !customSize.trim()) && (
              <Typography variant="caption" color="#4CAF50" sx={{ fontSize: { xs: '0.7rem', md: '0.8rem' } }}>
                ✓ Ready to submit!
              </Typography>
            )}
          </Box>
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