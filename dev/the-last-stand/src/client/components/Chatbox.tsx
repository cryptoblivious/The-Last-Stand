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
  const [enterSend, setEnterSend] = useState<boolean>(true);
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
        scrollToBottom();
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
    };
    fetchData();

    if (appRoom) {
      appRoom.onMessage('conversationsChange', (updatedConversation: any) => {
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
    <div className={`bg-black border-2 border-pink-600 text-white border-r-0 rounded-tl-3xl transition-all duration-300 py-2 w-full flex flex-col gap-2 ${chatboxOpen ? 'translate-x-0 h-full' : ' h-12 translate-x-full'}`}>
      <div className='flex gap-2 items-center border-b-2 border-pink-600 p-2'>
        <h1 className='text-center text-cyan-500 font-bold grow text-3xl'>Global Chat</h1>
        <ChatboxSwitcher
          onClick={toggleChatbox}
          chatboxOpen={chatboxOpen}
        />{' '}
      </div>
      {/* <MessageList messages={messages} /> */}
      <div
        ref={containerRef}
        className='overflow-y-scroll scrollbar-custom p-4 pt-0 flex flex-col gap-3 grow'>
        {conversation.messages &&
          conversation.messages.map((message, index) => {
            const date = new Date(message.updatedAt);
            console.log('message', message);

            // Convert the date to the local timezone of the client and format it
            const localTimestamp = date.toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'medium' });

            return (
              <div
                key={index}
                className={`${user!.username === message.username && user!.userNo === message.userNo ? 'ml-auto' : ''} bg-slate-900 w-fit p-4 rounded-3xl border-2 border-cyan-500 max-w-[75%]`}>
                <p className='italic text-green-500'>{localTimestamp}</p>
                {message.username === 'Server' ? (
                  <p>
                    <span className='text-pink-600'>{message.content.split('#')[0]}</span>
                    <span className='text-pink-900'>#{message.userNo} </span>
                    <span className='text-cyan-300'>{message.content.substring(message.content.indexOf(' ') + 1)}</span>
                  </p>
                ) : (
                  <p>
                    <span className='text-pink-600'>{message.username}</span>
                    <span className='text-pink-900'>#{message.userNo}</span>
                    <div>
                      {message.content!.split('\n').map((line, index) => (
                        <p
                          className={`whitespace-normal break-all text-white`}
                          key={index}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </p>
                )}
              </div>
            );
          })}
      </div>
      <div className='flex gap-2 items-center justify-evenly border-t-2 border-pink-600 p-2'>
        <textarea
          className='grow p-4 rounded-3xl resize-y border-slate-900 border-2 bg-slate-950 text-white placeholder-cyan-600'
          placeholder='Type your message here...'
          ref={textareaRef}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && enterSend) {
              if (!event.shiftKey) {
                sendMessage();
              }
            }
          }}
        />

        <div className='flex flex-col gap-2 items-center'>
          <button
            className='bg-pink-600 text-white rounded-md p-2 w-full border-4 border-purple-900 hover:bg-green-900 hover:border-green-500 transition ease-in-out duration-300 hover:scale-110'
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
              id='enter-send'
              className={`${enterSend ? 'bg-green-500 border-cyan-500' : 'border-pink-600 bg-purple-900'} bg-no-repeat border-2  w-4 h-4 rounded-full appearance-none cursor-pointer`}
              onClick={toggleEnterSend}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  toggleEnterSend();
                }
              }}
            />
            <label
              htmlFor='enter-send'
              className={`${enterSend ? 'text-green-500' : 'text-pink-600'} text-[0.666rem] text-center cursor-pointer`}>
              Enter-send
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
