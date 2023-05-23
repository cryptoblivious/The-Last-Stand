//  Nom du fichier : LoginForm.tsx
//  Contexte : Un composant React qui permet de se connecter à l'application avec un courriel et un mot de passe.
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import { Link } from 'react-router-dom';
import BigRoundedInput from './BigRoundedInput';
import UpcomingOverlay from './UpcomingOverlay';

const LoginForm = () => {
  return (
    <form className='flex flex-col gap-4 relative'>
      <UpcomingOverlay />
      <BigRoundedInput
        type='text'
        placeholder='Email'
      />
      <BigRoundedInput
        type='password'
        placeholder='Password'
      />

      <button className='bg-purple-900 rounded-xl p-3 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'>
        <Link to='/home'>Enter</Link>
      </button>
    </form>
  );
};

export default LoginForm;
