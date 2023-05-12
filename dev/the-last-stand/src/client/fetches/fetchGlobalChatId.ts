import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchGlobalChatId = async () => {
  try {
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/conversations/global`);
    const data = await response.json();
    const { _id } = data;
    return _id;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
