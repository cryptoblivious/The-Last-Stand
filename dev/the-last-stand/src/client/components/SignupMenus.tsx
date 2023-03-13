import { Link } from 'react-router-dom';
import { IStyledClickableCurrentComponent } from '../../typescript/interfaces/IStyledClickableCurrentComponent';

const SignupMenus = ({ className, onClick, current }: IStyledClickableCurrentComponent) => {
  const toggleMenu = onClick;

  return current ? (
    <div className={`text-white flex flex-col rounded-xl justify-evenly gap-5 bg-gray-800 p-4 mr-4 w-80 h-fit border-gray-400 border-2 ${className}`}>
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
      <input
        className='bg-gray-200 rounded-xl p-3'
        type='confirmPassword'
        placeholder='Confirm Password'
      />
      <button className='bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'>
        <Link to='/home'>Signup</Link>
      </button>
      <a
        className='cursor-pointer text-blue-500 hover:underline'
        onClick={toggleMenu}>
        Back to Login
      </a>
    </div>
  ) : (
    <></>
  );
};

export default SignupMenus;
