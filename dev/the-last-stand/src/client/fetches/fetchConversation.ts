import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchConversationById = async (id: string) => {
  try {
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/conversations/id/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};

export const fetchConversationByUsers = async (users: string[]) => {
  try {
    const serializedUserIds = encodeURIComponent(JSON.stringify(users));
    console.log('serializedUsers', serializedUserIds);
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/conversations/userIds/${serializedUserIds}`, { method: 'POST' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
