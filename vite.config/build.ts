import { defineConfig } from 'vite';
import { sharedConfig } from './shared';

export default defineConfig({
  ...sharedConfig,
  build: {
    outDir: 'dist',
    sourcemap: false
  }
});
