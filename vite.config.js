import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@/assets",
        replacement: path.resolve(__dirname, "./src/assets"),
      },
      {
        find: "@/components",
        replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@/core",
        replacement: path.resolve(__dirname, "./src/core"),
      },
      {
        find: "@/interface",
        replacement: path.resolve(__dirname, "./src/interface"),
      },
      {
        find: "@/store",
        replacement: path.resolve(__dirname, "./src/store"),
      },
      {
        find: "@/views",
        replacement: path.resolve(__dirname, "./src/views"),
      },
      {
        find: "@/router",
        replacement: path.resolve(__dirname, "./src/router"),
      },
      {
        find: "@/",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  server: {
    port: 8000,
  },
});
