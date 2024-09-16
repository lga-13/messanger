/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, ''),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: '/index.html',
        error404: '/src/pages/error404/error404.html',
        error500: '/src/pages/error500/error500.html',
        registration_form: '/src/pages/registration-form/registration-form.html',
        login_form: '/src/pages/login-form/login-form.html',
        settings: '/src/pages/settings-page/settings-page.html',
        chatsList: '/src/pages/chat-page/chat-page.html',
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/public/static/styles/variables.pcss";
        `,
      },
    },
  },
});
