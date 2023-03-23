import SocialOverlay from './SocialOverlay';
import HomeSection from './HomeSection';
import play from '../assets/wallpapers/616c2d7aeec658a610945fde5d997459.jpg';
import maps from '../assets/wallpapers/2282b8ab3e009bcddbb32cbff485aa6c.jpg';
import heroes from '../assets/wallpapers/94f0594713f945197564bc0ef499774f.jpg';
import stats from '../assets/wallpapers/57da00c688947107588d5bfadd77540d.jpg';
import chuck from '../assets/wallpapers/Biker_idle.png';

const Home = () => {
  return (
    <>
      <SocialOverlay />
      <img
        src={chuck}
        alt='Chuck Norris'
        className='absolute top-0 left-0 w-full h-full object-cover'
      />
      <main className='bg-black text-white min-h-screen'>
        <div className='flex items-center gap-5 p-5 justify-evenly h-screen'>
          <HomeSection
            title='Play'
            subtitle='Play a match.'
            link='/match/123'
            backgroundImg={play}
          />
          <HomeSection
            title='Heroes'
            subtitle='Browse heroes.'
            link='/heroes'
            backgroundImg={heroes}
          />
          <HomeSection
            title='Maps'
            subtitle='Browse maps.'
            link='/heroes'
            backgroundImg={maps}
          />
          <HomeSection
            title='Stats'
            subtitle='Check your stats.'
            link='/heroes'
            backgroundImg={stats}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
