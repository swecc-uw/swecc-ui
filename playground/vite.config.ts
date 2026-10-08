import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { unplugin as stylex } from "@stylexjs/unplugin";

export default defineConfig({
  root: import.meta.dirname,
  plugins: [stylex.vite(), react()],
});
