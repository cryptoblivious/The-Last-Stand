//  Nom du fichier : GlobalChatInfoCard.tsx
//  Contexte : Un composant React qui affiche un bouton pour ouvrir le chat global
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge
//  Référence : https://chat.openai.com/

import { GiGlobe } from 'react-icons/gi';
import { useContext, useState, useEffect } from 'react';
import { ColyseusContext } from './ColyseusProvider';
import { fetchGlobalChat } from '../fetches/fetchGlobalChat';
import ChatboxToggler from './ChatboxToggler';

const GlobalChatInfoCard = () => {
  const { user, appRoom } = useContext(ColyseusContext);
  const [globalChatId, setGlobalChatId] = useState<string>('');
  const [globalChatName, setGlobalChatName] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGlobalChat();
      setGlobalChatId(data._id);
      setGlobalChatName(data.name);
    };
    fetchData();
  }, []);

  const checkChatboxState = () => {
    if (user?.activeConversationsIds) {
      return user.activeConversationsIds.includes(globalChatId);
    } else {
      return false;
    }
  };

  const [chatboxTogglerOpen, setChatboxTogglerOpen] = useState<boolean>(checkChatboxState());

  const toggleChatboxToggler = () => {
    setChatboxTogglerOpen((prev) => !prev);
  };

  if (!user || !appRoom) return <div>Loading...</div>;

  return (
    <div className='relative flex justify-center items-center'>
      {chatboxTogglerOpen && (
        <ChatboxToggler
          id={globalChatId}
          name={globalChatName}
          selfToggle={toggleChatboxToggler}
        />
      )}
      <div
        className='flex justify-evenly items-center border-pink-900 hover:bg-zinc-900 hover:cursor-pointer transition duration-500 border-2 p-1 rounded-xl min-h-max w-full'
        onClick={toggleChatboxToggler}>
        <div className='flex'>
          <GiGlobe
            aria-label='GiGlobe'
            fontSize='3rem'
            color='cyan'
          />
        </div>
        <h1 className='text-2xl'>Global Chat</h1>
      </div>
    </div>
  );
};

export default GlobalChatInfoCard;
