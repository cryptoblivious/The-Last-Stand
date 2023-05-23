//  Nom du fichier : vite.config.ts
//  Contexte : Un fichier de configuration pour le serveur de développement Vite
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson
//  Références : https://chat.openai.com/

import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

type TUserConfig = UserConfigExport & {
  clearCache: boolean;
};

export default defineConfig({
  plugins: [react()],
  clearCache: true,
} as TUserConfig);
