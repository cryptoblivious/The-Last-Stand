import { useState } from 'react';
import MenuSwitcher from './MenuSwitcher';
import Button from './Button';
import { GiPaperArrow } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'login' | 'signup'>('login');

  const toggleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleActiveMenu = () => {
    setActiveMenu(activeMenu === 'login' ? 'signup' : 'login');
  };

  return (
    <header className='bg-primary flex p-5'>
      <h1 className='font-effect-outline text-5xl text-cyan-300 w-1/2 text-center underline'>
        <Link to='/'>The Last Stand</Link>
      </h1>
      <div className='w-1/3 text-center flex flex-col gap-4 items-center justify-center'>
        <Button
          className={`items-center justify-center flex transition ease-in-out origin-center duration-500 w-16 h-16 ${showMenu ? 'transform rotate-90' : ''}`}
          icon={
            <GiPaperArrow
              aria-label='GiPaperArrow'
              fontSize='3rem'
              color='rgb(103 232 249)'
              transform='rotate(-40)'
            />
          }
          onClick={toggleShowMenu}
        />
        {showMenu && (
          <MenuSwitcher
            activeMenu={activeMenu}
            onClick={toggleActiveMenu}
          />
        )}
      </div>
    </header>
  );
};

export default LoginNavbar;
