import { useNavigate, Link } from 'react-router-dom';
import SocialOverlay from './SocialOverlay';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <body className='bg-black text-white min-h-screen'>
        <SocialOverlay />

        <button
          onClick={() => {
            navigate(-1);
          }}>
          ⥢
        </button>
        <Link to='/match/123'>
          <button>Play</button>
        </Link>
      </body>
    </>
  );
};

export default Home;
