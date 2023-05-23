//  Nom du fichier : ChatboxCloseButton.tsx
//  Contexte : Un composant React qui permet de fermer une conversation
//  Nom de l'auteur : Andrzej Wisniowski
//  Autres étudiants : Jonathan Robinson-Roberge

import Button from './Button';
import { GiAzulFlake } from 'react-icons/gi';
import { useContext } from 'react';
import { ColyseusContext } from './ColyseusProvider';
import { IChatboxCloseButtonProps } from '../../typescript/interfaces/IChatboxCloseButtonProps';
import { EMessage } from '../../typescript/enumerations/EMessage';

const ChatboxCloseButton = (props: IChatboxCloseButtonProps) => {
  const { conversationId } = props;
  const { appRoom } = useContext(ColyseusContext);

  const closeChatbox = () => {
    appRoom!.send(EMessage.ToggleConversation, conversationId);
  };

  if (!appRoom) return <div>Loading...</div>;

  return (
    <Button
      onClick={closeChatbox}
      classNameAdditions={`p-2 z-50`}
      icon={
        <GiAzulFlake
          aria-label='GiAzulFlake'
          fontSize='1.69rem'
          color='rgb(103 232 249)'
        />
      }
    />
  );
};

export default ChatboxCloseButton;
