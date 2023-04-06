import LoginNavbar from './LoginNavbar';
import ErrorPopup from './ErrorPopup';
import { login } from '../../public/assets/';
import '../styles/index.css';
import { useState } from 'react';

const Login = (props: any) => {
  const { data } = props;
  const error = data.error ?? null;
  const [popupOpen, setPopupOpen] = useState(error);

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <main
      id='login'
      className='w-full flex flex-col h-screen justify-start text-center bg-center bg-no-repeat bg-cover bg-purple-900' //ref: ChatGPT
      style={{ backgroundImage: `url(/assets/wallpapers/login.png)` }}>
      <LoginNavbar />
      {popupOpen && (
        <ErrorPopup
          message={error}
          onClick={closePopup}
        />
      )}
      {/* {data && <div>{data.message}</div>} */}
    </main>
  );
};

export default Login;
