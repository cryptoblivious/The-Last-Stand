import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>Home</div>
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
