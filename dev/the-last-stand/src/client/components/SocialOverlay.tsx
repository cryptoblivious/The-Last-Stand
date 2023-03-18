import SendFriendRequestForm from './SendFriendRequestForm';
import UserInfoCard from './UserInfoCard';

const SocialOverlay = () => {
  return (
    <div className='bg-black text-pink-600 border-pink-600 border-b-2 rounded-bl-3xl border-l-2 w-1/3 h-5/6 flex flex-col fixed top-0 right-0 gap-5'>
      <UserInfoCard />
      <SendFriendRequestForm />
    </div>
  );
};

export default SocialOverlay;
