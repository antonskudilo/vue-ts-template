import { defineConfig } from 'vite';
import { sharedConfig } from './shared';

export default defineConfig({
  ...sharedConfig,
  define: {
    __TEST__: true
  }
});