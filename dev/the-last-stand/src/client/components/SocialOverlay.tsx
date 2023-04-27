import FriendRequestForm from './FriendRequestForm';
import UserInfoCardSwitcher from './UserInfoCardSwitcher';
import FriendList from './FriendList';
import { useState } from 'react';
import LogoutButton from './LogoutButton';
import OverlayToggler from './OverlayToggler';
import ChatMenu from './ChatMenu';

const SocialOverlay = () => {
  const [overlaying, setOverlaying] = useState<boolean>(false);

  return (
    <>
      <OverlayToggler onClick={() => setOverlaying(!overlaying)} />
      <div className={`${overlaying ? 'translate-x-0' : 'translate-x-full'} flex right-0 transition-all duration-1000 fixed top-0 bottom-0 w-fit z-40 justify-end`}>
        <ChatMenu />
        <div className={`z-30 bg-black text-pink-600 border-pink-600 border-2 p-3 pr-12 rounded-3xl border-r-0 rounded-r-none relative flex flex-col gap-5 overflow-y-scroll scrollbar-custom`}>
          <UserInfoCardSwitcher />
          <FriendList />
          <FriendRequestForm />
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default SocialOverlay;
