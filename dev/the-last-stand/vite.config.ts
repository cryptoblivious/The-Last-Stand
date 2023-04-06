import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

const ASSETS_BASE_PATH = '/src/client/assets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  clearCache: true, //ref ChatGPT3
} as TUserConfig);
