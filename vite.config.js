import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The configuration stays intentionally lightweight; the goal is to keep the
// focus on exploring React features rather than bundler specifics.
export default defineConfig({
  plugins: [
    react({
      // The plugin already enables the modern JSX transform required for React 17+ features.
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
});
