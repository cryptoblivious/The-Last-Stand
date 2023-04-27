import { IUser } from '../../typescript/interfaces/IUser';
import { GiCyberEye, GiAbstract015 } from 'react-icons/gi';

const FriendInfoCard = ({ user }: { user: IUser }) => {
  const { username, userNo, title, lastOnline } = user;

  const calculateLastOnline = () => {
    const now = new Date();
    if (lastOnline !== 'now') {
      const lastOnlineDate = lastOnline ? new Date(lastOnline) : null;
      // Check if lastOnline is a date
      if (lastOnlineDate && !isNaN(lastOnlineDate.getTime())) {
        const diff = now.getTime() - lastOnlineDate.getTime();
        const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diff / (1000 * 60 * 60));
        const diffMinutes = Math.floor(diff / (1000 * 60));
        const diffSeconds = Math.floor(diff / 1000);
        if (diffSeconds < 60) {
          return `${diffSeconds} seconds ago`;
        } else if (diffMinutes < 60) {
          return `${diffMinutes} minutes ago`;
        } else if (diffHours < 24) {
          return `${diffHours} hours ago`;
        } else if (diffDays < 30) {
          return `${diffDays} days ago`;
        } else {
          return ' > 30 days ago';
        }
      }
    } else {
      return 'now';
    }
  };

  return (
    <div className='flex w-full gap-2 justify-center items-center border-pink-900 hover:bg-zinc-900 transition duration-500 border-2 p-1 rounded-xl'>
      <div className='flex w-1/5'>
        {lastOnline === 'now' ? (
          <GiCyberEye
            aria-label='GiCyberEye'
            fontSize='2.25rem'
            color='green'
          />
        ) : (
          <GiAbstract015
            aria-label='GiAbstract015'
            fontSize='2.25rem'
            color='dkgrey'
          />
        )}
      </div>
      <div className='flex flex-col justify-center w-4/5'>
        <h4>
          {`${username} `}
          <span className='text-pink-800'>{`#${userNo ?? '0000'} last online : ${calculateLastOnline()}`}</span>
        </h4>
        <h5 className='text-cyan-300'> - {title}</h5>
      </div>
    </div>
  );
};

export default FriendInfoCard;
