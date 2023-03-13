import { SERVER_PORT } from '../../common/constants';
import { IStyledClickableCurrentComponent } from '../../typescript/interfaces/IStyledClickableCurrentComponent';
import LoginForm from './LoginForm';

const LoginMenu = ({ className, onClick, current }: IStyledClickableCurrentComponent) => {
  const toggleMenu = onClick;
  const handleGoogleAuthClick = () => {
    window.location.href = `http://localhost:${SERVER_PORT}/auth/google`;
  };
  const handleFacebookAuthClick = () => {
    window.location.href = `http://localhost:${SERVER_PORT}/auth/facebook`;
  };

  return current ? (
    <div className={`text-white flex flex-col rounded-xl justify-start h-fit gap-4 bg-gray-800 p-4 mr-4 w-80 border-gray-400 border-2 ${className}`}>
      <button
        className=' bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'
        onClick={handleGoogleAuthClick}>
        Sign Up With Google
      </button>
      <button
        className=' bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'
        onClick={handleFacebookAuthClick}>
        Sign Up With Facebook
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
  ) : (
    <></>
  );
};

export default LoginMenu;
