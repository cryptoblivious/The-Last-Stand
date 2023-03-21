import FriendRequestForm from './FriendRequestForm';
import UserInfoCardSwitcher from './UserInfoCardSwitcher';
import FriendList from './FriendList';
import { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
import OverlayToggler from './OverlayToggler';

const SocialOverlay = () => {
  const [overlaying, setOverlaying] = useState<boolean>(false);

  return (
    <div className={`${overlaying ? '-right-5' : '-right-96'} transition-all duration-1000 z-40 bg-black overflow-y-scroll text-pink-600 border-pink-600 border-2 p-3 pr-12 rounded-3xl border-r-0 rounded-r-none w-1/4 flex flex-col fixed top-2 bottom-2 gap-5 `}>
      <OverlayToggler onClick={() => setOverlaying(!overlaying)} />
      <UserInfoCardSwitcher />
      <FriendList />
      <FriendRequestForm />
      <LogoutButton />
    </div>
  );
};

export default SocialOverlay;
