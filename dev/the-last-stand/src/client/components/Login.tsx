import LoginNavbar from './LoginNavbar';
import ErrorPopup from './ErrorPopup';
import { login } from '../assets/';
import '../styles/index.css';
import { useState } from 'react';

const Login = (props: any) => {
  const { data } = props;
  const message = data !== undefined ? data.message : 'No server monitoring';
  console.log('origin', window.location.origin);

  const [popupOpen, setPopupOpen] = useState(message);

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <main
      id='login'
      className='w-full flex flex-col h-screen justify-start text-center bg-center bg-no-repeat bg-cover bg-purple-900' //ref: ChatGPT
      style={{ backgroundImage: `url(${login})` }}>
      <LoginNavbar />
      {popupOpen && (
        <ErrorPopup
          message={message}
          onClick={closePopup}
        />
      )}
      {/* {data && <div>{data.message}</div>} */}
    </main>
  );
};

export default Login;
