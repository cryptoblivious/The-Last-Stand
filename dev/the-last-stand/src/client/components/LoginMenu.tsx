//  Nom du fichier : LoginMenu.tsx
//  Contexte : Un composant React qui affiche le menu de connexion
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import { IStyledClickableCurrentComponent } from '../../typescript/interfaces/IStyledClickableCurrentComponent';
import LoginForm from './LoginForm';
import SocialLoginForm from './SocialLoginForm';

const LoginMenu = ({ className, onClick, current }: IStyledClickableCurrentComponent) => {
  const toggleMenu = onClick;

  return current ? (
    <div className={`text-white flex flex-col rounded-xl justify-start h-fit gap-4 bg-gray-800 p-4 w-80 border-gray-400 border-2 ${className}`}>
      <SocialLoginForm />
      <p>-- or --</p>
      <LoginForm />
      <p>
        Don't have an account yet?{' '}
        <a
          className='cursor-pointer text-green-500 hover:underline'
          onClick={toggleMenu}>
          Sign Up
        </a>
      </p>
    </div>
  ) : (
    <></>
  );
};

export default LoginMenu;
