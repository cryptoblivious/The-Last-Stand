import { SERVER_PORT } from '../../common/constants';
import { IStyledClickableComponent } from '../../typescript/interfaces/IStyledClickableComponent';
import LoginForm from './LoginForm';

const LoginMenu = ({ className, onClick }: IStyledClickableComponent) => {
  const toggleMenu = onClick;
  const handleGoogleAuthClick = () => {
    window.location.href = `http://localhost:${SERVER_PORT}/auth/google`;
  };

  return (
    <div className={`text-white flex flex-col rounded-xl justify-start gap-4 bg-gray-800 p-4 mr-4 w-80 h-96 border-gray-400 border-2 ${className}`}>
      <button
        className=' bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'
        onClick={handleGoogleAuthClick}>
        Sign Up With Google
      </button>
      <p>-- or --</p>
      <LoginForm />
      <p>
        Don't have an account yet?{' '}
        <a
          className='cursor-pointer text-blue-500 hover:underline'
          onClick={toggleMenu}>
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default LoginMenu;
