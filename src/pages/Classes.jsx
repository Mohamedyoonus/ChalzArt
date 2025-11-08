import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  Fade,
} from "@mui/material";
import {
  Brush as BrushIcon,
  Palette as PaletteIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Language as LanguageIcon,
  Star as StarIcon,
  Groups as GroupsIcon,
  EmojiEvents as EmojiEventsIcon,
  WorkspacePremium as CertificateIcon,
  FormatQuote as QuoteIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const Classes = () => {
  const goldColor = "#B88746";
  const darkGold = "#9A6C35";
  const lightGold = "#f8f4ef";

  const features = [
    { icon: <GroupsIcon />, text: "One-on-One Attention" },
    { icon: <StarIcon />, text: "Peaceful Environment" },
    { icon: <EmojiEventsIcon />, text: "Professional Guidance" },
    { icon: <PeopleIcon />, text: "All Skill Levels" },
    { icon: <PaletteIcon />, text: "Quality Materials" },
    { icon: <ScheduleIcon />, text: "Flexible Timing" },
  ];

  return (
    <Box sx={{ bgcolor: lightGold, py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Fade in={true} timeout={900}>
          <Card
            elevation={8}
            sx={{
              borderRadius: 4,
              textAlign: "center",
              overflow: "hidden",
              bgcolor: "white",
              boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
              p: { xs: 3, md: 6 },
              border: `2px solid ${lightGold}`,
              position: "relative",
            }}
          >
            {/* MARK:Hero Section */}
             <Box
      sx={{
        mb: 5,
        textAlign: "center",
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("/assets/classbanner.jpg")', // ✅ added dark overlay
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 3,
        p: { xs: 4, md: 8 },
        color: "white",
      }}
    >
      {/* Animated Heading */}
      <Typography
        component={motion.h1}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontFamily: "'Playfair Display', serif",
          fontSize: { xs: "1.2rem", sm: "2.5rem", md: "3rem" },
          textShadow: "3px 3px 10px rgba(0,0,0,0.8)", // stronger shadow
          whiteSpace: { xs: "nowrap", md: "normal" },
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Chalz Art Drawing Classes
      </Typography>

      {/* Animated Subheading */}
      <Typography
        component={motion.p}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        variant="h6"
        sx={{
          maxWidth: 700,
          mx: "auto",
          fontStyle: "italic",
          fontSize: { xs: "0.8rem", sm: "1.2rem", md: "1.5rem" },
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)", // stronger shadow
          lineHeight: 1.6,
        }}
      >
        Learn Freehand, Portrait, and Hyper-Realistic Drawing in a peaceful
        offline environment!
      </Typography>
    </Box>

            {/* MARK:About Section */}
            <CardContent sx={{ px: 0 }}>
              <Typography
  variant="h5"
  fontWeight="bold"
  gutterBottom
  sx={{
    color: darkGold,
    mb: 2,
    fontSize: { xs: "1.3rem", sm: "1.25rem", md: "1.5rem" }, // responsive font sizes
    whiteSpace: { xs: "nowrap", md: "normal" }, // single line on mobile
    overflow: "hidden",
    textOverflow: "ellipsis",
  }}
>
  <BrushIcon
    sx={{
      fontSize: { xs: 20, md: 28 }, // smaller icon on mobile
      mr: 1,
      verticalAlign: "middle",
    }}
  />
  Master the Art of Drawing
</Typography>

              <Typography
                variant="body1"
                paragraph
                sx={{ mb: 4, color: "text.secondary", lineHeight: 1.7 }}
              >
               Join Chalz Art’s one-on-one classes to grow your skills, from freehand basics to hyper-realistic portraits, with personalized guidance.
              </Typography>

              {/*MARK: Skills */}
              <Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr" }, // side by side even in mobile
    gap: { xs: 1, sm: 2 }, // smaller gap in mobile
    mb: 5,
  }}
>
  {[
    { icon: <BrushIcon />, text: "Freehand Drawing" },
    { icon: <PaletteIcon />, text: "Painting Techniques" },
    { icon: <PeopleIcon />, text: "Kids Regular Classes" },
    { icon: <StarIcon />, text: "Portrait & Hyper-Realistic" },
  ].map((skill, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        alignItems: "center",
        p: { xs: 1, sm: 2 }, // smaller padding in mobile
        borderRadius: 2,
        bgcolor: lightGold,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 2,
          bgcolor: "#f3ebe0",
        },
      }}
    >
      <Box
        sx={{
          color: goldColor,
          mr: 1,
          fontSize: { xs: "1rem", sm: "1.5rem" }, // smaller icons in mobile
        }}
      >
        {skill.icon}
      </Box>
      <Typography
        fontWeight="medium"
        sx={{
          fontSize: { xs: "0.75rem", sm: "1rem" }, // smaller text in mobile
        }}
      >
        {skill.text}
      </Typography>
    </Box>
  ))}
</Box>


              
              {/* Content Grid */}
              <Grid
                container
                spacing={3}
                sx={{ my: 4 }}
                justifyContent="center"
                alignItems="stretch" // ensures equal card heights
              >
                {/* MARK:Schedule Section */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 3,
                      height: "80%", // full height
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center", // vertical center
                      textAlign: "center",
                      borderRadius: 2,
                      boxShadow: 1,
                      bgcolor: "background.paper",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: lightGold,
                        borderRadius: "50%",
                        mb: 2,
                        boxShadow: 1,
                      }}
                    >
                      <ScheduleIcon sx={{ fontSize: 24, color: goldColor }} />
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{ color: darkGold, mb: 1.5, fontWeight: 700 }}
                    >
                      Class Schedule
                    </Typography>

                    <Box sx={{ width: "100%", mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={500}
                        >
                          Days:
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="600"
                          sx={{ color: darkGold }}
                        >
                          Tue & Thu
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={500}
                        >
                          Time:
                        </Typography>
                        <Typography
                          variant="body2"
                          fontWeight="600"
                          sx={{ color: darkGold }}
                        >
                          05:00 – 07:00 PM
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      icon={<PeopleIcon sx={{ color: "white !important" }} />}
                      label="All Age Groups"
                      sx={{
                        bgcolor: goldColor,
                        color: "white",
                        fontWeight: "600",
                        height: 28,
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </Grid>

                {/* MARK:Location Section */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 3,
                      height: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: 2,
                      boxShadow: 1,
                      bgcolor: "background.paper",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: lightGold,
                        borderRadius: "50%",
                        mb: 2,
                        boxShadow: 1,
                      }}
                    >
                      <LocationIcon sx={{ fontSize: 24, color: goldColor }} />
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{ color: darkGold, mb: 1.5, fontWeight: 700 }}
                    >
                      Location
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: darkGold }}
                      >
                        Maruthi Nagar, Madiwala
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Bangalore, India
                      </Typography>
                    </Box>

                    <Button
                      variant="outlined"
                      size="small"
                      component="a"
                      href="https://www.google.com/maps/dir//Zuzuvadi,+Madiwala,+1st+Stage,+BTM+Layout,+Bengaluru,+Karnataka+560068/@12.9257455,77.5331109,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x48ee6d11d7181f1:0x9d71bf7813746fae!2m2!1d77.6155128!2d12.9257584?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: goldColor,
                        borderColor: goldColor,
                        borderRadius: 2,
                        fontWeight: "600",
                        fontSize: "0.75rem",
                        "&:hover": {
                          borderColor: darkGold,
                          bgcolor: "rgba(184, 135, 70, 0.08)",
                        },
                      }}
                    >
                      View on Map
                    </Button>
                  </Box>
                </Grid>

                {/* MARK:Contact Section */}
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 3,
                      height: "80%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      borderRadius: 2,
                      boxShadow: 1,
                      bgcolor: "background.paper",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 55,
                        height: 55,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: lightGold,
                        borderRadius: "50%",
                        mb: 2,
                        boxShadow: 1,
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 24, color: goldColor }} />
                    </Box>

                    <Typography
                      variant="subtitle1"
                      sx={{ color: darkGold, mb: 1.5, fontWeight: 700 }}
                    >
                      Contact Us
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        fontWeight="600"
                        sx={{ color: darkGold }}
                      >
                        +91-9176425811
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        Call or WhatsApp
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        thechalzart@gmail.com
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        www.chalzart.in
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        component="a"
                        href="tel:+919176425811"
                        sx={{
                          bgcolor: goldColor,
                          borderRadius: 2,
                          fontWeight: "600",
                          px: 2,
                          fontSize: "0.75rem",
                          "&:hover": { bgcolor: darkGold },
                        }}
                      >
                        Call
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        component="a"
                        href="mailto:thechalzart@gmail.com?subject=Inquiry%20from%20Website&body=Hello%20Chalz%20Art%2C%0D%0A%0D%0AI%20would%20like%20to%20know%20more%20about..."
                        sx={{
                          bgcolor: goldColor,
                          borderRadius: 2,
                          fontWeight: "600",
                          px: 2,
                          fontSize: "0.75rem",
                          "&:hover": { bgcolor: darkGold },
                        }}
                      >
                        Email
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/*MARK: Features */}
              <Box sx={{ mb: 5 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: darkGold, mb: 3 }}
                >
                  <StarIcon sx={{ color: goldColor, mr: 1 }} />
                  Why Choose Chalz Art?
                </Typography>
                <Box
  sx={{
    display: "grid",
    gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, // 2 per row on mobile
    gap: { xs: 1, sm: 2 }, // smaller gap in mobile
  }}
>
  {features.map((feature, i) => (
    <Box
      key={i}
      sx={{
        p: { xs: 1, sm: 2 }, // smaller padding in mobile
        borderRadius: 2,
        bgcolor: lightGold,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 2,
        },
      }}
    >
      <Box
        sx={{
          color: goldColor,
          fontSize: { xs: 20, sm: 30 }, // smaller icon in mobile
          mb: 1,
        }}
      >
        {feature.icon}
      </Box>
      <Typography
        variant="body2"
        fontWeight="medium"
        sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }} // smaller text in mobile
      >
        {feature.text}
      </Typography>
    </Box>
  ))}
</Box>

              </Box>

              {/* MARK:Certificate Section */}
              <Box
                sx={{
                  p: 4,
                  borderRadius: 3,
                  bgcolor: "#fff8e1",
                  mb: 5,
                  textAlign: "center",
                }}
              >
                <CertificateIcon
                  sx={{ fontSize: 50, color: goldColor, mb: 2 }}
                />
               <Typography
  variant="h6"
  fontWeight="bold"
  noWrap
  sx={{
    color: darkGold,
    fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" }, // smaller on mobile
  }}
>
  Certificate of Completion
</Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Every student receives a professional certificate after course
                  completion.
                </Typography>
              </Box>

              {/* Testimonials */}
              <Box sx={{ mb: 5, textAlign: "center" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ color: darkGold, mb: 3 }}
                >
                  <QuoteIcon sx={{ color: goldColor, mr: 1 }} />
                  What Our Students Say
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: "italic",
                    maxWidth: 600,
                    mx: "auto",
                    color: "text.secondary",
                  }}
                >
                  “Chalz Art helped me rediscover my passion for drawing. The
                  classes are peaceful, professional, and full of learning.”
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1, color: darkGold }}>
                  – A Happy Student
                </Typography>
              </Box>

              {/* Call to Action */}
              <Box
  sx={{
    textAlign: "center",
    mt: 4,
    p: { xs: 3, sm: 4 },
    borderRadius: 3,
    background: `linear-gradient(135deg, ${goldColor}, ${darkGold})`,
    position: "relative",
    overflow: "hidden",
    '&:before': {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)",
      animation: "pulse 4s infinite ease-in-out",
    },
    boxShadow: "0 10px 30px rgba(184, 135, 70, 0.3)",
  }}
>
  {/* Animated decorative elements */}
  <Box
    sx={{
      position: "absolute",
      top: -20,
      right: -20,
      width: 100,
      height: 100,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      animation: "float 6s infinite ease-in-out",
    }}
  />
  <Box
    sx={{
      position: "absolute",
      bottom: -30,
      left: -30,
      width: 120,
      height: 120,
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.1)",
      animation: "float 8s infinite ease-in-out",
      animationDelay: "1s",
    }}
  />
  
  <Typography
    variant="h5"
    fontWeight="bold"
    gutterBottom
    sx={{ 
      color: "white",
      position: "relative",
      zIndex: 2,
      fontSize: { xs: '1.35rem', sm: '1.5rem' },
      animation: "fadeInUp 0.8s ease-out",
    }}
  >
    Limited Slots Available!
  </Typography>
  
  <Typography
    variant="body1"
    sx={{ 
      mb: 3, 
      maxWidth: 500, 
      mx: "auto", 
      color: "#f9f9f9",
      fontSize: { xs: '0.95rem', sm: '1rem' },
      position: "relative",
      zIndex: 2,
      animation: "fadeInUp 0.8s ease-out 0.2s both",
    }}
  >
    Secure your spot in our exclusive art classes today. Don't miss this opportunity to grow your artistic skills.
  </Typography>
  
<Button
  variant="contained"
  size="large"
  component="a"
  href="https://docs.google.com/forms/d/e/1FAIpQLSdMIwpn-dDLV7gFdx37V8jv59ChZkLil0ot1W0ikCRc19HxvQ/viewform"
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    bgcolor: "white",
    color: darkGold,
    fontWeight: "bold",
    px: { xs: 4, sm: 5 },
    py: 1.5,
    borderRadius: 3,
    position: "relative",
    zIndex: 2,
    animation: "fadeInUp 0.8s ease-out 0.4s both, pulse 2s infinite",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      bgcolor: "#f8f8f8",
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
    },
  }}
>
  Register Now
</Button>


  {/* Animation keyframes */}
  <style>
    {`
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes float {
      0% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
      100% { transform: translateY(0) rotate(0deg); }
    }
    `}
  </style>
</Box>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Classes;
