import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>Home</h1>
      <button
        className='bg-primary h-full w-full text-white'
        onClick={() => {
          navigate(-1);
        }}>
        Go to previous page
      </button>
    </>
  );
};

export default Home;
