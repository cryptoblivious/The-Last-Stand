import Chatbox from './Chatbox';
import { useState, useContext } from 'react';
import { ColyseusContext } from './ColyseusProvider';

const ChatMenu = () => {
  const [chatboxes, setChatboxes] = useState<null | any[]>(null);
  const [globalChat, setGlobalChat] = useState<null | any>(null);
  const { user } = useContext<any>(ColyseusContext);

  return (
    <div className='z-30 flex flex-col relative gap-4 py-8 items-end '>
      {/* <Chatbox name={globalChat} /> */}

      {user &&
        user.activeConversationsIds.map((conversationId: any) => (
          <Chatbox
            key={conversationId}
            id={conversationId}
          />
        ))}
    </div>
  );
};

export default ChatMenu;
