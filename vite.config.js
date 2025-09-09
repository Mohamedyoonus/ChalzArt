import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import history from "connect-history-api-fallback";

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
  server: {
    middlewareMode: true,
    setup: ({ middlewares }) => {
      middlewares.use(
        history({
          verbose: true,
        })
      );
    },
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Alias for src folder
    },
  },
});
