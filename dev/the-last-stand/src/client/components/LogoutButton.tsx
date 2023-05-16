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
    <div className='flex grow items-end'>
      <Button
        onClick={logout}
        classNameAdditions='ml-auto h-fit'
        text='Sign out'
      />
    </div>
  );
};

export default LogoutButton;
