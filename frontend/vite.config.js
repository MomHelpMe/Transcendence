import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    hmr: {
      clientPort: 5173,
      protocol: "ws",
    },
  },
});