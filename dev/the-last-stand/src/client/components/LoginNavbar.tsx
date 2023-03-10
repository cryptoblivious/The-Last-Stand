import { useState } from 'react';
import LoginSignupSwitcher from './LoginSignupSwitcher';

const LoginNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [logo, setLogo] = useState('⥤');

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    //setLogo(showMenu ? '⥤' : '⥥');
  };

  const handleClick = () => {
    toggleMenu();
  };

  return (
    <header className='bg-primary flex p-5'>
      <h1 className='text-green-500 text-6xl w-1/2 text-center underline'>The Last Stand</h1>
      <div className='w-1/2 mx-auto text-center flex flex-col gap-2 items-center justify-center'>
        <button
          className={`bg-primary text-green-500 align-middle text-6xl transition ease-in-out duration-300 w-min h-min ${showMenu ? 'rotate-90 transform origin-center' : ''}`}
          onClick={handleClick}>
          {logo}
        </button>
        {showMenu && <LoginSignupSwitcher />}
      </div>
    </header>
  );
};

export default LoginNavbar;
