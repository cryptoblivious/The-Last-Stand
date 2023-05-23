//  Nom du fichier : MainPageSwitcher.tsx
//  Contexte : Un composant React qui permet de rediriger l'utilisateur vers la page d'accueil s'il est authentifié, sinon vers la page de connexion.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MainPageSwitcher = (props: any) => {
  const navigate = useNavigate();
  const { data } = props;

  useEffect(() => {
    if (data.message === 'Authenticated') {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [data.message, navigate]);

  return null;
};

export default MainPageSwitcher;
