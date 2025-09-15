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
  server: {
    proxy: {
      // Proxy requests starting with '/api' to your backend API
      "/ur": {
        target: "http://localhost:8080", // Replace with your backend API URL
        changeOrigin: true, // Rewrites the origin header to match the target
        secure: false, // Allows HTTPS requests even with self-signed certificates (for development)
        // rewrite: (path) => path.replace(/^\/api/, ""), // Optional: remove the '/api' prefix from the forwarded request
      },
      // You can add more proxy rules for other paths if needed
      // '/another-api': {
      //   target: 'https://another-api.example.com',
      //   changeOrigin: true,
      // },
    },
    port: 5173,
    // port: 5000,
  },

  plugins: [react(), tailwindcss()],
});
