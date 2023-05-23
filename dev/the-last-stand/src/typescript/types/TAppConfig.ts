//  Nom du fichier : TAppConfig.ts
//  Contexte : Un fichier de type TypeScript qui définit un type pour la configuration de l'application
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson
//  Références : https://chat.openai.com/

export type TAppConfig = {
  APP_MODE: string;
  HOST_NAME: string;
  HOST_URL: string;
  HOST_PORT: string;
  CLIENT_NAME: string;
  CLIENT_URL: string;
  CLIENT_PORT: string;
  WS_PROTOCOL: string;
};
