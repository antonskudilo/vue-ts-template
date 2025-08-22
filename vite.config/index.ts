import { defineConfig } from 'vite';

export default defineConfig(() => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'development':
      return require('./dev').default;
    case 'test':
      return require('./test').default;
    case 'build':
      return require('./build').default;
    default:
      throw new Error(`Unknown mode: ${env}`);
  }
});