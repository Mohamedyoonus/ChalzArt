import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
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
    rollupOptions: {
      input: "index.html", // Entry point for SPA
    },
    outDir: "dist", // Default output folder
    assetsDir: "assets", // Folder for static assets
  },

  // ✅ This is all you need for React Router / SPA fallback
  server: {
    // Automatically handles SPA history fallback
    historyApiFallback: true,
    // Optional: choose your port
    port: 5173,
    open: true,
  },

  resolve: {
    alias: {
      "@": "/src", // Alias for src folder
    },
  },
});
