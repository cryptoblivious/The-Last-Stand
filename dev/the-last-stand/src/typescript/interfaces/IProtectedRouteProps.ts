//  Nom du fichier : IParams.ts
//  Contexte : Un fichier de type TypeScript qui définit une interface pour les paramètres
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson

import { ReactElement } from 'react';

export interface IProtectedRouteProps {
  element: ReactElement;
  userAuth?: boolean | 'both';
  redirects?: string;
}
