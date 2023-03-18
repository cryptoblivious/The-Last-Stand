import SendFriendRequestForm from './SendFriendRequestForm';
import UserInfoCard from './UserInfoCard';

const SocialOverlay = () => {
  return (
    <div className='p-5 w-1/3 flex flex-col fixed top-0 right-0 gap-5'>
      <UserInfoCard />
      <SendFriendRequestForm />
    </div>
  );
};

export default SocialOverlay;
