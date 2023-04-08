import SocialOverlay from './SocialOverlay';
import HomeSection from './HomeSection';

const Home = () => {
  return (
    <>
      <SocialOverlay />
      <main className='bg-black text-white min-h-screen'>
        <div className='flex items-center gap-5 p-5 justify-evenly h-screen'>
          <HomeSection
            title='Play'
            subtitle='Play a match.'
            link='/match/123'
            backgroundImg={'/assets/wallpapers/616c2d7aeec658a610945fde5d997459.jpg'}
          />
          <HomeSection
            title='Heroes'
            subtitle='Browse heroes.'
            link='/heroes'
            backgroundImg={'/assets/wallpapers/94f0594713f945197564bc0ef499774f.jpg'}
          />
          <HomeSection
            title='Maps'
            subtitle='Browse maps.'
            link='/heroes'
            backgroundImg={'/assets/wallpapers/2282b8ab3e009bcddbb32cbff485aa6c.jpg'}
          />
          <HomeSection
            title='Stats'
            subtitle='Check your stats.'
            link='/heroes'
            backgroundImg={'/assets/wallpapers/57da00c688947107588d5bfadd77540d.jpg'}
          />
        </div>
      </main>
    </>
  );
};

export default Home;
