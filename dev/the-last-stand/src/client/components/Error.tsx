//  Nom du fichier : Error.tsx
//  Contexte : Un composant React qui permet d'afficher une page d'erreur lorsqu'une erreur se produit
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Références : https://reactrouter.com/en/main/start/tutorial

import { useRouteError } from 'react-router-dom';

export default function Error() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
