import FriendRequestForm from './FriendRequestForm';
import UserInfoCardSwitcher from './UserInfoCardSwitcher';
import FriendList from './FriendList';
import { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';

const SocialOverlay = () => {
  const [overlaying, setOverlaying] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOverlaying(false);
      } else if (e.key === 'o') {
        e.preventDefault();
        setOverlaying(!overlaying);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [overlaying]);

  return (
    <div className={`${overlaying ? '-right-5' : '-right-96'} transition-all duration-1000 z-40 bg-black overflow-y-scroll text-pink-600 border-pink-600 border-2 p-3 pr-12 rounded-3xl border-r-0 rounded-r-none w-1/4 flex flex-col fixed top-2 bottom-2 gap-5 `}>
      <div className={`${overlaying ? 'opacity-0' : 'opacity-100'} transition ease-in-out duration-1000 transform fixed top-0 right-0`}>Press "O" to activate and deactivate the Overlay.</div>

      <UserInfoCardSwitcher />
      <FriendList />
      <FriendRequestForm />
      <LogoutButton />
    </div>
  );
};

export default SocialOverlay;
