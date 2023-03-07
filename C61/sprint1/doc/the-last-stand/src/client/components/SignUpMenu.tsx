import { PORT } from '../common/constants';
import { useNavigate } from 'react-router-dom';
const SignUpMenu = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    window.location.href = `http://localhost:${PORT}/auth/google`;
  };

  return (
    <div className='bg-primary h-screen w-screen text-white'>
      <p>
        Don't have an account yet? <a>Sign up</a>
      </p>

      <button
        className='button google'
        onClick={handleClick}>
        Sign Up With Google
      </button>
    </div>
  );
};

export default SignUpMenu;
