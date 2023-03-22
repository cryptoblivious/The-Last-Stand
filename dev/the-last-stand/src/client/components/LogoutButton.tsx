import Button from './Button';
import { HOST_URL, HOST_PORT } from '../appConfig';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    const formData = new FormData();

    fetch(`${HOST_URL}:${HOST_PORT}/auth/logout`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('Logged out', res);
        navigate('/login');
      });
  };
  return (
    <Button
      onClick={logout}
      text='Sign out'
    />
  );
};

export default LogoutButton;
