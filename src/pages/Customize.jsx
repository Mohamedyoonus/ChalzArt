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
import { keyframes } from "@mui/system";

// Lazy load toast container for better performance
const ToastContainer = lazy(() =>
  import("react-toastify").then((module) => ({ default: module.ToastContainer }))
);
const toast = lazy(() =>
  import("react-toastify").then((module) => ({ default: module.toast }))
);

// Enhanced animations
const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Optimized TextField with memo to prevent unnecessary re-renders
const CustomTextField = React.memo(({
  label,
  value,
  onChange,
  error,
  helperText,
  type = "text",
  size = "medium",
  ...rest
}) => (
  <TextField
    label={label}
    fullWidth
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    type={type}
    size={size}
    InputLabelProps={type === "date" || type === "time" ? { shrink: true } : {}}
    sx={{
      '& .MuiOutlinedInput-root': {
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      },
    }}
    {...rest}
  />
));

// Custom Time Select Component for 12-hour format
const TimeSelect = React.memo(({ value, onChange, label, size = "medium" }) => {
  const times = useMemo(() => {
    const timeSlots = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour === 12 ? 12 : hour;
        const displayMinute = minute === 0 ? '00' : minute;
        const timeValue = `${displayHour}:${displayMinute} ${period}`;
        timeSlots.push(timeValue);
      }
    }
    return timeSlots;
  }, []);

  return (
    <FormControl fullWidth size={size}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
        label={label}
      >
        <MenuItem value="">
          <em>Select Time</em>
        </MenuItem>
        {times.map((time) => (
          <MenuItem key={time} value={time}>
            {time}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

// Skeleton loader for better perceived performance
const SectionSkeleton = () => (
  <Box sx={{ mb: 2 }}>
    <Skeleton variant="rectangular" height={48} sx={{ mb: 1, borderRadius: 1 }} />
    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
  </Box>
);

const Customize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Optimized state management with proper default values
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
  
  // Set default values to "none" instead of empty strings
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
  const [expandedAccordion, setExpandedAccordion] = useState("personal");

  // Memoized validation functions
  const validateEmail = useCallback((email) => /^\S+@\S+\.\S+$/.test(email), []);
  const validatePhone = useCallback((phone) => /^[0-9]{10}$/.test(phone), []);

  // Optimized event handlers with useCallback
  const handlePersonalInfoChange = useCallback((field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleArtOptionChange = useCallback((field, value) => {
    setArtOptions(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleLiveSketchChange = useCallback((field, value) => {
    setLiveSketch(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAccordionChange = useCallback((panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : false);
  }, []);

  // Memoized grid size calculation
  const getGridSize = useMemo(() => (field) => {
    if (isMobile) return 12;
    if (isTablet) return field === "description" ? 12 : 6;
    return field === "description" ? 12 : 4;
  }, [isMobile, isTablet]);

  // Show error dialog
  const showError = useCallback((message) => {
    setErrorMessage(message);
    setShowErrorDialog(true);
  }, []);

  // Enhanced submit handler with required field validation
  const handleSubmit = useCallback(async () => {
    let valid = true;
    const errorObj = {
      name: false,
      email: false,
      phone: false,
      address: false,
      emailError: "",
      phoneError: "",
    };

    // Required field validation
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

    if (personalInfo.email.trim() && !validateEmail(personalInfo.email)) {
      errorObj.email = true;
      errorObj.emailError = "Please enter a valid email address";
      valid = false;
      showError("Please enter a valid email address");
      return;
    }

    if (personalInfo.phone.trim() && !validatePhone(personalInfo.phone)) {
      errorObj.phone = true;
      errorObj.phoneError = "Please enter a valid 10-digit phone number";
      valid = false;
      showError("Please enter a valid 10-digit phone number");
      return;
    }

    setErrors(errorObj);

    if (!valid) {
      const firstError = Object.keys(errorObj).find(
        (key) => errorObj[key] && !["emailError", "phoneError"].includes(key)
      );
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }
      return;
    }

    // Message construction - only include art options if not "none"
    const createSection = (title, fields) => {
      const filledFields = Object.entries(fields)
        .filter(([_, value]) => value && value.trim() !== "" && value !== "none")
        .map(([key, value]) => `• ${key}: ${value.trim()}`);
      if (filledFields.length === 0) return "";
      return `\n\n  ${title}\n${filledFields.join("\n")}`;
    };

    let message = `Hi,\n\nHere are the details for my custom artwork request:`;
    message += createSection("*--Personal Information--*", {
      Name: personalInfo.name,
      Email: personalInfo.email,
      Phone: personalInfo.phone,
      Address: personalInfo.address,
    });

    // Check if any art option is selected (not "none")
    if (artOptions.type !== "none" || artOptions.size !== "none" || artOptions.material !== "none") {
      message += createSection("*--Art Details--*", {
        "Art Type": artOptions.type,
        Size: artOptions.size,
        Material: artOptions.material,
      });
    }

    message += createSection("*--Live Sketch Event--*", liveSketch);
    message += createSection("*--Mural Painting--*", mural);
    message += createSection("*--T-Shirt Design--*", tshirt);
    message += createSection("*--Shoe Customization--*", shoe);

    message += `\n\nThank you! I'm looking forward to working with you on this project.\n\nPlease let me know if you need any additional information.`;

    const whatsappURL = `https://wa.me/9176425811?text=${encodeURIComponent(message)}`;
    
    // Immediate redirect to WhatsApp
    window.open(whatsappURL, "_blank");
    setSubmitted(true);
    toast.success("Opening WhatsApp...");
    
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  }, [personalInfo, artOptions, liveSketch, mural, tshirt, shoe, validateEmail, validatePhone, showError]);

  // Memoized section configurations
  const sections = useMemo(() => [
    {
      id: "art",
      label: "🖌 Art Options",
      content: (
        <Grid container spacing={2}>
          {[
            { 
              field: "type", 
              label: "Art Type", 
              options: [
                { value: "none", label: "None" },
                { value: "Realistic Pencil Sketch", label: "📝 Realistic Pencil Sketch" },
                { value: "Cartoon Sketch", label: "🎨 Cartoon Sketch" },
                { value: "Regular Sketch", label: "✏ Regular Sketch" },
                { value: "Acrylic Painting", label: "🎨 Acrylic Painting" },
                { value: "Oil Painting", label: "🖌️ Oil Painting" },
                { value: "Watercolor", label: "💧 Watercolor" },
                { value: "Art Prints", label: "🖼️ Art Prints" },
              ]
            },
            { 
              field: "size", 
              label: "Size", 
              options: [
                { value: "none", label: "None" },
                { value: "A4", label: "📄 A4" },
                { value: "A3", label: "🖼 A3" },
                { value: "A2", label: "🗂 A2" },
                { value: "A1", label: "📐 A1" },
                { value: "custom", label: "⚙️ Custom Size" },
              ]
            },
            { 
              field: "material", 
              label: "Material", 
              options: [
                { value: "none", label: "None" },
                { value: "Paper", label: "📜 Paper" },
                { value: "Canvas", label: "🖌 Canvas" },
              ]
            },
          ].map((item) => (
            <Grid item xs={12} key={item.field}>
              <FormControl fullWidth variant="filled" size={isMobile ? "small" : "medium"}>
                <InputLabel id={`${item.field}-label`}>{item.label}</InputLabel>
                <Select
                  labelId={`${item.field}-label`}
                  value={artOptions[item.field]}
                  onChange={(e) => handleArtOptionChange(item.field, e.target.value)}
                  label={item.label}
                  displayEmpty
                >
                  {item.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>
      ),
    },
    {
      id: "live",
      label: "📅 Live Sketch",
      content: (
        <Grid container spacing={2}>
          <Grid  xs={12} sm={4}>
            <CustomTextField
              label="Place"
              value={liveSketch.place}
              onChange={(e) => handleLiveSketchChange("place", e.target.value)}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid  xs={12} sm={4}>
            <CustomTextField
              label="Date"
              value={liveSketch.date}
              type="date"
              onChange={(e) => handleLiveSketchChange("date", e.target.value)}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
          <Grid xs={12} sm={4}>
            <TimeSelect
              label="Time"
              value={liveSketch.time}
              onChange={(e) => handleLiveSketchChange("time", e.target.value)}
              size={isMobile ? "small" : "medium"}
            />
          </Grid>
        </Grid>
      ),
    },
    {
      id: "mural",
      label: "🎨 Mural Paint",
      content: (
        <Grid container spacing={2}>
          {["wallSize", "surface", "location"].map((field) => (
            <Grid xs={12} sm={4} key={field}>
              <CustomTextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={mural[field]}
                onChange={(e) => setMural(prev => ({ ...prev, [field]: e.target.value }))}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
          ))}
        </Grid>
      ),
    },
    {
      id: "tshirt",
      label: "👕 T-Shirt Design",
      content: (
        <Grid container spacing={2}>
          {["size", "color", "design", "description"].map((field) => (
            <Grid item xs={getGridSize(field)} key={field}>
              <CustomTextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={tshirt[field]}
                onChange={(e) => setTshirt(prev => ({ ...prev, [field]: e.target.value }))}
                multiline={field === "description"}
                rows={field === "description" ? 3 : 1}
                size={isMobile ? "small" : "medium"}
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
        <Grid container spacing={2}>
          {["type", "size", "design", "description"].map((field) => (
            <Grid item xs={getGridSize(field)} key={field}>
              <CustomTextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={shoe[field]}
                onChange={(e) => setShoe(prev => ({ ...prev, [field]: e.target.value }))}
                multiline={field === "description"}
                rows={field === "description" ? 3 : 1}
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
          ))}
        </Grid>
      ),
    },
  ], [artOptions, liveSketch, mural, tshirt, shoe, getGridSize, isMobile, handleArtOptionChange, handleLiveSketchChange]);

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: "1000px",
        margin: "0 auto",
        minHeight: "100vh",
        background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
      }}
    >
      {/* Header Section */}
      <Slide direction="down" in timeout={500}>
        <Box>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontSize: {
                xs: "1.75rem",
                sm: "2rem",
                md: "2.25rem",
                lg: "2.5rem",
              },
              fontWeight: 500,
              color: "#B88746",
              letterSpacing: "0.8px",
              fontFamily: "'Playfair Display', serif",
              mt: { xs: 0, sm: 1 },
              mb: { xs: 2, sm: 3 },
              animation: `${floatAnimation} 3s ease-in-out infinite`,
            }}
          >
            Craft Your Vision
          </Typography>

          <Box textAlign="center" sx={{ mb: 3 }}>
            <Button
              variant="outlined"
              component="a"
              href="https://wa.me/c/919176425811"
              target="_blank"  
              rel="noopener noreferrer"
              sx={{
                borderRadius: "20px",
                fontWeight: "bold",
                fontSize: isMobile ? "0.8rem" : "1rem",
                px: 3,
                py: 1,
                textDecoration: "none",
                color: "#B88746",       
                borderColor: "#B88746", 
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: "#B88746", 
                  color: "#fff",              
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(184, 135, 70, 0.3)',
                },
              }}
            >
              View Samples
            </Button>
          </Box>
        </Box>
      </Slide>

      {/* Success Alert */}
      <Fade in={submitted} timeout={500}>
        <Box sx={{ mb: 3 }}>
          {submitted && (
            <Alert severity="success" sx={{ borderRadius: 2 }}>
              Opening WhatsApp with your request details...
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
        <DialogTitle id="error-dialog-title" sx={{ color: "#d32f2f" }}>
          ⚠️ Required Information Missing
        </DialogTitle>
        <DialogContent>
          <Typography>{errorMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowErrorDialog(false)}
            sx={{ color: "#B88746" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Personal Information */}
      <Zoom in timeout={600}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: { xs: 2, sm: 3 }, 
            mb: 4,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              elevation: 4,
              transform: 'translateY(-2px)',
            }
          }}
        >
          <Typography variant="h6" gutterBottom sx={{ color: "#B88746" }}>
            👤 Personal Information *
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2, fontStyle: 'italic' }}>
            Fields marked with * are required
          </Typography>
          <Grid container spacing={2}>
            {["name", "email", "phone", "address"].map((field) => (
              <Grid xs={12} sm={6} key={field} id={field}>
                <CustomTextField
                  label={`${field.charAt(0).toUpperCase() + field.slice(1)}${field === "name" || field === "phone" ? "*" : ""}`}
                  value={personalInfo[field]}
                  onChange={(e) => handlePersonalInfoChange(field, e.target.value)}
                  error={errors[field]}
                  helperText={
                    errors[field]
                      ? field === "name" 
                        ? "Name is required"
                        : field === "phone"
                          ? errors.phoneError || "Phone number is required"
                          : field === "email"
                            ? errors.emailError || "Please enter a valid email address"
                            : ""
                      : field === "name" || field === "phone" 
                        ? ""
                        : ""
                  }
                  size={isMobile ? "small" : "medium"}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Zoom>

      {/* Dynamic Sections */}
      <Suspense fallback={<SectionSkeleton />}>
        {sections.map((section, idx) => (
          <Fade in timeout={800 + idx * 100} key={section.id}>
            <Accordion 
              expanded={expandedAccordion === section.id}
              onChange={handleAccordionChange(section.id)}
              sx={{ 
                mb: 2,
                transition: 'all 0.3s ease-in-out',
                '&:before': { display: 'none' },
                borderRadius: '8px !important',
              }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon sx={{ color: "#B88746" }} />}
                sx={{
                  backgroundColor: expandedAccordion === section.id ? '#f8f5f0' : 'transparent',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#f8f5f0',
                  },
                }}
              >
                <Typography sx={{ 
                  fontSize: isMobile ? "0.9rem" : "1rem",
                  fontWeight: 600,
                  color: "#B88746",
                }}>
                  {section.label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ 
                pt: isMobile ? 1 : 2,
                transition: 'all 0.3s ease-in-out',
              }}>
                {section.content}
              </AccordionDetails>
            </Accordion>
          </Fade>
        ))}
      </Suspense>

      {/* Submit Button */}
      <Zoom in timeout={1000}>
        <Box textAlign="center" sx={{ mt: 4, mb: 4 }}>
          <Button
            variant="contained"
            size={isMobile ? "medium" : "large"}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#A8743D",
              color: "white",
              padding: {
                xs: "10px 24px",
                sm: "12px 32px",
              },
              fontWeight: "600",
              fontSize: isMobile ? "0.9rem" : "1rem",
              borderRadius: "30px",
              boxShadow: "0px 8px 30px rgba(167, 109, 54, 0.6)",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              minWidth: '200px',
              '&::after': {
                content: "''",
                position: "absolute",
                top: 0,
                left: "50%",
                width: "0%",
                height: "100%",
                backgroundColor: "white",
                transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
                zIndex: 0,
              },
              '&:hover': {
                backgroundColor: "white",
                color: "#A8743D",
                transform: "scale(1.05)",
                boxShadow: "0px 12px 40px rgba(167, 109, 54, 0.8)",
              },
              '&:hover::after': {
                width: "100%",
                left: 0,
              },
              '&:active': {
                animation: `${bounceShrink} 0.3s ease-in-out`,
              },
            }}
          >
            <Box
              component="span"
              sx={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              Submit via WhatsApp
            </Box>
          </Button>
        </Box>
      </Zoom>

      {/* Lazy loaded Toast Container */}
      <Suspense fallback={null}>
        <ToastContainer
          position={isMobile ? "top-right" : "top-right"}
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ fontSize: isMobile ? '12px' : '14px' }}
        />
      </Suspense>
    </Box>
  );
};

export default React.memo(Customize);