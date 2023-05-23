//  Nom du fichier : fetchConversation.ts
//  Contexte : Un fichier TypeScript qui permet d'envoyer une requête au serveur pour récupérer une conversation
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

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
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/conversations/userIds/${serializedUserIds}`, { method: 'POST' });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
};
