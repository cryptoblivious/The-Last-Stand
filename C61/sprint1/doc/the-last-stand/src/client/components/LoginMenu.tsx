import { PORT } from '../common/constants';
import { Link } from 'react-router-dom';
import { IStyledClickableComponent } from '../../typescript/interfaces/IStyledClickableComponent';

const LoginMenu = ({ className, onClick }: IStyledClickableComponent) => {
  const toggleMenu = onClick;
  const handleGoogleAuthClick = () => {
    window.location.href = `http://localhost:${PORT}/auth/google`;
  };

  return (
    <div className={`text-white flex flex-col rounded-xl justify-start gap-4 bg-gray-800 p-4 mr-4 w-80 h-96 border-gray-400 border-2 ${className}`}>
      <button
        className=' bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'
        onClick={handleGoogleAuthClick}>
        Sign Up With Google
      </button>
      <p>-- or --</p>
      <input
        className='bg-gray-200 rounded-xl p-3'
        type='text'
        placeholder='Username'
      />
      <input
        className='bg-gray-200 rounded-xl p-3'
        type='password'
        placeholder='Password'
      />
      <p>
        Don't have an account yet?{' '}
        <a
          className='cursor-pointer text-blue-500 hover:underline'
          onClick={toggleMenu}>
          Sign Up
        </a>
      </p>
      <Link to='/home'>
        <button className='bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'>Enter</button>
      </Link>
    </div>
  );
};

export default LoginMenu;
