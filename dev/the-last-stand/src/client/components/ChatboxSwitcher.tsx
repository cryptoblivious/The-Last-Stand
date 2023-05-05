import Button from './Button';
import { GiAbstract053, GiAzulFlake } from 'react-icons/gi';
import { IChatboxSwitcherProps } from '../../typescript/interfaces/IChatboxSwitcherProps';

const ChatboxSwitcher = (props: IChatboxSwitcherProps) => {
  const { onClick, chatboxOpen } = props;
  const toggleChatbox = onClick;

  return (
    <>
      {chatboxOpen ? (
        <Button
          onClick={toggleChatbox}
          classNameAdditions={`p-2 z-50`}
          icon={
            <GiAzulFlake
              aria-label='GiAzulFlake'
              fontSize='1.69rem'
              color='rgb(103 232 249)'
            />
          }
        />
      ) : (
        <Button
          onClick={toggleChatbox}
          classNameAdditions={`absolute -left-14 -top-1 p-2 z-50`}
          icon={
            <GiAbstract053
              aria-label='GiAbstract053'
              fontSize='1.69rem'
              color='rgb(103 232 249)'
            />
          }
        />
      )}
    </>
  );
};

export default ChatboxSwitcher;
