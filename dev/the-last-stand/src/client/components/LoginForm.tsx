import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <form className='flex flex-col gap-4'>
      <input
        className='bg-gray-200 rounded-xl p-3 text-purple-900'
        type='text'
        placeholder='Username'
      />
      <input
        className='bg-gray-200 rounded-xl p-3 text-purple-900'
        type='password'
        placeholder='Password'
      />

      <button className='bg-purple-900 rounded-xl p-3 border-4 border-fuchsia-700 hover:bg-fuchsia-700 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'>
        <Link to='/home'>Enter</Link>
      </button>
    </form>
  );
};

export default LoginForm;
