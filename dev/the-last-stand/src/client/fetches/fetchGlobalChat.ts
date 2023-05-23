//  Nom du fichier : fetchGlobalChat.ts
//  Contexte : Un fichier TypeScript qui permet d'envoyer une requête au serveur pour récupérer la conversation globale
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

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
