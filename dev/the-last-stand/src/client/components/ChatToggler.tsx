import { GiGlobe } from 'react-icons/gi';
import { useContext, useState } from 'react';
import { ColyseusContext } from './ColyseusProvider';
import { EMessage } from '../../typescript/enumerations/EMessage';

interface IChatTogglerProps {
  id: string;
}

const ChatToggler = (props: IChatTogglerProps) => {
  const chatId = props.id;
  const { user, appRoom } = useContext(ColyseusContext);

  const toggleChat = () => {
    appRoom!.send(EMessage.ToggleConversation, chatId);
  };

  if (!user || !appRoom) return <div>Loading...</div>;

  return (
    <div
      className='flex w-auto h-24 justify-evenly items-center border-pink-900 hover:bg-zinc-900 hover:cursor-pointer transition duration-500 border-2 p-1 rounded-xl overflow-clip'
      onClick={toggleChat}>
      <div className='flex'>
        {' '}
        <GiGlobe
          aria-label='GiGlobe'
          fontSize='3rem'
          color='cyan'
        />
      </div>
      <h1 className='text-2xl'>Global Chat</h1>
    </div>
  );
};

export default ChatToggler;
