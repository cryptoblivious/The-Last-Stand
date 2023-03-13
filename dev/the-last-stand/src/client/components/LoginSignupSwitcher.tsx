import { useState } from 'react';
import LoginMenu from './LoginMenu';
import SignupMenu from './SignupMenu';

const LoginSignupSwitcher = () => {
  const [loginMenu, setLoginMenu] = useState(true);

  const toggleMenu = () => {
    setLoginMenu(!loginMenu);
  };

  return (
    <div className='relative w-96 h-96'>
      <LoginMenu
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${loginMenu ? 'opacity-100 block z-10' : 'opacity-0'}`}
        onClick={toggleMenu}
      />
      <SignupMenu
        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out ${loginMenu ? 'opacity-0' : 'opacity-100 z-10'}`}
        onClick={toggleMenu}
      />
    </div>
  );
};

export default LoginSignupSwitcher;
