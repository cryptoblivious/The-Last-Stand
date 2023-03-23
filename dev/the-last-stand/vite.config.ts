import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { UserConfigExport } from 'vite';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

const BASE_DIR = '/dev/the-last-stand';
export default defineConfig({
  base: BASE_DIR,
  plugins: [react()],
  clearCache: true, //ref ChatGPT
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Add this line to specify the assets folder
  },
} as TUserConfig);
