import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ayrı bir config: App'in production build ayarlarına (base: './' vb.)
// dokunmadan test ortamını (jsdom) tanımlar.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
  },
});
