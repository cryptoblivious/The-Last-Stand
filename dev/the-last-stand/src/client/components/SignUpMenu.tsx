import { Link } from 'react-router-dom';
import { IStyledClickableComponent } from '../../typescript/interfaces/IStyledClickableComponent';

const SignupMenu = ({ className, onClick }: IStyledClickableComponent) => {
  const toggleMenu = onClick;
  return (
    <div className={`text-white flex flex-col rounded-xl justify-start gap-4 bg-gray-800 p-4 mr-4 w-80 h-96 border-gray-400 border-2 ${className}`}>
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
      <Link to='/home'>
        <button className='bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-125'>Signup</button>
      </Link>
      <a
        className='cursor-pointer text-blue-500 hover:underline'
        onClick={toggleMenu}>
        Back to Login
      </a>
    </div>
  );
};

export default SignupMenu;
