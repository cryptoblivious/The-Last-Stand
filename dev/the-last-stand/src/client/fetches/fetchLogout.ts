//  Nom du fichier : fetchLogout.ts
//  Contexte : Un fichier TypeScript qui permet d'envoyer une requête au serveur pour déconnecter l'utilisateur
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/, https://www.youtube.com/watch?v=98BzS5Oz5E4

import { HOST_URL, HOST_PORT } from '../appConfig';

export const fetchLogout = () => {
  const formData = new FormData();

  fetch(`${HOST_URL}:${HOST_PORT}/auth/logout`, {
    method: 'DELETE',
    body: formData,
    credentials: 'include',
  });
};
