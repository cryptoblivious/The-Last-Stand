import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchConversation = async (id: string) => {
  try {
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/conversations/id/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
