import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Button,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Fade,
  Divider,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/chalzfavicon.svg";
import CloseIcon from "@mui/icons-material/Close";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { motion } from "framer-motion";
import '@fontsource/lora/400.css';
import '@fontsource/lora/700.css';


const navItems = [
  { label: "Home", path: "/" },
  { label: "Gallery", path: "/myworks" },
  { label: "Custom Art", path: "/customize" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <>
      <Fade in={!mobileOpen} timeout={300}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            backdropFilter: scrolled ? "blur(20px)" : "blur(10px)",
            background: scrolled
              ? "rgba(255, 255, 255, 0.98)"
              : "rgba(255, 255, 255, 0.9)",
            boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.1)" : "none",
            borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.08)" : "none",
            px: { xs: 2, md: 6 },
            transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
            zIndex: 1300,
            height: scrolled ? "70px" : "90px",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            {/* Logo and Name */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={logo}
                    alt="Chalz Art Logo"
                    style={{
                      height: scrolled ? "36px" : "48px",
                      transition: "all 0.3s ease",
                      objectFit: "contain",
                    }}
                  />
                </motion.div>
                <Typography
  variant="h6"
  sx={{
    ml: { xs: 1.5, sm: 2 },
    fontWeight: 700,
    fontSize: {
      xs: "1.25rem",
      sm: "1.5rem",
      md: scrolled ? "1.5rem" : "1.75rem",
    },
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontFamily: "'Lora', serif",  
    transition: "all 0.3s ease",
    "&:hover": {
      color: "#a3742e",
    },
  }}
>
  Chalz Art
</Typography>

              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: 4,
                alignItems: "center",
              }}
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    component={Link}
                    to={item.path}
                    sx={{
                      fontWeight: 600,
                      fontSize: "1rem",
                      color:
                        location.pathname === item.path ? "#B88746" : "#2C3E50",
                      position: "relative",
                      overflow: "hidden",
                      letterSpacing: "0.5px",
                      transition: "all 0.3s ease",
                      textTransform: "capitalize",
                      px: 1,
                      "&:hover": {
                        color: "#B88746",
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        height: "2px",
                        width: "100%",
                        backgroundColor: "#B88746",
                        bottom: 0,
                        left: 0,
                        transform:
                          location.pathname === item.path
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        transformOrigin: "right",
                        transition:
                          "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                      },
                      "&:hover::after": {
                        transform: "scaleX(1)",
                        transformOrigin: "left",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </Box>

            {/* Right Side Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {isMobile && (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    edge="end"
                    onClick={handleDrawerToggle}
                    sx={{
                      width: 44,
                      height: 44,
                      color: "#2C3E50",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0,
                      borderRadius: "12px",
                      background: "transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(184, 135, 70, 0.1)",
                        color: "#B88746",
                      },
                    }}
                  >
                    <MenuIcon fontSize="medium" />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Fade>

      {/* Mobile Drawer - Three Quarters Width */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
        }}
        PaperProps={{
          sx: {
            background: "#fff",
            boxShadow: "-16px 0 40px rgba(0, 0, 0, 0.12)",
            width: "80%",
            maxWidth: 300,
            borderTopLeftRadius: "16px",
            borderBottomLeftRadius: "16px",
            display: "flex",
            flexDirection: "column",
            p: 0,
          },
        }}
      >
        <Slide
          direction="left"
          in={mobileOpen}
          mountOnEnter
          unmountOnExit
          timeout={350}
        >
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Header */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <Link
                to="/"
                onClick={handleDrawerToggle}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img src={logo} alt="Logo" style={{ height: "40px" }} />
                <Typography
                  variant="h6"
                  sx={{
                    ml: 2,
                    fontWeight: 700,
                    color: "#2C3E50",
                    letterSpacing: "1px",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Chalz Art
                </Typography>
              </Link>
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "#2C3E50",
                  "&:hover": {
                    color: "#B88746",
                    background: "rgba(184, 135, 70, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Navigation Links */}
            <List sx={{ p: 2, flexGrow: 1 }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                      component={Link}
                      to={item.path}
                      onClick={handleDrawerToggle}
                      sx={{
                        borderRadius: "12px",
                        bgcolor:
                          location.pathname === item.path
                            ? "rgba(184, 135, 70, 0.1)"
                            : "transparent",
                        "&:hover": {
                          bgcolor: "rgba(184, 135, 70, 0.08)",
                        },
                        py: 1.5,
                        px: 3,
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontWeight: 600,
                          fontSize: "1.05rem",
                          color:
                            location.pathname === item.path
                              ? "#B88746"
                              : "#2C3E50",
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              ))}
            </List>

            <Divider sx={{ mx: 2, my: 1 }} />

            {/* Social Media Icons */}
            <Box
              sx={{
                px: 3,
                pb: 3,
                display: "flex",
                justifyContent: "center",
                gap: 3,
              }}
            >
              {[
                {
                  icon: <InstagramIcon />,
                  href: "https://www.instagram.com/chalzart?igsh=MTdhaWliZnFmYng3Mg==",
                  color: "#E1306C",
                },
                {
                  icon: <FacebookIcon />,
                  href: "https://www.facebook.com/share/1LAPsZ2U25/",
                  color: "#4267B2",
                },
                {
                  icon: <TwitterIcon />,
                  href: "https://twitter.com",
                  color: "#1DA1F2",
                },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton
                    href={social.href}
                    target="_blank"
                    sx={{
                      color: "#2C3E50",
                      "&:hover": {
                        color: social.color,
                      },
                      transition: "color 0.2s ease",
                    }}
                  >
                    {social.icon}
                  </IconButton>
                </motion.div>
              ))}
            </Box>

            {/* Footer */}
            <Box
              sx={{
                p: 2,
                textAlign: "center",
                borderTop: "1px solid rgba(0, 0, 0, 0.08)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#888",
                  fontSize: "0.75rem",
                }}
              >
                © 2035 Chalz Art. All rights reserved.
              </Typography>
            </Box>
          </Box>
        </Slide>
      </Drawer>
    </>
  );
};

export default Navbar;
