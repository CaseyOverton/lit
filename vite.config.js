import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lit/',
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
