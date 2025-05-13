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
    // Make sure the app is built in a way that supports SPA (Single Page Application)
    rollupOptions: {
      input: "index.html",  // Ensure correct entry for the build
    },
  },
  server: {
    // This ensures Vite uses React Router or client-side routing correctly during development
    historyApiFallback: true, // Handles any 404s and redirects them to index.html
  },
});
