import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/chalzfavicon.svg",
          dest: "", // root of dist
          rename: "favicon.svg", // ensures it loads as /favicon.svg
        },
      ],
    }),
  ],
});
