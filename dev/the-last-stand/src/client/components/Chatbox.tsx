import { useState, useContext, useEffect, useRef } from 'react';
import ChatboxSwitcher from './ChatboxSwitcher';
import { ColyseusContext } from './ColyseusProvider';
import { HOST_URL, HOST_PORT } from '../appConfig';
import { fetchConversation } from '../fetches/fetchConversation';

interface IChatboxProps {
  id: string;
}

const Chatbox = (props: IChatboxProps) => {
  const { id } = props;
  const [chatboxOpen, setChatboxOpen] = useState<boolean>(false);
  const [enterSend, setEnterSend] = useState<boolean>(false);
  const { appRoom, user } = useContext(ColyseusContext);
  const [conversation, setConversation] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Add this function to scroll to the bottom of the container
  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const toggleChatbox = () => {
    setChatboxOpen((prev) => {
      if (!prev) {
        textareaRef.current?.focus();
      }
      return !prev;
    });
  };

  const toggleEnterSend = () => {
    setEnterSend((prev) => !prev);
  };

  const sendMessage = () => {
    //check if the textarea is empty or only contains whitespaces or newlines
    if (!textareaRef.current?.value.trim()) return;
    appRoom!.send('message', { conversationId: id, content: textareaRef.current?.value });
    textareaRef.current!.value = '';
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchConversation(id);
      setConversation(data);
      console.log('conversation', data);
    };
    fetchData();

    if (appRoom) {
      appRoom.onMessage('conversationsChange', (updatedConversation: any) => {
        console.log('updatedConversation', updatedConversation);
        if (updatedConversation._id === id) {
          setConversation((prevConversation: any) => {
            return {
              ...prevConversation,
              messages: updatedConversation.messages ?? prevConversation!.username,
            };
          });
          // Call scrollToBottom after rendering new messages
          scrollToBottom();
        }
      });
    }
  }, [appRoom]);

  if (!conversation || !appRoom) return <div>Loading...</div>;

  return (
    <div className={`bg-black border-2 border-pink-600 text-white border-r-0 rounded-tl-3xl transition-all duration-300 p-2 w-96 flex flex-col gap-2 ${chatboxOpen ? 'translate-x-0 h-5/6' : ' h-12 translate-x-full'}`}>
      <div className='flex gap-2 items-center'>
        <h1 className='text-center w-10/12 text-3xl'>Global Chat</h1>
        <ChatboxSwitcher
          onClick={toggleChatbox}
          chatboxOpen={chatboxOpen}
        />{' '}
      </div>
      {/* <MessageList messages={messages} /> */}
      <div
        ref={containerRef}
        className='overflow-y-scroll scrollbar-custom p-4 pt-0 flex flex-col gap-2 grow'>
        {conversation.messages &&
          conversation.messages.map((message, index) => (
            <div
              key={index}
              className={user!.username === message.username && user!.userNo === message.userNo ? 'text-right' : ''}>
              <p className='italic text-green-500'>
                {message.date} at {message.time}
              </p>
              <div className={`flex gap-2 ${user!.username === message.username && user!.userNo === message.userNo ? 'justify-end' : ''}`}>
                <div>
                  <span className='text-pink-600'>{message.username}</span>
                  <span className='text-pink-900'>#{message.userNo}</span>
                </div>
                <div>
                  {message.content!.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className='flex gap-2 items-center'>
        <textarea
          className='text-black w-3/4 p-2'
          ref={textareaRef}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && enterSend) {
              sendMessage();
            }
          }}
        />

        <div className='flex flex-col gap-2 items-center'>
          <button
            className='bg-fuchsia-700 text-white rounded-md p-2 w-full border-4 border-pink-600 hover:bg-pink-600 hover:border-purple-900 transition ease-in-out duration-300 hover:scale-110'
            onClick={sendMessage}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                sendMessage();
              }
            }}>
            Send
          </button>
          <div className='flex items-center gap-2'>
            <input
              type='checkbox'
              className={`${enterSend ? 'bg-green-500 border-cyan-500' : 'border-pink-600 bg-purple-900'} bg-no-repeat border-2  w-4 h-4 rounded-full appearance-none`}
              onClick={toggleEnterSend}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  toggleEnterSend();
                }
              }}
            />
            <p className={`${enterSend ? 'text-green-500' : 'text-pink-600'} text-[0.666rem] text-center`}>Enter-send</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
