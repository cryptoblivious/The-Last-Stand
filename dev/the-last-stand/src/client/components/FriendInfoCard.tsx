import { IUser } from '../../typescript/interfaces/IUser';
import { GiCyberEye, GiAbstract015 } from 'react-icons/gi';
import { useContext, useState, useEffect } from 'react';
import { ColyseusContext } from './ColyseusProvider';
import { fetchConversationByUsers } from '../fetches/fetchConversation';
import ChatboxToggler from './ChatboxToggler';

interface IFriendInfoCardProps {
  friend: IUser;
}

const FriendInfoCard = (props: IFriendInfoCardProps) => {
  const { username: friendName, userNo: friendNo, title, lastOnline } = props.friend;
  const { user, appRoom } = useContext(ColyseusContext);
  const [conversationId, setConversationId] = useState<string>('');
  const [conversationName, setConversationName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchConversationByUsers([user!._id!, props.friend._id!]);
      // TODO : Use the conversation data to toggle the chatbox properly
      console.log('data', data);
      console.log('data._id', data._id);
      setConversationId(data._id);
      setConversationName(data.name);
    };
    fetchData();
  }, []);

  const checkChatboxState = () => {
    if (user?.activeConversationsIds) {
      return user.activeConversationsIds.includes(conversationId);
    } else {
      return false;
    }
  };

  const [chatboxTogglerOpen, setChatboxTogglerOpen] = useState<boolean>(checkChatboxState());

  const toggleChatboxToggler = () => {
    setChatboxTogglerOpen((prev) => !prev);
  };

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
          return `${diffSeconds} sec${diffSeconds > 1 ? 's' : ''} ago`;
        } else if (diffMinutes < 60) {
          return `${diffMinutes} min${diffMinutes > 1 ? 's' : ''} ago`;
        } else if (diffHours < 24) {
          return `${diffHours} hr${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffDays < 30) {
          return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else {
          return ' > 30 days ago';
        }
      }
    } else {
      return 'now';
    }
  };

  if (!user || !appRoom) {
    return <div className='bg-black text-white'>Loading...</div>;
  }

  return (
    <div className='relative flex justify-center items-center'>
      {chatboxTogglerOpen && (
        <ChatboxToggler
          id={conversationId}
          name={conversationName}
          selfToggle={toggleChatboxToggler}
        />
      )}
      <div
        className='flex w-full gap-2 justify-center items-center border-pink-900 hover:bg-zinc-900 hover:cursor-pointer transition duration-500 border-2 p-1 rounded-xl'
        onClick={toggleChatboxToggler}>
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
          <h4 className={`${lastOnline === 'now' && 'text-green-600'}`}>
            {`${friendName} `}
            <span className={`${lastOnline === 'now' ? 'text-green-700' : 'text-pink-800'}`}>{`#${friendNo} (hacktive ${calculateLastOnline()})`}</span>
          </h4>
          <h5 className='text-cyan-300'> - {title}</h5>
        </div>
      </div>
    </div>
  );
};

export default FriendInfoCard;
