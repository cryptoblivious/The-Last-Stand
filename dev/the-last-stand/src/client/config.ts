type Config = {
  HOST_NAME: string;
  HOST_URL: string;
  HOST_PORT: string;
  CLIENT_NAME: string;
  CLIENT_URL: string;
  CLIENT_PORT: string;
};

const defaultConfig: Config = {
  HOST_NAME: '',
  HOST_URL: '',
  HOST_PORT: '',
  CLIENT_NAME: '',
  CLIENT_URL: '',
  CLIENT_PORT: '',
};

const configMap: Map<string, Config> = new Map([
  [
    'http://localhost:5173',
    {
      HOST_NAME: 'localhost',
      HOST_URL: 'http://localhost',
      HOST_PORT: '9001',
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
      HOST_PORT: '9001',
      CLIENT_NAME: 'tls.woodchuckgames.com',
      CLIENT_URL: 'https://tls.woodchuckgames.com',
      CLIENT_PORT: '5173',
    },
  ],
]);

const currentOrigin = window.location.origin;

const config: Config = configMap.get(currentOrigin) ?? { ...defaultConfig };

export const HOST_NAME = config.HOST_NAME;
export const HOST_URL = config.HOST_URL;
export const HOST_PORT = config.HOST_PORT;
export const CLIENT_NAME = config.CLIENT_NAME;
export const CLIENT_URL = config.CLIENT_URL;
export const CLIENT_PORT = config.CLIENT_PORT;

//ref : ChatGPT & CoPilot
