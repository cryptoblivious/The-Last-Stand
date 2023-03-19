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
            backgroundImg={play}
          />
          <HomeSection
            title='Heroes'
            subtitle='Browse heroes'
            link='/heroes'
            backgroundImg={play}
          />
          <HomeSection
            title='Maps'
            subtitle='Browse maps'
            link='/heroes'
            backgroundImg={play}
          />
          <HomeSection
            title='Stats'
            subtitle='Check your stats'
            link='/heroes'
            backgroundImg={play}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
