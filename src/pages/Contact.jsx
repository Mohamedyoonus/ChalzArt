import React from "react";
import { Typography, IconButton, useMediaQuery, useTheme } from "@mui/material";
import {
  Email,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  WhatsApp,
} from "@mui/icons-material";
import bannerImage from "../assets/banner.jpg";

// Add keyframes for the wavy animation
const styles = `
@keyframes waveAnimation {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-6px); }
  50% { transform: translateY(0); }
  75% { transform: translateY(6px); }
}
`;

const Contact = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const contactInfo = [
    {
      icon: <Phone sx={{ color: "#D4A373", marginRight: "10px" }} />,
      text: "+91 9176425811",
      link: "tel:+919176425811",
    },
    {
      icon: <Email sx={{ color: "#D4A373", marginRight: "10px" }} />,
      text: "thechalzart@gmail.com",
      link: "mailto:thechalzart@gmail.com",
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      url: "https://www.facebook.com/share/1LAPsZ2U25/",
      color: "#1877F2",
    },
    {
      icon: Instagram,
      url: "https://www.instagram.com/chalzart?igsh=MTdhaWliZnFmYng3Mg==",
      color: "#E1306C",
    },
    { icon: Twitter, url: "https://twitter.com/thechalzart", color: "#1DA1F2" },
    {
      icon: YouTube,
      url: "https://youtube.com/@chalzart?si=Ai52HlwzsftDoGH4",
      color: "#FF0000",
    },
  ];

  const renderContactDetails = () =>
    contactInfo.map((item, index) => (
      <div
        key={index}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1A1A1A",
          padding: "12px 18px",
          borderRadius: "8px",
          marginBottom: "14px",
          marginTop: index === 0 ? "10px" : "8px",
          maxWidth: "320px",
          marginLeft: "auto",
          marginRight: "auto",
          transition: "all 0.3s ease-in-out",
        }}
      >
        <a
          href={item.link}
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          {item.icon}
          <Typography
            variant="body1"
            color="#E0E0E0"
            sx={{
              fontFamily: "'Merriweather', serif",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            {item.text}
          </Typography>
        </a>
      </div>
    ));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Inject animation styles */}
      <style>{styles}</style>

      {/* Background blur effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(50px)",
          zIndex: -1,
        }}
      />

      {/* Centered content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "40px 24px",
          borderRadius: "20px",
          boxShadow: "0px 15px 30px rgba(212, 163, 115, 0.5)",
          maxWidth: "500px",
          margin: "0 auto",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="700"
          color="#D4A373"
          gutterBottom
          sx={{
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: "'Playfair Display', serif",
            paddingBottom: "10px",
            borderBottom: "3px solid #D4A373",
          }}
        >
          Let's Connect
        </Typography>

        <Typography
          variant="body1"
          color="#E0E0E0"
          marginBottom={4}
          sx={{
            fontFamily: "'Merriweather', serif",
            fontSize: "18px",
            lineHeight: "1.7",
          }}
        >
          Whether you have a question or want to collaborate, feel free to reach
          out!
        </Typography>

        {renderContactDetails()}

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919176425811"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#25D366",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "40px",
            fontWeight: "bold",
            fontFamily: "'Merriweather', serif",
            textDecoration: "none",
            marginTop: "10px",
            fontSize: isMobile ? "14px" : "16px",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 6px 20px rgba(37, 211, 102, 0.5)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          <WhatsApp sx={{ verticalAlign: "middle", marginRight: "8px" }} />
          Chat on WhatsApp
        </a>

        {/* Social Media */}
        <div style={{ marginTop: "40px" }}>
          <Typography
            variant="h6"
            fontWeight="600"
            color="#D4A373"
            marginBottom={2}
            sx={{ fontFamily: "'Playfair Display', serif" }}
          >
            Follow Me
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {socialLinks.map(({ icon: Icon, url, color }, index) => (
              <IconButton
                key={index}
                component="a"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color,
                  mx: "15px",
                  animation: "waveAnimation 2s ease-in-out infinite",
                  animationDelay: `${index * 0.2}s`,
                  "&:hover": {
                    transform: "scale(1.3)",
                    boxShadow: `0px 6px 18px ${color}`,
                  },
                }}
              >
                <Icon sx={{ fontSize: "2rem" }} />
              </IconButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
