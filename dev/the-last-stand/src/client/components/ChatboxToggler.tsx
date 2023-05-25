//  Nom du fichier : ChatboxToggler.tsx
//  Contexte : Un composant React qui permet d'ouvrir ou de fermer une conversation
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge

import { useContext, useState, useEffect } from 'react';
import { ColyseusContext } from './ColyseusProvider';
import { EMessage } from '../../typescript/enumerations/EMessage';
import { fetchConversationById } from '../fetches/fetchConversation';

interface IChatboxTogglerProps {
  id: string;
  name: string;
  selfToggle: () => void;
}

const ChatboxToggler = (props: IChatboxTogglerProps) => {
  const chatId = props.id;
  const { selfToggle, name } = props;
  const { user, appRoom } = useContext(ColyseusContext);
  const [conversationName, setConversationName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchConversationById(chatId);
      setConversationName(data.name);
    };
    fetchData();
  }, [user]);

  const checkChatboxState = () => {
    if (user?.activeConversationsIds) {
      return user.activeConversationsIds.includes(chatId);
    } else {
      return false;
    }
  };

  const [chatboxOpen, setChatboxOpen] = useState<boolean>(checkChatboxState());

  const toggleChatbox = () => {
    setChatboxOpen((prev) => !prev);
    appRoom!.send(EMessage.ToggleConversation, chatId);
    selfToggle();
  };

  if (!user || !appRoom) return <div>Loading...</div>;

  return (
    <div className='absolute z-50 bg-black border-pink-900 border-2 px-1 py-2 rounded-xl min-h-max'>
      <div
        className={`z-50 bg-black border-pink-900 ${chatboxOpen ? 'hover:bg-red-800' : 'hover:bg-green-800'} hover:cursor-pointer transition duration-500 border-2 p-1 rounded-xl min-h-max`}
        onClick={toggleChatbox}>
        <p className='text-xs'>
          {chatboxOpen ? 'Close' : 'Open'} {conversationName}
        </p>
      </div>
    </div>
  );
};

export default ChatboxToggler;
