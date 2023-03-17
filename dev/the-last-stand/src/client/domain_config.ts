type DomainConfig = {
  HOST_NAME: string;
  HOST_URL: string;
  HOST_PORT: string;
  CLIENT_NAME: string;
  CLIENT_URL: string;
  CLIENT_PORT: string;
};

const defaultConfig: DomainConfig = {
  HOST_NAME: '',
  HOST_URL: '',
  HOST_PORT: '',
  CLIENT_NAME: '',
  CLIENT_URL: '',
  CLIENT_PORT: '',
};

const configMap: Map<string, DomainConfig> = new Map([
  [
    'http://localhost:5173',
    {
      HOST_NAME: 'localhost',
      HOST_URL: 'http://localhost',
      HOST_PORT: '80',
      CLIENT_NAME: 'localhost',
      CLIENT_URL: 'http://localhost',
      CLIENT_PORT: '5173',
    },
  ],
  [
    'https://tls.woodchuckgames.com',
    {
      HOST_NAME: 'stls.woodchuckgames.com',
      HOST_URL: 'https://stls.woodchuckgames.com',
      HOST_PORT: '443',
      CLIENT_NAME: 'tls.woodchuckgames.com',
      CLIENT_URL: 'https://tls.woodchuckgames.com',
      CLIENT_PORT: '5173',
    },
  ],
]);

const currentOrigin = window.location.origin;

const domainConfig: DomainConfig = configMap.get(currentOrigin) ?? { ...defaultConfig };

export const HOST_NAME = domainConfig.HOST_NAME;
export const HOST_URL = domainConfig.HOST_URL;
export const HOST_PORT = domainConfig.HOST_PORT;
export const CLIENT_NAME = domainConfig.CLIENT_NAME;
export const CLIENT_URL = domainConfig.CLIENT_URL;
export const CLIENT_PORT = domainConfig.CLIENT_PORT;

//ref : ChatGPT & CoPilot
