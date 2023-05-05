import Button from './Button';
import { fetchLogout } from '../fetches/fetchLogout';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    const done = await fetchLogout();
    navigate('/login');
  };

  return (
    <Button
      onClick={logout}
      classNameAdditions='ml-auto'
      text='Sign out'
    />
  );
};

export default LogoutButton;
