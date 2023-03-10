import { useNavigate, Link } from 'react-router-dom';
import { UserGreetings, SendFriendRequestForm } from '../components';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className='bg-black text-white min-h-screen'>
      <button
        onClick={() => {
          navigate(-1);
        }}>
        ⥢
      </button>
      <UserGreetings />

      <Link to='/match/123'>
        <button>Play</button>
      </Link>
      <SendFriendRequestForm />
    </main>
  );
};

export default Home;
