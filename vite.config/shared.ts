import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import { fileURLToPath } from 'url';
import { createHtmlPlugin } from 'vite-plugin-html';
const isDevelopment = process.env.NODE_ENV === 'development';

export const sharedConfig = {
  plugins: [
    vue(),
    createHtmlPlugin({
      inject: {
        data: {
          appName: process.env.VITE_APP_NAME,
          appDescription: process.env.VITE_APP_DESCRIPTION,
          appUrl: process.env.VITE_APP_URL,
        },
      },
    }),
    ...(isDevelopment ? [vueDevTools()] : [])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../src', import.meta.url)),
      '@api': fileURLToPath(new URL('../src/api', import.meta.url)),
      '@components': fileURLToPath(new URL('../src/components', import.meta.url)),
      '@styles': fileURLToPath(new URL('../src/styles', import.meta.url)),
      '@views': fileURLToPath(new URL('../src/views', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `
          @import "@styles/abstracts/_functions.less";
          @import "@styles/abstracts/_variables.less";
          @import "@styles/mixins/index.less";
        `,
        javascriptEnabled: true,
        plugins: [require('less-plugin-glob')]
      }
    }
  },
};
