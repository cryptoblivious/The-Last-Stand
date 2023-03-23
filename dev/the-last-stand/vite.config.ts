import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfigExport } from 'vite';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

export default defineConfig({
  plugins: [react()],
  clearCache: true, //ref ChatGPT
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: 'src/client/main.tsx',
    },
  },
} as TUserConfig);
