import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>The Last Stand</h1>
      <Link to='/home'>
        <button className='bg-primary h-screen w-screen text-white'>⥤</button>
      </Link>
    </header>
  );
};

export default Header;
