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
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[dirname]/[name].[ext]', // output all assets in their respective subfolders
      },
    },
  },
  optimizeDeps: {
    exclude: ['phaser'], // exclude phaser from being optimized by vite
  },
  resolve: {
    alias: {
      '@': '/src/client', // create an alias for the client-side code directory
    },
  },
} as TUserConfig);
