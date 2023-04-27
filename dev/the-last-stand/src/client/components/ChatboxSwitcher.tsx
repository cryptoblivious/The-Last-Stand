import { IChatbox } from '../../typescript/interfaces/IChatbox';
import Button from './Button';
import { GiAbstract053, GiAzulFlake } from 'react-icons/gi';
import Chatbox from './Chatbox';
import { useState } from 'react';

const ChatboxSwitcher = ({ users, messages, icon }: IChatbox) => {
  const [chatboxOpen, setChatboxOpen] = useState<boolean>(false);

  const toggleChatbox = () => {
    console.log('toggleChatbox');
    setChatboxOpen(!chatboxOpen);
  };

  return (
    <>
      {chatboxOpen ? (
        <Button
          onClick={toggleChatbox}
          classNameAdditions={`relative p-2`}
          icon={
            <GiAbstract053
              aria-label='GiFeather'
              fontSize='1.69rem'
              color='rgb(103 232 249)'
            />
          }
        />
      ) : (
        <Button
          onClick={toggleChatbox}
          classNameAdditions={`relative p-2`}
          icon={
            <GiAzulFlake
              aria-label='GiFeather'
              fontSize='1.69rem'
              color='rgb(103 232 249)'
            />
          }
        />
      )}
      <Chatbox className={chatboxOpen ? 'w-96 h-64' : 'w-0 h-0'} />
    </>
  );
};

export default ChatboxSwitcher;
