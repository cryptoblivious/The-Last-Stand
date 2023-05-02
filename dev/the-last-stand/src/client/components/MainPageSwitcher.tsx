import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const MainPageSwitcher = (props: any) => {
  const navigate = useNavigate();
  const { data } = props;

  useEffect(() => {
    if (data.message === 'Authenticated') {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [data.message, navigate]);

  return null;
};

export default MainPageSwitcher;
