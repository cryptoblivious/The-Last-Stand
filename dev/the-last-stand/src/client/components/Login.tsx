//  Nom du fichier : Login.tsx
//  Contexte : Un composant React qui affiche la page de connexion
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import LoginNavbar from './LoginNavbar';
import ErrorPopup from './ErrorPopup';
import '../styles/index.css';
import { useState } from 'react';

const Login = (props: any) => {
  const { data } = props;
  let msg;
  if (data) {
    msg = data.error;
  } else {
    msg = null;
  }
  const error = msg;
  const [popupOpen, setPopupOpen] = useState(error);

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <main
      id='login'
      className='w-full flex flex-col h-screen justify-start text-center bg-center bg-no-repeat bg-cover bg-purple-900' //ref: ChatGPT
      style={{ backgroundImage: `url(/assets/wallpapers/login.png)` }}>
      <LoginNavbar />
      {popupOpen && (
        <ErrorPopup
          message={error}
          onClick={closePopup}
        />
      )}
    </main>
  );
};

export default Login;
