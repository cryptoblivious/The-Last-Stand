import { useState, useContext, useEffect } from 'react';
import ChatboxSwitcher from './ChatboxSwitcher';
import { ColyseusContext } from './ColyseusProvider';

const Chatbox = () => {
  const [chatboxOpen, setChatboxOpen] = useState<boolean>(false);
  const { client, appRoom } = useContext(ColyseusContext);
  const [messages, setMessages] = useState<string[]>([]);

  const toggleChatbox = () => {
    console.log('toggleChatbox');
    setChatboxOpen(!chatboxOpen);
  };

  const sendMessage = () => {
    console.log('sendMessage');
    console.log('appRoom', appRoom);
    appRoom!.send('message', 'hello world!');
  };

  useEffect(() => {
    if (appRoom) {
      appRoom.onMessage('message', (message) => {
        console.log('message', message);
        setMessages([...messages, message]);
        appRoom.state.messages.push(message);
      });
    }
  }, [appRoom]);

  return (
    <div className={`bg-black border-2 border-pink-600 text-white border-r-0 transition-all duration-300 p-2 w-96 flex flex-col gap-2 ${chatboxOpen ? 'translate-x-0 h-5/6' : ' h-12 translate-x-full'}`}>
      <div className='flex gap-2 items-center'>
        <h1 className='text-center w-10/12'>Global Chat</h1>
        <ChatboxSwitcher
          onClick={toggleChatbox}
          chatboxOpen={chatboxOpen}
        />{' '}
      </div>
      <div className='overflow-y-scroll scrollbar-custom p-4 flex flex-col gap-2'>
        {appRoom?.state.messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div className='flex gap-2 items-center'>
        <input
          className='w-10/12'
          type='text'
        />
        <button
          className='w-2/12 bg-pink-600 text-white rounded-md'
          onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
