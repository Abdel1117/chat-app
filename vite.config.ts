import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

const viteConfig = defineViteConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  }
});

const vitestConfig = defineVitestConfig({

  test: {
    // https://vitest.dev/config/
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/test/vitest.setup.tsx'],
    include: ['./src/__tests__/**/*.[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', 'src/test/vitest.setup.js'],
    coverage: {
      provider: 'istanbul',
      exclude: ['**/node_modules/**', '**/dist/**', '**/tailwind.config.cjs', '**/postcss.config.cjs', '**/vite.config.ts'], 
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);