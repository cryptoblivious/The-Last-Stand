import ChatboxSwitcher from './ChatboxSwitcher';
import { useState } from 'react';

const ChatMenu = () => {
  const [chatboxes, setChatboxes] = useState<null | any[]>(null);
  const [globalChat, setGlobalChat] = useState<null | any>(null);

  return (
    <div className='z-50 flex flex-col gap-2 py-6 items-end '>
      <ChatboxSwitcher chatbox={globalChat} />
      <ChatboxSwitcher chatbox={globalChat} />
      <ChatboxSwitcher chatbox={globalChat} />

      {chatboxes &&
        chatboxes.map((chatbox: any) => (
          <ChatboxSwitcher
            key={chatbox._id}
            chatbox={chatbox}
          />
        ))}
    </div>
  );
};

export default ChatMenu;
