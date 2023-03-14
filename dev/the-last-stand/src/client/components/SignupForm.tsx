import { Link } from 'react-router-dom';

const SignupForm = () => {
  return (
    <form className='flex flex-col gap-4'>
      <input
        className='bg-gray-200 rounded-xl p-3 text-green-900 placeholder-green-900 placeholder-opacity-50'
        type='text'
        placeholder='Username'
      />
      <input
        className='bg-gray-200 rounded-xl p-3 text-green-900 placeholder-green-900 placeholder-opacity-50'
        type='password'
        placeholder='Password'
      />
      <input
        className='bg-gray-200 rounded-xl p-3 text-green-900 placeholder-green-900 placeholder-opacity-50'
        type='password'
        placeholder='Confirm Password'
      />
      <button className='bg-green-900 rounded-xl p-3 border-4 border-green-600 hover:bg-green-600 hover:border-green-900 transition ease-in-out duration-300 hover:scale-110'>
        <Link to='/home'>Signup</Link>
      </button>
    </form>
  );
};

export default SignupForm;
