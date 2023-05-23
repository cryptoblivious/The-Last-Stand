//  Nom du fichier : fetchAuth.ts
//  Contexte : Un fichier TypeScript qui permet d'envoyer une requête au serveur pour vérifier si l'utilisateur est authentifié
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchAuth = async () => {
  try {
    const response = await fetch(`${HOST_URL}:${HOST_PORT}/auth/check`, {
      credentials: 'include',
    });
    const data = await response.json();

    if (data.message === 'Authorized') {
      return { status: true, data: { message: 'Authenticated' } };
    } else {
      return { status: false, data: { message: 'Not Authenticated' } };
    }
  } catch (error) {
    return { status: false, data: { error: 'Server Error' } };
  }
};
