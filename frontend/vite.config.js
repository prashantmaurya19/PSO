import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@pso": resolve(__dirname, "src"),
    },
  },
  build: {},
  server: {
    port: 5173,
  },

  plugins: [react(), tailwindcss()],
});
