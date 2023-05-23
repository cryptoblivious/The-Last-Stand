//  Nom du fichier : MenuSwitcher.tsx
//  Contexte : Un composant React qui permet de switcher entre le menu de connexion et le menu d'inscription
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import LoginMenu from './LoginMenu';
import SignupMenu from './SignupMenu';
import IMenuSwitcherProps from '../../typescript/interfaces/IMenuSwitcherProps';

const MenuSwitcher = (props: IMenuSwitcherProps) => {
  const { activeMenu, onClick } = props;
  const toggleActiveMenu = onClick;

  return (
    <div className={`relative w-96 flex justify-center ${activeMenu === 'login' ? 'h-fit' : 'h-80'}`}>
      <LoginMenu
        className={`${activeMenu === 'login' ? 'z-10' : ''}`}
        onClick={toggleActiveMenu}
        current={activeMenu === 'login'}
      />
      <SignupMenu
        className={`${activeMenu === 'login' ? '' : 'z-10'}`}
        onClick={toggleActiveMenu}
        current={activeMenu === 'signup'}
      />
    </div>
  );
};

export default MenuSwitcher;
