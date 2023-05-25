//  Nom du fichier : Chatbox.tsx
//  Contexte : Un composant React qui représente une boîte de chat
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import { useState, useContext, useEffect, useRef } from 'react';
import ChatboxResizeButton from './ChatboxResizer';
import ChatboxCloseButton from './ChatboxCloseButton';
import { ColyseusContext } from './ColyseusProvider';
import { fetchConversationById } from '../fetches/fetchConversation';
import { EMessage } from '../../typescript/enumerations/EMessage';
import MessageList from './MessageList';

interface IChatboxProps {
  id: string;
}

const Chatbox = (props: IChatboxProps) => {
  const { id } = props;
  const [chatboxOpen, setChatboxOpen] = useState<boolean>(true);
  const [enterSend, setEnterSend] = useState<boolean>(true);
  const { appRoom, user } = useContext(ColyseusContext);
  const [conversation, setConversation] = useState<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeChatbox = () => {
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
    if (!textareaRef.current?.value.trim()) return;
    appRoom!.send('message', { conversationId: id, content: textareaRef.current?.value });
    textareaRef.current!.value = '';
    textareaRef.current?.focus();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchConversationById(id);
      setConversation(data);
    };
    fetchData();

    if (appRoom) {
      appRoom.onMessage(EMessage.ConversationsChange, (updatedConversation: any) => {
        if (updatedConversation._id === id) {
          setConversation((prevConversation: any) => {
            return {
              ...prevConversation,
              messages: updatedConversation.messages ?? prevConversation!.username,
              name: updatedConversation.name ?? prevConversation!.name,
            };
          });
        }
      });
    }
  }, [appRoom, user]);

  if (!conversation || !appRoom) return <div>Loading...</div>;

  return (
    <div className={`bg-black border-2 border-pink-600 text-white border-r-0 rounded-tl-3xl transition-all duration-300 py-2 w-full flex flex-col gap-2 ${chatboxOpen ? 'translate-x-0 h-full' : ' h-12 translate-x-full'}`}>
      <div className='flex gap-2 items-center border-b-2 border-pink-600 p-2'>
        <h1 className='text-center text-cyan-500 font-bold grow text-3xl'>{conversation.name}</h1>
        <ChatboxResizeButton
          onClick={resizeChatbox}
          chatboxOpen={chatboxOpen}
        />
        <ChatboxCloseButton conversationId={id} />
      </div>
      <MessageList
        messages={conversation.messages}
        user={user}
      />
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
