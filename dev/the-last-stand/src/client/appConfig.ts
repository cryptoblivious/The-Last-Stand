//  Nom du fichier : appConfig.ts
//  Contexte : Un fichier TypeScript qui contient les configurations de l'application en fonction de l'environnement de développement ou de production.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://chat.openai.com/

import { TAppConfig } from '../typescript/types/TAppConfig';

const defaultConfig: TAppConfig = {
  APP_MODE: '',
  HOST_NAME: '',
  HOST_URL: '',
  HOST_PORT: '',
  CLIENT_NAME: '',
  CLIENT_URL: '',
  CLIENT_PORT: '',
  WS_PROTOCOL: '',
};

const configMap: Map<string, TAppConfig> = new Map([
  [
    'http://localhost:5173',
    {
      APP_MODE: 'dev',
      HOST_NAME: 'localhost',
      HOST_URL: 'http://localhost',
      HOST_PORT: '80',
      CLIENT_NAME: 'localhost',
      CLIENT_URL: 'http://localhost',
      CLIENT_PORT: '5173',
      WS_PROTOCOL: 'ws',
    },
  ],
  [
    'https://tls.woodchuckgames.com',
    {
      APP_MODE: 'prod',
      HOST_NAME: 'stls.woodchuckgames.com',
      HOST_URL: 'https://stls.woodchuckgames.com',
      HOST_PORT: '443',
      CLIENT_NAME: 'tls.woodchuckgames.com',
      CLIENT_URL: 'https://tls.woodchuckgames.com',
      CLIENT_PORT: '5173',
      WS_PROTOCOL: 'wss',
    },
  ],
]);

const currentOrigin = window.location.origin;

const domainConfig: TAppConfig = configMap.get(currentOrigin) ?? { ...defaultConfig };

export const APP_MODE = domainConfig.APP_MODE;
export const HOST_NAME = domainConfig.HOST_NAME;
export const HOST_URL = domainConfig.HOST_URL;
export const HOST_PORT = domainConfig.HOST_PORT;
export const CLIENT_NAME = domainConfig.CLIENT_NAME;
export const CLIENT_URL = domainConfig.CLIENT_URL;
export const CLIENT_PORT = domainConfig.CLIENT_PORT;
export const WS_PROTOCOL = domainConfig.WS_PROTOCOL;
