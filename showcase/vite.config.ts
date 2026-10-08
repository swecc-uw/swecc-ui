import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { unplugin as stylex } from "@stylexjs/unplugin";

export default defineConfig({
  // Relative asset URLs, so the build works under any path it is hosted at.
  base: "./",
  plugins: [stylex.vite(), react()],
  // The examples import the library from ../src, outside this Vite root.
  server: { fs: { allow: [".."] } },
});
