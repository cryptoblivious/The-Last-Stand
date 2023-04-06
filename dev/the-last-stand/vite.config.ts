import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

const ASSETS_BASE_PATH = '/src/client/assets';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    copy({
      targets: [
        // copy all files inside the assets folder
        { src: 'src/client/assets/**/*', dest: `dist${ASSETS_BASE_PATH}` },
      ],
      // make sure that the copy plugin runs before the build starts
      // to include the assets files before they are needed in the app
      hook: 'buildStart',
    }),
  ],
  clearCache: true, //ref ChatGPT3
} as TUserConfig);
