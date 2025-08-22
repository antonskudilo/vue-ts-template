import { defineConfig } from 'vite';
import { sharedConfig } from './shared';

const port = Number(process.env.VITE_APP_PORT) || 5173;

export default defineConfig({
  ...sharedConfig,
  server: {
    host: '0.0.0.0',
    port: port,
    watch: {
      usePolling: true
    },
  }
});
