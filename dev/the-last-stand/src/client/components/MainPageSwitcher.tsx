import { useNavigate } from 'react-router-dom';
const MainPageSwitcher = (props: any) => {
  const navigate = useNavigate();
  const { data } = props;
  if (data.message === 'Authenticated') {
    navigate('/home');
  } else {
    navigate('/login');
  }
  return null;
};

export default MainPageSwitcher;
