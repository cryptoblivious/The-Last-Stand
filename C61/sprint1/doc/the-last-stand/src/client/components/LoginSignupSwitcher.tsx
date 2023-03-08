import { useState } from 'react';
import LoginMenu from './LoginMenu';
import SignupMenu from './SignupMenu';

const LoginSignupSwitcher = () => {
  const [loginMenu, setLoginMenu] = useState(true);

  const handleSignupClick = () => {
    setLoginMenu(!loginMenu);
  };

  return (
    <div className='transition-opacity duration-500 ease-in-out'>
      {' '}
      {loginMenu ? (
        <LoginMenu
          className={`opacity-100 ${loginMenu ? '' : 'opacity-0'}`}
          patate={handleSignupClick}
        />
      ) : (
        <SignupMenu
          className={`opacity-100 ${loginMenu ? 'opacity-0' : ''}`}
          patate={handleSignupClick}
        />
      )}
    </div>
  );
};

export default LoginSignupSwitcher;
