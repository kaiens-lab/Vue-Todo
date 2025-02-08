import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import postcss from "./postcss.config.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss,
  },
});
