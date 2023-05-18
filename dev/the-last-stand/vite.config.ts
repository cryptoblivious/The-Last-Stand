import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

export default defineConfig({
  plugins: [react()],
  clearCache: true, //ref ChatGPT3
} as TUserConfig);
