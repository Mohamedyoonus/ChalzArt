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
   MenuItem,
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

  const nameRef = React.useRef(null);
const phoneRef = React.useRef(null);

const [errors, setErrors] = useState({
  name: false,
  phone: false,
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
  width: "",
  height: "",
  unit: "ft",
  surfaceType: "",
  customLocation: "",
  paintingType: "design",
});

const [wallPickerOpen, setWallPickerOpen] = useState(false);

  
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
const [expandedAccordion, setExpandedAccordion] = useState(false);

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

 const handleMuralChange = useCallback(
  (field, value) => {
    const newValue =
      field === "surfaceType" && value === mural.surfaceType
        ? "none"
        : value;

    setMural((prev) => ({
      ...prev,
      [field]: newValue,
      // ✅ Clear custom location if not "custom"
      ...(field === "surfaceType" && newValue !== "custom"
        ? { customLocation: "" }
        : {}),
    }));
  },
  [mural.surfaceType]
);


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
     let hasError = false;

if (!personalInfo.name.trim()) {
  setErrors((prev) => ({ ...prev, name: true }));
  hasError = true;
  setExpandedAccordion("personal-info");
  setTimeout(() => {
    nameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    nameRef.current?.focus();
  }, 200);
}

if (!personalInfo.phone.trim()) {
  setErrors((prev) => ({ ...prev, phone: true }));
  if (!hasError) {
    setExpandedAccordion("personal-info");
    setTimeout(() => {
      phoneRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      phoneRef.current?.focus();
    }, 200);
  }
  hasError = true;
}

if (hasError) {
  setIsSubmitting(false);
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
 const wallSizeValue =
  mural.width && mural.height
    ? `${mural.width} x ${mural.height} ${mural.unit}`
    : "";

const surfaceValue =
  mural.surfaceType === "custom"
    ? mural.customLocation
    : mural.surfaceType;

if (wallSizeValue || surfaceValue) {
  message += createSection("Mural Painting:", {
    ...(wallSizeValue && { "Wall Size": wallSizeValue }),
    ...(surfaceValue && surfaceValue !== "none" && {
      "Surface Type": surfaceValue,
    }),
    "Painting Type":
      mural.paintingType === "design"
        ? "Design Painting"
        : "Mural Art",
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
  mb: { xs: -5, sm: 3, md: 4 }, // 🔽 reduced on mobile
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
    mb: { xs: 1.5, sm: 3, md: 4 }, // 🔽 reduced gap below on mobile
    mt: { xs: 0, sm: 0 }, 
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
  inputRef={item.field === "name" ? nameRef : item.field === "phone" ? phoneRef : null}
  label={item.label}
  value={personalInfo[item.field]}
  onChange={(e) => {
    handlePersonalInfoChange(item.field, e.target.value);
    setErrors((prev) => ({ ...prev, [item.field]: false }));
  }}
  error={errors[item.field]}
  helperText={
    errors[item.field]
      ? item.field === "name"
        ? "Name is required"
        : "Phone number is required"
      : ""
  }
  size="medium"
  fullWidth
  placeholder={item.placeholder}
  sx={{
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '&.Mui-error fieldset': {
        borderColor: '#d32f2f',
      },
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
        expanded={expandedAccordion === "art"}
        onChange={handleAccordionChange("art")}
        sx={{
          mb: 2,
          borderRadius: 3,
          border: 1,
          borderColor: "divider",
          backgroundColor: "white",
          "&:before": { display: "none" },
        }}
      >
        {/* Header */}
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
          sx={{
            minHeight: 56,
            px: 2,
            "& .MuiAccordionSummary-content": {
              alignItems: "center",
            },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem" },
              fontWeight: 600,
              color: "#B88746",
            }}
          >
            🎨 Art Customization
          </Typography>
        </AccordionSummary>

        {/* Content */}
        <AccordionDetails sx={{ px: { xs: 1.5, sm: 2 }, py: 2 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(3, minmax(0, 1fr))",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: { xs: 1.5, sm: 2 },
            }}
          >
            {artOptionsConfig.map((section) => (
              <Box key={section.id}>
                {/* Column Header */}
                <Typography
                  sx={{
                    color: section.disabled
                      ? "text.disabled"
                      : "#B88746",
                    fontWeight: 600,
                    mb: 1,
                    fontSize: { xs: "0.8rem", sm: "0.95rem" },
                    textAlign: "center",
                  }}
                >
                  {section.label}
                </Typography>

                {/* Options */}
                {section.options.map((option) => {
                  const selected =
                    artOptions[section.field] === option.value;

                  return (
                    <Box
                      key={option.value}
                      onClick={() =>
                        !section.disabled &&
                        handleArtOptionChange(
                          section.field,
                          option.value
                        )
                      }
                      sx={{
                        p: { xs: 1.2, sm: 1.5 },
                        mb: 1.2,
                        border: selected
                          ? "2px solid #B88746"
                          : "1px solid",
                        borderColor: selected
                          ? "#B88746"
                          : "divider",
                        borderRadius: 2,
                        cursor: section.disabled
                          ? "not-allowed"
                          : "pointer",
                        backgroundColor: selected
                          ? "rgba(184,135,70,0.08)"
                          : "transparent",
                        opacity: section.disabled ? 0.6 : 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <Radio
                          size="small"
                          checked={selected}
                          disabled={section.disabled}
                          sx={{
                            color: "divider",
                            "&.Mui-checked": {
                              color: "#B88746",
                            },
                            p: 0,
                          }}
                        />

                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: "0.72rem",
                                sm: "0.9rem",
                              },
                              fontWeight: selected ? 600 : 400,
                              color: selected
                                ? "#B88746"
                                : "text.primary",
                              lineHeight: 1.2,
                              whiteSpace: "normal",
                              wordBreak: "break-word",   // ✅ prevent overflow
                            }}
                          >
                            {isMobile
                              ? option.label
                              : `${option.icon} ${option.label}`}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "0.65rem",
                              color: selected
                                ? "#A8743D"
                                : "text.secondary",
                              display: { xs: "none", sm: "block" },
                            }}
                          >
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}

                {/* ✅ Clean Custom Size Field (single box) */}
               {section.field === "size" &&
  artOptions.size === "custom" && (
    <TextField
      fullWidth
      size="small"
      value={customSize}
      onChange={(e) => setCustomSize(e.target.value)}
      placeholder="(e.g., 24x36 in)"
      sx={{
        mt: 1,
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          fontSize: { xs: "0.8rem", sm: "0.9rem" }, // input text size
        },
        "& input::placeholder": {
          fontSize: { xs: "0.7rem", sm: "0.8rem" }, // ✅ hint text smaller
          opacity: 0.8,
        },
      }}
    />
  )}

              </Box>
            ))}
          </Box>
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
      "&:before": { display: "none" },
    }}
  >
    {/* Header */}
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
      sx={{
        minHeight: 56,
        px: 2,
        "& .MuiAccordionSummary-content": { my: 1 },
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: "#B88746",
          fontSize: { xs: "0.95rem", sm: "1rem" },
        }}
      >
        📅 Live Sketch Event
      </Typography>
    </AccordionSummary>

    {/* Content */}
    <AccordionDetails sx={{ py: 2, px: { xs: 1.5, sm: 3 } }}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {/* Place / Venue */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Place / Venue"
            value={liveSketch.place}
            onChange={(e) =>
              handleLiveSketchChange("place", e.target.value)
            }
            size="small"
            fullWidth
            placeholder="Event location"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
              },
              "& .MuiInputLabel-shrink": {
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              },
              "& input::placeholder": {
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
              },
            }}
          />
        </Grid>

        {/* Date */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            value={liveSketch.date}
            type="date"
            onChange={(e) =>
              handleLiveSketchChange("date", e.target.value)
            }
            size="small"
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
              },
              "& .MuiInputLabel-root": {
                fontSize: { xs: "0.75rem", sm: "0.8rem" },
              },
              "& .MuiInputLabel-shrink": {
                fontSize: { xs: "0.7rem", sm: "0.75rem" },
              },
            }}
            InputLabelProps={{
              shrink: true, // needed for date type
            }}
          />
        </Grid>

        {/* Duration */}
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#B88746",
              fontWeight: 600,
              mb: 1.5,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            ⏱️ Sketch Duration
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(4, 1fr)",
              },
              gap: { xs: 1.2, sm: 2 },
              mb: 1.5,
            }}
          >
            {durationOptions.map((option) => {
              const selected =
                liveSketch.duration === option.value;

              return (
                <Box
                  key={option.value}
                  onClick={() =>
                    handleLiveSketchChange(
                      "duration",
                      option.value
                    )
                  }
                  sx={{
                    p: { xs: 1.2, sm: 2 },
                    border: selected
                      ? "2px solid #B88746"
                      : "1px solid",
                    borderColor: selected
                      ? "#B88746"
                      : "divider",
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: selected
                      ? "rgba(184,135,70,0.08)"
                      : "transparent",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    <Radio
                      size="small"
                      checked={selected}
                      sx={{
                        color: "divider",
                        "&.Mui-checked": {
                          color: "#B88746",
                        },
                        p: 0,
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: selected ? 600 : 400,
                          color: selected
                            ? "#B88746"
                            : "text.primary",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                          },
                          lineHeight: 1.2,
                        }}
                      >
                        {option.label}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.65rem",
                          color: selected
                            ? "#A8743D"
                            : "text.secondary",
                          display: { xs: "none", sm: "block" },
                        }}
                      >
                        {option.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* Custom Duration */}
          {liveSketch.duration === "custom" && (
            <TextField
              label="Custom Duration"
              value={liveSketch.customDuration}
              onChange={(e) =>
                setLiveSketch((prev) => ({
                  ...prev,
                  customDuration: e.target.value,
                }))
              }
              size="small"
              fullWidth
              placeholder="e.g., 2 days or 8 hours"
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                },
                "& .MuiInputLabel-root": {
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                },
                "& .MuiInputLabel-shrink": {
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                },
                "& input::placeholder": {
                  fontSize: { xs: "0.75rem", sm: "0.8rem" },
                },
              }}
            />
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
      "&:before": { display: "none" },
    }}
  >
    {/* Header */}
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
      sx={{
        minHeight: 56,
        px: 2,
        "& .MuiAccordionSummary-content": { my: 1 },
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: "#B88746",
          fontSize: { xs: "0.95rem", sm: "1rem" },
        }}
      >
        🎨 Mural / Wall Painting
      </Typography>
    </AccordionSummary>

    <AccordionDetails sx={{ py: 2, px: { xs: 1.5, sm: 3 } }}>
      <Grid container spacing={{ xs: 1.5, sm: 3 }}>
        {/* 🧱 Wall Size Picker */}
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#B88746",
              fontWeight: 600,
              mb: 1,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            📐 Wall Size
          </Typography>

      <TextField
  label="Wall Size"
  value={
    mural.width && mural.height
      ? `${mural.width} x ${mural.height} ${mural.unit}`
      : ""
  }
  onClick={() => setWallPickerOpen(true)}
  placeholder="Select wall size"
  size="small"
  fullWidth
  InputProps={{
    readOnly: true,
    endAdornment:
      mural.width && mural.height ? (
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // prevent opening picker
            setMural((p) => ({
              ...p,
              width: "",
              height: "",
              unit: "ft",
            }));
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : null,
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      fontSize: { xs: "0.85rem", sm: "0.9rem" },
    },
    "& .MuiInputLabel-root": {
      fontSize: { xs: "0.75rem", sm: "0.8rem" },
    },
    "& .MuiInputLabel-shrink": {
      fontSize: { xs: "0.7rem", sm: "0.75rem" },
    },
  }}
/>


        </Grid>

        {/* 🎯 Painting Type as Cards */}
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#B88746",
              fontWeight: 600,
              mb: 1.2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            🎯 Painting Type
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1.5,
            }}
          >
            {[
              { value: "design", label: "Design Paint" },
              { value: "mural", label: "Mural Paint" },
            ].map((opt) => {
              const selected = mural.paintingType === opt.value;

              return (
                <Box
                  key={opt.value}
                  onClick={() =>
                    setMural((p) => ({
                      ...p,
                      paintingType: opt.value,
                    }))
                  }
                  sx={{
                    p: 2,
                    textAlign: "center",
                    border: selected
                      ? "2px solid #B88746"
                      : "1px solid",
                    borderColor: selected
                      ? "#B88746"
                      : "divider",
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: selected
                      ? "rgba(184,135,70,0.08)"
                      : "transparent",
                    fontWeight: selected ? 600 : 400,
                    color: selected
                      ? "#B88746"
                      : "text.primary",
                  }}
                >
                  {opt.label}
                </Box>
              );
            })}
          </Box>

          {/* ➕ Other type */}
          {mural.paintingType === "other" && (
            <TextField
              label="Specify Painting Type"
              value={mural.otherPaintingType}
              onChange={(e) =>
                setMural((p) => ({
                  ...p,
                  otherPaintingType: e.target.value,
                }))
              }
              size="small"
              fullWidth
              sx={{ ...textFieldSx, mt: 1.5 }}
              placeholder="Enter custom type"
            />
          )}
        </Grid>

        {/* 🏢 Surface / Location */}
        <Grid item xs={12}>
          <Typography
            sx={{
              color: "#B88746",
              fontWeight: 600,
              mb: 1.5,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            🏢 Surface / Location
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(5, 1fr)",
              },
              gap: { xs: 1.2, sm: 2 },
            }}
          >
            {surfaceOptions.map((option) => {
              const selected =
                mural.surfaceType === option.value;

              return (
                <Box
                  key={option.value}
                  onClick={() =>
                    handleMuralChange(
                      "surfaceType",
                      option.value
                    )
                  }
                  sx={{
                    p: { xs: 1.2, sm: 2 },
                    border: selected
                      ? "2px solid #B88746"
                      : "1px solid",
                    borderColor: selected
                      ? "#B88746"
                      : "divider",
                    borderRadius: 2,
                    cursor: "pointer",
                    backgroundColor: selected
                      ? "rgba(184,135,70,0.08)"
                      : "transparent",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: selected ? 600 : 400,
                      color: selected
                        ? "#B88746"
                        : "text.primary",
                      fontSize: {
                        xs: "0.8rem",
                        sm: "0.9rem",
                      },
                      lineHeight: 1.2,
                    }}
                  >
                    {option.label}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.65rem",
                      color: selected
                        ? "#A8743D"
                        : "text.secondary",
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    {option.description}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <Dialog
  open={wallPickerOpen}
  onClose={() => setWallPickerOpen(false)}
  fullWidth
  maxWidth="xs"
>
  <DialogTitle>📐 Select Wall Size</DialogTitle>
  <DialogContent>
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 80px",
        gap: 1.5,
        mt: 1,
      }}
    >
      <TextField
        label="Width"
        type="number"
        size="small"
        value={mural.width}
        onChange={(e) =>
          setMural((p) => ({ ...p, width: e.target.value }))
        }
      />
      <TextField
        label="Height"
        type="number"
        size="small"
        value={mural.height}
        onChange={(e) =>
          setMural((p) => ({ ...p, height: e.target.value }))
        }
      />
      <TextField
        select
        label="Unit"
        size="small"
        value={mural.unit}
        onChange={(e) =>
          setMural((p) => ({ ...p, unit: e.target.value }))
        }
      >
        <MenuItem value="ft">ft</MenuItem>
        <MenuItem value="m">m</MenuItem>
      </TextField>
    </Box>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setWallPickerOpen(false)}>
      Cancel
    </Button>
    <Button
      variant="contained"
      sx={{ backgroundColor: "#B88746" }}
      onClick={() => setWallPickerOpen(false)}
    >
      OK
    </Button>
  </DialogActions>
</Dialog>
{mural.surfaceType === "custom" && (
  <TextField
    label="Enter Location"
    value={mural.customLocation}
    onChange={(e) =>
      setMural((p) => ({
        ...p,
        customLocation: e.target.value,
      }))
    }
    size="small"
    fullWidth
    placeholder="e.g., Office wall, outdoor gate..."
    sx={{
      mt: 1.5,
      "& .MuiOutlinedInput-root": {
        borderRadius: 2,
        fontSize: { xs: "0.85rem", sm: "0.9rem" },
      },
      "& .MuiInputLabel-root": {
        fontSize: { xs: "0.75rem", sm: "0.8rem" },
      },
      "& .MuiInputLabel-shrink": {
        fontSize: { xs: "0.7rem", sm: "0.75rem" },
      },
      "& input::placeholder": {
        fontSize: { xs: "0.75rem", sm: "0.8rem" },
      },
    }}
  />
)}


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