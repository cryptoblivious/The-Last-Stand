import { useState, useContext, useEffect, useRef } from 'react';
import ChatboxSwitcher from './ChatboxSwitcher';
import { ColyseusContext } from './ColyseusProvider';
import MessageList from './MessageList';
import { IMessageMapper } from '../../typescript/interfaces/IMessageMapper';

const Chatbox = () => {
  const [chatboxOpen, setChatboxOpen] = useState<boolean>(false);
  const { client, appRoom } = useContext(ColyseusContext);
  const [messages, setMessages] = useState<IMessageMapper[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChatbox = () => {
    setChatboxOpen(!chatboxOpen);
  };

  const sendMessage = () => {
    if (!inputRef.current?.value) return;
    appRoom!.send('message', inputRef.current?.value);
    inputRef.current!.value = '';
  };

  useEffect(() => {
    console.log('chatbox rendered');
    if (appRoom) {
      appRoom.onMessage('message', (message: IMessageMapper) => {
        console.log('message received');
        setMessages((prev) => [...prev, message]);
      });

      return () => {
        appRoom.removeAllListeners();
      };
    }
  }, [appRoom]);

  return (
    <div className={`bg-black border-2 border-pink-600 text-white border-r-0 transition-all duration-300 p-2 w-96 flex flex-col gap-2 ${chatboxOpen ? 'translate-x-0 h-5/6' : ' h-12 translate-x-full'}`}>
      <div className='flex gap-2 items-center'>
        <h1 className='text-center w-10/12 text-3xl'>Global Chat</h1>
        <ChatboxSwitcher
          onClick={toggleChatbox}
          chatboxOpen={chatboxOpen}
        />{' '}
      </div>
      {/* <MessageList messages={messages} /> */}
      <div className='overflow-y-scroll scrollbar-custom p-4 pt-0 flex flex-col gap-2 grow'>
        {messages.map((message, index) => (
          // TODO: add logic to check if message is from current user
          <div key={index}>
            <p className='italic text-green-500'>
              {message.date} at {message.time}
            </p>
            <p>
              <span className='text-pink-600'>{message.username}</span>
              <span className='text-pink-900'>#{message.userNo}</span> {message.content}
            </p>
          </div>
        ))}
      </div>
      <div className='flex gap-2 items-center'>
        <input
          className='w-10/12 text-black'
          type='text'
          ref={inputRef}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
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
