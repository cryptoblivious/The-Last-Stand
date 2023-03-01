import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <Link to='/home'>
          <h1 className='logo'>Forward Arrow</h1>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
