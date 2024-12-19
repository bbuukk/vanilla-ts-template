import { defineConfig } from 'vite';
import Inspect from 'vite-plugin-inspect';

import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: './public',
  envDir: './',
  plugins: [Inspect()],
  build: {
    outDir: './dist'
    // base: '/'
    // sourcemap: true,
    // emptyOutDir: true
    // minify: true,
  },
  esbuild: {
    // minify: true,
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': '/',
      '@styles': resolve(__dirname, './src/assets/styles')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  },
  server: {
    port: 3000
    // host: 'localhost',
    // base: './'
  }
});
