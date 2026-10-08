import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { unplugin as stylex } from "@stylexjs/unplugin";

export default defineConfig({
  plugins: [
    // The plugin's dev-server hook starts an interval it only clears when an
    // HTTP server closes. Vitest runs without one, so the interval would keep
    // the test run alive.
    { ...stylex.vite(), configureServer: undefined },
    react(),
  ],
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    // Vitest stubs CSS by default; the design-system guards read global.css.
    css: { include: [/global\.css/] },
  },
});
