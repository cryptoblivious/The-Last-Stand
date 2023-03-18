import { useNavigate, Link } from 'react-router-dom';
import SocialOverlay from './SocialOverlay';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <SocialOverlay />
      <main className='bg-black text-white min-h-screen'>
        <button
          onClick={() => {
            navigate(-1);
          }}>
          ⥢
        </button>
        <Link to='/match/123'>
          <button>Play</button>
        </Link>
        <Link to='/heroes'>
          <button>Heroes</button>
        </Link>
      </main>
    </>
  );
};

export default Home;
