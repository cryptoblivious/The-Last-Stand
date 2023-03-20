import Button from './Button';
import { HOST_URL, HOST_PORT } from '../appConfig';

const LogoutButton = () => {
  const logout = () => {
    const formData = new FormData();

    fetch(`${HOST_URL}:${HOST_PORT}/auth/logout`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
