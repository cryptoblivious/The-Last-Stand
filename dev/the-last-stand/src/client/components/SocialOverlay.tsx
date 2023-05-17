import FriendRequestForm from './FriendRequestForm';
import UserInfoCardSwitcher from './UserInfoCardSwitcher';
import FriendList from './FriendList';
import { useState, useContext } from 'react';
import LogoutButton from './LogoutButton';
import OverlayToggler from './OverlayToggler';
import ChatMenu from './ChatMenu';
import ChatboxToggler from './ChatboxToggler';
import { GiDiscGolfBasket } from 'react-icons/gi';
import GlobalChatInfoCard from './GlobalChatInfoCard';
import { ColyseusContext } from './ColyseusProvider';
//import { fetchGlobalChatId } from '../fetches/fetchGlobalChatId';

const SocialOverlay = () => {
  const [overlaying, setOverlaying] = useState<boolean>(false);
  const { user } = useContext(ColyseusContext);

  if (!user) return <div className='bg-black text-white'>Loading...</div>;
  return (
    <>
      <OverlayToggler onClick={() => setOverlaying(!overlaying)} />
      <div className={`${overlaying ? 'translate-x-0' : 'translate-x-full'} flex right-0 transition-all duration-1000 fixed top-0 bottom-0 z-40 justify-end`}>
        {user.activeConversationsIds!.length !== 0 && <ChatMenu />}
        <div className={`z-30 bg-black text-pink-600 border-pink-600 border-2 p-3 pr-12 rounded-3xl border-r-0 rounded-r-none relative flex flex-col gap-3 overflow-y-scroll scrollbar-custom w-max`}>
          <UserInfoCardSwitcher />
          <GlobalChatInfoCard />
          <FriendList />
          <FriendRequestForm />
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default SocialOverlay;
