import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='bg-primary'>
      <h1>The Last Stand</h1>
      <Link to='/home'>
        <button className='bg-primary h-screen w-screen text-white flex-row'>⥤</button>
      </Link>
    </header>
  );
};

export default Header;
