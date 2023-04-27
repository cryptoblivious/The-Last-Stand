import { useState } from 'react';
import ChatboxSwitcher from './ChatboxSwitcher';

const Chatbox = () => {
  const [chatboxOpen, setChatboxOpen] = useState<boolean>(false);

  const toggleChatbox = () => {
    console.log('toggleChatbox');
    setChatboxOpen(!chatboxOpen);
  };

  return (
    <div className={`bg-black border-2 border-pink-600 text-white border-r-0 transition-all duration-300 p-2 w-96 ${chatboxOpen ? ' h-64 translate-x-0' : ' h-12 translate-x-full'}`}>
      <div className='flex gap-2 justify-between'>
        <h1 className='text-center'>Global Chat</h1>
        <ChatboxSwitcher
          onClick={toggleChatbox}
          chatboxOpen={chatboxOpen}
        />{' '}
      </div>
      <div className='overflow-y-scroll scrollbar-custom p-4 flex flex-col gap-2'>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
        <p>Text here</p>
      </div>
    </div>
  );
};

export default Chatbox;
