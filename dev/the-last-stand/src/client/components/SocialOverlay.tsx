import SendFriendRequestForm from './SendFriendRequestForm';
import UserInfoCard from './UserInfoCard';
import FriendList from './FriendList';
import Button from './Button';

const SocialOverlay = () => {
  return (
    <div className='z-40 bg-black text-pink-600 border-pink-600 border-2 p-3 pr-12 rounded-3xl border-r-0 rounded-r-none w-1/4 flex flex-col fixed top-2 right-0 bottom-2 gap-5'>
      <UserInfoCard />
      <SendFriendRequestForm />
      <FriendList />
      <Button text='Disconnect' />
    </div>
  );
};

export default SocialOverlay;
