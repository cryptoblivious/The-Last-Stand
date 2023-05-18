import Button from './Button';
import { fetchLogout } from '../fetches/fetchLogout';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await fetchLogout();
    navigate('/login');
  };

  return (
    <div className='flex grow items-end min-h-max'>
      <Button
        onClick={logout}
        classNameAdditions='ml-auto'
        text='Sign out'
      />
    </div>
  );
};

export default LogoutButton;
