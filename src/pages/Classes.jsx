import React, { useState, useEffect, useRef } from "react";
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
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia,
  useMediaQuery,
  useTheme,
  Divider,
  Stack,
  Avatar,
} from "@mui/material";
import {
  Brush as BrushIcon,
  Palette as PaletteIcon,
  Schedule as ScheduleIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Star as StarIcon,
  Groups as GroupsIcon,
  EmojiEvents as EmojiEventsIcon,
  WorkspacePremium as CertificateIcon,
  FormatQuote as QuoteIcon,
  Close as CloseIcon,
  WhatsApp as WhatsAppIcon,
  Instagram as InstagramIcon,
  CheckCircle as CheckCircleIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Image as ImageIcon,
  School as SchoolIcon,
  TrendingUp as TrendingUpIcon,
  Facebook as FacebookIcon,
  ArrowForward as ArrowForwardIcon,
  CalendarToday as CalendarIcon,
  Place as PlaceIcon,
  ContactPhone as ContactIcon,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Classes = () => {
  const goldColor = "#B88746";
  const darkGold = "#9A6C35";
  const lightGold = "#f8f4ef";
  const [openGallery, setOpenGallery] = useState(false);
  const [expandedFeatures, setExpandedFeatures] = useState(false);
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const statsRef = useRef(null);

  const features = [
    { icon: <GroupsIcon />, text: "Personal Attention" },
    { icon: <StarIcon />, text: "Peaceful Studio" },
    { icon: <EmojiEventsIcon />, text: "Expert Guidance" },
    { icon: <PeopleIcon />, text: "All Levels" },
    { icon: <PaletteIcon />, text: "Quality Materials" },
    { icon: <ScheduleIcon />, text: "Flexible Timing" },
  ];

  const statsData = [
    { value: 100, suffix: "+", label: "Students Trained" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 98, suffix: "%", label: "Satisfaction" },
    { value: 500, suffix: "+", label: "Artworks Created" },
  ];

  const galleryImages = [
    "/assets/gallery1.jpg",
    "/assets/gallery2.jpg",
    "/assets/gallery3.jpg",
    "/assets/gallery4.jpg",
  ];

  const testimonials = [
    { name: "Priya S.", text: "My drawing skills improved dramatically!", role: "Student" },
    { name: "Rahul M.", text: "Best art classes in Bangalore", role: "Student" },
    { name: "Ananya K.", text: "My child loves coming to class", role: "Parent" },
  ];

  // Custom count up animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const interval = setInterval(() => {
            setStats((prev) => {
              const newStats = [...prev];
              let allComplete = true;
              
              newStats.forEach((stat, index) => {
                const target = statsData[index].value;
                if (stat < target) {
                  const increment = Math.max(1, Math.ceil(target / 40));
                  newStats[index] = Math.min(stat + increment, target);
                  allComplete = false;
                }
              });
              
              if (allComplete) {
                clearInterval(interval);
              }
              
              return newStats;
            });
          }, 40);
          
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ bgcolor: lightGold, py: { xs: 2, md: 4 }, minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* MARK: Hero Section - Mobile Optimized */}
        <Box
          sx={{
            mb: { xs: 3, md: 4 },
            textAlign: "center",
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/assets/classbanner.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 3,
            p: { xs: 3, md: 6 },
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            variant="h1"
            fontWeight="800"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
              textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            Chalz Art Drawing Classes
          </Typography>

          <Typography
            component={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            variant="h6"
            sx={{
              maxWidth: 800,
              mx: "auto",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.4rem" },
              textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
              lineHeight: 1.5,
              mb: 3,
            }}
          >
            Master Drawing in a Peaceful Studio Environment
          </Typography>

          <Button
            component={motion.a}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            variant="contained"
            href="#registration"
            sx={{
              bgcolor: goldColor,
              color: "white",
              fontWeight: "bold",
              px: { xs: 4, md: 6 },
              py: { xs: 1, md: 1.5 },
              borderRadius: 2,
              fontSize: { xs: "0.9rem", md: "1rem" },
              "&:hover": {
                bgcolor: darkGold,
              },
            }}
          >
            Start Learning Today
          </Button>
        </Box>

        {/* MARK: Stats - Compact Mobile View */}
        <Box ref={statsRef} sx={{ mb: 4 }}>
          <Grid container spacing={1} justifyContent="center">
            {statsData.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      textAlign: "center",
                      p: { xs: 1.5, sm: 2 },
                      borderRadius: 2,
                      bgcolor: "white",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      height: "100%",
                      border: `1px solid ${goldColor}15`,
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="800"
                      sx={{
                        color: darkGold,
                        fontSize: { xs: "1.5rem", sm: "2rem" },
                        mb: 0.5,
                      }}
                    >
                      {stats[index]}
                      {stat.suffix}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        fontWeight: 500,
                        fontSize: { xs: "0.7rem", sm: "0.8rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* MARK: Single Box for Schedule, Location, Contact - Vertical Layout */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 3,
            overflow: "hidden",
            border: `2px solid ${goldColor}30`,
          }}
        >
          <Box
            sx={{
              bgcolor: darkGold,
              p: 2,
              textAlign: "center",
              color: "white",
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}
            >
              Class Information
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 2, md: 3 } }}>
            {/* Schedule */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Avatar sx={{ bgcolor: lightGold, width: 40, height: 40 }}>
                <ScheduleIcon sx={{ color: goldColor, fontSize: 20 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                  SCHEDULE
                </Typography>
                <Typography variant="body1" fontWeight="600" sx={{ color: darkGold }}>
                  Tue & Thu • 5:00-7:00 PM
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Small batches • All ages welcome
                </Typography>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Location */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Avatar sx={{ bgcolor: lightGold, width: 40, height: 40 }}>
                <LocationIcon sx={{ color: goldColor, fontSize: 20 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                  LOCATION
                </Typography>
                <Typography variant="body1" fontWeight="600" sx={{ color: darkGold }}>
                  Maruthi Nagar, Madiwala
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Bangalore, Karnataka
                </Typography>
                <Button
                  size="small"
                  href="https://goo.gl/maps/example"
                  target="_blank"
                  sx={{
                    mt: 0.5,
                    fontSize: "0.75rem",
                    color: goldColor,
                    textTransform: "none",
                    p: 0,
                    minWidth: 0,
                  }}
                >
                  View on Map →
                </Button>
              </Box>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Contact */}
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar sx={{ bgcolor: lightGold, width: 40, height: 40 }}>
                <PhoneIcon sx={{ color: goldColor, fontSize: 20 }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
                  CONTACT
                </Typography>
                <Typography variant="body1" fontWeight="600" sx={{ color: darkGold }}>
                  +91 91764 25811
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Call/WhatsApp • thechalzart@gmail.com
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <IconButton
                    size="small"
                    href="tel:+919176425811"
                    sx={{
                      bgcolor: goldColor,
                      color: "white",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <PhoneIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                  <IconButton
                    size="small"
                    href="https://wa.me/919176425811"
                    target="_blank"
                    sx={{
                      bgcolor: "#25D366",
                      color: "white",
                      width: 30,
                      height: 30,
                    }}
                  >
                    <WhatsAppIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Card>

        {/* MARK: Features - Mobile Optimized */}
        <Card sx={{ mb: 4, p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: darkGold,
              mb: 3,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <StarIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
            Why Choose Us
          </Typography>

          <Grid container spacing={1}>
            {features.map((feature, index) => (
              <Grid item xs={6} sm={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      p: 2,
                      textAlign: "center",
                      borderRadius: 2,
                      bgcolor: lightGold,
                      height: "100%",
                      border: `1px solid ${goldColor}20`,
                    }}
                  >
                    <Box
                      sx={{
                        color: goldColor,
                        fontSize: { xs: 24, md: 28 },
                        mb: 1,
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="body2"
                      fontWeight="600"
                      sx={{
                        fontSize: { xs: "0.75rem", sm: "0.85rem" },
                        lineHeight: 1.2,
                      }}
                    >
                      {feature.text}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Card>

        {/* MARK: Skill Levels - Mobile Optimized */}
        <Card sx={{ mb: 4, p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: darkGold,
              mb: 3,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SchoolIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
            Choose Your Level
          </Typography>

          <Stack spacing={2}>
            {[
              {
                level: "Beginner",
                desc: "Learn basics, shapes & shading",
                duration: "4 weeks",
                color: "#4CAF50",
              },
              {
                level: "Intermediate",
                desc: "Portraits, colors & composition",
                duration: "6 weeks",
                color: "#2196F3",
              },
              {
                level: "Advanced",
                desc: "Hyper-realistic & personal style",
                duration: "8 weeks",
                color: "#9C27B0",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    borderLeft: `4px solid ${item.color}`,
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: "#f9f9f9",
                    },
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item.level}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontSize: "0.75rem" }}
                      >
                        {item.desc}
                      </Typography>
                    </Box>
                    <Chip
                      label={item.duration}
                      size="small"
                      sx={{
                        bgcolor: item.color,
                        color: "white",
                        fontSize: "0.7rem",
                        fontWeight: "bold",
                      }}
                    />
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Card>

        {/* MARK: Gallery Preview - Mobile Optimized */}
        <Card sx={{ mb: 4, p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: darkGold,
              mb: 3,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <ImageIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
            Student Gallery
          </Typography>

          <Grid container spacing={1}>
            {galleryImages.slice(0, 2).map((img, index) => (
              <Grid item xs={6} key={index}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenGallery(true)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={img}
                      alt={`Artwork ${index + 1}`}
                    />
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mt: 2,
              color: goldColor,
              borderColor: goldColor,
              fontSize: "0.85rem",
              py: 1,
            }}
            onClick={() => setOpenGallery(true)}
          >
            View More Artworks
          </Button>
        </Card>

        {/* MARK: Testimonials - Mobile Optimized */}
        <Card sx={{ mb: 4, p: { xs: 2, md: 3 }, borderRadius: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              color: darkGold,
              mb: 3,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <QuoteIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
            What Students Say
          </Typography>

          <Stack spacing={2}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: lightGold,
                    border: `1px solid ${goldColor}20`,
                  }}
                >
                  <QuoteIcon
                    sx={{
                      color: goldColor,
                      fontSize: 20,
                      mb: 1,
                      opacity: 0.7,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      fontStyle: "italic",
                      mb: 1.5,
                      fontSize: { xs: "0.85rem", md: "0.95rem" },
                      lineHeight: 1.4,
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      sx={{ color: darkGold }}
                    >
                      {testimonial.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontSize: "0.7rem" }}
                    >
                      {testimonial.role}
                    </Typography>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </Card>

        {/* MARK: Final CTA - Mobile Optimized */}
        <Box
          id="registration"
          sx={{
            textAlign: "center",
            p: { xs: 3, md: 4 },
            borderRadius: 3,
            background: `linear-gradient(135deg, ${goldColor}, ${darkGold})`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              color: "white",
              mb: 2,
              fontSize: { xs: "1.3rem", md: "1.8rem" },
            }}
          >
            Start Your Art Journey
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.9)",
              mb: 3,
              fontSize: { xs: "0.9rem", md: "1rem" },
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Limited seats available. Register today for personalized attention!
          </Typography>

          <Stack spacing={2} alignItems="center">
            <Button
              variant="contained"
              fullWidth={isMobile}
              href="https://docs.google.com/forms/d/e/1FAIpQLSdMIwpn-dDLV7gFdx37V8jv59ChZkLil0ot1W0ikCRc19HxvQ/viewform"
              target="_blank"
              sx={{
                bgcolor: "white",
                color: darkGold,
                fontWeight: "bold",
                px: { xs: 4, md: 6 },
                py: 1.5,
                borderRadius: 2,
                fontSize: { xs: "0.9rem", md: "1rem" },
                "&:hover": {
                  bgcolor: "#f8f8f8",
                },
              }}
            >
              Register Now
            </Button>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                size="small"
                href="tel:+919176425811"
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontSize: "0.8rem",
                  px: 2,
                }}
              >
                Call
              </Button>
              <Button
                variant="outlined"
                size="small"
                href="https://wa.me/919176425811"
                target="_blank"
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontSize: "0.8rem",
                  px: 2,
                }}
              >
                WhatsApp
              </Button>
            </Stack>
          </Stack>
        </Box>

       
      </Container>

      {/* Gallery Dialog */}
      <Dialog
        open={openGallery}
        onClose={() => setOpenGallery(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
      >
        <DialogActions sx={{ p: 1 }}>
          <IconButton onClick={() => setOpenGallery(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogActions>
        <DialogContent sx={{ p: 2 }}>
          <Stack spacing={2}>
            {galleryImages.map((img, index) => (
              <Card key={index}>
                <CardMedia
                  component="img"
                  height={isMobile ? 250 : 300}
                  image={img}
                  alt={`Artwork ${index + 1}`}
                  sx={{ objectFit: "cover" }}
                />
              </Card>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Classes;