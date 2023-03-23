import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfigExport } from 'vite';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

export default defineConfig({
  plugins: [react()],
  clearCache: true,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './src/client/index.html',
      },
    },
  },
} as TUserConfig);
