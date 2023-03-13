import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <form className='flex flex-col gap-4'>
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
      <Link to='/home'>
        <button className='bg-purple-900 rounded-xl p-3 border-4 border-purple-300 hover:bg-violet-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'>Enter</button>
      </Link>
    </form>
  );
};

export default LoginForm;
