import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  Email,
  Phone,
  LocationOn,
  KeyboardArrowUp,
} from "@mui/icons-material";

const styles = `
@keyframes waveAnimation {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-6px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(6px); }
}
`;

const getIconColor = (platform) => {
  switch (platform) {
    case "Facebook":
      return "#1877F2";
    case "Instagram":
      return "#E1306C";
    case "Twitter":
      return "#1DA1F2";
    case "YouTube":
      return "#FF0000";
    default:
      return "#aaa";
  }
};

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const socialLinks = [
    { icon: Facebook, label: "Facebook", link: "https://www.facebook.com/share/1LAPsZ2U25/" },
    { icon: Instagram, label: "Instagram", link: "https://www.instagram.com/chalzart?igsh=MTdhaWliZnFmYng3Mg==" },
    { icon: Twitter, label: "Twitter", link: "https://twitter.com" },
    { icon: YouTube, label: "YouTube", link: "https://youtube.com/@chalzart?si=Ai52HlwzsftDoGH4" },
  ];

  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Gallery", path: "/myworks" },
    { label: "Booking", path: "/customize" },
  ];

  const moreLinks = [
    { label: "Live Sketch", path: "/live-sketch" },
    { label: "T-shirt Design", path: "/tshirt-design" },
    { label: "Shoe Paint", path: "/shoe-paint" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "black",
        color: "#ccc",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        pt: 6,
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <style>{styles}</style>

      <Container maxWidth="lg">
        <Grid container spacing={6} justifyContent="center">
          {/* Brand + Socials */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems={isMobile ? "center" : "flex-start"}
          >
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#B88746", mb: 2 }}>
              Chalzart
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#aaa",
                maxWidth: 300,
                lineHeight: 1.7,
                fontStyle: "italic",
                mb: 2,
              }}
            >
              Crafting timeless, hyper-realistic sketches and live portraits
              that reflect emotion and soul.
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: isMobile ? "center" : "flex-start",
              }}
            >
              {socialLinks.map(({ icon: Icon, label, link }, index) => (
                <Tooltip key={label} title={label} arrow>
                  <IconButton
                    component="a"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      color: getIconColor(label),
                      mx: "10px",
                      animation: "waveAnimation 2s ease-in-out infinite",
                      animationDelay: `${index * 0.2}s`,
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.3)",
                        boxShadow: `0px 6px 18px ${getIconColor(label)}`,
                      },
                    }}
                  >
                    <Icon sx={{ fontSize: "2rem" }} />
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          </Grid>

          {/* Quick Links and More Links */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="flex-start"
            textAlign="center"
          >
            <Box sx={{ mx: 4 }}>
              <Typography variant="h6" fontWeight="600" sx={{ color: "#B88746", mb: 2 }}>
                Quick Links
              </Typography>
              {quickLinks.map((link) => (
                <Link key={link.label} to={link.path} style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: "#ccc",
                      fontSize: 14,
                      mb: 1,
                      transition: "0.3s ease",
                      "&:hover": { color: "#C89B3C", pl: 1 },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>

            <Box sx={{ mx: 4 }}>
              <Typography variant="h6" fontWeight="600" sx={{ color: "#B88746", mb: 2 }}>
                More
              </Typography>
              {moreLinks.map((link) => (
                <Link key={link.label} to={link.path} style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: "#ccc",
                      fontSize: 14,
                      mb: 1,
                      transition: "0.3s ease",
                      "&:hover": { color: "#C89B3C", pl: 1 },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            flexDirection="column"
            alignItems={isMobile ? "center" : "flex-start"}
          >
            <Typography variant="h6" fontWeight="600" sx={{ color: "#B88746", mb: 2 }}>
              Stay in Touch
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Box display="flex" alignItems="center" justifyContent={isMobile ? "center" : "flex-start"} mb={1}>
                <LocationOn fontSize="small" sx={{ mr: 1, color: "#aaa" }} />
                <Typography variant="body2">Bangalore, India</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent={isMobile ? "center" : "flex-start"} mb={1}>
                <Phone fontSize="small" sx={{ mr: 1, color: "#aaa" }} />
                <Typography variant="body2">+91 9176425811</Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent={isMobile ? "center" : "flex-start"}>
                <Email fontSize="small" sx={{ mr: 1, color: "#aaa" }} />
                <Typography variant="body2">thechalzart@gmail.com</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ backgroundColor: "#333", my: 4 }} />

        {/* Footer Bottom */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            textAlign: "center",
            gap: 2,
            pb: 4,
          }}
        >
          <Typography variant="body2" sx={{ color: "#888", fontSize: 14 }}>
            © 2019–2035 Chalzart. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ color: "#555", fontSize: 13 }}>
            Designed and developed by  Yoonus
          </Typography>
        </Box>

        {/* Scroll To Top */}
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "absolute",
            bottom: 30,
            right: 30,
            backgroundColor: "#C89B3C",
            color: "#000",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "#e0c066",
              transform: "scale(1.1)",
            },
            transition: "all 0.3s ease",
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Container>
    </Box>
  );
};

export default Footer;
