import LoginNavbar from '../components/LoginNavbar';
import { login } from '../assets/';
import '../styles/index.css';

const Login = () => {
  return (
    <main
      id='login'
      className='w-full h-screen bg-center bg-no-repeat bg-cover bg-purple-900' //ref: ChatGPT
      style={{ backgroundImage: `url(${login})` }}>
      <LoginNavbar />
    </main>
  );
};

export default Login;
