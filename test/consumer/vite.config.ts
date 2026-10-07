import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { unplugin as stylex } from "@stylexjs/unplugin";

export default defineConfig({
  plugins: [stylex.vite(), react()],
  ssr: { noExternal: ["@swecc/ui"] },
});
