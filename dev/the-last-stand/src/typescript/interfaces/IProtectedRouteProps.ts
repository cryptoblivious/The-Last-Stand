//  Nom du fichier : IParams.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les paramètres d'une route
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson
//  Références : https://chat.openai.com/

import { ReactElement } from 'react';

export interface IProtectedRouteProps {
  element: ReactElement;
  userAuth?: boolean | 'both';
  redirects?: string;
}
