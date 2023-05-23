//  Nom du fichier : IUserConfig.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour la configuration de l'utilisateur pour Vite
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson
//  Références : https://chat.openai.com/

import { UserConfig } from 'vite';

export interface IUserConfig extends UserConfig {
  clearCache?: boolean;
}
