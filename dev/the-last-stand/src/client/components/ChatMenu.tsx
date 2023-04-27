import Chatbox from './Chatbox';
import { useState } from 'react';

const ChatMenu = () => {
  const [chatboxes, setChatboxes] = useState<null | any[]>(null);
  const [globalChat, setGlobalChat] = useState<null | any>(null);

  return (
    <div className='z-30 flex flex-col relative gap-4 py-8 items-end '>
      <Chatbox name={globalChat} />
      <Chatbox name={globalChat} />
      <Chatbox name={globalChat} />

      {chatboxes &&
        chatboxes.map((chatbox: any) => (
          <Chatbox
            key={chatbox._id}
            name={chatbox.name}
          />
        ))}
    </div>
  );
};

export default ChatMenu;
