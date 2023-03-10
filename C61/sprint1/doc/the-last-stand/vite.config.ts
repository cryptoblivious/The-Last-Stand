import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { IUserConfig } from './src/typescript/interfaces/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearCache: true, //ref ChatGPT
} as IUserConfig);
