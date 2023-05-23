//  Nom du fichier : SignupMenu.tsx
//  Contexte : Un composant React qui permet d'afficher le menu d'inscription
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import { IStyledClickableCurrentComponent } from '../../typescript/interfaces/IStyledClickableCurrentComponent';
import SignupForm from './SignupForm';

const SignupMenu = ({ className, onClick, current }: IStyledClickableCurrentComponent) => {
  const toggleMenu = onClick;

  return current ? (
    <div className={`text-white flex flex-col rounded-xl justify-evenly gap-5 bg-gray-800 p-4 w-80 h-fit border-gray-400 border-2 ${className}`}>
      <SignupForm />
      <a
        className='cursor-pointer text-fuchsia-500 hover:underline'
        onClick={toggleMenu}>
        Back to Login
      </a>
    </div>
  ) : (
    <></>
  );
};

export default SignupMenu;
