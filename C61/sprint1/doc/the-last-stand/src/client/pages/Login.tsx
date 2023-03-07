import { Header, SignUpMenu } from '../components';
import { login } from '../assets/';

const Login = () => {
  return (
    <main
      id='login'
      className='bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: `url(${login})` }}>
      <Header />
      <SignUpMenu />
    </main>
  );
};

export default Login;
