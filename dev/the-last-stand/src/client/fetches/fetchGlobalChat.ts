import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchGlobalChat = async () => {
  try {
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/conversations/global`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
