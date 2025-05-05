import React, { useState } from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { keyframes } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const bounceShrink = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.92); }
  100% { transform: scale(1); }
`;

const CustomTextField = ({
  label,
  value,
  onChange,
  error,
  helperText,
  type = "text",
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
    InputLabelProps={type === "date" || type === "time" ? { shrink: true } : {}}
    {...rest}
  />
);

const Customize = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

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
  const [sketchType, setSketchType] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
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

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);

  const handleSubmit = () => {
    let valid = true;
    const errorObj = {
      name: false,
      email: false,
      phone: false,
      address: false,
      emailError: "",
      phoneError: "",
    };

    Object.entries(personalInfo).forEach(([key, value]) => {
      const isRequired = ["name", "phone"].includes(key);
      if (isRequired && !value.trim()) {
        errorObj[key] = true;
        valid = false;
      } else {
        if (key === "email" && value.trim()) {
          const emailValid = validateEmail(value);
          errorObj[key] = !emailValid;
          errorObj.emailError = emailValid ? "" : "Please enter a valid email";
          if (!emailValid) valid = false;
        } else if (key === "phone") {
          const phoneValid = validatePhone(value);
          errorObj[key] = !phoneValid;
          errorObj.phoneError = phoneValid
            ? ""
            : "Please enter a valid phone number";
          if (!phoneValid) valid = false;
        }
      }
    });

    setErrors(errorObj);

    if (!valid) {
      if (errorObj.emailError) toast.error(errorObj.emailError);
      if (errorObj.phoneError) toast.error(errorObj.phoneError);
      const firstError = Object.keys(errorObj).find((key) => errorObj[key]);
      if (firstError && !["emailError", "phoneError"].includes(firstError)) {
        toast.error(
          `${firstError.charAt(0).toUpperCase() + firstError.slice(1)} is required`,
        );
      }
      if (firstError) {
        document
          .getElementById(firstError)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const createSection = (title, fields) => {
      const filledFields = Object.entries(fields)
        .filter(([_, value]) => value && value.trim() !== "")
        .map(([key, value]) => `• ${key}: ${value.trim()}`);
      if (filledFields.length === 0) return "";
      return `\n\n  ${title}\n${filledFields.join("\n")}`;
    };

    let message = `New Custom Art Request\n\nHere are the details for my custom artwork request:`;
    message += createSection("*--Personal Information--*", {
      Name: personalInfo.name,
      Email: personalInfo.email,
      Phone: personalInfo.phone,
      Address: personalInfo.address,
    });

    if (sketchType || size || material) {
      message += createSection("*--Sketch Details--*", {
        Type: sketchType,
        Size: size,
        Material: material,
      });
    }

    message += createSection("*--Live Sketch Event--*", liveSketch);
    message += createSection("*--Mural Painting--*", mural);
    message += createSection("*--T-Shirt Design--*", tshirt);
    message += createSection("*--Shoe Customization--*", shoe);

    message += `\n\nThank you! I'm looking forward to working with you on this project.\n\nPlease let me know if you need any additional information.`;

    const whatsappURL = `https://wa.me/9176425811?text=${encodeURIComponent(message)}`;
    setTimeout(() => window.open(whatsappURL, "_blank"), 300);

    setSubmitted(true);
    toast.success("Request sent via WhatsApp!");
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  // Responsive grid settings
  const getGridSize = (field) => {
    if (isMobile) return 12;
    if (isTablet) return field === "description" ? 12 : 6;
    return field === "description" ? 12 : 4;
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        maxWidth: "1000px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
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
      '&:hover': {
        backgroundColor: "#B88746", 
        color: "#fff",              
      },
    }}
  >
    View Samples
  </Button>
</Box>




      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your request has been prepared! Check WhatsApp to confirm details.
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          👤 Personal Information{" "}
        </Typography>
        <Grid container spacing={2}>
          {["name*", "email", "phone*", "address"].map((field) => (
            <Grid item xs={12} sm={6} key={field} id={field}>
              <CustomTextField
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={personalInfo[field]}
                onChange={(e) =>
                  setPersonalInfo({ ...personalInfo, [field]: e.target.value })
                }
                error={errors[field]}
                helperText={
                  errors[field]
                    ? `${field.charAt(0).toUpperCase() + field.slice(1)} is invalid or required`
                    : ""
                }
                size={isMobile ? "small" : "medium"}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {[
        {
          label: "🖌 Art Options",
          content: (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" sx={{ minWidth: 200 }}>
                  <InputLabel id="sketch-type-label">Art Type</InputLabel>
                  <Select
                    labelId="sketch-type-label"
                    id="sketch-type-select"
                    value={sketchType}
                    onChange={(e) => setSketchType(e.target.value)}
                  >
                    <MenuItem value="Realistic Pencil Sketch">
                      📝 Realistic Pencil Sketch
                    </MenuItem>
                    <MenuItem value="Cartoon Sketch">
                      🎨 Cartoon Sketch
                    </MenuItem>
                    <MenuItem value="Regular Sketch">
                      ✏ Regular Sketch
                    </MenuItem>
                    <MenuItem value="Regular Sketch">
                    🎨 Acrylic Painting

</MenuItem>
                    <MenuItem value="Regular Sketch">
                    🖌️ Oil Painting


                    </MenuItem>
                    <MenuItem value="Regular Sketch">
                    💧 Watercolor


                    </MenuItem>
                    <MenuItem value="Regular Sketch">
                    🖼️ Art Prints


                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" sx={{ minWidth: 200 }}>
                  <InputLabel id="size-label">Size</InputLabel>
                  <Select
                    labelId="size-label"
                    id="size-select"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <MenuItem value="A4">📄 A4</MenuItem>
                    <MenuItem value="A3">🖼 A3</MenuItem>
                    <MenuItem value="A2">🗂 A2</MenuItem>
                    <MenuItem value="A1">📐 A1</MenuItem>
                    <MenuItem value="custom">⚙️Custom Size</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="filled" sx={{ minWidth: 200 }}>
                  <InputLabel id="material-label">Material</InputLabel>
                  <Select
                    labelId="material-label"
                    id="material-select"
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                  >
                    <MenuItem value="Paper">📜 Paper</MenuItem>
                    <MenuItem value="Canvas">🖌 Canvas</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          ),
        },

        {
          label: "📅 Live Sketch",
          content: (
            <Grid container spacing={2}>
              {["place", "date", "time"].map((field) => (
                <Grid item xs={12} sm={4} key={field}>
                  <CustomTextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={liveSketch[field]}
                    type={
                      field === "date"
                        ? "date"
                        : field === "time"
                          ? "time"
                          : "text"
                    }
                    onChange={(e) =>
                      setLiveSketch({ ...liveSketch, [field]: e.target.value })
                    }
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
              ))}
            </Grid>
          ),
        },
        {
          label: "🎨 Mural Paint",
          content: (
            <Grid container spacing={2}>
              {["Wallsize", "Design", "Location", "description"].map(
                (field) => (
                  <Grid item xs={getGridSize(field)} key={field}>
                    <CustomTextField
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={tshirt[field]}
                      onChange={(e) =>
                        setTshirt({ ...tshirt, [field]: e.target.value })
                      }
                      multiline={field === "description"}
                      rows={field === "description" ? 3 : 1}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                ),
              )}
            </Grid>
          ),
        },
        {
          label: "👕 T-Shirt Design",
          content: (
            <Grid container spacing={2}>
              {["size", "color", "design", "description"].map((field) => (
                <Grid item xs={getGridSize(field)} key={field}>
                  <CustomTextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={tshirt[field]}
                    onChange={(e) =>
                      setTshirt({ ...tshirt, [field]: e.target.value })
                    }
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
          label: "👟 Shoe Paint",
          content: (
            <Grid container spacing={2}>
              {["type", "size", "design", "description"].map((field) => (
                <Grid item xs={getGridSize(field)} key={field}>
                  <CustomTextField
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={shoe[field]}
                    onChange={(e) =>
                      setShoe({ ...shoe, [field]: e.target.value })
                    }
                    multiline={field === "description"}
                    rows={field === "description" ? 3 : 1}
                    size={isMobile ? "small" : "medium"}
                  />
                </Grid>
              ))}
            </Grid>
          ),
        },
      ].map((section, idx) => (
        <Accordion key={idx} sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontSize: isMobile ? "0.9rem" : "1rem" }}>
              {section.label}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: isMobile ? 1 : 2 }}>
            {section.content}
          </AccordionDetails>
        </Accordion>
      ))}

      <Box textAlign="center" sx={{ mt: 4, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
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
            "&::after": {
              content: "''",
              position: "absolute",
              top: 0,
              left: "50%",
              width: "0%",
              height: "100%",
              backgroundColor: "white",
              transition: "width 0.3s ease-in-out, left 0.3s ease-in-out",
              zIndex: -1,
            },
            "&:hover": {
              backgroundColor: "white",
              color: "#A8743D",
              transform: "scale(1.05)",
            },
            "&:hover::after": {
              width: "100%",
              left: 0,
            },
            "&:active": {
              animation: `${bounceShrink} 0.3s ease-in-out`,
            },
          }}
        >
          Submit via WhatsApp
        </Button>
      </Box>

      <ToastContainer
        position={isMobile ? "top-right" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default Customize;
