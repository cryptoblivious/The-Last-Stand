import { useState } from 'react';
import LoginMenu from './LoginMenu';
import SignupMenus from './SignupMenus';

const LoginSignupSwitcher = () => {
  const [loginMenu, setLoginMenu] = useState(true);

  const toggleMenu = () => {
    setLoginMenu(!loginMenu);
  };

  return (
    <div className={`relative w-96 ${loginMenu ? 'h-fit' : 'h-80'}`}>
      <LoginMenu
        className={`${loginMenu ? 'z-10' : ''}`}
        onClick={toggleMenu}
        current={loginMenu}
      />
      <SignupMenus
        className={`${loginMenu ? '' : 'z-10'}`}
        onClick={toggleMenu}
        current={!loginMenu}
      />
    </div>
  );
};

export default LoginSignupSwitcher;
