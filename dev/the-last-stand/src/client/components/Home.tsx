import SocialOverlay from './SocialOverlay';
import HomeSection from './HomeSection';
import play from '../assets/wallpapers/616c2d7aeec658a610945fde5d997459.jpg';

const Home = () => {
  return (
    <>
      <SocialOverlay />
      <main className='bg-black text-white min-h-screen'>
        <div className='flex items-center gap-5 p-5 justify-evenly h-screen'>
          <HomeSection
            title='Play'
            subtitle='Play a match'
            link='/match/123'
            className=' gap-10 h-full rounded-3xl flex flex-col flex-grow items-center justify-center border-transparent hover:border-purple-900 hover:scale-105 border-4 transform transition ease-in-out  duration-1000'
            backgroundImg={play}
          />
          <HomeSection
            title='Heroes'
            subtitle='Browse heroes'
            link='/heroes'
            className=' gap-10 h-full rounded-3xl flex flex-col flex-grow items-center justify-center border-transparent hover:border-purple-900 hover:scale-105 border-4 transform transition ease-in-out  duration-1000'
            backgroundImg={play}
          />
          <HomeSection
            title='Maps'
            subtitle='Browse maps'
            link='/heroes'
            className=' gap-10 h-full rounded-3xl flex flex-col flex-grow items-center justify-center border-transparent hover:border-purple-900 hover:scale-105 border-4 transform transition ease-in-out  duration-1000'
            backgroundImg={play}
          />
          <HomeSection
            title='Stats'
            subtitle='Check your stats'
            link='/heroes'
            className=' gap-10 h-full rounded-3xl flex flex-col flex-grow items-center justify-center border-transparent hover:border-purple-900 hover:scale-105 border-4 transform transition ease-in duration-1000 transition-opacity-out '
            backgroundImg={play}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
