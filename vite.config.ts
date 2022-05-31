import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [require('autoprefixer')],
    },
  },
  build: {
    terserOptions: {
      compress: {
        //生产环境时移除console,debugger
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
