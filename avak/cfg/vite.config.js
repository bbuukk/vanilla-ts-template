import { defineConfig } from "vite";
import Inspect from "vite-plugin-inspect";

import { resolve } from "path";

export default defineConfig({
  root: "src",
  publicDir: "../public",
  envDir: "../cfg",
  plugins: [Inspect()],
  build: {
    outDir: "../dist",
    // index: "src/index.html",
    base: "../",
    sourcemap: true,
    emptyOutDir: true,
    // minify: true,
  },
  esbuild: {
    // minify: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": "/",
      "@styles": resolve(__dirname, "../src/assets/styles"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx"],
  },
  server: {
    host: "localhost",
    port: 3000,
    base: "./",
  },
});
