import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: '/', // Move this to top-level

  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/assets/chalzfavicon1.svg",
          dest: "",
          rename: "favicon.svg",
        },
      ],
    }),
  ],

  build: {
    outDir: "dist",      // Default output folder
    assetsDir: "assets", // Folder for static assets
  },

  server: {
    port: 5173, // Optional: choose your port
    open: true,
  },

  resolve: {
    alias: {
      "@": "/src", // Alias for src folder
    },
  },
});
